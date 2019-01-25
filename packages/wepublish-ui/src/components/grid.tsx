import React, {ReactNode, useContext} from 'react'
import {style} from 'typestyle'
import {rem, percent} from 'csx'

export interface GridItemProps {
  children?: ReactNode
}

export function GridItem(_props: GridItemProps) {
  const gridContext = useContext(GridContext)

  const className = style({
    $debugName: GridItem.name,
    flexBasis: percent((1 / gridContext.columns) * 100),
    padding: `${rem(gridContext.spacingVertical / 2)} ${rem(
      gridContext.spacingHorizontal / 2
    )}`,

    $nest: {
      '> .test': {
        width: '100%',
        height: '30px',
        backgroundColor: 'red'
      }
    }
  })

  return (
    <div className={className}>
      <div className="test" />
    </div>
  )
}

export interface GridRowProps {
  children?: ReactNode
}

export function GridRow(props: GridRowProps) {
  const className = style({
    $debugName: GridRow.name,
    display: 'flex',
    flexWrap: 'wrap'
  })

  return <div className={className}>{props.children}</div>
}

export interface GridContext {
  columns: number
  spacingHorizontal: number
  spacingVertical: number
}

export const GridContext = React.createContext<GridContext>({
  columns: 0,
  spacingHorizontal: 0,
  spacingVertical: 0
})

export interface GridProps extends GridContext {
  children?: ReactNode
}

export function Grid(props: GridProps) {
  const className = style({
    $debugName: Grid.name,
    margin: `0 ${rem(-props.spacingHorizontal / 2)}`
  })

  return (
    <div className={className}>
      <GridContext.Provider value={props}>
        {props.children}
      </GridContext.Provider>
    </div>
  )
}
