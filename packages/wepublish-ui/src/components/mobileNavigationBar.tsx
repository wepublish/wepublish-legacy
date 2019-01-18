import React from 'react'
import memoizeOne from 'memoize-one'
import {style} from 'typestyle'

import {
  Theme,
  withThemeContext,
  WithThemeContext
} from '../context/themeContext'

import {NavigationIcon} from './icons'

const navigationBarStyle = memoizeOne((theme: Theme) => {
  return style({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colors.color1,
    fontSize: '2.2rem',
    padding: '2rem 1.6rem'
  })
})

export interface MobileNavigationBarProps extends WithThemeContext {}

export class MobileNavigationBar extends React.Component<
  MobileNavigationBarProps
> {
  public render(): React.ReactNode {
    return (
      <div className={navigationBarStyle(this.props.themeContext)}>
        <NavigationIcon themeContext={this.props.themeContext} />
      </div>
    )
  }
}

export const ThemedMobileNavigationBar = withThemeContext(MobileNavigationBar)
