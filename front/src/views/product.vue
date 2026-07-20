<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const product = ref(null);

const error = ref(null);

const loading = ref(true);

onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${route.params.id}`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des produits');
    }
    product.value = await response.json();
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
      chargement en cours...
    </p>
    <p v-else-if="error">
      {{ error }}
    </p>
    <div v-else-if="product">
      <img
        :src="`/img/products/${product.image_url}`"
        alt=""
      >
      <h2>{{ product.name }}</h2>
      <p>{{ product.price }} €</p>
    </div>
  </div>
</template>
