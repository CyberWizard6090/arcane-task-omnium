<template>
  <div class="home-page">
    <h1>Home Page</h1>
    <p>Добро пожаловать в ваш проект на Vue + Electron + FSD!</p>
    <router-link to="/settings">Перейти в настройки</router-link>
  </div>
</template>

<script setup lang="ts">
// Здесь можно подключать фичи, composables, store и т.д.
</script>

<style scoped>
.home-page {
  padding: 2rem;
}

.home-page h1 {
  color: #2c3e50;
}
</style>
