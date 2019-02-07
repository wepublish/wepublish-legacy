import React, {ReactNode, useContext, ReactHTML} from 'react'
import {media, classes} from 'typestyle'
import {percent, rem, px} from 'csx'
import {debugName} from '../style'
import {useStyle} from '../context/themeContext'

export interface GridItemProps {
  tag?: keyof ReactHTML
  className?: string
  span: number
  spanBreakpoints?: {[key: number]: number}
  visibleAtBreakpoints?: (string | number)[]
  children?: ReactNode
}

export function GridItem(props: GridItemProps) {
  const gridContext = useContext(GridContext)
  const spanBreakpoints = props.spanBreakpoints

  if (props.span > gridContext.columns)
    throw new Error('GridItem span larger than Grid columns')

  const className = useStyle(
    () => [
      {
        $debugName: debugName(GridItem),
        display: props.span ? 'block' : 'none',
        flexBasis: percent((props.span / gridContext.columns) * 100),
        flexShrink: 0,
        padding: `${gridContext.unitFn(
          gridContext.spacingVertical / 2
        )} ${gridContext.unitFn(gridContext.spacingHorizontal / 2)}`
      },
      ...(spanBreakpoints
        ? Object.keys(spanBreakpoints).map(key => {
            const numKey = parseInt(key)
            return media(
              {minWidth: px(numKey)},
              {
                flexBasis: percent(
                  (spanBreakpoints[numKey] / gridContext.columns) * 100
                ),
                display: spanBreakpoints[numKey] ? 'block' : 'none'
              }
            )
          })
        : [])
    ],
    [
      gridContext.columns,
      gridContext.spacingVertical,
      gridContext.spacingHorizontal,
      spanBreakpoints
    ]
  )

  const TagName = (props.tag || 'div') as any
  return (
    <TagName className={classes(className, props.className)}>
      {props.children}
    </TagName>
  )
}

export interface GridRowProps {
  tag?: keyof ReactHTML
  className?: string
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

  const TagName = (props.tag || 'div') as any
  return (
    <TagName className={classes(className, props.className)}>
      {props.children}
    </TagName>
  )
}

export interface GridContext {
  columns: number
  spacingHorizontal: number
  spacingVertical: number
  unitFn: (num: number) => string | number
  noMargin?: boolean
}

export interface GridBreakpoint {
  columns: string
}

export const GridContext = React.createContext<GridContext>({
  columns: 0,
  spacingHorizontal: 0,
  spacingVertical: 0,
  unitFn: rem,
  noMargin: false
})

export interface GridProps extends GridContext {
  tag?: keyof ReactHTML
  className?: string
  children?: ReactNode
}

export function Grid(props: GridProps) {
  const className = useStyle(() => [
    {
      $debugName: debugName(Grid),
      margin: !props.noMargin
        ? `${props.unitFn(-props.spacingVertical / 2)} ${props.unitFn(
            -props.spacingHorizontal / 2
          )}`
        : undefined
    }
  ])

  const TagName = (props.tag || 'div') as any

  return (
    <TagName className={classes(className, props.className)}>
      <GridContext.Provider value={props}>
        {props.children}
      </GridContext.Provider>
    </TagName>
  )
}
