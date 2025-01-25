<template>
  <AppHeader></AppHeader>
  <main class="container">
    <router-view :key="$route.fullPath"/>
  </main>
</template>

<script setup>
  import AppHeader from "./components/AppHeader";
</script>

<style scoped>
  main.container {
    margin-top: 1rem;
  }
</style>