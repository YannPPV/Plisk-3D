import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';
import Connection from '../views/connection.vue';
import Basket from '../views/Basket.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/connection', component: Connection },
  { path: '/basket', component: Basket },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
