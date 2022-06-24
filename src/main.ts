import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App)

import "@/style/reset.less";
import "@/style/global.less";

import router from "./router";
import store from "./store";

// element ui
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import {ArrowLeftBold, ArrowRightBold, Download } from '@element-plus/icons';
app.component('ArrowLeftBold', ArrowLeftBold)
app.component('ArrowRightBold', ArrowRightBold)
app.component('Download', Download)

// #TODO 批量注册全局指令
// 注册全局指令
import { setupGlobDirectives } from "@/directive/index";
setupGlobDirectives(app);

// #TODO 批量注册全局组件
// 注册全局组件
import { setupGlobComponents } from '@/components/index';
setupGlobComponents(app);

import '@/mock'

app.use(router).use(ElementPlus).use(store).mount("#app");
