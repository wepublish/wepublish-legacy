import React from 'react'
import {rem, percent, px, em} from 'csx'
import {useThemeStyle, useStyle} from '../context/themeContext'
import {debugName, mediaQueries, breakpoint} from '../style'
import {media} from 'typestyle'
import {Grid, GridRow, GridItem} from '../components/grid'

export function SupportUsBlock() {
  const className = useThemeStyle(theme => [
    {
      $debugName: debugName(SupportUsBlock),
      border: `${px(1)} solid ${theme.colors.color3}`,
      borderRadius: `${rem(0.5)}`,
      lineHeight: 1.3,
      opacity: 0.5,

      $nest: {
        '&:hover': {
          opacity: 1
        }
      }
    },
    media(mediaQueries.mobile, {
      fontSize: rem(0.5)
    }),
    media(mediaQueries.tablet, {
      fontSize: rem(0.6)
    }),
    media(mediaQueries.desktop, {
      fontSize: rem(1)
    })
  ])

  const leadTextClassName = useThemeStyle(theme => ({
    fontSize: em(3.5),
    color: theme.colors.primaryTextColor
  }))

  const buttonWrapperClassName = useStyle(() => ({
    display: 'flex',
    flexDirection: 'column'
  }))

  const buttonTextClassName = useThemeStyle(theme => ({
    fontSize: em(1.7),
    color: theme.colors.primaryTextColor,
    marginBottom: percent(8)
  }))

  const buttonClassName = useThemeStyle(theme => ({
    display: 'inline-block',
    fontSize: em(1.7),
    color: theme.colors.primaryTextColor,
    backgroundColor: theme.colors.color1,
    padding: `${em(1.4 / 1.7)} ${em(3 / 1.7)}`,
    border: `${px(1)} solid ${theme.colors.color3}`,
    borderRadius: rem(5)
  }))

  return (
    <Grid
      columns={3}
      spacingHorizontal={8}
      spacingVertical={10}
      unitFn={percent}
      className={className}
      noMargin>
      <GridRow>
        <GridItem
          span={3}
          spanBreakpoints={{[breakpoint.tablet]: 2}}
          className={leadTextClassName}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magn
        </GridItem>
        <GridItem span={3} spanBreakpoints={{[breakpoint.tablet]: 1}}>
          <div className={buttonWrapperClassName}>
            <div className={buttonTextClassName}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magn
            </div>
            <div>
              <a className={buttonClassName}>Lorem ipsum!</a>
            </div>
          </div>
        </GridItem>
      </GridRow>
    </Grid>
  )
}
