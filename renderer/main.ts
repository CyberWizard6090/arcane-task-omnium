// main.ts (renderer)
import { createApp } from 'vue';
import App from './app/App.vue';
import { router } from './app/router'; // импортируем роутер
import '@shared/styles/index.scss';

const app = createApp(App);

// Прокидываем Vue Router
app.use(router);

// Монтируем Vue-приложение
app.mount('#app');
