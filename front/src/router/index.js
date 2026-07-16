import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';
import Login from '../views/Login.vue';
import Basket from '../views/Basket.vue';
import Register from '../views/Register.vue';
import Logout from '../views/Logout.vue';

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/login', component: Login, name: 'login' },
  { path: '/basket', component: Basket, name: 'basket' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/logout', component: Logout, name: 'logout' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
