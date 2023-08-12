---
title: HTTP
author: Charles Chu
date: 2023/07/15
isOriginal: true
---

# HTTP <Badge text="持续更新" type="warning" />

## Http请求消息数据格式

### 1. 请求行
&emsp; 格式：请求方式 请求url 请求协议/版本

&emsp; 例如:  GET    /login.html	 HTTP/1.1 

#### 请求方式
&emsp; HTTP协议有7中请求方式，常用的有2种

##### GET
1. 请求参数在请求行中，在url后。
2. 请求的url长度有限制的
3. 不太安全

##### POST
1. 请求参数在请求体中
2. 请求的url长度没有限制的
3. 相对安全

##### GET请求和POST请求的区别
- GET 请求的请求参数是添加到 head 中，可以在 url 中可以看到；POST 请求的请求参数是添加到body中，在url 中不可见。
- 请求的url有长度限制，这个限制由浏览器和 web 服务器决定和设置的，例如IE浏览器对 URL的最大限制为2083个字符，如果超过这个数字，提交按钮没有任何反应，因为GET请求的参数是添加到URL中，所以GET请求的URL的长度限制需要将请求参数长度也考虑进去。而POST请求不用考虑请求参数的长度。
- GET请求产生一个数据包; POST请求产生2个数据包，在火狐浏览器中，产生一个数据包，这个区别点在于浏览器的请求机制，先发送请求头，再发送请求体，因为GET没有请求体，所以就发送一个数据包，而POST包含请求体，所以发送两次数据包，但是由于火狐机制不同，所以发送一个数据包。
- GET 请求会被浏览器主动缓存下来，留下历史记录，而 POST 默认不会。
- GET是幂等的，而POST不是(幂等表示执行相同的操作，结果也是相同的)
- GET是获取数据，POST是修改数据
	
### 2. 请求头
&emsp; 客户端浏览器告诉服务器一些信息，格式为，请求头名称: 请求头值

#### 常见的请求头
1. User-Agent：浏览器告诉服务器，我访问你使用的浏览器版本信息，可以在服务器端获取该头的信息，解决浏览器的兼容性问题
2. Referer：`http://localhost/login.html`，告诉服务器，当前请求从哪里来。防盗链，用于统计工作。

### 3. 请求空行
&emsp; 空行，就是用于分割POST请求的请求头，和请求体的。
	
### 4. 请求体(正文)
&emsp; 封装POST请求消息的请求参数的


## Request
&emsp; request对象是来获取请求消息。request和response对象是由服务器创建的。

### 获取请求消息数据

#### 1. 获取请求行数据
```java
// 示例：* GET /day14/demo1?name=zhangsan HTTP/1.1
// 1. 获取请求方式
String getMethod() // GET   

// 2. 获取虚拟目录
String getContextPath() // /day14

// 3. 获取Servlet路径
String getServletPath() // /demo1

// 4. 获取get方式请求参数
String getQueryString() // name=zhangsan

// 5. 获取请求URI
String getRequestURI() // /day14/demo1
StringBuffer getRequestURL()  // http://localhost/day14/demo1

// 6. 获取协议及版本
String getProtocol() // HTTP/1.1

// 7. 获取客户机的IP地址
String getRemoteAddr()
```

#### 2. 获取请求头数据
```java
// 通过请求头的名称获取请求头的值
String getHeader(String name)

// 获取所有的请求头名称
Enumeration<String> getHeaderNames()
```

#### 3. 获取请求体数据
&emsp; 只有POST请求方式，才有请求体，在请求体中封装了POST请求的请求参数
1. 获取流对象
```java
// 获取字符输入流，只能操作字符数据
BufferedReader getReader()

// 获取字节输入流，可以操作所有类型数据
ServletInputStream getInputStream()
```

2. 再从流对象中拿数据			

### 其他功能

#### 1. 获取请求参数通用方式
&emsp; 不论get还是post请求方式都可以使用下列方法来获取请求参数
```java
// 1.根据参数名称获取参数值 
String getParameter(String name) // username=zs&password=123

// 2.根据参数名称获取参数值的数组
String[] getParameterValues(String name) // hobby=xx&hobby=game

// 3.获取所有请求的参数名称
Enumeration<String> getParameterNames()

// 4.获取所有参数的map集合
Map<String,String[]> getParameterMap()

// 中文乱码问题
// get方式：tomcat 8 已经将get方式乱码问题解决了
// post方式：会乱码：在获取参数前，设置request的编码request.setCharacterEncoding("utf-8");
```

#### 2. 请求转发
&emsp; 一种在服务器内部的资源跳转方式
```java
// 1. 通过request对象获取请求转发器对象：
RequestDispatcher getRequestDispatcher(String path)

// 2. 使用RequestDispatcher对象来进行转发：
forward(ServletRequest request, ServletResponse response)
``` 

&emsp; 特点
1. 浏览器地址栏路径不发生变化。
2. 只能转发到当前服务器内部资源中。
3. 转发是一次请求

#### 3. 共享数据
- 域对象：一个有作用范围的对象，可以在范围内共享数据
- request域：代表一次请求的范围，一般用于请求转发的多个资源中共享数据
```java
// 1. 存储数据
void setAttribute(String name,Object obj)

// 2. 通过键获取值
Object getAttitude(String name)

// 3. 通过键移除键值对
void removeAttribute(String name)
```

#### 4. 获取ServletContext
```java
ServletContext getServletContext()
```

## Response
&emsp; 服务器端发送给客户端的数据

### 1. 响应行
&emsp; 组成：协议/版本 响应状态码 状态码描述  
&emsp; HTTP/1.1    200    OK

#### 响应状态码
&emsp; 服务器告诉客户端浏览器本次请求和响应的一个状态。
1. 状态码都是3位数字，第一位定义响应的类别
2. 分类：
- 1xx：服务器就收客户端消息，但没有接受完成，等待一段时间后，发送1xx多状态码（指示信息，表示请求以接收，继续处理）
    - 100状态代码的使用，允许客户端在发request消息body之前先用request header试探一下server，看server要不要接收request body，再决定要不要发request body。
- 2xx：成功，表示请求已经被成功接收、理解、接受
    - 200 OK 是最常见的成功状态码，表示一切正常。如果是非 HEAD 请求，服务器返回的响应头都会有 body 数据。
    - 204 No Content 也是常见的成功状态码，与 200 OK 基本相同，但响应头没有 body 数据。
    - 206 Partial Content 是应用于 HTTP 分块下载或断电续传，表示响应返回的 body 数据并不是资源的全部，而是其中的一部分，也是服务器处理成功的状态。
- 3xx：重定向。状态码表示客户端请求的资源发送了变动，需要客户端用新的 URL 重新发送请求获取资源，也就是重定向。
    - 301 Moved Permanently 表示永久重定向，说明请求的资源已经不存在了，需改用新的 URL 再次访问，搜索引擎在抓取新内容的同时也将旧的网址交换为重定向之后的网址。
    - 302 Moved Permanently 表示临时重定向，说明请求的资源还在，但暂时需要用另一个 URL 来访问，搜索引擎会抓取新的内容而保存旧的网址。
    - 304 Not Modified不具有跳转的含义，表示资源未修改，重定向已存在的缓冲文件，也称缓存重定向，用于缓存控制。
- 4xx：客户端错误。状态码表示客户端发送的报文有误，服务器无法处理，也就是错误码的含义。
    - 400 Bad Request表示客户端请求的报文有错误。
    - 401 Unauthorized：缺失或错误的认证，这个状态代码必须和WWW-Authenticate报头域一起使用。
    - 403 Forbidden表示服务器禁止访问资源，并不是客户端的请求出错。
    - 404 Not Found表示请求的资源在服务器上不存在或未找到，所以无法提供给客户端。
    - 405：请求方式没有对应的doXxx方法
- 5xx：状态码表示客户端请求报文正确，但是服务器处理时内部发生了错误，属于服务器端的错误码。
    - 501 Not Implemented 表示客户端请求的功能还不支持。
    - 502 Bad Gateway 通常是服务器作为网关或代理时返回的错误码，表示服务器自身工作正常，访问后端服务器发生了错误。
    - 503 Service Unavailable 表示服务器当前很忙，暂时无法响应服务器。
    - 504 Gateway Timeout：网关超时，由作为代理或网关的服务器使用，表示不能及时地从远程服务器获得应答。
3. 301和302的区别：
- 301 和 302 都会在响应头里使用字段 Location，指明后续要跳转的 URL，浏览器会自动重定向新的 URL。
- 301重定向，指页面永久性转移，表示为资源或页面永久性地转移到了另一个位置，该资源已经永久改变了位置。
- 302重定向是页面暂时性转移，搜索引擎会抓取新的内容而保存旧的网址并认为新的网址只是暂时的。

### 2. 响应头
1. 格式：头名称： 值
2. 常见的响应头
```shell 
Content-Type # 服务器告诉客户端本次响应体数据格式以及编码格式(内容类型)，一般是指网页中存在的
# 用于定义网络文件的类型和网页的编码，决定浏览器将以什么形式、什么编码读取这个文件。

Content-disposition：# 服务器告诉客户端以什么格式打开响应体数据
# (当 IE 浏览器接收到头时，它会激活文件下载对话框，它的文件名框自动填充了头中指定的文件名。)
# 参数：
    # in-line（默认值,在当前页面内打开）
    # attachment;filename=xxx：以附件形式打开响应体。文件下载
```
3. 响应空行
4. 响应体:传输的数据

## 重定向(Redirect)
1. 地址栏发生变化
2. 重定向可以访问其他站点(服务器)的资源
3. 重定向是两次请求。不能使用request对象来共享数据

## 转发(Forward)
1. 转发地址栏路径不变
2. 转发只能访问当前服务器下的资源
3. 转发是一次请求，可以使用request对象来共享数据

## 路径
### 1. 相对路径
&emsp; 通过相对路径不可以确定唯一资源，如：./index.html，不以/开头，以.开头路径
- 规则：找到当前资源和目标资源之间的相对位置关系
    - ./：当前目录
    - ../:后退一级目录

### 2. 绝对路径
&emsp; 通过绝对路径可以确定唯一资源，如：`http://localhost/day15/responseDemo2`，`/day15/responseDemo2`， 以/开头的路径
- 规则：判断定义的路径是给谁用的，判断请求将来从哪儿发出
- 给客户端浏览器使用：需要加虚拟目录(项目的访问路径)
    - 建议虚拟目录动态获取：request.getContextPath()
    - \<a> , \<form> 重定向
- 给服务器使用：不需要加虚拟目录
    - 转发路径

## 验证码
&emsp; 设置页面缓存的,防止JSP或者Servlet中的输出被浏览器保存在缓冲区中
```java
response.setHeader(“Cache-Control”bai,”no-cache”);// HTTP 1.1
response.setHeader(“Pragma”,”No-cache”);// HTTP 1.0
response.setDateHeader(“Expires”,0);// 在代理服务器端防止缓冲
```

## URL 和 URI 的区别
&emsp; URL:Uniform Resource Locator 统⼀资源定位符； 

&emsp; URI: Uniform Resource Identifier 统⼀资源标识符； 

&emsp; 假设"⼩⽩"(URI)是⼀种资源，⽽"在迪丽亦巴的怀⾥"表明了⼀个位置。如果你想要找到（locate）⼩⽩， 那么你可以到"在迪丽亦巴怀⾥"找到⼩⽩，⽽"在迪丽亦巴怀⾥的/⼩⽩"才是我们常说的URL。⽽"在迪丽亦巴怀⾥的/⼩⽩"（URL）显然是"⼩⽩"（URI）的⼦集，毕竟，"⼩⽩"还可能是"在⽜亦菲怀⾥的/⼩ ⽩"（其他URL）。
![Uri&Url](/public/network/http/Uri&Url.png)

### 地址栏输入URL发生了什么
- 首先在浏览器输入地址；
- 然后浏览器会根据输入的URL地址，去查找域名是否被本地DNS缓存，不同浏览器对DNS的设置不同；如果浏览器缓存了你想访问的URL地址，那就直接返回ip
- 如果没有存到到你的URL地址，浏览器会发起系统调用来查询本机hosts文件是否有配置ip地址，如果找到，直接返回
- 如果没有找到，就向网络发起一个DNS查询，获取ip地址
- 浏览器和目标服务器经过三次握手的过程，建立TCP连接
- 建立连接后，浏览器向目标服务器发起HTTP请求
- 如果目标服务器只是一个简单的页面，则直接返回。
- 大多数情况，不会返回所在的页面，而是会直接重定向；浏览器获取重定向响应后，在相应报文中的Location项找到重定向地址，浏览器重新返回

## TCP/IP协议族
- 从字面意义上来讲，TCP/IP是指传输层的TCP协议和网络层的IP协议。
- 实际上，TCP/IP只是利用 IP 进行通信时所必须用到的协议群的统称。
- 具体来说，在网络层是IP/ICMP协议、在传输层是TCP/UDP协议、在应用层是SMTP、FTP、以及 HTTP 等。他们都属于 TCP/IP 协议。

## 网络攻击

### XSS
&emsp; 跨站脚本是一种网站应用程序的安全漏洞攻击，是代码注入的一种。

&emsp; 它允许恶意用户将代码注入到网页上，其他用户在观看网页时就会受到影响，这类攻击通常包含了HTML以及用户端脚本语言。比如通过客户端脚本语言（最常见如：JavaScript）

&emsp; 在一个论坛发帖中发布一段恶意的JavaScript代码就是脚本注入，如果这个代码内容有请求外部服务器，那么就叫做XSS.

#### 分类
- 反射性XSS攻击 (非持久性XSS攻击)：接口请求，单次生效
- 持久性XSS攻击 (留言板场景)：保存到数据库

### CSRF
&emsp; 跨站请求伪造，是一种挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法。

&emsp; 比如冒充用户发起请求（在用户不知情的情况下），完成一些违背用户意愿的请求（如恶意发帖，删帖，改密码，发邮件等）。

### DOS攻击
&emsp; 拒绝服务，该攻击的效果是使得计算机或网络无法提供正常的服务

#### DOS攻击的原理
&emsp; 首先攻击者向被攻击的服务器发送大量的虚假IP请求，被攻击者在收到请求后返回确认信息，等待攻击者进行确认，该过程需要TCP的三次握手，由于攻击者发送的请求信息是虚假的，所以服务器接收不到返回的确认信息，在一段时间内服务器会处与等待状态，而分配给这次请求的资源却被有被释放

&emsp; 当被攻击者等待一定的时间后，会因连接超时而断开，这时攻击者在次发送新的虚假信息请求，这样最终服务器资源被耗尽，直到瘫痪

#### DDOS
&emsp; 分布式拒绝服务攻击，指的是攻击者控制多台主机同时向同一主机或网络发起DOS攻击

#### DRDoS
&emsp; 分布反射式拒绝服务攻击，这是DDoS攻击的变形

#### 防御方法
- 关闭不必要的服务
- 限制同时打开的SYN半连接数目
- 缩短SYN半连接的time out 时间
- 正确设置防火墙
- 禁止对主机的非开放服务的访问
- 限制特定IP地址的访问
- 启用防火墙的防DDoS的属性
