<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';

const errorMessage = ref(null);

const loading = ref(true);

const orders = ref([]);

const messageOrder = ref('');

const transformDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const finalDate = new Date(date);
  return finalDate.toLocaleDateString('fr-FR', options);
};

onMounted(async () => {
  try {
    const response = await api.get('/api/order');
    if (Array.isArray(response.data)) {
      orders.value = response.data;
    } else {
      messageOrder.value = response.data.message;
    }
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
    <p v-else-if="errorMessage">
      {{ errorMessage }}
    </p>
    <p v-else-if="messageOrder">
      {{ messageOrder }}
    </p>
    <div v-else>
      <div
        v-for="order in orders"
        :key="order.id"
      >
        <br>
        <p> Commandes {{ order.id }}</p>
        <br>
        <p>Date : {{ transformDate(order.date_order) }}</p>
        <p> Prix total : {{ order.total_price }} €</p>
        <p>Adress : {{ order.address }}</p>
        <p>Ville : {{ order.city }}</p>
        <p>CP : {{ order.postalCode }}</p>

        <h3> détails </h3>
        <div
          v-for="product in order.products"
          :key="product.name"
        >
          <p>{{ product.name }}</p>
          <p>{{ product.quantity }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
