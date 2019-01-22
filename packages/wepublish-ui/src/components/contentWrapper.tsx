import React, {ReactNode} from 'react'
import {useTheme} from '../context/themeContext'

import {NavigationIcon} from './icons'
import {media} from 'typestyle'

export interface ContentWrapperProps {
  children: ReactNode
}

export function ContentWrapper(props: ContentWrapperProps) {
  const className = useTheme(theme => [
    {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.colors.color2,
      width: '100%',

      $nest: {
        '> .navigationBar': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          backgroundColor: theme.colors.color1,
          fontSize: '2.2rem',
          padding: '2rem 1.6rem'
        },

        '> .content': {
          width: '100%'
        }
      }
    },
    media(
      {minWidth: 720},
      {
        flexDirection: 'row',

        $nest: {
          '> .navigationBar': {
            flexDirection: 'column',
            height: '100vh'
          }
        }
      }
    )
  ])

  return (
    <div className={className}>
      <div className="navigationBar">
        <NavigationIcon />
      </div>
      <div className="content">{props.children}</div>
    </div>
  )
}
