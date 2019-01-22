import React, {useContext, ReactElement} from 'react'
import {Route, RouteType} from '@wepublish/common'
import {RouteContext} from '../context/routeContext'
import {FrontView} from './frontView'

export function RouteView() {
  const routeContext = useContext(RouteContext)
  return viewForRoute(routeContext.route)
}

function viewForRoute(route: Route): ReactElement<any> | null {
  switch (route.type) {
    case RouteType.Front:
      return <FrontView blocks={route.blocks} />

    case RouteType.Article:
      return <div>Article!</div>
  }

  return <div>404 Not Found!</div>
}
