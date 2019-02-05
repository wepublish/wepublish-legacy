import path from 'path'
import fs from 'fs'

import fastify from 'fastify'
import fastifyCompress from 'fastify-compress'
import fastifyCaching from 'fastify-caching'

import React from 'react'
import ReactDOM from 'react-dom/server'
import {getStyles} from 'typestyle'

import {
  ApplicationView,
  initializeCSSRules,
  ApplicationOptions,
  extractMetadata
} from '@wepublish/ui'

import {
  CoreBlockType,
  Article,
  ListArticle,
  RouteType,
  matchRoute,
  Route
} from '@wepublish/common'

import {DataSource} from './dataSource/interface'

export interface ServerOptions extends ApplicationOptions {
  readonly port?: number
  readonly dataSource: DataSource
  readonly clientPath: string
  readonly workerPath: string
  readonly icons: {
    '16x16': string
    '32x32': string
    '192x192': string
    '512x512': string
  }
}

export class Server {
  private readonly opts: ServerOptions
  private readonly httpServer: fastify.FastifyInstance

  public constructor(opts: ServerOptions) {
    this.opts = opts

    this.httpServer = fastify({
      logger: {prettyPrint: process.env.NODE_ENV != 'production'}
    })

    this.httpServer.register(fastifyCompress)
    this.httpServer.register(fastifyCaching, {
      privacy: fastifyCaching.privacy.PUBLIC,
      expiresIn: 60 * 60
    })

    let clientPath = opts.clientPath
    let workerPath = opts.workerPath

    if (path.extname(clientPath) === '') clientPath += '.js'
    if (path.extname(workerPath) === '') workerPath += '.js'

    if (!fs.statSync(clientPath).isFile()) {
      throw new Error(`"${clientPath}" is not a file.`)
    }

    if (!fs.statSync(workerPath).isFile()) {
      throw new Error(`"${workerPath}" is not a file.`)
    }

    // Check for source map
    const clientSourceMapPath = `${clientPath}.map`
    let foundClientSourceMap = false

    const workerSourceMapPath = `${workerPath}.map`
    let foundWorkerSourceMap = false

    try {
      foundClientSourceMap = fs.statSync(clientSourceMapPath).isFile()
    } catch {}

    try {
      foundWorkerSourceMap = fs.statSync(workerSourceMapPath).isFile()
    } catch {}

    this.httpServer.get('/static/client.js', async (_req, res) => {
      res.header('Content-Type', 'application/javascript; charset=utf-8')
      return fs.createReadStream(clientPath)
    })

    this.httpServer.get('/static/worker.js', async (_req, res) => {
      res.header('Content-Type', 'application/javascript; charset=utf-8')
      res.header('Service-Worker-Allowed', '/')
      return fs.createReadStream(workerPath)
    })

    if (foundClientSourceMap) {
      this.httpServer.get('/static/client.js.map', async (_req, res) => {
        res.header('Content-Type', 'application/json')
        return fs.createReadStream(clientSourceMapPath)
      })
    }

    if (foundWorkerSourceMap) {
      this.httpServer.get('/static/worker.js.map', async (_req, res) => {
        res.header('Content-Type', 'application/json')
        return fs.createReadStream(workerSourceMapPath)
      })
    }

    this.httpServer.get('/static/icon-16x16.png', async (_req, res) => {
      res.header('Content-Type', 'image/png')
      return fs.createReadStream(opts.icons['16x16'])
    })

    this.httpServer.get('/static/icon-32x32.png', async (_req, res) => {
      res.header('Content-Type', 'image/png')
      return fs.createReadStream(opts.icons['32x32'])
    })

    this.httpServer.get('/static/icon-192x192.png', async (_req, res) => {
      res.header('Content-Type', 'image/png')
      return fs.createReadStream(opts.icons['192x192'])
    })

    this.httpServer.get('/static/icon-512x512.png', async (_req, res) => {
      res.header('Content-Type', 'image/png')
      return fs.createReadStream(opts.icons['512x512'])
    })

    this.httpServer.get('/manifest.json', async (_req, _res) => {
      return {
        short_name: opts.siteName,
        name: opts.siteName,
        icons: [
          {
            src: '/static/icon-192x192.png',
            type: 'image/png',
            sizes: '192x192'
          },
          {
            src: '/static/icon-512x512.png',
            type: 'image/png',
            sizes: '512x512'
          }
        ],
        start_url: '/',
        background_color: '#000000',
        display: 'standalone',
        scope: '/',
        theme_color: '#000000'
      }
    })

    this.httpServer.get('/api/route/*', async (req, res) => {
      try {
        return await this.getRouteWithData(req.params['*'], req.query)
      } catch (err) {
        this.httpServer.log.error(err)
        res.status(500)
        return {type: RouteType.InternalServerError}
      }
    })

    this.httpServer.get('*', async (req, res) => {
      const route = await this.getRouteWithData(req.params['*'], req.query)

      switch (route.type) {
        case RouteType.NotFound:
          res.status(404)
      }

      const component = (
        <ApplicationView
          initialRoute={route}
          siteName={opts.siteName}
          siteDescription={opts.siteDescription}
          brandName={opts.brandName}
          talkURL={opts.talkURL}
          locale={opts.locale}
          dateLocale={opts.dateLocale}
          theme={opts.theme}
          hostname={opts.hostname}
        />
      )

      res
        .type('text/html; charset=utf-8')
        .send(this.wrapMarkup(component, route))
    })

    this.httpServer.setErrorHandler((_err, _req, res) => {
      const route: Route = {type: RouteType.InternalServerError}
      const component = (
        <ApplicationView
          initialRoute={route}
          siteName={opts.siteName}
          siteDescription={opts.siteDescription}
          brandName={opts.brandName}
          talkURL={opts.talkURL}
          locale={opts.locale}
          dateLocale={opts.dateLocale}
          theme={opts.theme}
          hostname={opts.hostname}
        />
      )

      res
        .type('text/html; charset=utf-8')
        .send(this.wrapMarkup(component, route))
    })

    initializeCSSRules()
  }

  private wrapMarkup(component: JSX.Element, route: Route): string {
    const componentString = ReactDOM.renderToString(component)

    const markup = ReactDOM.renderToStaticMarkup(
      <html lang={this.opts.locale}>
        <head>
          {extractMetadata()}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/icon-16x16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/icon-32x32.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href="/static/icon-192x192.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:400,400i,500,500i"
            rel="stylesheet"
          />
          <style id="style" dangerouslySetInnerHTML={{__html: getStyles()}} />
          <script defer src="/static/client.js" />
          <script
            id="initialState"
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({initialRoute: route})
            }}
          />
        </head>
        <body>
          <div
            id="application"
            dangerouslySetInnerHTML={{__html: componentString}}
          />
        </body>
      </html>
    )

    return `<!doctype html>${markup}`
  }

  private async getArticle(id: string): Promise<Article> {
    return this.opts.dataSource.getArticle(id)
  }

  private async getRelatedArticles(id: string): Promise<ListArticle[]> {
    return this.opts.dataSource.getRelatedArticles(id)
  }

  private async getArticles(): Promise<ListArticle[]> {
    const today = new Date()
    const twoWeeksAgo = new Date()

    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)

    return this.opts.dataSource.getArticles(today, twoWeeksAgo)
  }

  public async getRouteWithData(
    path: string,
    query: fastify.DefaultQuery
  ): Promise<Route> {
    const route = matchRoute(path, query)

    switch (route.type) {
      case RouteType.Article: {
        const article = await this.getArticle(route.articleID)
        const relatedArticles = await this.getRelatedArticles(route.articleID)
        return {...route, article, relatedArticles}
      }

      case RouteType.Front:
        return {
          ...route,
          blocks: (await this.getArticles()).map(article => {
            return {
              id: article.id,
              type: CoreBlockType.Article,
              data: article
            }
          })
        }
    }

    return route
  }

  public async listen() {
    return new Promise((resolve, rejected) => {
      this.httpServer.listen(this.opts.port || 3000, '0.0.0.0', err => {
        if (err) return rejected(err)
        resolve()
      })
    })
  }
}

export async function startServer(opts: ServerOptions) {
  const server = new Server(opts)
  return server.listen()
}
