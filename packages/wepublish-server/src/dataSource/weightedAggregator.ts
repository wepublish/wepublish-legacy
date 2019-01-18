import {Article} from '@wepublish/common'
import {DataSource} from './interface'

export interface WeightedDataSource {
  id: string
  dataSource: DataSource
  weight: number
}

export class WeightedAggregatorDataSource {
  private readonly dataSources: WeightedDataSource[]

  public constructor(...dataSources: WeightedDataSource[]) {
    if (!dataSources.length) throw new Error('No DataSources provided.')
    this.dataSources = dataSources
  }

  private prefixArticleID(article: Article, id: string): Article {
    return {...article, id: `${id}-${article.id}`}
  }

  public async getArticles(from: Date, to: Date): Promise<Article[]> {
    const promises = this.dataSources.map(dataSource =>
      dataSource.dataSource.getArticles(from, to)
    )

    const articles = await Promise.all(promises)

    const mixedArticles = articles.reduce(
      (acc, articles, index) => {
        const dataSource = this.dataSources[index]

        const id = dataSource.id
        const weight = dataSource.weight

        // Prefix article IDs with DataSource ID.
        articles = articles.map(article => this.prefixArticleID(article, id))

        if (weight >= 1) {
          acc.push(...articles)
        } else {
          const numArticles = Math.floor(articles.length * weight)

          while (articles.length > numArticles) {
            articles.splice(Math.random() * articles.length, 1)
          }

          acc.push(...articles)
        }
        return acc
      },
      [] as Article[]
    )

    mixedArticles.sort(
      (a, b) =>
        new Date(a.published).getTime() - new Date(b.published).getTime()
    )

    return mixedArticles
  }
}
