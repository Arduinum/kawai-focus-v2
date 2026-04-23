import { createRouter, createWebHistory } from '@ionic/vue-router';
import type { RouteRecordRaw } from 'vue-router';
import TimersList from '@/views/TimersList/TimersList.vue';
import Timer from '@/views/Timer/Timer.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/timers'
  },
  {
    path: '/timers',
    name: 'Timers',
    component: TimersList
  },
  {
    path: '/timer/:id',
    name: 'Timer',
    component: Timer
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
