import React, {useMemo, useContext, ReactNode, useState} from 'react'
import {
  Article,
  capitalizeFirst,
  ArticleRoute,
  RouteType,
  slugify,
  ListArticle
} from '@wepublish/common'
import {rem, percent, em, px} from 'csx'
import {formatRelative} from 'date-fns'

import {useThemeStyle, useStyle} from '../context/themeContext'
import {LocaleContext} from '../context/localeContext'
import {debugName, breakpoint, mediaQueries} from '../style'
import {Grid, GridRow, GridItem} from '../components/grid'
import {media} from 'typestyle'
import {Block, Inline, Text, Leaf} from 'slate'
import {CommentSection} from '../components/commentSection'
import {
  TwitterShareButton,
  FacebookShareButton,
  EmailShareButton
} from '../components/shareButton'
import {Link} from '../components/link'

export interface ArticleViewProps {
  article?: Article
  relatedArticles?: ListArticle[]
}

const fullGridItemProps = {
  span: 14
}

const wideGridItemProps = {
  span: 14,
  spanBreakpoints: {[breakpoint.tablet]: 9}
}

const smallGridItemProps = {
  span: 14,
  spanBreakpoints: {[breakpoint.tablet]: 8}
}

export function ArticleView(props: ArticleViewProps) {
  if (!props.article) return null

  const localeContext = useContext(LocaleContext)
  const articleClassName = useStyle(() => [
    {
      $debugName: debugName(ArticleView),

      $nest: {
        h1: {
          fontSize: em(5.5),
          fontWeight: 'bold',
          margin: `${em(1.5 / 5.5)} 0`
        },
        h2: {
          fontSize: em(3),
          fontWeight: 'bold',
          margin: `${em(1.5 / 4)} 0`
        },
        h3: {
          fontSize: em(2.8),
          fontWeight: 'bold',
          margin: `${em(1.5 / 3.5)} 0`
        },
        h4: {
          fontSize: em(2.6),
          fontWeight: 'bold',
          margin: `${em(1.5 / 3)} 0`
        },
        h5: {
          fontSize: em(2.4),
          fontWeight: 'bold',
          margin: `${em(1.5 / 2.8)} 0`
        },
        h6: {
          fontSize: em(2.2),
          fontWeight: 'bold',
          margin: `${em(1.5 / 2.5)} 0`
        },
        'p.description': {
          fontSize: em(3),
          margin: `${em(1.5 / 3)} 0`
        },
        p: {
          fontSize: em(1.8),
          lineHeight: 1.5,
          margin: `${em(1.5 / 1.8)} 0`
        },
        ul: {
          fontSize: em(1.8),
          margin: 0,
          marginLeft: em(1)
        },
        li: {
          margin: `${em(1.5 / 1.8)} 0`
        },
        img: {
          width: percent(100),
          margin: `${em(1.5)} 0`
        }
      }
    },
    media(mediaQueries.mobile, {
      fontSize: rem(0.5),
      $nest: {
        p: {
          fontSize: em(2.8),
          margin: `${em(1.5 / 2.8)} 0`
        },
        ul: {
          fontSize: em(2.8),
          margin: 0,
          marginLeft: em(1)
        },
        li: {
          margin: `${em(1.5 / 2.8)} 0`
        }
      }
    }),
    media(mediaQueries.tablet, {
      fontSize: rem(0.8)
    }),
    media(mediaQueries.desktop, {
      fontSize: rem(1)
    })
  ])

  const articleContentWrapperClassName = useThemeStyle(theme => ({
    $debugName: debugName(ArticleView, 'contentWrapper'),
    backgroundColor: theme.colors.color1,
    overflow: 'hidden',
    maxWidth: rem(128),
    margin: '0 auto'
  }))

  const articleContentClassName = useThemeStyle(theme => ({
    $debugName: debugName(ArticleView, 'content'),
    padding: `${percent(4)} ${percent(3)}`,

    $nest: {
      '& p a, & p a:link, & p a:visited, & p a:hover, & p a:visited': {
        color: theme.colors.linkColor,
        textDecoration: 'underline'
      }
    }
  }))

  const dateAndAuthorClassName = useThemeStyle(theme => [
    {
      $debugName: debugName(ArticleView, 'dateAndAuthor'),

      fontSize: em(1.8),
      margin: `${em(1.5 / 1.8)} 0`,
      color: theme.colors.color3,

      $nest: {
        '> address': {
          display: 'inline'
        }
      }
    },
    media(mediaQueries.mobile, {
      fontSize: em(2.4)
    })
  ])

  const platformAndShareClassName = useThemeStyle(theme => [
    {
      $debugName: debugName(ArticleView, 'platformAndShare'),

      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      fontSize: em(1.8),
      color: theme.colors.color3,

      $nest: {
        '> .platform': {
          flexGrow: 1
        },

        '> .share': {
          display: 'flex',
          flexDirection: 'row',
          fontSize: em(7 / 1.8),
          $nest: {
            a: {marginLeft: em(2.5 / 7)}
          }
        }
      }
    },
    media(mediaQueries.mobile, {
      fontSize: em(2.4),
      $nest: {
        '> .share': {
          fontSize: em(7 / 2.4)
        }
      }
    })
  ])

  const articleFooterClassName = useThemeStyle(theme => [
    {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      fontSize: em(1.8),
      color: theme.colors.primaryTextColor,
      borderTop: `${px(1)} solid ${theme.colors.color4}`,
      marginTop: em(3),
      paddingTop: em(1),
      paddingRight: em(2),

      $nest: {
        '> .comments': {
          flexGrow: 1,
          textDecoration: 'underline'
        },

        '> .share': {
          display: 'flex',
          flexDirection: 'row',
          fontSize: em(3),
          $nest: {
            a: {marginLeft: em(2.5 / 7)}
          }
        }
      }
    },
    media(mediaQueries.mobile, {
      fontSize: em(2.4)
    })
  ])

  const relatedArticlesWrapperClassName = useThemeStyle(theme => ({
    backgroundColor: theme.colors.color2
  }))

  const relatedArticlesClassName = useStyle(() => ({
    overflow: 'hidden',
    maxWidth: rem(128),
    margin: '0 auto'
  }))

  const relatedArticlesContentClassName = useStyle(() => ({
    padding: `${percent(5)} ${percent(3)}`
  }))

  const relatedArticlesTitleClassName = useThemeStyle(theme => ({
    color: theme.colors.color3,
    fontSize: em(3),
    marginBottom: em(3 / 3)
  }))

  const elements = useMemo(
    () => {
      const value = props.article!.content
      const elements = value.document.nodes.map(node => renderSlateBlock(node!))
      return elements
    },
    [props.article.content]
  )

  const [commentsVisible, setCommentsVisible] = useState(false)

  const shareRoute: ArticleRoute = {
    type: RouteType.Article,
    articleID: props.article.id,
    titleSlug: slugify(props.article.title),
    article: props.article
  }

  return (
    <article className={articleClassName}>
      <div className={articleContentWrapperClassName}>
        <div className={articleContentClassName}>
          <Grid
            spacingHorizontal={0}
            spacingVertical={0}
            columns={14}
            unitFn={rem}>
            <GridRow tag="header">
              <GridItem {...fullGridItemProps}>
                <div className={platformAndShareClassName}>
                  <div className="platform">{props.article.platform}</div>
                  <div className="share">
                    <FacebookShareButton route={shareRoute} />
                    <TwitterShareButton route={shareRoute} />
                    <EmailShareButton route={shareRoute} />
                  </div>
                </div>
              </GridItem>

              <GridItem tag="h1" {...wideGridItemProps}>
                {props.article.title}
              </GridItem>

              {props.article.description && (
                <GridItem
                  tag="p"
                  className="description"
                  {...wideGridItemProps}>
                  {props.article.description}
                </GridItem>
              )}

              <GridItem
                {...wideGridItemProps}
                className={dateAndAuthorClassName}>
                <time dateTime={props.article.published.toISOString()}>
                  {capitalizeFirst(
                    formatRelative(props.article.published, new Date(), {
                      locale: localeContext.dateLocale
                    })
                  )}
                </time>
                {' - '}
                <address>{props.article.author}</address>
              </GridItem>
            </GridRow>
            <GridRow>
              {props.article.image && (
                <GridItem {...wideGridItemProps}>
                  <img src={props.article.image} />
                </GridItem>
              )}
            </GridRow>
            {elements}
            <GridRow>
              <GridItem tag="footer" {...smallGridItemProps}>
                <div className={articleFooterClassName}>
                  <div className="comments">
                    <a onClick={() => setCommentsVisible(true)}>Kommentare</a>
                  </div>
                  <div className="share">
                    <FacebookShareButton route={shareRoute} />
                    <TwitterShareButton route={shareRoute} />
                    <EmailShareButton route={shareRoute} />
                  </div>
                </div>
              </GridItem>
            </GridRow>
            {commentsVisible && (
              <GridRow>
                <GridItem {...wideGridItemProps}>
                  <CommentSection articleID={props.article.id} />
                </GridItem>
              </GridRow>
            )}
          </Grid>
        </div>
      </div>
      {props.relatedArticles && (
        <div className={relatedArticlesWrapperClassName}>
          <div className={relatedArticlesClassName}>
            <section className={relatedArticlesContentClassName}>
              <div className={relatedArticlesTitleClassName}>
                Weitere Artikel in dieser Rubrik
              </div>
              <Grid
                spacingHorizontal={3}
                spacingVertical={3}
                columns={4}
                unitFn={percent}>
                <GridRow>
                  {props.relatedArticles.map(article => (
                    <GridItem
                      key={article.id}
                      span={4}
                      spanBreakpoints={{[breakpoint.tablet]: 1}}>
                      <RelatedArticleBlock article={article} />
                    </GridItem>
                  ))}
                </GridRow>
              </Grid>
            </section>
          </div>
        </div>
      )}
    </article>
  )
}

export interface RelatedArticleBlockProps {
  article: ListArticle
}

export function RelatedArticleBlock(props: RelatedArticleBlockProps) {
  const className = useThemeStyle(theme => [
    {
      $debugName: debugName(RelatedArticleBlock),

      display: 'block',
      overflow: 'hidden',
      boxSizing: 'content-box',
      textDecoration: 'none',
      fontSize: em(2),
      color: theme.colors.color1,
      backgroundColor: theme.colors.color6,
      height: em(6),
      padding: `${percent(10)} ${percent(6)}`
    },
    media(mediaQueries.mobile, {
      fontSize: em(2.4),
      height: em(4)
    })
  ])

  const route: ArticleRoute = {
    type: RouteType.Article,
    articleID: props.article.id,
    titleSlug: slugify(props.article.title)
  }

  return (
    <Link route={route} className={className}>
      {props.article.title}
    </Link>
  )
}

export function renderSlateNode(node: Block | Text | Inline): ReactNode {
  switch (node.object) {
    case 'block':
      return renderSlateBlock(node)

    case 'inline':
      return renderSlateInline(node)

    case 'text':
      return renderSlateText(node)
  }
}

export function renderSlateBlock(block: Block): ReactNode {
  switch (block.type) {
    case 'heading':
      return (
        <GridRow key={block.key}>
          <GridItem
            tag={`h${block.data.get('level')}` as any}
            {...smallGridItemProps}>
            {block.nodes.map(node => renderSlateNode(node!))}
          </GridItem>
        </GridRow>
      )

    case 'image':
      return (
        <GridRow key={block.key}>
          <GridItem {...wideGridItemProps}>
            <img src={block.data.get('url')} />
          </GridItem>
        </GridRow>
      )

    case 'paragraph':
      if (block.text == '') return null

      return (
        <GridRow key={block.key}>
          <GridItem tag="p" {...smallGridItemProps}>
            {block.nodes.map(node => renderSlateNode(node!))}
          </GridItem>
        </GridRow>
      )

    case 'unordered-list':
      return (
        <GridRow key={block.key}>
          <GridItem tag="ul" {...smallGridItemProps}>
            {block.nodes.map(node => renderSlateNode(node!))}
          </GridItem>
        </GridRow>
      )

    case 'ordered-list':
      return (
        <GridRow key={block.key}>
          <GridItem tag="ol" {...smallGridItemProps}>
            {block.nodes.map(node => renderSlateNode(node!))}
          </GridItem>
        </GridRow>
      )

    case 'list-item':
      return (
        <li key={block.key}>
          {block.nodes.map(node => renderSlateNode(node!))}
        </li>
      )

    default:
      return (
        <GridRow key={block.key}>
          <GridItem {...smallGridItemProps}>
            {block.nodes.map(node => renderSlateNode(node!))}
          </GridItem>
        </GridRow>
      )
  }
}

export function renderSlateInline(inline: Inline): ReactNode {
  switch (inline.type) {
    case 'link':
      return (
        <a key={inline.key} href={inline.data.get('url')}>
          {inline.nodes.map(node => renderSlateNode(node!))}
        </a>
      )

    default:
      return inline.nodes.map(node => renderSlateNode(node!))
  }
}

export function renderSlateText(text: Text): ReactNode {
  const leaves = text.getLeaves()
  return leaves.map((leaf, index) => (
    <React.Fragment key={`${text.key}-${index}`}>
      {renderSlateLeaf(leaf!)}
    </React.Fragment>
  ))
}

export function renderSlateLeaf(leaf: Leaf): ReactNode {
  return leaf.marks!.reduceRight((acc: ReactNode, mark) => {
    switch (mark!.type) {
      case 'quote':
        return <q>{acc}</q>

      case 'italic':
        return <em>{acc}</em>

      case 'bold':
        return <strong>{acc}</strong>

      case 'strikethrough':
        return <del>{acc}</del>

      case 'subscript':
        return <sub>{acc}</sub>

      case 'superscript':
        return <sup>{acc}</sup>

      case 'underline':
        return <u>{acc}</u>

      case 'monospace':
        return <code>{acc}</code>

      default:
        return acc!
    }
  }, leaf.text)
}
