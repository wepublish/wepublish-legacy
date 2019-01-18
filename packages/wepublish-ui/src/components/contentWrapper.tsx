import React from 'react'
import memoizeOne from 'memoize-one'
import {style, media} from 'typestyle'

import {
  Theme,
  withThemeContext,
  WithThemeContext
} from '../context/themeContext'

import {NavigationIcon} from './icons'

const contentWrapperStyle = memoizeOne((theme: Theme) => {
  return style(
    {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.colors.color2,
      width: '100%',

      $nest: {
        '> .navigationBar': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          backgroundColor: theme.colors.color1,
          fontSize: '2.2rem',
          padding: '2rem 1.6rem'
        },

        '> .content': {
          width: '100%'
        }
      }
    },
    media(
      {minWidth: 720},
      {
        flexDirection: 'row',

        $nest: {
          '> .navigationBar': {
            flexDirection: 'column',
            height: '100vh'
          }
        }
      }
    )
  )
})

export interface ContentWrapperProps extends WithThemeContext {}

export class ContentWrapper extends React.Component<ContentWrapperProps> {
  public render(): React.ReactNode {
    return (
      <div className={contentWrapperStyle(this.props.themeContext)}>
        <div className="navigationBar">
          <NavigationIcon themeContext={this.props.themeContext} />
        </div>
        <div className="content">{this.props.children}</div>
      </div>
    )
  }
}

export const ThemedContentWrapper = withThemeContext(ContentWrapper)
