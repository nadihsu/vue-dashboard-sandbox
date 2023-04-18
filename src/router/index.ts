import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../components/users/Users.vue';
import About from '../components/About.vue';

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      title: '使用者管理 | Dashboard',
    }
  },
  {
    path: '/about',
    component: About,
    meta: {
      title: '關於我 | Dashboard',
    }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  if (typeof (to.meta?.title) === 'string') {
    document.title = to.meta?.title ?? 'Dashboard';
  }
});

export default router;
