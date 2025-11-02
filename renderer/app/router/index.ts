import { createRouter, createWebHashHistory } from 'vue-router';
import { HomePage } from '@/pages/homePage';
import { SettingsPage } from '@/pages/settingsPage';
import { BoardPage } from '@/pages/boardPage';

const routes = [
  { path: '/', component: HomePage },
  { path: '/settings', component: SettingsPage },
  { path: '/board', component: BoardPage },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
