import React from 'react'

import {Route} from '@wepublish/common'

import {HistoryRouteContextProvider} from '../context/routeContext'
import {StaticLocaleContextProvider} from '../context/localeContext'
import {StaticThemeContextProvider} from '../context/themeContext'

import {ApplicationOptions} from '../option'
import {RouteView} from './routeView'

export interface ApplicationViewProps extends ApplicationOptions {
  initialRoute: Route
}

export function ApplicationView(props: ApplicationViewProps) {
  return (
    <HistoryRouteContextProvider initialRoute={props.initialRoute}>
      <StaticLocaleContextProvider
        locale={props.locale}
        dateLocale={props.dateLocale}>
        <StaticThemeContextProvider theme={props.theme}>
          <RouteView />
        </StaticThemeContextProvider>
      </StaticLocaleContextProvider>
    </HistoryRouteContextProvider>
  )
}
