import React from 'react'
import {Article, RouteType} from '@wepublish/common'
import memoizeOne from 'memoize-one'

import {style} from 'typestyle'

import {
  Theme,
  withThemeContext,
  WithThemeContext
} from '../context/themeContext'

import {LinkWithRouteContext} from '../components/link'

const articleBlockStyle = memoizeOne((_theme: Theme) => {
  return style()
})

export interface ArticleBlockProps extends WithThemeContext {
  article: Article
}

export class ArticleBlock extends React.Component<ArticleBlockProps> {
  public render(): React.ReactNode {
    return (
      <div className={articleBlockStyle(this.props.themeContext)}>
        <img src={this.props.article.image} width={100} height={100} />
        <LinkWithRouteContext
          route={{type: RouteType.Article, articleID: this.props.article.id}}>
          {this.props.article.title}
        </LinkWithRouteContext>
      </div>
    )
  }
}

export const ThemedArticleBlock = withThemeContext(ArticleBlock)
