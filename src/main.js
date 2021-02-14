import { createApp } from 'vue'
import App from './App.vue'
import store from "@/store/store"
import router from "./router/router"
import { createI18n } from 'vue-i18n'
import geo from "./translations/geo.json"
import eng from "./translations/eng.json"
import rus from "./translations/rus.json"

const i18n = createI18n({
    messages:{
        ka:geo,
        en:eng,
        ru:rus
    },
    fallbackLocale:'ka'
})
const app = createApp(App);
app.use(router);
app.use(store);
app.use(i18n)
app.mount('#app');
