import React from 'react'
import {useThemeStyle} from '../context/themeContext'
import {debugName} from '../style'
import {percent, rem} from 'csx'

export function NotFoundView() {
  const className = useThemeStyle(theme => [
    {
      $debugName: debugName(NotFoundView),
      width: percent(100),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: rem(4),
      color: theme.colors.primaryTextColor
    }
  ])

  return <div className={className}>404 Not Found!</div>
}
