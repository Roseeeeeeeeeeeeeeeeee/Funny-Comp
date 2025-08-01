import { createApp } from 'vue';
import './style.less';
import App from './App.vue';
import { createPinia } from 'pinia';
const store = createPinia();
import ErrorLog from './plugins/error-logger.js';
createApp(App).use(store).use(ErrorLog).mount('#app');
