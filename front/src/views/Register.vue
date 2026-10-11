<script setup>
import { reactive, ref } from 'vue';
import api from '../services/api';

const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
});

const errorMessage = ref('');

const successMessage = ref('');

const register = async () => {
  try {
    await api.post('/api/auth/register', form);
    successMessage.value = 'utilisateur créé';
    // efface une éventuelle ancienne erreur
    errorMessage.value = '';

    // On vide tous les champs du formulaire
    form.first_name = '';
    form.last_name = '';
    form.email = '';
    form.password = '';
  } catch (error) {
    if (error.response === undefined) {
      errorMessage.value = 'panne réseau';
    } else {
      errorMessage.value = error.response.data.message;
    }
  }
};

</script>

<template>
  <div>
    <p v-if="successMessage">
      {{ successMessage }}
    </p>

    <p v-if="errorMessage">
      {{ errorMessage }}
    </p>
    <form
      class="form"
      @submit.prevent="register"
    >
      <label for="">Prénom</label>
      <input
        v-model="form.first_name"
        type="text"
      >
      <br>
      <label for="">Nom</label>
      <input
        v-model="form.last_name"
        type="text"
      >
      <br>
      <label for="">email</label>
      <input
        v-model="form.email"
        type="email"
      >
      <br>
      <label for="">Mot de passe :</label>
      <input
        v-model="form.password"
        type="password"
      >
      <br>
      <button
        type="submit"
      >
        créer un compte
      </button>
    </form>
  </div>
</template>
