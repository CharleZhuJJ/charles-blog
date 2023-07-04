import { defineConfig } from "vite";
import Components from "unplugin-vue-components/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";
import { vitePluginForArco } from "@arco-plugins/vite-vue";

export default defineConfig({
  plugins: [
    Components({
      dirs: [".vitepress/theme/components"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [ArcoResolver({ sideEffect: true, resolveIcons: true })],
    }),
    // vitePluginForArco({
    //   modifyVars: {
    //     "arcoblue-6": "#2497fd",
    //   },
    // }),
  ],
  ssr: { noExternal: ["@arco-design/web-vue"] },
  resolve: {
    alias: {
      mermaid: "mermaid/dist/mermaid.esm.mjs",
    },
  },
});
