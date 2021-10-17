import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueRecaptcha from 'vue3-recaptcha-v2';

createApp(App)
  .use(store)
  .use(router)
  .component('Loading', Loading)
  .use(VueRecaptcha, {
    siteKey: process.env.VUE_APP_RECAPTCHA_KEY,
  })
  .mount('#app');
