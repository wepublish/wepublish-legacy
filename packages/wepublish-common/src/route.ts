import {Trie} from 'route-trie'
import * as qs from 'query-string'
import {Block, Article, ArticleJSON} from './model'

export enum RouteType {
  NotFound = 'notFound',
  Front = 'front',
  Article = 'article'
}

export interface FrontRoute {
  type: RouteType.Front
  blocks?: Block[]
}

export interface ArticleRoute {
  type: RouteType.Article
  articleID: string
  article?: Article
}

export interface NotFoundRoute {
  type: RouteType.NotFound
}

export interface FrontRouteJSON {
  type: RouteType.Front
  blocks?: Block[]
}

export interface ArticleRouteJSON {
  type: RouteType.Article
  articleID: string
  article: ArticleJSON
}

export type Route = FrontRoute | ArticleRoute | NotFoundRoute
export type RouteJSON = FrontRouteJSON | ArticleRouteJSON | NotFoundRoute

const router = new Trie()
const articleNode = router.define('/article/:id')
const frontNode = router.define('/')

export function matchRoute(
  path: string,
  query: {[key: string]: string} | string
): Route {
  const match = router.match(path.startsWith('/') ? path : `/${path}`)

  // @ts-ignore: unused right now
  const queryParams = typeof query === 'string' ? qs.parse(query) : query

  switch (match.node) {
    case articleNode:
      return {type: RouteType.Article, articleID: match.params.id}

    case frontNode:
      return {type: RouteType.Front}
  }

  return {type: RouteType.NotFound}
}

export function reverseRoute(route: Route): string {
  switch (route.type) {
    case RouteType.Article:
      return `/article/${route.articleID}`

    case RouteType.Front:
      return `/`

    case RouteType.NotFound:
      return `/404`
  }
}

export function unserializeRoute(json: RouteJSON): Route {
  switch (json.type) {
    case RouteType.Article:
      return {...json, article: Article.fromJSON(json.article)}
  }

  return {...json}
}
