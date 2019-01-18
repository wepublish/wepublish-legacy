import React from 'react'
import {Omit} from '@wepublish/common'

export function createContextHOC<
  K extends string,
  C,
  CP extends {[key in K]: C}
>(Context: React.Context<C>, propName: K, displayNamePrefix?: string) {
  function hoc<P extends CP>(Component: React.ComponentType<P>) {
    // TODO: Check if type error is fixable.
    const AnyComponent = Component as any
    const componentName = Component.displayName || Component.name

    const consumer: React.StatelessComponent<Omit<P, K>> = props => (
      <Context.Consumer>
        {context => <AnyComponent {...props} {...{[propName]: context}} />}
      </Context.Consumer>
    )

    consumer.displayName = `${displayNamePrefix || ''}${componentName}`

    return consumer
  }

  return hoc
}
