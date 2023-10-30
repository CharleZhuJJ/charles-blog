// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import MyLayout from "./components/Layout.vue";
import "./style.css";

export default {
  ...DefaultTheme,
  Layout: MyLayout,
  enhanceApp(ctx) {
    // extend default theme custom behaviour.
    DefaultTheme.enhanceApp(ctx);

    // 全局挂载 API 接口
    // ctx.app.config.globalProperties.$http = axios

    // register your custom global components
    // ctx.app.component('MyGlobalComponent' /* ... */)
  },
};
