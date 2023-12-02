import{_ as i}from"./chunks/ArticleMetadata.8b6b367a.js";import{_ as F,H as l,o as p,c as A,C as c,a as o,J as e,E as C,V as D,D as g,G as d}from"./chunks/framework.981adca9.js";const h="/charles-blog/assets/KeepAlived.2c747a3f.png",w=JSON.parse('{"title":"Nginx","description":"","frontmatter":{"title":"Nginx","author":"Charles Chu","date":"2022/09/04","isOriginal":true},"headers":[],"relativePath":"md/middleware/Nginx.md","filePath":"md/middleware/Nginx.md","lastUpdated":1693041109000}'),B={name:"md/middleware/Nginx.md"},u={id:"nginx",tabindex:"-1"},x=c("a",{class:"header-anchor",href:"#nginx","aria-label":'Permalink to "Nginx  <Badge text="持续更新" type="warning" />"'},"​",-1),E=D(`<p>  Nginx（“engine x”）一个具有高性能的HTTP和反向代理的WEB服务器，同时也是一个POP3/SMTP/IMAP代理服务器，是由伊戈尔·赛索耶夫(俄罗斯人)使用C语言编写的，Nginx的第一个版本是2004年10月4号发布的0.1.0版本。Nginx开源。</p><h2 id="nginx的功能特性及常用功能" tabindex="-1">Nginx的功能特性及常用功能 <a class="header-anchor" href="#nginx的功能特性及常用功能" aria-label="Permalink to &quot;Nginx的功能特性及常用功能&quot;">​</a></h2><p>  Nginx提供的基本功能服务从大体上归纳为&quot;基本HTTP服务&quot;、“高级HTTP服务”和&quot;邮件服务&quot;等三大类。</p><p>  Nginx常用功能主要包括HTTP代理和反向代理、负载均衡和web缓存。</p><h3 id="基本http服务" tabindex="-1">基本HTTP服务 <a class="header-anchor" href="#基本http服务" aria-label="Permalink to &quot;基本HTTP服务&quot;">​</a></h3><p>  Nginx提供基本HTTP服务，可作为HTTP代理服务器和反向代理服务器，支持通过缓存加速访问，可以完成简单的负载均衡和容错，支持包过滤、SSL等功能</p><h3 id="高级http服务" tabindex="-1">高级HTTP服务 <a class="header-anchor" href="#高级http服务" aria-label="Permalink to &quot;高级HTTP服务&quot;">​</a></h3><p>  Nginx提供高级HTTP服务，可以进行自定义配置，支持虚拟主机、URL重定向、网络监控和流媒体传输。</p><h3 id="邮件服务" tabindex="-1">邮件服务 <a class="header-anchor" href="#邮件服务" aria-label="Permalink to &quot;邮件服务&quot;">​</a></h3><p>  Nginx作为邮件代理服务器，支持IMAP/POP3代理服务功能，支持内部SMTP服务功能。</p><h3 id="http代理和反向代理" tabindex="-1">HTTP代理和反向代理 <a class="header-anchor" href="#http代理和反向代理" aria-label="Permalink to &quot;HTTP代理和反向代理&quot;">​</a></h3><p>  HTTP代理和反向代理服务是Nginx服务器作为Web服务器的主要功能功能之一，尤其是反向代理服务，是应用十分广泛的功能。</p><h3 id="负载均衡" tabindex="-1">负载均衡 <a class="header-anchor" href="#负载均衡" aria-label="Permalink to &quot;负载均衡&quot;">​</a></h3><p>  Nginx负载均衡主要对大量前端访问和流量进行分流，以保证前端用户访问效率。</p><h3 id="web缓存" tabindex="-1">web缓存 <a class="header-anchor" href="#web缓存" aria-label="Permalink to &quot;web缓存&quot;">​</a></h3><p>  Nginx被用于缓存前端请求，可以缓存万维网、域名系统和其他网络所搜等，从而提高Web服务器性能。</p><h2 id="nginx的优点" tabindex="-1">Nginx的优点 <a class="header-anchor" href="#nginx的优点" aria-label="Permalink to &quot;Nginx的优点&quot;">​</a></h2><ol><li>速度更快、并发更高 <ul><li>Nginx之所以有这么高的并发处理能力和这么好的性能原因在于：Nginx采用了多进程和I/O多路复用(epoll)的底层实现。</li></ul></li><li>配置简单，扩展性强 <ul><li>Nginx的设计极具扩展性，它本身就是由很多模块组成，这些模块的使用可以通过配置文件的配置来添加。</li></ul></li><li>高可靠性 <ul><li>Nginx采用的是多进程模式运行，其中有一个master主进程和N多个worker进程，worker进程的数量我们可以手动设置，每个worker进程之间都是相互独立提供服务，并且master主进程可以在某一个worker进程出错时，快速去&quot;拉起&quot;新的worker进程提供服务。</li></ul></li><li>热部署 <ul><li>可以在Nginx不停止的情况下，对Nginx进行文件升级、更新配置和更换日志文件等功能。</li></ul></li><li>成本低、BSD许可证</li></ol><h2 id="nginx的安装" tabindex="-1">nginx的安装 <a class="header-anchor" href="#nginx的安装" aria-label="Permalink to &quot;nginx的安装&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 1.获取源码tar.gz</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">wget</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">http://nginx.org/download/nginx-1.16.1.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 2.解压缩</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">tar</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-xzf</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">nginx-1.16.1.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 3.进入解压后的目录，执行configure命令</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#6CB6FF;">cd</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">nginx-1.16.1</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">./configure</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 也可以进行复杂安装</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">./configure</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">--prefix=/usr/local/nginx</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">\\</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#6CB6FF;">--sbin-path=/usr/local/nginx/sbin/nginx</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">\\</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#6CB6FF;">--modules-path=/usr/local/nginx/modules</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">\\</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#6CB6FF;">--conf-path=/usr/local/nginx/conf/nginx.conf</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">\\</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#6CB6FF;">--error-log-path=/usr/local/nginx/logs/error.log</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">\\</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#6CB6FF;">--http-log-path=/usr/local/nginx/logs/access.log</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">\\</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#6CB6FF;">--pid-path=/usr/local/nginx/logs/nginx.pid</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">\\</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#6CB6FF;">--lock-path=/usr/local/nginx/logs/nginx.lock</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 4.编译</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">make</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 5.安装</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">make</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 1.获取源码tar.gz</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">wget</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://nginx.org/download/nginx-1.16.1.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 2.解压缩</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">tar</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-xzf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx-1.16.1.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 3.进入解压后的目录，执行configure命令</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx-1.16.1</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">./configure</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 也可以进行复杂安装</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">./configure</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--prefix=/usr/local/nginx</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">--sbin-path=/usr/local/nginx/sbin/nginx</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">--modules-path=/usr/local/nginx/modules</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">--conf-path=/usr/local/nginx/conf/nginx.conf</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">--error-log-path=/usr/local/nginx/logs/error.log</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">--http-log-path=/usr/local/nginx/logs/access.log</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">--pid-path=/usr/local/nginx/logs/nginx.pid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">--lock-path=/usr/local/nginx/logs/nginx.lock</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 4.编译</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">make</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 5.安装</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">make</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span></span></code></pre></div><h2 id="nginx的启停" tabindex="-1">nginx的启停 <a class="header-anchor" href="#nginx的启停" aria-label="Permalink to &quot;nginx的启停&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 启动nginx</span></span>
<span class="line"><span style="color:#768390;"># 通过Nginx安装目录下的sbin下的可执行文件nginx来进行</span></span>
<span class="line"><span style="color:#6CB6FF;">cd</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">/usr/local/nginx/sbin</span></span>
<span class="line"><span style="color:#F69D50;">./nginx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 停止nginx</span></span>
<span class="line"><span style="color:#6CB6FF;">kill</span><span style="color:#ADBAC7;"> [信号] [PID]</span></span>
<span class="line"><span style="color:#F69D50;">常用信号：</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">TERM/INT：立即关闭整个服务</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">QUIT：</span><span style="color:#F69D50;">&quot;优雅&quot;</span><span style="color:#F69D50;">地关闭整个服务</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">HUP：重读配置文件并使用服务对新配置项生效</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">USR1：重新打开日志文件，可以用来进行日志切割</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">USR2：平滑升级到最新版的nginx</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">WINCH：所有子进程不在接收处理新连接，相当于给work进程发</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#768390;"># 发送QUIT信号给master进程，master进程会控制所有的work进程不再接收新的请求，等所有请求处理完后，在把进程都关闭掉。</span></span>
<span class="line"><span style="color:#6CB6FF;">kill</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-QUIT</span><span style="color:#ADBAC7;"> [PID]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 启动nginx</span></span>
<span class="line"><span style="color:#6A737D;"># 通过Nginx安装目录下的sbin下的可执行文件nginx来进行</span></span>
<span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/nginx/sbin</span></span>
<span class="line"><span style="color:#6F42C1;">./nginx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 停止nginx</span></span>
<span class="line"><span style="color:#005CC5;">kill</span><span style="color:#24292E;"> [信号] [PID]</span></span>
<span class="line"><span style="color:#6F42C1;">常用信号：</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">TERM/INT：立即关闭整个服务</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">QUIT：</span><span style="color:#6F42C1;">&quot;优雅&quot;</span><span style="color:#6F42C1;">地关闭整个服务</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">HUP：重读配置文件并使用服务对新配置项生效</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">USR1：重新打开日志文件，可以用来进行日志切割</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">USR2：平滑升级到最新版的nginx</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">WINCH：所有子进程不在接收处理新连接，相当于给work进程发</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 发送QUIT信号给master进程，master进程会控制所有的work进程不再接收新的请求，等所有请求处理完后，在把进程都关闭掉。</span></span>
<span class="line"><span style="color:#005CC5;">kill</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-QUIT</span><span style="color:#24292E;"> [PID]</span></span></code></pre></div><h2 id="nginx热部署-nginx服务器版本升级和新增模块" tabindex="-1">nginx热部署（Nginx服务器版本升级和新增模块） <a class="header-anchor" href="#nginx热部署-nginx服务器版本升级和新增模块" aria-label="Permalink to &quot;nginx热部署（Nginx服务器版本升级和新增模块）&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 方法一：用Nginx服务信号进行升级</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#768390;"># 1、将旧版本sbin目录下的nginx备份</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#6CB6FF;">cd</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">/usr/local/nginx/sbin</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">mv</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">nginx</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">nginxold</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#768390;"># 2、将新版安装目录编译后的objs目录下的nginx文件，拷贝到原来旧版本目录下</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#6CB6FF;">cd</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">~/nginx/core/nginx-1.16.1/objs</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">cp</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">nginx</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">/usr/local/nginx/sbin</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#768390;"># 3、发送信号USR2给Nginx的1.14.2版本对应的master进程</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#6CB6FF;">kill</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-USR2</span><span style="color:#ADBAC7;"> [PID]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 方法二：使用Nginx安装目录的make命令完成升级</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#768390;"># 1、将旧版本sbin目录下的nginx备份</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#6CB6FF;">cd</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">/usr/local/nginx/sbin</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">mv</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">nginx</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">nginxold</span></span>
<span class="line"><span style="color:#ADBAC7;">   </span><span style="color:#768390;"># 2、将新版安装目录编译后的objs目录下的nginx文件，拷贝到原来旧版本目录下</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#6CB6FF;">cd</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">~/nginx/core/nginx-1.16.1/objs</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">cp</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">nginx</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">/usr/local/nginx/sbin</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#768390;"># 3、进入到安装目录，执行 make upgrade</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 方法一：用Nginx服务信号进行升级</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 1、将旧版本sbin目录下的nginx备份</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/nginx/sbin</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">mv</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginxold</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 2、将新版安装目录编译后的objs目录下的nginx文件，拷贝到原来旧版本目录下</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">~/nginx/core/nginx-1.16.1/objs</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">cp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/nginx/sbin</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 3、发送信号USR2给Nginx的1.14.2版本对应的master进程</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">kill</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-USR2</span><span style="color:#24292E;"> [PID]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 方法二：使用Nginx安装目录的make命令完成升级</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 1、将旧版本sbin目录下的nginx备份</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/nginx/sbin</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">mv</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginxold</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6A737D;"># 2、将新版安装目录编译后的objs目录下的nginx文件，拷贝到原来旧版本目录下</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">~/nginx/core/nginx-1.16.1/objs</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">cp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/nginx/sbin</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 3、进入到安装目录，执行 make upgrade</span></span></code></pre></div><h2 id="nginx配置文件" tabindex="-1">nginx配置文件 <a class="header-anchor" href="#nginx配置文件" aria-label="Permalink to &quot;nginx配置文件&quot;">​</a></h2><p>  nginx.conf配置文件中默认有三大块：全局块、events块、http块。</p><ol><li>全局块，主要设置Nginx服务器整体运行的配置指令</li><li>events块，主要设置Nginx服务器与用户的网络连接，这一部分对Nginx服务器的性能影响较大</li><li>http块，是Nginx服务器配置中的重要部分，代理、缓存、日志记录、第三方模块配置；http块中可以配置多个server块，每个server块又可以配置多个location块。 <ul><li>server块，是Nginx配置和虚拟主机相关的内容</li><li>location块，基于Nginx服务器接收请求字符串与location后面的值进行匹配，对特定请求进行处理</li></ul></li></ol><h3 id="全局块" tabindex="-1">全局块 <a class="header-anchor" href="#全局块" aria-label="Permalink to &quot;全局块&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 指定是否开启工作进程。值越大，可以支持的并发处理量也越多；</span></span>
<span class="line"><span style="color:#768390;"># 但事实上受到来服务器自身的限制，建议该值和服务器CPU的内核数保存一致。</span></span>
<span class="line"><span style="color:#F69D50;">master_process:</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">num</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 用于设定Nginx是否以守护进程的方式启动。</span></span>
<span class="line"><span style="color:#F69D50;">daemon：on</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">|</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 用来配置Nginx当前master进程的进程号ID存储的文件路径。</span></span>
<span class="line"><span style="color:#F69D50;">pid:</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">filePath</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 用来配置Nginx的错误日志存放路径</span></span>
<span class="line"><span style="color:#F69D50;">error_log:</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">filePath</span><span style="color:#ADBAC7;"> [日志级别（debug</span><span style="color:#F47067;">|</span><span style="color:#F69D50;">info</span><span style="color:#F47067;">|</span><span style="color:#F69D50;">notice</span><span style="color:#F47067;">|</span><span style="color:#F69D50;">warn</span><span style="color:#F47067;">|</span><span style="color:#F69D50;">error</span><span style="color:#F47067;">|</span><span style="color:#F69D50;">crit</span><span style="color:#F47067;">|</span><span style="color:#F69D50;">alert</span><span style="color:#F47067;">|</span><span style="color:#F69D50;">emerg）]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 用来引入其他配置文件，使Nginx的配置更加灵活</span></span>
<span class="line"><span style="color:#F69D50;">include:</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">filePath</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 指定是否开启工作进程。值越大，可以支持的并发处理量也越多；</span></span>
<span class="line"><span style="color:#6A737D;"># 但事实上受到来服务器自身的限制，建议该值和服务器CPU的内核数保存一致。</span></span>
<span class="line"><span style="color:#6F42C1;">master_process:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">num</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 用于设定Nginx是否以守护进程的方式启动。</span></span>
<span class="line"><span style="color:#6F42C1;">daemon：on</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 用来配置Nginx当前master进程的进程号ID存储的文件路径。</span></span>
<span class="line"><span style="color:#6F42C1;">pid:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">filePath</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 用来配置Nginx的错误日志存放路径</span></span>
<span class="line"><span style="color:#6F42C1;">error_log:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">filePath</span><span style="color:#24292E;"> [日志级别（debug</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">info</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">notice</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">warn</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">error</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">crit</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">alert</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">emerg）]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 用来引入其他配置文件，使Nginx的配置更加灵活</span></span>
<span class="line"><span style="color:#6F42C1;">include:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">filePath</span></span></code></pre></div><h3 id="event块" tabindex="-1">event块 <a class="header-anchor" href="#event块" aria-label="Permalink to &quot;event块&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 用来设置Nginx网络连接序列化(这个配置主要可以用来解决常说的&quot;惊群&quot;问题。在某一个时刻，客户端发来一个请求连接，</span></span>
<span class="line"><span style="color:#768390;"># Nginx后台是以多进程的工作模式，也就是说有多个worker进程会被同时唤醒，但是最终只会有一个进程可以获取到连接;</span></span>
<span class="line"><span style="color:#768390;"># 如果每次唤醒的进程数目太多，就会影响Nginx的整体性能。如果将上述值设置为on(开启状态)，将会对多个Nginx进程接收连接进行序列号，</span></span>
<span class="line"><span style="color:#768390;"># 一个个来唤醒接收，就防止了多个进程对连接的争抢。)</span></span>
<span class="line"><span style="color:#F69D50;">accept_mutex:</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">on</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">|</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 用来设置是否允许同时接收多个网络连接</span></span>
<span class="line"><span style="color:#F69D50;">multi_accept:</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">on</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">|</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 用来配置单个worker进程最大的连接数（number值不能大于操作系统支持打开的最大文件句柄数量）</span></span>
<span class="line"><span style="color:#F69D50;">worker_connections：num</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 用来设置Nginx网络连接序列化(这个配置主要可以用来解决常说的&quot;惊群&quot;问题。在某一个时刻，客户端发来一个请求连接，</span></span>
<span class="line"><span style="color:#6A737D;"># Nginx后台是以多进程的工作模式，也就是说有多个worker进程会被同时唤醒，但是最终只会有一个进程可以获取到连接;</span></span>
<span class="line"><span style="color:#6A737D;"># 如果每次唤醒的进程数目太多，就会影响Nginx的整体性能。如果将上述值设置为on(开启状态)，将会对多个Nginx进程接收连接进行序列号，</span></span>
<span class="line"><span style="color:#6A737D;"># 一个个来唤醒接收，就防止了多个进程对连接的争抢。)</span></span>
<span class="line"><span style="color:#6F42C1;">accept_mutex:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">on</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 用来设置是否允许同时接收多个网络连接</span></span>
<span class="line"><span style="color:#6F42C1;">multi_accept:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">on</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 用来配置单个worker进程最大的连接数（number值不能大于操作系统支持打开的最大文件句柄数量）</span></span>
<span class="line"><span style="color:#6F42C1;">worker_connections：num</span></span></code></pre></div><h3 id="http块" tabindex="-1">http块 <a class="header-anchor" href="#http块" aria-label="Permalink to &quot;http块&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 用来配置Nginx响应前端请求默认的MIME类型。</span></span>
<span class="line"><span style="color:#F69D50;">default_type:</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">mime-type</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 自定义服务日志</span></span>
<span class="line"><span style="color:#768390;"># 用来记录用户所有的访问请求。</span></span>
<span class="line"><span style="color:#F69D50;">access.log:</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">filePath</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;">#记录nginx本身运行时的错误信息，不会记录用户的访问请求。</span></span>
<span class="line"><span style="color:#F69D50;">error.log:</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">filePath</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 用来指定日志的输出格式</span></span>
<span class="line"><span style="color:#F69D50;">log_format:</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">xxx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 用来设置Nginx服务器是否使用sendfile()传输文件，该属性可以大大提高Nginx处理静态资源的性能</span></span>
<span class="line"><span style="color:#F69D50;">sendfile:</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">on</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">|</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 用来设置长连接的超时时间。</span></span>
<span class="line"><span style="color:#F69D50;">keepalive_timeout:</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">time</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#768390;"># 用来设置一个keep-alive连接使用的次数。</span></span>
<span class="line"><span style="color:#F69D50;">keepalive_requests:</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">num</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 用来配置Nginx响应前端请求默认的MIME类型。</span></span>
<span class="line"><span style="color:#6F42C1;">default_type:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mime-type</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 自定义服务日志</span></span>
<span class="line"><span style="color:#6A737D;"># 用来记录用户所有的访问请求。</span></span>
<span class="line"><span style="color:#6F42C1;">access.log:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">filePath</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#记录nginx本身运行时的错误信息，不会记录用户的访问请求。</span></span>
<span class="line"><span style="color:#6F42C1;">error.log:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">filePath</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 用来指定日志的输出格式</span></span>
<span class="line"><span style="color:#6F42C1;">log_format:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">xxx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 用来设置Nginx服务器是否使用sendfile()传输文件，该属性可以大大提高Nginx处理静态资源的性能</span></span>
<span class="line"><span style="color:#6F42C1;">sendfile:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">on</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 用来设置长连接的超时时间。</span></span>
<span class="line"><span style="color:#6F42C1;">keepalive_timeout:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">time</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 用来设置一个keep-alive连接使用的次数。</span></span>
<span class="line"><span style="color:#6F42C1;">keepalive_requests:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">num</span></span></code></pre></div><h2 id="nginx静态资源的配置指令" tabindex="-1">Nginx静态资源的配置指令 <a class="header-anchor" href="#nginx静态资源的配置指令" aria-label="Permalink to &quot;Nginx静态资源的配置指令&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 配置监听端口。</span></span>
<span class="line"><span style="color:#F69D50;">listen:</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">port</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">|</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">IP</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">|</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">IP:prot</span></span>
<span class="line"><span style="color:#768390;"># 示例：</span></span>
<span class="line"><span style="color:#F69D50;">listen</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">127.0</span><span style="color:#96D0FF;">.0.1:8000</span><span style="color:#ADBAC7;">; </span><span style="color:#768390;"># 监听指定的IP和端口</span></span>
<span class="line"><span style="color:#F69D50;">listen</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">127.0</span><span style="color:#96D0FF;">.0.1</span><span style="color:#ADBAC7;">;  </span><span style="color:#768390;"># 监听指定IP的所有端口</span></span>
<span class="line"><span style="color:#F69D50;">listen</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">8000</span><span style="color:#ADBAC7;">;  </span><span style="color:#768390;"># 监听指定端口上的连接</span></span>
<span class="line"><span style="color:#F69D50;">listen</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">*</span><span style="color:#96D0FF;">:8000</span><span style="color:#ADBAC7;">;  </span><span style="color:#768390;"># 监听指定端口上的连接</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 设置虚拟主机服务名称</span></span>
<span class="line"><span style="color:#F69D50;">server_name：name</span></span>
<span class="line"><span style="color:#768390;"># server_name有三种配置方式</span></span>
<span class="line"><span style="color:#F69D50;">1、精确匹配</span></span>
<span class="line"><span style="color:#F69D50;">2、通配符匹配</span></span>
<span class="line"><span style="color:#F69D50;">3、正则表达式匹配，使用</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">~作为正则表达式字符串的开始标记。</span></span>
<span class="line"><span style="color:#768390;"># 匹配执行顺序</span></span>
<span class="line"><span style="color:#F69D50;">由于server_name指令支持通配符和正则表达式，因此在包含多个虚拟主机的配置文件中，可能会出现一个名称被多个虚拟主机的server_name匹配成功</span></span>
<span class="line"><span style="color:#768390;"># No1:准确匹配server_name </span></span>
<span class="line"><span style="color:#F69D50;">server_name</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">www.itheima.com</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#768390;"># No2:通配符在开始时匹配server_name成功 </span></span>
<span class="line"><span style="color:#F69D50;">server_name</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">*</span><span style="color:#96D0FF;">.itheima.com</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#768390;"># No3:通配符在结束时匹配server_name成功 </span></span>
<span class="line"><span style="color:#F69D50;">server_name</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">www.itheima.</span><span style="color:#6CB6FF;">*</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#768390;"># No4:正则表达式匹配server_name成功 </span></span>
<span class="line"><span style="color:#F69D50;">server_name</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">~^www</span><span style="color:#F47067;">\\.\\w</span><span style="color:#96D0FF;">+</span><span style="color:#F47067;">\\.</span><span style="color:#96D0FF;">com</span><span style="color:#ADBAC7;">$;</span></span>
<span class="line"><span style="color:#768390;"># No5:被默认的default_server处理，如果没有指定默认找第一个server </span></span>
<span class="line"><span style="color:#F69D50;">listen</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">80</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">default_server</span><span style="color:#ADBAC7;">;  </span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#768390;"># 设置请求的URI</span></span>
<span class="line"><span style="color:#F69D50;">location:</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">uri</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 设置请求的根目录（path为Nginx服务器接收到请求以后查找资源的根目录路径。）</span></span>
<span class="line"><span style="color:#F69D50;">root：path</span></span>
<span class="line"><span style="color:#768390;"># 更改location的URI</span></span>
<span class="line"><span style="color:#6CB6FF;">alias</span><span style="color:#ADBAC7;">：path</span></span>
<span class="line"><span style="color:#768390;"># root 和 alias 的区别</span></span>
<span class="line"><span style="color:#768390;"># 配置</span></span>
<span class="line"><span style="color:#F69D50;">location</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">/images</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">{</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">root</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">/usr/local/nginx/html</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#6CB6FF;">alias</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">/usr/local/nginx/html</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#ADBAC7;">}</span></span>
<span class="line"><span style="color:#768390;"># 访问路径</span></span>
<span class="line"><span style="color:#F69D50;">http://192.168.200.133/images/mv.png</span></span>
<span class="line"><span style="color:#768390;"># 结果</span></span>
<span class="line"><span style="color:#768390;"># root的处理结果是: root路径+location路径</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">/usr/local/nginx/html/images/mv.png</span></span>
<span class="line"><span style="color:#768390;"># alias的处理结果是:使用alias路径替换location路径</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">/usr/local/nginx/html/mv.png</span></span>
<span class="line"><span style="color:#ADBAC7;">            </span></span>
<span class="line"><span style="color:#768390;"># 网站的默认首页(index后面可以跟多个设置，如果访问的时候没有指定具体访问的资源，则会依次进行查找，找到第一个为止。)</span></span>
<span class="line"><span style="color:#F69D50;">index:</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">file</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#768390;"># 网站的错误页面</span></span>
<span class="line"><span style="color:#F69D50;">error_page:</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">code</span><span style="color:#ADBAC7;"> [=[response]] uri （可选项 =[response]的作用是用来将相应代码更改为另外一个）</span></span>
<span class="line"><span style="color:#768390;"># 指定具体跳转的地址</span></span>
<span class="line"><span style="color:#F69D50;">server</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">{</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">error_page</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">404</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">http://www.itcast.cn</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#ADBAC7;">}</span></span>
<span class="line"><span style="color:#768390;"># 指定重定向地址</span></span>
<span class="line"><span style="color:#F69D50;">server</span><span style="color:#ADBAC7;">{</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">error_page</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">404</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">/50x.html</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">error_page</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">500</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">502</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">503</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">504</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">/50x.html</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">location</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">=/50x.html{</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">root</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">html</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"><span style="color:#ADBAC7;">}</span></span>
<span class="line"><span style="color:#768390;"># 使用location的@符合完成错误信息展示</span></span>
<span class="line"><span style="color:#F69D50;">server</span><span style="color:#ADBAC7;">{</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">error_page</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">404</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">@jump_to_error</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">location</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">@jump_to_error</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">{</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">default_type</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">text/plain</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F47067;">return</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">404</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">&#39;Not Found Page...&#39;</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"><span style="color:#ADBAC7;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 配置监听端口。</span></span>
<span class="line"><span style="color:#6F42C1;">listen:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">port</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IP</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IP:prot</span></span>
<span class="line"><span style="color:#6A737D;"># 示例：</span></span>
<span class="line"><span style="color:#6F42C1;">listen</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">127.0</span><span style="color:#032F62;">.0.1:8000</span><span style="color:#24292E;">; </span><span style="color:#6A737D;"># 监听指定的IP和端口</span></span>
<span class="line"><span style="color:#6F42C1;">listen</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">127.0</span><span style="color:#032F62;">.0.1</span><span style="color:#24292E;">;  </span><span style="color:#6A737D;"># 监听指定IP的所有端口</span></span>
<span class="line"><span style="color:#6F42C1;">listen</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">8000</span><span style="color:#24292E;">;  </span><span style="color:#6A737D;"># 监听指定端口上的连接</span></span>
<span class="line"><span style="color:#6F42C1;">listen</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#032F62;">:8000</span><span style="color:#24292E;">;  </span><span style="color:#6A737D;"># 监听指定端口上的连接</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置虚拟主机服务名称</span></span>
<span class="line"><span style="color:#6F42C1;">server_name：name</span></span>
<span class="line"><span style="color:#6A737D;"># server_name有三种配置方式</span></span>
<span class="line"><span style="color:#6F42C1;">1、精确匹配</span></span>
<span class="line"><span style="color:#6F42C1;">2、通配符匹配</span></span>
<span class="line"><span style="color:#6F42C1;">3、正则表达式匹配，使用</span><span style="color:#24292E;"> </span><span style="color:#032F62;">~作为正则表达式字符串的开始标记。</span></span>
<span class="line"><span style="color:#6A737D;"># 匹配执行顺序</span></span>
<span class="line"><span style="color:#6F42C1;">由于server_name指令支持通配符和正则表达式，因此在包含多个虚拟主机的配置文件中，可能会出现一个名称被多个虚拟主机的server_name匹配成功</span></span>
<span class="line"><span style="color:#6A737D;"># No1:准确匹配server_name </span></span>
<span class="line"><span style="color:#6F42C1;">server_name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">www.itheima.com</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;"># No2:通配符在开始时匹配server_name成功 </span></span>
<span class="line"><span style="color:#6F42C1;">server_name</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#032F62;">.itheima.com</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;"># No3:通配符在结束时匹配server_name成功 </span></span>
<span class="line"><span style="color:#6F42C1;">server_name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">www.itheima.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;"># No4:正则表达式匹配server_name成功 </span></span>
<span class="line"><span style="color:#6F42C1;">server_name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">~^www</span><span style="color:#005CC5;">\\.\\w</span><span style="color:#032F62;">+</span><span style="color:#005CC5;">\\.</span><span style="color:#032F62;">com</span><span style="color:#24292E;">$;</span></span>
<span class="line"><span style="color:#6A737D;"># No5:被默认的default_server处理，如果没有指定默认找第一个server </span></span>
<span class="line"><span style="color:#6F42C1;">listen</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">80</span><span style="color:#24292E;"> </span><span style="color:#032F62;">default_server</span><span style="color:#24292E;">;  </span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 设置请求的URI</span></span>
<span class="line"><span style="color:#6F42C1;">location:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">uri</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置请求的根目录（path为Nginx服务器接收到请求以后查找资源的根目录路径。）</span></span>
<span class="line"><span style="color:#6F42C1;">root：path</span></span>
<span class="line"><span style="color:#6A737D;"># 更改location的URI</span></span>
<span class="line"><span style="color:#005CC5;">alias</span><span style="color:#24292E;">：path</span></span>
<span class="line"><span style="color:#6A737D;"># root 和 alias 的区别</span></span>
<span class="line"><span style="color:#6A737D;"># 配置</span></span>
<span class="line"><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/images</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">root</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/nginx/html</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">alias</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/nginx/html</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;"># 访问路径</span></span>
<span class="line"><span style="color:#6F42C1;">http://192.168.200.133/images/mv.png</span></span>
<span class="line"><span style="color:#6A737D;"># 结果</span></span>
<span class="line"><span style="color:#6A737D;"># root的处理结果是: root路径+location路径</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">/usr/local/nginx/html/images/mv.png</span></span>
<span class="line"><span style="color:#6A737D;"># alias的处理结果是:使用alias路径替换location路径</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">/usr/local/nginx/html/mv.png</span></span>
<span class="line"><span style="color:#24292E;">            </span></span>
<span class="line"><span style="color:#6A737D;"># 网站的默认首页(index后面可以跟多个设置，如果访问的时候没有指定具体访问的资源，则会依次进行查找，找到第一个为止。)</span></span>
<span class="line"><span style="color:#6F42C1;">index:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">file</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 网站的错误页面</span></span>
<span class="line"><span style="color:#6F42C1;">error_page:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">code</span><span style="color:#24292E;"> [=[response]] uri （可选项 =[response]的作用是用来将相应代码更改为另外一个）</span></span>
<span class="line"><span style="color:#6A737D;"># 指定具体跳转的地址</span></span>
<span class="line"><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">error_page</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">404</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://www.itcast.cn</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;"># 指定重定向地址</span></span>
<span class="line"><span style="color:#6F42C1;">server</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">error_page</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">404</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/50x.html</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">error_page</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">500</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">502</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">503</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">504</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/50x.html</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=/50x.html{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">root</span><span style="color:#24292E;"> </span><span style="color:#032F62;">html</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;"># 使用location的@符合完成错误信息展示</span></span>
<span class="line"><span style="color:#6F42C1;">server</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">error_page</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">404</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@jump_to_error</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@jump_to_error</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">default_type</span><span style="color:#24292E;"> </span><span style="color:#032F62;">text/plain</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">404</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Not Found Page...&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="gzip压缩功能的实例配置" tabindex="-1">Gzip压缩功能的实例配置 <a class="header-anchor" href="#gzip压缩功能的实例配置" aria-label="Permalink to &quot;Gzip压缩功能的实例配置&quot;">​</a></h2><p>  在Nginx的配置文件中可以通过配置gzip来对静态资源进行压缩</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#F69D50;">gzip</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">on</span><span style="color:#ADBAC7;">; </span><span style="color:#768390;"># 开启gzip功能</span></span>
<span class="line"><span style="color:#F69D50;">gzip_types</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">*</span><span style="color:#ADBAC7;">; </span><span style="color:#768390;"># 压缩源文件类型,根据具体的访问资源类型设定</span></span>
<span class="line"><span style="color:#F69D50;">gzip_comp_level</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">6</span><span style="color:#ADBAC7;">; </span><span style="color:#768390;"># gzip压缩级别</span></span>
<span class="line"><span style="color:#F69D50;">gzip_min_length</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">1024</span><span style="color:#ADBAC7;">; </span><span style="color:#768390;"># 进行压缩响应页面的最小长度,content-length</span></span>
<span class="line"><span style="color:#F69D50;">gzip_buffers</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">4</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">16</span><span style="color:#96D0FF;">K</span><span style="color:#ADBAC7;">; </span><span style="color:#768390;"># 缓存空间大小</span></span>
<span class="line"><span style="color:#F69D50;">gzip_http_version</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">1.1</span><span style="color:#ADBAC7;">; </span><span style="color:#768390;"># 指定压缩响应所需要的最低HTTP请求版本</span></span>
<span class="line"><span style="color:#F69D50;">gzip_vary</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">on</span><span style="color:#ADBAC7;">; </span><span style="color:#768390;"># 往头信息中添加压缩标识</span></span>
<span class="line"><span style="color:#F69D50;">gzip_disable</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">&quot;MSIE [1-6]\\.&quot;</span><span style="color:#ADBAC7;">; </span><span style="color:#768390;"># 对IE6以下的版本都不进行压缩</span></span>
<span class="line"><span style="color:#F69D50;">gzip_proxied</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">off；</span><span style="color:#ADBAC7;"> </span><span style="color:#768390;"># nginx作为反向代理压缩服务端返回数据的条件</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">gzip</span><span style="color:#24292E;"> </span><span style="color:#032F62;">on</span><span style="color:#24292E;">; </span><span style="color:#6A737D;"># 开启gzip功能</span></span>
<span class="line"><span style="color:#6F42C1;">gzip_types</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#24292E;">; </span><span style="color:#6A737D;"># 压缩源文件类型,根据具体的访问资源类型设定</span></span>
<span class="line"><span style="color:#6F42C1;">gzip_comp_level</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">6</span><span style="color:#24292E;">; </span><span style="color:#6A737D;"># gzip压缩级别</span></span>
<span class="line"><span style="color:#6F42C1;">gzip_min_length</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1024</span><span style="color:#24292E;">; </span><span style="color:#6A737D;"># 进行压缩响应页面的最小长度,content-length</span></span>
<span class="line"><span style="color:#6F42C1;">gzip_buffers</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">4</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">16</span><span style="color:#032F62;">K</span><span style="color:#24292E;">; </span><span style="color:#6A737D;"># 缓存空间大小</span></span>
<span class="line"><span style="color:#6F42C1;">gzip_http_version</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1.1</span><span style="color:#24292E;">; </span><span style="color:#6A737D;"># 指定压缩响应所需要的最低HTTP请求版本</span></span>
<span class="line"><span style="color:#6F42C1;">gzip_vary</span><span style="color:#24292E;"> </span><span style="color:#032F62;">on</span><span style="color:#24292E;">; </span><span style="color:#6A737D;"># 往头信息中添加压缩标识</span></span>
<span class="line"><span style="color:#6F42C1;">gzip_disable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;MSIE [1-6]\\.&quot;</span><span style="color:#24292E;">; </span><span style="color:#6A737D;"># 对IE6以下的版本都不进行压缩</span></span>
<span class="line"><span style="color:#6F42C1;">gzip_proxied</span><span style="color:#24292E;"> </span><span style="color:#032F62;">off；</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># nginx作为反向代理压缩服务端返回数据的条件</span></span></code></pre></div><h2 id="nginx的跨域问题解决" tabindex="-1">Nginx的跨域问题解决 <a class="header-anchor" href="#nginx的跨域问题解决" aria-label="Permalink to &quot;Nginx的跨域问题解决&quot;">​</a></h2><p>  使用add_header指令，该指令可以用来添加一些头信息</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 允许跨域访问的源地址信息，可以配置多个(多个用逗号分隔)，也可以使用 *代表所有源</span></span>
<span class="line"><span style="color:#F69D50;">Access-Control-Allow-Origin：*</span><span style="color:#ADBAC7;"> </span></span>
<span class="line"><span style="color:#768390;"># 允许跨域访问的请求方式，值可以为 GET POST PUT DELETE...,可以全部设置，也可以根据需要设置，多个用逗号分隔</span></span>
<span class="line"><span style="color:#F69D50;">Access-Control-Allow-Methods：GET</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 允许跨域访问的源地址信息，可以配置多个(多个用逗号分隔)，也可以使用 *代表所有源</span></span>
<span class="line"><span style="color:#6F42C1;">Access-Control-Allow-Origin：*</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6A737D;"># 允许跨域访问的请求方式，值可以为 GET POST PUT DELETE...,可以全部设置，也可以根据需要设置，多个用逗号分隔</span></span>
<span class="line"><span style="color:#6F42C1;">Access-Control-Allow-Methods：GET</span></span></code></pre></div><h2 id="nginx防盗链" tabindex="-1">Nginx防盗链 <a class="header-anchor" href="#nginx防盗链" aria-label="Permalink to &quot;Nginx防盗链&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># valid_referers:nginx会通就过查看referer自动和valid_referers后面的内容进行匹配，</span></span>
<span class="line"><span style="color:#768390;"># 如果匹配到了就将$invalid_referer变量置0，如果没有匹配到，则将$invalid_referer变量置为1，匹配的过程中不区分大小写。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F69D50;">valid_referers</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">none</span><span style="color:#F47067;">|</span><span style="color:#F69D50;">blocked</span><span style="color:#F47067;">|</span><span style="color:#F69D50;">server_names</span><span style="color:#F47067;">|</span><span style="color:#F69D50;">string...</span></span>
<span class="line"><span style="color:#768390;"># none: 如果Header中的Referer为空，允许访问</span></span>
<span class="line"><span style="color:#768390;"># blocked:在Header中的Referer不为空，但是该值被防火墙或代理进行伪装过，如不带&quot;http://&quot; 、&quot;https://&quot;等协议头的资源允许访问。</span></span>
<span class="line"><span style="color:#768390;"># server_names:指定具体的域名或者IP</span></span>
<span class="line"><span style="color:#768390;"># string: 可以支持正则表达式和*的字符串。如果是正则表达式，需要以 ~ 开头表示</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#768390;"># 对应配置：</span></span>
<span class="line"><span style="color:#F69D50;">location</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">~</span><span style="color:#6CB6FF;">*</span><span style="color:#F47067;">\\.</span><span style="color:#ADBAC7;">(</span><span style="color:#F69D50;">png</span><span style="color:#F47067;">|</span><span style="color:#F69D50;">jpg</span><span style="color:#F47067;">|</span><span style="color:#F69D50;">gif</span><span style="color:#ADBAC7;">)</span><span style="color:#96D0FF;">{</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">valid_referers</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">none</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">blocked</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">www.baidu.com</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">192.168</span><span style="color:#96D0FF;">.200.222</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">*</span><span style="color:#96D0FF;">.example.com</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">example.</span><span style="color:#6CB6FF;">*</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">www.example.org</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">~</span><span style="color:#F47067;">\\.</span><span style="color:#96D0FF;">google</span><span style="color:#F47067;">\\.</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">if</span><span style="color:#ADBAC7;"> ($invalid_referer){</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F47067;">return</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">403</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">root</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">/usr/local/nginx/html</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#ADBAC7;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># valid_referers:nginx会通就过查看referer自动和valid_referers后面的内容进行匹配，</span></span>
<span class="line"><span style="color:#6A737D;"># 如果匹配到了就将$invalid_referer变量置0，如果没有匹配到，则将$invalid_referer变量置为1，匹配的过程中不区分大小写。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">valid_referers</span><span style="color:#24292E;"> </span><span style="color:#032F62;">none</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">blocked</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">server_names</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">string...</span></span>
<span class="line"><span style="color:#6A737D;"># none: 如果Header中的Referer为空，允许访问</span></span>
<span class="line"><span style="color:#6A737D;"># blocked:在Header中的Referer不为空，但是该值被防火墙或代理进行伪装过，如不带&quot;http://&quot; 、&quot;https://&quot;等协议头的资源允许访问。</span></span>
<span class="line"><span style="color:#6A737D;"># server_names:指定具体的域名或者IP</span></span>
<span class="line"><span style="color:#6A737D;"># string: 可以支持正则表达式和*的字符串。如果是正则表达式，需要以 ~ 开头表示</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 对应配置：</span></span>
<span class="line"><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">~</span><span style="color:#005CC5;">*</span><span style="color:#005CC5;">\\.</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">png</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">jpg</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">gif</span><span style="color:#24292E;">)</span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">valid_referers</span><span style="color:#24292E;"> </span><span style="color:#032F62;">none</span><span style="color:#24292E;"> </span><span style="color:#032F62;">blocked</span><span style="color:#24292E;"> </span><span style="color:#032F62;">www.baidu.com</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.200.222</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#032F62;">.example.com</span><span style="color:#24292E;"> </span><span style="color:#032F62;">example.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#032F62;">www.example.org</span><span style="color:#24292E;"> </span><span style="color:#032F62;">~</span><span style="color:#005CC5;">\\.</span><span style="color:#032F62;">google</span><span style="color:#005CC5;">\\.</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($invalid_referer){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">403</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">root</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/nginx/html</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="rewrite规则" tabindex="-1">Rewrite规则 <a class="header-anchor" href="#rewrite规则" aria-label="Permalink to &quot;Rewrite规则&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># set：用来设置一个新的变量。</span></span>
<span class="line"><span style="color:#6CB6FF;">set</span><span style="color:#ADBAC7;"> $variable </span><span style="color:#96D0FF;">value</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># if：该指令用来支持条件判断，并根据条件判断结果选择不同的Nginx配置。</span></span>
<span class="line"><span style="color:#F47067;">if</span><span style="color:#ADBAC7;"> (</span><span style="color:#F69D50;">condition</span><span style="color:#ADBAC7;">){</span><span style="color:#6CB6FF;">...</span><span style="color:#ADBAC7;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># break：用于中断当前相同作用域中的其他Nginx配置。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># return：用于完成对请求的处理，直接向客户端返回响应状态代码。</span></span>
<span class="line"><span style="color:#F47067;">return</span><span style="color:#ADBAC7;"> code [text]; </span><span style="color:#768390;"># text:为返回给客户端的响应体内容，支持变量的使用</span></span>
<span class="line"><span style="color:#F47067;">return</span><span style="color:#ADBAC7;"> code URL; </span><span style="color:#768390;"># code:为返回给客户端的HTTP状态代理。可以返回的状态代码为0~999的任意HTTP状态代理</span></span>
<span class="line"><span style="color:#F47067;">return</span><span style="color:#ADBAC7;"> URL; </span><span style="color:#768390;"># URL:为返回给客户端的URL地址</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># rewrite：通过正则表达式的使用来改变URI。</span></span>
<span class="line"><span style="color:#F69D50;">rewrite</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">regex</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">replacement</span><span style="color:#ADBAC7;"> [flag];</span></span>
<span class="line"><span style="color:#F69D50;">regex:用来匹配URI的正则表达式</span></span>
<span class="line"><span style="color:#F69D50;">replacement:匹配成功后，用于替换URI中被截取内容的字符串。</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">如果该字符串是以</span><span style="color:#F69D50;">&quot;http://&quot;</span><span style="color:#F69D50;">或者</span><span style="color:#F69D50;">&quot;https://&quot;</span><span style="color:#F69D50;">开头的，则不会继续向下对URI进行其他处理，而是直接返回重写后的URI给客户端。</span></span>
<span class="line"><span style="color:#F69D50;">flag:用来设置rewrite对URI的处理行为，可选值有如下：</span></span>
<span class="line"><span style="color:#F69D50;">last</span></span>
<span class="line"><span style="color:#F47067;">break</span></span>
<span class="line"><span style="color:#F69D50;">redirect</span></span>
<span class="line"><span style="color:#F69D50;">permanent</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># set：用来设置一个新的变量。</span></span>
<span class="line"><span style="color:#005CC5;">set</span><span style="color:#24292E;"> $variable </span><span style="color:#032F62;">value</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># if：该指令用来支持条件判断，并根据条件判断结果选择不同的Nginx配置。</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">condition</span><span style="color:#24292E;">){</span><span style="color:#005CC5;">...</span><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># break：用于中断当前相同作用域中的其他Nginx配置。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># return：用于完成对请求的处理，直接向客户端返回响应状态代码。</span></span>
<span class="line"><span style="color:#D73A49;">return</span><span style="color:#24292E;"> code [text]; </span><span style="color:#6A737D;"># text:为返回给客户端的响应体内容，支持变量的使用</span></span>
<span class="line"><span style="color:#D73A49;">return</span><span style="color:#24292E;"> code URL; </span><span style="color:#6A737D;"># code:为返回给客户端的HTTP状态代理。可以返回的状态代码为0~999的任意HTTP状态代理</span></span>
<span class="line"><span style="color:#D73A49;">return</span><span style="color:#24292E;"> URL; </span><span style="color:#6A737D;"># URL:为返回给客户端的URL地址</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># rewrite：通过正则表达式的使用来改变URI。</span></span>
<span class="line"><span style="color:#6F42C1;">rewrite</span><span style="color:#24292E;"> </span><span style="color:#032F62;">regex</span><span style="color:#24292E;"> </span><span style="color:#032F62;">replacement</span><span style="color:#24292E;"> [flag];</span></span>
<span class="line"><span style="color:#6F42C1;">regex:用来匹配URI的正则表达式</span></span>
<span class="line"><span style="color:#6F42C1;">replacement:匹配成功后，用于替换URI中被截取内容的字符串。</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">如果该字符串是以</span><span style="color:#6F42C1;">&quot;http://&quot;</span><span style="color:#6F42C1;">或者</span><span style="color:#6F42C1;">&quot;https://&quot;</span><span style="color:#6F42C1;">开头的，则不会继续向下对URI进行其他处理，而是直接返回重写后的URI给客户端。</span></span>
<span class="line"><span style="color:#6F42C1;">flag:用来设置rewrite对URI的处理行为，可选值有如下：</span></span>
<span class="line"><span style="color:#6F42C1;">last</span></span>
<span class="line"><span style="color:#D73A49;">break</span></span>
<span class="line"><span style="color:#6F42C1;">redirect</span></span>
<span class="line"><span style="color:#6F42C1;">permanent</span></span></code></pre></div><h2 id="负载均衡-1" tabindex="-1">负载均衡 <a class="header-anchor" href="#负载均衡-1" aria-label="Permalink to &quot;负载均衡&quot;">​</a></h2><h3 id="upstream指令" tabindex="-1">upstream指令 <a class="header-anchor" href="#upstream指令" aria-label="Permalink to &quot;upstream指令&quot;">​</a></h3><p>  该指令是用来定义一组服务器，它们可以是监听不同端口的服务器，并且也可以是同时监听TCP和Unix socket的服务器。服务器可以指定不同的权重，默认为1。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 示例</span></span>
<span class="line"><span style="color:#F69D50;">upstream</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">backend{</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">server</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">192.168</span><span style="color:#96D0FF;">.200.146:9091</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">down</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">server</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">192.168</span><span style="color:#96D0FF;">.200.146:9092</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">backup</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">server</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">192.168</span><span style="color:#96D0FF;">.200.146:9093</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#ADBAC7;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 负载均衡状态：</span></span>
<span class="line"><span style="color:#768390;"># down：当前的server暂时不参与负载均衡</span></span>
<span class="line"><span style="color:#768390;"># backup：预留的备份服务器(当主服务器不可用时，将用来传递请求。)</span></span>
<span class="line"><span style="color:#768390;"># max_fails：允许请求失败的次数</span></span>
<span class="line"><span style="color:#768390;"># fail_timeout：经过max_fails失败后, 服务暂停时间</span></span>
<span class="line"><span style="color:#768390;"># max_conns：限制最大的接收连接数</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 示例</span></span>
<span class="line"><span style="color:#6F42C1;">upstream</span><span style="color:#24292E;"> </span><span style="color:#032F62;">backend{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.200.146:9091</span><span style="color:#24292E;"> </span><span style="color:#032F62;">down</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.200.146:9092</span><span style="color:#24292E;"> </span><span style="color:#032F62;">backup</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.200.146:9093</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 负载均衡状态：</span></span>
<span class="line"><span style="color:#6A737D;"># down：当前的server暂时不参与负载均衡</span></span>
<span class="line"><span style="color:#6A737D;"># backup：预留的备份服务器(当主服务器不可用时，将用来传递请求。)</span></span>
<span class="line"><span style="color:#6A737D;"># max_fails：允许请求失败的次数</span></span>
<span class="line"><span style="color:#6A737D;"># fail_timeout：经过max_fails失败后, 服务暂停时间</span></span>
<span class="line"><span style="color:#6A737D;"># max_conns：限制最大的接收连接数</span></span></code></pre></div><h3 id="server指令" tabindex="-1">server指令 <a class="header-anchor" href="#server指令" aria-label="Permalink to &quot;server指令&quot;">​</a></h3><p>  该指令用来指定后端服务器的名称和一些参数，可以使用域名、IP、端口或者unix socket</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#F69D50;">server</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">{</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">listen</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">8083</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">server_name</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">localhost</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">location</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">/{</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">proxy_pass</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">http://backend</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"><span style="color:#ADBAC7;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">8083</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">server_name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">localhost</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_pass</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://backend</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="负载均衡策略" tabindex="-1">负载均衡策略 <a class="header-anchor" href="#负载均衡策略" aria-label="Permalink to &quot;负载均衡策略&quot;">​</a></h3><ul><li>轮询：默认方式（每个请求会按时间顺序逐个分配到不同的后端服务器。轮询不需要额外的配置）</li><li>weight：权重方式，加权轮询（weight=number:用来设置服务器的权重，默认为1，权重数据越大，被分配到请求的几率越大）</li><li>ip_hash：依据ip分配方式（将某个客户端IP的请求通过哈希算法定位到同一台后端服务器上，该方式无法保证后端服务器的负载均衡）</li><li>least_conn：依据最少连接方式（最少连接，把请求转发给连接数较少的后端服务器；该方式适合请求处理时间长短不一造成服务器过载的情况）</li><li>url_hash：依据URL分配方式（每个url定向到同一个后端服务器，要配合缓存命中来使用）</li><li>fair：依据响应时间方式（根据页面大小、加载时间长短智能的进行负载均衡；fair属于第三方模块实现的负载均衡）</li></ul><h2 id="nginx高可用-keepalived" tabindex="-1">Nginx高可用（Keepalived） <a class="header-anchor" href="#nginx高可用-keepalived" aria-label="Permalink to &quot;Nginx高可用（Keepalived）&quot;">​</a></h2><p>  Keepalived 软件由 C 编写的，最初是专为 LVS负载均衡软件设计的，Keepalived 软件主要是通过 VRRP 协议实现高可用功能。</p><ul><li>VRRP（Virtual Route Redundancy Protocol）协议，翻译过来为虚拟路由冗余协议。VRRP协议将两台或多台路由器设备虚拟成一个设备，对外提供虚拟路由器IP,而在路由器组内部，如果实际拥有这个对外IP的路由器工作正常的话就是MASTER,MASTER实现针对虚拟路由器IP的各种网络功能。其他设备不拥有该虚拟IP，状态为BACKUP,处了接收MASTER的VRRP状态通告信息以外，不执行对外的网络功能。当主机失效时，BACKUP将接管原先MASTER的网络功能。 <ul><li>选择协议：VRRP可以把一个虚拟路由器的责任动态分配到局域网上的 VRRP 路由器中的一台。其中的虚拟路由即Virtual路由是由VRRP路由群组创建的一个不真实存在的路由，这个虚拟路由也是有对应的IP地址。而且VRRP路由1和VRRP路由2之间会有竞争选择，通过选择会产生一个Master路由和一个Backup路由。</li><li>路由容错协议：Master路由和Backup路由之间会有一个心跳检测，Master会定时告知Backup自己的状态，如果在指定的时间内，Backup没有接收到这个通知内容，Backup就会替代Master成为新的Master。Master路由有一个特权就是虚拟路由和后端服务器都是通过Master进行数据传递交互的，而备份节点则会直接丢弃这些请求和数据，不做处理，只是去监听Master的状态 <img src="`+h+'" alt="KeepAlived"></li></ul></li></ul>',57);function m(s,v,b,_,f,k){const r=l("Badge"),t=i,y=l("ClientOnly");return p(),A("div",null,[c("h1",u,[o("Nginx "),e(r,{text:"持续更新",type:"warning"}),o(),x]),e(y,null,{default:C(()=>{var n,a;return[(((n=s.$frontmatter)==null?void 0:n.aside)??!0)&&(((a=s.$frontmatter)==null?void 0:a.showArticleMetadata)??!0)?(p(),g(t,{key:0,article:s.$frontmatter},null,8,["article"])):d("",!0)]}),_:1}),E])}const q=F(B,[["render",m]]);export{w as __pageData,q as default};
