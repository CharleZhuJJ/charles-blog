import { sync } from "fast-glob";
import matter from "gray-matter";

/**
 * 根据order排序
 * @param array
 * @returns
 */
function sortedArray(array) {
  return array.sort((a, b) => a.order - b.order);
}

/**
 * 根据路径名获取目录下所有分类
 * @param path
 * @returns
 */
function getItemsByPath(path: string, result: any[] = []) {
  sortedArray(
    sync(`${path}*`, {
      objectMode: true,
      onlyFiles: false,
      stats: true,
    })
  ).forEach((file) => {
    const fileData: any = {};
    if (file.stats?.isFile()) {
      const { data } = matter.read(`${path}${file.name}`);
      const filename = file.name.replace(".md", "");
      fileData.text = data.title;
      fileData.link = `/${
        filename === "index" ? path : `${path}${filename}`
      }`.replace("docs/", "");
    } else {
      // 文件夹
      fileData.text = file.name;
      fileData.items = getItemsByPath(`${file.path}/`, []);
    }
    result.push(fileData);
  });
  return result;
}

const sidebar = {
  "/md/java/": [
    {
      text: "Java",
      link: "/md/java/",
      // items: getItemsByPath("docs/md/java/"),
      items: [
        {
          text: "Spring ",
          collapsed: true,
          items: [
            { text: "Spring杂叙", link: "/md/java/spring/Spring" },
            { text: "SpringMvc", link: "/md/java/spring/SpringMVC" },
            { text: "SpringBoot", link: "/md/java/spring/SpringBoot" },
            { text: "Spring事务", link: "/md/java/spring/SpringTransaction" },
            { text: "Spring注解", link: "/md/java/spring/SpringAnnotations" },
          ],
        },
        {
          text: "Java底层",
          collapsed: true,
          items: [
            { text: "JVM", link: "/md/java/javaUnderlayer/JVM" },
            { text: "GC", link: "/md/java/javaUnderlayer/GC" },
            { text: "内存泄漏", link: "/md/java/javaUnderlayer/MemoryLeak" },
            { text: "哈希(Hash)", link: "/md/java/javaUnderlayer/Hash" },
            { text: "类加载器", link: "/md/java/javaUnderlayer/ClassLoader" },
          ],
        },
        {
          text: "JavaWeb",
          collapsed: true,
          items: [{ text: "JavaWeb杂叙", link: "/md/java/javaWeb/JavaWeb" }],
        },
        {
          text: "Java其他",
          collapsed: true,
          items: [
            { text: "Java8", link: "/md/java/javaOther/Java8" },
            { text: "锁", link: "/md/java/javaOther/Lock" },
            { text: "Synchronized", link: "/md/java/javaOther/Synchronized" },
            { text: "浅谈设计模式", link: "/md/java/javaOther/DesignPatterns" },
            { text: "进程，线程，线程池，调度",link: "/md/java/javaOther/Thread" },
            { text: "正则表达式", link: "/md/java/javaOther/RegularExpression" },
            { text: "Java面试题", link: "/md/java/javaOther/JavaInterviewQuestions" },
          ],
        },
        {
          text: "Mybatis",
          collapsed: true,
          items: [
            { text: "Mybatis杂叙", link: "/md/java/mybatis/Mybatis" },
            { text: "Mybatis-Plus", link: "/md/java/mybatis/MybatisPlus" },
          ],
        },
      ],
    },
  ],
  "/md/database/": [
    {
      text: "数据库",
      link: "/md/database/",
      // items: getItemsByPath("docs/md/database/"),
      items: [
        {text: "MySQL",link: "/md/database/Mysql"},
        {text: "Oracle",link: "/md/database/Oracle"},
        {text: "Redis",link: "/md/database/Redis"},
        {text: "ELK Stack",link: "/md/database/ElkStack"},
        {text: "MongoDB",link: "/md/database/MongoDB"},
        {text: "缓存",link: "/md/database/Cache"}
      ]
    },
  ],
  "/md/network/": [
    {
      text: "网络",
      link: "/md/network/",
      // items: getItemsByPath("docs/md/network/"),
      items: [
        {text: "网络模型", link: "/md/network/Model"},
        {text: "HTTP", link: "/md/network/Http"},
        {text: "HTTPS", link: "/md/network/Https"},
        {text: "TCP", link: "/md/network/Tcp"},
        {text: "IP", link: "/md/network/Ip"},
        {text: "MAC", link: "/md/network/Mac"},
        {text: "DNS", link: "/md/network/Dns"},
        {text: "会话技术", link: "/md/network/ConversationTechnolog"},
        {text: "常见的网络设备", link: "/md/network/NetworkDevices"},
        {text: "负载均衡", link: "/md/network/LoadBalance"},
      ]
    },
  ],
  "/md/environment/": [
    {
      text: "环境",
      link: "/md/environment/",
      // items: getItemsByPath("docs/md/environment/"),
      items: [
        {text: "Linux", link: "/md/environment/Linux"},
        {text: "Shell", link: "/md/environment/Shell"},
        {text: "Docker", link: "/md/environment/Docker"},
      ]
    },
  ],
  "/md/distributed/": [
    {
      text: "分布式",
      items: getItemsByPath("docs/md/distributed/"),
    },
  ],
  "/md/middleware/": [
    {
      text: "中间件",
      link: "/md/middleware/",
      // items: getItemsByPath("docs/md/middleware/"),
      items: [
        {text: "Nginx", link: "/md/middleware/Nginx"},
        {text: "RabbitMQ", link: "/md/middleware/Rabbitmq"},
        {text: "Zookeeper", link: "/md/middleware/Zookeeper"},
        {text: "Arthas", link: "/md/middleware/Arthas"},
        {text: "JMS", link: "/md/middleware/Jms"},
        {text: "ActiveMQ", link: "/md/middleware/ActiveMq"},
        {text: "Kafka", link: "/md/middleware/Kafka"},
      ]
    },
  ],
};

export default sidebar;
