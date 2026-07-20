import { defineStore } from 'pinia';
import api from '../services/api';

// state: les données brutes stockées,
// actions: les fonctions qui ont le droit de modifier ce state,
// getters: des valeurs calculées

const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
  }),

  actions: {
    async login(form) {
      const reponseLogin = await api.post('/api/auth/login', form);
      this.token = reponseLogin.data.tokenAccess; // this.token appelle le token de state
    },
    async refresh() {
      const responseRefresh = await api.post('/api/auth/refresh', {});
      this.token = responseRefresh.data.tokenAccess;
    },
    async logout() {
      try {
        await api.post('/api/auth/logout', {});
      } finally {
        this.token = '';
      }
    },
  },

  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
  },

});

export default useAuthStore;
