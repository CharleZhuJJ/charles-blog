// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import "./style.css";

export default {
  ...DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp(ctx) {
    // extend default theme custom behaviour.
    DefaultTheme.enhanceApp(ctx);

    // 全局挂载 API 接口
    // ctx.app.config.globalProperties.$http = axios

    // register your custom global components
    // ctx.app.component('MyGlobalComponent' /* ... */)
  },
};
