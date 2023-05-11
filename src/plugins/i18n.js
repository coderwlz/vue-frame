import { createI18n } from 'vue-i18n'
import messages from '../assets/lang'

const lang = localStorage.getItem('lang')
export const i18n = new createI18n({
  legacy: false,
  locale: lang ? lang.toLowerCase() : 'zh_cn',
  fallbackLocale: 'en',
  messages
})

export default i18n
