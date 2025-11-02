export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}

export const sidebarItems: SidebarItem[] = [
  { id: '', label: 'Главная', icon: 'mdi-home', route: '/' },
  { id: 'board', label: 'Доска', icon: 'mdi-briefcase', route: '/board' },
  { id: 'settings', label: 'Настройки', icon: 'mdi-cog', route: '/settings' },
];
