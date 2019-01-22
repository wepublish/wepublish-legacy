import React, {ReactNode} from 'react'
import {style} from 'typestyle'

export interface GridProps {
  children?: ReactNode
}

export function GridItem() {}

export function Grid(_props: GridProps) {
  const className = style({
    $debugName: Grid.name
  })

  return <div className={className} />
}
