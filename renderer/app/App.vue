<template>
  <ResizableWindow>
    <div class="app-bg"></div>
    <TitleBar />
    <div :class="styles.app">
      <div :class="styles.sidebar">
        <Sidebar />
      </div>

      <div :class="styles.main">
        <h1>ToDo List</h1>
        <BoardPage />
      </div>
    </div>
  </ResizableWindow>
</template>

<script setup lang="ts">
import ResizableWindow from '@/app/components/ResizableWindow.vue';
import TitleBar from '@/app/components/TitleBar.vue';
import BoardPage from '@/pages/BoardPage.vue';
import { Sidebar } from '@/widgets/sidebar';

import styles from './App.module.scss';
</script>
