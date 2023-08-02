import type { DefaultTheme } from "vitepress";
import nav from "./nav";
import sidebar from "./sidebar";
import algoliaSearchOptions from "./algoliaSearch";

const themeConfig: DefaultTheme.Config = {
  nav,
  sidebar,
  socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  outline: {
    level: "deep", // 右侧大纲标题层级
    label: "目录", // 右侧大纲标题文本配置
  },
  darkModeSwitchLabel: "切换日光/暗黑模式",
  sidebarMenuLabel: "文章",
  returnToTopLabel: "返回顶部",
  lastUpdatedText: "最后更新", // 最后更新时间文本配置, 需先配置lastUpdated为true
  // 文档页脚文本配置
  docFooter: {
    prev: "上一篇",
    next: "下一篇",
  },
  // 搜索配置
  search: {
    provider: "local",
  },
};
export default themeConfig;
