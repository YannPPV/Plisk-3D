import { defineStore } from 'pinia';
import api from '../services/api';

const usePurchaseStore = defineStore('purchase', {
  actions: {
    async purchaseUrl() {
      const responsepurchaseUrl = await api.post('/api/purchase');
      const urlPurchase = responsepurchaseUrl.data.url;
      return urlPurchase;
    },
  },
});

export default usePurchaseStore;
