import {cssRule, setStylesTarget} from 'typestyle'

export function initializeCSSRules(target?: Element) {
  if (target) setStylesTarget(target)

  cssRule('html', {
    boxSizing: 'border-box'
  })

  cssRule('body, html, #application', {
    width: '100%',
    minHeight: '100vh',
    fontSize: '62.5%',
    margin: 0,
    padding: 0
  })

  cssRule('*, *:before, *:after ', {
    boxSizing: 'inherit'
  })
}
