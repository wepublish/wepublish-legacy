import {Theme} from './context/themeContext'
import {Locale} from './locale/interface'

export interface ApplicationOptions {
  readonly siteName: string
  readonly siteDescription: string
  readonly brandName: string
  readonly locale: Locale
  readonly theme?: Partial<Theme>
  readonly talkURL: string
  readonly hostname: string
}
