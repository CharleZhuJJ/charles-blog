# SpringMVC

![springmvc](/public/java/spring/springMvc.png)

1. 用户发送请求至前端控制器 (DispatcherServlet)。
2. DispatcherServlet 收到请求调用 HandlerMapping 处理器映射器。
3. 处理器映射器找到具体的处理器（可以根据 xml 配置、注解进行查找） ，生成处理器对象及处理器拦截器（如果有则生成）一并返回给 DispatcherServlet。
4. DispatcherServlet 调用 HandlerAdaptor 处理器适配器。
5. HandlerAdaptoer 经过适配调用具体的处理器（Controller，也叫后端控制器）。
6. Controller 执行完返回 ModelAndView。
7. HandlerAdaptor 将 controller 执行结果 ModelAndView 返回给 DispatcherServlet 。
8. DisptcherServlet 将 ModelAndView 传给 ViewResolver 视图解析器。
9. ViewResolver 解析后返回具体视图 (View) 。
10. DispatcherServlet 根据 View 进行渲染视图（即将模型数据填充至视图中）。
11. DispatcherServlet 响应用户。
