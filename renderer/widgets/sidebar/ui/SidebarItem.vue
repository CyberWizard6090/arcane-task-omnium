<template>
  <li class="sidebar-item" :class="{ collapsed, active: isActive }" @click="navigate">
    <component :is="item.icon" class="sidebar-item__icon" />
    <span v-if="!collapsed" class="sidebar-item__label">{{ item.label }}</span>
  </li>
</template>

<script setup lang="ts">
import type { SidebarItem as SidebarItemType } from '../model/sidebarItems';
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';

const { item, collapsed } = defineProps<{
  item: SidebarItemType;
  collapsed: boolean;
}>();

const router = useRouter();
const route = useRoute();

function navigate() {
  router.push(item.route);
}

const isActive = computed(() => route.path === item.route);
</script>

<style lang="scss" scoped>
.sidebar-item {
  display: flex;
  align-items: center;
  padding: var(--spacing-s) var(--spacing-m);
  color: var(--menu-item-text);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition:
    background 0.2s,
    color 0.2s;

  &:hover {
    background: var(--background-secondary);
  }

  &__icon {
    height: 25px;
    width: 25px;
    flex: none;
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

  &.active {
    background: var(--accent-color);
    color: var(--button-text-primary);
  }
}
</style>
