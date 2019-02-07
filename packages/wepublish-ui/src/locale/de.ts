import {de as dateLocale} from 'date-fns/locale'
import {Locale} from './interface'

export const de: Locale = {
  identifier: 'de',
  dateLocale,
  text: {
    comments: 'Kommentare',
    relatedArticles: 'Weitere Artikel in dieser Rubrik'
  }
}
