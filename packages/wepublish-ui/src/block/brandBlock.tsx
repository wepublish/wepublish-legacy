import React, {useContext} from 'react'
import {rem, percent} from 'csx'
import {ThemeContext, useStyle} from '../context/themeContext'
import {debugName} from '../style'
import {AspectRatio} from '../components/aspectRatio'

export function BrandBlock() {
  const themeContext = useContext(ThemeContext)
  const className = useStyle(() => [
    {
      $debugName: debugName(BrandBlock),

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      padding: percent(17.5),
      fontSize: rem(2),

      height: percent(100),

      $nest: {
        '> .logo': {
          width: percent(100)
        }
      }
    }
  ])

  return (
    <AspectRatio ratio={8 / 9}>
      <div className={className}>
        {<themeContext.logoComponent className="logo" />}
      </div>
    </AspectRatio>
  )
}
