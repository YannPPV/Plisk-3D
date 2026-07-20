<script setup>
// onMounted exécute une seule fois, quand la page est affichée
import { ref, onMounted } from 'vue';
import api from '../services/api';

const products = ref([]);

const loading = ref(true);

const errorMessage = ref(null);

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
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import '../assets/style/home.css';
</style>
