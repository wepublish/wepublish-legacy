import React from 'react'
import {useThemeStyle} from '../context/themeContext'

export function NavigationIcon() {
  const className = useThemeStyle(theme => [
    {
      height: '1em',
      position: 'absolute',
      fill: theme.colors.primaryTextColor
    }
  ])

  return (
    <svg className={className} viewBox="0 0 22 20">
      <rect x="0" y="0" width="22" height="2" />
      <rect x="0" y="9" width="22" height="2" />
      <rect x="0" y="18" width="22" height="2" />
    </svg>
  )
}
