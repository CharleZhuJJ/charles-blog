---
title: Nginx
author: Charles Chu
date: 2022/09/04
isOriginal: true
---

# Nginx  <Badge text="持续更新" type="warning" />
&emsp; Nginx（“engine x”）一个具有高性能的HTTP和反向代理的WEB服务器，同时也是一个POP3/SMTP/IMAP代理服务器，是由伊戈尔·赛索耶夫(俄罗斯人)使用C语言编写的，Nginx的第一个版本是2004年10月4号发布的0.1.0版本。Nginx开源。

## Nginx的功能特性及常用功能
&emsp; Nginx提供的基本功能服务从大体上归纳为"基本HTTP服务"、“高级HTTP服务”和"邮件服务"等三大类。

&emsp; Nginx常用功能主要包括HTTP代理和反向代理、负载均衡和web缓存。

### 基本HTTP服务
&emsp; Nginx提供基本HTTP服务，可作为HTTP代理服务器和反向代理服务器，支持通过缓存加速访问，可以完成简单的负载均衡和容错，支持包过滤、SSL等功能

### 高级HTTP服务
&emsp; Nginx提供高级HTTP服务，可以进行自定义配置，支持虚拟主机、URL重定向、网络监控和流媒体传输。

### 邮件服务
&emsp; Nginx作为邮件代理服务器，支持IMAP/POP3代理服务功能，支持内部SMTP服务功能。

### HTTP代理和反向代理
&emsp; HTTP代理和反向代理服务是Nginx服务器作为Web服务器的主要功能功能之一，尤其是反向代理服务，是应用十分广泛的功能。

### 负载均衡
&emsp; Nginx负载均衡主要对大量前端访问和流量进行分流，以保证前端用户访问效率。

### web缓存
&emsp; Nginx被用于缓存前端请求，可以缓存万维网、域名系统和其他网络所搜等，从而提高Web服务器性能。

## Nginx的优点
1. 速度更快、并发更高
    - Nginx之所以有这么高的并发处理能力和这么好的性能原因在于：Nginx采用了多进程和I/O多路复用(epoll)的底层实现。
2. 配置简单，扩展性强
    - Nginx的设计极具扩展性，它本身就是由很多模块组成，这些模块的使用可以通过配置文件的配置来添加。
3. 高可靠性
    - Nginx采用的是多进程模式运行，其中有一个master主进程和N多个worker进程，worker进程的数量我们可以手动设置，每个worker进程之间都是相互独立提供服务，并且master主进程可以在某一个worker进程出错时，快速去"拉起"新的worker进程提供服务。
4. 热部署
    - 可以在Nginx不停止的情况下，对Nginx进行文件升级、更新配置和更换日志文件等功能。
5. 成本低、BSD许可证

## nginx的安装
```shell
# 1.获取源码tar.gz
    wget http://nginx.org/download/nginx-1.16.1.tar.gz

# 2.解压缩
    tar -xzf nginx-1.16.1.tar.gz

# 3.进入解压后的目录，执行configure命令
    cd nginx-1.16.1
    ./configure

# 也可以进行复杂安装
    ./configure --prefix=/usr/local/nginx \
    --sbin-path=/usr/local/nginx/sbin/nginx \
    --modules-path=/usr/local/nginx/modules \
    --conf-path=/usr/local/nginx/conf/nginx.conf \
    --error-log-path=/usr/local/nginx/logs/error.log \
    --http-log-path=/usr/local/nginx/logs/access.log \
    --pid-path=/usr/local/nginx/logs/nginx.pid \
    --lock-path=/usr/local/nginx/logs/nginx.lock

# 4.编译
    make

# 5.安装
    make install
```

## nginx的启停
```shell
# 启动nginx
# 通过Nginx安装目录下的sbin下的可执行文件nginx来进行
cd /usr/local/nginx/sbin
./nginx

# 停止nginx
kill [信号] [PID]
常用信号：
    TERM/INT：立即关闭整个服务
    QUIT："优雅"地关闭整个服务
    HUP：重读配置文件并使用服务对新配置项生效
    USR1：重新打开日志文件，可以用来进行日志切割
    USR2：平滑升级到最新版的nginx
    WINCH：所有子进程不在接收处理新连接，相当于给work进程发
    
# 发送QUIT信号给master进程，master进程会控制所有的work进程不再接收新的请求，等所有请求处理完后，在把进程都关闭掉。
kill -QUIT [PID]
```

## nginx热部署（Nginx服务器版本升级和新增模块）
```shell
# 方法一：用Nginx服务信号进行升级
    # 1、将旧版本sbin目录下的nginx备份
        cd /usr/local/nginx/sbin
        mv nginx nginxold
    # 2、将新版安装目录编译后的objs目录下的nginx文件，拷贝到原来旧版本目录下
        cd ~/nginx/core/nginx-1.16.1/objs
        cp nginx /usr/local/nginx/sbin
    # 3、发送信号USR2给Nginx的1.14.2版本对应的master进程
        kill -USR2 [PID]

# 方法二：使用Nginx安装目录的make命令完成升级
    # 1、将旧版本sbin目录下的nginx备份
        cd /usr/local/nginx/sbin
        mv nginx nginxold
   # 2、将新版安装目录编译后的objs目录下的nginx文件，拷贝到原来旧版本目录下
        cd ~/nginx/core/nginx-1.16.1/objs
        cp nginx /usr/local/nginx/sbin
    # 3、进入到安装目录，执行 make upgrade
```

## nginx配置文件
&emsp; nginx.conf配置文件中默认有三大块：全局块、events块、http块。
1. 全局块，主要设置Nginx服务器整体运行的配置指令
2. events块，主要设置Nginx服务器与用户的网络连接，这一部分对Nginx服务器的性能影响较大
3. http块，是Nginx服务器配置中的重要部分，代理、缓存、日志记录、第三方模块配置；http块中可以配置多个server块，每个server块又可以配置多个location块。
    - server块，是Nginx配置和虚拟主机相关的内容
    - location块，基于Nginx服务器接收请求字符串与location后面的值进行匹配，对特定请求进行处理

### 全局块
```shell
# 指定是否开启工作进程。值越大，可以支持的并发处理量也越多；
# 但事实上受到来服务器自身的限制，建议该值和服务器CPU的内核数保存一致。
master_process: num

# 用于设定Nginx是否以守护进程的方式启动。
daemon：on | off

# 用来配置Nginx当前master进程的进程号ID存储的文件路径。
pid: filePath

# 用来配置Nginx的错误日志存放路径
error_log: filePath [日志级别（debug|info|notice|warn|error|crit|alert|emerg）]

# 用来引入其他配置文件，使Nginx的配置更加灵活
include: filePath  
```

### event块
```shell
# 用来设置Nginx网络连接序列化(这个配置主要可以用来解决常说的"惊群"问题。在某一个时刻，客户端发来一个请求连接，
# Nginx后台是以多进程的工作模式，也就是说有多个worker进程会被同时唤醒，但是最终只会有一个进程可以获取到连接;
# 如果每次唤醒的进程数目太多，就会影响Nginx的整体性能。如果将上述值设置为on(开启状态)，将会对多个Nginx进程接收连接进行序列号，
# 一个个来唤醒接收，就防止了多个进程对连接的争抢。)
accept_mutex: on | off

# 用来设置是否允许同时接收多个网络连接
multi_accept: on | off

# 用来配置单个worker进程最大的连接数（number值不能大于操作系统支持打开的最大文件句柄数量）
worker_connections：num
```

### http块
```shell
# 用来配置Nginx响应前端请求默认的MIME类型。
default_type: mime-type

# 自定义服务日志
# 用来记录用户所有的访问请求。
access.log: filePath

#记录nginx本身运行时的错误信息，不会记录用户的访问请求。
error.log: filePath

# 用来指定日志的输出格式
log_format: xxx

# 用来设置Nginx服务器是否使用sendfile()传输文件，该属性可以大大提高Nginx处理静态资源的性能
sendfile: on | off

# 用来设置长连接的超时时间。
keepalive_timeout: time
    
# 用来设置一个keep-alive连接使用的次数。
keepalive_requests: num
```

## Nginx静态资源的配置指令
```shell
# 配置监听端口。
listen: port | IP | IP:prot
# 示例：
listen 127.0.0.1:8000; # 监听指定的IP和端口
listen 127.0.0.1;  # 监听指定IP的所有端口
listen 8000;  # 监听指定端口上的连接
listen *:8000;  # 监听指定端口上的连接

# 设置虚拟主机服务名称
server_name：name
# server_name有三种配置方式
1、精确匹配
2、通配符匹配
3、正则表达式匹配，使用 ~作为正则表达式字符串的开始标记。
# 匹配执行顺序
由于server_name指令支持通配符和正则表达式，因此在包含多个虚拟主机的配置文件中，可能会出现一个名称被多个虚拟主机的server_name匹配成功
# No1:准确匹配server_name 
server_name www.itheima.com;
# No2:通配符在开始时匹配server_name成功 
server_name *.itheima.com;
# No3:通配符在结束时匹配server_name成功 
server_name www.itheima.*;
# No4:正则表达式匹配server_name成功 
server_name ~^www\.\w+\.com$;
# No5:被默认的default_server处理，如果没有指定默认找第一个server 
listen 80 default_server;  
    
# 设置请求的URI
location: uri

# 设置请求的根目录（path为Nginx服务器接收到请求以后查找资源的根目录路径。）
root：path
# 更改location的URI
alias：path
# root 和 alias 的区别
# 配置
location /images {
    root /usr/local/nginx/html;
    alias /usr/local/nginx/html;
}
# 访问路径
http://192.168.200.133/images/mv.png
# 结果
# root的处理结果是: root路径+location路径
    /usr/local/nginx/html/images/mv.png
# alias的处理结果是:使用alias路径替换location路径
    /usr/local/nginx/html/mv.png
            
# 网站的默认首页(index后面可以跟多个设置，如果访问的时候没有指定具体访问的资源，则会依次进行查找，找到第一个为止。)
index: file
    
# 网站的错误页面
error_page: code [=[response]] uri （可选项 =[response]的作用是用来将相应代码更改为另外一个）
# 指定具体跳转的地址
server {
    error_page 404 http://www.itcast.cn;
}
# 指定重定向地址
server{
    error_page 404 /50x.html;
    error_page 500 502 503 504 /50x.html;
    location =/50x.html{
        root html;
    }
}
# 使用location的@符合完成错误信息展示
server{
    error_page 404 @jump_to_error;
    location @jump_to_error {
        default_type text/plain;
        return 404 'Not Found Page...';
    }
}  
```

## Gzip压缩功能的实例配置
&emsp; 在Nginx的配置文件中可以通过配置gzip来对静态资源进行压缩
```shell
gzip on; # 开启gzip功能
gzip_types *; # 压缩源文件类型,根据具体的访问资源类型设定
gzip_comp_level 6; # gzip压缩级别
gzip_min_length 1024; # 进行压缩响应页面的最小长度,content-length
gzip_buffers 4 16K; # 缓存空间大小
gzip_http_version 1.1; # 指定压缩响应所需要的最低HTTP请求版本
gzip_vary on; # 往头信息中添加压缩标识
gzip_disable "MSIE [1-6]\."; # 对IE6以下的版本都不进行压缩
gzip_proxied off； # nginx作为反向代理压缩服务端返回数据的条件
```

## Nginx的跨域问题解决
&emsp; 使用add_header指令，该指令可以用来添加一些头信息
```shell
# 允许跨域访问的源地址信息，可以配置多个(多个用逗号分隔)，也可以使用 *代表所有源
Access-Control-Allow-Origin：* 
# 允许跨域访问的请求方式，值可以为 GET POST PUT DELETE...,可以全部设置，也可以根据需要设置，多个用逗号分隔
Access-Control-Allow-Methods：GET
```

## Nginx防盗链
```shell
# valid_referers:nginx会通就过查看referer自动和valid_referers后面的内容进行匹配，
# 如果匹配到了就将$invalid_referer变量置0，如果没有匹配到，则将$invalid_referer变量置为1，匹配的过程中不区分大小写。

valid_referers none|blocked|server_names|string...
# none: 如果Header中的Referer为空，允许访问
# blocked:在Header中的Referer不为空，但是该值被防火墙或代理进行伪装过，如不带"http://" 、"https://"等协议头的资源允许访问。
# server_names:指定具体的域名或者IP
# string: 可以支持正则表达式和*的字符串。如果是正则表达式，需要以 ~ 开头表示
    
# 对应配置：
location ~*\.(png|jpg|gif){
    valid_referers none blocked www.baidu.com 192.168.200.222 *.example.com example.* www.example.org ~\.google\.;
    if ($invalid_referer){
        return 403;
    }
    root /usr/local/nginx/html;
}
```

## Rewrite规则
```shell
# set：用来设置一个新的变量。
set $variable value;

# if：该指令用来支持条件判断，并根据条件判断结果选择不同的Nginx配置。
if (condition){...}

# break：用于中断当前相同作用域中的其他Nginx配置。

# return：用于完成对请求的处理，直接向客户端返回响应状态代码。
return code [text]; # text:为返回给客户端的响应体内容，支持变量的使用
return code URL; # code:为返回给客户端的HTTP状态代理。可以返回的状态代码为0~999的任意HTTP状态代理
return URL; # URL:为返回给客户端的URL地址

# rewrite：通过正则表达式的使用来改变URI。
rewrite regex replacement [flag];
regex:用来匹配URI的正则表达式
replacement:匹配成功后，用于替换URI中被截取内容的字符串。
    如果该字符串是以"http://"或者"https://"开头的，则不会继续向下对URI进行其他处理，而是直接返回重写后的URI给客户端。
flag:用来设置rewrite对URI的处理行为，可选值有如下：
last
break
redirect
permanent
```

## 负载均衡

### upstream指令
&emsp; 该指令是用来定义一组服务器，它们可以是监听不同端口的服务器，并且也可以是同时监听TCP和Unix socket的服务器。服务器可以指定不同的权重，默认为1。
```shell
# 示例
upstream backend{
    server 192.168.200.146:9091 down;
    server 192.168.200.146:9092 backup;
    server 192.168.200.146:9093;
}

# 负载均衡状态：
# down：当前的server暂时不参与负载均衡
# backup：预留的备份服务器(当主服务器不可用时，将用来传递请求。)
# max_fails：允许请求失败的次数
# fail_timeout：经过max_fails失败后, 服务暂停时间
# max_conns：限制最大的接收连接数
```

### server指令
&emsp; 该指令用来指定后端服务器的名称和一些参数，可以使用域名、IP、端口或者unix socket
```shell
server {
    listen 8083;
    server_name localhost;
    location /{
        proxy_pass http://backend;
    }
}
```

### 负载均衡策略
- 轮询：默认方式（每个请求会按时间顺序逐个分配到不同的后端服务器。轮询不需要额外的配置）
- weight：权重方式，加权轮询（weight=number:用来设置服务器的权重，默认为1，权重数据越大，被分配到请求的几率越大）
- ip_hash：依据ip分配方式（将某个客户端IP的请求通过哈希算法定位到同一台后端服务器上，该方式无法保证后端服务器的负载均衡）
- least_conn：依据最少连接方式（最少连接，把请求转发给连接数较少的后端服务器；该方式适合请求处理时间长短不一造成服务器过载的情况）
- url_hash：依据URL分配方式（每个url定向到同一个后端服务器，要配合缓存命中来使用）
- fair：依据响应时间方式（根据页面大小、加载时间长短智能的进行负载均衡；fair属于第三方模块实现的负载均衡）


## Nginx高可用（Keepalived）
&emsp; Keepalived 软件由 C 编写的，最初是专为 LVS负载均衡软件设计的，Keepalived 软件主要是通过 VRRP 协议实现高可用功能。
- VRRP（Virtual Route Redundancy Protocol）协议，翻译过来为虚拟路由冗余协议。VRRP协议将两台或多台路由器设备虚拟成一个设备，对外提供虚拟路由器IP,而在路由器组内部，如果实际拥有这个对外IP的路由器工作正常的话就是MASTER,MASTER实现针对虚拟路由器IP的各种网络功能。其他设备不拥有该虚拟IP，状态为BACKUP,处了接收MASTER的VRRP状态通告信息以外，不执行对外的网络功能。当主机失效时，BACKUP将接管原先MASTER的网络功能。
    - 选择协议：VRRP可以把一个虚拟路由器的责任动态分配到局域网上的 VRRP 路由器中的一台。其中的虚拟路由即Virtual路由是由VRRP路由群组创建的一个不真实存在的路由，这个虚拟路由也是有对应的IP地址。而且VRRP路由1和VRRP路由2之间会有竞争选择，通过选择会产生一个Master路由和一个Backup路由。
    - 路由容错协议：Master路由和Backup路由之间会有一个心跳检测，Master会定时告知Backup自己的状态，如果在指定的时间内，Backup没有接收到这个通知内容，Backup就会替代Master成为新的Master。Master路由有一个特权就是虚拟路由和后端服务器都是通过Master进行数据传递交互的，而备份节点则会直接丢弃这些请求和数据，不做处理，只是去监听Master的状态
![KeepAlived](/public/middleware/nginx/KeepAlived.png)