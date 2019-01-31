import React, {ReactNode, useContext} from 'react'
import {media} from 'typestyle'
import {percent} from 'csx'
import {debugName} from '../style'
import {useStyle} from '../context/themeContext'

export interface GridItemProps {
  visibleAtBreakpoints?: (string | number)[]
  children?: ReactNode
}

export function GridItem(props: GridItemProps) {
  const gridContext = useContext(GridContext)
  const className = useStyle(
    () => [
      {
        $debugName: debugName(GridItem),
        display:
          props.visibleAtBreakpoints && props.visibleAtBreakpoints.length
            ? 'none'
            : 'block',
        flexBasis: percent((1 / gridContext.columns) * 100),
        padding: `${gridContext.unitFn(
          gridContext.spacingVertical / 2
        )} ${gridContext.unitFn(gridContext.spacingHorizontal / 2)}`
      },
      ...Object.keys(gridContext.breakpoints).map(key =>
        media(
          {minWidth: key},
          {
            flexBasis: percent((1 / gridContext.breakpoints[key]) * 100)
          }
        )
      ),
      ...(props.visibleAtBreakpoints || []).map(breakpoint =>
        media({minWidth: breakpoint}, {display: 'block'})
      )
    ],
    [
      gridContext.columns,
      gridContext.spacingVertical,
      gridContext.spacingHorizontal
    ]
  )

  return <div className={className}>{props.children}</div>
}

export interface GridRowProps {
  children?: ReactNode
}

export function GridRow(props: GridRowProps) {
  const className = useStyle(() => [
    {
      $debugName: debugName(GridRow),
      display: 'flex',
      flexWrap: 'wrap'
    }
  ])

  return <div className={className}>{props.children}</div>
}

export interface GridContext {
  columns: number
  spacingHorizontal: number
  spacingVertical: number
  unitFn: (num: number) => string | number
  breakpoints: {[size: string]: number}
}

export interface GridBreakpoint {
  columns: string
}

export const GridContext = React.createContext<GridContext>({
  columns: 0,
  spacingHorizontal: 0,
  spacingVertical: 0,
  unitFn: () => '',
  breakpoints: {}
})

export interface GridProps extends GridContext {
  children?: ReactNode
}

export function Grid(props: GridProps) {
  const className = useStyle(() => [
    {
      $debugName: debugName(Grid),
      margin: `${props.unitFn(-props.spacingVertical / 2)} ${props.unitFn(
        -props.spacingHorizontal / 2
      )}`
    }
  ])

  return (
    <div className={className}>
      <GridContext.Provider value={props}>
        {props.children}
      </GridContext.Provider>
    </div>
  )
}
