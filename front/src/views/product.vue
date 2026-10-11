<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useBasketStore from '../stores/basket';

const basket = useBasketStore();

const route = useRoute();

const product = ref(null);

const error = ref(null);

const loading = ref(true);

const errorMessageItem = ref(null);

const addSuccess = ref(null);

watch(errorMessageItem, () => window.scrollTo(0, 0));

const addBasket = async (id) => {
  try {
    await basket.addProduct(id);
    errorMessageItem.value = null;
    addSuccess.value = 'Article ajouté au panier';
    setTimeout(() => { addSuccess.value = null; }, 1000);
  } catch (err) {
    if (err.response === undefined) {
      errorMessageItem.value = 'panne réseau';
    } else {
      errorMessageItem.value = err.response.data.message;
    }
    addSuccess.value = null;
  }
};

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
    <p v-if="errorMessageItem">
      {{ errorMessageItem }}
    </p>
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
      <button @click="addBasket(product.id)">
        Ajouter au panier
      </button>
      <p v-if="addSuccess">
        {{ addSuccess }}
      </p>
    </div>
  </div>
</template>
