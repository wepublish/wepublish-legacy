import React, {useContext, ReactNode} from 'react'
import {useThemeStyle} from '../context/themeContext'
import {percent, px, em} from 'csx'
import {debugName} from '../style'
import {Route, reverseRoute} from '@wepublish/common'
import {AppContext} from '../context/appContext'
import {FacebookIcon, EmailIcon, TwitterIcon} from '../assets/icons'

export interface CommonShareButtonProps {
  href: string
  children?: ReactNode
}

export function CommonShareButton(props: CommonShareButtonProps) {
  const className = useThemeStyle(theme => ({
    $debugName: debugName(CommonShareButton),

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colors.primaryTextColor,
    fontSize: em(0.5),
    width: em(1 / 0.5),
    height: em(1 / 0.5),
    border: `${px(1)} solid ${theme.colors.primaryTextColor}`,
    borderRadius: percent(50),

    $nest: {
      '&:hover': {
        backgroundColor: theme.colors.color3
      },

      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none'
      }
    }
  }))

  return (
    <a className={className} href={props.href}>
      {props.children}
    </a>
  )
}

export interface ShareButtonProps {
  route: Route
}

export function FacebookShareButton(props: ShareButtonProps) {
  const appContext = useContext(AppContext)
  const url = `${appContext.hostname}${reverseRoute(props.route)}`

  return (
    <CommonShareButton
      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`}>
      <FacebookIcon />
    </CommonShareButton>
  )
}

export function TwitterShareButton(props: ShareButtonProps) {
  const appContext = useContext(AppContext)
  const url = `${appContext.hostname}${reverseRoute(props.route)}`

  return (
    <CommonShareButton
      href={`https://twitter.com/home?status==${encodeURIComponent(url)}`}>
      <TwitterIcon />
    </CommonShareButton>
  )
}

export function EmailShareButton(props: ShareButtonProps) {
  const appContext = useContext(AppContext)
  const url = `${appContext.hostname}${reverseRoute(props.route)}`

  return (
    <CommonShareButton href={`mailto:?body=${encodeURIComponent(url)}`}>
      <EmailIcon />
    </CommonShareButton>
  )
}
