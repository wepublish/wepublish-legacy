import React, {useContext} from 'react'
import {url, percent, rem, em, linearGradient, color, px} from 'csx'
import {media} from 'typestyle'
import {formatDistanceStrict} from 'date-fns'
import {Article, RouteType} from '@wepublish/common'
import {Link} from '../components/link'
import {useThemeStyle, useStyle} from '../context/themeContext'
import {debugName, mediaQueries} from '../style'
import {AspectRatio} from '../components/aspectRatio'
import {LocaleContext} from '../context/localeContext'

export interface ArticleBlockProps {
  article: Article
}

export function ArticleBlock(props: ArticleBlockProps) {
  const className = useThemeStyle(theme => [
    {
      $debugName: debugName(ArticleBlock),

      display: 'block',
      backgroundColor: theme.colors.color1,
      boxShadow: `0 0 ${rem(2.5)} ${theme.colors.shadowColor}`
    },
    media(mediaQueries.mobile, {
      fontSize: rem(2)
    }),
    media(mediaQueries.tablet, {
      fontSize: rem(2)
    }),
    media(mediaQueries.desktop, {
      fontSize: rem(2.5)
    })
  ])

  const imageClassName = useThemeStyle(theme => [
    {
      $debugName: debugName(ArticleBlock, 'image'),

      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: theme.colors.color2,

      width: percent(100),
      height: percent(100),

      $nest: {
        '> img': {
          display: 'none'
        }
      }
    }
  ])

  const contentWrapperClassName = useStyle(() => [
    {
      $debugName: debugName(ArticleBlock, 'contentWrapper'),
      display: 'flex',
      flexDirection: 'column',
      height: percent(100)
    }
  ])

  const contentClassName = useThemeStyle(theme => [
    {
      $debugName: debugName(ArticleBlock, 'content'),
      flexGrow: 1,
      padding: `${em(3 / 2.5)} ${em(2 / 2.5)}`,
      overflow: 'hidden',
      position: 'relative',
      color: theme.colors.primaryTextColor,

      $nest: {
        '&:before': {
          content: '""',
          position: 'absolute',
          bottom: px(-1), // Masks rounding errors
          left: 0,
          width: percent(100),
          height: percent(100),
          background: linearGradient(
            'to top',
            [theme.colors.color1, percent(0)],
            [color(theme.colors.color1).fade(0), percent(20)]
          )
        }
      }
    }
  ])

  const footerClassName = useThemeStyle(_theme => ({
    $debugName: debugName(ArticleBlock, 'footer'),
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'row',
    flexShrink: 0,
    padding: em(1.4 / 2.5),
    paddingTop: 0
  }))

  const platformClassName = useThemeStyle(theme => ({
    flexGrow: 1,
    fontSize: em(0.5),
    color: theme.colors.primaryTextColor
  }))

  const timeClassName = useThemeStyle(theme => ({
    $debugName: debugName(ArticleBlock, 'time'),
    display: 'inline-block',
    float: 'right',
    border: `${px(1)} solid ${theme.colors.color3}`,
    borderRadius: em(0.3),
    padding: `${em(0.5)} ${em(0.5)}`,
    fontSize: em(0.5),
    color: theme.colors.primaryTextColor
  }))

  const localeContext = useContext(LocaleContext)

  return (
    <Link
      className={className}
      route={{
        type: RouteType.Article,
        titleSlug: props.article.getTitleSlug(),
        articleID: props.article.id
      }}>
      <article>
        <AspectRatio ratio={8 / 9}>
          <div className={contentWrapperClassName}>
            {props.article.image && (
              <AspectRatio ratio={40 / 23}>
                <div
                  className={imageClassName}
                  style={{backgroundImage: url(props.article.image)}}>
                  <img alt={props.article.title} src={props.article.image} />
                </div>
              </AspectRatio>
            )}
            <div className={contentClassName}>{props.article.title}</div>
            <div className={footerClassName}>
              <div className={platformClassName}>{props.article.platform}</div>
              <time
                className={timeClassName}
                dateTime={props.article.published.toISOString()}>
                {formatDistanceStrict(props.article.published, new Date(), {
                  locale: localeContext.locale.dateLocale,
                  addSuffix: true
                })}
              </time>
            </div>
          </div>
        </AspectRatio>
      </article>
    </Link>
  )
}
