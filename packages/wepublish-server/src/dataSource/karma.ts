import {Article} from '@wepublish/common'
import {Remote, UserSession} from '@karma.run/sdk'
import * as xpr from '@karma.run/sdk/expression'

import {DataSource} from './interface'

export enum WepublishTags {
  Article = 'article'
}

export interface KarmaArticle {
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
  article: string
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

  private async getSession(): Promise<UserSession> {
    if (this.session) return this.session
    this.session = await this.remote.login(this.username, this.password)
    return this.session
  }

  private transformArticle(article: KarmaArticle): Article {
    return {
      ...article.metadata,
      published: new Date(article.metadata.published),
      content: article.article
    }
  }

  // TODO: Caching
  public async getArticles(from: Date, to: Date): Promise<Article[]> {
    const session = await this.getSession()

    try {
      const articles: KarmaArticle[] = await session.do(
        xpr.all(xpr.tag(WepublishTags.Article)).filterList((_index, value) =>
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
      )
      return articles.map(article => this.transformArticle(article))
    } catch (err) {
      // TODO: Check session expiration and refetch
      console.log(err)
      throw err
    }
  }
}
