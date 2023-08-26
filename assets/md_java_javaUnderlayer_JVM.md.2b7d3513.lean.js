import{_ as t}from"./chunks/ArticleMetadata.4c626a83.js";import{_ as c,D as r,o as n,c as i,G as y,B as A,z as p,a as C,R as d,A as h,C as F}from"./chunks/framework.ef995079.js";const m="/charles-blog/assets/MemorySructure.18f753c4.png",u="/charles-blog/assets/HeapMemory.8413a280.png",B="/charles-blog/assets/ParameterMemory.abd0fc32.png",D="/charles-blog/assets/Top.4c111966.png",E="/charles-blog/assets/TopHp.56faf511.png",g="/charles-blog/assets/Jstack.ca7241a7.png",v="data:image/png;base64,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",b="/charles-blog/assets/JstackLock.9391f4fd.png",j="/charles-blog/assets/Mat.ba81d50e.png",k="/charles-blog/assets/MatLeak.232e25a5.png",q=JSON.parse('{"title":"JVM","description":"","frontmatter":{},"headers":[],"relativePath":"md/java/javaUnderlayer/JVM.md","filePath":"md/java/javaUnderlayer/JVM.md","lastUpdated":1688473590000}'),f={name:"md/java/javaUnderlayer/JVM.md"},M=p("h1",{id:"jvm",tabindex:"-1"},[C("JVM "),p("a",{class:"header-anchor",href:"#jvm","aria-label":'Permalink to "JVM"'},"​")],-1),S=d("",61);function J(s,T,x,P,V,G){const o=t,e=r("ClientOnly");return n(),i("div",null,[M,y(e,null,{default:A(()=>{var a,l;return[(((a=s.$frontmatter)==null?void 0:a.aside)??!0)&&(((l=s.$frontmatter)==null?void 0:l.showArticleMetadata)??!0)?(n(),h(o,{key:0,article:s.$frontmatter},null,8,["article"])):F("",!0)]}),_:1}),S])}const O=c(f,[["render",J]]);export{q as __pageData,O as default};