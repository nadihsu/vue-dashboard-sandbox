import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import dayjs from 'dayjs';
import router from './router';
import pinia from './store';
import i18nInstance from './language';
import App from './App.vue';
import 'element-plus/dist/index.css';

const app = createApp(App);

app.config.globalProperties.$day = dayjs;

Object.keys(ElementPlusIconsVue).forEach((key) => {
  app.component(key, ElementPlusIconsVue[key]);
});

app
  .use(router)
  .use(ElementPlus)
  .use(pinia)
  .use(i18nInstance)
  .mount('#app');
