import{_}from"./chunks/ArticleMetadata.8b6b367a.js";import{_ as m,H as s,o as i,c as p,C as n,a as r,J as o,E as u,V as h,D as f,G as C}from"./chunks/framework.981adca9.js";const P="/charles-blog/assets/CAP.63563235.png",S=JSON.parse('{"title":"分布式系统","description":"","frontmatter":{"title":"分布式系统","author":"Charles Chu","date":"2022/09/22","isOriginal":true},"headers":[],"relativePath":"md/distributed/index.md","filePath":"md/distributed/index.md","lastUpdated":1691825438000}'),A={name:"md/distributed/index.md"},g={id:"分布式系统",tabindex:"-1"},y=n("a",{class:"header-anchor",href:"#分布式系统","aria-label":'Permalink to "分布式系统 <Badge text="持续更新" type="warning" />"'},"​",-1),b=h('<p>  分布式系统是部分在不同的节点上，通过网络协同工作的系统</p><h2 id="cap" tabindex="-1">CAP <a class="header-anchor" href="#cap" aria-label="Permalink to &quot;CAP&quot;">​</a></h2><ul><li>Consistency：all nodes see the same data at the same time <ul><li>一致性：更新操作成功并返回客户端完成后，分布式的所有节点在同一时间大的数据完全一致；</li></ul></li><li>Availability：read and writes always succeed. <ul><li>可用性：读和写操作都能成功；-</li></ul></li><li>Partition tolerance：the system continues to operate despite arbitrary message loss or failure of part of the system <ul><li>分区容错性：再出现网络故障导致分布式节点间不能通信时，系统能否继续服务</li></ul></li></ul><p>  在分布式系统的设计中，没有一种设计可以同时满足一致性，可用性，分区容错性 3 个特性。C、A、P 只能同时满足两个目标，而由于在分布式系统中，P 是必须要保留的，所以要在 C 和 A 间进行取舍。假如要保证服务的可用性，就选择 AP 模型，而要保证一致性的话，就选择 CP 模型。</p><p><img src="'+P+'" alt="CAP"></p>',5);function x(e,V,B,N,T,$){const l=s("Badge"),d=_,c=s("ClientOnly");return i(),p("div",null,[n("h1",g,[r("分布式系统 "),o(l,{text:"持续更新",type:"warning"}),r(),y]),o(c,null,{default:u(()=>{var t,a;return[(((t=e.$frontmatter)==null?void 0:t.aside)??!0)&&(((a=e.$frontmatter)==null?void 0:a.showArticleMetadata)??!0)?(i(),f(d,{key:0,article:e.$frontmatter},null,8,["article"])):C("",!0)]}),_:1}),b])}const v=m(A,[["render",x]]);export{S as __pageData,v as default};
