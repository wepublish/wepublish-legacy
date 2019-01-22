import React, {ReactNode, useMemo} from 'react'
import {rem} from 'csx'
import {style} from 'typestyle'

export interface Inset {
  top: number
  bottom: number
  left: number
  right: number
}

export interface InsetContentProps {
  children?: ReactNode
  inset: Inset
}

export function InsetContent(props: InsetContentProps) {
  const className = useMemo(
    () =>
      style({
        paddingTop: rem(props.inset.top),
        paddingBottom: rem(props.inset.bottom),
        paddingLeft: rem(props.inset.left),
        paddingRight: rem(props.inset.right)
      }),
    [props.inset.top, props.inset.bottom, props.inset.left, props.inset.right]
  )
  return <div className={className}>{props.children}</div>
}
