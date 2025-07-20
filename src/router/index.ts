import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {
        showBackButton: false,
      },
    },
    {
      path: '/movie/:id',
      name: 'movie-detail',
      component: () => import('../pages/MovieDetailPage.vue'),
      meta: {
        showBackButton: true,
      },
    },
  ],
});

// Scroll to top on route navigation
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    window.scrollTo(0, 0);
  }
  next();
});

export default router;
