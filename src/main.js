import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import VueTheMask from 'vue-the-mask'

import App from './App.vue'
import router from './router'

import en from './locales/en.json';
import ru from './locales/ru.json';
import kg from './locales/kg.json';

const app = createApp(App)

const messages = { en, ru, kg };

const i18n = createI18n({
    legacy: false,
    locale: 'ru',
    fallbackLocale: 'en',
    fallbackLocale: 'kg',
    messages,
});

app.use(i18n)
app.use(createPinia())
app.use(router)
app.use(VueTheMask)

app.mount('#app')
