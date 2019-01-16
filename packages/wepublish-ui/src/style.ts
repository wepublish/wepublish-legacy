import {cssRule, setStylesTarget} from 'typestyle'

export function initializeCSSRules(target?: Element) {
  if (target) setStylesTarget(target)

  cssRule('body, html, #application', {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0
  })
}
