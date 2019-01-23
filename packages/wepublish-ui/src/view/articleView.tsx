import React, {useMemo} from 'react'
import {Article} from '@wepublish/common'
import {rem} from 'csx'

import {useThemeStyle} from '../context/themeContext'

export interface ArticleViewProps {
  article?: Article
}

export function ArticleView(props: ArticleViewProps) {
  if (!props.article) return null

  const style = useThemeStyle(theme => [
    {
      padding: `${rem(2.1)} ${rem(2.3)}`,
      backgroundColor: theme.colors.color1
    }
  ])

  const elements = useMemo(
    () => {
      const value = props.article!.content
      const elements = value.document.nodes.map(node => (
        <div key={node!.key}>{node!.text}</div>
      ))

      return elements
    },
    [props.article.content]
  )

  return (
    <article className={style}>
      <header>
        <h1>{props.article.title}</h1>
        <h2>{props.article.description}</h2>
        <time dateTime={props.article.published.toISOString()}>
          {props.article.published.toLocaleDateString()}
        </time>
      </header>
      {elements}
    </article>
  )
}
