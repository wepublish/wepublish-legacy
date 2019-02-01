import React, {useContext, useEffect} from 'react'
import {em} from 'csx'

import {useThemeStyle} from '../context/themeContext'
import {debugName} from '../style'
import {AppContext} from '../context/appContext'

declare var Coral: any
let insertedTalkScript = false

export interface CommentSectionProps {
  articleID: string
}

export function CommentSection(props: CommentSectionProps) {
  const appContext = useContext(AppContext)
  const talkContainer = React.createRef<HTMLDivElement>()

  useEffect(() => {
    if (!insertedTalkScript) {
      const scriptEl = document.createElement('script')

      scriptEl.type = 'text/javascript'
      scriptEl.async = true
      scriptEl.src = `${appContext.talkURL}/embed.js`
      scriptEl.onload = () => {
        Coral.Talk.render(talkContainer.current, {
          talk: appContext.talkURL,
          asset_id: props.articleID, // TODO: Install plugin in talk server
          asset_url: location.href,
          lazy: true
        })
      }

      document.head.appendChild(scriptEl)
      insertedTalkScript = true
    } else {
      Coral.Talk.render(talkContainer.current, {
        talk: appContext.talkURL
      })
    }
  }, [])

  const className = useThemeStyle(theme => [
    {
      $debugName: debugName(CommentSection),
      backgroundColor: theme.colors.color1,
      margin: `${em(3)} 0`
    }
  ])

  return <section className={className} ref={talkContainer} />
}
