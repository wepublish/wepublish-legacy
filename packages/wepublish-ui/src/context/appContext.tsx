import React, {ReactNode, useState} from 'react'

export interface AppContext {
  siteName: string
  siteDescription: string
  brandName: string
  talkURL: string
  hostname: string
}

export const AppContext = React.createContext<AppContext>({
  siteName: 'we.publish',
  siteDescription: 'we.publish',
  brandName: 'we.publish',
  talkURL: '',
  hostname: ''
})

export interface StaticAppContextProviderProps {
  siteName: string
  siteDescription: string
  brandName: string
  talkURL: string
  hostname: string
  children?: ReactNode
}

export function StaticAppContextProvider(props: StaticAppContextProviderProps) {
  const [context] = useState({
    siteName: props.siteName,
    siteDescription: props.siteDescription,
    brandName: props.brandName,
    talkURL: props.talkURL,
    hostname: props.hostname
  })

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  )
}
