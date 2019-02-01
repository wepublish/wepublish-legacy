import React, {ReactNode} from 'react'
import {useThemeStyle, useTheme} from '../context/themeContext'

import {NavigationIcon} from './icons'
import {media} from 'typestyle'
import {em, percent, rem, viewHeight, px} from 'csx'
import {breakpoint, debugName, zIndex} from '../style'

export interface ContentWrapperProps {
  children: ReactNode
}

export function ContentWrapper(props: ContentWrapperProps) {
  const className = useThemeStyle(theme => [
    {
      $debugName: debugName(ContentWrapper),

      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      minHeight: viewHeight(100),

      $nest: {
        '> .header': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          position: 'sticky',
          zIndex: zIndex.navigation,
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
          display: 'flex',
          flexGrow: 1,
          width: percent(100)
        }
      }
    },
    media(
      {minWidth: breakpoint.tablet},
      {
        flexDirection: 'row',

        $nest: {
          '> .header': {
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
    <div className={className}>
      <header className="header">
        <NavigationIcon />
        {logo}
      </header>
      <div className="content">{props.children}</div>
      <footer />
    </div>
  )
}
