import {cssRule, setStylesTarget} from 'typestyle'
import {rem, px} from 'csx'

declare var process: {
  env: {
    NODE_ENV: string
  }
}

export function initializeCSSRules(target?: Element) {
  if (target) setStylesTarget(target)

  cssRule('html', {
    boxSizing: 'border-box',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '62.5%'
  })

  cssRule('body, html, #application', {
    width: '100%',
    minHeight: '100vh',
    margin: 0,
    padding: 0
  })

  cssRule('body', {
    minWidth: rem(30)
  })
  cssRule('*, *:before, *:after ', {
    boxSizing: 'inherit'
  })
}

export const breakpoint = {
  mobile: 0,
  tablet: 720,
  desktop: 1000
}

export const mediaQueries = {
  mobile: {
    minWidth: px(breakpoint.mobile),
    maxWidth: px(breakpoint.tablet - 1)
  },
  tablet: {
    minWidth: px(breakpoint.tablet),
    maxWidth: px(breakpoint.desktop - 1)
  },
  desktop: {minWidth: px(breakpoint.desktop)}
}

export const zIndex = {
  content: 0,
  navigation: 10
}

export function debugName(
  component: React.FunctionComponent<any>,
  suffix?: string
): string | undefined {
  if (process.env.NODE_ENV !== 'production') {
    if (suffix) {
      return `${component.displayName || component.name}_${suffix}`
    }

    return component.displayName || component.name
  }

  return undefined
}
