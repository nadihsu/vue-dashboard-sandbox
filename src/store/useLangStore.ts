import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { i18n } from '@/language';

const useLangStore = defineStore('lang', {
  state: () => ({
    lang: Cookies.get('locale') || 'zh-TW',
  }),
  actions: {
    updateLang(lang: 'zh-TW'|'en-US') {
      const newLang = lang || 'zh-TW';

      Cookies.set('locale', newLang);
      i18n.locale.value = newLang;
      this.lang = newLang;
    },
  },
});

export default useLangStore;
