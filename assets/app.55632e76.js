import{d,u as p,o as m,c as g,C as s,b as o,a as i,V as h,S as b,U as j,_ as k,l as w,D as y,E as v,J as A,Q as r,a7 as P,a8 as C,a9 as x,aa as S,ab as E,ac as V,ad as $,ae as D,af as R,ag as I,M as L,p as T,k as B,ah as N,ai as O,aj as F,ak as J}from"./chunks/framework.981adca9.js";import{t as l}from"./chunks/theme.9dbacb91.js";const M="/charles-blog/img/avatar.png",U="/charles-blog/img/entry.png",G="/charles-blog/common/new.png",u=a=>(b("data-v-7cfa5c7e"),a=a(),j(),a),H={class:"home-page"},Q=h('<div class="header" data-v-7cfa5c7e><img src="'+M+'" class="avatar" data-v-7cfa5c7e><div class="title" data-v-7cfa5c7e>欢迎来到小朱的博客站</div><div class="label" data-v-7cfa5c7e>学习、思考、编写，我的 coding 生活-2</div></div><div class="sub-title" data-v-7cfa5c7e><img src="'+U+'" data-v-7cfa5c7e> 快捷入口 </div>',2),q={class:"links-list"},z={href:"/charles-blog/md/java/",class:"link"},K=["src"],W=u(()=>s("span",null,"跨平台的高级编程语言",-1)),X={href:"/charles-blog/md/database/",class:"link"},Y=["src"],Z=u(()=>s("span",null,"用于存储和管理数据的软件系统",-1)),aa={href:"/charles-blog/md/network/",class:"link"},ea=["src"],ta=u(()=>s("span",null,"实现计算机网络的各种技术和协议",-1)),sa=h('<div class="sub-title" data-v-7cfa5c7e><img src="'+G+'" data-v-7cfa5c7e> 最近更新 </div><div class="new-list" data-v-7cfa5c7e><a href="/charles-blog/md/java/java-basic/java-basic-1/" class="link" data-v-7cfa5c7e>new1</a><a href="/charles-blog/md/java/java-basic/java-basic-1/" class="link" data-v-7cfa5c7e>new1</a><a href="/charles-blog/md/java/java-basic/java-basic-1/" class="link" data-v-7cfa5c7e>new1</a><a href="/charles-blog/md/java/java-basic/java-basic-1/" class="link" data-v-7cfa5c7e>new1</a><a href="/charles-blog/md/java/java-basic/java-basic-1/" class="link" data-v-7cfa5c7e>new1</a></div>',2),ca=d({__name:"Page",setup(a){const{isDark:e}=p();return(t,c)=>(m(),g("div",H,[Q,s("div",q,[s("a",z,[s("p",null,[s("img",{src:`${o(e)?"/java-dark.png":"/java.png"}`},null,8,K),i(" Java ")]),W]),s("a",X,[s("p",null,[s("img",{src:`${o(e)?"/common/icon-database-dark.png":"/common/icon-database.png"}`},null,8,Y),i(" 数据库 ")]),Z]),s("a",aa,[s("p",null,[s("img",{src:`${o(e)?"/common/icon-network-dark.png":"/common/icon-network.png"}`},null,8,ea),i(" 网络 ")]),ta])]),sa]))}});const na=k(ca,[["__scopeId","data-v-7cfa5c7e"]]),oa=d({__name:"Layout",setup(a){const{Layout:e}=l,{page:t,theme:c,frontmatter:_}=p();return w(()=>_.value.aside!==!1&&_.value.layout!=="home"),(ua,_a)=>(m(),y(o(e),null,{"home-hero-before":v(()=>[]),"home-features-after":v(()=>[A(na)]),_:1}))}});const ia={...l,Layout:oa,enhanceApp(a){l.enhanceApp(a)}};function f(a){if(a.extends){const e=f(a.extends);return{...e,...a,async enhanceApp(t){e.enhanceApp&&await e.enhanceApp(t),a.enhanceApp&&await a.enhanceApp(t)}}}return a}const n=f(ia),ra=d({name:"VitePressApp",setup(){const{site:a}=p();return T(()=>{B(()=>{document.documentElement.lang=a.value.lang,document.documentElement.dir=a.value.dir})}),N(),O(),F(),n.setup&&n.setup(),()=>J(n.Layout)}});async function la(){const a=pa(),e=da();e.provide(C,a);const t=x(a.route);return e.provide(S,t),e.component("Content",E),e.component("ClientOnly",V),Object.defineProperties(e.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),n.enhanceApp&&await n.enhanceApp({app:e,router:a,siteData:$}),{app:e,router:a,data:t}}function da(){return D(ra)}function pa(){let a=r,e;return R(t=>{let c=I(t);return a&&(e=c),(a||e===c)&&(c=c.replace(/\.js$/,".lean.js")),r&&(a=!1),L(()=>import(c),[])},n.NotFound)}r&&la().then(({app:a,router:e,data:t})=>{e.go().then(()=>{P(e.route,t.site),a.mount("#app")})});export{la as createApp};
