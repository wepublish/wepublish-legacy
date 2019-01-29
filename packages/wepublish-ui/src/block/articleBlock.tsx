import React from 'react'
import {Article, RouteType} from '@wepublish/common'
import {Link} from '../components/link'
import {useThemeStyle} from '../context/themeContext'
import {debugName, zIndex} from '../style'
import {url, percent} from 'csx'

export interface ArticleBlockProps {
  article: Article
}

export function ArticleBlock(props: ArticleBlockProps) {
  const className = useThemeStyle(theme => [
    {
      $debugName: debugName(ArticleBlock),
      position: 'relative',
      paddingBottom: percent((9 / 16) * 100),
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: theme.colors.color3,

      $nest: {
        '> .content': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: zIndex.content,

          $nest: {
            '> img': {
              display: 'none'
            }
          }
        }
      }
    }
  ])

  return (
    <Link route={{type: RouteType.Article, articleID: props.article.id}}>
      <article
        className={className}
        style={{backgroundImage: url(props.article.image)}}>
        <div className="content">
          <img
            alt={props.article.title}
            src={props.article.image}
            width={100}
            height={100}
          />

          {props.article.title}
        </div>
      </article>
    </Link>
  )
}
