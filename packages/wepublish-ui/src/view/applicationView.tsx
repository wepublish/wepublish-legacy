import React from 'react'

import {Route} from '@wepublish/common'
import {HistoryRouteContextProvider} from '../context/routeContext'
import {StaticThemeContextProvider} from '../context/themeContext'

import {ApplicationOptions} from '../option'
import {RouteView} from './routeView'

export interface ApplicationViewProps extends ApplicationOptions {
  initialRoute: Route
}

export function ApplicationView(props: ApplicationViewProps) {
  return (
    <HistoryRouteContextProvider initialRoute={props.initialRoute}>
      <StaticThemeContextProvider theme={props.theme}>
        <RouteView />
      </StaticThemeContextProvider>
    </HistoryRouteContextProvider>
  )
}
