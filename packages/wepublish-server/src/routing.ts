import fastify from 'fastify'

import {Trie} from 'route-trie'
import {Route, RouteID} from '@wepublish/common'

const router = new Trie()
const articleNode = router.define('/article/:id')
const frontNode = router.define('/')

export async function matchRoute(
  path: string,
  _query: fastify.DefaultQuery
): Promise<Route> {
  const match = router.match(path.startsWith('/') ? path : `/${path}`)

  switch (match.node) {
    case articleNode: {
      return {id: RouteID.Article, article: undefined}
    }

    case frontNode: {
      return {id: RouteID.Front, blocks: []}
    }
  }

  return {id: RouteID.NotFound}
}
