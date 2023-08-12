---
title: JavaWeb杂叙
author: Charles Chu
date: 2023/03/11
isOriginal: true
outline: deep
---

# JavaWeb杂叙

## Filter(过滤器)
### 步骤
1. 定义一个类，实现接口Filter
2. 复写方法
3. 配置拦截路径：1) web.xml；2) 注解

### 过滤器细节
#### 1. web.xml配置
```xml
<filter>
    <filter-name>demo1</filter-name>
    <filter-class>cn.itcast.web.filter.FilterDemo1</filter-class>
</filter>
<filter-mapping>
    <filter-name>demo1</filter-name>
    <!-- 拦截路径 -->
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

#### 2. 过滤器执行流程
&emsp;a. 执行过滤器

&emsp;b. 执行放行后的资源：filterChain.doFilter(servletRequest,ervletResponse)

&emsp;c. 回来执行过滤器放行代码下边的代码

#### 3. 过滤器生命周期方法
&emsp;a. init:在服务器启动后，会创建Filter对象，然后调用init方法。只执行一次。用于加载资源

&emsp;b. doFilter:每一次请求被拦截资源时，会执行。执行多次

&emsp;c. destroy:在服务器关闭后，Filter对象被销毁。如果服务器是正常关闭，则会执行destroy方法。只执行一次。用于释放资源

#### 4. 过滤器配置详解
##### 拦截路径配置

&emsp;a. 具体资源路径： /index.jsp 只有访问index.jsp资源时，过滤器才会被执行

&emsp;b. 拦截目录： /user/* 访问/user下的所有资源时，过滤器都会被执行

&emsp;c. 后缀名拦截： *.jsp 访问所有后缀名为jsp资源时，过滤器都会被执行

&emsp;d. 拦截所有资源：/* 访问所有资源时，过滤器都会被执行

##### 拦截方式配置(资源被访问的方式)

- 注解配置

 &emsp;设置dispatcherTypes属性

&emsp;1. REQUEST：默认值。浏览器直接请求资源

&emsp;2. FORWARD：转发访问资源

&emsp;3. INCLUDE：包含访问资源

&emsp;4. ERROR：错误跳转资源

&emsp;5. ASYNC：异步访问资源

- web.xml配置

&emsp;设置标签即可

#### 5. 过滤器链(配置多个过滤器)
&emsp;执行顺序：如果有两个过滤器：过滤器1和过滤器2

1. 过滤器1
2. 过滤器2
3. 资源执行
4. 过滤器2
5. 过滤器1

##### 过滤器先后顺序问题
1. 注解配置：按照类名的字符串比较规则比较，值小的先执行，如： AFilter 和 BFilter，AFilter就先执行了。
2. web.xml配置： 谁定义在上边，谁先执行

## servlet
&emsp; 在web.xml中配置Servlet

```xml
<servlet>
  <servlet-name>demo1</servlet-name>
  <servlet-class>cn.itcast.web.servlet.ServletDemo1</servlet-class>
</servlet>
 
<servlet-mapping>
  <servlet-name>demo1</servlet-name>
  <url-pattern>/demo1</url-pattern>
</servlet-mapping>
```

### 执行原理
1. 当服务器接受到客户端浏览器的请求后，会解析请求URL路径，获取访问的Servlet的资源路径
2. 查找web.xml文件，是否有对应的`<url-pattern>`标签体内容。
3. 如果有，则在找到对应的`<servlet-class>`全类名
4. tomcat会将字节码文件加载进内存，并且创建其对象（创建对象：newInstance()）
5. 调用其方法 （service）

### Servlet中的生命周期方法
1. 被创建：执行init方法，只执行一次。
    * 默认情况下，第一次被访问时，Servlet被创建；
    * 可以配置执行Servlet的创建时机；

        在`<servlet>`标签下配置

        1) 第一次被访问时，创建： `<load-on-startup>`的值为负数

        2) 在服务器启动时，创建：`<load-on-startup>`的值为0或正整数

    * Servlet的init方法，只执行一次，说明一个Servlet在内存中只存在一个对象，Servlet是单例的。

        多个用户同时访问时，可能存在线程安全问题。尽量不要在Servlet中定义成员变量。即使定义了成员变量，也不要对修改值。

2. 提供服务：执行service方法，执行多次。
    * 每次访问Servlet时，Service方法都会被调用一次。
3. 被销毁：执行destroy方法，只执行一次。
    * Servlet被销毁时执行。服务器关闭时，Servlet被销毁
    * 只有服务器正常关闭时，才会执行destroy方法。
    * destroy方法在Servlet被销毁之前执行，一般用于释放资源