import {Theme} from './context/themeContext'
import {Locale} from 'date-fns'

export interface ApplicationOptions {
  readonly siteName: string
  readonly locale?: string
  readonly dateLocale?: Locale
  readonly theme?: Theme
  readonly talkURL: string
  readonly hostname: string
}
