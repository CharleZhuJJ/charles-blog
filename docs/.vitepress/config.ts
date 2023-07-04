import { defineConfig } from "vitepress";
import markdown from "./config/markdown";
import themeConfig from "./config/themeConfig";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "CharlesZhu Blog",
  description: "My Document",
  lang: "zh-CN",
  lastUpdated: true,
  markdown,
  themeConfig,
  head: [],
});
