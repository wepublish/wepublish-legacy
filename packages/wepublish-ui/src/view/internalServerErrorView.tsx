import React from 'react'
import {useThemeStyle} from '../context/themeContext'
import {debugName} from '../style'
import {rem, percent} from 'csx'

export function InternalServerErrorView() {
  const className = useThemeStyle(theme => [
    {
      $debugName: debugName(InternalServerErrorView),
      width: percent(100),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: rem(4),
      color: theme.colors.primaryTextColor
    }
  ])

  return <div className={className}>500 Internal Server Error!</div>
}
