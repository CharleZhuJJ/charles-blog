<template>
  <a-space>
    <a-tag :color="frontmatter.isOriginal ? 'orange' : 'arcoblue'">
      <component :is="frontmatter.isOriginal ? IconPenFill : IconCommand" />
      {{ frontmatter.isOriginal ? "原创文章" : "转载文章" }}</a-tag
    >
    <span class="meta-title">
      <icon-user />
      {{ frontmatter.author }}
    </span>
    <span class="meta-title">
      <icon-history />
      {{ frontmatter.date }}
    </span>
  </a-space>
</template>

<script lang="ts" setup>
  import { useData } from "vitepress";
  import { computed } from "vue";
  import { IconCommand, IconPenFill } from "@arco-design/web-vue/es/icon";

  // const props = defineProps({
  //   article: Object,
  //   showCategory: {
  //     type: Boolean,
  //     default: true,
  //   },
  // });

  interface FrontMatterProps {
    title: string;
    isOriginal: boolean;
    author: string;
    date: string;
  }
  const { theme, page } = useData();
  const frontmatter = computed(() => {
    return page.value.frontmatter as FrontMatterProps;
  });
  console.log("theme", theme);
  console.log("page", frontmatter);
</script>

<style lang="less" scoped>
  .meta-title {
    padding: 0 4px;
    color: var(--gray);
  }
</style>
