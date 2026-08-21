import { defineStore } from 'pinia';
import api from '../services/api';

const useBasketStore = defineStore('basket', {
  state: () => ({
    basket: [],
  }),

  actions: {
    async getBasket() {
      const responseGetBasket = await api.get('/api/basket');
      this.basket = responseGetBasket.data;
    },
    async addProduct(id) {
      await api.post(`/api/basket/item/${id}`);
      await this.getBasket();
    },
    async quantityUpdate(id, quantity) {
      await api.put(`/api/basket/item/${id}`, { quantity }); // { quantity } est un objet {quantity : quantity}
      await this.getBasket();
    },
    async deleteProduct(id) {
      await api.delete(`/api/basket/item/${id}`);
      await this.getBasket();
    },
  },

  getters: {
    totalPrice(state) {
      const total = state.basket.reduce((acc, elt) => acc + elt.price * elt.quantity, 0);
      return total;
    },
  },
});

export default useBasketStore;
