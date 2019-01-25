import React, {useMemo, useContext} from 'react'
import {Article} from '@wepublish/common'
import {rem, percent, em} from 'csx'
import {formatRelative} from 'date-fns'

import {useThemeStyle} from '../context/themeContext'
import {LocaleContext} from '../context/localeContext'

export interface ArticleViewProps {
  article?: Article
}

export function ArticleView(props: ArticleViewProps) {
  if (!props.article) return null

  const style = useThemeStyle(theme => [
    {
      $debugName: ArticleView.name,
      padding: `${rem(2.1)} ${rem(2.3)}`,
      backgroundColor: theme.colors.color1,
      // maxWidth: rem(136.5),
      maxWidth: rem(84.5),
      margin: '0 auto',

      $nest: {
        '> header': {
          $nest: {
            '> h1': {
              fontSize: em(5.5)
            },
            '> p': {
              fontSize: em(3)
            },
            '> .info': {
              fontSize: em(1.8),
              color: theme.colors.color3,

              $nest: {
                address: {display: 'inline'}
              }
            }
          }
        },
        '> .leadImage': {
          width: percent(100)
        },
        '> p': {
          fontSize: em(1.8)
        }
      }
    }
  ])

  const elements = useMemo(
    () => {
      const value = props.article!.content
      const elements = value.document.nodes.map(node => (
        <p key={node!.key}>{node!.text}</p>
      ))

      return elements
    },
    [props.article.content]
  )

  const localeContext = useContext(LocaleContext)

  return (
    <article className={style}>
      <header>
        <h1>{props.article.title}</h1>
        <p>{props.article.description}</p>
        <div className="info">
          <time dateTime={props.article.published.toISOString()}>
            {formatRelative(props.article.published, new Date(), {
              locale: localeContext.dateLocale
            })}
          </time>
          {' - '}
          <address>{props.article.author}</address>
        </div>
      </header>
      <img className="leadImage" src={props.article.image} />
      {elements}
    </article>
  )
}
