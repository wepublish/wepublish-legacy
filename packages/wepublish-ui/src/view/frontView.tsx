import React from 'react'
import {rem, percent} from 'csx'
import {Block, CoreBlockType} from '@wepublish/common'
import {ArticleBlock} from '../block/articleBlock'
import {Grid, GridRow, GridItem} from '../components/grid'
import {useThemeStyle} from '../context/themeContext'
import {breakpoint, debugName} from '../style'

export interface FrontViewProps {
  blocks?: Block[]
}

export function FrontView(props: FrontViewProps) {
  if (!props.blocks) return null

  const className = useThemeStyle(theme => [
    {
      $debugName: debugName(FrontView),
      width: percent(100),
      padding: `${rem(2.1)} ${rem(2.3)}`,
      backgroundColor: theme.colors.color1,
      maxWidth: rem(128),
      margin: '0 auto'
    }
  ])

  return (
    <div className={className}>
      <Grid
        columns={1}
        spacingVertical={2}
        spacingHorizontal={2}
        breakpoints={{[breakpoint.desktop]: 3}}>
        <GridRow>
          {props.blocks.map(block => (
            <GridItem key={block.id}>{viewForBlock(block)}</GridItem>
          ))}
        </GridRow>
      </Grid>
    </div>
  )
}

function viewForBlock(block: Block) {
  switch (block.type) {
    case CoreBlockType.Article:
      return <ArticleBlock article={block.data} />

    default:
      return <div>Unknown block</div>
  }
}
