<script setup>
import '../assets/style/navbar.css';
</script>

<template>
  <header class="page-navbar">
    <nav class="navbar">
      <RouterLink
        to="/"
        class="nav"
      >
        Acceuil
      </RouterLink>
      <RouterLink
        to="/connection"
        class="nav"
      >
        Se connecter
      </RouterLink>
      <RouterLink
        to="/basket"
        class="nav"
      >
        Mon panier
      </RouterLink>
    </nav>
  </header>
</template>

<style>
@import '../assets/style/navbar.css';
</style>
