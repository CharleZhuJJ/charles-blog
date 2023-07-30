# 会话技术

1. 会话：一次会话中包含多次请求和响应。
    - 一次会话：浏览器第一次给服务器资源发送请求，会话建立，直到有一方断开为止
2. 功能：在一次会话的范围内的多次请求间，共享数据
3. 方式：
    1. 客户端会话技术：Cookie
    2. 服务器端会话技术：Session		

## Cookie
&emsp; 客户端会话技术，将数据保存到客户端

### Cookie使用步骤
1. 创建Cookie对象，绑定数据：new Cookie(String name, String value) 
2. 发送Cookie对象：response.addCookie(Cookie cookie) 
3. 获取Cookie，拿到数据：Cookie[]  request.getCookies()  

### Cookie的特点
1. cookie存储数据在客户端浏览器
2. 浏览器对于单个cookie 的大小有限制(4kb) 以及 对同一个域名下的总cookie数量也有限制(20个)

### Cookie作用
1. cookie一般用于存出少量的不太敏感的数据
2. 在不登录的情况下，完成服务器对客户端的身份识别

### Cookie的细节
1. 一次可不可以发送多个cookie?
    - 可以创建多个Cookie对象，使用response调用多次addCookie方法发送cookie即可。
2. cookie在浏览器中保存多长时间？
    - 默认情况下，当浏览器关闭后，Cookie数据被销毁
3. 持久化存储
    - setMaxAge(int seconds)
        - 正数：将Cookie数据写到硬盘的文件中。持久化存储。指定cookie存活时间，时间到后，cookie文件自动失效（时间单位：秒）
        - 负数：默认值
        - 零：删除cookie信息
4. cookie能不能存中文？
    * 在tomcat 8 之前 cookie中不能直接存储中文数据，需要将中文数据转码---一般采用URL编码(%E3)
    * 在tomcat 8 之后，cookie支持中文数据。特殊字符还是不支持，建议使用URL编码存储，URL解码解析
5. cookie共享问题？
    - 假设在一个tomcat服务器中，部署了多个web项目，那么在这些web项目中cookie能不能共享？
        * 默认情况下cookie不能共享
        * setPath(String path):设置cookie的获取范围。默认情况下，设置当前的虚拟目录，如果要共享，则可以将path设置为"/"			
    - 不同的tomcat服务器间cookie共享问题？
        * setDomain(String path):如果设置一级域名相同，那么多个服务器之间cookie可以共享
        * setDomain(".baidu.com"),那么tieba.baidu.com和news.baidu.com中cookie可以共享


## Session
&emsp; 服务器端会话技术，在一次会话的多次请求间共享数据，将数据保存在服务器端的对象中（HttpSession），Session的实现是依赖于Cookie的。

### Session的使用步骤
```java
// 1. 获取HttpSession对象：
HttpSession session = request.getSession();

// 2. 使用HttpSession对象：
Object getAttribute(String name)  
void setAttribute(String name, Object value)
void removeAttribute(String name)  
```

### Session的特点
1. session用于存储一次会话的多次请求的数据，存在服务器端
2. session可以存储任意类型，任意大小的数据

### Session与Cookie的区别
1. session存储数据在服务器端，Cookie在客户端
2. session没有数据大小限制，Cookie有
3. session数据安全，Cookie相对于不安全

### Session的细节
1. 当客户端关闭后，服务器不关闭，两次获取session是否为同一个？
    * 默认情况下。不是。
    * 如果需要相同，则可以创建Cookie,键为JSESSIONID，设置最大存活时间，让cookie持久化保存。
```java
Cookie c = new Cookie("JSESSIONID",session.getId());
c.setMaxAge(60*60);
response.addCookie(c);
```

2. 客户端不关闭，服务器关闭后，两次获取的session是同一个吗？
   - 不是同一个，但是要确保数据不丢失。tomcat自动完成以下工作
        * session的钝化：在服务器正常关闭之前，将session对象系列化到硬盘上
        * session的活化：在服务器启动后，将session文件转化为内存中的session对象即可。

3. session什么时候被销毁？
    - 服务器关闭
    - session对象调用invalidate() 。
    - session默认失效时间 30分钟
```xml
<session-config>
    <session-timeout>30</session-timeout>
</session-config>
```  

### Session的状态保持
&emsp; 当用户第一次通过浏览器使用用户名和密码访问服务器时，服务器会验证用户数据，验证成功后在服务器端写入session数据，向客户端浏览器返回sessionid。

&emsp; 浏览器将sessionid保存在cookie中，当用户再次访问服务器时，会携带sessionid，服务器会拿着sessionid从服务器获取session数据，然后进行用户信息查询，查询到，就会将查询到的用户信息返回，从而实现状态保持。
![SessionAuth](/public/network/conversationTechnolog/SessionAuth.png)

#### 弊端
1. 服务器压力增大
    - 通常session是存储在内存中的，每个用户通过认证之后都会将session数据保存在服务器的内存中，而当用户量增大时，服务器的压力增大。
2. CSRF跨站伪造请求攻击
    - session是基于cookie进行用户识别的, cookie如果被截获，用户就会很容易受到跨站请求伪造的攻击。
3. 扩展性不强
    - 如果将来搭建了多个服务器，虽然每个服务器都执行的是同样的业务逻辑，但是session数据是保存在内存中的（不是共享的），用户第一次访问的是服务器1，当用户再次请求时可能访问的是另外一台服务器2，服务器2获取不到session信息，就判定用户没有登陆过。


## Token认证机制

&emsp; token与session的不同主要在认证成功后，会对当前用户数据进行加密，生成一个加密字符串token，返还给客户端（服务器端并不进行保存）

&emsp; 浏览器会将接收到的token值存储在Local Storage中，（通过js代码写入Local Storage，通过js获取，并不会像cookie一样自动携带）

&emsp; 再次访问时服务器端对token值的处理：服务器对浏览器传来的token值进行解密，解密完成后进行用户数据的查询，如果查询成功，则通过认证，实现状态保持，所以，即时有了多台服务器，服务器也只是做了token的解密和用户数据的查询，它不需要在服务端去保留用户的认证信息或者会话信息，这就意味着基于token认证机制的应用不需要去考虑用户在哪一台服务器登录了，这就为应用的扩展提供了便利，解决了session扩展性的弊端。
![TokenAuth](/public/network/conversationTechnolog/TokenAuth.png)

## Session,Cookie,Token
- session存储于服务器，可以理解为一个状态列表，拥有一个唯一识别符号sessionId，通常存放于cookie中。服务器收到cookie后解析出sessionId，再去session列表中查找，才能找到相应session。依赖cookie
- cookie类似一个令牌，装有sessionId，存储在客户端，浏览器通常会自动添加。
- token也类似一个令牌，无状态，用户信息都被加密到token中，服务器收到token后解密就可知道是哪个用户。需要开发者手动添加。