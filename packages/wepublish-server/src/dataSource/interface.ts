import {Article} from '@wepublish/common'

export interface DataSource {
  getArticles(from: Date, to: Date): Promise<Article[]>
}
