import{_ as y}from"./chunks/ArticleMetadata.8b6b367a.js";import{_ as d,H as l,o as p,c as F,C as t,a as e,J as o,E as D,V as h,D as A,G as u}from"./chunks/framework.981adca9.js";const C="/charles-blog/assets/BgSave.282c4cc3.png",m="/charles-blog/assets/AutoRewrite.e9fb80a6.png",b="/charles-blog/assets/Cache.a8b3caa1.png",k="/charles-blog/assets/Session.04db3daa.png",g="/charles-blog/assets/DistributedLock.3fbdf96c.png",v="/charles-blog/assets/SetNx.43a3c65f.png",B="/charles-blog/assets/RateLimiter.6f2a5096.png",E="/charles-blog/assets/Rank.51e5c829.png",f="/charles-blog/assets/MasterSlave.34387456.png",q="/charles-blog/assets/MasterSlaveStep.30fe0b33.png",x="/charles-blog/assets/MasterSlaveConn.6317cd0d.png",P="/charles-blog/assets/MasterSlaveSync.b54f0a6f.png",_="/charles-blog/assets/MasterSlaveCopy.efc49cc3.png",R="/charles-blog/assets/Sentinel.2d24d71d.png",S="/charles-blog/assets/SentinelPing.cf0ea298.png",O="/charles-blog/assets/SentinelNotice.07fd89c4.png",w="/charles-blog/assets/HashSlot.2c2d470b.png",L="/charles-blog/assets/ClusterCommunicate.937cc3e2.png",z="/charles-blog/assets/PublishSubscription.bb558770.png",G=JSON.parse('{"title":"Redis","description":"","frontmatter":{"title":"Redis","author":"Charles Chu","date":"2021/09/12","isOriginal":true},"headers":[],"relativePath":"md/database/Redis.md","filePath":"md/database/Redis.md","lastUpdated":1697269547000}'),T={name:"md/database/Redis.md"},I={id:"redis",tabindex:"-1"},N=t("a",{class:"header-anchor",href:"#redis","aria-label":'Permalink to "Redis  <Badge text="持续更新" type="warning" />"'},"​",-1),$=h(`<p>  Redis (REmote DIctionary Server) 是用C语言开发的一个开源的高性能键值对（key-value）数据库。</p><h2 id="特征" tabindex="-1">特征 <a class="header-anchor" href="#特征" aria-label="Permalink to &quot;特征&quot;">​</a></h2><ol><li>数据间没有必然的关联关系</li><li>内部采用单线程机制进行工作</li><li>高性能。官方提供测试数据，50个并发执行100000 个请求,读的速度是110000 次/s,写的速度是81000次/s。</li><li>多数据类型支持： <ul><li>字符串类型；string</li><li>列表类型；list</li><li>散列类型；hash</li><li>集合类型；set</li><li>有序集合类型；sorted_set</li></ul></li><li>持久化支持。可以进行数据灾难恢复</li></ol><h2 id="redis数据结构" tabindex="-1">Redis数据结构 <a class="header-anchor" href="#redis数据结构" aria-label="Permalink to &quot;Redis数据结构&quot;">​</a></h2><p>  redis 自身是一个 Map，其中所有的数据都是采用 key : value 的形式存储；</p><p>  数据类型指的是存储的数据的类型，也就是 value 部分的类型，key 部分永远都是字符串；</p><h3 id="string-字符串-单个数据" tabindex="-1">String（字符串）单个数据 <a class="header-anchor" href="#string-字符串-单个数据" aria-label="Permalink to &quot;String（字符串）单个数据&quot;">​</a></h3><ul><li>存储内容 <ul><li>通常使用字符串，如果字符串以整数的形式展示，可以作为数字操作使用；</li></ul></li><li>存储数据的格式 <ul><li>一个存储空间保存一个数据；</li></ul></li><li>使用场景 <ul><li>计数器</li><li>随机验证码</li></ul></li></ul><h4 id="相关命令" tabindex="-1">相关命令 <a class="header-anchor" href="#相关命令" aria-label="Permalink to &quot;相关命令&quot;">​</a></h4><h5 id="添加" tabindex="-1">添加 <a class="header-anchor" href="#添加" aria-label="Permalink to &quot;添加&quot;">​</a></h5><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 添加：</span></span>
<span class="line"><span style="color:#6CB6FF;">set</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">value</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 添加/修改多个数据：</span></span>
<span class="line"><span style="color:#F69D50;">mset</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key1</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">value1</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key2</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">value2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 追加信息到原始信息后部（如果原始信息存在就追加，否则新建）：</span></span>
<span class="line"><span style="color:#F69D50;">append</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">value</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 设置数值数据增加指定范围的值（数值为负数等同于decr）：</span></span>
<span class="line"><span style="color:#F69D50;">incr</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#F69D50;">incrby</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">increment</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#F69D50;">incrbyfloat</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">increment</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#768390;"># string在redis内部存储默认就是一个字符串，当遇到增减类操作incr，decr时会转成数值型进行计算</span></span>
<span class="line"><span style="color:#768390;"># 按数值进行操作的数据，如果原始数据不能转成数值，或超越了redis 数值上限范围，将报错。</span></span>
<span class="line"><span style="color:#768390;"># 9223372036854775807（java中long型数据最大值，Long.MAX_VALUE）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 设置数值数据减少指定范围的值：</span></span>
<span class="line"><span style="color:#F69D50;">decr</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#F69D50;">decrby</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">increment</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 设置数据具有指定的生命周期：</span></span>
<span class="line"><span style="color:#768390;"># 设置过期时间单位为秒</span></span>
<span class="line"><span style="color:#F69D50;">setex</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">seconds</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">value</span></span>
<span class="line"><span style="color:#768390;"># 设置过期时间单位为毫秒</span></span>
<span class="line"><span style="color:#F69D50;">psetex</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">milliseconds</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">value</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 添加：</span></span>
<span class="line"><span style="color:#005CC5;">set</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">value</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 添加/修改多个数据：</span></span>
<span class="line"><span style="color:#6F42C1;">mset</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">value1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key2</span><span style="color:#24292E;"> </span><span style="color:#032F62;">value2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 追加信息到原始信息后部（如果原始信息存在就追加，否则新建）：</span></span>
<span class="line"><span style="color:#6F42C1;">append</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">value</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置数值数据增加指定范围的值（数值为负数等同于decr）：</span></span>
<span class="line"><span style="color:#6F42C1;">incr</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">incrby</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">increment</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">incrbyfloat</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">increment</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;"># string在redis内部存储默认就是一个字符串，当遇到增减类操作incr，decr时会转成数值型进行计算</span></span>
<span class="line"><span style="color:#6A737D;"># 按数值进行操作的数据，如果原始数据不能转成数值，或超越了redis 数值上限范围，将报错。</span></span>
<span class="line"><span style="color:#6A737D;"># 9223372036854775807（java中long型数据最大值，Long.MAX_VALUE）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置数值数据减少指定范围的值：</span></span>
<span class="line"><span style="color:#6F42C1;">decr</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">decrby</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">increment</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置数据具有指定的生命周期：</span></span>
<span class="line"><span style="color:#6A737D;"># 设置过期时间单位为秒</span></span>
<span class="line"><span style="color:#6F42C1;">setex</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">seconds</span><span style="color:#24292E;"> </span><span style="color:#032F62;">value</span></span>
<span class="line"><span style="color:#6A737D;"># 设置过期时间单位为毫秒</span></span>
<span class="line"><span style="color:#6F42C1;">psetex</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">milliseconds</span><span style="color:#24292E;"> </span><span style="color:#032F62;">value</span></span></code></pre></div><h5 id="获取" tabindex="-1">获取 <a class="header-anchor" href="#获取" aria-label="Permalink to &quot;获取&quot;">​</a></h5><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 获取：</span></span>
<span class="line"><span style="color:#F69D50;">get</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 获取多个数据：</span></span>
<span class="line"><span style="color:#F69D50;">mget</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key1</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 获取数据字符个数（字符串长度）：</span></span>
<span class="line"><span style="color:#F69D50;">strlen</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 获取：</span></span>
<span class="line"><span style="color:#6F42C1;">get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 获取多个数据：</span></span>
<span class="line"><span style="color:#6F42C1;">mget</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 获取数据字符个数（字符串长度）：</span></span>
<span class="line"><span style="color:#6F42C1;">strlen</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span></span></code></pre></div><h5 id="删除" tabindex="-1">删除 <a class="header-anchor" href="#删除" aria-label="Permalink to &quot;删除&quot;">​</a></h5><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 删除： </span></span>
<span class="line"><span style="color:#F69D50;">del</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 删除： </span></span>
<span class="line"><span style="color:#6F42C1;">del</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span></span></code></pre></div><h3 id="hash-哈希类型-字典-map格式" tabindex="-1">Hash（哈希类型，字典，map格式 ） <a class="header-anchor" href="#hash-哈希类型-字典-map格式" aria-label="Permalink to &quot;Hash（哈希类型，字典，map格式 ）&quot;">​</a></h3><p>  对一系列存储的数据进行编组，方便管理，典型应用存储对象信息</p><ul><li>存储数据的格式 <ul><li>一个存储空间保存多个键值对数据</li></ul></li><li>使用场景 <ul><li>存储对象类型的数据（如用户信息数据）</li></ul></li><li>hash类型 <ul><li>底层使用哈希表结构实现数据存储</li></ul></li><li>注意 <ul><li>每个 hash 可以存储 2^32 - 1 个键值对</li><li>hgetall 操作可以获取全部属性，如果内部field过多，遍历整体数据效率就很会低，有可能成为数据访问瓶颈</li></ul></li></ul><h4 id="相关命令-1" tabindex="-1">相关命令 <a class="header-anchor" href="#相关命令-1" aria-label="Permalink to &quot;相关命令&quot;">​</a></h4><h5 id="添加-修改数据" tabindex="-1">添加/修改数据 <a class="header-anchor" href="#添加-修改数据" aria-label="Permalink to &quot;添加/修改数据&quot;">​</a></h5><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 添加/修改数据：</span></span>
<span class="line"><span style="color:#F69D50;">hset</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">field</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">value</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 添加/修改多个数据：</span></span>
<span class="line"><span style="color:#F69D50;">hmset</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">field1</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">value1</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">field2</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">value2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 设置指定字段的数值数据增加指定范围的值</span></span>
<span class="line"><span style="color:#F69D50;">hincrby</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">field</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">increment</span></span>
<span class="line"><span style="color:#F69D50;">hincrbyfloat</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">field</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">increment</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># Redis Hsetnx 命令用于为哈希表中不存在的的字段赋值 。</span></span>
<span class="line"><span style="color:#768390;"># 如果哈希表不存在，一个新的哈希表被创建并进行 HSET 操作。如果字段已经存在于哈希表中，操作无效。</span></span>
<span class="line"><span style="color:#F69D50;">hsetnx</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">field</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">value</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 添加/修改数据：</span></span>
<span class="line"><span style="color:#6F42C1;">hset</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">field</span><span style="color:#24292E;"> </span><span style="color:#032F62;">value</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 添加/修改多个数据：</span></span>
<span class="line"><span style="color:#6F42C1;">hmset</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">field1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">value1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">field2</span><span style="color:#24292E;"> </span><span style="color:#032F62;">value2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置指定字段的数值数据增加指定范围的值</span></span>
<span class="line"><span style="color:#6F42C1;">hincrby</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">field</span><span style="color:#24292E;"> </span><span style="color:#032F62;">increment</span></span>
<span class="line"><span style="color:#6F42C1;">hincrbyfloat</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">field</span><span style="color:#24292E;"> </span><span style="color:#032F62;">increment</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Redis Hsetnx 命令用于为哈希表中不存在的的字段赋值 。</span></span>
<span class="line"><span style="color:#6A737D;"># 如果哈希表不存在，一个新的哈希表被创建并进行 HSET 操作。如果字段已经存在于哈希表中，操作无效。</span></span>
<span class="line"><span style="color:#6F42C1;">hsetnx</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">field</span><span style="color:#24292E;"> </span><span style="color:#032F62;">value</span></span></code></pre></div><h5 id="获取-1" tabindex="-1">获取 <a class="header-anchor" href="#获取-1" aria-label="Permalink to &quot;获取&quot;">​</a></h5><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 获取指定的field对应的值</span></span>
<span class="line"><span style="color:#F69D50;">hget</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">field</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 获取所有的field和value </span></span>
<span class="line"><span style="color:#F69D50;">hgetall</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 获取多个数据</span></span>
<span class="line"><span style="color:#F69D50;">hmget</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">field1</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">field2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 获取哈希表中字段的数量</span></span>
<span class="line"><span style="color:#F69D50;">hlen</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 获取哈希表中是否存在指定的字段</span></span>
<span class="line"><span style="color:#F69D50;">hexists</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">field</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 获取哈希表中所有的字段名或字段值</span></span>
<span class="line"><span style="color:#768390;"># 字段名：</span></span>
<span class="line"><span style="color:#F69D50;">hkeys</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span></span>
<span class="line"><span style="color:#768390;"># 字段值：</span></span>
<span class="line"><span style="color:#F69D50;">hvals</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 获取指定的field对应的值</span></span>
<span class="line"><span style="color:#6F42C1;">hget</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">field</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 获取所有的field和value </span></span>
<span class="line"><span style="color:#6F42C1;">hgetall</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 获取多个数据</span></span>
<span class="line"><span style="color:#6F42C1;">hmget</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">field1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">field2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 获取哈希表中字段的数量</span></span>
<span class="line"><span style="color:#6F42C1;">hlen</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 获取哈希表中是否存在指定的字段</span></span>
<span class="line"><span style="color:#6F42C1;">hexists</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">field</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 获取哈希表中所有的字段名或字段值</span></span>
<span class="line"><span style="color:#6A737D;"># 字段名：</span></span>
<span class="line"><span style="color:#6F42C1;">hkeys</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span></span>
<span class="line"><span style="color:#6A737D;"># 字段值：</span></span>
<span class="line"><span style="color:#6F42C1;">hvals</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span></span></code></pre></div><h5 id="删除-1" tabindex="-1">删除 <a class="header-anchor" href="#删除-1" aria-label="Permalink to &quot;删除&quot;">​</a></h5><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 删除： </span></span>
<span class="line"><span style="color:#F69D50;">hdel</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">field1</span><span style="color:#ADBAC7;">  [field2]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 删除： </span></span>
<span class="line"><span style="color:#6F42C1;">hdel</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">field1</span><span style="color:#24292E;">  [field2]</span></span></code></pre></div><h3 id="list-列表-linkedlist格式-支持重复元素" tabindex="-1">List（列表，linkedlist格式，支持重复元素） <a class="header-anchor" href="#list-列表-linkedlist格式-支持重复元素" aria-label="Permalink to &quot;List（列表，linkedlist格式，支持重复元素）&quot;">​</a></h3><p>  存储多个数据，并对数据进入存储空间的顺序进行区分</p><ul><li>存储结构 <ul><li>一个存储空间保存多个数据，且通过数据可以体现进入顺序</li></ul></li><li>使用场景 <ul><li>消息队列，用户消息时间线 ，文章的评论列表</li></ul></li><li>list类型 <ul><li>保存多个数据，底层使用双向链表存储结构实现</li></ul></li><li>注意 <ul><li>list中保存的数据都是string类型的，数据总容量是有限的，最多2^32 - 1 个元素 (4294967295)。</li><li>获取全部数据操作结束索引设置为-1</li></ul></li></ul><h4 id="相关命令-2" tabindex="-1">相关命令 <a class="header-anchor" href="#相关命令-2" aria-label="Permalink to &quot;相关命令&quot;">​</a></h4><h5 id="添加-1" tabindex="-1">添加 <a class="header-anchor" href="#添加-1" aria-label="Permalink to &quot;添加&quot;">​</a></h5><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 将元素加入列表左边</span></span>
<span class="line"><span style="color:#F69D50;">lpush</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">value1</span><span style="color:#ADBAC7;"> [value2]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 将元素加入列表右边</span></span>
<span class="line"><span style="color:#F69D50;">rpush</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">value1</span><span style="color:#ADBAC7;"> [value2]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 将元素加入列表左边</span></span>
<span class="line"><span style="color:#6F42C1;">lpush</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">value1</span><span style="color:#24292E;"> [value2]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 将元素加入列表右边</span></span>
<span class="line"><span style="color:#6F42C1;">rpush</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">value1</span><span style="color:#24292E;"> [value2]</span></span></code></pre></div><h5 id="获取-2" tabindex="-1">获取 <a class="header-anchor" href="#获取-2" aria-label="Permalink to &quot;获取&quot;">​</a></h5><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 范围获取：start从0开始；end设置为-1 为最后一个</span></span>
<span class="line"><span style="color:#F69D50;">lrange</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">start</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">end</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 获取第index个的数据，从0开始计算 </span></span>
<span class="line"><span style="color:#F69D50;">lindex</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">index</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 查询所有数量</span></span>
<span class="line"><span style="color:#F69D50;">llen</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span></span>
<span class="line"><span style="color:#ADBAC7;">      </span></span>
<span class="line"><span style="color:#768390;"># 获取并移除数据：</span></span>
<span class="line"><span style="color:#768390;"># 删除列表最左边的元素，并将元素返回</span></span>
<span class="line"><span style="color:#F69D50;">lpop</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 删除列表最右边的元素，并将元素返回</span></span>
<span class="line"><span style="color:#F69D50;">rpop</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#768390;"># 规定时间内获取并移除数据</span></span>
<span class="line"><span style="color:#768390;"># 命令移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止</span></span>
<span class="line"><span style="color:#F69D50;">blpop</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key1</span><span style="color:#ADBAC7;"> [key2] timeout</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。</span></span>
<span class="line"><span style="color:#F69D50;">brpop</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key1</span><span style="color:#ADBAC7;"> [key2] timeout</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 从列表中弹出一个值，将弹出的元素插入到另外一个列表中并返回它；如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。</span></span>
<span class="line"><span style="color:#F69D50;">brpoplpush</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">source</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">destination</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">timeout</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 范围获取：start从0开始；end设置为-1 为最后一个</span></span>
<span class="line"><span style="color:#6F42C1;">lrange</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">end</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 获取第index个的数据，从0开始计算 </span></span>
<span class="line"><span style="color:#6F42C1;">lindex</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">index</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查询所有数量</span></span>
<span class="line"><span style="color:#6F42C1;">llen</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span></span>
<span class="line"><span style="color:#24292E;">      </span></span>
<span class="line"><span style="color:#6A737D;"># 获取并移除数据：</span></span>
<span class="line"><span style="color:#6A737D;"># 删除列表最左边的元素，并将元素返回</span></span>
<span class="line"><span style="color:#6F42C1;">lpop</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 删除列表最右边的元素，并将元素返回</span></span>
<span class="line"><span style="color:#6F42C1;">rpop</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 规定时间内获取并移除数据</span></span>
<span class="line"><span style="color:#6A737D;"># 命令移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止</span></span>
<span class="line"><span style="color:#6F42C1;">blpop</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key1</span><span style="color:#24292E;"> [key2] timeout</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。</span></span>
<span class="line"><span style="color:#6F42C1;">brpop</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key1</span><span style="color:#24292E;"> [key2] timeout</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 从列表中弹出一个值，将弹出的元素插入到另外一个列表中并返回它；如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。</span></span>
<span class="line"><span style="color:#6F42C1;">brpoplpush</span><span style="color:#24292E;"> </span><span style="color:#032F62;">source</span><span style="color:#24292E;"> </span><span style="color:#032F62;">destination</span><span style="color:#24292E;"> </span><span style="color:#032F62;">timeout</span></span></code></pre></div><h5 id="删除-2" tabindex="-1">删除 <a class="header-anchor" href="#删除-2" aria-label="Permalink to &quot;删除&quot;">​</a></h5><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#F69D50;">lrem</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">count</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">value</span></span>
<span class="line"><span style="color:#768390;"># 根据参数 COUNT 的值，移除列表中与参数 VALUE 相等的元素。</span></span>
<span class="line"><span style="color:#768390;"># count &gt; 0 : 从表头开始向表尾搜索，移除与 VALUE 相等的元素，数量为 COUNT 。</span></span>
<span class="line"><span style="color:#768390;"># count &lt; 0 : 从表尾开始向表头搜索，移除与 VALUE 相等的元素，数量为 COUNT 的绝对值。</span></span>
<span class="line"><span style="color:#768390;"># count = 0 : 移除表中所有与 VALUE 相等的值。</span></span>
<span class="line"><span style="color:#768390;"># 示例：</span></span>
<span class="line"><span style="color:#F69D50;">127.0.0.1:6379&gt;</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">lrange</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">p</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">0</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-1</span></span>
<span class="line"><span style="color:#F69D50;">1</span><span style="color:#ADBAC7;">) </span><span style="color:#96D0FF;">&quot;1&quot;</span></span>
<span class="line"><span style="color:#F69D50;">2</span><span style="color:#ADBAC7;">) </span><span style="color:#96D0FF;">&quot;3&quot;</span></span>
<span class="line"><span style="color:#F69D50;">3</span><span style="color:#ADBAC7;">) </span><span style="color:#96D0FF;">&quot;1&quot;</span></span>
<span class="line"><span style="color:#F69D50;">4</span><span style="color:#ADBAC7;">) </span><span style="color:#96D0FF;">&quot;1&quot;</span></span>
<span class="line"><span style="color:#768390;"># p队列中有 1，3，1，1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 从左移除一个2</span></span>
<span class="line"><span style="color:#F69D50;">127.0.0.1:6379&gt;</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">lrem</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">p</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">1</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">2</span></span>
<span class="line"><span style="color:#ADBAC7;">(</span><span style="color:#F69D50;">integer</span><span style="color:#ADBAC7;">) 0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 从右移除一个1</span></span>
<span class="line"><span style="color:#F69D50;">127.0.0.1:6379&gt;</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">lrem</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">p</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">1</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">1</span></span>
<span class="line"><span style="color:#ADBAC7;">(</span><span style="color:#F69D50;">integer</span><span style="color:#ADBAC7;">) 1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 结果为3，1，1</span></span>
<span class="line"><span style="color:#F69D50;">127.0.0.1:6379&gt;</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">lrange</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">p</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">0</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-1</span></span>
<span class="line"><span style="color:#F69D50;">1</span><span style="color:#ADBAC7;">) </span><span style="color:#96D0FF;">&quot;3&quot;</span></span>
<span class="line"><span style="color:#F69D50;">2</span><span style="color:#ADBAC7;">) </span><span style="color:#96D0FF;">&quot;1&quot;</span></span>
<span class="line"><span style="color:#F69D50;">3</span><span style="color:#ADBAC7;">) </span><span style="color:#96D0FF;">&quot;1&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">lrem</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">count</span><span style="color:#24292E;"> </span><span style="color:#032F62;">value</span></span>
<span class="line"><span style="color:#6A737D;"># 根据参数 COUNT 的值，移除列表中与参数 VALUE 相等的元素。</span></span>
<span class="line"><span style="color:#6A737D;"># count &gt; 0 : 从表头开始向表尾搜索，移除与 VALUE 相等的元素，数量为 COUNT 。</span></span>
<span class="line"><span style="color:#6A737D;"># count &lt; 0 : 从表尾开始向表头搜索，移除与 VALUE 相等的元素，数量为 COUNT 的绝对值。</span></span>
<span class="line"><span style="color:#6A737D;"># count = 0 : 移除表中所有与 VALUE 相等的值。</span></span>
<span class="line"><span style="color:#6A737D;"># 示例：</span></span>
<span class="line"><span style="color:#6F42C1;">127.0.0.1:6379&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">lrange</span><span style="color:#24292E;"> </span><span style="color:#032F62;">p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-1</span></span>
<span class="line"><span style="color:#6F42C1;">1</span><span style="color:#24292E;">) </span><span style="color:#032F62;">&quot;1&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">2</span><span style="color:#24292E;">) </span><span style="color:#032F62;">&quot;3&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">3</span><span style="color:#24292E;">) </span><span style="color:#032F62;">&quot;1&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">4</span><span style="color:#24292E;">) </span><span style="color:#032F62;">&quot;1&quot;</span></span>
<span class="line"><span style="color:#6A737D;"># p队列中有 1，3，1，1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 从左移除一个2</span></span>
<span class="line"><span style="color:#6F42C1;">127.0.0.1:6379&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">lrem</span><span style="color:#24292E;"> </span><span style="color:#032F62;">p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#6F42C1;">integer</span><span style="color:#24292E;">) 0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 从右移除一个1</span></span>
<span class="line"><span style="color:#6F42C1;">127.0.0.1:6379&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">lrem</span><span style="color:#24292E;"> </span><span style="color:#032F62;">p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#6F42C1;">integer</span><span style="color:#24292E;">) 1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 结果为3，1，1</span></span>
<span class="line"><span style="color:#6F42C1;">127.0.0.1:6379&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">lrange</span><span style="color:#24292E;"> </span><span style="color:#032F62;">p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-1</span></span>
<span class="line"><span style="color:#6F42C1;">1</span><span style="color:#24292E;">) </span><span style="color:#032F62;">&quot;3&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">2</span><span style="color:#24292E;">) </span><span style="color:#032F62;">&quot;1&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">3</span><span style="color:#24292E;">) </span><span style="color:#032F62;">&quot;1&quot;</span></span></code></pre></div><h3 id="set-集合-不允许重复元素" tabindex="-1">Set（集合，不允许重复元素） <a class="header-anchor" href="#set-集合-不允许重复元素" aria-label="Permalink to &quot;Set（集合，不允许重复元素）&quot;">​</a></h3><p>  存储大量的数据，在查询方面提供更高的效率</p><ul><li>存储结构 <ul><li>能够保存大量的数据，高效的内部存储机制，便于查询</li></ul></li><li>使用场景 <ul><li>标签，共同好友（两个set实现交集、并集、差集）</li></ul></li><li>set类型 <ul><li>与hash存储结构完全相同，仅存储键，不存储值（nil），并且值是不允许重复的</li></ul></li><li>注意事项 <ul><li>set 类型不允许数据重复，如果添加的数据在 set 中已经存在，将只保留一份</li><li>set 虽然与hash的存储结构相同，但是无法启用hash中存储值的空间</li></ul></li></ul><h4 id="相关命令-3" tabindex="-1">相关命令 <a class="header-anchor" href="#相关命令-3" aria-label="Permalink to &quot;相关命令&quot;">​</a></h4><h5 id="添加-2" tabindex="-1">添加 <a class="header-anchor" href="#添加-2" aria-label="Permalink to &quot;添加&quot;">​</a></h5><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 添加数据：</span></span>
<span class="line"><span style="color:#F69D50;">sadd</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">value1</span><span style="color:#ADBAC7;"> [value2]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 添加数据：</span></span>
<span class="line"><span style="color:#6F42C1;">sadd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">value1</span><span style="color:#24292E;"> [value2]</span></span></code></pre></div><h5 id="获取-3" tabindex="-1">获取 <a class="header-anchor" href="#获取-3" aria-label="Permalink to &quot;获取&quot;">​</a></h5><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed has-diff vp-code-dark"><code><span class="line"><span style="color:#768390;"># 获取全部数据:</span></span>
<span class="line"><span style="color:#F69D50;">smembers</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 获取集合数据总量：</span></span>
<span class="line"><span style="color:#F69D50;">scard</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 判断集合中是否包含指定数据</span></span>
<span class="line"><span style="color:#F69D50;">sismember</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">member</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 返回集合中一个或多个随机数，由count决定数量</span></span>
<span class="line"><span style="color:#F69D50;">srandmember</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> [count]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 求两个集合的交、并、差集</span></span>
<span class="line"><span style="color:#768390;"># 返回给定所有集合的交集</span></span>
<span class="line"><span style="color:#F69D50;">sinter</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key1</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key2</span></span>
<span class="line"><span style="color:#768390;"># 返回给定所有集合的交集并存储在 destination 中</span></span>
<span class="line"><span style="color:#F69D50;">sinterstore</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">destination</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key1</span><span style="color:#ADBAC7;"> [key2]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 返回所有给定集合的并集</span></span>
<span class="line"><span style="color:#F69D50;">sunion</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key1</span><span style="color:#ADBAC7;"> [key2]</span></span>
<span class="line"><span style="color:#768390;"># 所有给定集合的并集存储在 destination 集合中</span></span>
<span class="line"><span style="color:#F69D50;">sunionstore</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">destination</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key1</span><span style="color:#ADBAC7;"> [key2]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 返回第一个集合与其他集合之间的差异</span></span>
<span class="line"><span style="color:#F69D50;">sdiff</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key1</span><span style="color:#ADBAC7;"> [key2]</span></span>
<span class="line"><span style="color:#768390;"># 返回给定所有集合的差集并存储在 destination 中</span></span>
<span class="line"><span style="color:#F69D50;">sdiffstore</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">destination</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key1</span><span style="color:#ADBAC7;"> [key2]</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 获取全部数据:</span></span>
<span class="line"><span style="color:#6F42C1;">smembers</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 获取集合数据总量：</span></span>
<span class="line"><span style="color:#6F42C1;">scard</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 判断集合中是否包含指定数据</span></span>
<span class="line"><span style="color:#6F42C1;">sismember</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">member</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 返回集合中一个或多个随机数，由count决定数量</span></span>
<span class="line"><span style="color:#6F42C1;">srandmember</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> [count]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 求两个集合的交、并、差集</span></span>
<span class="line"><span style="color:#6A737D;"># 返回给定所有集合的交集</span></span>
<span class="line"><span style="color:#6F42C1;">sinter</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key2</span></span>
<span class="line"><span style="color:#6A737D;"># 返回给定所有集合的交集并存储在 destination 中</span></span>
<span class="line"><span style="color:#6F42C1;">sinterstore</span><span style="color:#24292E;"> </span><span style="color:#032F62;">destination</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key1</span><span style="color:#24292E;"> [key2]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 返回所有给定集合的并集</span></span>
<span class="line"><span style="color:#6F42C1;">sunion</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key1</span><span style="color:#24292E;"> [key2]</span></span>
<span class="line"><span style="color:#6A737D;"># 所有给定集合的并集存储在 destination 集合中</span></span>
<span class="line"><span style="color:#6F42C1;">sunionstore</span><span style="color:#24292E;"> </span><span style="color:#032F62;">destination</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key1</span><span style="color:#24292E;"> [key2]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 返回第一个集合与其他集合之间的差异</span></span>
<span class="line"><span style="color:#6F42C1;">sdiff</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key1</span><span style="color:#24292E;"> [key2]</span></span>
<span class="line"><span style="color:#6A737D;"># 返回给定所有集合的差集并存储在 destination 中</span></span>
<span class="line"><span style="color:#6F42C1;">sdiffstore</span><span style="color:#24292E;"> </span><span style="color:#032F62;">destination</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key1</span><span style="color:#24292E;"> [key2]</span></span></code></pre></div><h5 id="删除-3" tabindex="-1">删除 <a class="header-anchor" href="#删除-3" aria-label="Permalink to &quot;删除&quot;">​</a></h5><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 删除set集合中的某个元素：</span></span>
<span class="line"><span style="color:#F69D50;">srem</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">value</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 移除并返回集合中的一个随机元素</span></span>
<span class="line"><span style="color:#F69D50;">spop</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> [count]</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#768390;"># 将 member 元素从 source 集合移动到 destination 集合</span></span>
<span class="line"><span style="color:#F69D50;">smove</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">source</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">destination</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">member</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 删除set集合中的某个元素：</span></span>
<span class="line"><span style="color:#6F42C1;">srem</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">value</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 移除并返回集合中的一个随机元素</span></span>
<span class="line"><span style="color:#6F42C1;">spop</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> [count]</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 将 member 元素从 source 集合移动到 destination 集合</span></span>
<span class="line"><span style="color:#6F42C1;">smove</span><span style="color:#24292E;"> </span><span style="color:#032F62;">source</span><span style="color:#24292E;"> </span><span style="color:#032F62;">destination</span><span style="color:#24292E;"> </span><span style="color:#032F62;">member</span></span></code></pre></div><h3 id="sorted-set-有序集合-不允许重复元素-且元素有顺序" tabindex="-1">Sorted Set（有序集合，不允许重复元素，且元素有顺序） <a class="header-anchor" href="#sorted-set-有序集合-不允许重复元素-且元素有顺序" aria-label="Permalink to &quot;Sorted Set（有序集合，不允许重复元素，且元素有顺序）&quot;">​</a></h3><p>  数据排序有利于数据的有效展示，需要提供一种可以根据自身特征进行排序的方式</p><ul><li>存储结构 <ul><li>新的存储模型，可以保存可排序的数据</li></ul></li><li>使用场景 <ul><li>排行榜</li></ul></li><li>sorted_set类型 <ul><li>在set的存储结构基础上添加可排序字段</li></ul></li><li>注意事项 <ul><li>score保存的数据存储空间是64位，如果是整数范围是-9007199254740992~9007199254740992</li><li>score保存的数据也可以是一个双精度的double值，基于双精度浮点数的特征，可能会丢失精度，使用时候要慎重</li><li>sorted_set底层存储还是基于set结构的，因此数据不能重复，如果重复添加相同的数据，score值将被反复覆盖，保留最后一次修改结果</li></ul></li></ul><h4 id="相关命令-4" tabindex="-1">相关命令 <a class="header-anchor" href="#相关命令-4" aria-label="Permalink to &quot;相关命令&quot;">​</a></h4><h5 id="添加-3" tabindex="-1">添加 <a class="header-anchor" href="#添加-3" aria-label="Permalink to &quot;添加&quot;">​</a></h5><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 添加数据：</span></span>
<span class="line"><span style="color:#F69D50;">zadd</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">score1</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">member1</span><span style="color:#ADBAC7;"> [score2 </span><span style="color:#96D0FF;">member2]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 添加数据：</span></span>
<span class="line"><span style="color:#6F42C1;">zadd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">score1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">member1</span><span style="color:#24292E;"> [score2 </span><span style="color:#032F62;">member2]</span></span></code></pre></div><h5 id="获取-4" tabindex="-1">获取 <a class="header-anchor" href="#获取-4" aria-label="Permalink to &quot;获取&quot;">​</a></h5><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 通过索引区间返回有序集合指定区间内的成员</span></span>
<span class="line"><span style="color:#F69D50;">zrange</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">start</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">stop</span><span style="color:#ADBAC7;"> [WITHSCORES]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 按条件获取数据：通过分数返回有序集合指定区间内的成员</span></span>
<span class="line"><span style="color:#F69D50;">zrangebyscore</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">min</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">max</span><span style="color:#ADBAC7;"> [WITHSCORES] [LIMIT]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 返回有序集中指定区间内的成员，通过索引，分数从高到低</span></span>
<span class="line"><span style="color:#F69D50;">zrevrange</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">start</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">stop</span><span style="color:#ADBAC7;"> [WITHSCORES]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 返回有序集中指定分数区间内的成员，分数从高到低排序</span></span>
<span class="line"><span style="color:#F69D50;">zrevrangebyscore</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">max</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">min</span><span style="color:#ADBAC7;"> [WITHSCORES]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 获取集合数据总量：</span></span>
<span class="line"><span style="color:#768390;"># 获取有序集合的成员数：</span></span>
<span class="line"><span style="color:#F69D50;">zcard</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 计算在有序集合中指定区间分数的成员数 </span></span>
<span class="line"><span style="color:#F69D50;">zcount</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">min</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">max</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#768390;"># 集合交、并操作：</span></span>
<span class="line"><span style="color:#768390;"># 计算给定的一个或多个有序集的交集并将结果集存储在新的有序集合 destination 中</span></span>
<span class="line"><span style="color:#768390;"># 默认情况下，结果集中某个成员的分数值是所有给定集下该成员分数值之和。</span></span>
<span class="line"><span style="color:#768390;"># numkeys 代表要合并几个集合</span></span>
<span class="line"><span style="color:#F69D50;">zinterstore</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">destination</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">numkeys</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> [key </span><span style="color:#96D0FF;">...]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 计算给定的一个或多个有序集的并集，并存储在新的 key 中</span></span>
<span class="line"><span style="color:#F69D50;">zunionstore</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">destination</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">numkeys</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> [key </span><span style="color:#96D0FF;">...]</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#768390;"># 获取数据对应的索引（排名）</span></span>
<span class="line"><span style="color:#768390;"># 返回有序集合中指定成员的索引，从小打到，从0开始计算，不存在为-1</span></span>
<span class="line"><span style="color:#F69D50;">zrank</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">member</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 返回有序集合中指定成员的排名，有序集成员按分数值递减(从大到小)排序</span></span>
<span class="line"><span style="color:#F69D50;">zrevrank</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">member</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#768390;"># 返回有序集中，成员的分数值</span></span>
<span class="line"><span style="color:#F69D50;">zscore</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">member</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 有序集合中对指定成员的分数加上增量 increment</span></span>
<span class="line"><span style="color:#F69D50;">zincrby</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">increment</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">member</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 通过索引区间返回有序集合指定区间内的成员</span></span>
<span class="line"><span style="color:#6F42C1;">zrange</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stop</span><span style="color:#24292E;"> [WITHSCORES]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 按条件获取数据：通过分数返回有序集合指定区间内的成员</span></span>
<span class="line"><span style="color:#6F42C1;">zrangebyscore</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">min</span><span style="color:#24292E;"> </span><span style="color:#032F62;">max</span><span style="color:#24292E;"> [WITHSCORES] [LIMIT]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 返回有序集中指定区间内的成员，通过索引，分数从高到低</span></span>
<span class="line"><span style="color:#6F42C1;">zrevrange</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stop</span><span style="color:#24292E;"> [WITHSCORES]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 返回有序集中指定分数区间内的成员，分数从高到低排序</span></span>
<span class="line"><span style="color:#6F42C1;">zrevrangebyscore</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">max</span><span style="color:#24292E;"> </span><span style="color:#032F62;">min</span><span style="color:#24292E;"> [WITHSCORES]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 获取集合数据总量：</span></span>
<span class="line"><span style="color:#6A737D;"># 获取有序集合的成员数：</span></span>
<span class="line"><span style="color:#6F42C1;">zcard</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 计算在有序集合中指定区间分数的成员数 </span></span>
<span class="line"><span style="color:#6F42C1;">zcount</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">min</span><span style="color:#24292E;"> </span><span style="color:#032F62;">max</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 集合交、并操作：</span></span>
<span class="line"><span style="color:#6A737D;"># 计算给定的一个或多个有序集的交集并将结果集存储在新的有序集合 destination 中</span></span>
<span class="line"><span style="color:#6A737D;"># 默认情况下，结果集中某个成员的分数值是所有给定集下该成员分数值之和。</span></span>
<span class="line"><span style="color:#6A737D;"># numkeys 代表要合并几个集合</span></span>
<span class="line"><span style="color:#6F42C1;">zinterstore</span><span style="color:#24292E;"> </span><span style="color:#032F62;">destination</span><span style="color:#24292E;"> </span><span style="color:#032F62;">numkeys</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> [key </span><span style="color:#032F62;">...]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 计算给定的一个或多个有序集的并集，并存储在新的 key 中</span></span>
<span class="line"><span style="color:#6F42C1;">zunionstore</span><span style="color:#24292E;"> </span><span style="color:#032F62;">destination</span><span style="color:#24292E;"> </span><span style="color:#032F62;">numkeys</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> [key </span><span style="color:#032F62;">...]</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 获取数据对应的索引（排名）</span></span>
<span class="line"><span style="color:#6A737D;"># 返回有序集合中指定成员的索引，从小打到，从0开始计算，不存在为-1</span></span>
<span class="line"><span style="color:#6F42C1;">zrank</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">member</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 返回有序集合中指定成员的排名，有序集成员按分数值递减(从大到小)排序</span></span>
<span class="line"><span style="color:#6F42C1;">zrevrank</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">member</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 返回有序集中，成员的分数值</span></span>
<span class="line"><span style="color:#6F42C1;">zscore</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">member</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 有序集合中对指定成员的分数加上增量 increment</span></span>
<span class="line"><span style="color:#6F42C1;">zincrby</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">increment</span><span style="color:#24292E;"> </span><span style="color:#032F62;">member</span></span></code></pre></div><h5 id="删除-4" tabindex="-1">删除 <a class="header-anchor" href="#删除-4" aria-label="Permalink to &quot;删除&quot;">​</a></h5><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 删除数据：</span></span>
<span class="line"><span style="color:#F69D50;">zrem</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">member</span><span style="color:#ADBAC7;"> [member </span><span style="color:#96D0FF;">...]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 移除有序集合中给定的排名区间的所有成员</span></span>
<span class="line"><span style="color:#F69D50;">zremrangebyrank</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">start</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">stop</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 移除有序集合中给定的分数区间的所有成员</span></span>
<span class="line"><span style="color:#F69D50;">zremrangebyscore</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">min</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">max</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 删除数据：</span></span>
<span class="line"><span style="color:#6F42C1;">zrem</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">member</span><span style="color:#24292E;"> [member </span><span style="color:#032F62;">...]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 移除有序集合中给定的排名区间的所有成员</span></span>
<span class="line"><span style="color:#6F42C1;">zremrangebyrank</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stop</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 移除有序集合中给定的分数区间的所有成员</span></span>
<span class="line"><span style="color:#6F42C1;">zremrangebyscore</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">min</span><span style="color:#24292E;"> </span><span style="color:#032F62;">max</span></span></code></pre></div><h2 id="key的通用操作指令" tabindex="-1">key的通用操作指令 <a class="header-anchor" href="#key的通用操作指令" aria-label="Permalink to &quot;key的通用操作指令&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 删除指定key</span></span>
<span class="line"><span style="color:#F69D50;">del</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 获取key是否存在</span></span>
<span class="line"><span style="color:#F69D50;">exists</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 获取key的类型</span></span>
<span class="line"><span style="color:#6CB6FF;">type</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 为指定key设置有效期:</span></span>
<span class="line"><span style="color:#768390;"># 为给定 key 设置过期时间，单位为秒</span></span>
<span class="line"><span style="color:#F69D50;">expire</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">seconds</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 为给定 key 设置过期时间，单位为毫秒</span></span>
<span class="line"><span style="color:#F69D50;">pexpire</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">milliseconds</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 时间参数是 UNIX 时间戳(unix timestamp)。</span></span>
<span class="line"><span style="color:#F69D50;">expireat</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">timestamp</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 设置 key 过期时间的时间戳(unix timestamp) 以毫秒计</span></span>
<span class="line"><span style="color:#F69D50;">pexpireat</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">milliseconds-timestamp</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#768390;"># 获取key的有效时间</span></span>
<span class="line"><span style="color:#768390;"># 以秒为单位，返回给定 key 的剩余生存时间(TTL, time to live)。</span></span>
<span class="line"><span style="color:#F69D50;">ttl</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span></span>
<span class="line"><span style="color:#768390;"># 结果</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#768390;"># XX ：剩余时间</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#768390;"># -1 ：永久有效的数据</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#768390;"># -2 ：已经过期的数据 或 被删除的数据 或 未定义的数据</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 以毫秒为单位返回 key 的剩余的过期时间。</span></span>
<span class="line"><span style="color:#F69D50;">pttl</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#768390;"># 切换key从时效性转换为永久性</span></span>
<span class="line"><span style="color:#F69D50;">persist</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 查询key：keys pattern</span></span>
<span class="line"><span style="color:#768390;"># 查询模式规则:</span></span>
<span class="line"><span style="color:#768390;"># * 匹配任意数量的任意符号 </span></span>
<span class="line"><span style="color:#768390;"># ? 配合一个任意符号 </span></span>
<span class="line"><span style="color:#768390;"># [] 匹配一个指定符号</span></span>
<span class="line"><span style="color:#F69D50;">keys</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">*</span><span style="color:#ADBAC7;">         </span><span style="color:#768390;"># 查询所有</span></span>
<span class="line"><span style="color:#F69D50;">keys</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">it</span><span style="color:#6CB6FF;">*</span><span style="color:#ADBAC7;">       </span><span style="color:#768390;"># 查询所有以it开头</span></span>
<span class="line"><span style="color:#F69D50;">keys</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">*</span><span style="color:#96D0FF;">heima</span><span style="color:#ADBAC7;">    </span><span style="color:#768390;"># 查询所有以heima结尾</span></span>
<span class="line"><span style="color:#F69D50;">keys</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">??heima</span><span style="color:#ADBAC7;">   </span><span style="color:#768390;"># 查询所有前面两个字符任意，后面以heima结尾</span></span>
<span class="line"><span style="color:#F69D50;">keys</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">user:?</span><span style="color:#ADBAC7;">    </span><span style="color:#768390;"># 查询所有以user:开头，最后一个字符任意</span></span>
<span class="line"><span style="color:#F69D50;">keys</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">u[st]er:1</span><span style="color:#ADBAC7;"> </span><span style="color:#768390;"># 查询所有以u开头，以er:1结尾，中间包含一个字母，s或t</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 为key改名</span></span>
<span class="line"><span style="color:#768390;"># 当 key 和 newKey 相同，或者 key 不存在时，返回一个错误。 </span></span>
<span class="line"><span style="color:#F69D50;">rename</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">newkey</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 仅当 newkey 不存在时，将 key 改名为 newkey 。</span></span>
<span class="line"><span style="color:#F69D50;">renamenx</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">newkey</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#768390;"># 对所有key排序</span></span>
<span class="line"><span style="color:#768390;"># 因为sort命令默认排序对象为数字，当需要对字符串进行排序时，需要显式地在sort命令之后添加alpha修饰符。</span></span>
<span class="line"><span style="color:#F69D50;">sort</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> [alpha]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 删除指定key</span></span>
<span class="line"><span style="color:#6F42C1;">del</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 获取key是否存在</span></span>
<span class="line"><span style="color:#6F42C1;">exists</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 获取key的类型</span></span>
<span class="line"><span style="color:#005CC5;">type</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 为指定key设置有效期:</span></span>
<span class="line"><span style="color:#6A737D;"># 为给定 key 设置过期时间，单位为秒</span></span>
<span class="line"><span style="color:#6F42C1;">expire</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">seconds</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 为给定 key 设置过期时间，单位为毫秒</span></span>
<span class="line"><span style="color:#6F42C1;">pexpire</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">milliseconds</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 时间参数是 UNIX 时间戳(unix timestamp)。</span></span>
<span class="line"><span style="color:#6F42C1;">expireat</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">timestamp</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置 key 过期时间的时间戳(unix timestamp) 以毫秒计</span></span>
<span class="line"><span style="color:#6F42C1;">pexpireat</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">milliseconds-timestamp</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 获取key的有效时间</span></span>
<span class="line"><span style="color:#6A737D;"># 以秒为单位，返回给定 key 的剩余生存时间(TTL, time to live)。</span></span>
<span class="line"><span style="color:#6F42C1;">ttl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span></span>
<span class="line"><span style="color:#6A737D;"># 结果</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># XX ：剩余时间</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># -1 ：永久有效的数据</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># -2 ：已经过期的数据 或 被删除的数据 或 未定义的数据</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 以毫秒为单位返回 key 的剩余的过期时间。</span></span>
<span class="line"><span style="color:#6F42C1;">pttl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 切换key从时效性转换为永久性</span></span>
<span class="line"><span style="color:#6F42C1;">persist</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查询key：keys pattern</span></span>
<span class="line"><span style="color:#6A737D;"># 查询模式规则:</span></span>
<span class="line"><span style="color:#6A737D;"># * 匹配任意数量的任意符号 </span></span>
<span class="line"><span style="color:#6A737D;"># ? 配合一个任意符号 </span></span>
<span class="line"><span style="color:#6A737D;"># [] 匹配一个指定符号</span></span>
<span class="line"><span style="color:#6F42C1;">keys</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#24292E;">         </span><span style="color:#6A737D;"># 查询所有</span></span>
<span class="line"><span style="color:#6F42C1;">keys</span><span style="color:#24292E;"> </span><span style="color:#032F62;">it</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">       </span><span style="color:#6A737D;"># 查询所有以it开头</span></span>
<span class="line"><span style="color:#6F42C1;">keys</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#032F62;">heima</span><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 查询所有以heima结尾</span></span>
<span class="line"><span style="color:#6F42C1;">keys</span><span style="color:#24292E;"> </span><span style="color:#032F62;">??heima</span><span style="color:#24292E;">   </span><span style="color:#6A737D;"># 查询所有前面两个字符任意，后面以heima结尾</span></span>
<span class="line"><span style="color:#6F42C1;">keys</span><span style="color:#24292E;"> </span><span style="color:#032F62;">user:?</span><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 查询所有以user:开头，最后一个字符任意</span></span>
<span class="line"><span style="color:#6F42C1;">keys</span><span style="color:#24292E;"> </span><span style="color:#032F62;">u[st]er:1</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 查询所有以u开头，以er:1结尾，中间包含一个字母，s或t</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 为key改名</span></span>
<span class="line"><span style="color:#6A737D;"># 当 key 和 newKey 相同，或者 key 不存在时，返回一个错误。 </span></span>
<span class="line"><span style="color:#6F42C1;">rename</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">newkey</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 仅当 newkey 不存在时，将 key 改名为 newkey 。</span></span>
<span class="line"><span style="color:#6F42C1;">renamenx</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">newkey</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 对所有key排序</span></span>
<span class="line"><span style="color:#6A737D;"># 因为sort命令默认排序对象为数字，当需要对字符串进行排序时，需要显式地在sort命令之后添加alpha修饰符。</span></span>
<span class="line"><span style="color:#6F42C1;">sort</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> [alpha]</span></span></code></pre></div><h2 id="数据库的通用操作" tabindex="-1">数据库的通用操作 <a class="header-anchor" href="#数据库的通用操作" aria-label="Permalink to &quot;数据库的通用操作&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 切换数据库</span></span>
<span class="line"><span style="color:#F47067;">select</span><span style="color:#ADBAC7;"> index</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 数据移动</span></span>
<span class="line"><span style="color:#F69D50;">move</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">db</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 数据清除</span></span>
<span class="line"><span style="color:#768390;"># 当前数据库的 key 的数量</span></span>
<span class="line"><span style="color:#F69D50;">dbsize</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 删除当前数据库的所有key </span></span>
<span class="line"><span style="color:#F69D50;">flushdb</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 删除所有数据库的所有key</span></span>
<span class="line"><span style="color:#F69D50;">flushall</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 切换数据库</span></span>
<span class="line"><span style="color:#D73A49;">select</span><span style="color:#24292E;"> index</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 数据移动</span></span>
<span class="line"><span style="color:#6F42C1;">move</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">db</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 数据清除</span></span>
<span class="line"><span style="color:#6A737D;"># 当前数据库的 key 的数量</span></span>
<span class="line"><span style="color:#6F42C1;">dbsize</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 删除当前数据库的所有key </span></span>
<span class="line"><span style="color:#6F42C1;">flushdb</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 删除所有数据库的所有key</span></span>
<span class="line"><span style="color:#6F42C1;">flushall</span></span></code></pre></div><h2 id="持久化" tabindex="-1">持久化 <a class="header-anchor" href="#持久化" aria-label="Permalink to &quot;持久化&quot;">​</a></h2><ul><li>RDB（数据，快照）：将当前数据状态进行保存，快照形式，存储数据结果，存储格式简单，关注点在数据；</li><li>AOF（过程，日志）：将数据的操作过程进行保存，日志形式，存储操作过程，存储格式复杂，关注点在数据的操作过程；</li></ul><h3 id="rdb-redis-database" tabindex="-1">RDB（redis database） <a class="header-anchor" href="#rdb-redis-database" aria-label="Permalink to &quot;RDB（redis database）&quot;">​</a></h3><p>  save指令的执行会阻塞当前Redis服务器，直到当前RDB过程完成为止，有可能会造成长时间阻塞，线上环境不建议使用；</p><h4 id="_1、save" tabindex="-1">1、save <a class="header-anchor" href="#_1、save" aria-label="Permalink to &quot;1、save&quot;">​</a></h4><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 手动执行一次保存操作</span></span>
<span class="line"><span style="color:#F69D50;">sava</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 手动执行一次保存操作</span></span>
<span class="line"><span style="color:#6F42C1;">sava</span></span></code></pre></div><h5 id="save指令相关配置" tabindex="-1">save指令相关配置 <a class="header-anchor" href="#save指令相关配置" aria-label="Permalink to &quot;save指令相关配置&quot;">​</a></h5><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 说明：设置存储至本地数据库时是否压缩数据，默认为 yes，采用 LZF 压缩</span></span>
<span class="line"><span style="color:#768390;"># 经验：通常默认为开启状态，如果设置为no，可以节省 CPU 运行时间，但会使存储的文件变大（巨大）</span></span>
<span class="line"><span style="color:#F69D50;">rdbcompression</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 说明：设置是否进行RDB文件格式校验，该校验过程在写文件和读文件过程均进行</span></span>
<span class="line"><span style="color:#768390;"># 经验：通常默认为开启状态，如果设置为no，可以节约读写性过程约10%时间消耗，但是存储一定的数据损坏风险</span></span>
<span class="line"><span style="color:#F69D50;">rdbchecksum</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 说明：设置本地数据库文件名，默认值为 dump.rdb</span></span>
<span class="line"><span style="color:#768390;"># 经验：通常设置为dump-端口号.rdb</span></span>
<span class="line"><span style="color:#F69D50;">dbfilename</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">dump.rdb</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 说明：设置存储.rdb文件的路径</span></span>
<span class="line"><span style="color:#768390;"># 经验：通常设置成存储空间较大的目录中，目录名称data</span></span>
<span class="line"><span style="color:#F69D50;">dir</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">/usr/local/redis/data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 在redis.conf文件中配置</span></span>
<span class="line"><span style="color:#768390;"># 满足限定时间范围内key的变化数量达到指定数量即进行持久化</span></span>
<span class="line"><span style="color:#768390;"># second：监控时间范围；changes：监控key的变化量</span></span>
<span class="line"><span style="color:#F69D50;">save</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">&lt;</span><span style="color:#96D0FF;">secon</span><span style="color:#ADBAC7;">d</span><span style="color:#F47067;">&gt;</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">&lt;</span><span style="color:#96D0FF;">change</span><span style="color:#ADBAC7;">s</span><span style="color:#F47067;">&gt;</span></span>
<span class="line"><span style="color:#768390;"># eg：</span></span>
<span class="line"><span style="color:#F69D50;">save</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">900</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">1</span></span>
<span class="line"><span style="color:#F69D50;">save</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">300</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">10</span></span>
<span class="line"><span style="color:#F69D50;">save</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">60</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">10000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 说明：设置存储至本地数据库时是否压缩数据，默认为 yes，采用 LZF 压缩</span></span>
<span class="line"><span style="color:#6A737D;"># 经验：通常默认为开启状态，如果设置为no，可以节省 CPU 运行时间，但会使存储的文件变大（巨大）</span></span>
<span class="line"><span style="color:#6F42C1;">rdbcompression</span><span style="color:#24292E;"> </span><span style="color:#032F62;">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 说明：设置是否进行RDB文件格式校验，该校验过程在写文件和读文件过程均进行</span></span>
<span class="line"><span style="color:#6A737D;"># 经验：通常默认为开启状态，如果设置为no，可以节约读写性过程约10%时间消耗，但是存储一定的数据损坏风险</span></span>
<span class="line"><span style="color:#6F42C1;">rdbchecksum</span><span style="color:#24292E;"> </span><span style="color:#032F62;">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 说明：设置本地数据库文件名，默认值为 dump.rdb</span></span>
<span class="line"><span style="color:#6A737D;"># 经验：通常设置为dump-端口号.rdb</span></span>
<span class="line"><span style="color:#6F42C1;">dbfilename</span><span style="color:#24292E;"> </span><span style="color:#032F62;">dump.rdb</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 说明：设置存储.rdb文件的路径</span></span>
<span class="line"><span style="color:#6A737D;"># 经验：通常设置成存储空间较大的目录中，目录名称data</span></span>
<span class="line"><span style="color:#6F42C1;">dir</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/redis/data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 在redis.conf文件中配置</span></span>
<span class="line"><span style="color:#6A737D;"># 满足限定时间范围内key的变化数量达到指定数量即进行持久化</span></span>
<span class="line"><span style="color:#6A737D;"># second：监控时间范围；changes：监控key的变化量</span></span>
<span class="line"><span style="color:#6F42C1;">save</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">secon</span><span style="color:#24292E;">d</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">change</span><span style="color:#24292E;">s</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;"># eg：</span></span>
<span class="line"><span style="color:#6F42C1;">save</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">900</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#6F42C1;">save</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">300</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span></span>
<span class="line"><span style="color:#6F42C1;">save</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">60</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10000</span></span></code></pre></div><h5 id="提示" tabindex="-1">提示 <a class="header-anchor" href="#提示" aria-label="Permalink to &quot;提示&quot;">​</a></h5><ul><li>save配置要根据实际业务情况进行设置，频度过高或过低都会出现性能问题，结果可能是灾难性的；</li><li>save配置中对于second与changes设置通常具有互补对应关系，尽量不要设置成包含性关系；</li><li>save配置启动后执行的是bgsave操作</li></ul><h4 id="_2、bgsave" tabindex="-1">2、bgsave <a class="header-anchor" href="#_2、bgsave" aria-label="Permalink to &quot;2、bgsave&quot;">​</a></h4><p>  bgsave命令是针对save阻塞问题做的优化。Redis内部所有涉及到RDB操作都采用bgsave的方式，save命令可以放弃使用。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 手动启动后台保存操作，但不是立即执行</span></span>
<span class="line"><span style="color:#F69D50;">bgsave</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 手动启动后台保存操作，但不是立即执行</span></span>
<span class="line"><span style="color:#6F42C1;">bgsave</span></span></code></pre></div><h5 id="bgsave指令工作原理" tabindex="-1">bgsave指令工作原理 <a class="header-anchor" href="#bgsave指令工作原理" aria-label="Permalink to &quot;bgsave指令工作原理&quot;">​</a></h5><p><img src="`+C+`" alt="BgSave"></p><h5 id="bgsave指令相关配置" tabindex="-1">bgsave指令相关配置 <a class="header-anchor" href="#bgsave指令相关配置" aria-label="Permalink to &quot;bgsave指令相关配置&quot;">​</a></h5><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 说明：后台存储过程中如果出现错误现象，是否停止保存操作</span></span>
<span class="line"><span style="color:#768390;"># 经验：通常默认为开启状态</span></span>
<span class="line"><span style="color:#F69D50;">stop-writes-on-bgsave-error</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">yes</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 说明：后台存储过程中如果出现错误现象，是否停止保存操作</span></span>
<span class="line"><span style="color:#6A737D;"># 经验：通常默认为开启状态</span></span>
<span class="line"><span style="color:#6F42C1;">stop-writes-on-bgsave-error</span><span style="color:#24292E;"> </span><span style="color:#032F62;">yes</span></span></code></pre></div><h4 id="save和bgsave指令比对" tabindex="-1">save和bgsave指令比对 <a class="header-anchor" href="#save和bgsave指令比对" aria-label="Permalink to &quot;save和bgsave指令比对&quot;">​</a></h4><table><thead><tr><th>方式</th><th>save指令</th><th>bgsave指令</th></tr></thead><tbody><tr><td>读写</td><td>同步</td><td>异步</td></tr><tr><td>阻塞客户端指令</td><td>是</td><td>否</td></tr><tr><td>额外内存消耗</td><td>否</td><td>是</td></tr><tr><td>启动新进程</td><td>否</td><td>是</td></tr></tbody></table><h4 id="rdb的优缺点" tabindex="-1">RDB的优缺点 <a class="header-anchor" href="#rdb的优缺点" aria-label="Permalink to &quot;RDB的优缺点&quot;">​</a></h4><h5 id="优点" tabindex="-1">优点 <a class="header-anchor" href="#优点" aria-label="Permalink to &quot;优点&quot;">​</a></h5><ul><li>RDB是一个紧凑压缩的二进制文件，存储效率较高</li><li>RDB内部存储的是redis在某个时间点的数据快照，非常适合用于数据备份，全量复制等场景</li><li>RDB恢复数据的速度要比AOF快很多 -- 应用：服务器中每X小时执行bgsave备份，并将RDB文件拷贝到远程机器中，用于灾难恢复。</li></ul><h5 id="缺点" tabindex="-1">缺点 <a class="header-anchor" href="#缺点" aria-label="Permalink to &quot;缺点&quot;">​</a></h5><ul><li>RDB方式无论是执行指令还是利用配置，无法做到实时持久化，具有较大的可能性丢失数据</li><li>bgsave指令每次运行要执行fork操作创建子进程，要牺牲掉一些性能</li><li>Redis的众多版本中未进行RDB文件格式的版本统一，有可能出现各版本服务之间数据格式无法兼容现象</li></ul><h3 id="aof-append-only-file" tabindex="-1">AOF（Append Only File） <a class="header-anchor" href="#aof-append-only-file" aria-label="Permalink to &quot;AOF（Append Only File）&quot;">​</a></h3><p>  以独立日志的方式记录每次写命令，重启时再重新执行AOF文件中命令达到恢复数据的目的。AOF的主要作用是解决了数据持久化的实时性，目前已经是Redis持久化的主流方式。</p><h4 id="_1、aof写数据三种策略-appendfsync" tabindex="-1">1、AOF写数据三种策略(appendfsync) <a class="header-anchor" href="#_1、aof写数据三种策略-appendfsync" aria-label="Permalink to &quot;1、AOF写数据三种策略(appendfsync)&quot;">​</a></h4><ul><li>always(每次） <ul><li>每次写入操作均同步到AOF文件中，数据零误差，性能较低，不建议使用；</li></ul></li><li>everysec（每秒） <ul><li>每秒将缓冲区中的指令同步到AOF文件中，数据准确性较高，性能较高，建议使用，也是默认设置；</li><li>在系统突然宕机的情况下丢失1秒内的数据；</li></ul></li><li>no（系统控制） <ul><li>由操作系统控制每次同步到AOF文件的周期，整体过程不可控；</li></ul></li></ul><h4 id="_2、aof相关配置" tabindex="-1">2、AOF相关配置 <a class="header-anchor" href="#_2、aof相关配置" aria-label="Permalink to &quot;2、AOF相关配置&quot;">​</a></h4><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 是否开启AOF持久化功能，默认为no</span></span>
<span class="line"><span style="color:#F69D50;">appendonly</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">yes</span><span style="color:#F47067;">|</span><span style="color:#F69D50;">no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># AOF写数据策略</span></span>
<span class="line"><span style="color:#F69D50;">appendfsync</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">always</span><span style="color:#F47067;">|</span><span style="color:#F69D50;">everysec</span><span style="color:#F47067;">|</span><span style="color:#F69D50;">no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># AOF持久化文件名，默认文件名未appendonly.aof，建议配置为appendonly-端口号.aof</span></span>
<span class="line"><span style="color:#F69D50;">appendfilename</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">filename</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># AOF持久化文件保存路径，与RDB持久化文件保持一致即可</span></span>
<span class="line"><span style="color:#F69D50;">dir</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 是否开启AOF持久化功能，默认为no</span></span>
<span class="line"><span style="color:#6F42C1;">appendonly</span><span style="color:#24292E;"> </span><span style="color:#032F62;">yes</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># AOF写数据策略</span></span>
<span class="line"><span style="color:#6F42C1;">appendfsync</span><span style="color:#24292E;"> </span><span style="color:#032F62;">always</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">everysec</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># AOF持久化文件名，默认文件名未appendonly.aof，建议配置为appendonly-端口号.aof</span></span>
<span class="line"><span style="color:#6F42C1;">appendfilename</span><span style="color:#24292E;"> </span><span style="color:#032F62;">filename</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># AOF持久化文件保存路径，与RDB持久化文件保持一致即可</span></span>
<span class="line"><span style="color:#6F42C1;">dir</span></span></code></pre></div><h4 id="_3、aof重写" tabindex="-1">3、AOF重写 <a class="header-anchor" href="#_3、aof重写" aria-label="Permalink to &quot;3、AOF重写&quot;">​</a></h4><p>  随着命令不断写入AOF，文件会越来越大，为了解决这个问题，Redis引入了AOF重写机制压缩文件体积。</p><p>  AOF文件重写是将Redis进程内的数据转化为写命令同步到新AOF文件的过程。简单说就是将对同一个数据的若干个条命令执行结果转化成最终结果数据对应的指令进行记录。</p><h5 id="_3-1、aof重写作用" tabindex="-1">3.1、AOF重写作用 <a class="header-anchor" href="#_3-1、aof重写作用" aria-label="Permalink to &quot;3.1、AOF重写作用&quot;">​</a></h5><ul><li>降低磁盘占用量，提高磁盘利用率</li><li>提高持久化效率，降低持久化写时间，提高IO性能</li><li>降低数据恢复用时，提高数据恢复效率</li></ul><h5 id="_3-2、aof重写规则" tabindex="-1">3.2、AOF重写规则 <a class="header-anchor" href="#_3-2、aof重写规则" aria-label="Permalink to &quot;3.2、AOF重写规则&quot;">​</a></h5><ul><li>进程内已超时的数据不再写入文件</li><li>忽略无效指令，重写时使用进程内数据直接生成，这样新的AOF文件只保留最终数据的写入命令 <ul><li>如del key1、 hdel key2、srem key3、set key4 111、set key4 222等</li></ul></li><li>对同一数据的多条写命令合并为一条命令 <ul><li>如lpush list1 a、lpush list1 b、 lpush list1 c 可以转化为：lpush list1 a b c。</li><li>为防止数据量过大造成客户端缓冲区溢出，对list、set、hash、zset等类型，每条指令最多写入64个元素</li></ul></li></ul><h5 id="_3-3、重写方式" tabindex="-1">3.3、重写方式 <a class="header-anchor" href="#_3-3、重写方式" aria-label="Permalink to &quot;3.3、重写方式&quot;">​</a></h5><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 手动重写</span></span>
<span class="line"><span style="color:#F69D50;">bgrewriteaof</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 自动重写，配置</span></span>
<span class="line"><span style="color:#768390;"># auto-aof-rewrite-min-size &lt;size&gt; 当前aof文件大于多少字节后才触发</span></span>
<span class="line"><span style="color:#768390;"># auto-aof-rewrite-percentage &lt;percentage&gt;  aof文件增长比例，指当前aof文件比上次重写的增长比例大小。</span></span>
<span class="line"><span style="color:#F69D50;">auto-aof-rewrite-min-size</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">64</span><span style="color:#96D0FF;">mb</span></span>
<span class="line"><span style="color:#F69D50;">auto-aof-rewrite-percentage</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">100</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 手动重写</span></span>
<span class="line"><span style="color:#6F42C1;">bgrewriteaof</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 自动重写，配置</span></span>
<span class="line"><span style="color:#6A737D;"># auto-aof-rewrite-min-size &lt;size&gt; 当前aof文件大于多少字节后才触发</span></span>
<span class="line"><span style="color:#6A737D;"># auto-aof-rewrite-percentage &lt;percentage&gt;  aof文件增长比例，指当前aof文件比上次重写的增长比例大小。</span></span>
<span class="line"><span style="color:#6F42C1;">auto-aof-rewrite-min-size</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">64</span><span style="color:#032F62;">mb</span></span>
<span class="line"><span style="color:#6F42C1;">auto-aof-rewrite-percentage</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span></span></code></pre></div><h5 id="自动重写触发比对参数" tabindex="-1">自动重写触发比对参数 <a class="header-anchor" href="#自动重写触发比对参数" aria-label="Permalink to &quot;自动重写触发比对参数&quot;">​</a></h5><p>  运行指令info Persistence获取具体信息 <img src="`+m+`" alt="AutoRewrite"></p><h3 id="rdb和aof的区别" tabindex="-1">RDB和AOF的区别 <a class="header-anchor" href="#rdb和aof的区别" aria-label="Permalink to &quot;RDB和AOF的区别&quot;">​</a></h3><table><thead><tr><th>持久化方式</th><th>RDB</th><th>AOF</th></tr></thead><tbody><tr><td>占用存储空间</td><td>小（数据级：压缩）</td><td>大（指令级：重写）</td></tr><tr><td>存储速度</td><td>慢</td><td>快</td></tr><tr><td>恢复速度</td><td>快</td><td>慢</td></tr><tr><td>数据安全性</td><td>会丢失数据</td><td>依据策略决定</td></tr><tr><td>资源消耗</td><td>高/重量级</td><td>低/轻量级</td></tr><tr><td>启动优先级</td><td>低</td><td>高</td></tr></tbody></table><h2 id="事务" tabindex="-1">事务 <a class="header-anchor" href="#事务" aria-label="Permalink to &quot;事务&quot;">​</a></h2><p>  一个命令执行的队列，将一系列预定义命令包装成一个整体（一个队列）。当执行时，一次性按照添加顺序依次执行，中间不会被打断或者干扰。</p><h3 id="相关命令-5" tabindex="-1">相关命令 <a class="header-anchor" href="#相关命令-5" aria-label="Permalink to &quot;相关命令&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 开启事务：设定事务的开启位置，此指令执行后，后续的所有指令均加入到事务中</span></span>
<span class="line"><span style="color:#F69D50;">multi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 执行事务：设定事务的结束位置，同时执行事务。与multi成对出现，成对使用</span></span>
<span class="line"><span style="color:#768390;"># 加入事务的命令暂时进入到任务队列中，并没有立即执行，只有执行exec命令才开始执行</span></span>
<span class="line"><span style="color:#6CB6FF;">exec</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 取消事务：终止当前事务的定义，发生在multi之后，exec之前</span></span>
<span class="line"><span style="color:#F69D50;">discard</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 开启事务：设定事务的开启位置，此指令执行后，后续的所有指令均加入到事务中</span></span>
<span class="line"><span style="color:#6F42C1;">multi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 执行事务：设定事务的结束位置，同时执行事务。与multi成对出现，成对使用</span></span>
<span class="line"><span style="color:#6A737D;"># 加入事务的命令暂时进入到任务队列中，并没有立即执行，只有执行exec命令才开始执行</span></span>
<span class="line"><span style="color:#005CC5;">exec</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 取消事务：终止当前事务的定义，发生在multi之后，exec之前</span></span>
<span class="line"><span style="color:#6F42C1;">discard</span></span></code></pre></div><h3 id="注意事项" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项" aria-label="Permalink to &quot;注意事项&quot;">​</a></h3><ol><li>语法错误：指命令书写格式有误； <ul><li>处理结果：如果定义的事务中所包含的命令存在语法错误，整体事务中所有命令均不会执行。包括那些语法正确的命令。</li></ul></li><li>运行错误：指命令格式正确，但是无法正确的执行。例如对list进行incr操作； <ul><li>处理结果：能够正确运行的命令会执行，运行错误的命令不会被执行，已经执行完毕的命令对应的数据不会自动回滚，需要程序员自己在代码中实现回滚。</li></ul></li></ol><h2 id="redis常见的应用场景" tabindex="-1">Redis常见的应用场景 <a class="header-anchor" href="#redis常见的应用场景" aria-label="Permalink to &quot;Redis常见的应用场景&quot;">​</a></h2><h3 id="缓存-cache" tabindex="-1">缓存（Cache） <a class="header-anchor" href="#缓存-cache" aria-label="Permalink to &quot;缓存（Cache）&quot;">​</a></h3><p>  在该场景下，有一些存储于数据库中的数据会被频繁访问，如果频繁的访问数据库，数据库负载会升高，同时由于数据库IO比较慢，应用程序的响应会比较差。此时，如果引入Redis来存储这些被频繁访问的数据，就可以有效的降低数据库的负载，同时提高应用程序的请求响应。 <img src="`+b+'" alt="Cache"></p><h3 id="会话存储-session" tabindex="-1">会话存储（Session） <a class="header-anchor" href="#会话存储-session" aria-label="Permalink to &quot;会话存储（Session）&quot;">​</a></h3><p>  使用Redis来存储会话（Session）数据，可以实现在无状态的服务器之间共享用户相关的状态数据数据。</p><p>  当用户登录Web应用时候，将会话数据存储于Redis，并将唯一的会话ID（Session ID）返回到客户端的Cookie中。当用户再向应用发送请求时，会将此会话ID包含在请求中。无状态的Web服务器，根据这个会话ID从Redis中搜索相关的会话数据来进一步请求处理。 <img src="'+k+'" alt="Session"></p><h3 id="分布式锁-distributed-lock" tabindex="-1">分布式锁（Distributed Lock） <a class="header-anchor" href="#分布式锁-distributed-lock" aria-label="Permalink to &quot;分布式锁（Distributed Lock）&quot;">​</a></h3><p>  当我们在应用中部署了多个节点，这些节点需要操作同一个资源的时候会存在竞争。此时，我们可以使用Redis来作为分布式锁，以协调多个节点对共享资源的操作。 <img src="'+g+'" alt="DistributedLock"></p><p>  这里主要是用Redis的原子操作命令：SETNX，该命令仅允许key不存在的时候才能设置key。</p><p>  下图展示了一个简单用例。Client 1通过SETNX命令尝试创建lock 1234abcd。如果当前还没有这个key，那么将返回1。Client 1获得锁，就可以执行对共享资源的操作，操作完成之后，删除刚刚创建的lock（释放分布式锁）。如果Client 1在执行SETNX命令的时候，返回了0，说明有其他客户端占用了这key，那么等待一段时间（等其他节点释放）之后再尝试。 <img src="'+v+'" alt="SetNx"></p><h3 id="速率限制器-rate-limiter" tabindex="-1">速率限制器（Rate Limiter） <a class="header-anchor" href="#速率限制器-rate-limiter" aria-label="Permalink to &quot;速率限制器（Rate Limiter）&quot;">​</a></h3><p>  由于Redis提供了计数器功能，所以我们可以通过该能力，配合超时时间，来实现速率限制器，最常见的场景就是服务端是用的请求限流。 <img src="'+B+'" alt="RateLimiter"></p><p>  根据用户id或者ip来作为key，使用INCR命令来记录用户的请求数量。然后将该请求数量与允许的请求上限数量做比较，只有低于限制的时候，才会执行请求处理。如果超过限制，就拒绝请求。</p><p>  同时，请求数量的计数器需要设置一个时间窗口，比如：1分钟。也就是没过一分钟时间，计数器将被清零，重新计数。所以，当一个时间窗口中被限流之后，等到下一个时间窗口，就能恢复继续请求。以实现限制速率的效果。</p><h3 id="排行榜-rank-leaderboard" tabindex="-1">排行榜（Rank/Leaderboard） <a class="header-anchor" href="#排行榜-rank-leaderboard" aria-label="Permalink to &quot;排行榜（Rank/Leaderboard）&quot;">​</a></h3><p>  由于Redis提供了排序集合（Sorted Sets）的功能，所以很多游戏应用采用Redis来实现各种排行榜功能。 <img src="'+E+`" alt="Rank"></p><h2 id="锁" tabindex="-1">锁 <a class="header-anchor" href="#锁" aria-label="Permalink to &quot;锁&quot;">​</a></h2><h3 id="_1、监视锁" tabindex="-1">1、监视锁 <a class="header-anchor" href="#_1、监视锁" aria-label="Permalink to &quot;1、监视锁&quot;">​</a></h3><p>  对 key 添加监视锁，在执行exec前如果key发生了变化，终止事务执行</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 添加监视锁</span></span>
<span class="line"><span style="color:#F69D50;">watch</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key1</span><span style="color:#ADBAC7;"> [key2.....]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 取消对所有key的监视</span></span>
<span class="line"><span style="color:#F69D50;">unwatch</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 添加监视锁</span></span>
<span class="line"><span style="color:#6F42C1;">watch</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key1</span><span style="color:#24292E;"> [key2.....]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 取消对所有key的监视</span></span>
<span class="line"><span style="color:#6F42C1;">unwatch</span></span></code></pre></div><p>  由于WATCH命令的作用只是当被监控的键值被修改后阻止之后一个事务的执行，而不能保证其他客户端不修改这一键值，所以在一般的情况下我们需要在EXEC执行失败后重新执行整个函数。执行EXEC命令后会取消对所有键的监控，如果不想执行事务中的命令也可以使用UNWATCH命令来取消监控。</p><h3 id="_2、分布式锁" tabindex="-1">2、分布式锁 <a class="header-anchor" href="#_2、分布式锁" aria-label="Permalink to &quot;2、分布式锁&quot;">​</a></h3><p>  使用 setnx 设置一个公共锁：该方法是一种设计概念，依赖规范保障，具有风险性</p><p>  利用setnx命令的返回值特征，有值则返回设置失败，无值则返回设置成功</p><ul><li>对于返回设置成功的，拥有控制权，进行下一步的具体业务操作</li><li>对于返回设置失败的，不具有控制权，排队或等待</li></ul><p>  操作完毕通过del操作释放锁</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#F69D50;">setnx</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">lock-key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">value</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">setnx</span><span style="color:#24292E;"> </span><span style="color:#032F62;">lock-key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">value</span></span></code></pre></div><h3 id="_3、分布式锁改良" tabindex="-1">3、分布式锁改良 <a class="header-anchor" href="#_3、分布式锁改良" aria-label="Permalink to &quot;3、分布式锁改良&quot;">​</a></h3><p>  使用 expire 为锁key添加时间限定，到时不释放，放弃锁</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#F69D50;">expire</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">lock-key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">second</span></span>
<span class="line"><span style="color:#F69D50;">pexpire</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">lock-key</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">milliseconds</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">expire</span><span style="color:#24292E;"> </span><span style="color:#032F62;">lock-key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">second</span></span>
<span class="line"><span style="color:#6F42C1;">pexpire</span><span style="color:#24292E;"> </span><span style="color:#032F62;">lock-key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">milliseconds</span></span></code></pre></div><p>  由于操作通常都是微秒或毫秒级，因此该锁定时间不宜设置过大。具体时间需要业务测试后确认。</p><h2 id="数据删除策略" tabindex="-1">数据删除策略 <a class="header-anchor" href="#数据删除策略" aria-label="Permalink to &quot;数据删除策略&quot;">​</a></h2><h3 id="_1、定时删除" tabindex="-1">1、定时删除 <a class="header-anchor" href="#_1、定时删除" aria-label="Permalink to &quot;1、定时删除&quot;">​</a></h3><p>  创建一个定时器，当key设置有过期时间，且过期时间到达时，由定时器任务立即执行对键的删除操作；</p><ul><li>优点：节约内存，到时就删除，快速释放掉不必要的内存占用</li><li>缺点：CPU压力很大，无论CPU此时负载量多高，均占用CPU，会影响redis服务器响应时间和指令吞吐量</li></ul><p>  总结：用处理器性能换取存储空间 （拿时间换空间）</p><h3 id="_2、惰性删除" tabindex="-1">2、惰性删除： <a class="header-anchor" href="#_2、惰性删除" aria-label="Permalink to &quot;2、惰性删除：&quot;">​</a></h3><p>  数据到达过期时间，不做处理。等下次访问该数据时：</p><ul><li>如果未过期，返回数据</li><li>发现已过期，删除，返回不存在</li></ul><p>  优点：节约CPU性能，发现必须删除的时候才删除</p><p>  缺点：内存压力很大，出现长期占用内存的数据</p><p>  总结：用存储空间换取处理器性能（拿时间换空间）</p><h3 id="_3、定期删除" tabindex="-1">3、定期删除 <a class="header-anchor" href="#_3、定期删除" aria-label="Permalink to &quot;3、定期删除&quot;">​</a></h3><p>  周期性轮询redis库中的时效性数据，采用随机抽取的策略，利用过期数据占比的方式控制删除频度</p><ul><li>特点1：CPU性能占用设置有峰值，检测频度可自定义设置</li><li>特点2：内存压力不是很大，长期占用内存的冷数据会被持续清理</li></ul><p>  总结：周期性抽查存储空间（随机抽查，重点抽查）</p><h2 id="逐出算法" tabindex="-1">逐出算法 <a class="header-anchor" href="#逐出算法" aria-label="Permalink to &quot;逐出算法&quot;">​</a></h2><p>  当新数据进入redis时，如果内存不足：</p><ul><li>Redis使用内存存储数据，在执行每一个命令前，会调用freeMemoryIfNeeded()检测内存是否充足。如果内存不满足新加入数据的最低存储要求，redis要临时删除一些数据为当前指令清理存储空间。清理数据的策略称为逐出算法。</li><li>注意：逐出数据的过程不是100%能够清理出足够的可使用的内存空间，如果不成功则反复执行。当对所有数据尝试完毕后，如果不能达到内存清理的要求，将出现错误信息。</li></ul><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#ADBAC7;">(</span><span style="color:#F69D50;">error</span><span style="color:#ADBAC7;">) OOM command not allowed when used memory </span><span style="color:#F47067;">&gt;</span><span style="color:#96D0FF;">&#39;maxmemory&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">(</span><span style="color:#6F42C1;">error</span><span style="color:#24292E;">) OOM command not allowed when used memory </span><span style="color:#D73A49;">&gt;</span><span style="color:#032F62;">&#39;maxmemory&#39;</span></span></code></pre></div><h3 id="影响数据逐出的相关配置" tabindex="-1">影响数据逐出的相关配置 <a class="header-anchor" href="#影响数据逐出的相关配置" aria-label="Permalink to &quot;影响数据逐出的相关配置&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 最大可使用内存：占用物理内存的比例，默认值为0，表示不限制。生产环境中根据需求设定，通常设置在50%以上。</span></span>
<span class="line"><span style="color:#F69D50;">maxmemory</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 每次选取待删除数据的个数</span></span>
<span class="line"><span style="color:#768390;"># 选取数据时并不会全库扫描，导致严重的性能消耗，降低读写性能。因此采用随机获取数据的方式作为待检测删除数据</span></span>
<span class="line"><span style="color:#F69D50;">maxmemory-samples</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 删除策略；达到最大内存后的，对被挑选出来的数据进行删除的策略</span></span>
<span class="line"><span style="color:#F69D50;">maxmemory-policy</span></span>
<span class="line"><span style="color:#768390;"># 检测易失数据（可能会过期的数据集server.db[i].expires ）</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#768390;"># volatile-lru：挑选最近最少使用的数据淘汰</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#768390;"># volatile-lfu：挑选最近使用次数最少的数据淘汰</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#768390;"># volatile-ttl：挑选将要过期的数据淘汰</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#768390;"># volatile-random：任意选择数据淘汰</span></span>
<span class="line"><span style="color:#768390;"># 检测全库数据（所有数据集server.db[i].dict ）</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#768390;"># allkeys-lru：挑选最近最少使用的数据淘汰</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#768390;"># allkeys-lfu：挑选最近使用次数最少的数据淘汰</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#768390;"># allkeys-random：任意选择数据淘汰</span></span>
<span class="line"><span style="color:#768390;"># 放弃数据驱逐</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#768390;"># no-enviction（驱逐）：禁止驱逐数据（redis4.0中默认策略），会引发错误OOM（Out Of Memory）</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 最大可使用内存：占用物理内存的比例，默认值为0，表示不限制。生产环境中根据需求设定，通常设置在50%以上。</span></span>
<span class="line"><span style="color:#6F42C1;">maxmemory</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 每次选取待删除数据的个数</span></span>
<span class="line"><span style="color:#6A737D;"># 选取数据时并不会全库扫描，导致严重的性能消耗，降低读写性能。因此采用随机获取数据的方式作为待检测删除数据</span></span>
<span class="line"><span style="color:#6F42C1;">maxmemory-samples</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 删除策略；达到最大内存后的，对被挑选出来的数据进行删除的策略</span></span>
<span class="line"><span style="color:#6F42C1;">maxmemory-policy</span></span>
<span class="line"><span style="color:#6A737D;"># 检测易失数据（可能会过期的数据集server.db[i].expires ）</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># volatile-lru：挑选最近最少使用的数据淘汰</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># volatile-lfu：挑选最近使用次数最少的数据淘汰</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># volatile-ttl：挑选将要过期的数据淘汰</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># volatile-random：任意选择数据淘汰</span></span>
<span class="line"><span style="color:#6A737D;"># 检测全库数据（所有数据集server.db[i].dict ）</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># allkeys-lru：挑选最近最少使用的数据淘汰</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># allkeys-lfu：挑选最近使用次数最少的数据淘汰</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># allkeys-random：任意选择数据淘汰</span></span>
<span class="line"><span style="color:#6A737D;"># 放弃数据驱逐</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># no-enviction（驱逐）：禁止驱逐数据（redis4.0中默认策略），会引发错误OOM（Out Of Memory）</span></span></code></pre></div><h2 id="服务器相关配置" tabindex="-1">服务器相关配置 <a class="header-anchor" href="#服务器相关配置" aria-label="Permalink to &quot;服务器相关配置&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 设置服务器以守护进程的方式运行</span></span>
<span class="line"><span style="color:#F69D50;">daemonize</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">yes</span><span style="color:#F47067;">|</span><span style="color:#F69D50;">no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 绑定主机地址</span></span>
<span class="line"><span style="color:#F69D50;">bind</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">127.0</span><span style="color:#96D0FF;">.0.1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 设置服务器端口号</span></span>
<span class="line"><span style="color:#F69D50;">port</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">6379</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 设置数据库数量</span></span>
<span class="line"><span style="color:#F69D50;">databases</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">16</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 设置服务器以指定日志记录级别</span></span>
<span class="line"><span style="color:#768390;"># 注意：日志级别开发期设置为verbose即可，生产环境中配置为notice，简化日志输出量，降低写日志IO的频度</span></span>
<span class="line"><span style="color:#F69D50;">loglevel</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">debug</span><span style="color:#F47067;">|</span><span style="color:#F69D50;">verbose</span><span style="color:#F47067;">|</span><span style="color:#F69D50;">notice</span><span style="color:#F47067;">|</span><span style="color:#F69D50;">warning</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 日志记录文件名</span></span>
<span class="line"><span style="color:#F69D50;">logfile</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">端口号.log</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 设置同一时间最大客户端连接数，默认无限制。当客户端连接到达上限，Redis会关闭新的连接</span></span>
<span class="line"><span style="color:#F69D50;">maxclients</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">10000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 客户端闲置等待最大时长，达到最大值后关闭连接。如需关闭该功能，设置为 0</span></span>
<span class="line"><span style="color:#F69D50;">timeout</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">300</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 导入并加载指定配置文件信息，用于快速创建redis公共配置较多的redis实例配置文件，便于维护</span></span>
<span class="line"><span style="color:#F69D50;">include</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">/path/server-端口号.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 设置服务器以守护进程的方式运行</span></span>
<span class="line"><span style="color:#6F42C1;">daemonize</span><span style="color:#24292E;"> </span><span style="color:#032F62;">yes</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 绑定主机地址</span></span>
<span class="line"><span style="color:#6F42C1;">bind</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">127.0</span><span style="color:#032F62;">.0.1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置服务器端口号</span></span>
<span class="line"><span style="color:#6F42C1;">port</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">6379</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置数据库数量</span></span>
<span class="line"><span style="color:#6F42C1;">databases</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">16</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置服务器以指定日志记录级别</span></span>
<span class="line"><span style="color:#6A737D;"># 注意：日志级别开发期设置为verbose即可，生产环境中配置为notice，简化日志输出量，降低写日志IO的频度</span></span>
<span class="line"><span style="color:#6F42C1;">loglevel</span><span style="color:#24292E;"> </span><span style="color:#032F62;">debug</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">verbose</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">notice</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">warning</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 日志记录文件名</span></span>
<span class="line"><span style="color:#6F42C1;">logfile</span><span style="color:#24292E;"> </span><span style="color:#032F62;">端口号.log</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置同一时间最大客户端连接数，默认无限制。当客户端连接到达上限，Redis会关闭新的连接</span></span>
<span class="line"><span style="color:#6F42C1;">maxclients</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 客户端闲置等待最大时长，达到最大值后关闭连接。如需关闭该功能，设置为 0</span></span>
<span class="line"><span style="color:#6F42C1;">timeout</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">300</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 导入并加载指定配置文件信息，用于快速创建redis公共配置较多的redis实例配置文件，便于维护</span></span>
<span class="line"><span style="color:#6F42C1;">include</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/path/server-端口号.conf</span></span></code></pre></div><h2 id="主从复制" tabindex="-1">主从复制 <a class="header-anchor" href="#主从复制" aria-label="Permalink to &quot;主从复制&quot;">​</a></h2><p>  为了避免单点Redis服务器故障，准备多台服务器，互相连通。</p><p>  将数据复制多个副本保存在不同的服务器上，连接在一起，并保证数据是同步的。即使有其中一台服务器宕机，其他服务器依然可以继续提供服务，实现Redis的高可用，同时实现数据冗余备份。</p><p>  主从复制即将master中的数据即时、有效的复制到slave中。 <img src="`+f+'" alt="MasterSlave"></p><ul><li>特征 <ul><li>一个master可以拥有多个slave，一个slave只对应一个master</li></ul></li><li>职责 <ul><li>master <ul><li>写数据</li><li>执行写操作时，将出现变化的数据自动同步到slave</li><li>读数据（可忽略）</li></ul></li><li>slave <ul><li>读数据</li><li>写数据（禁止）</li></ul></li></ul></li><li>主从复制的作用 <ul><li>读写分离：master写、slave读，提高服务器的读写负载能力；</li><li>负载均衡：基于主从结构，配合读写分离，由slave分担master负载，并根据需求的变化，改变slave的数量，通过多个从节点分担数据读取负载，大大提高Redis服务器并发量与数据吞吐量；</li><li>故障恢复：当master出现问题时，由slave提供服务，实现快速的故障恢复；</li><li>数据冗余：实现数据热备份，是持久化之外的一种数据冗余方式；</li><li>高可用基石：基于主从复制，构建哨兵模式与集群，实现Redis的高可用方案；</li></ul></li></ul><h3 id="主从复制3个阶段" tabindex="-1">主从复制3个阶段 <a class="header-anchor" href="#主从复制3个阶段" aria-label="Permalink to &quot;主从复制3个阶段&quot;">​</a></h3><ol><li>建立连接阶段（即准备阶段）；</li><li>数据同步阶段；</li><li>命令传播阶段. <img src="'+q+'" alt="MasterSlaveStep"></li></ol><h4 id="_1、建立连接阶段" tabindex="-1">1、建立连接阶段 <a class="header-anchor" href="#_1、建立连接阶段" aria-label="Permalink to &quot;1、建立连接阶段&quot;">​</a></h4><p>  建立slave到master的连接，使master能够识别slave，并保存slave端口号 <img src="'+x+`" alt="MasterSlaveConn"></p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 主从连接（slave连接master）</span></span>
<span class="line"><span style="color:#768390;"># 1、客户端发送命令:</span></span>
<span class="line"><span style="color:#F69D50;">slaveof</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">&lt;</span><span style="color:#96D0FF;">masteri</span><span style="color:#ADBAC7;">p</span><span style="color:#F47067;">&gt;</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">&lt;</span><span style="color:#96D0FF;">masterpor</span><span style="color:#ADBAC7;">t</span><span style="color:#F47067;">&gt;</span></span>
<span class="line"><span style="color:#F69D50;">slaveof</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">192.168</span><span style="color:#96D0FF;">.80.128</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">6379</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 2、启动服务器参数:</span></span>
<span class="line"><span style="color:#F69D50;">redis-server</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-slaveof</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">&lt;</span><span style="color:#96D0FF;">masteri</span><span style="color:#ADBAC7;">p</span><span style="color:#F47067;">&gt;</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">&lt;</span><span style="color:#96D0FF;">masterpor</span><span style="color:#ADBAC7;">t</span><span style="color:#F47067;">&gt;</span></span>
<span class="line"><span style="color:#F69D50;">redis-server</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">-slaveof</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">192.168</span><span style="color:#96D0FF;">.80.128</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">6379</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 3、服务器配置</span></span>
<span class="line"><span style="color:#F69D50;">slaveof</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">&lt;</span><span style="color:#96D0FF;">masteri</span><span style="color:#ADBAC7;">p</span><span style="color:#F47067;">&gt;</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">&lt;</span><span style="color:#96D0FF;">masterpor</span><span style="color:#ADBAC7;">t</span><span style="color:#F47067;">&gt;</span></span>
<span class="line"><span style="color:#F69D50;">slaveof</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">192.168</span><span style="color:#96D0FF;">.80.128</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">6379</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 主从断开连接：slave断开连接后，不会删除已有数据，只是不再接受master发送的数据</span></span>
<span class="line"><span style="color:#F69D50;">slaveof</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">no</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">one</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 授权访问设置：</span></span>
<span class="line"><span style="color:#768390;"># 1、master设置密码：（命令行）</span></span>
<span class="line"><span style="color:#F69D50;">config</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">set</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">requirepass</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">&lt;</span><span style="color:#96D0FF;">passwor</span><span style="color:#ADBAC7;">d</span><span style="color:#F47067;">&gt;</span></span>
<span class="line"><span style="color:#F69D50;">config</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">get</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">requirepass</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 2.1、slave客户端发送命令设置密码</span></span>
<span class="line"><span style="color:#F69D50;">auth</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">&lt;</span><span style="color:#96D0FF;">passwor</span><span style="color:#ADBAC7;">d</span><span style="color:#F47067;">&gt;</span></span>
<span class="line"><span style="color:#768390;"># 2.2 slave配置文件设置密码</span></span>
<span class="line"><span style="color:#F69D50;">masterauth</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">&lt;</span><span style="color:#96D0FF;">passwor</span><span style="color:#ADBAC7;">d</span><span style="color:#F47067;">&gt;</span></span>
<span class="line"><span style="color:#768390;"># 2.3 slave启动服务器设置密码</span></span>
<span class="line"><span style="color:#F69D50;">redis-server</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">–a</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">&lt;</span><span style="color:#96D0FF;">passwor</span><span style="color:#ADBAC7;">d</span><span style="color:#F47067;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 主从连接（slave连接master）</span></span>
<span class="line"><span style="color:#6A737D;"># 1、客户端发送命令:</span></span>
<span class="line"><span style="color:#6F42C1;">slaveof</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">masteri</span><span style="color:#24292E;">p</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">masterpor</span><span style="color:#24292E;">t</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">slaveof</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.80.128</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">6379</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 2、启动服务器参数:</span></span>
<span class="line"><span style="color:#6F42C1;">redis-server</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-slaveof</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">masteri</span><span style="color:#24292E;">p</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">masterpor</span><span style="color:#24292E;">t</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">redis-server</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-slaveof</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.80.128</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">6379</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 3、服务器配置</span></span>
<span class="line"><span style="color:#6F42C1;">slaveof</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">masteri</span><span style="color:#24292E;">p</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">masterpor</span><span style="color:#24292E;">t</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">slaveof</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.80.128</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">6379</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 主从断开连接：slave断开连接后，不会删除已有数据，只是不再接受master发送的数据</span></span>
<span class="line"><span style="color:#6F42C1;">slaveof</span><span style="color:#24292E;"> </span><span style="color:#032F62;">no</span><span style="color:#24292E;"> </span><span style="color:#032F62;">one</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 授权访问设置：</span></span>
<span class="line"><span style="color:#6A737D;"># 1、master设置密码：（命令行）</span></span>
<span class="line"><span style="color:#6F42C1;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set</span><span style="color:#24292E;"> </span><span style="color:#032F62;">requirepass</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">passwor</span><span style="color:#24292E;">d</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">requirepass</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 2.1、slave客户端发送命令设置密码</span></span>
<span class="line"><span style="color:#6F42C1;">auth</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">passwor</span><span style="color:#24292E;">d</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;"># 2.2 slave配置文件设置密码</span></span>
<span class="line"><span style="color:#6F42C1;">masterauth</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">passwor</span><span style="color:#24292E;">d</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;"># 2.3 slave启动服务器设置密码</span></span>
<span class="line"><span style="color:#6F42C1;">redis-server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">–a</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">passwor</span><span style="color:#24292E;">d</span><span style="color:#D73A49;">&gt;</span></span></code></pre></div><h4 id="_2、数据同步阶段" tabindex="-1">2、数据同步阶段 <a class="header-anchor" href="#_2、数据同步阶段" aria-label="Permalink to &quot;2、数据同步阶段&quot;">​</a></h4><ul><li>在slave初次连接master后，复制master中的所有数据到slave</li><li>将slave的数据库状态更新成master当前的数据库状态 <img src="`+P+`" alt="MasterSlaveSync"></li></ul><h5 id="数据同步阶段master说明" tabindex="-1">数据同步阶段master说明 <a class="header-anchor" href="#数据同步阶段master说明" aria-label="Permalink to &quot;数据同步阶段master说明&quot;">​</a></h5><ol><li>如果master数据量巨大，数据同步阶段应避开流量高峰期，避免造成master阻塞，影响业务正常执行；</li><li>复制缓冲区大小设定不合理，会导致数据溢出。如进行全量复制周期太长，进行部分复制时发现数据已经存在丢失的情况，必须进行第二次全量复制，致使slave陷入死循环状态；</li><li>master单机内存占用主机内存的比例不应过大，建议使用50%-70%的内存，留下30%-50%的内存用于执行bgsave命令和创建复制缓冲区；</li></ol><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 设置复制缓冲区大小</span></span>
<span class="line"><span style="color:#F69D50;">repl-backlog-size</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">1</span><span style="color:#96D0FF;">mb</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 设置复制缓冲区大小</span></span>
<span class="line"><span style="color:#6F42C1;">repl-backlog-size</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#032F62;">mb</span></span></code></pre></div><h5 id="数据同步阶段slave说明" tabindex="-1">数据同步阶段slave说明 <a class="header-anchor" href="#数据同步阶段slave说明" aria-label="Permalink to &quot;数据同步阶段slave说明&quot;">​</a></h5><ol><li>为避免slave进行全量复制、部分复制时服务器响应阻塞或数据不同步，建议关闭此期间的对外服务；</li><li>数据同步阶段，master发送给slave信息可以理解master是slave的一个客户端，主动向slave发送命令；</li><li>多个slave同时对master请求数据同步，master发送的RDB文件增多，会对带宽造成巨大冲击，如果master带宽不足，因此数据同步需要根据业务需求，适量错峰；</li><li>slave过多时，建议调整拓扑结构，由一主多从结构变为树状结构，中间的节点既是master，也是slave。注意使用树状结构时，由于层级深度，导致深度越高的slave与最顶层master间数据同步延迟较大，数据一致性变差，应谨慎选择。</li></ol><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#F69D50;">slave-serve-stale-data</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">yes</span><span style="color:#F47067;">|</span><span style="color:#F69D50;">no</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">slave-serve-stale-data</span><span style="color:#24292E;"> </span><span style="color:#032F62;">yes</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">no</span></span></code></pre></div><h4 id="_3、命令传播阶段" tabindex="-1">3、命令传播阶段 <a class="header-anchor" href="#_3、命令传播阶段" aria-label="Permalink to &quot;3、命令传播阶段&quot;">​</a></h4><ul><li>当master数据库状态被修改后，导致主从服务器数据库状态不一致，此时需要让主从数据同步到一致的状态，同步的动作称为命令传播；</li><li>master将接收到的数据变更命令发送给slave，slave接收命令后执行命令；</li></ul><h3 id="部分复制的三个核心要素" tabindex="-1">部分复制的三个核心要素 <a class="header-anchor" href="#部分复制的三个核心要素" aria-label="Permalink to &quot;部分复制的三个核心要素&quot;">​</a></h3><h4 id="服务器的运行-id-run-id" tabindex="-1">服务器的运行 id（run id） <a class="header-anchor" href="#服务器的运行-id-run-id" aria-label="Permalink to &quot;服务器的运行 id（run id）&quot;">​</a></h4><ul><li>概念：服务器运行ID是每一台服务器每次运行的身份识别码，一台服务器多次运行可以生成多个运行id；</li><li>组成：运行id由40位字符组成，是一个随机的十六进制字符； <ul><li>例如：fdc9ff13b9bbaab28db42b3d50f852bb5e3fcdce</li></ul></li><li>作用：运行id被用于在服务器间进行传输，识别身份； <ul><li>如果想两次操作均对同一台服务器进行，必须每次操作携带对应的运行id，用于对方识别</li></ul></li><li>实现方式：运行id在每台服务器启动时自动生成的，master在首次连接slave时，会将自己的运行ID发送给slave，slave保存此ID，通过info Server命令，可以查看节点的runid；</li></ul><h4 id="主服务器的复制积压缓冲区" tabindex="-1">主服务器的复制积压缓冲区 <a class="header-anchor" href="#主服务器的复制积压缓冲区" aria-label="Permalink to &quot;主服务器的复制积压缓冲区&quot;">​</a></h4><ul><li>复制缓冲区，又名复制积压缓冲区，是一个先进先出（FIFO）的队列，用于存储服务器执行过的命令，每次传播命令，master都会将传播的命令记录下来，并存储在复制缓冲区；</li><li>由来：每台服务器启动时，如果开启有AOF或被连接成为master节点，即创建复制缓冲区</li><li>作用：用于保存master收到的所有指令（仅影响数据变更的指令，例如set）</li></ul><h4 id="主从服务器的复制偏移量" tabindex="-1">主从服务器的复制偏移量 <a class="header-anchor" href="#主从服务器的复制偏移量" aria-label="Permalink to &quot;主从服务器的复制偏移量&quot;">​</a></h4><ul><li>概念：一个数字，描述复制缓冲区中的指令字节位置；</li><li>分类： <ul><li>master复制偏移量：记录发送给所有slave的指令字节对应的位置（多个）</li><li>slave复制偏移量：记录slave接收master发送过来的指令字节对应的位置（一个）</li></ul></li><li>数据来源： <ul><li>master端：发送一次记录一次；</li><li>slave端：接收一次记录一次</li></ul></li><li>作用： <ul><li>同步信息，比对master与slave的差异，当slave断线后，恢复数据使用</li></ul></li></ul><p><img src="`+_+`" alt="MasterSlaveCopy"></p><h3 id="心跳机制" tabindex="-1">心跳机制 <a class="header-anchor" href="#心跳机制" aria-label="Permalink to &quot;心跳机制&quot;">​</a></h3><ul><li>进入命令传播阶段候，master与slave间需要进行信息交换，使用心跳机制进行维护，实现双方连接保持在线；</li></ul><h4 id="master心跳" tabindex="-1">master心跳 <a class="header-anchor" href="#master心跳" aria-label="Permalink to &quot;master心跳&quot;">​</a></h4><ul><li>指令：PING</li><li>周期：由repl-ping-slave-period决定，默认10秒</li><li>作用：判断slave是否在线</li><li>查询：INFO replication，获取slave最后一次连接时间间隔，lag项维持在0或1视为正常</li></ul><h4 id="slave心跳任务" tabindex="-1">slave心跳任务 <a class="header-anchor" href="#slave心跳任务" aria-label="Permalink to &quot;slave心跳任务&quot;">​</a></h4><ul><li><p>指令：REPLCONF ACK {offset}</p></li><li><p>周期：1秒</p></li><li><p>作用</p><ul><li>汇报slave自己的复制偏移量，获取最新的数据变更指令</li><li>判断master是否在线</li></ul></li><li><p>当slave多数掉线，或延迟过高时，master为保障数据稳定性，将拒绝所有信息同步操作</p></li></ul><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># slave数量少于2个，或者所有slave的延迟都大于等于10秒时，强制关闭master写功能，停止数据同步</span></span>
<span class="line"><span style="color:#F69D50;">min-slaves-to-write</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">2</span></span>
<span class="line"><span style="color:#F69D50;">min-slaves-max-lag</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">8</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># slave数量少于2个，或者所有slave的延迟都大于等于10秒时，强制关闭master写功能，停止数据同步</span></span>
<span class="line"><span style="color:#6F42C1;">min-slaves-to-write</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#6F42C1;">min-slaves-max-lag</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">8</span></span></code></pre></div><h2 id="哨兵模式" tabindex="-1">哨兵模式 <a class="header-anchor" href="#哨兵模式" aria-label="Permalink to &quot;哨兵模式&quot;">​</a></h2><p>  哨兵(sentinel) 是一个分布式系统，用于对主从结构中的每台服务器进行监控，当出现故障时通过投票机制选择新的master并将所有slave连接到新的master。 <img src="`+R+`" alt="Sentinel"></p><h3 id="哨兵的作用" tabindex="-1">哨兵的作用 <a class="header-anchor" href="#哨兵的作用" aria-label="Permalink to &quot;哨兵的作用&quot;">​</a></h3><ul><li>监控 <ul><li>不断的检查master和slave是否正常运行。</li><li>master存活检测、master与slave运行情况检测</li></ul></li><li>通知（提醒） <ul><li>当被监控的服务器出现问题时，向其他（哨兵间，客户端）发送通知。</li></ul></li><li>自动故障转移 <ul><li>断开master与slave连接，选取一个slave作为master，将其他slave连接到新的master，并告知客户端新的服务器地址</li></ul></li></ul><p>Tips:</p><p>  哨兵也是一台redis服务器，只是不提供数据服务；通常哨兵配置数量为单数。</p><h3 id="相关命令-6" tabindex="-1">相关命令 <a class="header-anchor" href="#相关命令-6" aria-label="Permalink to &quot;相关命令&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 启动哨兵</span></span>
<span class="line"><span style="color:#F69D50;">redis-sentinel</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">sentinel.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 连接服务器口令</span></span>
<span class="line"><span style="color:#768390;"># sentinel auth-pass &lt;服务器名称&gt; &lt;password&gt;</span></span>
<span class="line"><span style="color:#F69D50;">sentinel</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">auth-pass</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">mymaster</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">itcast</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 设置哨兵监听的主服务器信息，最后一个count的意思是有几台 Sentinel 发现有问题，就会发生故障转移:</span></span>
<span class="line"><span style="color:#768390;"># 例如 配置为2，代表至少有2个 Sentinel 节点认为主节点不可达，那么这个不可达的判定才是客观的。</span></span>
<span class="line"><span style="color:#768390;"># sentinel monitor &lt;自定义服务名称&gt; &lt;主机地址&gt; &lt;端口&gt; &lt;主从服务器总量&gt;</span></span>
<span class="line"><span style="color:#F69D50;">sentinel</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">monitor</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">mymaster</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">192.168</span><span style="color:#96D0FF;">.194.131</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">6381</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 指定哨兵在监控Redis服务时，判定服务器挂掉的时间周期，默认30秒（30000），也是主从切换的启动条件之一</span></span>
<span class="line"><span style="color:#768390;"># sentinel down-after-milliseconds &lt;服务名称&gt; &lt;毫秒数（整数）&gt;</span></span>
<span class="line"><span style="color:#F69D50;">sentinel</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">down-after-milliseconds</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">mymaster</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">3000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 指定同时进行主从的slave数量，数值越大，要求网络资源越高，要求约小，同步时间约长</span></span>
<span class="line"><span style="color:#F69D50;">sentinel</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">parallel-syncs</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">&lt;</span><span style="color:#96D0FF;">服务名</span><span style="color:#ADBAC7;">称</span><span style="color:#F47067;">&gt;</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">&lt;</span><span style="color:#96D0FF;">服务器数（整数</span><span style="color:#ADBAC7;">）</span><span style="color:#F47067;">&gt;</span></span>
<span class="line"><span style="color:#F69D50;">sentinel</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">parallel-syncs</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">mymaster</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 指定出现故障后，故障切换的最大超时时间，超过该值，认定切换失败，默认3分钟</span></span>
<span class="line"><span style="color:#F69D50;">sentinel</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">failover-timeout</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">&lt;</span><span style="color:#96D0FF;">服务名</span><span style="color:#ADBAC7;">称</span><span style="color:#F47067;">&gt;</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">&lt;</span><span style="color:#96D0FF;">毫秒数（整数</span><span style="color:#ADBAC7;">）</span><span style="color:#F47067;">&gt;</span></span>
<span class="line"><span style="color:#F69D50;">sentinel</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">failover-timeout</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">mymaster</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">9000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 启动哨兵</span></span>
<span class="line"><span style="color:#6F42C1;">redis-sentinel</span><span style="color:#24292E;"> </span><span style="color:#032F62;">sentinel.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 连接服务器口令</span></span>
<span class="line"><span style="color:#6A737D;"># sentinel auth-pass &lt;服务器名称&gt; &lt;password&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">sentinel</span><span style="color:#24292E;"> </span><span style="color:#032F62;">auth-pass</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mymaster</span><span style="color:#24292E;"> </span><span style="color:#032F62;">itcast</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置哨兵监听的主服务器信息，最后一个count的意思是有几台 Sentinel 发现有问题，就会发生故障转移:</span></span>
<span class="line"><span style="color:#6A737D;"># 例如 配置为2，代表至少有2个 Sentinel 节点认为主节点不可达，那么这个不可达的判定才是客观的。</span></span>
<span class="line"><span style="color:#6A737D;"># sentinel monitor &lt;自定义服务名称&gt; &lt;主机地址&gt; &lt;端口&gt; &lt;主从服务器总量&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">sentinel</span><span style="color:#24292E;"> </span><span style="color:#032F62;">monitor</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mymaster</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.194.131</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">6381</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 指定哨兵在监控Redis服务时，判定服务器挂掉的时间周期，默认30秒（30000），也是主从切换的启动条件之一</span></span>
<span class="line"><span style="color:#6A737D;"># sentinel down-after-milliseconds &lt;服务名称&gt; &lt;毫秒数（整数）&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">sentinel</span><span style="color:#24292E;"> </span><span style="color:#032F62;">down-after-milliseconds</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mymaster</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 指定同时进行主从的slave数量，数值越大，要求网络资源越高，要求约小，同步时间约长</span></span>
<span class="line"><span style="color:#6F42C1;">sentinel</span><span style="color:#24292E;"> </span><span style="color:#032F62;">parallel-syncs</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">服务名</span><span style="color:#24292E;">称</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">服务器数（整数</span><span style="color:#24292E;">）</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">sentinel</span><span style="color:#24292E;"> </span><span style="color:#032F62;">parallel-syncs</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mymaster</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 指定出现故障后，故障切换的最大超时时间，超过该值，认定切换失败，默认3分钟</span></span>
<span class="line"><span style="color:#6F42C1;">sentinel</span><span style="color:#24292E;"> </span><span style="color:#032F62;">failover-timeout</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">服务名</span><span style="color:#24292E;">称</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">毫秒数（整数</span><span style="color:#24292E;">）</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">sentinel</span><span style="color:#24292E;"> </span><span style="color:#032F62;">failover-timeout</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mymaster</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">9000</span></span></code></pre></div><h3 id="哨兵在进行主从切换过程中经历三个阶段" tabindex="-1">哨兵在进行主从切换过程中经历三个阶段 <a class="header-anchor" href="#哨兵在进行主从切换过程中经历三个阶段" aria-label="Permalink to &quot;哨兵在进行主从切换过程中经历三个阶段&quot;">​</a></h3><ul><li>监控 <ul><li>同步信息</li></ul></li><li>通知 <ul><li>保持联通</li></ul></li><li>故障转移 <ul><li>发现问题</li><li>竞选负责人</li><li>优选新master</li><li>新master上任，其他slave切换master，原master作为slave故障回复后连接</li></ul></li></ul><h4 id="一、监控阶段" tabindex="-1">一、监控阶段 <a class="header-anchor" href="#一、监控阶段" aria-label="Permalink to &quot;一、监控阶段&quot;">​</a></h4><p>  用于同步各个节点的状态信息：</p><ul><li>获取各个sentinel的状态（是否在线）</li><li>获取master的状态 <ul><li>master属性：（runid，role：master）</li><li>各个slave的详细信息</li></ul></li><li>获取所有slave的状态（根据master中的slave信息） <ul><li>slave属性（runid，role：slave，master_host、master_port，offset） <img src="`+S+'" alt="SentinelPing"></li></ul></li></ul><h4 id="二、通知阶段" tabindex="-1">二、通知阶段 <a class="header-anchor" href="#二、通知阶段" aria-label="Permalink to &quot;二、通知阶段&quot;">​</a></h4><p><img src="'+O+'" alt="SentinelNotice"></p><h4 id="三、故障转移阶段" tabindex="-1">三、故障转移阶段 <a class="header-anchor" href="#三、故障转移阶段" aria-label="Permalink to &quot;三、故障转移阶段&quot;">​</a></h4><p>  当有一台 Sentinel 机器发现问题时，它就会主观对它主观下线，但是当多个 Sentinel 都发现有问题的时候，才会出现客观下线。</p><p>  主观下线：每个 Sentinel 节点对 Redis 节点失败的“偏见”。之所以是偏见，只是因为某一台机器30秒内没有得到回复。</p><p>  客观下线：这个时候需要所有 Sentinel 节点都发现它30秒内无回复，才会达到共识。</p><ul><li>服务器列表中挑选备选master <ul><li>在线的</li><li>响应慢的</li><li>与原master断开时间久的</li><li>优先原则：优先级，offset，runid</li></ul></li><li>发送指令（ sentinel ） <ul><li>向新的master发送slaveof no one</li><li>向其他slave发送slaveof 新masterIP端口</li></ul></li></ul><h2 id="redis集群-cluster" tabindex="-1">redis集群（cluster） <a class="header-anchor" href="#redis集群-cluster" aria-label="Permalink to &quot;redis集群（cluster）&quot;">​</a></h2><p>  Redis 集群没有使用一致性hash, 而是引入了 哈希槽的概念.</p><h3 id="哈希槽" tabindex="-1">哈希槽 <a class="header-anchor" href="#哈希槽" aria-label="Permalink to &quot;哈希槽&quot;">​</a></h3><p>1、Redis 集群有16384个哈希槽，每个key通过CRC16校验后对16384取模来决定放置哪个槽。<br><img src="'+w+'" alt="HashSlot">   集群的每个节点负责一部分hash槽,举个例子,比如当前集群有3个节点,那么：</p><ul><li>节点 A 包含 0 到 5500号哈希槽.</li><li>节点 B 包含5501 到 11000 号哈希槽.</li><li>节点 C 包含11001 到 16384号哈希槽.</li></ul><p>  这种结构很容易添加或者删除节点。比如如果我想新添加个节点D，我需要从节点 A, B, C中得部分槽到D上。如果我想移除节点A，需要将A中的槽移到B和C节点上，然后将没有任何槽的A节点从集群中移除即可。</p><p>  由于从一个节点将哈希槽移动到另一个节点并不会停止服务，所以无论添加删除或者改变某个节点的哈希槽的数量都不会造成集群不可用的状态。</p><h3 id="_2、集群内部通讯设计" tabindex="-1">2、集群内部通讯设计 <a class="header-anchor" href="#_2、集群内部通讯设计" aria-label="Permalink to &quot;2、集群内部通讯设计&quot;">​</a></h3><ul><li>各个数据库相互通信，保存各个库中槽的编号数据</li><li>一次命中，直接返回</li><li>一次未命中，告知具体位置 <img src="'+L+`" alt="ClusterCommunicate"></li></ul><h3 id="相关命令-7" tabindex="-1">相关命令 <a class="header-anchor" href="#相关命令-7" aria-label="Permalink to &quot;相关命令&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># cluster配置</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 添加节点</span></span>
<span class="line"><span style="color:#F69D50;">cluster-enabled</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># cluster配置文件名，该文件属于自动生成，仅用于快速查找文件并查询文件内容</span></span>
<span class="line"><span style="color:#F69D50;">cluster-config-file</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">&lt;</span><span style="color:#96D0FF;">filenam</span><span style="color:#ADBAC7;">e</span><span style="color:#F47067;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 节点服务响应超时时间，用于判定该节点是否下线或切换为从节点</span></span>
<span class="line"><span style="color:#F69D50;">cluster-node-timeout</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">&lt;</span><span style="color:#96D0FF;">millisecond</span><span style="color:#ADBAC7;">s</span><span style="color:#F47067;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># master连接的slave最小数量</span></span>
<span class="line"><span style="color:#F69D50;">cluster-migration-barrier</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">&lt;</span><span style="color:#96D0FF;">coun</span><span style="color:#ADBAC7;">t</span><span style="color:#F47067;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># cluster配置</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 添加节点</span></span>
<span class="line"><span style="color:#6F42C1;">cluster-enabled</span><span style="color:#24292E;"> </span><span style="color:#032F62;">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># cluster配置文件名，该文件属于自动生成，仅用于快速查找文件并查询文件内容</span></span>
<span class="line"><span style="color:#6F42C1;">cluster-config-file</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">filenam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 节点服务响应超时时间，用于判定该节点是否下线或切换为从节点</span></span>
<span class="line"><span style="color:#6F42C1;">cluster-node-timeout</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">millisecond</span><span style="color:#24292E;">s</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># master连接的slave最小数量</span></span>
<span class="line"><span style="color:#6F42C1;">cluster-migration-barrier</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">coun</span><span style="color:#24292E;">t</span><span style="color:#D73A49;">&gt;</span></span></code></pre></div><h2 id="redis潜在风险和问题" tabindex="-1">Redis潜在风险和问题 <a class="header-anchor" href="#redis潜在风险和问题" aria-label="Permalink to &quot;Redis潜在风险和问题&quot;">​</a></h2><h3 id="缓存预热" tabindex="-1">缓存预热 <a class="header-anchor" href="#缓存预热" aria-label="Permalink to &quot;缓存预热&quot;">​</a></h3><p>  缓存预热就是系统启动前，提前将相关的缓存数据直接加载到缓存系统。避免在用户请求的时候，先查询数据库，然后再将数据缓存的问题！用户直接查询事先被预热的缓存数据！</p><h3 id="缓存雪崩" tabindex="-1">缓存雪崩 <a class="header-anchor" href="#缓存雪崩" aria-label="Permalink to &quot;缓存雪崩&quot;">​</a></h3><p>  指短时间内，缓存中数据大批量到过期时间，而查询数据量巨大，请求都直接访问数据库，引起数据库压力过大甚至down机。</p><p>  缓存雪崩一般是由于大量数据同时过期造成的，对于这个原因，可通过均匀设置过期时间解决，即让过期时间相对离散一点。如采用一个较大固定值+一个较小的随机值，5小时+0到1800秒酱紫。</p><p>  Redis 故障宕机也可能引起缓存雪崩。这就需要构造Redis高可用集群啦。 使用断路器，如果缓存宕机，为了防止系统全部宕机，限制部分流量进入数据库，保证部分可用，其余的请求返回断路器的默认值。</p><h3 id="缓存击穿" tabindex="-1">缓存击穿 <a class="header-anchor" href="#缓存击穿" aria-label="Permalink to &quot;缓存击穿&quot;">​</a></h3><p>  缓存击穿指热点key在某个时间点过期的时候，而恰好在这个时间点对这个Key有大量的并发请求过来，从而大量的请求打到db。</p><p>  使用互斥锁方案。缓存失效时，不是立即去加载db数据，而是先使用某些带成功返回的原子操作命令，如(Redis的setnx）去操作，成功的时候，再去加载db数据库数据和设置缓存。否则就去重试获取缓存。</p><p>  “永不过期”，是指没有设置过期时间，但是热点数据快要过期时，异步线程去更新和设置过期时间。</p><h3 id="缓存击穿和缓存雪崩的区别" tabindex="-1">缓存击穿和缓存雪崩的区别 <a class="header-anchor" href="#缓存击穿和缓存雪崩的区别" aria-label="Permalink to &quot;缓存击穿和缓存雪崩的区别&quot;">​</a></h3><p>  缓存雪崩是指数据库压力过大甚至down机，缓存击穿只是大量并发请求到了DB数据库层面。可以认为击穿是缓存雪崩的一个子集吧。有些认为它们区别，是区别在于击穿针对某一热点key缓存，雪奔则是很多key。</p><h3 id="缓存穿透" tabindex="-1">缓存穿透 <a class="header-anchor" href="#缓存穿透" aria-label="Permalink to &quot;缓存穿透&quot;">​</a></h3><p>  查询一个一定不存在的数据，由于缓存是不命中时需要从数据库查询，查不到数据则不写入缓存，这将导致这个不存在的数据每次请求都要到数据库去查询，进而给数据库带来压力。</p><p>  通俗点说，读请求访问时，缓存和数据库都没有某个值，这样就会导致每次对这个值的查询请求都会穿透到数据库，这就是缓存穿透。 如果是非法请求，我们在API入口，对参数进行校验，过滤非法值。</p><p>  如果查询数据库为空，我们可以给缓存设置个空值，或者默认值。但是如有有写请求进来的话，需要更新缓存哈，以保证缓存一致性，同时，最后给缓存设置适当的过期时间。（业务上比较常用，简单有效）</p><h2 id="redis与客户端通信的方式" tabindex="-1">Redis与客户端通信的方式 <a class="header-anchor" href="#redis与客户端通信的方式" aria-label="Permalink to &quot;Redis与客户端通信的方式&quot;">​</a></h2><p>  RESP (REdis Serialization Protocol)协议，它工作在 TCP 协议的上层，作为我和客户端之间进行通讯的标准形式。</p><h3 id="客户端发送消息的规则" tabindex="-1">客户端发送消息的规则 <a class="header-anchor" href="#客户端发送消息的规则" aria-label="Permalink to &quot;客户端发送消息的规则&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># 首先解释一下每行末尾的CRLF，转换成程序语言就是\\r\\n，也就是回车加换行。</span></span>
<span class="line"><span style="color:#F47067;">*&lt;</span><span style="color:#ADBAC7;">参数数量</span><span style="color:#F47067;">&gt;</span><span style="color:#ADBAC7;"> CRLF</span></span>
<span class="line"><span style="color:#F69D50;">$&lt;参数1的字节长度&gt;</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">CRLF</span></span>
<span class="line"><span style="color:#F47067;">&lt;</span><span style="color:#ADBAC7;">参数1的数据</span><span style="color:#F47067;">&gt;</span><span style="color:#ADBAC7;"> CRLF</span></span>
<span class="line"><span style="color:#F69D50;">$&lt;参数2的字节长度&gt;</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">CRLF</span></span>
<span class="line"><span style="color:#F47067;">&lt;</span><span style="color:#ADBAC7;">参数2的数据</span><span style="color:#F47067;">&gt;</span><span style="color:#ADBAC7;"> CRLF</span></span>
<span class="line"><span style="color:#6CB6FF;">...</span></span>
<span class="line"><span style="color:#F69D50;">$&lt;参数N的字节长度&gt;</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">CRLF</span></span>
<span class="line"><span style="color:#F47067;">&lt;</span><span style="color:#ADBAC7;">参数N的数据</span><span style="color:#F47067;">&gt;</span><span style="color:#ADBAC7;"> CRLF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F69D50;">示例：</span></span>
<span class="line"><span style="color:#6CB6FF;">set</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">key1</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">value1</span></span>
<span class="line"><span style="color:#F69D50;">--------------</span></span>
<span class="line"><span style="color:#F47067;">*</span><span style="color:#ADBAC7;">3</span></span>
<span class="line"><span style="color:#F69D50;">$3</span></span>
<span class="line"><span style="color:#6CB6FF;">set</span></span>
<span class="line"><span style="color:#F69D50;">$4</span></span>
<span class="line"><span style="color:#F69D50;">key1</span></span>
<span class="line"><span style="color:#F69D50;">$6</span></span>
<span class="line"><span style="color:#F69D50;">value1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 首先解释一下每行末尾的CRLF，转换成程序语言就是\\r\\n，也就是回车加换行。</span></span>
<span class="line"><span style="color:#D73A49;">*&lt;</span><span style="color:#24292E;">参数数量</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> CRLF</span></span>
<span class="line"><span style="color:#6F42C1;">$&lt;参数1的字节长度&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">CRLF</span></span>
<span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">参数1的数据</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> CRLF</span></span>
<span class="line"><span style="color:#6F42C1;">$&lt;参数2的字节长度&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">CRLF</span></span>
<span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">参数2的数据</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> CRLF</span></span>
<span class="line"><span style="color:#005CC5;">...</span></span>
<span class="line"><span style="color:#6F42C1;">$&lt;参数N的字节长度&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">CRLF</span></span>
<span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">参数N的数据</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> CRLF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">示例：</span></span>
<span class="line"><span style="color:#005CC5;">set</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">value1</span></span>
<span class="line"><span style="color:#6F42C1;">--------------</span></span>
<span class="line"><span style="color:#D73A49;">*</span><span style="color:#24292E;">3</span></span>
<span class="line"><span style="color:#E36209;">$3</span></span>
<span class="line"><span style="color:#005CC5;">set</span></span>
<span class="line"><span style="color:#E36209;">$4</span></span>
<span class="line"><span style="color:#6F42C1;">key1</span></span>
<span class="line"><span style="color:#E36209;">$6</span></span>
<span class="line"><span style="color:#6F42C1;">value1</span></span></code></pre></div><h3 id="服务端指令回复" tabindex="-1">服务端指令回复 <a class="header-anchor" href="#服务端指令回复" aria-label="Permalink to &quot;服务端指令回复&quot;">​</a></h3><h4 id="_1、简单字符串" tabindex="-1">1、简单字符串 <a class="header-anchor" href="#_1、简单字符串" aria-label="Permalink to &quot;1、简单字符串&quot;">​</a></h4><p>  简单字符串回复只有一行回复，回复的内容以+作为开头，不允许换行，并以\\r\\n结束。有很多指令在执行成功后只会回复一个OK，使用的就是这种格式，能够有效的将传输、解析的开销降到最低。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># set key value</span></span>
<span class="line"><span style="color:#F69D50;">+OK\\r\\n</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># set key value</span></span>
<span class="line"><span style="color:#6F42C1;">+OK\\r\\n</span></span></code></pre></div><h4 id="_2、错误回复" tabindex="-1">2、错误回复 <a class="header-anchor" href="#_2、错误回复" aria-label="Permalink to &quot;2、错误回复&quot;">​</a></h4><p>  在RESP协议中，错误回复可以当做简单字符串回复的变种形式，它们之间的格式也非常类似，区别只有第一个字符是以-作为开头，错误回复的内容通常是错误类型及对错误描述的字符串。</p><p>  错误回复出现在一些异常的场景，例如当发送了错误的指令、操作数的数量不对时，都会进行错误回复。在客户端收到错误回复后，会将它与简单字符串回复进行区分，视为异常。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># let dirnk</span></span>
<span class="line"><span style="color:#F69D50;">-ERR</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">unknown</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">command</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">&#39;let drink&#39;,</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">with</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">args</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">begining</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">with:</span><span style="color:#F47067;">\\r\\n</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># let dirnk</span></span>
<span class="line"><span style="color:#6F42C1;">-ERR</span><span style="color:#24292E;"> </span><span style="color:#032F62;">unknown</span><span style="color:#24292E;"> </span><span style="color:#032F62;">command</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;let drink&#39;,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">with</span><span style="color:#24292E;"> </span><span style="color:#032F62;">args</span><span style="color:#24292E;"> </span><span style="color:#032F62;">begining</span><span style="color:#24292E;"> </span><span style="color:#032F62;">with:</span><span style="color:#005CC5;">\\r\\n</span></span></code></pre></div><h4 id="_3、整数回复" tabindex="-1">3、整数回复 <a class="header-anchor" href="#_3、整数回复" aria-label="Permalink to &quot;3、整数回复&quot;">​</a></h4><p>  整数回复的应用也非常广泛，它以:作为开头，以\\r\\n结束，用于返回一个整数。例如当执行incr后返回自增后的值，执行llen返回数组的长度，或者使用exists命令返回的0或1作为判断一个key是否存在的依据，这些都使用了整数回复。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># incr key</span></span>
<span class="line"><span style="color:#F69D50;">:2\\r\\n</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># incr key</span></span>
<span class="line"><span style="color:#6F42C1;">:2\\r\\n</span></span></code></pre></div><h4 id="_4、批量回复" tabindex="-1">4、批量回复 <a class="header-anchor" href="#_4、批量回复" aria-label="Permalink to &quot;4、批量回复&quot;">​</a></h4><p>  批量回复，就是多行字符串的回复。它以$作为开头，后面是发送的字节长度，然后是\\r\\n，然后发送实际的数据，最终以\\r\\n结束。如果要回复的数据不存在，那么回复长度为-1。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># get key  存在数据</span></span>
<span class="line"><span style="color:#F69D50;">$7</span><span style="color:#F47067;">\\r\\n</span></span>
<span class="line"><span style="color:#F69D50;">myvalue\\r\\n</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># get otherKey 不存在数据</span></span>
<span class="line"><span style="color:#F69D50;">$-1\\r\\n</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># get key  存在数据</span></span>
<span class="line"><span style="color:#E36209;">$7</span><span style="color:#005CC5;">\\r\\n</span></span>
<span class="line"><span style="color:#6F42C1;">myvalue\\r\\n</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># get otherKey 不存在数据</span></span>
<span class="line"><span style="color:#6F42C1;">$-1\\r\\n</span></span></code></pre></div><h4 id="_5、多条批量回复" tabindex="-1">5、多条批量回复 <a class="header-anchor" href="#_5、多条批量回复" aria-label="Permalink to &quot;5、多条批量回复&quot;">​</a></h4><p>  当服务端要返回多个值时，例如返回一些元素的集合时，就会使用多条批量回复。它以*作为开头，后面是返回元素的个数，之后再跟随多个上面讲到过的批量回复。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># lrange myarray 0 -1  只要m1和m2两个元素</span></span>
<span class="line"><span style="color:#F47067;">*</span><span style="color:#ADBAC7;">2</span><span style="color:#F47067;">\\r\\n</span></span>
<span class="line"><span style="color:#F69D50;">$2</span><span style="color:#F47067;">\\r\\n</span></span>
<span class="line"><span style="color:#F69D50;">m1\\r\\n</span></span>
<span class="line"><span style="color:#F69D50;">$2</span><span style="color:#F47067;">\\r\\n</span></span>
<span class="line"><span style="color:#F69D50;">m2\\r\\n</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># lrange myarray 0 -1  只要m1和m2两个元素</span></span>
<span class="line"><span style="color:#D73A49;">*</span><span style="color:#24292E;">2</span><span style="color:#005CC5;">\\r\\n</span></span>
<span class="line"><span style="color:#E36209;">$2</span><span style="color:#005CC5;">\\r\\n</span></span>
<span class="line"><span style="color:#6F42C1;">m1\\r\\n</span></span>
<span class="line"><span style="color:#E36209;">$2</span><span style="color:#005CC5;">\\r\\n</span></span>
<span class="line"><span style="color:#6F42C1;">m2\\r\\n</span></span></code></pre></div><h2 id="redis-的发布与订阅" tabindex="-1">Redis 的发布与订阅 <a class="header-anchor" href="#redis-的发布与订阅" aria-label="Permalink to &quot;Redis 的发布与订阅&quot;">​</a></h2><h3 id="发布与订阅简述" tabindex="-1">发布与订阅简述 <a class="header-anchor" href="#发布与订阅简述" aria-label="Permalink to &quot;发布与订阅简述&quot;">​</a></h3><p>  Redis提供了基于“发布/订阅”模式的消息机制。此种模式下，消息发布者和订阅者不进行直接通信，发布者客户端向指定的频道（channel） 发布消息，订阅该频道的每个客户端都可以收到该消息，Redis提供了若干命令支持该功能。 <img src="`+z+`" alt="PublishSubscription"></p><h3 id="使用场景" tabindex="-1">使用场景 <a class="header-anchor" href="#使用场景" aria-label="Permalink to &quot;使用场景&quot;">​</a></h3><p>  聊天室、公告牌、服务之间利用消息解耦都可以使用发布订阅模式</p><h3 id="发布与订阅命令" tabindex="-1">发布与订阅命令 <a class="header-anchor" href="#发布与订阅命令" aria-label="Permalink to &quot;发布与订阅命令&quot;">​</a></h3><h4 id="订阅消息" tabindex="-1">订阅消息 <a class="header-anchor" href="#订阅消息" aria-label="Permalink to &quot;订阅消息&quot;">​</a></h4><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#F69D50;">127.0.0.1:6379&gt;</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">subscribe</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">channel</span><span style="color:#ADBAC7;"> [channel </span><span style="color:#96D0FF;">...]</span></span>
<span class="line"><span style="color:#F69D50;">Reading</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">messages...</span><span style="color:#ADBAC7;"> (press </span><span style="color:#96D0FF;">Ctrl-C</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">to</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">quit</span><span style="color:#ADBAC7;">)</span></span>
<span class="line"><span style="color:#F69D50;">1</span><span style="color:#ADBAC7;">) </span><span style="color:#96D0FF;">&quot;subscribe&quot;</span></span>
<span class="line"><span style="color:#F69D50;">2</span><span style="color:#ADBAC7;">) </span><span style="color:#96D0FF;">&quot;channel&quot;</span></span>
<span class="line"><span style="color:#F69D50;">3</span><span style="color:#ADBAC7;">) (</span><span style="color:#F69D50;">integer</span><span style="color:#ADBAC7;">) 1		</span><span style="color:#768390;"># 返回值为当前已订阅的频道数量</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># 以下是客户端接收到的订阅消息</span></span>
<span class="line"><span style="color:#F69D50;">1</span><span style="color:#ADBAC7;">) </span><span style="color:#96D0FF;">&quot;message&quot;</span></span>
<span class="line"><span style="color:#F69D50;">2</span><span style="color:#ADBAC7;">) </span><span style="color:#96D0FF;">&quot;channel&quot;</span></span>
<span class="line"><span style="color:#F69D50;">3</span><span style="color:#ADBAC7;">) </span><span style="color:#96D0FF;">&quot;hello&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">127.0.0.1:6379&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">subscribe</span><span style="color:#24292E;"> </span><span style="color:#032F62;">channel</span><span style="color:#24292E;"> [channel </span><span style="color:#032F62;">...]</span></span>
<span class="line"><span style="color:#6F42C1;">Reading</span><span style="color:#24292E;"> </span><span style="color:#032F62;">messages...</span><span style="color:#24292E;"> (press </span><span style="color:#032F62;">Ctrl-C</span><span style="color:#24292E;"> </span><span style="color:#032F62;">to</span><span style="color:#24292E;"> </span><span style="color:#032F62;">quit</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6F42C1;">1</span><span style="color:#24292E;">) </span><span style="color:#032F62;">&quot;subscribe&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">2</span><span style="color:#24292E;">) </span><span style="color:#032F62;">&quot;channel&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">3</span><span style="color:#24292E;">) (</span><span style="color:#6F42C1;">integer</span><span style="color:#24292E;">) 1		</span><span style="color:#6A737D;"># 返回值为当前已订阅的频道数量</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 以下是客户端接收到的订阅消息</span></span>
<span class="line"><span style="color:#6F42C1;">1</span><span style="color:#24292E;">) </span><span style="color:#032F62;">&quot;message&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">2</span><span style="color:#24292E;">) </span><span style="color:#032F62;">&quot;channel&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">3</span><span style="color:#24292E;">) </span><span style="color:#032F62;">&quot;hello&quot;</span></span></code></pre></div><h4 id="发布消息" tabindex="-1">发布消息 <a class="header-anchor" href="#发布消息" aria-label="Permalink to &quot;发布消息&quot;">​</a></h4><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#F69D50;">127.0.0.1:6379&gt;</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">publish</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">channel</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">&quot;hello&quot;</span></span>
<span class="line"><span style="color:#ADBAC7;">(</span><span style="color:#F69D50;">integer</span><span style="color:#ADBAC7;">) 1		</span><span style="color:#768390;"># 返回值为订阅当前频道的客户端数量</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">127.0.0.1:6379&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">publish</span><span style="color:#24292E;"> </span><span style="color:#032F62;">channel</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;hello&quot;</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#6F42C1;">integer</span><span style="color:#24292E;">) 1		</span><span style="color:#6A737D;"># 返回值为订阅当前频道的客户端数量</span></span></code></pre></div><h4 id="退订频道" tabindex="-1">退订频道 <a class="header-anchor" href="#退订频道" aria-label="Permalink to &quot;退订频道&quot;">​</a></h4><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#F69D50;">127.0.0.1:6379&gt;</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">unsubscribe</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">pattern</span><span style="color:#ADBAC7;"> [pattern </span><span style="color:#96D0FF;">...]</span></span>
<span class="line"><span style="color:#768390;"># 返回值为当前客户端订阅的频道和模式的数量</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">127.0.0.1:6379&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">unsubscribe</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pattern</span><span style="color:#24292E;"> [pattern </span><span style="color:#032F62;">...]</span></span>
<span class="line"><span style="color:#6A737D;"># 返回值为当前客户端订阅的频道和模式的数量</span></span></code></pre></div><h4 id="按模式订阅频道" tabindex="-1">按模式订阅频道 <a class="header-anchor" href="#按模式订阅频道" aria-label="Permalink to &quot;按模式订阅频道&quot;">​</a></h4><p>  每个模式以 * 作为匹配符，比如 it* 匹配所有以 it 开头的频道( it.news 、 it.blog 、 it.tweets 等等)， news.* 匹配所有以 news. 开头的频道( news.it 、news.global.today 等)，诸如此类。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#F69D50;">127.0.0.1:6379&gt;</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">psubscribe</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">pattern</span><span style="color:#ADBAC7;"> [pattern </span><span style="color:#96D0FF;">...]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">127.0.0.1:6379&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">psubscribe</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pattern</span><span style="color:#24292E;"> [pattern </span><span style="color:#032F62;">...]</span></span></code></pre></div><h4 id="按模式退订频道" tabindex="-1">按模式退订频道 <a class="header-anchor" href="#按模式退订频道" aria-label="Permalink to &quot;按模式退订频道&quot;">​</a></h4><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#F69D50;">127.0.0.1:6379&gt;</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">punsubscribe</span><span style="color:#ADBAC7;"> </span><span style="color:#96D0FF;">pattern</span><span style="color:#ADBAC7;"> [pattern </span><span style="color:#96D0FF;">...]</span></span>
<span class="line"><span style="color:#768390;"># 返回值为当前客户端订阅的频道和模式的数量</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">127.0.0.1:6379&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">punsubscribe</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pattern</span><span style="color:#24292E;"> [pattern </span><span style="color:#032F62;">...]</span></span>
<span class="line"><span style="color:#6A737D;"># 返回值为当前客户端订阅的频道和模式的数量</span></span></code></pre></div><h3 id="订阅命令注意事项" tabindex="-1">订阅命令注意事项 <a class="header-anchor" href="#订阅命令注意事项" aria-label="Permalink to &quot;订阅命令注意事项&quot;">​</a></h3><ul><li>客户端在执行订阅命令之后进入了订阅状态，只能接收 subscribe、psubscribe、 unsubscribe、 punsubscribe 的四个命令。</li><li>新开启的订阅客户端，无法收到该频道之前的消息，因为 Redis 不会对发布的消息进行持久化</li></ul>`,285);function U(s,M,H,V,X,W){const c=l("Badge"),r=y,i=l("ClientOnly");return p(),F("div",null,[t("h1",I,[e("Redis "),o(c,{text:"持续更新",type:"warning"}),e(),N]),o(i,null,{default:D(()=>{var a,n;return[(((a=s.$frontmatter)==null?void 0:a.aside)??!0)&&(((n=s.$frontmatter)==null?void 0:n.showArticleMetadata)??!0)?(p(),A(r,{key:0,article:s.$frontmatter},null,8,["article"])):u("",!0)]}),_:1}),$])}const J=d(T,[["render",U]]);export{G as __pageData,J as default};
