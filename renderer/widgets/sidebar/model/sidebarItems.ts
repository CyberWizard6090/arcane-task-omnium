import type { Component } from 'vue';
import HomeIcon from '@shared/assets/svg/bootstrap-icons-1.13.1/house-fill.svg?component';
import KanbanIcon from '@shared/assets/svg/bootstrap-icons-1.13.1/kanban-fill.svg?component';
import SettingsIcon from '@shared/assets/svg/bootstrap-icons-1.13.1/gear-fill.svg?component';

export interface SidebarItem {
  id: string;
  label: string;
  icon: Component;
  route: string;
}

export const sidebarItems: SidebarItem[] = [
  { id: '', label: 'Главная', icon: HomeIcon, route: '/' },
  { id: 'board', label: 'Доска', icon: KanbanIcon, route: '/board' },
  { id: 'settings', label: 'Настройки', icon: SettingsIcon, route: '/settings' },
];
