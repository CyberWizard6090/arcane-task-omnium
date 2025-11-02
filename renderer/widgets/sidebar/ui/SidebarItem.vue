<template>
  <li class="sidebar-item" :class="{ collapsed }">
    <i :class="['mdi', item.icon, 'sidebar-item__icon']"></i>
    <span v-if="!collapsed" class="sidebar-item__label">{{ item.label }}</span>
  </li>
</template>

<script setup lang="ts">
import type { SidebarItem } from '../model/sidebarItems';

defineProps<{
  item: SidebarItem;
  collapsed: boolean;
}>();
</script>

<style lang="scss" scoped>
.sidebar-item {
  display: flex;
  align-items: center;
  padding: var(--spacing-s) var(--spacing-m);
  color: var(--menu-item-text);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: background 0.2s;

  &:hover {
    background: var(--background-secondary);
  }

  &__icon {
    font-size: 24px;
  }

  &__label {
    margin-left: var(--spacing-s);
  }

  &.collapsed {
    justify-content: center;
    .sidebar-item__label {
      display: none;
    }
  }
}
</style>
