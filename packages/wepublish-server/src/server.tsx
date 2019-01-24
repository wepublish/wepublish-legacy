import path from 'path'
import fs from 'fs'

import fastify from 'fastify'
import fastifyCompress from 'fastify-compress'

import React from 'react'
import ReactDOM from 'react-dom/server'
import {getStyles} from 'typestyle'

import {
  ApplicationView,
  initializeCSSRules,
  ApplicationOptions
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

    this.httpServer.get('/manifest.json', async (_req, _res) => {
      // TODO: Config
      return {
        short_name: 'Test',
        name: 'Test',
        icons: [
          {
            src: '/images/icons-192.png',
            type: 'image/png',
            sizes: '192x192'
          },
          {
            src: '/images/icons-512.png',
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
      res.send(await this.getRouteWithData(req.params['*'], req.query))
    })

    this.httpServer.get('*', async (req, res) => {
      const route = await this.getRouteWithData(req.params['*'], req.query)

      const initialProps = {
        initialRoute: route
      }

      const component = (
        <ApplicationView
          {...initialProps}
          locale={opts.locale}
          dateLocale={opts.dateLocale}
          theme={opts.theme}
        />
      )
      const componentString = ReactDOM.renderToString(component)

      const markup = ReactDOM.renderToStaticMarkup(
        <html>
          <head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, user-scalable=no"
            />
            <link rel="manifest" href="/manifest.json" />
            <style id="style" dangerouslySetInnerHTML={{__html: getStyles()}} />
            <script defer src="/static/client.js" />
            <script
              id="initialState"
              type="application/json"
              dangerouslySetInnerHTML={{__html: JSON.stringify(initialProps)}}
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

      res.type('text/html; charset=utf-8').send(`<!doctype html>${markup}`)
    })

    initializeCSSRules()
  }

  private async getArticle(id: string): Promise<Article> {
    return this.opts.dataSource.getArticle(id)
  }

  private async getArticles(): Promise<ListArticle[]> {
    const today = new Date()
    const oneWeekAgo = new Date()

    oneWeekAgo.setDate(oneWeekAgo.getDate() - 14)

    return this.opts.dataSource.getArticles(today, oneWeekAgo)
  }

  public async getRouteWithData(
    path: string,
    query: fastify.DefaultQuery
  ): Promise<Route> {
    const route = matchRoute(path, query)

    switch (route.type) {
      case RouteType.Article:
        return {...route, article: await this.getArticle(route.articleID)}

      case RouteType.Front:
        return {
          ...route,
          blocks: (await this.getArticles()).map(article => {
            return {id: article.id, type: CoreBlockType.Article, data: article}
          })
        }
    }

    return {type: RouteType.NotFound}
  }

  public async listen() {
    return new Promise((resolve, rejected) => {
      this.httpServer.listen(this.opts.port || 3000, err => {
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
