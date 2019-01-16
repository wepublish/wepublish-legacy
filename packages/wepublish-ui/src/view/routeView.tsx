import React from 'react'
import {Route, RouteID} from '@wepublish/common'
import {RouteContext} from '../context/routeContext'

export interface IRouteViewProps {}
export interface IRouteViewState {}

export class RouteView extends React.Component<
  IRouteViewProps,
  IRouteViewState
> {
  public render(): React.ReactNode {
    return (
      <RouteContext.Consumer>
        {context => this.viewForRoute(context.route)}
      </RouteContext.Consumer>
    )
  }

  private viewForRoute(route: Route): React.ReactNode {
    switch (route.id) {
      case RouteID.Front:
        return <div>Front!</div>

      case RouteID.Article:
        return <div>Article!</div>

      case RouteID.NotFound:
        return <div>404 Not Found!</div>
    }
  }
}
