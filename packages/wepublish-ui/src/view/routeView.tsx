import React, {useContext, ReactNode, useEffect, useState} from 'react'
import ReactDOM from 'react-dom'

import {Route, RouteType, reverseRoute} from '@wepublish/common'
import {RouteContext} from '../context/routeContext'
import {FrontView} from './frontView'
import {ContentWrapper} from '../components/contentWrapper'
import {ArticleView} from './articleView'
import {NotFoundView} from './notFoundView'
import {InternalServerErrorView} from './internalServerErrorView'
import {AppContext} from '../context/appContext'

export function RouteView() {
  const routeContext = useContext(RouteContext)
  return <ContentWrapper>{viewForRoute(routeContext.route)}</ContentWrapper>
}

function viewForRoute(route: Route): ReactNode {
  switch (route.type) {
    case RouteType.Front:
      return <FrontView blocks={route.blocks} />

    case RouteType.Article:
      return (
        <ArticleView
          article={route.article}
          relatedArticles={route.relatedArticles}
        />
      )

    case RouteType.InternalServerError:
      return <InternalServerErrorView />
  }

  return <NotFoundView />
}

export let currentMetadata: ReactNode = null

export function MetadataRouteView(): JSX.Element | null {
  const appContext = useContext(AppContext)
  const routeContext = useContext(RouteContext)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    document.title = titleForRoute(routeContext.route, appContext.siteName)

    if (!isClient) {
      const serverNodes = document.head.querySelectorAll('[data-server-side]')
      serverNodes.forEach(node => node.remove())
      setIsClient(true)
    }
  })

  if (isClient) {
    return ReactDOM.createPortal(
      metadataForRoute(
        routeContext.route,
        appContext.hostname,
        appContext.siteName,
        appContext.siteDescription
      ),
      document.head
    )
  } else {
    currentMetadata = metadataForRoute(
      routeContext.route,
      appContext.hostname,
      appContext.siteName,
      appContext.siteDescription,
      true
    )
  }

  return null
}

export function titleForRoute(route: Route, fallback: string): string {
  switch (route.type) {
    case RouteType.Article:
      return (route.article && route.article.title) || fallback
  }

  return fallback
}

export function metadataForRoute(
  route: Route,
  hostname: string,
  titleFallback: string,
  descriptionFallback: string,
  serverRender: boolean = false // TODO: Find better solution
): ReactNode {
  const canonicalURL = `${hostname}${reverseRoute(route)}`
  const serverSideAttr = serverRender ? '' : undefined

  switch (route.type) {
    case RouteType.Article:
      return (
        route.article && (
          <React.Fragment>
            {serverRender && (
              <title data-server-side={serverSideAttr}>
                {titleForRoute(route, titleFallback)}
              </title>
            )}
            <meta name="description" content={route.article.description} />
            <meta
              property="og:type"
              content="article"
              data-server-side={serverSideAttr}
            />
            <meta
              property="og:title"
              content={route.article.title}
              data-server-side={serverSideAttr}
            />
            <meta
              property="og:description"
              content={route.article.description}
              data-server-side={serverSideAttr}
            />
            <meta
              property="article:published_time"
              content={route.article.published.toISOString()}
              data-server-side={serverSideAttr}
            />
            <meta
              property="og:image"
              content={route.article.image}
              data-server-side={serverSideAttr}
            />
            <meta
              property="og:url"
              content={canonicalURL}
              data-server-side={serverSideAttr}
            />
            <link
              rel="canonical"
              href={canonicalURL}
              data-server-side={serverSideAttr}
            />
          </React.Fragment>
        )
      )
  }

  return (
    <React.Fragment>
      {serverRender && (
        <title data-server-side={serverSideAttr}>
          {titleForRoute(route, titleFallback)}
        </title>
      )}
      <meta name="description" content={descriptionFallback} />
    </React.Fragment>
  )
}

export function extractMetadata(): ReactNode {
  return currentMetadata
}
