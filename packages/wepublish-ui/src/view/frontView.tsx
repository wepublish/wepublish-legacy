import React from 'react'
import {Block, CoreBlockType} from '@wepublish/common'
import {ArticleBlock} from '../block/articleBlock'
import {Inset, InsetContent} from '../components/inset'

export interface FrontViewProps {
  blocks?: Block[]
}

export const frontViewInset: Inset = {
  top: 5,
  left: 4,
  right: 4,
  bottom: 5
}

export function FrontView(props: FrontViewProps) {
  if (!props.blocks) return null

  return (
    <InsetContent inset={frontViewInset}>
      {props.blocks.map(block => (
        <React.Fragment key={block.id}>{viewForBlock(block)}</React.Fragment>
      ))}
    </InsetContent>
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
