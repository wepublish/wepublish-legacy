import {Value, ValueJSON} from 'slate'

export enum CoreBlockType {
  Article = 'article'
}

export interface Block<T = any> {
  id: string
  type: string
  data: T
}

export class Article {
  constructor(
    readonly id: string
    readonly title: string
    readonly description: string
    readonly published: Date
    readonly author: string
    readonly image: string
    readonly platform: string
    readonly link: string
    readonly content: Value
  ) {}

  toJSON() {
    return JSON.stringify(this)
  }

  static fromJSON(json: ArticleJSON) {
    return new ListArticle(
      json.id,
      json.title
      json.description,
      new Date(json.published),
      json.author,
      json.image,
      json.platform,
      json.link,
      Value.fromJSON(json.content)
    )
  }
}

export interface ArticleJSON {
  id: string
  author: string
  description: string
  image: string
  link: string
  platform: string
  published: string
  title: string
  content: ValueJSON
}

export class ListArticle {
  constructor(
    readonly id: string
    readonly title: string
    readonly description: string
    readonly published: Date
    readonly author: string
    readonly image: string
    readonly platform: string
    readonly link: string
  ) {}

  toJSON(): ListArticleJSON {
    return JSON.stringify(this)
  }

  static fromJSON(json: ListArticleJSON): ListArticle {
    return new ListArticle(
      json.id,
      json.title
      json.description,
      new Date(json.published),
      json.author,
      json.image,
      json.platform,
      json.link
    )
  }
}

export interface ListArticleJSON {
  id: string
  author: string
  description: string
  image: string
  link: string
  platform: string
  published: string
  title: string
}
