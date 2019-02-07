import {Locale as DateLocale} from 'date-fns'

export interface Locale {
  identifier: string
  dateLocale: DateLocale
  text: {
    comments: string
    relatedArticles: string
  }
}
