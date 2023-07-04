import{_ as l}from"./chunks/ArticleMetadata.9dfa2fc3.js";import{_ as n,D as d,o as s,c,G as m,B as _,z as i,a as u,R as p,A as h,C as f}from"./chunks/framework.e2a84f7d.js";const C="/assets/CAP.63563235.png",g=JSON.parse('{"title":"分布式系统","description":"","frontmatter":{},"headers":[],"relativePath":"md/distributed/DistributedSystem.md","filePath":"md/distributed/DistributedSystem.md","lastUpdated":1688441607000}'),P={name:"md/distributed/DistributedSystem.md"},A=i("h1",{id:"分布式系统",tabindex:"-1"},[u("分布式系统 "),i("a",{class:"header-anchor",href:"#分布式系统","aria-label":'Permalink to "分布式系统"'},"​")],-1),b=p('<p>  分布式系统是部分在不同的节点上，通过网络协同工作的系统</p><h2 id="cap" tabindex="-1">CAP <a class="header-anchor" href="#cap" aria-label="Permalink to &quot;CAP&quot;">​</a></h2><ul><li>Consistency：all nodes see the same data at the same time <ul><li>一致性：更新操作成功并返回客户端完成后，分布式的所有节点在同一时间大的数据完全一致；</li></ul></li><li>Availability：read and writes always succeed. <ul><li>可用性：读和写操作都能成功；-</li></ul></li><li>Partition tolerance：the system continues to operate despite arbitrary message loss or failure of part of the system <ul><li>分区容错性：再出现网络故障导致分布式节点间不能通信时，系统能否继续服务</li></ul></li></ul><p>  在分布式系统的设计中，没有一种设计可以同时满足一致性，可用性，分区容错性3个特性。C、A、P 只能同时满足两个目标，而由于在分布式系统中，P 是必须要保留的，所以要在 C 和 A 间进行取舍。假如要保证服务的可用性，就选择 AP 模型，而要保证一致性的话，就选择 CP 模型。</p><p><img src="'+C+'" alt="CAP"></p>',5);function y(e,S,D,N,T,V){const r=l,o=d("ClientOnly");return s(),c("div",null,[A,m(o,null,{default:_(()=>{var t,a;return[(((t=e.$frontmatter)==null?void 0:t.aside)??!0)&&(((a=e.$frontmatter)==null?void 0:a.showArticleMetadata)??!0)?(s(),h(r,{key:0,article:e.$frontmatter},null,8,["article"])):f("",!0)]}),_:1}),b])}const B=n(P,[["render",y]]);export{g as __pageData,B as default};
