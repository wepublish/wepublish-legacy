import React, {useEffect, useContext} from 'react'
import {rem, percent} from 'csx'

import {AppContext} from '../context/appContext'
import {useThemeStyle} from '../context/themeContext'
import {debugName} from '../style'

declare var Coral: any

export interface CommentViewProps {
  articleID: string
}

export function CommentView(_props: CommentViewProps) {
  const appContext = useContext(AppContext)
  const talkContainer = React.createRef<HTMLElement>()

  useEffect(() => {
    const scriptEl = document.createElement('script')

    scriptEl.type = 'text/javascript'
    scriptEl.async = true
    scriptEl.src = `${appContext.talkURL}/embed.js`
    scriptEl.onload = () => {
      Coral.Talk.render(talkContainer.current, {
        talk: appContext.talkURL
      })
    }

    document.head.appendChild(scriptEl)
  }, [])

  const className = useThemeStyle(theme => [
    {
      $debugName: debugName(CommentView),
      width: percent(100),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: rem(4),
      color: theme.colors.primaryTextColor
    }
  ])

  return <article className={className} ref={talkContainer} />
}
