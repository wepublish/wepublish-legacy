import React, {ReactNode, useState} from 'react'
import {Locale} from '../locale/interface'

export interface LocaleContext {
  locale: Locale
}

export const LocaleContext = React.createContext<LocaleContext>({
  locale: {} as any
})

export interface StaticLocaleContextProviderProps {
  locale: Locale
  children?: ReactNode
}

export function StaticLocaleContextProvider(
  props: StaticLocaleContextProviderProps
) {
  const [locale] = useState({locale: props.locale})

  return (
    <LocaleContext.Provider value={locale}>
      {props.children}
    </LocaleContext.Provider>
  )
}
