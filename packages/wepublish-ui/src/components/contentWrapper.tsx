import React, {ReactNode, useContext} from 'react'
import {useThemeStyle, useTheme, useStyle} from '../context/themeContext'

import {NavigationIcon} from './icons'
import {media} from 'typestyle'
import {em, rem, viewHeight, px} from 'csx'
import {debugName, zIndex, mediaQueries} from '../style'
import {Link} from './link'
import {RouteType} from '@wepublish/common'
import {AppContext} from '../context/appContext'

export interface ContentWrapperProps {
  children: ReactNode
}

export function ContentWrapper(props: ContentWrapperProps) {
  const className = useStyle(() => [
    {
      $debugName: debugName(ContentWrapper),

      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      minHeight: viewHeight(100)
    }
  ])

  const headerClassName = useThemeStyle(theme => [
    {
      $debugName: debugName(ContentWrapper, 'header'),

      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      position: 'sticky',
      zIndex: zIndex.navigation,
      top: 0,
      backgroundColor: theme.colors.color1,
      borderBottom: `${px(1)} solid ${theme.colors.color4}`,
      fontSize: rem(2.2),
      padding: `${rem(1.6)} ${rem(2)}`
    },
    media(mediaQueries.tablet, {
      flexDirection: 'column',
      maxHeight: viewHeight(100),
      borderBottom: 'none',
      borderRight: `${px(1)} solid ${theme.colors.color4}`,
      padding: `${rem(2.6)} ${rem(2)}`
    }),
    media(mediaQueries.desktop, {
      flexDirection: 'column',
      maxHeight: viewHeight(100),
      borderBottom: 'none',
      borderRight: `${px(1)} solid ${theme.colors.color4}`,
      padding: `${rem(2.6)} ${rem(2)}`
    })
  ])

  const logoClassName = useStyle(() => [
    {
      $debugName: debugName(ContentWrapper, 'logo'),

      height: em(1),
      margin: '0 auto'
    },
    media(mediaQueries.tablet, {
      display: 'none'
    }),
    media(mediaQueries.desktop, {
      display: 'none'
    })
  ])

  const contentWrapperClassName = useStyle(() => [
    {
      $debugName: debugName(ContentWrapper, 'contentWrapper'),

      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1
    },
    media(mediaQueries.tablet, {
      flexDirection: 'row'
    }),
    media(mediaQueries.desktop, {
      flexDirection: 'row'
    })
  ])

  const contentClassName = useStyle(() => ({
    $debugName: debugName(ContentWrapper, 'content'),

    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }))

  const footerClassName = useThemeStyle(theme => [
    {
      $debugName: debugName(ContentWrapper, 'footer'),

      display: 'flex',
      color: theme.colors.color1,
      backgroundColor: theme.colors.color7,
      fontSize: em(1),
      padding: `${em(1.5)} ${em(2.5)}`
    },
    media(mediaQueries.tablet, {
      fontSize: em(1.4)
    }),
    media(mediaQueries.desktop, {
      fontSize: em(1.6)
    })
  ])

  const logo = useTheme(theme => (
    <theme.logoComponent className={logoClassName} />
  ))

  const appContext = useContext(AppContext)

  return (
    <div className={className}>
      <div className={contentWrapperClassName}>
        <header className={headerClassName}>
          <Link route={{type: RouteType.Front}}>
            <NavigationIcon />
          </Link>
          {logo}
        </header>
        <div className={contentClassName}>{props.children}</div>
      </div>
      <footer className={footerClassName}>© {appContext.brandName}</footer>
    </div>
  )
}
