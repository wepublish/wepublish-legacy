import React from 'react'
import {createContextHOC} from './contextHOC'

export interface Theme {
  colors: {
    color1: string
    color2: string
    color3: string
    color4: string
    color5: string
    primaryTextColor: string
  }
}

export const defaultTheme: Theme = {
  colors: {
    color1: '#FFFFFF',
    color2: '#F9F9F9',
    color3: '#CCCCCC',
    color4: '#454545',
    color5: '#000000',
    primaryTextColor: '#222222'
  }
}

export type ThemeContext = Theme

export const ThemeContext = React.createContext<ThemeContext>(defaultTheme)

export interface WithThemeContext {
  themeContext: ThemeContext
}

export const withThemeContext = createContextHOC(
  ThemeContext,
  'themeContext',
  'Themed'
)

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
