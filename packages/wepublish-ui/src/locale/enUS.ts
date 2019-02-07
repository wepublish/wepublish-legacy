import {enUS as dateLocale} from 'date-fns/locale'
import {Locale} from './interface'

export const enUS: Locale = {
  identifier: 'en-US',
  dateLocale,
  text: {
    comments: 'Comments',
    relatedArticles: 'Related Articles'
  }
}
