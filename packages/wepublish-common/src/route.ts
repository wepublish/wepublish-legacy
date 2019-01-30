import {Trie} from 'route-trie'
import * as qs from 'query-string'
import {Block, Article, ArticleJSON, ListArticle} from './model'

export enum RouteType {
  NotFound = 'notFound',
  InternalServerError = 'internalServerError',
  Front = 'front',
  Article = 'article',
  Comment = 'comment'
}

export interface FrontRoute {
  type: RouteType.Front
  blocks?: Block[]
}

export interface ArticleRoute {
  type: RouteType.Article
  titleSlug: string
  articleID: string
  article?: Article
}

export interface CommentRoute {
  type: RouteType.Comment
  titleSlug: string
  articleID: string
}

export interface NotFoundRoute {
  type: RouteType.NotFound
}

export interface InternalServerErrorRoute {
  type: RouteType.InternalServerError
}

export interface FrontRouteJSON {
  type: RouteType.Front
  blocks?: Block[]
}

export interface ArticleRouteJSON {
  type: RouteType.Article
  titleSlug: string
  articleID: string
  article?: ArticleJSON
}

export interface CommentRouteJSON {
  type: RouteType.Comment
  titleSlug: string
  articleID: string
}

export type Route =
  | FrontRoute
  | ArticleRoute
  | CommentRoute
  | NotFoundRoute
  | InternalServerErrorRoute

export type RouteJSON =
  | FrontRouteJSON
  | ArticleRouteJSON
  | CommentRouteJSON
  | NotFoundRoute
  | InternalServerErrorRoute

const router = new Trie()
const articleNode = router.define('/article/:slug/:id')
const commentNode = router.define('/article/:slug/:id/comments')
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
      return {
        type: RouteType.Article,
        titleSlug: match.params.slug,
        articleID: match.params.id
      }

    case commentNode:
      return {
        type: RouteType.Comment,
        titleSlug: match.params.slug,
        articleID: match.params.id
      }

    case frontNode:
      return {type: RouteType.Front}
  }

  return {type: RouteType.NotFound}
}

export function reverseRoute(route: Route): string {
  switch (route.type) {
    case RouteType.Article:
      return `/article/${route.titleSlug}/${route.articleID}`

    case RouteType.Comment:
      return `/article/${route.titleSlug}/${route.articleID}/comments`

    case RouteType.Front:
      return `/`

    case RouteType.NotFound:
      return `/404`

    case RouteType.InternalServerError:
      return '/500'
  }
}

export function unserializeRoute(json: RouteJSON): Route {
  switch (json.type) {
    case RouteType.Article:
      return {...json, article: json.article && Article.fromJSON(json.article)}

    case RouteType.Front:
      return {
        ...json,
        blocks:
          json.blocks &&
          json.blocks.map(block => ({
            ...block,
            data: ListArticle.fromJSON(block.data) // TODO: Block serialization
          }))
      }
  }

  return {...json}
}

export function titleForRoute(route: Route, fallback: string): string {
  switch (route.type) {
    case RouteType.Article:
      return (route.article && route.article.title) || fallback
  }

  return fallback
}
