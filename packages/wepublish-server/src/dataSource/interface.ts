import {Article, ListArticle} from '@wepublish/common'

export interface DataSource {
  getArticle(id: string): Promise<Article>
  getArticles(from: Date, to: Date): Promise<ListArticle[]>
}
