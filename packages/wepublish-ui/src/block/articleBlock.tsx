import React from 'react'
import {Article, RouteType} from '@wepublish/common'
import {Link} from '../components/link'
import {useThemeStyle} from '../context/themeContext'

export interface ArticleBlockProps {
  article: Article
}

export function ArticleBlock(props: ArticleBlockProps) {
  const className = useThemeStyle(theme => [
    {
      $debugName: ArticleBlock.name,
      backgroundColor: theme.colors.color3
    }
  ])

  return (
    <div className={className}>
      <img src={props.article.image} width={100} height={100} />
      <Link route={{type: RouteType.Article, articleID: props.article.id}}>
        {props.article.title}
      </Link>
    </div>
  )
}
