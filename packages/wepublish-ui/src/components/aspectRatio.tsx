import React, {ReactNode} from 'react'
import {debugName} from '../style'
import {percent} from 'csx'
import {useStyle} from '../context/themeContext'

export interface AspectRatioProps {
  ratio: number
  children?: ReactNode
}

export function AspectRatio(props: AspectRatioProps) {
  const className = useStyle(
    () => [
      {
        $debugName: debugName(AspectRatio),

        position: 'relative',
        width: percent(100),
        paddingBottom: percent((1 / props.ratio) * 100),

        $nest: {
          '> .content': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: percent(100),
            height: percent(100)
          }
        }
      }
    ],
    [props.ratio]
  )

  return (
    <div className={className}>
      <div className="content">{props.children}</div>
    </div>
  )
}
