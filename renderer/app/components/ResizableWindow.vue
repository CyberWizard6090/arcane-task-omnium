<template>
  <div class="resizable-window">
    <div class="window-content">
      <slot />
    </div>
    <div class="resize-handle" @mousedown="initResize"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  methods: {
    initResize(e: MouseEvent) {
      const startX = e.clientX;
      const startY = e.clientY;

      // Берём реальные размеры окна
      globalThis.electronAPI.getWindowSize?.().then(({ width, height }) => {
        const startWidth = width;
        const startHeight = height;

        const onMouseMove = (moveEvent: MouseEvent) => {
          const newWidth = startWidth + (moveEvent.clientX - startX);
          const newHeight = startHeight + (moveEvent.clientY - startY);

          globalThis.electronAPI?.resizeWindow({ width: newWidth, height: newHeight });
        };

        const onMouseUp = () => {
          globalThis.removeEventListener('mousemove', onMouseMove);
          globalThis.removeEventListener('mouseup', onMouseUp);
        };

        globalThis.addEventListener('mousemove', onMouseMove);
        globalThis.addEventListener('mouseup', onMouseUp);
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.resizable-window {
  width: 100%;
  height: 100%;
  position: relative;

  overflow: hidden;
}

.window-content {
  width: 100%;
  height: 100%;
  position: relative;
}

.resize-handle {
  position: absolute;
  width: 15px;
  height: 15px;
  bottom: 0;
  right: 0;
  cursor: se-resize;
  background-color: rgb(255, 255, 255); // для теста, потом убрать
  z-index: 100;
}
</style>
