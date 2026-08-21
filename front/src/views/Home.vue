<script setup>
// onMounted exécute une seule fois, quand la page est affichée
import { ref, onMounted, watch } from 'vue';
import api from '../services/api';
import useBasketStore from '../stores/basket';

const basket = useBasketStore();

const products = ref([]);

const loading = ref(true);

const errorMessage = ref(null);

const errorMessageItem = ref(null);

const idItem = ref(null);

const addBasket = async (id) => {
  try {
    await basket.addProduct(id);
    idItem.value = id;
    errorMessageItem.value = null;
    setTimeout(() => { idItem.value = null; }, 1000);
  } catch (err) {
    if (err.response === undefined) {
      errorMessageItem.value = 'panne réseau';
    } else {
      errorMessageItem.value = err.response.data.message;
    }
  }
};

watch(errorMessageItem, () => window.scrollTo(0, 0));

onMounted(async () => {
  try {
    const response = await api.get('/api/products');
    products.value = response.data;
  } catch (err) {
    if (err.response === undefined) {
      errorMessage.value = 'panne réseau';
    } else {
      errorMessage.value = err.response.data.message;
    }
  } finally {
    loading.value = false;
  }
});

</script>

<template>
  <div class="hero">
    <div class="hero-container">
      <h1>Plisk 3D</h1>
      <p v-if="errorMessageItem">
        {{ errorMessageItem }}
      </p>
      <p v-if="loading">
        Chargements des produits...
      </p>
      <p v-else-if="errorMessage">
        {{ errorMessage }}
      </p>
      <div
        v-else
        class="products-grid"
      >
        <div
          v-for="product in products"
          :key="product.id"
          class="product-card"
        >
          <h2>{{ product.name }}</h2>
          <p>{{ product.price }} €</p>
          <button @click="addBasket(product.id)">
            Ajouter au panier
          </button>
          <p v-if="idItem === product.id">
            Article ajouté au panier
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import '../assets/style/home.css';
</style>
