import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../components/users/Users.vue';
import About from '../components/About.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
