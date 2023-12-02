import{_ as c}from"./chunks/ArticleMetadata.8b6b367a.js";import{_ as t,H as r,o as l,c as y,J as i,E as A,C as p,a as D,V as F,D as C,G as d}from"./chunks/framework.981adca9.js";const x=JSON.parse('{"title":"Shell","description":"","frontmatter":{"title":"Shell","author":"Charles Chu","date":"2022/03/24","isOriginal":true},"headers":[],"relativePath":"md/environment/Shell.md","filePath":"md/environment/Shell.md","lastUpdated":1691825438000}'),h={name:"md/environment/Shell.md"},B=p("h1",{id:"shell",tabindex:"-1"},[D("Shell "),p("a",{class:"header-anchor",href:"#shell","aria-label":'Permalink to "Shell"'},"​")],-1),E=F(`<p>Shell 是一个命令行解释器，它为用户提供了一个向 Linux 内核发送请求以便运行程序的界面系统级程序，用户可以用 Shell 来启动、挂起、停止甚至是编写一些程序.</p><h2 id="shell脚本格式要求" tabindex="-1">Shell脚本格式要求 <a class="header-anchor" href="#shell脚本格式要求" aria-label="Permalink to &quot;Shell脚本格式要求&quot;">​</a></h2><ul><li>1）脚本以#!/bin/bash 开头。</li><li>2）脚本需要有可执行权限。</li></ul><h2 id="脚本的常用执行方式" tabindex="-1">脚本的常用执行方式 <a class="header-anchor" href="#脚本的常用执行方式" aria-label="Permalink to &quot;脚本的常用执行方式&quot;">​</a></h2><ul><li>方式1：输入脚本的绝对路径或相对路径 <ul><li><ol><li>首先要赋予脚本可执行的权限</li></ol></li><li><ol start="2"><li>执行脚本</li></ol></li></ul></li><li>方式 2：sh+脚本。不用赋予脚本+x 权限，直接执行即可（不推荐）</li></ul><h2 id="shell的变量" tabindex="-1">Shell的变量 <a class="header-anchor" href="#shell的变量" aria-label="Permalink to &quot;Shell的变量&quot;">​</a></h2><p>Linux Shell 中的变量分为，系统变量和用户自定义变量。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 系统变量：</span></span>
<span class="line"><span style="color:#ADBAC7;">$HOME、$PWD、$SHELL、$USER</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># shell 变量的定义:</span></span>
<span class="line"><span style="color:#ADBAC7;">    [变量名]=[值]</span></span>
<span class="line"><span style="color:#768390;"># 撤销变量：</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#6CB6FF;">unset</span><span style="color:#ADBAC7;"> [变量名]</span></span>
<span class="line"><span style="color:#768390;"># 声明静态变量.这种方式声明后,不能 unset</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">readonly</span><span style="color:#ADBAC7;"> [变量名]</span></span>
<span class="line"><span style="color:#768390;"># 定义变量的规则</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">1</span><span style="color:#ADBAC7;">) 变量名称可以由字母、数字和下划线组成，但是不能以数字开头。</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">2</span><span style="color:#ADBAC7;">) 等号两侧不能有空格</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">3</span><span style="color:#ADBAC7;">) 变量名称一般习惯为大写</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#768390;"># 将命令的返回值赋给变量</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">1）A</span><span style="color:#ADBAC7;">=</span><span style="color:#96D0FF;">\`</span><span style="color:#F69D50;">ll</span><span style="color:#96D0FF;">\`</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">反引号，运行里面的命令，并把结果返回给变量</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">A</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">2）A</span><span style="color:#ADBAC7;">=$(ll) 等价于反引号</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 系统变量：</span></span>
<span class="line"><span style="color:#24292E;">$HOME、$PWD、$SHELL、$USER</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># shell 变量的定义:</span></span>
<span class="line"><span style="color:#24292E;">    [变量名]=[值]</span></span>
<span class="line"><span style="color:#6A737D;"># 撤销变量：</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">unset</span><span style="color:#24292E;"> [变量名]</span></span>
<span class="line"><span style="color:#6A737D;"># 声明静态变量.这种方式声明后,不能 unset</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">readonly</span><span style="color:#24292E;"> [变量名]</span></span>
<span class="line"><span style="color:#6A737D;"># 定义变量的规则</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">1</span><span style="color:#24292E;">) 变量名称可以由字母、数字和下划线组成，但是不能以数字开头。</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">2</span><span style="color:#24292E;">) 等号两侧不能有空格</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">3</span><span style="color:#24292E;">) 变量名称一般习惯为大写</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 将命令的返回值赋给变量</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">1）A</span><span style="color:#24292E;">=</span><span style="color:#032F62;">\`</span><span style="color:#6F42C1;">ll</span><span style="color:#032F62;">\`</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">反引号，运行里面的命令，并把结果返回给变量</span><span style="color:#24292E;"> </span><span style="color:#032F62;">A</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">2）A</span><span style="color:#24292E;">=$(ll) 等价于反引号</span></span></code></pre></div><h3 id="设置环境变量" tabindex="-1">设置环境变量 <a class="header-anchor" href="#设置环境变量" aria-label="Permalink to &quot;设置环境变量&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 将 shell 变量输出为环境变量</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">export</span><span style="color:#ADBAC7;"> [变量名]=[变量值] </span></span>
<span class="line"><span style="color:#768390;"># 让修改后的配置信息立即生效</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#6CB6FF;">source</span><span style="color:#ADBAC7;"> [配置文件]</span></span>
<span class="line"><span style="color:#768390;"># 查询环境变量的值</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#6CB6FF;">echo</span><span style="color:#ADBAC7;"> $变量名</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 将 shell 变量输出为环境变量</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">export</span><span style="color:#24292E;"> [变量名]=[变量值] </span></span>
<span class="line"><span style="color:#6A737D;"># 让修改后的配置信息立即生效</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">source</span><span style="color:#24292E;"> [配置文件]</span></span>
<span class="line"><span style="color:#6A737D;"># 查询环境变量的值</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> $变量名</span></span></code></pre></div><h3 id="位置参数变量" tabindex="-1">位置参数变量 <a class="header-anchor" href="#位置参数变量" aria-label="Permalink to &quot;位置参数变量&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#ADBAC7;">$n </span><span style="color:#768390;"># n 为数字，$0 代表命令本身，$1-$9 代表第一到第九个参数，十以上的参数需要用大括号包含，如\${10}</span></span>
<span class="line"><span style="color:#6CB6FF;">$*</span><span style="color:#ADBAC7;"> </span><span style="color:#768390;"># 这个变量代表命令行中所有的参数，$*把所有的参数看成一个整体</span></span>
<span class="line"><span style="color:#F69D50;">$@</span><span style="color:#ADBAC7;"> </span><span style="color:#768390;"># 这个变量也代表命令行中所有的参数，不过$@把每个参数区分对待，可以进行遍历操作</span></span>
<span class="line"><span style="color:#6CB6FF;">$#</span><span style="color:#ADBAC7;"> </span><span style="color:#768390;"># 这个变量代表命令行中所有参数的个数</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$n </span><span style="color:#6A737D;"># n 为数字，$0 代表命令本身，$1-$9 代表第一到第九个参数，十以上的参数需要用大括号包含，如\${10}</span></span>
<span class="line"><span style="color:#005CC5;">$*</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 这个变量代表命令行中所有的参数，$*把所有的参数看成一个整体</span></span>
<span class="line"><span style="color:#E36209;">$@</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 这个变量也代表命令行中所有的参数，不过$@把每个参数区分对待，可以进行遍历操作</span></span>
<span class="line"><span style="color:#005CC5;">$#</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 这个变量代表命令行中所有参数的个数</span></span></code></pre></div><h3 id="预定义变量" tabindex="-1">预定义变量 <a class="header-anchor" href="#预定义变量" aria-label="Permalink to &quot;预定义变量&quot;">​</a></h3><p>shell 设计者事先已经定义好的变量，可以直接在 shell 脚本中使用</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#6CB6FF;">$$</span><span style="color:#ADBAC7;"> </span><span style="color:#768390;">#当前进程的进程号（PID）</span></span>
<span class="line"><span style="color:#6CB6FF;">$!</span><span style="color:#ADBAC7;"> </span><span style="color:#768390;">#后台运行的最后一个进程的进程号（PID）</span></span>
<span class="line"><span style="color:#6CB6FF;">$?</span><span style="color:#ADBAC7;"> </span><span style="color:#768390;">#最后一次执行的命令的返回状态。如果这个变量的值为 0，证明上一个命令正确执行；如果这个变量的值为非 0，则证明上一个命令执行不正确了。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">$$</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#当前进程的进程号（PID）</span></span>
<span class="line"><span style="color:#005CC5;">$!</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#后台运行的最后一个进程的进程号（PID）</span></span>
<span class="line"><span style="color:#005CC5;">$?</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#最后一次执行的命令的返回状态。如果这个变量的值为 0，证明上一个命令正确执行；如果这个变量的值为非 0，则证明上一个命令执行不正确了。</span></span></code></pre></div><h3 id="运算符" tabindex="-1">运算符 <a class="header-anchor" href="#运算符" aria-label="Permalink to &quot;运算符&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#F69D50;">1、</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">$((运算式))</span></span>
<span class="line"><span style="color:#F69D50;">2、</span><span style="color:#ADBAC7;"> $</span><span style="color:#96D0FF;">[运算式]</span></span>
<span class="line"><span style="color:#F69D50;">3、</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">expr</span><span style="color:#ADBAC7;"> [运算式] (</span><span style="color:#F69D50;">注意</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">expr</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">运算符间要有空格</span><span style="color:#ADBAC7;">)     </span><span style="color:#F47067;">+</span><span style="color:#ADBAC7;">(</span><span style="color:#F69D50;">加</span><span style="color:#ADBAC7;">)  -(</span><span style="color:#F69D50;">减</span><span style="color:#ADBAC7;">)   </span><span style="color:#F47067;">\\*</span><span style="color:#ADBAC7;">(</span><span style="color:#F69D50;">乘</span><span style="color:#ADBAC7;">)  /(</span><span style="color:#F69D50;">除</span><span style="color:#ADBAC7;">)  %(</span><span style="color:#F69D50;">取余</span><span style="color:#ADBAC7;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 示例：计算（2+3）X4 的值</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">1）</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">$((（</span><span style="color:#6CB6FF;">2</span><span style="color:#F47067;">+</span><span style="color:#6CB6FF;">3</span><span style="color:#96D0FF;">）</span><span style="color:#F47067;">*</span><span style="color:#96D0FF;"> </span><span style="color:#6CB6FF;">4</span><span style="color:#96D0FF;"> ))</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">2）</span><span style="color:#ADBAC7;"> $</span><span style="color:#96D0FF;">[（2+3）</span><span style="color:#6CB6FF;">*</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">4</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">]</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">3）</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">TEMP=\`</span><span style="color:#F69D50;">expr</span><span style="color:#96D0FF;"> </span><span style="color:#6CB6FF;">2</span><span style="color:#96D0FF;"> + </span><span style="color:#6CB6FF;">3</span><span style="color:#96D0FF;">\`</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">RESULT</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">=</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">\`</span><span style="color:#F69D50;">expr</span><span style="color:#96D0FF;"> </span><span style="color:#ADBAC7;">$TEMP</span><span style="color:#96D0FF;"> </span><span style="color:#F47067;">\\*</span><span style="color:#96D0FF;"> </span><span style="color:#6CB6FF;">4</span><span style="color:#96D0FF;">\`</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">1、</span><span style="color:#24292E;"> </span><span style="color:#032F62;">$((运算式))</span></span>
<span class="line"><span style="color:#6F42C1;">2、</span><span style="color:#24292E;"> $</span><span style="color:#032F62;">[运算式]</span></span>
<span class="line"><span style="color:#6F42C1;">3、</span><span style="color:#24292E;"> </span><span style="color:#032F62;">expr</span><span style="color:#24292E;"> [运算式] (</span><span style="color:#6F42C1;">注意</span><span style="color:#24292E;"> </span><span style="color:#032F62;">expr</span><span style="color:#24292E;"> </span><span style="color:#032F62;">运算符间要有空格</span><span style="color:#24292E;">)     </span><span style="color:#D73A49;">+</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">加</span><span style="color:#24292E;">)  -(</span><span style="color:#6F42C1;">减</span><span style="color:#24292E;">)   </span><span style="color:#005CC5;">\\*</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">乘</span><span style="color:#24292E;">)  /(</span><span style="color:#6F42C1;">除</span><span style="color:#24292E;">)  %(</span><span style="color:#6F42C1;">取余</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 示例：计算（2+3）X4 的值</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">1）</span><span style="color:#24292E;"> </span><span style="color:#032F62;">$((（</span><span style="color:#005CC5;">2</span><span style="color:#D73A49;">+</span><span style="color:#005CC5;">3</span><span style="color:#032F62;">）</span><span style="color:#D73A49;">*</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">4</span><span style="color:#032F62;"> ))</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">2）</span><span style="color:#24292E;"> $</span><span style="color:#032F62;">[（2+3）</span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">4</span><span style="color:#24292E;"> </span><span style="color:#032F62;">]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">3）</span><span style="color:#24292E;"> </span><span style="color:#032F62;">TEMP=\`</span><span style="color:#6F42C1;">expr</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">2</span><span style="color:#032F62;"> + </span><span style="color:#005CC5;">3</span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">RESULT</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`</span><span style="color:#6F42C1;">expr</span><span style="color:#032F62;"> </span><span style="color:#24292E;">$TEMP</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">\\*</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">4</span><span style="color:#032F62;">\`</span></span></code></pre></div><h3 id="条件判断" tabindex="-1">条件判断 <a class="header-anchor" href="#条件判断" aria-label="Permalink to &quot;条件判断&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 非空返回 true；condition 前后要有空格</span></span>
<span class="line"><span style="color:#ADBAC7;">[ condition ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 常用判断条件</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">1</span><span style="color:#ADBAC7;">) 两个整数的比较:</span></span>
<span class="line"><span style="color:#ADBAC7;">        = </span><span style="color:#96D0FF;">字符串比较</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">-lt</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">小于</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">-le</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">小于等于</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">-eq</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">等于</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">-gt</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">大于</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">-ge</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">大于等于</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">-ne</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">不等于</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">2</span><span style="color:#ADBAC7;">) 按照文件权限进行判断</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">-r</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">有读的权限</span><span style="color:#ADBAC7;"> [ </span><span style="color:#6CB6FF;">-r</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">文件名</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">]</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">-w</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">有写的权限</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">-x</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">有执行的权限</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">3</span><span style="color:#ADBAC7;">) 按照文件类型进行判断</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">-f</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">文件存在并且是一个常规的文件</span><span style="color:#ADBAC7;">  [ </span><span style="color:#6CB6FF;">-f</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">文件名</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">]</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">-e</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">文件存在</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">-d</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">文件存在并是一个目录</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 非空返回 true；condition 前后要有空格</span></span>
<span class="line"><span style="color:#24292E;">[ condition ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 常用判断条件</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">1</span><span style="color:#24292E;">) 两个整数的比较:</span></span>
<span class="line"><span style="color:#24292E;">        = </span><span style="color:#032F62;">字符串比较</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">-lt</span><span style="color:#24292E;"> </span><span style="color:#032F62;">小于</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">-le</span><span style="color:#24292E;"> </span><span style="color:#032F62;">小于等于</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">-eq</span><span style="color:#24292E;"> </span><span style="color:#032F62;">等于</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">-gt</span><span style="color:#24292E;"> </span><span style="color:#032F62;">大于</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">-ge</span><span style="color:#24292E;"> </span><span style="color:#032F62;">大于等于</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">-ne</span><span style="color:#24292E;"> </span><span style="color:#032F62;">不等于</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">2</span><span style="color:#24292E;">) 按照文件权限进行判断</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">-r</span><span style="color:#24292E;"> </span><span style="color:#032F62;">有读的权限</span><span style="color:#24292E;"> [ </span><span style="color:#005CC5;">-r</span><span style="color:#24292E;"> </span><span style="color:#032F62;">文件名</span><span style="color:#24292E;"> </span><span style="color:#032F62;">]</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">-w</span><span style="color:#24292E;"> </span><span style="color:#032F62;">有写的权限</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">-x</span><span style="color:#24292E;"> </span><span style="color:#032F62;">有执行的权限</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">3</span><span style="color:#24292E;">) 按照文件类型进行判断</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">文件存在并且是一个常规的文件</span><span style="color:#24292E;">  [ </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">文件名</span><span style="color:#24292E;"> </span><span style="color:#032F62;">]</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">文件存在</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">-d</span><span style="color:#24292E;"> </span><span style="color:#032F62;">文件存在并是一个目录</span></span></code></pre></div><h3 id="流程控制" tabindex="-1">流程控制 <a class="header-anchor" href="#流程控制" aria-label="Permalink to &quot;流程控制&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># if判断，基本语法</span></span>
<span class="line"><span style="color:#768390;"># 方式一：</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">if</span><span style="color:#ADBAC7;"> [ 条件判断式 ];</span><span style="color:#F47067;">then</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">程序</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">fi</span></span>
<span class="line"><span style="color:#768390;"># 方式二：</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">if</span><span style="color:#ADBAC7;"> [ 条件判断式 ]  </span><span style="color:#F47067;">then</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">程序</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">elif</span><span style="color:#ADBAC7;"> [条件判断式]  </span><span style="color:#F47067;">then</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">程序</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># case语句，基本语法</span></span>
<span class="line"><span style="color:#F47067;">case</span><span style="color:#ADBAC7;"> $变量名 </span><span style="color:#F47067;">in</span></span>
<span class="line"><span style="color:#96D0FF;">&quot;值 1&quot;</span><span style="color:#ADBAC7;">)</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">如果变量的值等于值</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">1</span><span style="color:#96D0FF;">，则执行程序</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">1</span></span>
<span class="line"><span style="color:#ADBAC7;">    ;;</span></span>
<span class="line"><span style="color:#96D0FF;">&quot;值 2&quot;</span><span style="color:#ADBAC7;">)</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">如果变量的值等于值</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">2</span><span style="color:#96D0FF;">，则执行程序</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">2</span></span>
<span class="line"><span style="color:#ADBAC7;">    ;;</span></span>
<span class="line"><span style="color:#F47067;">*</span><span style="color:#ADBAC7;">)</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">如果变量的值都不是以上的值，则执行此程序</span></span>
<span class="line"><span style="color:#ADBAC7;">    ;;</span></span>
<span class="line"><span style="color:#F47067;">esac</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># for循环，基本语法</span></span>
<span class="line"><span style="color:#768390;"># 方式一：</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">for</span><span style="color:#ADBAC7;"> 变量 </span><span style="color:#F47067;">in</span><span style="color:#ADBAC7;"> 值 1 值 2 值 3…</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">do</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">程序</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">done</span></span>
<span class="line"><span style="color:#768390;"># 方式二：</span></span>
<span class="line"><span style="color:#F47067;">for</span><span style="color:#ADBAC7;"> (( 初始值;循环控制条件;变量变化 ))</span></span>
<span class="line"><span style="color:#F47067;">do</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">程序</span></span>
<span class="line"><span style="color:#F47067;">done</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># while循环，基本语法</span></span>
<span class="line"><span style="color:#F47067;">while</span><span style="color:#ADBAC7;"> [ 条件判断式 ]</span></span>
<span class="line"><span style="color:#F47067;">do</span></span>
<span class="line"><span style="color:#ADBAC7;">   </span><span style="color:#F69D50;">程序</span></span>
<span class="line"><span style="color:#F47067;">done</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># if判断，基本语法</span></span>
<span class="line"><span style="color:#6A737D;"># 方式一：</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> [ 条件判断式 ];</span><span style="color:#D73A49;">then</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">程序</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">fi</span></span>
<span class="line"><span style="color:#6A737D;"># 方式二：</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> [ 条件判断式 ]  </span><span style="color:#D73A49;">then</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">程序</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">elif</span><span style="color:#24292E;"> [条件判断式]  </span><span style="color:#D73A49;">then</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">程序</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># case语句，基本语法</span></span>
<span class="line"><span style="color:#D73A49;">case</span><span style="color:#24292E;"> $变量名 </span><span style="color:#D73A49;">in</span></span>
<span class="line"><span style="color:#032F62;">&quot;值 1&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">如果变量的值等于值</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#032F62;">，则执行程序</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">    ;;</span></span>
<span class="line"><span style="color:#032F62;">&quot;值 2&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">如果变量的值等于值</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#032F62;">，则执行程序</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;">    ;;</span></span>
<span class="line"><span style="color:#D73A49;">*</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">如果变量的值都不是以上的值，则执行此程序</span></span>
<span class="line"><span style="color:#24292E;">    ;;</span></span>
<span class="line"><span style="color:#D73A49;">esac</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># for循环，基本语法</span></span>
<span class="line"><span style="color:#6A737D;"># 方式一：</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> 变量 </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> 值 1 值 2 值 3…</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">do</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">程序</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">done</span></span>
<span class="line"><span style="color:#6A737D;"># 方式二：</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (( 初始值;循环控制条件;变量变化 ))</span></span>
<span class="line"><span style="color:#D73A49;">do</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">程序</span></span>
<span class="line"><span style="color:#D73A49;">done</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># while循环，基本语法</span></span>
<span class="line"><span style="color:#D73A49;">while</span><span style="color:#24292E;"> [ 条件判断式 ]</span></span>
<span class="line"><span style="color:#D73A49;">do</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6F42C1;">程序</span></span>
<span class="line"><span style="color:#D73A49;">done</span></span></code></pre></div><h3 id="读取控制台输入" tabindex="-1">读取控制台输入 <a class="header-anchor" href="#读取控制台输入" aria-label="Permalink to &quot;读取控制台输入&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#6CB6FF;">read</span><span style="color:#ADBAC7;"> (选项) (</span><span style="color:#F69D50;">参数</span><span style="color:#ADBAC7;">)</span></span>
<span class="line"><span style="color:#768390;"># 常用选项：</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-p：指定读取值时的提示符；</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">-t：指定读取值时等待的时间（秒），如果没有在指定的时间内输入，就不再等待了。</span></span>
<span class="line"><span style="color:#768390;"># 参数</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">变量：指定读取值的变量名</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">read</span><span style="color:#24292E;"> (选项) (</span><span style="color:#6F42C1;">参数</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6A737D;"># 常用选项：</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-p：指定读取值时的提示符；</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-t：指定读取值时等待的时间（秒），如果没有在指定的时间内输入，就不再等待了。</span></span>
<span class="line"><span style="color:#6A737D;"># 参数</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">变量：指定读取值的变量名</span></span></code></pre></div><h3 id="函数" tabindex="-1">函数 <a class="header-anchor" href="#函数" aria-label="Permalink to &quot;函数&quot;">​</a></h3><p>函数包括：系统函数和自定义函数</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 系统函数</span></span>
<span class="line"><span style="color:#768390;"># basename，返回完整路径最后 / 的部分，常用于获取文件名</span></span>
<span class="line"><span style="color:#F69D50;">basename</span><span style="color:#ADBAC7;"> [pathname] [suffix]</span></span>
<span class="line"><span style="color:#768390;"># suffix 为后缀，如果 suffix 被指定了，basename 会将 pathname 或 string 中的 suffix 去掉。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># dirname，返回完整路径最后 / 的前面的部分，常用于返回路径部分</span></span>
<span class="line"><span style="color:#F69D50;">dirname</span><span style="color:#ADBAC7;"> [文件绝对路径]</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 自定义函数</span></span>
<span class="line"><span style="color:#768390;"># 定义函数：</span></span>
<span class="line"><span style="color:#ADBAC7;">    [ function ] </span><span style="color:#DCBDFB;">funname[</span><span style="color:#ADBAC7;">()]</span></span>
<span class="line"><span style="color:#ADBAC7;">    {</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F69D50;">Action</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#ADBAC7;">        [return int;]</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"><span style="color:#768390;"># 调用函数，直接写函数名</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F69D50;">funname</span><span style="color:#ADBAC7;"> [值]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 系统函数</span></span>
<span class="line"><span style="color:#6A737D;"># basename，返回完整路径最后 / 的部分，常用于获取文件名</span></span>
<span class="line"><span style="color:#6F42C1;">basename</span><span style="color:#24292E;"> [pathname] [suffix]</span></span>
<span class="line"><span style="color:#6A737D;"># suffix 为后缀，如果 suffix 被指定了，basename 会将 pathname 或 string 中的 suffix 去掉。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># dirname，返回完整路径最后 / 的前面的部分，常用于返回路径部分</span></span>
<span class="line"><span style="color:#6F42C1;">dirname</span><span style="color:#24292E;"> [文件绝对路径]</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 自定义函数</span></span>
<span class="line"><span style="color:#6A737D;"># 定义函数：</span></span>
<span class="line"><span style="color:#24292E;">    [ function ] </span><span style="color:#6F42C1;">funname[</span><span style="color:#24292E;">()]</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">Action</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        [return int;]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#6A737D;"># 调用函数，直接写函数名</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">funname</span><span style="color:#24292E;"> [值]</span></span></code></pre></div>`,26);function u(s,m,g,f,b,v){const o=c,e=r("ClientOnly");return l(),y("div",null,[B,i(e,null,{default:A(()=>{var n,a;return[(((n=s.$frontmatter)==null?void 0:n.aside)??!0)&&(((a=s.$frontmatter)==null?void 0:a.showArticleMetadata)??!0)?(l(),C(o,{key:0,article:s.$frontmatter},null,8,["article"])):d("",!0)]}),_:1}),E])}const _=t(h,[["render",u]]);export{x as __pageData,_ as default};
