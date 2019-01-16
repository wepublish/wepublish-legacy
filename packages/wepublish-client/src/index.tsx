import React from 'react'
import ReactDOM from 'react-dom'

import {ApplicationView, initializeCSSRules} from '@wepublish/ui'
import {version, moduleName} from './version'

export interface ClientOptions {}

export function mount(_opts?: ClientOptions) {
  if (
    document.readyState == 'complete' ||
    document.readyState == 'interactive'
  ) {
    initialize()
  } else {
    addEventListener('DOMContentLoaded', () => initialize())
  }
}

function initialize() {
  console.info(`Initializing ${moduleName} v${version}`)

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/static/worker.js')
    console.info('Registered service worker')
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
  ReactDOM.hydrate(<ApplicationView {...initialState} />, applicationElement)
}
