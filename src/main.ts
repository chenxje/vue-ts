import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from './components/core/components_use'
import 'ant-design-vue/dist/antd.css'

createApp(App).use(Antd).use(store).use(router).mount("#app");
