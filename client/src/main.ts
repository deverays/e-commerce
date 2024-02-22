import "./assets/base.css";

import App from "./App.vue";
import router from "./router";
import i18next from "i18next";
import { createApp } from "vue";
import I18NextVue from "i18next-vue";
import { Client } from "./modules/index";

const client = new Client({
    token: localStorage.token,
    i18next,
    body: "transition-all overflow-x-hidden bg-kaisen-100",
});

createApp(App)
    .use(router)
    .use(I18NextVue, { i18next })
    .mount("#app");

export { client };
