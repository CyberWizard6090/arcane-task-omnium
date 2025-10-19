<template>
  <div id="app">
    <h1>ToDo List</h1>

    <BoardPage />
  </div>
</template>

<script setup>
import BoardPage from '@/pages/BoardPage.vue';
</script>

<style lang="scss">
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 20px;
}
</style>
