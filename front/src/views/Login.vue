<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import useAuthStore from '../stores/auth';

const auth = useAuthStore();

const router = useRouter();

const form = reactive({
  email: '',
  password: '',
});

const errorMessage = ref('');

const login = async () => {
  try {
    await auth.login(form);
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
