import React from 'react'

import {Route} from '@wepublish/common'
import {HistoryRouteContextProvider} from '../context/routeContext'
import {StaticThemeContextProvider, Theme} from '../context/themeContext'
import {RoutedRouteView} from './routeView'

export interface ApplicationViewProps {
  initialRoute: Route
  theme?: Theme
}

export class ApplicationView extends React.Component<ApplicationViewProps> {
  public render(): React.ReactNode {
    return (
      <HistoryRouteContextProvider initialRoute={this.props.initialRoute}>
        <StaticThemeContextProvider theme={this.props.theme}>
          <RoutedRouteView />
        </StaticThemeContextProvider>
      </HistoryRouteContextProvider>
    )
  }
}
