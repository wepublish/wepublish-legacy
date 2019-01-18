export enum CoreBlockType {
  Article = 'article'
}

export interface Block<T = any> {
  id: string
  type: string
  data: T
}

export interface Article {
  id: string
  author: string
  description: string
  image: string
  link: string
  platform: string
  published: Date
  title: string
  content: any // TODO: Slate typings
}
