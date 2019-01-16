import React from 'react'
import {Route, RouteID} from '@wepublish/common'

export interface RouteContext {
  route: Route
}

export const RouteContext = React.createContext<RouteContext>({
  route: {id: RouteID.NotFound}
})
