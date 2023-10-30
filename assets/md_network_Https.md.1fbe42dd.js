import{_ as p}from"./chunks/ArticleMetadata.8b6b367a.js";import{_ as c,H as l,o as i,c as d,C as s,a as r,J as o,E as P,V as u,D as H,G as S}from"./chunks/framework.981adca9.js";const _="/charles-blog/assets/HttpsProcess.435fc744.png",A=JSON.parse('{"title":"Https","description":"","frontmatter":{"title":"Https","author":"Charles Chu","date":"2022/09/28","isOriginal":true},"headers":[],"relativePath":"md/network/Https.md","filePath":"md/network/Https.md","lastUpdated":1691919419000}'),m={name:"md/network/Https.md"},f={id:"https",tabindex:"-1"},b=s("a",{class:"header-anchor",href:"#https","aria-label":'Permalink to "Https <Badge text="持续更新" type="warning" />"'},"​",-1),q=u('<p>  HTTPS （全称：Hypertext Transfer Protocol Secure），是以安全为目标的 HTTP 通道，在HTTP的基础上通过传输加密和身份认证保证了传输过程的安全性 。HTTPS 在HTTP 的基础下加入SSL，HTTPS 的安全基础是 SSL，因此加密的详细内容就需要 SSL。</p><h2 id="http与https的区别" tabindex="-1">HTTP与HTTPS的区别 <a class="header-anchor" href="#http与https的区别" aria-label="Permalink to &quot;HTTP与HTTPS的区别&quot;">​</a></h2><p>  HTTP 是明文传输协议，HTTPS 协议是由 SSL+HTTP 协议构建的可进行加密传输、身份认证的网络协议，比 HTTP 协议安全</p><ul><li>HTTPS比HTTP更加安全，对搜索引擎更友好，利于SEO，谷歌、百度优先索引HTTPS网页</li><li>HTTPS需要用到SSL证书，而HTTP不用</li><li>HTTPS标准端口443，HTTP标准端口80</li><li>HTTPS基于传输层，HTTP基于应用层</li><li>HTTPS在浏览器显示绿色安全锁，HTTP没有显示</li></ul><h2 id="https的整体过程" tabindex="-1">HTTPS的整体过程 <a class="header-anchor" href="#https的整体过程" aria-label="Permalink to &quot;HTTPS的整体过程&quot;">​</a></h2><p>  HTTPS的整体过程分为证书验证和数据传输阶段，HTTPS 在内容传输的加密上使用的是对称加密，非对称加密只作用在证书验证阶段。具体的交互过程如下： <img src="'+_+'" alt="HttpsProcess"></p><h3 id="证书验证阶段" tabindex="-1">证书验证阶段 <a class="header-anchor" href="#证书验证阶段" aria-label="Permalink to &quot;证书验证阶段&quot;">​</a></h3><ul><li>浏览器发起 HTTPS 请求。</li><li>服务端返回 HTTPS 证书。（Server把事先配置好的公钥证书返回给客户端）</li><li>客户端验证证书是否合法，如果不合法则提示告警。（比如是否在有效期内，证书的用途是不是匹配Client请求的站点，是不是在CRL吊销列表里面，它的上一级证书是否有效，这是一个递归的过程，直到验证到根证书（操作系统内置的Root证书或者Client内置的Root证书））</li></ul><h3 id="数据传输阶段" tabindex="-1">数据传输阶段 <a class="header-anchor" href="#数据传输阶段" aria-label="Permalink to &quot;数据传输阶段&quot;">​</a></h3><ul><li>当证书验证合法后，在本地生成随机数。</li><li>通过公钥加密随机数，并把加密后的随机数传输到服务端。</li><li>服务端通过私钥对随机数进行解密。</li><li>服务端通过客户端传入的随机数构造对称加密算法，对返回结果内容进行加密后传输。</li></ul><h4 id="为什么数据传输是用对称加密" tabindex="-1">为什么数据传输是用对称加密 <a class="header-anchor" href="#为什么数据传输是用对称加密" aria-label="Permalink to &quot;为什么数据传输是用对称加密&quot;">​</a></h4><p>  首先，非对称加密的加解密效率是非常低的，而 HTTP 的应用场景中通常端与端之间存在大量的交互，非对称加密的效率是无法接受的。</p><p>  另外，在 HTTPS 的场景中只有服务端保存了私钥，一对公私钥只能实现单向的加解密，所以 HTTPS 中内容传输加密采取的是对称加密，而不是非对称加密。</p><h2 id="证书" tabindex="-1">证书 <a class="header-anchor" href="#证书" aria-label="Permalink to &quot;证书&quot;">​</a></h2><p>  SSL证书是数字证书的一种，类似于驾驶证、护照和营业执照的电子副本。因为配置在服务器上，也称为SSL服务器证书。</p><h3 id="为什么需要证书" tabindex="-1">为什么需要证书 <a class="header-anchor" href="#为什么需要证书" aria-label="Permalink to &quot;为什么需要证书&quot;">​</a></h3><p>  防止“中间人”攻击，同时可以为网站提供身份证明。</p><p>  将服务器公钥放在数字证书（由数字证书认证机构颁发）中，只要证书是可信的，公钥就是可信的。</p><h3 id="证书包含信息" tabindex="-1">证书包含信息 <a class="header-anchor" href="#证书包含信息" aria-label="Permalink to &quot;证书包含信息&quot;">​</a></h3><ul><li>颁发机构信息</li><li>公钥</li><li>公司信息</li><li>域名</li><li>有效期</li><li>指纹</li></ul><h3 id="证书的合法性依据是什么" tabindex="-1">证书的合法性依据是什么 <a class="header-anchor" href="#证书的合法性依据是什么" aria-label="Permalink to &quot;证书的合法性依据是什么&quot;">​</a></h3><p>  首先，权威机构是要有认证的，不是随便一个机构都有资格颁发证书，不然也不叫做权威机构。</p><p>  另外，证书的可信性基于信任制，权威机构需要对其颁发的证书进行信用背书，只要是权威机构生成的证书，我们就认为是合法的。</p><p>  所以权威机构会对申请者的信息进行审核，不同等级的权威机构对审核的要求也不一样，于是证书也分为免费的、便宜的和贵的。</p><h3 id="浏览器如何验证证书的合法性" tabindex="-1">浏览器如何验证证书的合法性 <a class="header-anchor" href="#浏览器如何验证证书的合法性" aria-label="Permalink to &quot;浏览器如何验证证书的合法性&quot;">​</a></h3><ul><li>验证域名、有效期等信息是否正确。证书上都有包含这些信息，比较容易完成验证。</li><li>判断证书来源是否合法。每份签发证书都可以根据验证链查找到对应的根证书，操作系统、浏览器会在本地存储权威机构的根证书，利用本地根证书可以对对应机构签发证书完成来源验证。</li><li>判断证书是否被篡改。 需要与 CA 服务器进行校验。</li><li>判断证书是否已吊销。 通过 CRL（Certificate Revocation List 证书注销列表）和 OCSP（Online Certificate Status Protocol 在线证书状态协议）实现。其中 OCSP 可用于第 3 步中以减少与 CA 服务器的交互，提高验证效率。</li></ul><p>  以上任意一步都满足的情况下浏览器才认为证书是合法的。</p><h2 id="使用-https-会被抓包吗" tabindex="-1">使用 HTTPS 会被抓包吗 <a class="header-anchor" href="#使用-https-会被抓包吗" aria-label="Permalink to &quot;使用 HTTPS 会被抓包吗&quot;">​</a></h2><p>  会被抓包，HTTPS 只防止用户在不知情的情况下通信被监听，如果用户主动授信，是可以构建“中间人”网络，代理软件可以对传输内容进行解密。</p><p>  HTTPS 可以防止用户在不知情的情况下通信链路被监听，对于主动授信的抓包操作是不提供防护的，因为这个场景用户是已经对风险知情。</p>',30);function C(t,k,x,g,L,O){const n=l("Badge"),T=p,h=l("ClientOnly");return i(),d("div",null,[s("h1",f,[r("Https "),o(n,{text:"持续更新",type:"warning"}),r(),b]),o(h,null,{default:P(()=>{var a,e;return[(((a=t.$frontmatter)==null?void 0:a.aside)??!0)&&(((e=t.$frontmatter)==null?void 0:e.showArticleMetadata)??!0)?(i(),H(T,{key:0,article:t.$frontmatter},null,8,["article"])):S("",!0)]}),_:1}),q])}const B=c(m,[["render",C]]);export{A as __pageData,B as default};
