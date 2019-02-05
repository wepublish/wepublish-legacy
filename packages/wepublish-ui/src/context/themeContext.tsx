import React, {useContext, useMemo, InputIdentityList} from 'react'
import {style, types} from 'typestyle'
import {rgba} from 'csx'
import {WepublishLogo} from '../assets/logo'

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
    color7: string
    linkColor: string
    primaryTextColor: string
    shadowColor: string
  }
}

export const defaultTheme: Theme = {
  logoComponent: WepublishLogo,
  colors: {
    color1: '#FFFFFF',
    color2: '#F9F9F9',
    color3: '#BBBBBB',
    color4: '#ECECEC',
    color5: '#979797',
    color6: '#454545',
    color7: '#000000',
    linkColor: '#222222',
    primaryTextColor: '#222222',
    shadowColor: rgba(170, 170, 170, 0.3).toString()
  }
}

export type ThemeContext = Theme
export const ThemeContext = React.createContext<ThemeContext>(defaultTheme)

export interface StaticThemeContextProviderProps {
  theme?: Partial<Theme>
}

export class StaticThemeContextProvider extends React.Component<
  StaticThemeContextProviderProps,
  ThemeContext
> {
  public constructor(props: StaticThemeContextProviderProps) {
    super(props)
    this.state = {...defaultTheme, ...props.theme}
  }

  public render(): React.ReactNode {
    return (
      <ThemeContext.Provider value={this.state}>
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}

export type StyleProp = false | types.NestedCSSProperties | null | undefined
export type StyleProps = StyleProp[]

export function useThemeStyle(
  styleFn: (theme: Theme) => StyleProp | StyleProps,
  inputs: InputIdentityList = []
) {
  return useTheme(themeContext => {
    let styles = styleFn(themeContext)
    let stylesArray = Array.isArray(styles) ? styles : [styles]
    return style(...stylesArray)
  }, inputs)
}

export function useStyle(
  styleFn: () => StyleProp | StyleProps,
  inputs: InputIdentityList = []
) {
  return useMemo(() => {
    let styles = styleFn()
    let stylesArray = Array.isArray(styles) ? styles : [styles]
    return style(...stylesArray)
  }, inputs)
}

export function useTheme<T>(
  fn: (theme: Theme) => T,
  inputs: InputIdentityList = []
) {
  const themeContext = useContext(ThemeContext)
  const object = useMemo(() => fn(themeContext), [themeContext, ...inputs])

  return object
}
