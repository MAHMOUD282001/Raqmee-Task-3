import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./assets/tailwind.css";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(Vue3Toastify, {
  autoClose: 3000,
  // ...
});
app.use(router).mount("#app");
