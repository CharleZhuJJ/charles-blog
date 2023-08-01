<template>
  <Layout>
    <!-- 文章内容前的插槽 -->
    <!-- <template #doc-before> Title Category </template> -->
    <!-- 文章内容后的插槽 -->
    <!-- <template #doc-after> comment </template> -->
    <!-- Home slot-->
    <template #home-hero-before> </template>
    <template #home-features-after> <Page /> </template>
  </Layout>
</template>

<script lang="ts" setup>
  import { computed } from "vue";
  import DefaultTheme from "vitepress/theme";
  import { useData } from "vitepress";
  import Page from "./Page.vue";
  // import Copyright from "./components/layout/Copyright.vue";
  // import Comment from "./components/layout/Comment.vue";
  // import Footer from "./components/layout/Footer.vue";

  const { Layout } = DefaultTheme;
  const { page, theme, frontmatter } = useData();
  const hasSidebar = computed(() => {
    return (
      frontmatter.value.aside !== false && frontmatter.value.layout !== "home"
    );
  });
</script>
