# 类加载器

## 类加载过程

&emsp; 当程序使用某个 Java 类时，JVM 虚拟机会加载它的.class 文件到虚拟机的内存中，负责加载工作的就是类加载器

![JavaLoad](/public/java/javaUnderlayer/classLoader/JavaLoad.png)

&emsp; 类加载过程分为加载、验证、准备、解析、初始化，下图是对类加载过程简单的介绍。
![ClassLoaderProcess](/public/java/javaUnderlayer/classLoader/ClassLoaderProcess.png)

### 1. 加载

&emsp; 原理：委托 ClassLoader 读取 Class 二进制字节流，载入到方法区内存，并在堆内存中生成对应的 java.lang.Class 对象相互引用。
![Load](/public/java/javaUnderlayer/classLoader/Load.png)

### 2. 验证

&emsp; 校验字节流确保符合 Class 文件格式，执行语义分析确保符合 Java 语法，校验字节码指令合法性。

### 3. 准备

&emsp; 在堆中分配类变量（static）内存并初始化为零值，主义还没到执行 putstatic 指令赋值的初始化阶段，但静态常量属性除外：

### 4. 解析

&emsp; 将常量池中的符号引用（Class_info, Fieldref_info, Methodref_info）替换为直接引用（内存地址）

### 5. 初始化

&emsp; javac 会从上到下合并类中 static 变量赋值、static 语句块，生成类构造器()V，在初始化阶段执行，此方法的执行由 JVM 保证线程安全；注意 JVM 规定有且仅有的，会立即触发对类初始化的六种 case

## 类加载器

&emsp; JVM 虚拟机提供了 3 种类加载器，它们分别是启动类加载器（Bootstrap）、扩展类加载器（Extension）、系统类加载器（System）。

&emsp; 每个类加载器都有明确的加载范围：

- 启动类加载器（Bootstrap）：加载\<JAVA_HOME>/lib 路径下的核心类库
- 扩展类加载器（Extension）：加载\<JAVA_HOME>/lib/extl 路径下的
- 系统类加载器（System）：加载系统类路径 classpath，也就是我们经常用到的 classpath 路径，一般情况该类加载器是程序中默认的类加载器
  ![ClassLoader](/public/java/javaUnderlayer/classLoader/ClassLoader.png)

## 双亲委派机制

&emsp; 双亲委派模式是为了避免重复加载和核心类篡改。

&emsp; 双亲委派模式的原理也十分简单，类加载器收到类加载请求，会委托给父类加载器去执行，父类加载器还存在其父类加载器，则进一步向上委托，依次递归，直到顶层类加载器，如果顶层类加载器加载到该类，就成功返回 class 对象，否则委托给下级类加载器去执行，依次递归（此处的父子关系并非通常所说的继承关系，而是采用组合关系来实现）。

### 双亲委派机制好处

&emsp; Jvm 中类的唯一性是由类本身和加载这个类的类加载器决定的，简单的说，如果有个 a 类，如果被两个不同的类加载器加载，那么他们必不相等。你看到这里会不会想到所有类的父类都是 Object 是怎么实现的了吗？是因为无论哪一个类加载器加载 Object 类，都会交给最顶层的启动类加载器去加载，这样就保证了 Object 类在 Jvm 中是唯一的。
