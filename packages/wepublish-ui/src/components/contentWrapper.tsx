import React, {ReactNode} from 'react'
import {useThemeStyle, useTheme} from '../context/themeContext'

import {NavigationIcon} from './icons'
import {media} from 'typestyle'
import {em, percent, rem, viewHeight, px} from 'csx'

export interface ContentWrapperProps {
  children: ReactNode
}

export function ContentWrapper(props: ContentWrapperProps) {
  const className = useThemeStyle(theme => [
    {
      $debugName: 'ContentWrapper',

      display: 'flex',
      flexDirection: 'column',
      width: '100%',

      $nest: {
        '> .navigationBar': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          backgroundColor: theme.colors.color1,
          borderBottom: `${px(1)} solid ${theme.colors.color4}`,
          fontSize: rem(2.2),
          padding: `${rem(1.6)} ${rem(2)}`,

          $nest: {
            '> .logo': {
              height: em(1),
              margin: '0 auto'
            }
          }
        },

        '> .content': {
          width: percent(100)
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
            height: viewHeight(100),
            borderBottom: 'none',
            borderRight: `${px(1)} solid ${theme.colors.color4}`,
            padding: rem(2.6),

            $nest: {
              '> .logo': {
                display: 'none'
              }
            }
          }
        }
      }
    )
  ])

  const logo = useTheme(theme => <theme.logoComponent className="logo" />)

  return (
    <header className={className}>
      <nav className="navigationBar">
        <NavigationIcon />
        {logo}
      </nav>
      <div className="content">{props.children}</div>
    </header>
  )
}
