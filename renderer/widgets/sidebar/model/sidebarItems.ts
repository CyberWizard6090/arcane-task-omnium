export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}

export const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Главная', icon: 'mdi-home', route: '/' },
  { id: 'projects', label: 'Проекты', icon: 'mdi-briefcase', route: '/projects' },
  { id: 'settings', label: 'Настройки', icon: 'mdi-cog', route: '/settings' },
];
