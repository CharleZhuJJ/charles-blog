import{_ as c}from"./chunks/ArticleMetadata.8b6b367a.js";import{_ as t,H as r,o as l,c as y,J as i,E as A,C as p,a as F,V as D,D as C,G as d}from"./chunks/framework.981adca9.js";const B="/charles-blog/assets/DirectoryStructure.da4247aa.png",q=JSON.parse('{"title":"Linux","description":"","frontmatter":{"title":"Linux","author":"Charles Chu","date":"2022/03/25","isOriginal":true},"headers":[],"relativePath":"md/environment/Linux.md","filePath":"md/environment/Linux.md","lastUpdated":1691825438000}'),E={name:"md/environment/Linux.md"},h=p("h1",{id:"linux",tabindex:"-1"},[F("Linux "),p("a",{class:"header-anchor",href:"#linux","aria-label":'Permalink to "Linux"'},"​")],-1),u=D('<h2 id="linux目录结构" tabindex="-1">Linux目录结构 <a class="header-anchor" href="#linux目录结构" aria-label="Permalink to &quot;Linux目录结构&quot;">​</a></h2><p>/bin (/usr/bin 、 /usr/local/bin)： 是Binary的缩写, 这个目录存放着最经常使用的命令</p><p>/sbin (/usr/sbin 、 /usr/local/sbin)： 就是Super User的意思，这里存放的是系统管理员使用的系统管理程序。</p><p>/home： 存放普通用户的主目录，在Linux中每个用户都有一个自己的目录，一般该目录名是以用户的账号命名的。</p><p>/root： 该目录为系统管理员，也称作超级权限者的用户主目录。</p><p>/lib： 系统开机所需要最基本的动态连接共享库，其作用类似于Windows里的DLL文件。几乎所有的应用程序都需要用到这些共享库。</p><p>/etc： 所有的系统管理所需要的配置文件和子目录 my.conf /usr：这是一个非常重要的目录，用户的很多应用程序和文件都放在这个目录下，类似与windows下的program files目录。</p><p>/boot： 存放的是启动Linux时使用的一些核心文件，包括一些连接文件以及镜像文件</p><p>/proc： 这个目录是一个虚拟的目录，它是系统内存的映射，访问这个目录来获取系统信息</p><p>/srv： service缩写，该目录存放一些服务启动之后需要提取的数据。</p><p>/sys： 该目录下安装了2.6内核中新出现的一个文件系统</p><p>/tmp： 这个目录是用来存放一些临时文件的。</p><p>/dev： 类似于windows的设备管理器，把所有的硬件用文件的形式存储。</p><p>/media： linux系统会自动识别一些设备，例如U盘、光驱等等，当识别后，linux会把识别的设备挂载到这个目录下。</p><p>/mnt ： 系统提供该目录是为了让用户临时挂载别的文件系统的，我们可以将外部的存储挂载在/mnt/上，然后进入该目录就可以查看里的内容了。 d:/myshare</p><p>/opt： 这是给主机额外安装软件所摆放的目录。如安装ORACLE数据库就可放到该目录下。默认为空。</p><p>/usr/local ： 这是另一个给主机额外安装软件所安装的目录。一般是通过编译源码方式安装的程序</p><p>/var： 这个目录中存放着在不断扩充着的东西，习惯将经常被修改的目录放在这个目录下。包括各种日志文件。</p><p><img src="'+B+`" alt="DirectoryStructure"></p><h2 id="相关命令" tabindex="-1">相关命令 <a class="header-anchor" href="#相关命令" aria-label="Permalink to &quot;相关命令&quot;">​</a></h2><h3 id="系统级命令" tabindex="-1">系统级命令 <a class="header-anchor" href="#系统级命令" aria-label="Permalink to &quot;系统级命令&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 关机&amp;重启命令：</span></span>
<span class="line"><span style="color:#F69D50;">shutdown：</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">shutdown</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-h</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">now</span><span style="color:#ADBAC7;"> </span><span style="color:#768390;">#(表示立即关机)</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">shutdown</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-h</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">1</span><span style="color:#ADBAC7;">  </span><span style="color:#768390;">#(表示 1 分钟后关机)</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">shutdown</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">–h</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">20</span><span style="color:#96D0FF;">:25</span><span style="color:#ADBAC7;"> </span><span style="color:#768390;">#(系统会在今天20:25关机)</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">shutdown</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-r</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">now</span><span style="color:#ADBAC7;"> </span><span style="color:#768390;">#(立即重启)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F69D50;">halt</span></span>
<span class="line"><span style="color:#768390;"># 就是直接使用，效果等价于关机，等同于shutdown –h now 和 poweroff</span></span>
<span class="line"><span style="color:#F69D50;">reboot</span></span>
<span class="line"><span style="color:#768390;"># 就是重启系统。等同于 shutdown –r now</span></span>
<span class="line"><span style="color:#F69D50;">sync</span></span>
<span class="line"><span style="color:#768390;"># 把内存的数据同步到磁盘</span></span>
<span class="line"><span style="color:#768390;"># ！！！不管是重启系统还是关闭系统，首先要运行sync命令，把内存中的数据写到磁盘中！！！</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 用户登录和注销</span></span>
<span class="line"><span style="color:#768390;"># 1、登录时尽量少用 root 帐号登录，因为它是系统管理员，最大的权限，避免操作失误。</span></span>
<span class="line"><span style="color:#768390;"># 2、利用普通用户登录，登录后再用&quot;su - 用户名&quot;命令来切换成系统管理员身份.</span></span>
<span class="line"><span style="color:#768390;"># 3、在提示符下输入 logout 即可注销用户</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 关机&amp;重启命令：</span></span>
<span class="line"><span style="color:#6F42C1;">shutdown：</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">shutdown</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-h</span><span style="color:#24292E;"> </span><span style="color:#032F62;">now</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#(表示立即关机)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">shutdown</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-h</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">  </span><span style="color:#6A737D;">#(表示 1 分钟后关机)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">shutdown</span><span style="color:#24292E;"> </span><span style="color:#032F62;">–h</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">20</span><span style="color:#032F62;">:25</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#(系统会在今天20:25关机)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">shutdown</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-r</span><span style="color:#24292E;"> </span><span style="color:#032F62;">now</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#(立即重启)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">halt</span></span>
<span class="line"><span style="color:#6A737D;"># 就是直接使用，效果等价于关机，等同于shutdown –h now 和 poweroff</span></span>
<span class="line"><span style="color:#6F42C1;">reboot</span></span>
<span class="line"><span style="color:#6A737D;"># 就是重启系统。等同于 shutdown –r now</span></span>
<span class="line"><span style="color:#6F42C1;">sync</span></span>
<span class="line"><span style="color:#6A737D;"># 把内存的数据同步到磁盘</span></span>
<span class="line"><span style="color:#6A737D;"># ！！！不管是重启系统还是关闭系统，首先要运行sync命令，把内存中的数据写到磁盘中！！！</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 用户登录和注销</span></span>
<span class="line"><span style="color:#6A737D;"># 1、登录时尽量少用 root 帐号登录，因为它是系统管理员，最大的权限，避免操作失误。</span></span>
<span class="line"><span style="color:#6A737D;"># 2、利用普通用户登录，登录后再用&quot;su - 用户名&quot;命令来切换成系统管理员身份.</span></span>
<span class="line"><span style="color:#6A737D;"># 3、在提示符下输入 logout 即可注销用户</span></span></code></pre></div><h3 id="用户-组管理" tabindex="-1">用户，组管理 <a class="header-anchor" href="#用户-组管理" aria-label="Permalink to &quot;用户，组管理&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 添加用户</span></span>
<span class="line"><span style="color:#F69D50;">useradd</span><span style="color:#ADBAC7;"> [选项] [用户名]</span></span>
<span class="line"><span style="color:#768390;"># 1.当创建用户成功后，会自动的创建和用户同名的家目录</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">useradd</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">xm</span></span>
<span class="line"><span style="color:#768390;"># 2.也可以通过 useradd -d [指定目录] [新的用户名]，给新创建的用户指定家目录</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">useradd</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-d</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">/home/dog</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">xm</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#768390;"># 给用户指定或者修改密码</span></span>
<span class="line"><span style="color:#F69D50;">passwd</span><span style="color:#ADBAC7;"> [用户名]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 删除用户</span></span>
<span class="line"><span style="color:#F69D50;">userdel</span><span style="color:#ADBAC7;"> [用户名]</span></span>
<span class="line"><span style="color:#768390;"># 1.删除用户 xm，但是要保留家目录</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">userdel</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">xm</span></span>
<span class="line"><span style="color:#768390;"># 2.删除用户 xh 以及用户主目录</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">userdel</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-r</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">xm</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 查询用户信息</span></span>
<span class="line"><span style="color:#F69D50;">id</span><span style="color:#ADBAC7;"> [用户名]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 切换用户: 如果当前用户的权限不够，可以通过 su - 指令，切换到高权限用户，比如 root</span></span>
<span class="line"><span style="color:#F69D50;">su</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">–</span><span style="color:#ADBAC7;"> [切换用户名]</span></span>
<span class="line"><span style="color:#768390;"># 1. 从权限高的用户切换到权限低的用户，不需要输入密码，反之需要。</span></span>
<span class="line"><span style="color:#768390;"># 2. 当需要返回到原来用户时，使用 exit 指令</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 查看当前用户/登录用户</span></span>
<span class="line"><span style="color:#F69D50;">whoami</span><span style="color:#ADBAC7;"> </span></span>
<span class="line"><span style="color:#F69D50;">who</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">am</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">I</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 查询用户信息</span></span>
<span class="line"><span style="color:#F69D50;">id</span><span style="color:#ADBAC7;"> [用户名]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F69D50;">----------------------------------------</span></span>
<span class="line"><span style="color:#768390;"># 用户组：类似于角色，系统可以对有共性的多个用户进行统一的管理</span></span>
<span class="line"><span style="color:#768390;"># 增加组</span></span>
<span class="line"><span style="color:#F69D50;">groupadd</span><span style="color:#ADBAC7;"> [组名]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 删除组</span></span>
<span class="line"><span style="color:#F69D50;">groupdel</span><span style="color:#ADBAC7;"> [组名]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F69D50;">----------------------------------------</span></span>
<span class="line"><span style="color:#768390;"># 增加用户时直接加上组</span></span>
<span class="line"><span style="color:#F69D50;">useradd</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-g</span><span style="color:#ADBAC7;"> [用户组] [用户名]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 修改用户的组</span></span>
<span class="line"><span style="color:#F69D50;">usermod</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-g</span><span style="color:#ADBAC7;"> [用户组] [用户名]</span></span>
<span class="line"><span style="color:#F69D50;">usermod</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">–d</span><span style="color:#ADBAC7;"> [目录名] [用户名] 改变该用户登陆的初始目录</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 修改文件所有者</span></span>
<span class="line"><span style="color:#F69D50;">chown</span><span style="color:#ADBAC7;"> [用户名] [文件名]</span></span>
<span class="line"><span style="color:#768390;"># 修改用户的所有者和所有组</span></span>
<span class="line"><span style="color:#F69D50;">chown</span><span style="color:#ADBAC7;"> [用户名:组名] [文件名]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 修改文件所在的组</span></span>
<span class="line"><span style="color:#F69D50;">chgrp</span><span style="color:#ADBAC7;"> [组名] [文件名]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 修改文件或者目录的权限</span></span>
<span class="line"><span style="color:#768390;"># 第一种方式：+ 、-、= 变更权限</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">u:所有者</span><span style="color:#ADBAC7;">  </span><span style="color:#96D0FF;">g:所有组</span><span style="color:#ADBAC7;">  </span><span style="color:#96D0FF;">o:其他人</span><span style="color:#ADBAC7;">  </span><span style="color:#96D0FF;">a:所有人</span><span style="color:#ADBAC7;">(</span><span style="color:#F69D50;">u、g、o</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">的总和</span><span style="color:#ADBAC7;">)</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#768390;"># 示例：</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">1.</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">chmod</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">u=rwx,g=rx,o=x</span><span style="color:#ADBAC7;"> [文件目录名]</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">2.</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">chmod</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">o+w</span><span style="color:#ADBAC7;"> [文件目录名]</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">3.</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">chmod</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">a-x</span><span style="color:#ADBAC7;"> [文件目录名]</span></span>
<span class="line"><span style="color:#768390;">#  第二种方式：通过数字变更权限</span></span>
<span class="line"><span style="color:#ADBAC7;">    r</span><span style="color:#F47067;">=</span><span style="color:#6CB6FF;">4</span><span style="color:#ADBAC7;">  w</span><span style="color:#F47067;">=</span><span style="color:#6CB6FF;">2</span><span style="color:#ADBAC7;">  x</span><span style="color:#F47067;">=</span><span style="color:#6CB6FF;">1</span><span style="color:#ADBAC7;">  rwx</span><span style="color:#F47067;">=</span><span style="color:#6CB6FF;">4</span><span style="color:#96D0FF;">+2+1=</span><span style="color:#6CB6FF;">7</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#768390;"># 示例：</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">chmod</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">751</span><span style="color:#ADBAC7;">  [文件目录名]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 添加用户</span></span>
<span class="line"><span style="color:#6F42C1;">useradd</span><span style="color:#24292E;"> [选项] [用户名]</span></span>
<span class="line"><span style="color:#6A737D;"># 1.当创建用户成功后，会自动的创建和用户同名的家目录</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">useradd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">xm</span></span>
<span class="line"><span style="color:#6A737D;"># 2.也可以通过 useradd -d [指定目录] [新的用户名]，给新创建的用户指定家目录</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">useradd</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/home/dog</span><span style="color:#24292E;"> </span><span style="color:#032F62;">xm</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 给用户指定或者修改密码</span></span>
<span class="line"><span style="color:#6F42C1;">passwd</span><span style="color:#24292E;"> [用户名]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 删除用户</span></span>
<span class="line"><span style="color:#6F42C1;">userdel</span><span style="color:#24292E;"> [用户名]</span></span>
<span class="line"><span style="color:#6A737D;"># 1.删除用户 xm，但是要保留家目录</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">userdel</span><span style="color:#24292E;"> </span><span style="color:#032F62;">xm</span></span>
<span class="line"><span style="color:#6A737D;"># 2.删除用户 xh 以及用户主目录</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">userdel</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-r</span><span style="color:#24292E;"> </span><span style="color:#032F62;">xm</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查询用户信息</span></span>
<span class="line"><span style="color:#6F42C1;">id</span><span style="color:#24292E;"> [用户名]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 切换用户: 如果当前用户的权限不够，可以通过 su - 指令，切换到高权限用户，比如 root</span></span>
<span class="line"><span style="color:#6F42C1;">su</span><span style="color:#24292E;"> </span><span style="color:#032F62;">–</span><span style="color:#24292E;"> [切换用户名]</span></span>
<span class="line"><span style="color:#6A737D;"># 1. 从权限高的用户切换到权限低的用户，不需要输入密码，反之需要。</span></span>
<span class="line"><span style="color:#6A737D;"># 2. 当需要返回到原来用户时，使用 exit 指令</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查看当前用户/登录用户</span></span>
<span class="line"><span style="color:#6F42C1;">whoami</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6F42C1;">who</span><span style="color:#24292E;"> </span><span style="color:#032F62;">am</span><span style="color:#24292E;"> </span><span style="color:#032F62;">I</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查询用户信息</span></span>
<span class="line"><span style="color:#6F42C1;">id</span><span style="color:#24292E;"> [用户名]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">----------------------------------------</span></span>
<span class="line"><span style="color:#6A737D;"># 用户组：类似于角色，系统可以对有共性的多个用户进行统一的管理</span></span>
<span class="line"><span style="color:#6A737D;"># 增加组</span></span>
<span class="line"><span style="color:#6F42C1;">groupadd</span><span style="color:#24292E;"> [组名]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 删除组</span></span>
<span class="line"><span style="color:#6F42C1;">groupdel</span><span style="color:#24292E;"> [组名]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">----------------------------------------</span></span>
<span class="line"><span style="color:#6A737D;"># 增加用户时直接加上组</span></span>
<span class="line"><span style="color:#6F42C1;">useradd</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-g</span><span style="color:#24292E;"> [用户组] [用户名]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 修改用户的组</span></span>
<span class="line"><span style="color:#6F42C1;">usermod</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-g</span><span style="color:#24292E;"> [用户组] [用户名]</span></span>
<span class="line"><span style="color:#6F42C1;">usermod</span><span style="color:#24292E;"> </span><span style="color:#032F62;">–d</span><span style="color:#24292E;"> [目录名] [用户名] 改变该用户登陆的初始目录</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 修改文件所有者</span></span>
<span class="line"><span style="color:#6F42C1;">chown</span><span style="color:#24292E;"> [用户名] [文件名]</span></span>
<span class="line"><span style="color:#6A737D;"># 修改用户的所有者和所有组</span></span>
<span class="line"><span style="color:#6F42C1;">chown</span><span style="color:#24292E;"> [用户名:组名] [文件名]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 修改文件所在的组</span></span>
<span class="line"><span style="color:#6F42C1;">chgrp</span><span style="color:#24292E;"> [组名] [文件名]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 修改文件或者目录的权限</span></span>
<span class="line"><span style="color:#6A737D;"># 第一种方式：+ 、-、= 变更权限</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">u:所有者</span><span style="color:#24292E;">  </span><span style="color:#032F62;">g:所有组</span><span style="color:#24292E;">  </span><span style="color:#032F62;">o:其他人</span><span style="color:#24292E;">  </span><span style="color:#032F62;">a:所有人</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">u、g、o</span><span style="color:#24292E;"> </span><span style="color:#032F62;">的总和</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 示例：</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">1.</span><span style="color:#24292E;"> </span><span style="color:#032F62;">chmod</span><span style="color:#24292E;"> </span><span style="color:#032F62;">u=rwx,g=rx,o=x</span><span style="color:#24292E;"> [文件目录名]</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">2.</span><span style="color:#24292E;"> </span><span style="color:#032F62;">chmod</span><span style="color:#24292E;"> </span><span style="color:#032F62;">o+w</span><span style="color:#24292E;"> [文件目录名]</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">3.</span><span style="color:#24292E;"> </span><span style="color:#032F62;">chmod</span><span style="color:#24292E;"> </span><span style="color:#032F62;">a-x</span><span style="color:#24292E;"> [文件目录名]</span></span>
<span class="line"><span style="color:#6A737D;">#  第二种方式：通过数字变更权限</span></span>
<span class="line"><span style="color:#24292E;">    r</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">  w</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">  x</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">  rwx</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">4</span><span style="color:#032F62;">+2+1=</span><span style="color:#005CC5;">7</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 示例：</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">chmod</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">751</span><span style="color:#24292E;">  [文件目录名]</span></span></code></pre></div><h3 id="文件和目录操作命令" tabindex="-1">文件和目录操作命令 <a class="header-anchor" href="#文件和目录操作命令" aria-label="Permalink to &quot;文件和目录操作命令&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed has-diff vp-code-dark"><code><span class="line"><span style="color:#768390;"># 示当前工作目录的绝对路径：pwd，全拼print working directory</span></span>
<span class="line"><span style="color:#6CB6FF;">pwd</span><span style="color:#ADBAC7;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 列出目录的内容及其内容属性信息：ls，全拼list</span></span>
<span class="line"><span style="color:#F69D50;">ls</span><span style="color:#ADBAC7;"> [选项] [目录或是文件]</span></span>
<span class="line"><span style="color:#768390;"># 常用选项</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-a：显示当前目录所有的文件和目录，包括隐藏的。</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-l：以列表的方式显示信息</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#768390;"># 切换到指定目录：cd，全拼change directory</span></span>
<span class="line"><span style="color:#6CB6FF;">cd</span><span style="color:#ADBAC7;"> [参数] </span></span>
<span class="line"><span style="color:#768390;"># 1.回到自己的家目录</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#6CB6FF;">cd</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">~</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">或者</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">cd</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">：</span></span>
<span class="line"><span style="color:#768390;"># 2. 回到当前目录的上一级目录</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#6CB6FF;">cd</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">..</span><span style="color:#ADBAC7;"> </span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#768390;"># 用于创建目录(make directory)</span></span>
<span class="line"><span style="color:#F69D50;">mkdir</span><span style="color:#ADBAC7;"> [选项] [要创建的目录]</span></span>
<span class="line"><span style="color:#768390;"># 常用选项：</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-p</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">：创建多级目录</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 删除空目录：rmdir，全拼remove empty directories</span></span>
<span class="line"><span style="color:#F69D50;">rmdir</span><span style="color:#ADBAC7;"> [选项] [要删除的空目录]</span></span>
<span class="line"><span style="color:#768390;"># tips：</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#768390;"># rmdir 删除的是空目录，如果目录下有内容时无法删除的。</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#768390;"># 如果需要删除非空目录，需要使用 rm -rf 要删除的目录</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#768390;"># 创建空文件</span></span>
<span class="line"><span style="color:#F69D50;">touch</span><span style="color:#ADBAC7;"> [文件名称]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 拷贝文件到指定目录：cp，全拼copy</span></span>
<span class="line"><span style="color:#F69D50;">cp</span><span style="color:#ADBAC7;"> [选项] [source] [dest]</span></span>
<span class="line"><span style="color:#768390;"># 常用选项</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-r</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">：递归复制整个文件夹</span></span>
<span class="line"><span style="color:#768390;"># 使用细节:</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">强制覆盖不提示的方法：\\cp</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#768390;"># 指令移除【删除】文件或目录：rm，全拼remove</span></span>
<span class="line"><span style="color:#F69D50;">rm</span><span style="color:#ADBAC7;"> [选项] [要删除的文件或目录]</span></span>
<span class="line"><span style="color:#768390;"># 常用选项</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-r</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">：递归删除整个文件夹</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-f</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">：强制删除不提示</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-i</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">：互动，删除询问是否删除</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 移动文件与目录或重命名</span></span>
<span class="line"><span style="color:#F69D50;">mv</span><span style="color:#ADBAC7;"> [oldNameFile] [newNameFile] (</span><span style="color:#F69D50;">功能描述：重命名</span><span style="color:#ADBAC7;">)</span></span>
<span class="line"><span style="color:#F69D50;">mv</span><span style="color:#ADBAC7;"> [/movefile] [/targetFolder] (</span><span style="color:#F69D50;">功能描述：移动文件</span><span style="color:#ADBAC7;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 重命名文件</span></span>
<span class="line"><span style="color:#F69D50;">rename</span><span style="color:#ADBAC7;"> [oldNameFile] [newNameFile] </span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 查看文件内容，是以只读的方式打开。</span></span>
<span class="line"><span style="color:#F69D50;">cat</span><span style="color:#ADBAC7;"> [选项] [要查看的文件]</span></span>
<span class="line"><span style="color:#768390;"># 常用选项</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-n</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">：显示行号</span></span>
<span class="line"><span style="color:#768390;"># tips:</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">cat</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">只能浏览文件，而不能修改文件，为了浏览方便，一般会带上管道命令</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">|</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">more</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">cat</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">文件名</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">|</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">more</span><span style="color:#ADBAC7;"> [分页浏览]</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#768390;"># 文本过滤器more</span></span>
<span class="line"><span style="color:#F69D50;">more</span><span style="color:#ADBAC7;"> [要查看的文件]</span></span>
<span class="line"><span style="color:#768390;"># more指令中内置了若干快捷键:</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">空白键</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">：向下翻一页</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">Enter</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">：向下翻一行</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">q</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">：退出more模式，不再显示该文件内容</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">Ctrl</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">+</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">F</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">：向下滚动一屏</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">Ctrl</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">+</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">B</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">：返回上一屏</span></span>
<span class="line"><span style="color:#ADBAC7;">    = </span><span style="color:#96D0FF;">：</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">输出当前行的行号</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">:f</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">:</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">输出文件名和当前行的行号</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 分屏查看文件内容：与 more 指令类似，但是比 more 指令更加强大</span></span>
<span class="line"><span style="color:#F69D50;">less</span><span style="color:#ADBAC7;"> [要查看的文件]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># &gt; 和 &gt;&gt; </span></span>
<span class="line"><span style="color:#F47067;">&gt;</span><span style="color:#ADBAC7;"> 指令：输出重定向 </span><span style="color:#6CB6FF;">:</span><span style="color:#ADBAC7;"> 会将原来的文件的内容覆盖</span></span>
<span class="line"><span style="color:#F47067;">&gt;&gt;</span><span style="color:#ADBAC7;"> 指令：不会覆盖原来文件的内容，而是追加到文件的尾部。</span></span>
<span class="line"><span style="color:#768390;"># 例子：</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">ls</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-l</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">&gt;</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">a.txt</span><span style="color:#ADBAC7;">  (将 </span><span style="color:#96D0FF;">ls</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-l</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">的显示的内容覆盖写入到</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">a.txt</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">文件，如果该文件不存在，就创建该文件</span><span style="color:#ADBAC7;">)</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">ls</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-al</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">&gt;&gt;</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">a.txt（列表的内容追加到文件</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">aa.txt</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">的末尾）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 输出内容到控制台</span></span>
<span class="line"><span style="color:#6CB6FF;">echo</span><span style="color:#ADBAC7;"> [选项] [输出内容]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 显示文件的开头部分内容，默认显示前10行数据</span></span>
<span class="line"><span style="color:#F69D50;">head</span><span style="color:#ADBAC7;"> [文件] (</span><span style="color:#F69D50;">查看文件头</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">10</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">行内容</span><span style="color:#ADBAC7;">)</span></span>
<span class="line"><span style="color:#F69D50;">head</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-n</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">5</span><span style="color:#ADBAC7;"> [文件] (</span><span style="color:#F69D50;">查看文件头</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">5</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">行内容，5</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">可以是任意行数</span><span style="color:#ADBAC7;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 输出文件中尾部的内容，默认情况下 tail 指令显示文件的后 10 行内容</span></span>
<span class="line"><span style="color:#F69D50;">tail</span><span style="color:#ADBAC7;"> [文件]（查看文件后 10 行内容）</span></span>
<span class="line"><span style="color:#F69D50;">tail</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-n</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">5</span><span style="color:#ADBAC7;"> [文件]（查看文件后 5 行内容，5 可以是任意行数）</span></span>
<span class="line"><span style="color:#F69D50;">tail</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-f</span><span style="color:#ADBAC7;"> [文件]（实时追踪该文档的所有更新，工作经常使用）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 软链接也叫符号链接，类似于 windows 里的快捷方式，主要存放了链接其他文件的路径</span></span>
<span class="line"><span style="color:#F69D50;">ln</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-s</span><span style="color:#ADBAC7;"> [原文件或目录] [软链接名] （给原文件创建一个软链接）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 查看已经执行过历史命令,也可以执行历史指令</span></span>
<span class="line"><span style="color:#6CB6FF;">history</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">（查看已经执行过历史命令）</span></span>
<span class="line"><span style="color:#6CB6FF;">history</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">10</span><span style="color:#ADBAC7;"> (显示最近使用过的 </span><span style="color:#6CB6FF;">10</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">个指令</span><span style="color:#ADBAC7;">)</span></span>
<span class="line"><span style="color:#F47067;">!</span><span style="color:#F69D50;">5</span><span style="color:#ADBAC7;"> (执行历史编号为 </span><span style="color:#6CB6FF;">5</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">的指令</span><span style="color:#ADBAC7;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 功能是以树形结构显示目录下的内容</span></span>
<span class="line"><span style="color:#F69D50;">tree</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F69D50;">--------------------------------------------------------</span></span>
<span class="line"><span style="color:#768390;"># cat的反向拼写，因此命令的功能为反向显示文件内容。</span></span>
<span class="line"><span style="color:#F69D50;">tac</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 将文件的每一行按指定分隔符分割并输出。</span></span>
<span class="line"><span style="color:#F69D50;">cut</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 分割文件为不同的小片段。</span></span>
<span class="line"><span style="color:#F69D50;">split</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 按行合并文件内容。</span></span>
<span class="line"><span style="color:#F69D50;">paste</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 对文件的文本内容排序。</span></span>
<span class="line"><span style="color:#F69D50;">sort</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 去除重复行。</span></span>
<span class="line"><span style="color:#F69D50;">uniq</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 统计文件的行数、单词数或字节数。</span></span>
<span class="line"><span style="color:#F69D50;">wc</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 转换文件的编码格式。</span></span>
<span class="line"><span style="color:#F69D50;">iconv</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 将DOS格式文件转换成UNIX格式。</span></span>
<span class="line"><span style="color:#F69D50;">dos2unix</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 全拼difference，比较文件的差异，常用于文本文件。</span></span>
<span class="line"><span style="color:#F69D50;">diff</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 命令行可视化文件比较工具，常用于文本文件。</span></span>
<span class="line"><span style="color:#F69D50;">vimdiff</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 反向输出文件内容。</span></span>
<span class="line"><span style="color:#F69D50;">rev</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 过滤字符串</span></span>
<span class="line"><span style="color:#F69D50;">grep/egrep</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 按两个文件的相同字段合并。</span></span>
<span class="line"><span style="color:#F69D50;">join</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 替换或删除字符。</span></span>
<span class="line"><span style="color:#F69D50;">tr</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 示当前工作目录的绝对路径：pwd，全拼print working directory</span></span>
<span class="line"><span style="color:#005CC5;">pwd</span><span style="color:#24292E;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 列出目录的内容及其内容属性信息：ls，全拼list</span></span>
<span class="line"><span style="color:#6F42C1;">ls</span><span style="color:#24292E;"> [选项] [目录或是文件]</span></span>
<span class="line"><span style="color:#6A737D;"># 常用选项</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-a：显示当前目录所有的文件和目录，包括隐藏的。</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-l：以列表的方式显示信息</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 切换到指定目录：cd，全拼change directory</span></span>
<span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> [参数] </span></span>
<span class="line"><span style="color:#6A737D;"># 1.回到自己的家目录</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">~</span><span style="color:#24292E;"> </span><span style="color:#032F62;">或者</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">：</span></span>
<span class="line"><span style="color:#6A737D;"># 2. 回到当前目录的上一级目录</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">..</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 用于创建目录(make directory)</span></span>
<span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> [选项] [要创建的目录]</span></span>
<span class="line"><span style="color:#6A737D;"># 常用选项：</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">：创建多级目录</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 删除空目录：rmdir，全拼remove empty directories</span></span>
<span class="line"><span style="color:#6F42C1;">rmdir</span><span style="color:#24292E;"> [选项] [要删除的空目录]</span></span>
<span class="line"><span style="color:#6A737D;"># tips：</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># rmdir 删除的是空目录，如果目录下有内容时无法删除的。</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 如果需要删除非空目录，需要使用 rm -rf 要删除的目录</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 创建空文件</span></span>
<span class="line"><span style="color:#6F42C1;">touch</span><span style="color:#24292E;"> [文件名称]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 拷贝文件到指定目录：cp，全拼copy</span></span>
<span class="line"><span style="color:#6F42C1;">cp</span><span style="color:#24292E;"> [选项] [source] [dest]</span></span>
<span class="line"><span style="color:#6A737D;"># 常用选项</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-r</span><span style="color:#24292E;"> </span><span style="color:#032F62;">：递归复制整个文件夹</span></span>
<span class="line"><span style="color:#6A737D;"># 使用细节:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">强制覆盖不提示的方法：\\cp</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 指令移除【删除】文件或目录：rm，全拼remove</span></span>
<span class="line"><span style="color:#6F42C1;">rm</span><span style="color:#24292E;"> [选项] [要删除的文件或目录]</span></span>
<span class="line"><span style="color:#6A737D;"># 常用选项</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-r</span><span style="color:#24292E;"> </span><span style="color:#032F62;">：递归删除整个文件夹</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">：强制删除不提示</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">：互动，删除询问是否删除</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 移动文件与目录或重命名</span></span>
<span class="line"><span style="color:#6F42C1;">mv</span><span style="color:#24292E;"> [oldNameFile] [newNameFile] (</span><span style="color:#6F42C1;">功能描述：重命名</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6F42C1;">mv</span><span style="color:#24292E;"> [/movefile] [/targetFolder] (</span><span style="color:#6F42C1;">功能描述：移动文件</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 重命名文件</span></span>
<span class="line"><span style="color:#6F42C1;">rename</span><span style="color:#24292E;"> [oldNameFile] [newNameFile] </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查看文件内容，是以只读的方式打开。</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> [选项] [要查看的文件]</span></span>
<span class="line"><span style="color:#6A737D;"># 常用选项</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-n</span><span style="color:#24292E;"> </span><span style="color:#032F62;">：显示行号</span></span>
<span class="line"><span style="color:#6A737D;"># tips:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#032F62;">只能浏览文件，而不能修改文件，为了浏览方便，一般会带上管道命令</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">more</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#032F62;">文件名</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">more</span><span style="color:#24292E;"> [分页浏览]</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 文本过滤器more</span></span>
<span class="line"><span style="color:#6F42C1;">more</span><span style="color:#24292E;"> [要查看的文件]</span></span>
<span class="line"><span style="color:#6A737D;"># more指令中内置了若干快捷键:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">空白键</span><span style="color:#24292E;"> </span><span style="color:#032F62;">：向下翻一页</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Enter</span><span style="color:#24292E;"> </span><span style="color:#032F62;">：向下翻一行</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">q</span><span style="color:#24292E;"> </span><span style="color:#032F62;">：退出more模式，不再显示该文件内容</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Ctrl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">F</span><span style="color:#24292E;"> </span><span style="color:#032F62;">：向下滚动一屏</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Ctrl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">B</span><span style="color:#24292E;"> </span><span style="color:#032F62;">：返回上一屏</span></span>
<span class="line"><span style="color:#24292E;">    = </span><span style="color:#032F62;">：</span><span style="color:#24292E;"> </span><span style="color:#032F62;">输出当前行的行号</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">:f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">输出文件名和当前行的行号</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 分屏查看文件内容：与 more 指令类似，但是比 more 指令更加强大</span></span>
<span class="line"><span style="color:#6F42C1;">less</span><span style="color:#24292E;"> [要查看的文件]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># &gt; 和 &gt;&gt; </span></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> 指令：输出重定向 </span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> 会将原来的文件的内容覆盖</span></span>
<span class="line"><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> 指令：不会覆盖原来文件的内容，而是追加到文件的尾部。</span></span>
<span class="line"><span style="color:#6A737D;"># 例子：</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">ls</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-l</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">a.txt</span><span style="color:#24292E;">  (将 </span><span style="color:#032F62;">ls</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-l</span><span style="color:#24292E;"> </span><span style="color:#032F62;">的显示的内容覆盖写入到</span><span style="color:#24292E;"> </span><span style="color:#032F62;">a.txt</span><span style="color:#24292E;"> </span><span style="color:#032F62;">文件，如果该文件不存在，就创建该文件</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">ls</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-al</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">a.txt（列表的内容追加到文件</span><span style="color:#24292E;"> </span><span style="color:#032F62;">aa.txt</span><span style="color:#24292E;"> </span><span style="color:#032F62;">的末尾）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 输出内容到控制台</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> [选项] [输出内容]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 显示文件的开头部分内容，默认显示前10行数据</span></span>
<span class="line"><span style="color:#6F42C1;">head</span><span style="color:#24292E;"> [文件] (</span><span style="color:#6F42C1;">查看文件头</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> </span><span style="color:#032F62;">行内容</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6F42C1;">head</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-n</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">5</span><span style="color:#24292E;"> [文件] (</span><span style="color:#6F42C1;">查看文件头</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">5</span><span style="color:#24292E;"> </span><span style="color:#032F62;">行内容，5</span><span style="color:#24292E;"> </span><span style="color:#032F62;">可以是任意行数</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 输出文件中尾部的内容，默认情况下 tail 指令显示文件的后 10 行内容</span></span>
<span class="line"><span style="color:#6F42C1;">tail</span><span style="color:#24292E;"> [文件]（查看文件后 10 行内容）</span></span>
<span class="line"><span style="color:#6F42C1;">tail</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-n</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">5</span><span style="color:#24292E;"> [文件]（查看文件后 5 行内容，5 可以是任意行数）</span></span>
<span class="line"><span style="color:#6F42C1;">tail</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> [文件]（实时追踪该文档的所有更新，工作经常使用）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 软链接也叫符号链接，类似于 windows 里的快捷方式，主要存放了链接其他文件的路径</span></span>
<span class="line"><span style="color:#6F42C1;">ln</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-s</span><span style="color:#24292E;"> [原文件或目录] [软链接名] （给原文件创建一个软链接）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查看已经执行过历史命令,也可以执行历史指令</span></span>
<span class="line"><span style="color:#005CC5;">history</span><span style="color:#24292E;"> </span><span style="color:#032F62;">（查看已经执行过历史命令）</span></span>
<span class="line"><span style="color:#005CC5;">history</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> (显示最近使用过的 </span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> </span><span style="color:#032F62;">个指令</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">!</span><span style="color:#6F42C1;">5</span><span style="color:#24292E;"> (执行历史编号为 </span><span style="color:#005CC5;">5</span><span style="color:#24292E;"> </span><span style="color:#032F62;">的指令</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 功能是以树形结构显示目录下的内容</span></span>
<span class="line"><span style="color:#6F42C1;">tree</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">--------------------------------------------------------</span></span>
<span class="line"><span style="color:#6A737D;"># cat的反向拼写，因此命令的功能为反向显示文件内容。</span></span>
<span class="line"><span style="color:#6F42C1;">tac</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 将文件的每一行按指定分隔符分割并输出。</span></span>
<span class="line"><span style="color:#6F42C1;">cut</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 分割文件为不同的小片段。</span></span>
<span class="line"><span style="color:#6F42C1;">split</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 按行合并文件内容。</span></span>
<span class="line"><span style="color:#6F42C1;">paste</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 对文件的文本内容排序。</span></span>
<span class="line"><span style="color:#6F42C1;">sort</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 去除重复行。</span></span>
<span class="line"><span style="color:#6F42C1;">uniq</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 统计文件的行数、单词数或字节数。</span></span>
<span class="line"><span style="color:#6F42C1;">wc</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 转换文件的编码格式。</span></span>
<span class="line"><span style="color:#6F42C1;">iconv</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 将DOS格式文件转换成UNIX格式。</span></span>
<span class="line"><span style="color:#6F42C1;">dos2unix</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 全拼difference，比较文件的差异，常用于文本文件。</span></span>
<span class="line"><span style="color:#6F42C1;">diff</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 命令行可视化文件比较工具，常用于文本文件。</span></span>
<span class="line"><span style="color:#6F42C1;">vimdiff</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 反向输出文件内容。</span></span>
<span class="line"><span style="color:#6F42C1;">rev</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 过滤字符串</span></span>
<span class="line"><span style="color:#6F42C1;">grep/egrep</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 按两个文件的相同字段合并。</span></span>
<span class="line"><span style="color:#6F42C1;">join</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 替换或删除字符。</span></span>
<span class="line"><span style="color:#6F42C1;">tr</span></span></code></pre></div><h3 id="时间日期类" tabindex="-1">时间日期类 <a class="header-anchor" href="#时间日期类" aria-label="Permalink to &quot;时间日期类&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 显示当前日期</span></span>
<span class="line"><span style="color:#F69D50;">date</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">（显示当前时间）</span></span>
<span class="line"><span style="color:#F69D50;">date</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">+%Y</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">（显示当前年份）</span></span>
<span class="line"><span style="color:#F69D50;">date</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">+%m</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">（显示当前月份）</span></span>
<span class="line"><span style="color:#F69D50;">date</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">+%d</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">（显示当前是哪一天）</span></span>
<span class="line"><span style="color:#F69D50;">date</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">&quot;+%Y-%m-%d %H:%M:%S&quot;</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">（显示年月日时分秒）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 设置日期</span></span>
<span class="line"><span style="color:#F69D50;">date</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-s</span><span style="color:#ADBAC7;"> [字符串时间]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 查看日历</span></span>
<span class="line"><span style="color:#F69D50;">cal</span><span style="color:#ADBAC7;"> [选项] （不加选项，显示本月日历）</span></span>
<span class="line"><span style="color:#F69D50;">cal</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">2020</span><span style="color:#ADBAC7;"> (显示 </span><span style="color:#6CB6FF;">2020</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">年日历</span><span style="color:#ADBAC7;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 显示当前日期</span></span>
<span class="line"><span style="color:#6F42C1;">date</span><span style="color:#24292E;"> </span><span style="color:#032F62;">（显示当前时间）</span></span>
<span class="line"><span style="color:#6F42C1;">date</span><span style="color:#24292E;"> </span><span style="color:#032F62;">+%Y</span><span style="color:#24292E;"> </span><span style="color:#032F62;">（显示当前年份）</span></span>
<span class="line"><span style="color:#6F42C1;">date</span><span style="color:#24292E;"> </span><span style="color:#032F62;">+%m</span><span style="color:#24292E;"> </span><span style="color:#032F62;">（显示当前月份）</span></span>
<span class="line"><span style="color:#6F42C1;">date</span><span style="color:#24292E;"> </span><span style="color:#032F62;">+%d</span><span style="color:#24292E;"> </span><span style="color:#032F62;">（显示当前是哪一天）</span></span>
<span class="line"><span style="color:#6F42C1;">date</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;+%Y-%m-%d %H:%M:%S&quot;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">（显示年月日时分秒）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置日期</span></span>
<span class="line"><span style="color:#6F42C1;">date</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-s</span><span style="color:#24292E;"> [字符串时间]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查看日历</span></span>
<span class="line"><span style="color:#6F42C1;">cal</span><span style="color:#24292E;"> [选项] （不加选项，显示本月日历）</span></span>
<span class="line"><span style="color:#6F42C1;">cal</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2020</span><span style="color:#24292E;"> (显示 </span><span style="color:#005CC5;">2020</span><span style="color:#24292E;"> </span><span style="color:#032F62;">年日历</span><span style="color:#24292E;">)</span></span></code></pre></div><h3 id="搜索查找" tabindex="-1">搜索查找 <a class="header-anchor" href="#搜索查找" aria-label="Permalink to &quot;搜索查找&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 从指定目录向下递归地遍历其各个子目录，将满足条件的文件或者目录显示在终端</span></span>
<span class="line"><span style="color:#F69D50;">find</span><span style="color:#ADBAC7;"> [搜索范围] [选项]</span></span>
<span class="line"><span style="color:#768390;"># 常用选项：</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-name</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">&lt;</span><span style="color:#96D0FF;">文件</span><span style="color:#ADBAC7;">名</span><span style="color:#F47067;">&gt;</span><span style="color:#96D0FF;">：</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">按照制定的文件名查找</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-user</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">&lt;</span><span style="color:#96D0FF;">用户</span><span style="color:#ADBAC7;">没</span><span style="color:#F47067;">&gt;</span><span style="color:#96D0FF;">：</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">查找属于指定用户名的所有文件</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-size</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">&lt;</span><span style="color:#96D0FF;">文件大</span><span style="color:#ADBAC7;">小</span><span style="color:#F47067;">&gt;</span><span style="color:#96D0FF;">：按照指定的文件大小查找文件</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#768390;"># 快速定位文件路径</span></span>
<span class="line"><span style="color:#F69D50;">locate</span><span style="color:#ADBAC7;"> [文件名]</span></span>
<span class="line"><span style="color:#F69D50;">locate</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">指令利用事先建立的系统中所有文件名称及路径的locate</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">数据库实现快速定位给定的文件。</span></span>
<span class="line"><span style="color:#F69D50;">locate</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">指令无需遍历整个文件系统，查询速度较快。为了保证查询结果的准确度，管理员必须定期更新</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">locate</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">时刻。</span></span>
<span class="line"><span style="color:#768390;"># 由于 locate 指令基于数据库进行查询，所以第一次运行前，必须使用 updatedb 指令创建 locate 数据库。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 过滤查找</span></span>
<span class="line"><span style="color:#F69D50;">grep</span><span style="color:#ADBAC7;"> [选项] [查找内容] [源文件]</span></span>
<span class="line"><span style="color:#768390;"># 常用选项：</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-n：显示匹配行及行号</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-i：忽略字母大小写</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#768390;"># 查找二进制命令，按环境变量PATH路径查找</span></span>
<span class="line"><span style="color:#6CB6FF;">which</span></span>
<span class="line"><span style="color:#768390;"># 查找二进制命令，按环境变量PATH路径查找</span></span>
<span class="line"><span style="color:#F69D50;">whereis</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 从指定目录向下递归地遍历其各个子目录，将满足条件的文件或者目录显示在终端</span></span>
<span class="line"><span style="color:#6F42C1;">find</span><span style="color:#24292E;"> [搜索范围] [选项]</span></span>
<span class="line"><span style="color:#6A737D;"># 常用选项：</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-name</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">文件</span><span style="color:#24292E;">名</span><span style="color:#D73A49;">&gt;</span><span style="color:#032F62;">：</span><span style="color:#24292E;"> </span><span style="color:#032F62;">按照制定的文件名查找</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-user</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">用户</span><span style="color:#24292E;">没</span><span style="color:#D73A49;">&gt;</span><span style="color:#032F62;">：</span><span style="color:#24292E;"> </span><span style="color:#032F62;">查找属于指定用户名的所有文件</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-size</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">文件大</span><span style="color:#24292E;">小</span><span style="color:#D73A49;">&gt;</span><span style="color:#032F62;">：按照指定的文件大小查找文件</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 快速定位文件路径</span></span>
<span class="line"><span style="color:#6F42C1;">locate</span><span style="color:#24292E;"> [文件名]</span></span>
<span class="line"><span style="color:#6F42C1;">locate</span><span style="color:#24292E;"> </span><span style="color:#032F62;">指令利用事先建立的系统中所有文件名称及路径的locate</span><span style="color:#24292E;"> </span><span style="color:#032F62;">数据库实现快速定位给定的文件。</span></span>
<span class="line"><span style="color:#6F42C1;">locate</span><span style="color:#24292E;"> </span><span style="color:#032F62;">指令无需遍历整个文件系统，查询速度较快。为了保证查询结果的准确度，管理员必须定期更新</span><span style="color:#24292E;"> </span><span style="color:#032F62;">locate</span><span style="color:#24292E;"> </span><span style="color:#032F62;">时刻。</span></span>
<span class="line"><span style="color:#6A737D;"># 由于 locate 指令基于数据库进行查询，所以第一次运行前，必须使用 updatedb 指令创建 locate 数据库。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 过滤查找</span></span>
<span class="line"><span style="color:#6F42C1;">grep</span><span style="color:#24292E;"> [选项] [查找内容] [源文件]</span></span>
<span class="line"><span style="color:#6A737D;"># 常用选项：</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-n：显示匹配行及行号</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-i：忽略字母大小写</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 查找二进制命令，按环境变量PATH路径查找</span></span>
<span class="line"><span style="color:#005CC5;">which</span></span>
<span class="line"><span style="color:#6A737D;"># 查找二进制命令，按环境变量PATH路径查找</span></span>
<span class="line"><span style="color:#6F42C1;">whereis</span></span></code></pre></div><h3 id="压缩和解压类" tabindex="-1">压缩和解压类 <a class="header-anchor" href="#压缩和解压类" aria-label="Permalink to &quot;压缩和解压类&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 压缩文件</span></span>
<span class="line"><span style="color:#F69D50;">gzip</span><span style="color:#ADBAC7;"> [文件] （压缩文件，只能将文件压缩为</span><span style="color:#F47067;">*</span><span style="color:#ADBAC7;">.gz 文件）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F69D50;">zip</span><span style="color:#ADBAC7;"> [选项] [XXX.zip] [将要压缩的内容]（压缩文件和目录的命令）</span></span>
<span class="line"><span style="color:#768390;"># 常用选项:</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-r：递归压缩，即压缩目录</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 解压文件</span></span>
<span class="line"><span style="color:#F69D50;">gunzip</span><span style="color:#ADBAC7;"> [文件.gz] （解压缩文件命令）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F69D50;">unzip</span><span style="color:#ADBAC7;"> [选项] [XXX.zip] （解压缩文件)</span></span>
<span class="line"><span style="color:#768390;"># 常用选项:</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-d</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">&lt;</span><span style="color:#96D0FF;">目</span><span style="color:#ADBAC7;">录</span><span style="color:#F47067;">&gt;</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">：指定解压后文件的存放目录</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#768390;"># 打包:</span></span>
<span class="line"><span style="color:#F69D50;">tar</span><span style="color:#ADBAC7;"> [选项] [XXX.tar.gz] [打包的内容]  (</span><span style="color:#F69D50;">打包目录，压缩后的文件格式.tar.gz</span><span style="color:#ADBAC7;">)</span></span>
<span class="line"><span style="color:#768390;"># 常用选项</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-c:</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">创建.tar打包文件</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-x：解包.tar文件</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">（-c</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">和</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-x</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">指令互斥）</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-v：显示详细信息</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-f：指定压缩后的文件名</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-z：打包同时压缩</span></span>
<span class="line"><span style="color:#768390;"># 例子：</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#768390;"># 1、压缩多个文件，将/home/a1.txt 和 /home/a2.txt 压缩成a.tar.gz</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">tar</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-zcvf</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">a.tar.gz</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">a1.txt</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">a2.txt</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#768390;"># 2、将 /home 的文件夹 压缩成 myhome.tar.gz</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">tar</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-zcvf</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">myhome.tar.gz</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">/home</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#768390;"># 3、将a.tar.gz 解压到当前目录</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">tar</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-zxvf</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">a.tar.gz</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#768390;"># 4、将myhome.tar.gz 解压到 /opt 目录下 （指定解压到的目录事先要存在，否则会）</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">tar</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-zxvf</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">myhome.tar.gz</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-C</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">/opt/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 压缩文件</span></span>
<span class="line"><span style="color:#6F42C1;">gzip</span><span style="color:#24292E;"> [文件] （压缩文件，只能将文件压缩为</span><span style="color:#D73A49;">*</span><span style="color:#24292E;">.gz 文件）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">zip</span><span style="color:#24292E;"> [选项] [XXX.zip] [将要压缩的内容]（压缩文件和目录的命令）</span></span>
<span class="line"><span style="color:#6A737D;"># 常用选项:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-r：递归压缩，即压缩目录</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 解压文件</span></span>
<span class="line"><span style="color:#6F42C1;">gunzip</span><span style="color:#24292E;"> [文件.gz] （解压缩文件命令）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">unzip</span><span style="color:#24292E;"> [选项] [XXX.zip] （解压缩文件)</span></span>
<span class="line"><span style="color:#6A737D;"># 常用选项:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-d</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">目</span><span style="color:#24292E;">录</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">：指定解压后文件的存放目录</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 打包:</span></span>
<span class="line"><span style="color:#6F42C1;">tar</span><span style="color:#24292E;"> [选项] [XXX.tar.gz] [打包的内容]  (</span><span style="color:#6F42C1;">打包目录，压缩后的文件格式.tar.gz</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6A737D;"># 常用选项</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-c:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">创建.tar打包文件</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-x：解包.tar文件</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">（-c</span><span style="color:#24292E;"> </span><span style="color:#032F62;">和</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-x</span><span style="color:#24292E;"> </span><span style="color:#032F62;">指令互斥）</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-v：显示详细信息</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-f：指定压缩后的文件名</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-z：打包同时压缩</span></span>
<span class="line"><span style="color:#6A737D;"># 例子：</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 1、压缩多个文件，将/home/a1.txt 和 /home/a2.txt 压缩成a.tar.gz</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">tar</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-zcvf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">a.tar.gz</span><span style="color:#24292E;"> </span><span style="color:#032F62;">a1.txt</span><span style="color:#24292E;"> </span><span style="color:#032F62;">a2.txt</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 2、将 /home 的文件夹 压缩成 myhome.tar.gz</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">tar</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-zcvf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">myhome.tar.gz</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/home</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 3、将a.tar.gz 解压到当前目录</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">tar</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-zxvf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">a.tar.gz</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 4、将myhome.tar.gz 解压到 /opt 目录下 （指定解压到的目录事先要存在，否则会）</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">tar</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-zxvf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">myhome.tar.gz</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-C</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/opt/</span></span></code></pre></div><h3 id="任务调度" tabindex="-1">任务调度 <a class="header-anchor" href="#任务调度" aria-label="Permalink to &quot;任务调度&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#F69D50;">crontab</span><span style="color:#ADBAC7;"> [选项]</span></span>
<span class="line"><span style="color:#768390;"># 常用选项：</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-e：编辑crontab定时任务</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-l：查询crontab任务</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-r：删除当前用户所有的crontab任务</span></span>
<span class="line"><span style="color:#ADBAC7;">   </span></span>
<span class="line"><span style="color:#768390;"># 重启任务调度</span></span>
<span class="line"><span style="color:#F69D50;">service</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">crond</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">restart</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">crontab</span><span style="color:#24292E;"> [选项]</span></span>
<span class="line"><span style="color:#6A737D;"># 常用选项：</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-e：编辑crontab定时任务</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-l：查询crontab任务</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-r：删除当前用户所有的crontab任务</span></span>
<span class="line"><span style="color:#24292E;">   </span></span>
<span class="line"><span style="color:#6A737D;"># 重启任务调度</span></span>
<span class="line"><span style="color:#6F42C1;">service</span><span style="color:#24292E;"> </span><span style="color:#032F62;">crond</span><span style="color:#24292E;"> </span><span style="color:#032F62;">restart</span></span></code></pre></div><h4 id="cron的5个占位符说明" tabindex="-1">cron的5个占位符说明 <a class="header-anchor" href="#cron的5个占位符说明" aria-label="Permalink to &quot;cron的5个占位符说明&quot;">​</a></h4><table><thead><tr><th>占位符</th><th>含义</th><th>范围</th></tr></thead><tbody><tr><td>第一个*</td><td>一小时当中的第几分钟</td><td>0 - 59</td></tr><tr><td>第二个*</td><td>一天当中的第几小时</td><td>0 - 23</td></tr><tr><td>第三个*</td><td>一个月当作的第几天</td><td>1 - 31</td></tr><tr><td>第四个*</td><td>一年当中的第几月</td><td>1 -12</td></tr><tr><td>第五个*</td><td>一周当中的星期几</td><td>0 - 7 (0和7都代表星期日)</td></tr></tbody></table><h4 id="特殊符号的说明" tabindex="-1">特殊符号的说明 <a class="header-anchor" href="#特殊符号的说明" aria-label="Permalink to &quot;特殊符号的说明&quot;">​</a></h4><table><thead><tr><th>特殊符号</th><th>含义</th></tr></thead><tbody><tr><td>*</td><td>代表任何时间。比如第一个*就代表一小时中每分钟都执行一次的意思</td></tr><tr><td>,</td><td>代表不连续的时间。比如&quot;0 8,12,16 * * *&quot;，代表在每天的8点0分，12点0分，16点0分都执行一次</td></tr><tr><td>-</td><td>代表连续的时间。比如 &quot;0 5 * * 1-6&quot; ，代表在周一到周五的凌晨5点0分执行命令</td></tr><tr><td>*/n</td><td>代表每隔多久执行一次。比如&quot;*/10 * * * * &quot; ，代表每隔10分钟就执行一次</td></tr></tbody></table><h3 id="磁盘" tabindex="-1">磁盘 <a class="header-anchor" href="#磁盘" aria-label="Permalink to &quot;磁盘&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 磁盘情况查询</span></span>
<span class="line"><span style="color:#F69D50;">df</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-h</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 查询指定目录的磁盘占用情况</span></span>
<span class="line"><span style="color:#F69D50;">du</span><span style="color:#ADBAC7;"> [参数]  [/目录]  (</span><span style="color:#F69D50;">查询指定目录的磁盘占用情况，默认为当前目录</span><span style="color:#ADBAC7;">)</span></span>
<span class="line"><span style="color:#768390;"># 常用参数：</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-s</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">指定目录占用大小汇总</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-h</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">带计量单位</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-a</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">含文件</span></span>
<span class="line"><span style="color:#ADBAC7;">    --max-depth</span><span style="color:#F47067;">=</span><span style="color:#6CB6FF;">1</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">子目录深度</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-c</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">列出明细的同时，增加汇总值</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 磁盘情况查询</span></span>
<span class="line"><span style="color:#6F42C1;">df</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-h</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查询指定目录的磁盘占用情况</span></span>
<span class="line"><span style="color:#6F42C1;">du</span><span style="color:#24292E;"> [参数]  [/目录]  (</span><span style="color:#6F42C1;">查询指定目录的磁盘占用情况，默认为当前目录</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6A737D;"># 常用参数：</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-s</span><span style="color:#24292E;"> </span><span style="color:#032F62;">指定目录占用大小汇总</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-h</span><span style="color:#24292E;"> </span><span style="color:#032F62;">带计量单位</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-a</span><span style="color:#24292E;"> </span><span style="color:#032F62;">含文件</span></span>
<span class="line"><span style="color:#24292E;">    --max-depth</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">子目录深度</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-c</span><span style="color:#24292E;"> </span><span style="color:#032F62;">列出明细的同时，增加汇总值</span></span></code></pre></div><h3 id="网路" tabindex="-1">网路 <a class="header-anchor" href="#网路" aria-label="Permalink to &quot;网路&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 使用TELNET协议远程登录。</span></span>
<span class="line"><span style="color:#F69D50;">telnet</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 使用SSH加密协议远程登录。</span></span>
<span class="line"><span style="color:#F69D50;">ssh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 全拼secure copy，用于不同主机之间复制文件。</span></span>
<span class="line"><span style="color:#F69D50;">scp</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 命令行下载文件。</span></span>
<span class="line"><span style="color:#F69D50;">wget</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 测试主机之间网络的连通性。</span></span>
<span class="line"><span style="color:#F69D50;">ping</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 显示和设置linux系统的路由表。</span></span>
<span class="line"><span style="color:#F69D50;">route</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 查看、配置、启用或禁用网络接口的命令。</span></span>
<span class="line"><span style="color:#F69D50;">ifconfig</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 启动网卡。</span></span>
<span class="line"><span style="color:#F69D50;">ifup</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 关闭网卡。</span></span>
<span class="line"><span style="color:#F69D50;">ifdown</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 查看网络状态。</span></span>
<span class="line"><span style="color:#F69D50;">netstat</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 查看网络状态。</span></span>
<span class="line"><span style="color:#F69D50;">ss</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 使用TELNET协议远程登录。</span></span>
<span class="line"><span style="color:#6F42C1;">telnet</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 使用SSH加密协议远程登录。</span></span>
<span class="line"><span style="color:#6F42C1;">ssh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 全拼secure copy，用于不同主机之间复制文件。</span></span>
<span class="line"><span style="color:#6F42C1;">scp</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 命令行下载文件。</span></span>
<span class="line"><span style="color:#6F42C1;">wget</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 测试主机之间网络的连通性。</span></span>
<span class="line"><span style="color:#6F42C1;">ping</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 显示和设置linux系统的路由表。</span></span>
<span class="line"><span style="color:#6F42C1;">route</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查看、配置、启用或禁用网络接口的命令。</span></span>
<span class="line"><span style="color:#6F42C1;">ifconfig</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 启动网卡。</span></span>
<span class="line"><span style="color:#6F42C1;">ifup</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 关闭网卡。</span></span>
<span class="line"><span style="color:#6F42C1;">ifdown</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查看网络状态。</span></span>
<span class="line"><span style="color:#6F42C1;">netstat</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查看网络状态。</span></span>
<span class="line"><span style="color:#6F42C1;">ss</span></span></code></pre></div><h3 id="进程" tabindex="-1">进程 <a class="header-anchor" href="#进程" aria-label="Permalink to &quot;进程&quot;">​</a></h3><ul><li>在 LINUX 中，每个执行的程序（代码）都称为一个进程。每一个进程都分配一个 ID 号。</li><li>每一个进程，都会对应一个父进程，而这个父进程可以复制多个子进程。例如 www 服务器。</li><li>每个进程都可能以两种方式存在的。前台与后台，所谓前台进程就是用户目前的屏幕上可以进行操作的。后台进程则是实际在操作，但由于屏幕上无法看到的进程，通常使用后台方式执行。</li><li>一般系统的服务都是以后台进程的方式存在，而且都会常驻在系统中。直到关机才才结束。</li></ul><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 查看进程使用的指令</span></span>
<span class="line"><span style="color:#F69D50;">ps</span><span style="color:#ADBAC7;"> </span></span>
<span class="line"><span style="color:#768390;"># 参数：</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-a：显示当前终端的所有进程信息</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-u：以用户的格式显示进程信息</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-x：显示后台进程运行的参数</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-e</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">显示所有进程</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-f</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">全格式。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># ps -aux 的指令说明</span></span>
<span class="line"><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">USER：用户名称</span></span>
<span class="line"><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">PID：进程号</span></span>
<span class="line"><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">%CPU：进程占用</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">CPU</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">的百分比</span></span>
<span class="line"><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">%MEM：进程占用物理内存的百分比</span></span>
<span class="line"><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">VSZ：进程占用的虚拟内存大小（单位：KB）</span></span>
<span class="line"><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">RSS：进程占用的物理内存大小（单位：KB）</span></span>
<span class="line"><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">TT：终端名称,缩写</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">.</span></span>
<span class="line"><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">STAT：进程状态，其中</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">S-睡眠，s-表示该进程是会话的先导进程，N-表示进程拥有比普通优先级更低的优先级，R-正在运行，D-短期等待，Z-僵死进程，T-被跟踪或者被停止等等</span></span>
<span class="line"><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">STARTED：进程的启动时间</span></span>
<span class="line"><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">TIME：CPU</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">时间，即进程使用</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">CPU</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">的总时间</span></span>
<span class="line"><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">COMMAND：启动进程所用的命令和参数，如果过长会被截断显示</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># ps -ef 的格式说明</span></span>
<span class="line"><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">UID：用户</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">ID</span></span>
<span class="line"><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">PID：进程</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">ID</span></span>
<span class="line"><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">PPID：父进程</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">ID</span></span>
<span class="line"><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">C：CPU</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">用于计算执行优先级的因子。数值越大，表明进程是</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">CPU</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">密集型运算，执行优先级会降低；数值越小，表明进程是</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">I/O</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">密集型运算，执行优先级会提高</span></span>
<span class="line"><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">STIME：进程启动的时间</span></span>
<span class="line"><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">TTY：完整的终端名称</span></span>
<span class="line"><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">TIME：CPU</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">时间</span></span>
<span class="line"><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">CMD：启动进程所用的命令和参数</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F69D50;">---------------------------------------</span></span>
<span class="line"><span style="color:#768390;"># 终止进程 </span></span>
<span class="line"><span style="color:#6CB6FF;">kill</span><span style="color:#ADBAC7;"> [选项] [进程号] （通过进程号杀死进程）</span></span>
<span class="line"><span style="color:#F69D50;">killall</span><span style="color:#ADBAC7;"> [进程名称] （通过进程名称杀死进程，也支持通配符，这在系统因负载过大而变得很慢时很有用）</span></span>
<span class="line"><span style="color:#768390;"># 常用选项：</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-9</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">:表示强迫进程立即停止</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#F69D50;">---------------------------------------</span></span>
<span class="line"><span style="color:#768390;"># 动态监控进程    </span></span>
<span class="line"><span style="color:#F69D50;">top</span><span style="color:#ADBAC7;"> [选项]</span></span>
<span class="line"><span style="color:#768390;"># 常用选项：</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-d</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">秒数：指定top命令每隔几秒更新，默认是3秒</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-i：使top不显示任何限制或者僵死的进程</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-p：通过指定监控进程ID来监控某个进程的状态</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#768390;"># 交互操作：</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">P：以CPU使用率排序，默认</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">M：以内存的使用率排序</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">N：以PID排序</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">u：查看特定用户</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">k：终止指定的进程</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">q：退出top模式</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#F69D50;">--------------------------------------</span></span>
<span class="line"><span style="color:#768390;"># 查看系统网络情况</span></span>
<span class="line"><span style="color:#F69D50;">netstat</span><span style="color:#ADBAC7;"> [选项]</span></span>
<span class="line"><span style="color:#768390;"># 常用选项：</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-an：按一定顺序排列输出</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-p：显示哪个进程在调用</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 查看进程使用的指令</span></span>
<span class="line"><span style="color:#6F42C1;">ps</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6A737D;"># 参数：</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-a：显示当前终端的所有进程信息</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-u：以用户的格式显示进程信息</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-x：显示后台进程运行的参数</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">显示所有进程</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">全格式。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># ps -aux 的指令说明</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">USER：用户名称</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PID：进程号</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">%CPU：进程占用</span><span style="color:#24292E;"> </span><span style="color:#032F62;">CPU</span><span style="color:#24292E;"> </span><span style="color:#032F62;">的百分比</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">%MEM：进程占用物理内存的百分比</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VSZ：进程占用的虚拟内存大小（单位：KB）</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RSS：进程占用的物理内存大小（单位：KB）</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">TT：终端名称,缩写</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">STAT：进程状态，其中</span><span style="color:#24292E;"> </span><span style="color:#032F62;">S-睡眠，s-表示该进程是会话的先导进程，N-表示进程拥有比普通优先级更低的优先级，R-正在运行，D-短期等待，Z-僵死进程，T-被跟踪或者被停止等等</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">STARTED：进程的启动时间</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">TIME：CPU</span><span style="color:#24292E;"> </span><span style="color:#032F62;">时间，即进程使用</span><span style="color:#24292E;"> </span><span style="color:#032F62;">CPU</span><span style="color:#24292E;"> </span><span style="color:#032F62;">的总时间</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">COMMAND：启动进程所用的命令和参数，如果过长会被截断显示</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># ps -ef 的格式说明</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UID：用户</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ID</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PID：进程</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ID</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PPID：父进程</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ID</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">C：CPU</span><span style="color:#24292E;"> </span><span style="color:#032F62;">用于计算执行优先级的因子。数值越大，表明进程是</span><span style="color:#24292E;"> </span><span style="color:#032F62;">CPU</span><span style="color:#24292E;"> </span><span style="color:#032F62;">密集型运算，执行优先级会降低；数值越小，表明进程是</span><span style="color:#24292E;"> </span><span style="color:#032F62;">I/O</span><span style="color:#24292E;"> </span><span style="color:#032F62;">密集型运算，执行优先级会提高</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">STIME：进程启动的时间</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">TTY：完整的终端名称</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">TIME：CPU</span><span style="color:#24292E;"> </span><span style="color:#032F62;">时间</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CMD：启动进程所用的命令和参数</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">---------------------------------------</span></span>
<span class="line"><span style="color:#6A737D;"># 终止进程 </span></span>
<span class="line"><span style="color:#005CC5;">kill</span><span style="color:#24292E;"> [选项] [进程号] （通过进程号杀死进程）</span></span>
<span class="line"><span style="color:#6F42C1;">killall</span><span style="color:#24292E;"> [进程名称] （通过进程名称杀死进程，也支持通配符，这在系统因负载过大而变得很慢时很有用）</span></span>
<span class="line"><span style="color:#6A737D;"># 常用选项：</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-9</span><span style="color:#24292E;"> </span><span style="color:#032F62;">:表示强迫进程立即停止</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6F42C1;">---------------------------------------</span></span>
<span class="line"><span style="color:#6A737D;"># 动态监控进程    </span></span>
<span class="line"><span style="color:#6F42C1;">top</span><span style="color:#24292E;"> [选项]</span></span>
<span class="line"><span style="color:#6A737D;"># 常用选项：</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-d</span><span style="color:#24292E;"> </span><span style="color:#032F62;">秒数：指定top命令每隔几秒更新，默认是3秒</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-i：使top不显示任何限制或者僵死的进程</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-p：通过指定监控进程ID来监控某个进程的状态</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 交互操作：</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">P：以CPU使用率排序，默认</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">M：以内存的使用率排序</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">N：以PID排序</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">u：查看特定用户</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">k：终止指定的进程</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">q：退出top模式</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6F42C1;">--------------------------------------</span></span>
<span class="line"><span style="color:#6A737D;"># 查看系统网络情况</span></span>
<span class="line"><span style="color:#6F42C1;">netstat</span><span style="color:#24292E;"> [选项]</span></span>
<span class="line"><span style="color:#6A737D;"># 常用选项：</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-an：按一定顺序排列输出</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-p：显示哪个进程在调用</span></span></code></pre></div><h3 id="服务-service-管理" tabindex="-1">服务(Service)管理 <a class="header-anchor" href="#服务-service-管理" aria-label="Permalink to &quot;服务(Service)管理&quot;">​</a></h3><p>服务(service) 本质就是进程，但是是运行在后台的，通常都会监听某个端口，等待其它程序的请求，比如(mysql , sshd防火墙等)，因此我们又称为守护进程</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 在 CentOS7.0 后 不再使用 service ,而是 systemctl</span></span>
<span class="line"><span style="color:#F69D50;">service</span><span style="color:#ADBAC7;"> [服务名] [start </span><span style="color:#F47067;">|</span><span style="color:#ADBAC7;"> stop </span><span style="color:#F47067;">|</span><span style="color:#ADBAC7;"> restart </span><span style="color:#F47067;">|</span><span style="color:#ADBAC7;"> reload </span><span style="color:#F47067;">|</span><span style="color:#ADBAC7;"> status]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 在 CentOS7.0 后 不再使用 service ,而是 systemctl</span></span>
<span class="line"><span style="color:#6F42C1;">service</span><span style="color:#24292E;"> [服务名] [start </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> stop </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> restart </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> reload </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> status]</span></span></code></pre></div><h3 id="rpm" tabindex="-1">RPM <a class="header-anchor" href="#rpm" aria-label="Permalink to &quot;RPM&quot;">​</a></h3><p>rpm：一种用于互联网下载包的【打包及安装工具】，它包含在某些 Linux 分发版中。它生成具有.RPM扩展名的文件。RPM 是 RedHat Package Manager（RedHat 软件包管理工具）的缩写</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 查询所安装的所有 rpm 软件包</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">rpm</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-qa</span><span style="color:#ADBAC7;"> </span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">rpm</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-qa</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">|</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">more</span><span style="color:#ADBAC7;"> [分页显示]</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">rpm</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-qa</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">|</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">grep</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">X</span><span style="color:#ADBAC7;"> [rpm </span><span style="color:#6CB6FF;">-qa</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">|</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">grep</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">firefox</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">]</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#768390;"># 查询软件包是否安装</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">rpm</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-q</span><span style="color:#ADBAC7;"> [软件包名]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 查询软件包信息</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">rpm</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-qi</span><span style="color:#ADBAC7;"> [软件包名]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 查询软件包中的文件(查询rpm包的文件都安装到哪里了)</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">rpm</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-ql</span><span style="color:#ADBAC7;"> [软件包名]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 查询文件所属的软件包</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">rpm</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-qf</span><span style="color:#ADBAC7;"> [文件全路径名]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 卸载rpm包</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">rpm</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-e</span><span style="color:#ADBAC7;"> [RPM </span><span style="color:#96D0FF;">包的名称]</span><span style="color:#ADBAC7;"> </span></span>
<span class="line"><span style="color:#768390;"># 强制删除rmp包（不建议）</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">rpm</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-e</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">--nodeps</span><span style="color:#ADBAC7;"> [RPM </span><span style="color:#96D0FF;">包的名称]</span><span style="color:#ADBAC7;"> </span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#768390;"># 安装rpm包</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">rpm</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-ivh</span><span style="color:#ADBAC7;"> [RPM </span><span style="color:#96D0FF;">包全路径名称]</span></span>
<span class="line"><span style="color:#768390;"># 参数说明:</span></span>
<span class="line"><span style="color:#ADBAC7;">    i</span><span style="color:#F47067;">=</span><span style="color:#96D0FF;">install</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">安装</span></span>
<span class="line"><span style="color:#ADBAC7;">    v</span><span style="color:#F47067;">=</span><span style="color:#96D0FF;">verbose</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">提示</span></span>
<span class="line"><span style="color:#ADBAC7;">    h</span><span style="color:#F47067;">=</span><span style="color:#96D0FF;">hash</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">进度条</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 查询所安装的所有 rpm 软件包</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">rpm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-qa</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">rpm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-qa</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">more</span><span style="color:#24292E;"> [分页显示]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">rpm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-qa</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">grep</span><span style="color:#24292E;"> </span><span style="color:#032F62;">X</span><span style="color:#24292E;"> [rpm </span><span style="color:#005CC5;">-qa</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">grep</span><span style="color:#24292E;"> </span><span style="color:#032F62;">firefox</span><span style="color:#24292E;"> </span><span style="color:#032F62;">]</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 查询软件包是否安装</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">rpm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-q</span><span style="color:#24292E;"> [软件包名]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查询软件包信息</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">rpm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-qi</span><span style="color:#24292E;"> [软件包名]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查询软件包中的文件(查询rpm包的文件都安装到哪里了)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">rpm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-ql</span><span style="color:#24292E;"> [软件包名]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查询文件所属的软件包</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">rpm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-qf</span><span style="color:#24292E;"> [文件全路径名]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 卸载rpm包</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">rpm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> [RPM </span><span style="color:#032F62;">包的名称]</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6A737D;"># 强制删除rmp包（不建议）</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">rpm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--nodeps</span><span style="color:#24292E;"> [RPM </span><span style="color:#032F62;">包的名称]</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 安装rpm包</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">rpm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-ivh</span><span style="color:#24292E;"> [RPM </span><span style="color:#032F62;">包全路径名称]</span></span>
<span class="line"><span style="color:#6A737D;"># 参数说明:</span></span>
<span class="line"><span style="color:#24292E;">    i</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">安装</span></span>
<span class="line"><span style="color:#24292E;">    v</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">verbose</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">提示</span></span>
<span class="line"><span style="color:#24292E;">    h</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">hash</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">进度条</span></span></code></pre></div><h3 id="yum" tabindex="-1">YUM <a class="header-anchor" href="#yum" aria-label="Permalink to &quot;YUM&quot;">​</a></h3><p>Yum 是一个 Shell 前端软件包管理器。基于 RPM 包管理，能够从指定的服务器自动下载 RPM 包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软件包。使用 yum 的前提是可以联网。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 查询 yum 服务器是否有需要安装的软件</span></span>
<span class="line"><span style="color:#F69D50;">yum</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">list</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">|</span><span style="color:#F69D50;">grep</span><span style="color:#ADBAC7;"> [软件名]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 安装指定的 yum 包</span></span>
<span class="line"><span style="color:#F69D50;">yum</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">install</span><span style="color:#ADBAC7;"> [软件名]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 查询 yum 服务器是否有需要安装的软件</span></span>
<span class="line"><span style="color:#6F42C1;">yum</span><span style="color:#24292E;"> </span><span style="color:#032F62;">list</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">grep</span><span style="color:#24292E;"> [软件名]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 安装指定的 yum 包</span></span>
<span class="line"><span style="color:#6F42C1;">yum</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> [软件名]</span></span></code></pre></div><h3 id="内置命令及其它" tabindex="-1">内置命令及其它 <a class="header-anchor" href="#内置命令及其它" aria-label="Permalink to &quot;内置命令及其它&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 将结果格式化输出到标准输出。</span></span>
<span class="line"><span style="color:#6CB6FF;">printf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 周期性的执行给定的命令，并将命令的输出以全屏方式显示。</span></span>
<span class="line"><span style="color:#F69D50;">watch</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 设置系统别名。</span></span>
<span class="line"><span style="color:#6CB6FF;">alias</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 取消系统别名。</span></span>
<span class="line"><span style="color:#6CB6FF;">unalias</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 弹出光驱。</span></span>
<span class="line"><span style="color:#F69D50;">eject</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 功能强大的网络工具。</span></span>
<span class="line"><span style="color:#F69D50;">nc</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 将标准输入转换成命令行参数。</span></span>
<span class="line"><span style="color:#F69D50;">xargs</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 调用并执行指令的命令。</span></span>
<span class="line"><span style="color:#6CB6FF;">exec</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 设置或者显示环境变量。</span></span>
<span class="line"><span style="color:#F47067;">export</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 删除变量或函数。</span></span>
<span class="line"><span style="color:#6CB6FF;">unset</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 用于判断另外一个命令是否是内置命令。</span></span>
<span class="line"><span style="color:#6CB6FF;">type</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 命令行科学计算器。</span></span>
<span class="line"><span style="color:#F69D50;">bc</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 将结果格式化输出到标准输出。</span></span>
<span class="line"><span style="color:#005CC5;">printf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 周期性的执行给定的命令，并将命令的输出以全屏方式显示。</span></span>
<span class="line"><span style="color:#6F42C1;">watch</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置系统别名。</span></span>
<span class="line"><span style="color:#005CC5;">alias</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 取消系统别名。</span></span>
<span class="line"><span style="color:#005CC5;">unalias</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 弹出光驱。</span></span>
<span class="line"><span style="color:#6F42C1;">eject</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 功能强大的网络工具。</span></span>
<span class="line"><span style="color:#6F42C1;">nc</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 将标准输入转换成命令行参数。</span></span>
<span class="line"><span style="color:#6F42C1;">xargs</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 调用并执行指令的命令。</span></span>
<span class="line"><span style="color:#005CC5;">exec</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置或者显示环境变量。</span></span>
<span class="line"><span style="color:#D73A49;">export</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 删除变量或函数。</span></span>
<span class="line"><span style="color:#005CC5;">unset</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 用于判断另外一个命令是否是内置命令。</span></span>
<span class="line"><span style="color:#005CC5;">type</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 命令行科学计算器。</span></span>
<span class="line"><span style="color:#6F42C1;">bc</span></span></code></pre></div><h2 id="vim相关操作指令" tabindex="-1">vim相关操作指令 <a class="header-anchor" href="#vim相关操作指令" aria-label="Permalink to &quot;vim相关操作指令&quot;">​</a></h2><ul><li>进入编辑模式：输入 <ul><li>【 i 】，当前光标开始插入；</li><li>【 a 】，当前光标下一个字符开始插入；</li><li>【 o 】，当前光标行增加下一行；</li></ul></li><li>退出编辑模式：按Esc键</li><li>保存并退出：输入【 :wq 】</li><li>不保存并强制退出：输入【 :q！ 】</li><li>保存不退出：输入【:w】</li><li>查找：非编辑模式下输入【/】查找的单词，例如:/aaa； <ul><li>按字母键【n】，查找下一处；</li></ul></li><li>替换： <ul><li>输入【r】替换当前光标字符；</li><li>输入【R】，一直替换当前光标字符；</li></ul></li><li>替换文档中所有的aaa为bbb：输入：%s/aaa/bbb/g</li><li>【x】：每按一次删除光标所在位置的后面一个字符。</li><li>【X】：大字的X，每按一次删除光标所在位置的前面一个字符</li><li>【gg】:命令将光标移动到文档开头</li><li>【G】:命令将光标移动到文档末尾</li><li>【yy】：拷贝当前行，；【5yy】：拷贝当前行向下的 5 行，【p】：粘贴</li><li>【dd】：删除当前行； 【5dd】：删除当前行向下的 5 行</li><li>【：set nu】：设置文件的行号；【:set nonu】：取消文件的行号</li><li>【u】：撤销操作：在一个文件中输入 &quot;hello&quot; ,然后又撤销这个动作，再正常模式下输入u</li></ul>`,58);function m(s,g,v,b,x,f){const o=c,e=r("ClientOnly");return l(),y("div",null,[h,i(e,null,{default:A(()=>{var n,a;return[(((n=s.$frontmatter)==null?void 0:n.aside)??!0)&&(((a=s.$frontmatter)==null?void 0:a.showArticleMetadata)??!0)?(l(),C(o,{key:0,article:s.$frontmatter},null,8,["article"])):d("",!0)]}),_:1}),u])}const P=t(E,[["render",m]]);export{q as __pageData,P as default};