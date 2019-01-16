import path from 'path'

import fastify from 'fastify'
import fastifyStatic from 'fastify-static'
import fastifyCompress from 'fastify-compress'

import React from 'react'
import ReactDOM from 'react-dom/server'
import {getStyles} from 'typestyle'

import {ApplicationView, initializeCSSRules} from '@wepublish/ui'

import {matchRoute} from './routing'

export interface ServerOptions {}

export function startServer(_opts?: ServerOptions) {
  initializeCSSRules()

  const server = fastify({
    logger: {prettyPrint: process.env.NODE_ENV != 'production'}
  })

  server.register(fastifyCompress)

  server.register(fastifyStatic, {
    root: path.resolve(process.cwd(), './dist'),
    prefix: '/static'
  })

  server.get('/api/route/*', async (req, res) => {
    res.send(await matchRoute(req.params['*'], req.query))
  })

  server.get('*', async (req, res) => {
    const route = await matchRoute(req.params['*'], req.query)
    const initialProps = {initialRoute: route}

    const component = <ApplicationView {...initialProps} />
    const componentString = ReactDOM.renderToString(component)

    const markup = ReactDOM.renderToStaticMarkup(
      <html>
        <head>
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

    res.type('text/html').send(`<!doctype html>${markup}`)
  })

  server.listen(3000, (err, address) => {
    if (err) throw err
    server.log.info(`Server listening on ${address}.`)
  })
}
