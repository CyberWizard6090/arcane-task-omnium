<template>
  <li>
    {{ todo.text }}
    <button @click="$emit('remove', todo.id)">Delete</button>
  </li>
</template>

<script setup>
defineProps({
  todo: Object,
});
</script>
