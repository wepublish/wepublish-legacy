import React from 'react'
import {Block, CoreBlockType} from '@wepublish/common'
import {ThemedArticleBlock} from '../block/articleBlock'
import {ThemedContentWrapper} from '../components/contentWrapper'

export interface FrontViewProps {
  blocks?: Block[]
}

export interface FrontViewState {}

export class FrontView extends React.Component<FrontViewProps, FrontViewState> {
  public render(): React.ReactNode {
    if (!this.props.blocks) return null

    return (
      <ThemedContentWrapper>
        {this.props.blocks.map(block => (
          <React.Fragment key={block.id}>
            {this.viewForBlock(block)}
          </React.Fragment>
        ))}
      </ThemedContentWrapper>
    )
  }

  private viewForBlock(block: Block) {
    switch (block.type) {
      case CoreBlockType.Article:
        return <ThemedArticleBlock article={block.data} />

      default:
        return <div>Unknown block</div>
    }
  }
}
