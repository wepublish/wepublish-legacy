import path from 'path'
import http from 'http'

import fastify from 'fastify'
import fastifyStatic from 'fastify-static'
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
  RouteType,
  matchRoute,
  Route
} from '@wepublish/common'

import {DataSource} from './dataSource/interface'

export interface ServerOptions extends ApplicationOptions {
  port?: number
  dataSource: DataSource
  clientPath: string
  workerPath: string
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
    this.httpServer.register(fastifyStatic, {
      root: path.resolve(process.cwd(), './dist'),
      prefix: '/static',
      setHeaders: (res: http.ServerResponse) => {
        res.setHeader('Service-Worker-Allowed', '/')
      }
    })

    this.httpServer.get('/manifest.json', (_req, res) => {
      // TODO: Config
      res.send({
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
      })
    })

    this.httpServer.get('/api/route/*', async (req, res) => {
      res.send(await this.getRouteWithData(req.params['*'], req.query))
    })

    this.httpServer.get('*', async (req, res) => {
      const route = await this.getRouteWithData(req.params['*'], req.query)

      const initialProps = {
        initialRoute: route
      }

      const component = <ApplicationView {...initialProps} theme={opts.theme} />
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

  private async getArticles(): Promise<Article[]> {
    const today = new Date()
    const oneWeekAgo = new Date()

    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    return this.opts.dataSource.getArticles(today, oneWeekAgo)
  }

  public async getRouteWithData(
    path: string,
    query: fastify.DefaultQuery
  ): Promise<Route> {
    const route = matchRoute(path, query)

    switch (route.type) {
      case RouteType.Article:
        return {...route, article: {} as any}

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
