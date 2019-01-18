import React from 'react'
import {Route, RouteType} from '@wepublish/common'
import {withRouteContext, WithRouteContext} from '../context/routeContext'
import {FrontView} from './frontView'

export interface RouteViewProps extends WithRouteContext {}

export class RouteView extends React.Component<RouteViewProps> {
  public render(): React.ReactNode {
    return this.viewForRoute(this.props.routeContext.route)
  }

  private viewForRoute(route: Route): React.ReactNode {
    switch (route.type) {
      case RouteType.Front:
        return <FrontView blocks={route.blocks} />

      case RouteType.Article:
        return <div>Article!</div>

      case RouteType.NotFound:
        return <div>404 Not Found!</div>
    }
  }
}

export const RoutedRouteView = withRouteContext(RouteView)
