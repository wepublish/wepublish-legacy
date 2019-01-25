import React from 'react'
import {rem} from 'csx'
import {Block, CoreBlockType} from '@wepublish/common'
import {ArticleBlock} from '../block/articleBlock'
import {Grid, GridRow, GridItem} from '../components/grid'
import {useThemeStyle} from '../context/themeContext'

export interface FrontViewProps {
  blocks?: Block[]
}

export function FrontView(props: FrontViewProps) {
  if (!props.blocks) return null

  const className = useThemeStyle(theme => [
    {
      $debugName: FrontView.name,
      padding: `${rem(2.1)} ${rem(2.3)}`,
      backgroundColor: theme.colors.color1,
      maxWidth: rem(128),
      margin: '0 auto'
    }
  ])

  return (
    <div className={className}>
      <Grid columns={3} spacingVertical={2} spacingHorizontal={2}>
        <GridRow>
          <GridItem />
          <GridItem />
          <GridItem />
        </GridRow>
        <GridRow>
          <GridItem />
          <GridItem />
          <GridItem />
        </GridRow>
        <GridRow>
          <GridItem />
          <GridItem />
          <GridItem />
        </GridRow>
      </Grid>

      {props.blocks.map(block => (
        <React.Fragment key={block.id}>{viewForBlock(block)}</React.Fragment>
      ))}
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
