<script setup>
import { ref, onMounted } from 'vue';
import navbar from './components/navbar.vue';
import useAuthStore from './stores/auth';

const auth = useAuthStore();

const errorMessage = ref('');

const refresh = async () => {
  try {
    await auth.refresh();
  } catch (error) {
    if (error.response === undefined) {
      errorMessage.value = 'panne réseau';
    } else {
      errorMessage.value = error.response.data.message;
    }
  }
};

onMounted(refresh);

</script>

<template>
  <div>
    <navbar />
    <RouterView />
  </div>
</template>
