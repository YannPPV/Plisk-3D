<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import useAuthStore from '../stores/auth';

const auth = useAuthStore();
const router = useRouter();
const errorMessage = ref('');

const logout = async () => {
  try {
    await auth.logout();
    router.push({ name: 'home' });
  } catch (error) {
    if (error.response === undefined) {
      errorMessage.value = 'panne réseau';
    } else {
      errorMessage.value = error.response.data.message;
    }
  }
};

onMounted(logout);

</script>

<template>
  <div>
    <p v-if="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>
