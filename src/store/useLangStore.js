import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { i18n } from '@/language';

const useLangStore = defineStore('lang', {
  state: () => ({
    lang: Cookies.get('locale') || 'zh-TW',
  }),
  actions: {
    updateLang(lang) {
      if (lang) {
        Cookies.set('locale', lang);
        i18n.locale.value = lang;
        this.lang = lang;
      }

      if (!lang) {
        Cookies.set('locale', 'zh-TW');
        i18n.locale.value = 'zh-TW';
        this.lang = 'zh-TW';
      }
    },
  },
});

export default useLangStore;
