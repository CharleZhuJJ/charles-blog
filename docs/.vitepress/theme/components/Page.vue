<template>
  <div class="home-page">
    <img src="/public/common/avatar.png" />
    <div class="title">欢迎来到小朱的小站</div>
    <a href="/md/Test/" class="link">开始阅读</a>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
  .home-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding-top: 100px;
    overflow: auto;
    .title {
      margin-top: 32px;
      font-size: 24px;
      font-weight: 700;
    }
    .link {
      font-family: Georgia, sans-serif;
      margin-top: 32px;
      cursor: pointer;
      color: var(--vp-c-brand);
    }
  }
</style>
