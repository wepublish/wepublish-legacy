import React, {useContext, ReactNode} from 'react'
import {Route, reverseRoute} from '@wepublish/common'
import {RouteContext} from '../context/routeContext'

export interface LinkProps {
  route: Route
  className?: string
  children?: ReactNode
}

export function Link(props: LinkProps) {
  const routeContext = useContext(RouteContext)

  return (
    <a
      className={props.className}
      href={reverseRoute(props.route)}
      onClick={e => {
        e.preventDefault()
        routeContext.push(props.route)
      }}>
      {props.children}
    </a>
  )
}
