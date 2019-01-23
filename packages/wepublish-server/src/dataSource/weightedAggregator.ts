import {Article, ListArticle} from '@wepublish/common'
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

  private prefixListArticleID(article: ListArticle, id: string): ListArticle {
    return {...article, id: `${id}-${article.id}`}
  }

  private prefixArticleID(article: Article, id: string): Article {
    return {...article, id: `${id}-${article.id}`}
  }

  public async getArticle(id: string): Promise<Article> {
    const dataSourceID = id.split('-')[0]
    const articleID = id.substr(dataSourceID.length + 1)

    const dataSource = this.dataSources.find(
      dataSource => dataSource.id == dataSourceID
    )

    if (!dataSource) {
      throw new Error(`Couldn't find dataSource for ID: ${dataSourceID}`)
    }

    return this.prefixArticleID(
      await dataSource.dataSource.getArticle(articleID),
      dataSource.id
    )
  }

  public async getArticles(from: Date, to: Date): Promise<ListArticle[]> {
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
        articles = articles.map(article =>
          this.prefixListArticleID(article, id)
        )

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
