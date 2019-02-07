import React from 'react'

import {Route} from '@wepublish/common'

import {HistoryRouteContextProvider} from '../context/routeContext'
import {StaticLocaleContextProvider} from '../context/localeContext'
import {StaticThemeContextProvider} from '../context/themeContext'

import {ApplicationOptions} from '../option'
import {RouteView, MetadataRouteView} from './routeView'
import {StaticAppContextProvider} from '../context/appContext'

export interface ApplicationViewProps extends ApplicationOptions {
  initialRoute: Route
}

export function ApplicationView(props: ApplicationViewProps) {
  return (
    <StaticAppContextProvider
      siteName={props.siteName}
      siteDescription={props.siteDescription}
      brandName={props.brandName}
      talkURL={props.talkURL}
      hostname={props.hostname}>
      <HistoryRouteContextProvider initialRoute={props.initialRoute}>
        <StaticLocaleContextProvider locale={props.locale}>
          <StaticThemeContextProvider theme={props.theme}>
            <MetadataRouteView />
            <RouteView />
          </StaticThemeContextProvider>
        </StaticLocaleContextProvider>
      </HistoryRouteContextProvider>
    </StaticAppContextProvider>
  )
}
