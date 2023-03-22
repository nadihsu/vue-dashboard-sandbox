import { createApp } from 'vue';
import dayjs from 'dayjs';
import router from './router';
import App from './App.vue';

const app = createApp(App);

app.config.globalProperties.day = dayjs;
app.use(router).mount('#app');
