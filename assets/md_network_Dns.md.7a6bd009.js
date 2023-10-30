import{_ as m}from"./chunks/ArticleMetadata.8b6b367a.js";import{_ as y,H as l,o as p,c as A,C as c,a as e,J as o,E as D,V as N,D as d,G as S}from"./chunks/framework.981adca9.js";const F="/charles-blog/assets/WorkingPrincipl.a5b02b80.png",f=JSON.parse('{"title":"DNS","description":"","frontmatter":{"title":"DNS","author":"Charles Chu","date":"2022/09/30","isOriginal":true},"headers":[],"relativePath":"md/network/Dns.md","filePath":"md/network/Dns.md","lastUpdated":1692501707000}'),C={name:"md/network/Dns.md"},_={id:"dns",tabindex:"-1"},h=c("a",{class:"header-anchor",href:"#dns","aria-label":'Permalink to "DNS  <Badge text="持续更新" type="warning" />"'},"​",-1),u=N('<p>  域名系统（Domain Name System，缩写：DNS）是互联网的一项服务。它作为将域名和IP地址相互映射的一个分布式数据库，能够使人更方便地访问互联网。</p><p>  DNS通过主机名，最终得到该主机名对应的IP地址的过程叫做域名解析（或主机名解析）。</p><p>  通俗的讲，我们更习惯于记住一个网站的名字，www.baidu.com，而不是记住它的ip地址，比如：167.23.10.2</p><p>  将主机域名转换为ip地址，属于应用层协议，使用UDP传输。</p><h2 id="工作原理" tabindex="-1">工作原理 <a class="header-anchor" href="#工作原理" aria-label="Permalink to &quot;工作原理&quot;">​</a></h2><p><img src="'+F+`" alt="Dns"></p><ul><li>第一步，客户端向本地DNS服务器发送解析请求</li><li>第二步，本地DNS如有相应记录会直接返回结果给客户端，如没有就向DNS根服务器发送请求</li><li>第三步，DSN根服务器接收到请求，返回给本地服务器一个所查询域的主域名服务器的地址</li><li>第四步，本地dns服务器再向返回的主域名服务器地址发送查询请求</li><li>第五步，主域名服务器如有记录就返回结果，没有的话返回相关的下级域名服务器地址</li><li>第六步，本地DNS服务器继续向接收到的地址进行查询请求</li><li>第七步，下级域名服务器有相应记录，返回结果</li><li>第八步，本地dns服务器将收到的返回地址发给客户端，同时写入自己的缓存，以便下次查询</li><li>DNS域名查询实际上就是个不断递归查询的过程，直到查找到相应结果，需要注意的时，当找不到相应记录，会返回空结果，而不是超时信息</li></ul><h2 id="dns记录" tabindex="-1">DNS记录 <a class="header-anchor" href="#dns记录" aria-label="Permalink to &quot;DNS记录&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;"># A记录</span></span>
<span class="line"><span style="color:#F69D50;">www.example.com.</span><span style="color:#ADBAC7;">     </span><span style="color:#96D0FF;">IN</span><span style="color:#ADBAC7;">     </span><span style="color:#96D0FF;">A</span><span style="color:#ADBAC7;">     </span><span style="color:#6CB6FF;">139.18</span><span style="color:#96D0FF;">.28.5</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#768390;"># A 是记录的类型，A 记录代表着这是一条用于解析 IPv4 地址的记录。</span></span>
<span class="line"><span style="color:#768390;"># 从这条记录可知，www.example.com的 IP 地址是 139.18.28.5。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># CNAME（用于定义域名的别名）</span></span>
<span class="line"><span style="color:#F69D50;">a.example.com.</span><span style="color:#ADBAC7;">          </span><span style="color:#96D0FF;">IN</span><span style="color:#ADBAC7;">     </span><span style="color:#96D0FF;">CNAME</span><span style="color:#ADBAC7;">   </span><span style="color:#96D0FF;">b.example.com.</span></span>
<span class="line"><span style="color:#768390;"># 这条 DNS 记录定义了 a.example.com 是 b.example.com 的别名。</span></span>
<span class="line"><span style="color:#768390;"># 用户在浏览器中输入 a.example.com 时候，通过 DNS 查询会知道 a.example.com 是 b.example.com 的别名，</span></span>
<span class="line"><span style="color:#768390;"># 因此需要实际 IP 的时候，会去拿 b.example.com 的 A 记录。</span></span>
<span class="line"><span style="color:#768390;"># 当你想把一个网站迁移到新域名，旧域名仍然保留的时候；还有当你想将自己的静态资源放到 CDN 上的时候，CNAME 就非常有用。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># AAAA 记录 (和 A 记录类似，AAAA 记录则是域名和 IPv6 地址的映射关系)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># MX记录(邮件记录，用来描述邮件服务器的域名)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;"># NS 记录(描述 DNS 服务器网址,当一个 DNS 查询看到 NS 记录的时候，会再去 NS 记录配置的 DNS 服务器查询，得到最终的记录。)</span></span>
<span class="line"><span style="color:#F69D50;">a.com.</span><span style="color:#ADBAC7;">     </span><span style="color:#96D0FF;">IN</span><span style="color:#ADBAC7;">      </span><span style="color:#96D0FF;">NS</span><span style="color:#ADBAC7;">      </span><span style="color:#96D0FF;">ns1.a.com.</span></span>
<span class="line"><span style="color:#F69D50;">a.com.</span><span style="color:#ADBAC7;">     </span><span style="color:#96D0FF;">IN</span><span style="color:#ADBAC7;">      </span><span style="color:#96D0FF;">NS</span><span style="color:#ADBAC7;">      </span><span style="color:#96D0FF;">ns2.a.com.</span></span>
<span class="line"><span style="color:#768390;"># 当解析 a.com 地址时，我们看到 a.com 有两个 NS 记录，所以确定最终 a.com 的记录在 ns1.a.com 和 ns2.a.com 上。</span></span>
<span class="line"><span style="color:#768390;"># 从设计上看，ns1 和 ns2 是网站 a.com 提供的智能 DNS 服务器，可以提供负载均衡、分布式 Sharding 等服务。</span></span>
<span class="line"><span style="color:#768390;"># 通常数字小的 NS 记录优先级更高，也就是 ns1 会优先于 ns2 响应。</span></span>
<span class="line"><span style="color:#768390;"># 配置了上面的 NS 记录后，如果还配置了 a.com 的 A 记录，那么这个 A 记录会被 NS 记录覆盖。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># A记录</span></span>
<span class="line"><span style="color:#6F42C1;">www.example.com.</span><span style="color:#24292E;">     </span><span style="color:#032F62;">IN</span><span style="color:#24292E;">     </span><span style="color:#032F62;">A</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">139.18</span><span style="color:#032F62;">.28.5</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;"># A 是记录的类型，A 记录代表着这是一条用于解析 IPv4 地址的记录。</span></span>
<span class="line"><span style="color:#6A737D;"># 从这条记录可知，www.example.com的 IP 地址是 139.18.28.5。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># CNAME（用于定义域名的别名）</span></span>
<span class="line"><span style="color:#6F42C1;">a.example.com.</span><span style="color:#24292E;">          </span><span style="color:#032F62;">IN</span><span style="color:#24292E;">     </span><span style="color:#032F62;">CNAME</span><span style="color:#24292E;">   </span><span style="color:#032F62;">b.example.com.</span></span>
<span class="line"><span style="color:#6A737D;"># 这条 DNS 记录定义了 a.example.com 是 b.example.com 的别名。</span></span>
<span class="line"><span style="color:#6A737D;"># 用户在浏览器中输入 a.example.com 时候，通过 DNS 查询会知道 a.example.com 是 b.example.com 的别名，</span></span>
<span class="line"><span style="color:#6A737D;"># 因此需要实际 IP 的时候，会去拿 b.example.com 的 A 记录。</span></span>
<span class="line"><span style="color:#6A737D;"># 当你想把一个网站迁移到新域名，旧域名仍然保留的时候；还有当你想将自己的静态资源放到 CDN 上的时候，CNAME 就非常有用。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># AAAA 记录 (和 A 记录类似，AAAA 记录则是域名和 IPv6 地址的映射关系)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># MX记录(邮件记录，用来描述邮件服务器的域名)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># NS 记录(描述 DNS 服务器网址,当一个 DNS 查询看到 NS 记录的时候，会再去 NS 记录配置的 DNS 服务器查询，得到最终的记录。)</span></span>
<span class="line"><span style="color:#6F42C1;">a.com.</span><span style="color:#24292E;">     </span><span style="color:#032F62;">IN</span><span style="color:#24292E;">      </span><span style="color:#032F62;">NS</span><span style="color:#24292E;">      </span><span style="color:#032F62;">ns1.a.com.</span></span>
<span class="line"><span style="color:#6F42C1;">a.com.</span><span style="color:#24292E;">     </span><span style="color:#032F62;">IN</span><span style="color:#24292E;">      </span><span style="color:#032F62;">NS</span><span style="color:#24292E;">      </span><span style="color:#032F62;">ns2.a.com.</span></span>
<span class="line"><span style="color:#6A737D;"># 当解析 a.com 地址时，我们看到 a.com 有两个 NS 记录，所以确定最终 a.com 的记录在 ns1.a.com 和 ns2.a.com 上。</span></span>
<span class="line"><span style="color:#6A737D;"># 从设计上看，ns1 和 ns2 是网站 a.com 提供的智能 DNS 服务器，可以提供负载均衡、分布式 Sharding 等服务。</span></span>
<span class="line"><span style="color:#6A737D;"># 通常数字小的 NS 记录优先级更高，也就是 ns1 会优先于 ns2 响应。</span></span>
<span class="line"><span style="color:#6A737D;"># 配置了上面的 NS 记录后，如果还配置了 a.com 的 A 记录，那么这个 A 记录会被 NS 记录覆盖。</span></span></code></pre></div>`,9);function x(s,b,w,E,g,B){const t=l("Badge"),r=m,i=l("ClientOnly");return p(),A("div",null,[c("h1",_,[e("DNS "),o(t,{text:"持续更新",type:"warning"}),e(),h]),o(i,null,{default:D(()=>{var a,n;return[(((a=s.$frontmatter)==null?void 0:a.aside)??!0)&&(((n=s.$frontmatter)==null?void 0:n.showArticleMetadata)??!0)?(p(),d(r,{key:0,article:s.$frontmatter},null,8,["article"])):S("",!0)]}),_:1}),u])}const k=y(C,[["render",x]]);export{f as __pageData,k as default};
