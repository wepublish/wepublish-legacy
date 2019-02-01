import React from 'react'
import {rem, percent} from 'csx'
import {Block, CoreBlockType} from '@wepublish/common'
import {ArticleBlock} from '../block/articleBlock'
import {BrandBlock} from '../block/brandBlock'
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
      backgroundColor: theme.colors.color2,

      $nest: {
        '> .contentWrapper': {
          width: percent(100),
          maxWidth: rem(128),
          margin: '0 auto',

          $nest: {
            '> .content': {
              padding: `${percent(4)} ${percent(3)}`
            }
          }
        }
      }
    }
  ])

  // TEMP: Currently hardcoded
  const blocks = props.blocks.concat()

  blocks.splice(2, 0, {
    id: 'brand',
    type: CoreBlockType.Brand,
    data: undefined
  })

  return (
    <div className={className}>
      <div className="contentWrapper">
        <div className="content">
          <Grid
            columns={3}
            spacingVertical={5}
            spacingHorizontal={3}
            unitFn={percent}>
            <GridRow>
              {blocks.map(block => (
                <React.Fragment key={block.id}>
                  {viewForBlock(block)}
                </React.Fragment>
              ))}
            </GridRow>
          </Grid>
        </div>
      </div>
    </div>
  )
}

function viewForBlock(block: Block) {
  switch (block.type) {
    case CoreBlockType.Article:
      return (
        <GridItem span={3} spanBreakpoints={{[breakpoint.tablet]: 1}}>
          <ArticleBlock article={block.data} />
        </GridItem>
      )

    case CoreBlockType.Brand:
      return (
        <GridItem span={0} spanBreakpoints={{[breakpoint.tablet]: 1}}>
          <BrandBlock />
        </GridItem>
      )

    default:
      return <div>Unknown block</div>
  }
}
