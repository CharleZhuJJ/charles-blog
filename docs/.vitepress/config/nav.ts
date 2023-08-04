const nav = [
  {
    text: "笔记",
    items: [
      // {
      //   text: "分布式",
      //   link: "/md/distributed/",
      //   activeMatch: "/md/distributed/",
      // },
      {
        text: "测试",
        link: "/md/Test/",
        activeMatch: "/md/Test/", // 匹配sidebar的分类，必须一致！
      },
    ],
    activeMatch: "/md/",
  },
  {
    text: "面试心得",
    items: [
      {
        text: "关于网络",
        link: "/",
      },
      {
        text: "关于项目",
        link: "/",
      },
    ],
  },
  {
    text: "关于我",
    link: "/md/about/",
  },
];

export default nav;
