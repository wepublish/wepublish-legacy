import React, {ReactNode, useState} from 'react'
import {Locale} from 'date-fns'

export interface LocaleContext {
  locale: string
  dateLocale?: Locale
}

export const LocaleContext = React.createContext<LocaleContext>({
  locale: 'en',
  dateLocale: undefined
})

export interface StaticLocaleContextProviderProps {
  locale?: string
  dateLocale?: Locale
  children?: ReactNode
}

export function StaticLocaleContextProvider(
  props: StaticLocaleContextProviderProps
) {
  const [locale] = useState({
    locale: props.locale || 'en',
    dateLocale: props.dateLocale
  })

  return (
    <LocaleContext.Provider value={locale}>
      {props.children}
    </LocaleContext.Provider>
  )
}
