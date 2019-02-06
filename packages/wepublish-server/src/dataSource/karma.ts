import {Article, ListArticle, shuffleArray} from '@wepublish/common'
import {Remote, UserSession} from '@karma.run/sdk'
import * as xpr from '@karma.run/sdk/expression'

import {DataSource} from './interface'
import {ValueJSON} from 'slate'

export enum WepublishTags {
  Article = 'article'
}

export interface KarmaListArticle {
  id: [string, string]
  model: [string, string]
  updated: string
  value: {
    author: string
    description: string
    id: string
    image: string
    link: string
    platform: string
    published: string
    title: string
  }
}

export interface KarmaArticle {
  id: [string, string]
  model: [string, string]
  updated: string
  value: {
    metadata: {
      author: string
      description: string
      id: string
      image: string
      link: string
      platform: string
      published: string
      title: string
    }
    article: ValueJSON
  }
}

export class KarmaDataSource implements DataSource {
  private readonly remote: Remote
  private session?: UserSession

  public constructor(
    url: string,
    private readonly username: string,
    private readonly password: string
  ) {
    this.username = username
    this.password = password
    this.remote = new Remote(url)
  }

  private async clearSession() {
    this.session = undefined
  }

  private async getSession(): Promise<UserSession> {
    if (this.session) return this.session
    this.session = await this.remote.login(this.username, this.password)
    return this.session
  }

  private transformListArticle(article: KarmaListArticle): ListArticle {
    return ListArticle.fromJSON({...article.value, id: article.id[1]})
  }

  private transformArticle(article: KarmaArticle): Article {
    return Article.fromJSON({
      ...article.value.metadata,
      id: article.id[1],
      content: {
        // TEMP: Fix document JSON format
        document: {
          nodes: article.value.article.document as any,
          object: 'document'
        },
        object: 'value'
      }
    })
  }

  public async getArticle(id: string): Promise<Article> {
    const fetchArticle = async () => {
      const session = await this.getSession()
      const model = await session.do(xpr.tag(WepublishTags.Article))
      const article: KarmaArticle = await session.do(
        xpr.get(xpr.data(d => d.ref(model[1], id))).metarialize()
      )
      return this.transformArticle(article)
    }

    try {
      return await fetchArticle()
    } catch (err) {
      try {
        this.clearSession()
        return await fetchArticle()
      } catch (err) {
        console.error(err)
        throw err
      }
    }
  }

  public async getRelatedArticles(_id: string): Promise<ListArticle[]> {
    const today = new Date()
    const twoWeeksAgo = new Date()

    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)

    const articles = await this.getArticles(today, twoWeeksAgo)
    return shuffleArray(articles).slice(0, 4)
  }

  // TODO: Caching
  public async getArticles(from: Date, to: Date): Promise<ListArticle[]> {
    const fetchArticles = async () => {
      const session = await this.getSession()
      const articles: KarmaListArticle[] = await session.do(
        xpr
          .all(xpr.tag(WepublishTags.Article))
          .filterList((_index, value) =>
            value
              .field('metadata')
              .field('published')
              .with(date =>
                xpr.and(
                  date.before(xpr.data(d => d.dateTime(from))),
                  date.after(xpr.data(d => d.dateTime(to)))
                )
              )
          )
          .mapList((_index, value) =>
            value.metarialize().setField('value', value.field('metadata'))
          )
      )

      return articles.map(article => this.transformListArticle(article))
    }

    try {
      return await fetchArticles()
    } catch (err) {
      try {
        this.clearSession()
        return await fetchArticles()
      } catch (err) {
        console.error(err)
        throw err
      }
    }
  }
}
