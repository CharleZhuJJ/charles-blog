import { defineConfig } from "vitepress";
import markdown from "./config/markdown";
import themeConfig from "./config/themeConfig";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "hello world",
  description: "My Document",
  base: "/charles-blog/",
  lang: "zh-CN",
  lastUpdated: true,
  markdown,
  themeConfig,
  head: [],
});
