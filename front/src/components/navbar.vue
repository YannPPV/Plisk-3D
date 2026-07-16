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
        to="/login"
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

      <RouterLink
        to="/register"
        class="nav"
      >
        Créer un compte
      </RouterLink>

      <RouterLink
        to="/logout"
        class="nav"
      >
        Se déconnecter
      </RouterLink>
    </nav>
  </header>
</template>

<style>
@import '../assets/style/navbar.css';
</style>
