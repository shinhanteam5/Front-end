import { createApp } from 'vue';
import App from './App'; // './App.vue' 도 가능
import router from './routes/index.js';

createApp(App).use(router).mount('#app');
