import React from 'react'
import {Route, reverseRoute} from '@wepublish/common'
import {withRouteContext, WithRouteContext} from '../context/routeContext'

export interface LinkProps extends WithRouteContext {
  route: Route
}

export class Link extends React.Component<LinkProps> {
  private handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    this.props.routeContext.push(this.props.route)
  }

  public render(): React.ReactNode {
    return (
      <a href={reverseRoute(this.props.route)} onClick={this.handleClick}>
        {this.props.children}
      </a>
    )
  }
}

export const LinkWithRouteContext = withRouteContext(Link)
