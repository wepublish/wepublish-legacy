import React, {useContext, ReactElement} from 'react'
import {Route, RouteType} from '@wepublish/common'
import {RouteContext} from '../context/routeContext'
import {FrontView} from './frontView'
import {ContentWrapper} from '../components/contentWrapper'
import {ArticleView} from './articleView'

export function RouteView() {
  const routeContext = useContext(RouteContext)
  return <ContentWrapper>{viewForRoute(routeContext.route)}</ContentWrapper>
}

function viewForRoute(route: Route): ReactElement<any> | null {
  switch (route.type) {
    case RouteType.Front:
      return <FrontView blocks={route.blocks} />

    case RouteType.Article:
      return <ArticleView article={route.article} />
  }

  return <div>404 Not Found!</div>
}
