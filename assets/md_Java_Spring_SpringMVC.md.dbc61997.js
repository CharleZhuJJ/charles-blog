import{_ as o}from"./chunks/ArticleMetadata.4c626a83.js";import{_ as s,D as c,o as a,c as p,G as d,B as _,z as i,a as m,R as S,A as h,C as V}from"./chunks/framework.ef995079.js";const g="/charles-blog/assets/springMvc.73598b47.png",k=JSON.parse('{"title":"SpringMVC","description":"","frontmatter":{},"headers":[],"relativePath":"md/Java/Spring/SpringMVC.md","filePath":"md/Java/Spring/SpringMVC.md","lastUpdated":1688441607000}'),v={name:"md/Java/Spring/SpringMVC.md"},C=i("h1",{id:"springmvc",tabindex:"-1"},[m("SpringMVC "),i("a",{class:"header-anchor",href:"#springmvc","aria-label":'Permalink to "SpringMVC"'},"​")],-1),f=S('<p><img src="'+g+'" alt="springmvc"></p><ol><li>用户发送请求至前端控制器 (DispatcherServlet)。</li><li>DispatcherServlet 收到请求调用 HandlerMapping 处理器映射器。</li><li>处理器映射器找到具体的处理器（可以根据 xml 配置、注解进行查找） ，生成处理器对象及处理器拦截器（如果有则生成）一并返回给 DispatcherServlet。</li><li>DispatcherServlet 调用 HandlerAdaptor 处理器适配器。</li><li>HandlerAdaptoer 经过适配调用具体的处理器（Controller，也叫后端控制器）。</li><li>Controller 执行完返回 ModelAndView。</li><li>HandlerAdaptor 将 controller 执行结果 ModelAndView 返回给 DispatcherServlet 。</li><li>DisptcherServlet 将 ModelAndView 传给 ViewResolver 视图解析器。</li><li>ViewResolver 解析后返回具体视图 (View) 。</li><li>DispatcherServlet 根据 View 进行渲染视图（即将模型数据填充至视图中）。</li><li>DispatcherServlet 响应用户。</li></ol>',2);function M(e,u,A,D,w,N){const l=o,n=c("ClientOnly");return a(),p("div",null,[C,d(n,null,{default:_(()=>{var t,r;return[(((t=e.$frontmatter)==null?void 0:t.aside)??!0)&&(((r=e.$frontmatter)==null?void 0:r.showArticleMetadata)??!0)?(a(),h(l,{key:0,article:e.$frontmatter},null,8,["article"])):V("",!0)]}),_:1}),f])}const B=s(v,[["render",M]]);export{k as __pageData,B as default};
