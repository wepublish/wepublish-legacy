import {Theme} from './context/themeContext'
import {Locale} from 'date-fns'

export interface ApplicationOptions {
  readonly siteName: string
  readonly siteDescription: string
  readonly brandName: string
  readonly locale?: string
  readonly dateLocale?: Locale
  readonly theme?: Partial<Theme>
  readonly talkURL: string
  readonly hostname: string
}
