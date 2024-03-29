import React from 'react'
import {
  RouteType,
  Route,
  reverseRoute,
  matchRoute,
  unserializeRoute
} from '@wepublish/common'

export type RouteContext = {
  route: Route
  push: (route: Route) => void
  replace: (route: Route) => void
  pop: () => void
}

export const RouteContext = React.createContext<RouteContext>({
  route: {type: RouteType.NotFound},
  push: () => {},
  replace: () => {},
  pop: () => {}
})

export interface HistoryRouteContextProviderProps {
  initialRoute: Route
}

export class HistoryRouteContextProvider extends React.Component<
  HistoryRouteContextProviderProps,
  RouteContext
> {
  public constructor(props: HistoryRouteContextProviderProps) {
    super(props)

    this.state = {
      route: props.initialRoute,
      push: this.push,
      replace: this.replace,
      pop: this.pop
    }
  }

  public push = (route: Route) => {
    window.history.pushState(null, '', reverseRoute(route))
    this.setState({route})
  }

  public replace = (route: Route) => {
    window.history.replaceState(null, '', reverseRoute(route))
    this.setState({route})
  }

  public pop = () => {
    window.history.back()
  }

  public componentDidMount() {
    window.addEventListener('popstate', () => {
      const route = matchRoute(window.location.pathname, window.location.search)
      this.setState({route: route})
    })
  }

  public componentDidUpdate() {
    this.loadRouteData(this.state.route)
  }

  private shouldLoadRouteData(route: Route): boolean {
    switch (route.type) {
      case RouteType.Article:
        return !route.article

      case RouteType.Front:
        return !route.blocks
    }

    return false
  }

  private async loadRouteData(route: Route) {
    if (!this.shouldLoadRouteData(route)) return

    const path = reverseRoute(route)
    const response = await fetch(`/api/route${path}`)
    const newRoute = unserializeRoute(await response.json())

    this.setState({route: newRoute})
  }

  public render(): React.ReactNode {
    return (
      <RouteContext.Provider value={this.state}>
        {this.props.children}
      </RouteContext.Provider>
    )
  }
}
