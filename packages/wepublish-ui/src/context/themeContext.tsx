import React, {useContext, useMemo, InputIdentityList} from 'react'
import {style, types} from 'typestyle'
import {rgba} from 'csx'

export interface LogoProps {
  className: string
}

export interface Theme {
  logoComponent: React.ComponentType<LogoProps>
  colors: {
    color1: string
    color2: string
    color3: string
    color4: string
    color5: string
    color6: string
    primaryTextColor: string
    shadowColor: string
  }
}

export function WepublishLogo(props: LogoProps) {
  return (
    <svg className={props.className} viewBox="0 0 400 73">
      <path d="M37 16.5l8.6 29.7 9-29.7h10.8L51.6 56.2H40.2l-4.1-11.7-3.5-13.2-3.5 13.2L25 56.2H13.6L0 16.5h10.9l9 29.7 8.6-29.7zm40 23.3c.6 4.9 4.9 8.4 11.8 8.4 3.6 0 8.3-1.4 10.6-3.7l6.2 6.2c-4.2 4.3-11 6.4-17 6.4-13.6 0-21.7-8.4-21.7-21 0-12 8.2-20.6 21-20.6 13.2 0 21.4 8.2 19.9 24.4H77zm21.4-8.1c-.6-5.1-4.6-7.7-10.2-7.7-5.3 0-9.6 2.6-11 7.7z" />
      <path d="M129.5 49.1c0 10.1-15.3 10.1-15.3 0s15.3-10 15.3 0z" />
      <path d="M315.3 6.9c0 9.2-14 9.2-14 0s14-9.2 14 0zM138.2 72.5V16.6h9.1l.6 5.4c3-4.4 8.3-6.3 12.8-6.3 12.2 0 20.2 9 20.2 20.6s-7.3 20.6-19.9 20.6c-4.2 0-10.3-1.3-13.1-5.6v21.1h-9.7zm33-36.1c0-6.2-4.2-11.2-11.2-11.2s-11.2 5-11.2 11.2a11.2 11.2 0 1 0 22.4 0zm26.1-19.8v20.6c0 6 3.3 10.6 9.5 10.6 6 0 10.1-5 10.1-11V16.6h9.7v39.5h-8.7l-.6-5.4c-4.1 4-7.8 5.9-13.4 5.9-9.4 0-16.3-7.1-16.3-19.4V16.6zM245 .1v21.8c2.3-4.1 8.8-6.3 13-6.3 11.5 0 20.1 7 20.1 20.6 0 13-8.7 20.6-20.3 20.6-4.8 0-9.7-1.6-12.7-6.3l-.6 5.4h-9.1V0h9.6zm.6 36.2A11.19 11.19 0 0 0 257 47.9c6.2 0 11.2-4.7 11.2-11.6 0-7.1-5-11.5-11.2-11.5a11.23 11.23 0 0 0-11.4 11.5zM294.9.1V56h-9.7V.1zm8.6 19.3V56h9.8V19.4zm44.3 7.7c-2.8-2.6-6-3.5-9.8-3.5-4.6 0-7.2 1.4-7.2 3.9s2.3 4 7.4 4.3c7.4.5 16.9 2.2 16.9 12.6 0 7-5.7 13-17 13-6.2 0-12.5-1-18.2-7l4.8-7c2.8 3.1 9.2 5.4 13.6 5.5 3.7.1 7.1-1.8 7.1-4.7 0-2.7-2.2-3.8-7.8-4.2-7.4-.6-16.3-3.3-16.3-12.2 0-9.1 9.4-12.3 16.6-12.3 6.2 0 10.8 1.2 15.4 5.2zM371 .1V22a14.36 14.36 0 0 1 12.3-5.9c11.2 0 16.2 7.6 16.2 19.2v20.8h-9.8V35.4c0-7.2-3.8-10.2-9-10.2-5.8 0-9.8 4.9-9.8 10.8v20.2h-9.8V.2h9.9z" />
    </svg>
  )
}

export const defaultTheme: Theme = {
  logoComponent: WepublishLogo,
  colors: {
    color1: '#FFFFFF',
    color2: '#F9F9F9',
    color3: '#CCCCCC',
    color4: '#ECECEC',
    color5: '#454545',
    color6: '#000000',
    primaryTextColor: '#222222',
    shadowColor: rgba(170, 170, 170, 0.3).toString()
  }
}

export type ThemeContext = Theme

export const ThemeContext = React.createContext<ThemeContext>(defaultTheme)

export interface StaticThemeContextProviderProps {
  theme?: Theme
}

export class StaticThemeContextProvider extends React.Component<
  StaticThemeContextProviderProps,
  ThemeContext
> {
  public constructor(props: StaticThemeContextProviderProps) {
    super(props)
    this.state = this.props.theme || defaultTheme
  }

  public render(): React.ReactNode {
    return (
      <ThemeContext.Provider value={this.state}>
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}

export type StyleProps = (
  | false
  | types.NestedCSSProperties
  | null
  | undefined)[]

export function useThemeStyle(
  styleFn: (theme: Theme) => StyleProps,
  inputs: InputIdentityList = []
) {
  return useTheme(themeContext => style(...styleFn(themeContext)), inputs)
}

export function useStyle(
  styleFn: () => StyleProps,
  inputs: InputIdentityList = []
) {
  return useMemo(() => style(...styleFn()), inputs)
}

export function useTheme<T>(
  fn: (theme: Theme) => T,
  inputs: InputIdentityList = []
) {
  const themeContext = useContext(ThemeContext)
  const object = useMemo(() => fn(themeContext), [themeContext, ...inputs])

  return object
}
