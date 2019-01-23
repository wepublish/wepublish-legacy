import {cssRule, setStylesTarget} from 'typestyle'
import {rem} from 'csx'

export function initializeCSSRules(target?: Element) {
  if (target) setStylesTarget(target)

  cssRule('html', {
    boxSizing: 'border-box',
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
