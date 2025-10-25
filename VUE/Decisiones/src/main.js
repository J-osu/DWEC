// src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';

// 💡 Importación de Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount('#app');

// Nota: La importación del JS de Bootstrap se hace si se necesitan componentes interactivos como modales. 
// Por ahora, solo necesitamos el CSS para la maquetación.