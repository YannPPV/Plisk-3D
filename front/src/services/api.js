import axios from 'axios';

let refreshingPromise = null;
// cette variable va permettre de savoir si un refresh est déjà en cours
// cela permet d'éviter de lancer plusoeurs refresh en mm temps
// ce qui créerait plusieurs token
// dans la table refresh_token en BDD

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const module = await import('../stores/auth');
  const authStore = module.default();
  if (authStore.token !== '') {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
});

// l'intercepteur response : intercepte n'importe quelle requête qui échoue en 401
// (parce que le token a expiré pendant la navigation)
// Demande un nouveau token
// Rejoue la requête originale avec le nouveau token
api.interceptors.response.use(
  (success) => success,
  async (onError) => {
    if ((onError.response !== undefined) && (onError.response.status === 401)) {
    // Si le 401 vient de l'appel refresh lui-même, on ne retente pas de refresh
    // ça bouclerait indéfiniment : on laisse l'erreur remonter telle quelle
    // pour que l'appelant gère l'échec avec son propre catch.
      if (onError.config.url === '/api/auth/refresh') {
        return Promise.reject(onError);
      }
      const module = await import('../stores/auth');
      const authStore = module.default();
      if (refreshingPromise === null) { // pas de refresh en cours
        refreshingPromise = authStore.refresh();
      }
      try {
        await refreshingPromise;
      } catch (error) {
        try {
          await authStore.logout();
        } catch {
          // ignore  l'échec du logout ici (ex: panne réseau) :
          // préfère propager l'erreur du refresh échoué
        }
        return Promise.reject(error);
      } finally {
        refreshingPromise = null;
        // reste avec une valeur et
        // donc ferai croire qu'il y a toujours un refresh en cours
      }
      // eslint-disable-next-line no-param-reassign
      onError.config.headers.Authorization = `Bearer ${authStore.token}`;
      // relance une nouvelle requête
      return api(onError.config);
    }
    // Promise oblige à considérer une erreur comme une vrai erreur et non un succès
    // ici onError considère que les erreurs sont des succès et ne vont pas dans le catch
    return Promise.reject(onError);
  },
);

export default api;
