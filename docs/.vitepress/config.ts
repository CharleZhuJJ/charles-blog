import { defineConfig } from "vitepress";
import markdown from "./config/markdown";
import themeConfig from "./config/themeConfig";
import { link } from "fs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "小朱杂记",
  description: "My Document",
  base: "/charles-blog/",
  lang: "zh-CN",
  lastUpdated: true,
  markdown,
  themeConfig,
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
});
