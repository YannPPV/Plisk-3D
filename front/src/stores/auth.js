import { defineStore } from 'pinia';
import axios from 'axios';

// state: les données brutes stockées,
// actions: les fonctions qui ont le droit de modifier ce state,
// getters: des valeurs calculées

const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
  }),

  actions: {
    async login(form) {
      const api = `${import.meta.env.VITE_API_URL}/api/auth/login`;
      const reponseLogin = await axios.post(api, form, { withCredentials: true });
      this.token = reponseLogin.data.tokenAccess; // this.token appelle le token de state
    },
    async refresh() {
      const api = `${import.meta.env.VITE_API_URL}/api/auth/refresh`;
      const responseRefresh = await axios.post(api, {}, { withCredentials: true });
      this.token = responseRefresh.data.tokenAccess;
    },
    async logout() {
      try {
        const api = `${import.meta.env.VITE_API_URL}/api/auth/logout`;
        await axios.post(api, {}, { withCredentials: true });
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
