import { sync } from "fast-glob";

const sidebar = [
  // {
  //   text: "Java",
  //   collapsed: true,
  //   items: [
  //     {
  //       text: "Spring ",
  //       items: [
  //         { text: "Spring杂叙", link: "/md/java/spring/Spring" },
  //         { text: "SpringMvc", link: "/md/java/spring/SpringMVC" },
  //         { text: "Spring事务", link: "/md/java/spring/SpringTransaction" },
  //         { text: "Spring注解", link: "/md/java/spring/SpringAnnotations" },
  //         { text: "SpringBoot", link: "/md/java/spring/SpringBoot" },
  //       ],
  //     },
  //     {
  //       text: "JavaWeb",
  //       items: [{ text: "JavaWeb杂叙", link: "/md/java/javaWeb/JavaWeb" }],
  //     },
  //     {
  //       text: "Java底层",
  //       items: [
  //         { text: "GC", link: "/md/java/javaUnderlayer/GC" },
  //         { text: "JVM", link: "/md/java/javaUnderlayer/JVM" },
  //         { text: "哈希(Hash)", link: "/md/java/javaUnderlayer/Hash" },
  //         { text: "类加载器", link: "/md/java/javaUnderlayer/ClassLoader" },
  //         { text: "内存泄漏", link: "/md/java/javaUnderlayer/MemoryLeak" },
  //       ],
  //     },
  //     {
  //       text: "Java其他",
  //       items: [
  //         { text: "Java杂叙", link: "/md/java/javaOther/Java" },
  //         { text: "Java8", link: "/md/java/javaOther/Java8" },
  //         { text: "Synchronized", link: "/md/java/javaOther/Synchronized" },
  //         { text: "浅谈设计模式", link: "/md/java/javaOther/DesignPatterns" },
  //         {
  //           text: "进程，线程，线程池，调度",
  //           link: "/md/java/javaOther/Thread",
  //         },
  //         { text: "正则表达式", link: "/md/java/javaOther/RegularExpression" },
  //         {
  //           text: "Java面试题",
  //           link: "/md/java/javaOther/JavaInterviewQuestions",
  //         },
  //       ],
  //     },
  //     {
  //       text: "Mybatis",
  //       items: [
  //         { text: "Mybatis杂叙", link: "/md/java/mybatis/Mybatis" },
  //         { text: "Mybatis-Plus", link: "/md/java/mybatis/MybatisPlus" },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   text: "分布式",
  //   collapsed: true,
  //   items: [
  //     { text: "单点登陆", link: "/md/distributed/SingleSignOn" },
  //     { text: "分布式系统", link: "/md/distributed/DistributedSystem" },
  //   ],
  // },
];
function getItemsByPath(path: string) {
  console.log("path", path);
  // sync(`docs/${path}/*`, {
  //   onlyDirectories: true,
  //   objectMode: true,
  // }).forEach((file) => {
  //   console.log("file", file);
  // });
  // return [
  //   { text: "Index", link: "/md/test/" },
  //   { text: "child1", link: "/md/test/child1" },
  // ];
  return [];
}

const sidebar2 = {
  "/md/test/": [
    {
      text: "test模块",
      items: getItemsByPath("/md/test"),
    },
  ],
};

console.log(22222);
export default sidebar2;
