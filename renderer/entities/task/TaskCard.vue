<template>
  <div class="task-card">{{ task.title }}</div>
</template>

<script setup lang="ts">
defineProps<{ task: any }>();
</script>

<style lang="scss">
.task-card {
  background: white;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 6px;
  cursor: grab;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
</style>
