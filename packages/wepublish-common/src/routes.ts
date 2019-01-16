export enum RouteID {
  NotFound = 'notFound',
  Front = 'front',
  Article = 'article'
}

export interface FrontRoute {
  id: RouteID.Front
  blocks: any[]
}

export interface ArticleRoute {
  id: RouteID.Article
  article: any
}

export interface NotFoundRoute {
  id: RouteID.NotFound
}

export type Route = FrontRoute | ArticleRoute | NotFoundRoute
