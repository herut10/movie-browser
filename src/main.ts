import { Temporal } from '@js-temporal/polyfill';

// Make Temporal available globally
(globalThis as Record<string, unknown>).Temporal = Temporal;

import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

import App from './App.vue';
import router from './router';
import { useMovieStore } from './stores/movieStore';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
  },
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

// Load genres once when app starts
const movieStore = useMovieStore();
movieStore.fetchGenres();

app.mount('#app');
