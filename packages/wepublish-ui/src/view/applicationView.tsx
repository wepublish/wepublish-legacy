import React from 'react'
import {Route} from '@wepublish/common'
import {RouteContext} from '../context/routeContext'
import {RouteView} from './routeView'

export interface ApplicationViewProps {
  initialRoute: Route
}

export type ApplicationViewState = {
  routeContext: RouteContext
}

export class ApplicationView extends React.Component<
  ApplicationViewProps,
  ApplicationViewState
> {
  public constructor(props: ApplicationViewProps) {
    super(props)
    this.state = {
      routeContext: {route: props.initialRoute}
    }
  }

  public render(): React.ReactNode {
    return (
      <div>
        <RouteContext.Provider value={this.state.routeContext}>
          <RouteView />
        </RouteContext.Provider>
      </div>
    )
  }
}
