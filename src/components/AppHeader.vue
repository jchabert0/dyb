<template>
  <nav class="navbar navbar-dark bg-dark-blue">
    <router-link to="/" class="navbar-brand" style="background: transparent;">MuziK</router-link>
  </nav>
</template>

<script setup>

import {watchEffect} from 'vue';

watchEffect(() => {});

</script>

<style scoped>
.bg-dark-blue {
  background: #081057;
}
</style>