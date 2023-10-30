<template>
  <div class="home-page">
    <div class="header">
      <img src="/charles-blog/common/avatar.png" class="avatar" />
      <div class="title">欢迎来到小朱的博客站</div>
      <div class="label">学习、思考、编写，我的 coding 生活-2</div>
    </div>
    <div class="sub-title">
      <img src="/charles-blog/common/entry.png" />
      快捷入口
    </div>
    <div class="links-list">
      <a href="/charles-blog/md/java/" class="link">
        <p>
          <img
            :src="`${
              isDark
                ? '/charles-blog/commoon/java-dark.png'
                : '/charles-blog/common/java.png'
            }`"
          />
          Java
        </p>
        <span>跨平台的高级编程语言</span>
      </a>
      <a href="/charles-blog/md/database/" class="link">
        <p>
          <img
            :src="`${
              isDark
                ? '/charles-blog/common/icon-database-dark.png'
                : '/charles-blog/common/icon-database.png'
            }`"
          />
          数据库
        </p>
        <span>用于存储和管理数据的软件系统</span>
      </a>
      <a href="/charles-blog/md/network/" class="link">
        <p>
          <img
            :src="`${
              isDark
                ? '/charles-blog/common/icon-network-dark.png'
                : '/charles-blog/common/icon-network.png'
            }`"
          />
          网络
        </p>
        <span>实现计算机网络的各种技术和协议</span>
      </a>
    </div>
    <div class="sub-title">
      <img src="/charles-blog/common/new.png" />
      最近更新
    </div>
    <div class="new-list">
      <a href="/charles-blog/md/java/java-basic/java-basic-1/" class="link"
        >new1</a
      >
      <a href="/charles-blog/md/java/java-basic/java-basic-1/" class="link"
        >new1</a
      >
      <a href="/charles-blog/md/java/java-basic/java-basic-1/" class="link"
        >new1</a
      >
      <a href="/charles-blog/md/java/java-basic/java-basic-1/" class="link"
        >new1</a
      >
      <a href="/charles-blog/md/java/java-basic/java-basic-1/" class="link"
        >new1</a
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useData } from "vitepress";

  const { isDark } = useData();
</script>

<style lang="less" scoped>
  @font-face {
    // 锐字逼格青春体简2.0
    font-family: "font1";
    src: url(/font1.ttf);
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .home-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding-top: 48px;
    overflow: auto;
    .header {
      margin-bottom: 72px;
      text-align: center;

      .avatar {
        margin: 0 auto;
        &:hover {
          animation: rotate 3s linear infinite;
        }
      }
      .title {
        transform: scale(0.8);
        margin-top: 8px;
        font-size: 36px;
        font-weight: 1000;
        font-family: font1;
        color: var(--vp-c-text-1);
      }
      .label {
        font-weight: 400;
        font-size: 16px;
        color: var(--vp-c-text-2);
        margin-top: 12px;
      }
    }
    .sub-title {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: #6190e8;
      font-family: font1;
      img {
        width: 32px;
        height: 32px;
        margin-right: 16px;
      }
    }
    .links-list {
      display: grid;
      grid-column-gap: 32px;
      grid-template-columns: repeat(3, 1fr);
      width: 60%;
      margin-top: 16px;
      margin-bottom: 72px;
      @media (max-width: 640px) {
        width: 100%;
        padding: 0 24px;
      }
      .link {
        display: flex;
        flex-direction: column;
        padding: 12px 16px;
        border-radius: 8px;
        cursor: pointer;
        background-color: var(--home-list-bg);
        p {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          font-weight: 500;
          color: var(--home-list-text1);
          img {
            width: 24px;
            height: 24px;
            margin-right: 8px;
          }
        }
        span {
          font-size: 14px;
          font-weight: 400;
          color: var(--home-list-text2);
        }
      }
    }
    .new-list {
      margin-top: 16px;
      margin-bottom: 48px;
      .link {
        display: block;
        width: 360px;
        padding: 6px 12px;
        margin-bottom: 12px;
        font-size: 14px;
        font-weight: 500;
        border: 1px solid var(--home-list-border);
        border-radius: 6px;
        font-style: italic;
        &:hover {
          box-shadow: 0 4px 10px var(--home-list-shadow);
        }
      }
    }
  }
</style>
