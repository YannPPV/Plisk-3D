<script setup>
// onMounted exécute une seule fois, quand la page est affichée
import { ref, onMounted } from 'vue';

const products = ref([]);

const loading = ref(true);

const error = ref(null);

onMounted(async () => {
  try {
    // envoie requête GET à API Express, await met en pause le code jusqu'à ce qu'Express réponde
    const response = await fetch('http://localhost:3000/api/products/');
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
  <div>
    <p v-if="loading">
      Chargements des produits...
    </p>
    <p v-else-if="error">
      {{ error }}
    </p>
    <div
      v-else
      class="products-flex"
    >
      <RouterLink
        v-for="product in products"
        :key="product.id"
        class="product-card"
        :to="`/product/${product.id}`"
      >
        <img
          :src="`/img/products/${product.image_url}`"
          alt=""
          class="product-img"
        >
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }} €</p>
      </RouterLink>
    </div>
  </div>
</template>

<style>
@import '../assets/style/3dprinting.css';
</style>
