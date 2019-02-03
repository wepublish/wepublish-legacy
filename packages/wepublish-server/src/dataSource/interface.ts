import {Article, ListArticle} from '@wepublish/common'

export interface DataSource {
  getArticle(id: string): Promise<Article>
  getRelatedArticles(id: string): Promise<ListArticle[]>
  getArticles(from: Date, to: Date): Promise<ListArticle[]>
}
