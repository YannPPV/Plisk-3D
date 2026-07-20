import { createRouter, createWebHistory } from 'vue-router';
import useAuthStore from '../stores/auth';
import Home from '../views/home.vue';
import Login from '../views/Login.vue';
import Basket from '../views/Basket.vue';
import Register from '../views/Register.vue';
import Logout from '../views/Logout.vue';

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/login', component: Login, name: 'login' },
  {
    path: '/basket', component: Basket, name: 'basket', meta: { requiresAuth: true },
  },
  { path: '/register', component: Register, name: 'register' },
  { path: '/logout', component: Logout, name: 'logout' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth === true && auth.isLoggedIn === false) {
    try {
      await auth.refresh();
    } catch (error) {
      try {
        await auth.logout();
      } catch {
        // ignore  l'échec du logout ici (ex: panne réseau) :
        // préfère propager l'erreur du refresh échoué
      }
    }
  }
  if (auth.isLoggedIn === false && to.meta.requiresAuth === true) {
    return next({ name: 'login' });
  }
  return next();
});

export default router;
