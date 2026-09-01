<script setup>
import { ref, onMounted } from 'vue';
import useBasketStore from '../stores/basket';
import usePurchaseStore from '../stores/purchase';

const basket = useBasketStore();

const purchase = usePurchaseStore();

const errorMessage = ref(null);

const loading = ref(true);

const errorMessageItem = ref(null);

const deleteItem = async (id) => {
  try {
    await basket.deleteProduct(id);
  } catch (error) {
    if (error.response === undefined) {
      errorMessageItem.value = 'panne réseau';
    } else {
      errorMessageItem.value = error.response.data.message;
    }
  }
};

const updateQuantity = async (id, quantity, delta) => {
  try {
    const quantityItem = quantity + delta;
    await basket.quantityUpdate(id, quantityItem);
  } catch (error) {
    if (error.response === undefined) {
      console.log(error);
      errorMessageItem.value = 'panne réseau';
    } else {
      errorMessageItem.value = error.response.data.message;
    }
  }
};

const purchaseSession = async () => {
  try {
    const url = await purchase.purchaseUrl();
    window.location.href = url;
  } catch (error) {
    if (error.response === undefined) {
      errorMessageItem.value = 'panne réseau';
    } else {
      errorMessageItem.value = error.response.data.message;
    }
  }
};

onMounted(async () => {
  try {
    await basket.getBasket();
  } catch (error) {
    if (error.response === undefined) {
      errorMessage.value = 'panne réseau';
    } else {
      errorMessage.value = error.response.data.message;
    }
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <p v-if="loading">
      chargement en cours...
    </p>
    <p v-if="errorMessageItem">
      {{ errorMessageItem }}
    </p>
    <p v-else-if="errorMessage">
      {{ errorMessage }}
    </p>
    <div v-else>
      <div
        v-for="item in basket.basket"
        :key="item.id"
      >
        <h2>{{ item.name }}</h2>
        <p>{{ item.price }} €</p>
        <p>{{ item.quantity }}</p>
        <!-- <img
          :src="`/assets/images/${item.url}`"
          alt=""
        > -->
        <button @click="updateQuantity(item.id, item.quantity, -1)">
          -
        </button>
        <button @click="updateQuantity(item.id, item.quantity, +1)">
          +
        </button>
        <button
          @click="deleteItem(item.id)"
        >
          Supprimer
        </button>
      </div>
      <h3 v-if="basket.basket.length">
        {{ basket.totalPrice }}
      </h3>
      <h3 v-else>
        Votre panier est vide
      </h3>
      <button
        @click="purchaseSession()"
      >
        Passer au paiement
      </button>
    </div>
  </div>
</template>

<style>
@import '../assets/style/basket.css';
</style>
