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
    fontFamily: 'sans-serif',
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
  mobile: px(0),
  desktop: px(720)
}

export const zIndex = {
  content: 0,
  navigation: 10
}

export function debugName(
  component: React.FunctionComponent<any>
): string | undefined {
  if (process.env.NODE_ENV !== 'production') {
    return component.displayName || component.name
  }

  return undefined
}
