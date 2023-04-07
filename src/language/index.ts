import { createI18n } from 'vue-i18n';
import Cookies from 'js-cookie';
import zhTw from './zh-TW.json';
import en from './en-US.json';

const instance = createI18n({
  legacy: false,
  locale: Cookies.get('locale') ?? 'zh-TW',
  fallbackLocale: 'zh-TW',
  messages: {
    'zh-TW': zhTw,
    'en-US': en,
  },
});

export default instance;
export const i18n = instance.global;
