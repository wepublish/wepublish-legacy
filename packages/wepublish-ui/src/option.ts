import {Theme} from './context/themeContext'
import {Locale} from 'date-fns'

export interface ApplicationOptions {
  readonly locale?: string
  readonly dateLocale?: Locale
  readonly theme?: Theme
}
