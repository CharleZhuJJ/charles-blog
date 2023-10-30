import{_ as h}from"./chunks/ArticleMetadata.8b6b367a.js";import{_ as p,H as r,o as t,c as u,C as o,a as c,J as i,E as m,V as _,D as b,G as f}from"./chunks/framework.981adca9.js";const O="/charles-blog/assets/SingleInstance.a7e9bc98.jpg",g="/charles-blog/assets/Sga.0e6afba3.jpg",A="/charles-blog/assets/Pga.a58be408.jpg",S="/charles-blog/assets/Rac.7e5c6df1.jpg",N=JSON.parse('{"title":"Oracle","description":"","frontmatter":{"title":"Oracle","author":"Charles Chu","date":"2021/06/07","isOriginal":true},"headers":[],"relativePath":"md/database/Oracle.md","filePath":"md/database/Oracle.md","lastUpdated":1691825438000}'),C={name:"md/database/Oracle.md"},P={id:"oracle",tabindex:"-1"},q=o("a",{class:"header-anchor",href:"#oracle","aria-label":'Permalink to "Oracle <Badge text="持续更新" type="warning" />"'},"​",-1),R=_('<h2 id="oracle体系结构" tabindex="-1">Oracle体系结构 <a class="header-anchor" href="#oracle体系结构" aria-label="Permalink to &quot;Oracle体系结构&quot;">​</a></h2><p>  Oracle数据库可以是单实例，也可以是多实例（即RAC）。</p><ul><li>如果是单实例的话，即一个数据库对应一个实例；</li><li>如果是多实例的话，即一个数据库对应多个实例，例如RAC1和RAC2。</li></ul><h3 id="oracle单实例体系结构" tabindex="-1">Oracle单实例体系结构 <a class="header-anchor" href="#oracle单实例体系结构" aria-label="Permalink to &quot;Oracle单实例体系结构&quot;">​</a></h3><p><img src="'+O+'" alt="SingleInstance"></p><p>  Oracle服务器是一个数据库管理系统，它包括一个Oracle实例（动态）和一个Oracle数据库（静态）。Oracle实例是一个运行的概念（如操作系统的进程）,提供了一种访问Oracle数据库的方式；始终打开一个，并且只能打开一个Oracle数据库。</p><p>  Oracle实例是又SGA和一些后台服务进程组成；</p><p>  Oracle数据库是一个被统一处理的数据的集合，从物理角度来看包括三类文件：数据文件，控制文件，重做文件。从逻辑角度来看，Oracle数据库至少包含一个表空间，表空间至少包含一个段，段又区组成，区又块组成。</p><p>  Oracle还设计了其他的关键文件用来为整个系统服务，如配置文件，密码文件，归档日志文件，还有用户进程和服务进程。（发起连接的应用程序或工具通常被称为用户进程，发起连接后，Oracle服务器就会创建一个进程来接受连接，这个进程就是服务进程；服务进程代表用户进程与Oracle实例进行通信）</p><h2 id="内存结构" tabindex="-1">内存结构 <a class="header-anchor" href="#内存结构" aria-label="Permalink to &quot;内存结构&quot;">​</a></h2><ul><li>SGA(System Global Area)：由所有服务进程和后台进程共享；</li><li>PGA(Program Global Area)：由每个服务进程、后台进程专有；每个进程都有一个PGA。</li></ul><h3 id="sga" tabindex="-1">SGA <a class="header-anchor" href="#sga" aria-label="Permalink to &quot;SGA&quot;">​</a></h3><p>  SGA包含实例的数据和控制信息，包含如下内存结构：</p><ol><li>Database buffer cache：缓存了从磁盘上检索的数据块。</li><li>Redo log buffer：缓存了写到磁盘之前的重做信息。</li><li>Shared pool：缓存了各用户间可共享的各种结构。</li><li>Large pool：一个可选的区域，用来缓存大的I/O请求，以支持并行查询、共享服务器模式以及某些备份操作。</li><li>Java pool：保存java虚拟机中特定会话的数据与java代码。</li><li>Streams pool：由Oracle streams使用。</li><li>Keep buffer cache：保存buffer cache中存储的数据，使其尽时间可能长。</li><li>Recycle buffer cache：保存buffer cache中即将过期的数据。</li><li>nK block size buffer：为与数据库默认数据块大小不同的数据块提供缓存。用来支持表空间传输。 <img src="'+g+'" alt="Sga"></li></ol><h3 id="pga" tabindex="-1">PGA <a class="header-anchor" href="#pga" aria-label="Permalink to &quot;PGA&quot;">​</a></h3><p>  每个服务进程私有的内存区域，包含如下结构：</p><ol><li>Private SQL area：包含绑定信息、运行时的内存结构。每个发出sql语句的会话，都有一个private SQL area（私有SQL区）</li><li>Session memory：为保存会话中的变量以及其他与会话相关的信息，而分配的内存区。 <img src="'+A+'" alt="Pga"></li></ol><h2 id="rac" tabindex="-1">RAC <a class="header-anchor" href="#rac" aria-label="Permalink to &quot;RAC&quot;">​</a></h2><p>  RAC是real application clusters的缩写，译为“实时应用集群”。 <img src="'+S+'" alt="Rac"></p><h3 id="rac的特点" tabindex="-1">RAC的特点 <a class="header-anchor" href="#rac的特点" aria-label="Permalink to &quot;RAC的特点&quot;">​</a></h3><ul><li>RAC的每个实例都有属于自己的SGA、后台进程。</li><li>由于数据文件、控制文件共享于所有实例，所以必须放在 x共享存储中。</li><li>联机重做日志文件：只有一个实例可以写入，但是其他实例可以在恢复和存档期间读取。</li><li>归档日志：属于该实例，但在介质恢复期间，其他实例需要访问所需的归档日志。</li><li>alert和trace日志：属于每个实例自己，其他实例不可读写。</li></ul><h3 id="rac的主要组件包括" tabindex="-1">RAC的主要组件包括 <a class="header-anchor" href="#rac的主要组件包括" aria-label="Permalink to &quot;RAC的主要组件包括&quot;">​</a></h3><ul><li>共享磁盘系统</li><li>Oracle集群件</li><li>集群互联</li><li>Oracle内核组件</li></ul><h2 id="oracle集群件-clusterware" tabindex="-1">Oracle集群件：clusterware <a class="header-anchor" href="#oracle集群件-clusterware" aria-label="Permalink to &quot;Oracle集群件：clusterware&quot;">​</a></h2><p>  Oracle集群件能使节点能够互相通信，构成集群，从而这些节点能够像单个逻辑服务器那样整体运行。构成Oracle集群件的后台进程和服务是 crs(cluster ready service)，CRS的组件包括：</p><ul><li>crs守护进程crsd</li><li>Oracle集群同步服务守护进程ocssd</li><li>事件管理器守护进程evmd</li><li>Oracle通知服务ons</li></ul>',26);function k(a,x,G,v,y,w){const s=r("Badge"),n=h,d=r("ClientOnly");return t(),u("div",null,[o("h1",P,[c("Oracle "),i(s,{text:"持续更新",type:"warning"}),c(),q]),i(d,null,{default:m(()=>{var e,l;return[(((e=a.$frontmatter)==null?void 0:e.aside)??!0)&&(((l=a.$frontmatter)==null?void 0:l.showArticleMetadata)??!0)?(t(),b(n,{key:0,article:a.$frontmatter},null,8,["article"])):f("",!0)]}),_:1}),R])}const T=p(C,[["render",k]]);export{N as __pageData,T as default};
