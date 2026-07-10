<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const form = reactive({
  email: '',
  password: '',
});

const token = ref('');
const errorMessage = ref('');

const login = async () => {
  try {
    const api = `${import.meta.env.VITE_API_URL}/api/auth/login`;
    const reponseLogin = await axios.post(api, form);
    token.value = reponseLogin.data.tokenAccess;
    localStorage.setItem('refreshToken', reponseLogin.data.tokenBdd);
    router.push({ name: 'home' });
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
    <form
      class="form"
      @submit.prevent="login"
    >
      <label for="">Identifiant :</label>
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
        Se connecter
      </button>
      <p v-if="errorMessage">
        {{ errorMessage }}
      </p>
    </form>
  </div>
</template>

<style>
@import '../assets/style/login.css';
</style>
