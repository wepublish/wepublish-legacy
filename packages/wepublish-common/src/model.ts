import {Value, ValueJSON} from 'slate'
import {slugify} from './utility'

export enum CoreBlockType {
  Article = 'article',
  Brand = 'brand'
}

export interface Block<T = any> {
  id: string
  type: string
  data: T
}

export type ModelData<T> = Pick<
  T,
  {[K in keyof T]: T[K] extends Function ? never : K}[keyof T]
>

export class Article {
  readonly id!: string
  readonly title!: string
  readonly description!: string
  readonly published!: Date
  readonly author!: string
  readonly image!: string
  readonly platform!: string
  readonly link!: string
  readonly content!: Value

  constructor(init: ModelData<Article>) {
    Object.assign(this, init)
  }

  getTitleSlug(): string {
    return slugify(this.title)
  }

  toJSON(): ArticleJSON {
    return {
      ...this,
      published: this.published.toISOString(),
      content: this.content.toJSON()
    }
  }

  clone(override: Partial<ModelData<Article>>): Article {
    return new Article({...this, ...override})
  }

  static fromJSON(json: ArticleJSON): Article {
    return new Article({
      ...json,
      published: new Date(json.published),
      content: Value.fromJSON(json.content)
    })
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
  readonly id!: string
  readonly title!: string
  readonly description!: string
  readonly published!: Date
  readonly author!: string
  readonly image!: string
  readonly platform!: string
  readonly link!: string

  constructor(init: ModelData<ListArticle>) {
    Object.assign(this, init)
  }

  getTitleSlug(): string {
    return slugify(this.title)
  }

  toJSON(): ListArticleJSON {
    return {
      ...this,
      published: this.published.toISOString()
    }
  }

  clone(override: Partial<ModelData<ListArticle>>): ListArticle {
    return new ListArticle({...this, ...override})
  }

  static fromJSON(json: ListArticleJSON): ListArticle {
    return new ListArticle({
      ...json,
      published: new Date(json.published)
    })
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
