import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from './components/core/components_use'
import { Icon } from '@/components/icon'
import directives from './directive'

import 'ant-design-vue/dist/antd.css'
import '@/components/style/app.less'

createApp(App)
    .use(directives)
    .use(Antd)
    .use(store)
    .use(router)
    .component('Icon', Icon)
    .mount("#app");
