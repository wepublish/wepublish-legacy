import * as React from 'react'
import memoizeOne from 'memoize-one'
import {style} from 'typestyle'

import {WithThemeContext, Theme} from '../context/themeContext'

const iconStyle = memoizeOne((theme: Theme) => {
  return style({
    height: '1em',
    fill: theme.colors.primaryTextColor
  })
})

export interface IconProps extends WithThemeContext {}

export const NavigationIcon: React.StatelessComponent<IconProps> = props => (
  <svg className={iconStyle(props.themeContext)} viewBox="0 0 22 20">
    <rect x="0" y="0" width="22" height="2" />
    <rect x="0" y="9" width="22" height="2" />
    <rect x="0" y="18" width="22" height="2" />
  </svg>
)
