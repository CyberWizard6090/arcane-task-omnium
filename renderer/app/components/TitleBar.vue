<template>
  <div class="titlebar">
    <div class="title">Kanban App</div>
    <div class="window-controls">
      <button @click="minimize">—</button>
      <button @click="maximize">☐</button>
      <button @click="close">✕</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const minimize = () => globalThis.electronAPI.minimize();
    const maximize = () => globalThis.electronAPI.maximize();
    const close = () => globalThis.electronAPI.close();

    return { minimize, maximize, close };
  },
});
</script>

<style lang="scss" scoped>
.titlebar {
  -webkit-app-region: drag;
  height: var(--title-bar-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 var(--spacing-m);
  /* background-color: var(--background-primary); */

  .window-controls {
    display: flex;

    button {
      -webkit-app-region: no-drag;
      background: none;
      border: none;
      color: white;
      width: 50px;
      height: 50px;
      cursor: pointer;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }
}
</style>
