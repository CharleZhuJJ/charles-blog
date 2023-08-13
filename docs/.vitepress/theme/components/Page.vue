<template>
  <div class="home-page">
    <img src="/public/common/avatar.png" class="avatar" />
    <div class="title">欢迎来到小朱的博客站</div>
    <div class="label">学习、思考、编写，我的 coding 生活</div>
    <img src="/public/common/sub-title.png" class="sub-title" />
    <div class="links-list">
      <a href="/charles-blog/md/java/" class="link">
        <p>💻 Java</p>
        <span>跨平台的高级编程语言</span>
      </a>
      <a href="/charles-blog/md/database/" class="link">
        <p>🖥️ 数据库</p>
        <span>用于存储和管理数据的软件系统</span>
      </a>
      <a href="/charles-blog/md/network/" class="link">
        <p>📡 网络</p>
        <span>实现计算机网络的各种技术和协议</span>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
  @font-face {
    font-family: "font1";
    src: url(/public/font1.ttf);
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
    padding-top: 100px;
    overflow: auto;
    .avatar {
      &:hover {
        animation: rotate 3s linear infinite;
      }
    }
    .title {
      transform: scale(0.8);
      margin-top: 32px;
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
    .sub-title {
      margin-top: 56px;
    }
    .links-list {
      display: grid;
      grid-column-gap: 32px;
      grid-template-columns: repeat(3, 1fr);
      width: 60%;
      margin-top: 24px;
      @media (max-width: 640px) {
        width: 100%;
        padding: 0 24px;
      }
      .link {
        display: flex;
        flex-direction: column;
        padding: 16px;
        border-radius: 8px;
        cursor: pointer;
        background-color: #efefef;
        p {
          margin-bottom: 12px;
          font-weight: 500;
          color: var(--vp-c-brand);
        }
        span {
          font-size: 14px;
          font-weight: 400;
          color: var(--vp-c-text-2);
        }
      }
    }
  }
</style>
