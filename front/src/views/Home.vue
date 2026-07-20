<script setup>
// onMounted exécute une seule fois, quand la page est affichée
import { ref, onMounted } from 'vue';

const products = ref([]);

const loading = ref(true);

const error = ref(null);

onMounted(async () => {
  try {
    // envoie requête GET à API Express, await met en pause le code jusqu'à ce qu'Express réponde
    const response = await fetch('http://localhost:3000/api/products');
    // response.ok est true si Express a répondu
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des produits');
    }
    products.value = await response.json();
  } catch (err) {
    error.value = err.message;
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
      <p v-else-if="error">
        {{ error }}
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
