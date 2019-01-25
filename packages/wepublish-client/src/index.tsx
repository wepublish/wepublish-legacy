import React from 'react'
import ReactDOM from 'react-dom'
import {unserializeRoute} from '@wepublish/common'

import {
  ApplicationView,
  initializeCSSRules,
  ApplicationOptions
} from '@wepublish/ui'

import {version, moduleName} from './version'

export interface ClientOptions extends ApplicationOptions {}

export function mount(opts: ClientOptions) {
  if (
    document.readyState == 'complete' ||
    document.readyState == 'interactive'
  ) {
    initialize(opts)
  } else {
    addEventListener('DOMContentLoaded', () => initialize(opts))
  }
}

async function initialize(opts: ClientOptions) {
  console.info(`Initializing ${moduleName} v${version}.`)

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/static/worker.js', {
      scope: '/'
    })
    console.info('Registered service worker.')
  }

  const styleElement = document.querySelector('#style')

  if (!styleElement) {
    throw new Error("Coulnd't find style element.")
  }

  const initialStateElement = document.querySelector('#initialState')

  if (!initialStateElement || !initialStateElement.textContent) {
    throw new Error("Coulnd't find initial state.")
  }

  const applicationElement = document.querySelector('#application')

  if (!applicationElement) {
    throw new Error("Coulnd't find application element.")
  }

  initializeCSSRules(styleElement)

  const initialState = JSON.parse(initialStateElement.textContent)
  ReactDOM.hydrate(
    <ApplicationView
      initialRoute={unserializeRoute(initialState.initialRoute)}
      locale={opts.locale}
      dateLocale={opts.dateLocale}
      theme={opts.theme}
    />,
    applicationElement
  )
}
