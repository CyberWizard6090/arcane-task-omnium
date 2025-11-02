<template>
  <aside class="sidebar" :class="{ collapsed }">
    <ul class="sidebar__list">
      <SidebarItem
        v-for="item in sidebarItems"
        :key="item.id"
        :item="item"
        :collapsed="collapsed"
      />
    </ul>
    <div class="sidebar__toggle" @click="toggleSidebar">
      <i class="mdi" :class="collapsed ? 'mdi-menu-open' : 'mdi-menu'">></i>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import SidebarItem from './SidebarItem.vue';
import { sidebarItems } from '../model/sidebarItems';

const collapsed = ref(false);
const toggleSidebar = () => {
  collapsed.value = !collapsed.value;
};
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 100px;
  /* background: var(--background-block); */
  color: var(--font-color-primary);
  transition: width 0.3s ease;
  padding: var(--spacing-m);
  &.collapsed {
    width: 80px;
  }

  &__toggle {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: var(--spacing-s);
    cursor: pointer;
    border-top: 1px solid var(--border-secondary);

    i {
      font-size: 24px;
      color: var(--accent-color);
    }
  }

  &__list {
    flex-grow: 1;
    list-style: none;
    padding: 0;
    margin: 0;
  }
}
</style>
