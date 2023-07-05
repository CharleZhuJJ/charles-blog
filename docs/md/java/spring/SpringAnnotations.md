---
outline: deep
---

# Spring注解
## 元注解
&emsp;元注解的作用就是负责注解其它注解，Java定义了4个标准的meta-annotation类型，他们被用来提供对其它annotation类型作说明。

&emsp;这些类型和它们所支持的类在 java.lang.annotation包可以找到 @Target 、@Retention、@Documented、@Inherited

- @Target：用于描述注解的使用范围，即：被描述的注解可以在什么地方使用
- @Retention：表示需要什么保存该注释信息，用于描述注解的生命周期；
    - 级别范围：Source < Class < Runtime
- @Document：说明该注解被包含在java doc中
- @Inherited：说明子类可以集成父类中的注解

## 自定义注解
&emsp; 使用 @interface自定义注解时，自动继承了 java.lang.annotation.Annotation接口

- @interface 用来声明一个注解，格式：public @interface 注解名 {定义内容}
- 其中的每个方法实际上是申明了一个配置参数
- 方法的名称就是参数的名称
- 返回值类型就是参数的类型（返回值只能是基本数据类型，Class，String，enum）
- 通过default来申明参数的默认值
- 如果只有一个参数成员，一般参数名为 value
- 注解元素必须要有值，我们定义元素时，经常使用空字符串或者0作为默认值

## @Component
- 作用：用于把当前类对象存入spring容器中
- 属性：value：用于指定bean的id。当我们不写时，它的默认值是当前类名，且首字母改小写。

## @Configuration
- 用于指定当前类是一个 spring 配置类，当创建容器时会从该类上加载注解。
- 获取容器时需要使用AnnotationApplicationContext(有@Configuration注解的类.class)。
- 当配置类作为AnnotationConfigApplicationContext对象创建的参数时，该注解可以不写。

## @ComponentScan
&emsp; 用于指定 spring 在初始化容器时要扫描的包。作用和在 spring 的 xml 配置文件中的：<context:component-scan base-package="com.itheima"/>是一样的。

- 自动扫描并加载符合条件的组件（比如@Component和@Repository等）或者bean定义，最终将这些bean定义加载到IoC容器中。
- 我们可以通过basePackages等属性来细粒度的定制@ComponentScan自动扫描的范围，如果不指定，则默认Spring框架实现会从声明@ComponentScan所在类的package进行扫描。

&emsp; 注：所以SpringBoot的启动类最好是放在root package下，因为默认不指定basePackages

## @Bean
&emsp; 该注解只能写在方法上，表明使用此方法创建一个对象，并且放入 spring 容器。

- 属性：name：给当前@Bean 注解方法创建的对象指定一个名称(即 bean 的 id）。
```java
@Target({ElementType.METHOD, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Bean {
    @AliasFor("name")
    String[] value() default {};
    @AliasFor("value")
    String[] name() default {};
    Autowire autowire() default Autowire.NO;
    String initMethod() default ""; // bean的初始化之前的执行方法，该参数一般不怎么用，因为完全可以在代码中实现；
    // 默认使用javaConfig配置的bean，如果存在close或者shutdown方法，则在bean销毁时会自动执行该方法。
    // 如果你不想执行该方法，则添加@Bean(destroyMethod="")来防止出发销毁方法；
    String destroyMethod() default AbstractBeanDefinition.INFER_METHOD;
}
```

## @Lazy
- 表明一个bean 是否延迟加载，可以作用在方法上，表示这个方法被延迟加载；可以作用在@Component (或者由@Component 作为原注解) 注释的类上，表明这个类中所有的bean 都被延迟加载。
- 如果没有@Lazy注释，或者@Lazy 被设置为false，那么该bean 就会急切渴望被加载；
- @Lazy 可以作用在@Autowired和@Inject注释的属性上，它将为该字段创建一个惰性代理，作为使用ObjectFactory或Provider的默认方法。

## @PropertySource
- 用于加载.properties文件中的配置。
- 例如我们配置数据源时，可以把连接数据库的信息写到properties 配置文件中，就可以使用此注解指定properties配置文件的位置。
- 属性：value[]：用于指定 properties 文件位置。（！！！！如果是在类路径下，需要写上 classpath: ！！！！）

## @Import
- 用于导入其他配置类，在引入其他配置类时，可以不用再写@Configuration 注解。
- 属性：value[]：用于指定其他配置类的字节码。

## @Resource和@Autowired
- @Resource和@Autowired都是做bean的注入时使用
- @Resource并不是Spring的注解，它的包是javax.annotation.Resource，需要导入，但是Spring支持该注解的注入。
- @Autowired为Spring提供的注解，需要导入包org.springframework.beans.factory.annotation.Autowired;只按照byType注入。

### @Autowired
- @Autowired注解是按照类型(byType)装配依赖对象，默认情况下它要求依赖对象必须存在，如果允许null值，设置它的required属性为false。
- 如果我们想使用按照名称（byName）来装配，可以结合@Qualifier注解一起使用。
- @Autowired可用于：构造函数、成员变量、Setter方法

### @Resource
- @Resource默认按照ByName自动注入，由J2EE提供，需要导入包javax.annotation.Resource。
- @Resource有两个重要的属性：name和type，而Spring将@Resource注解name属性解析为bean的名字，而type属性则解析为bean的类型。
- 所以，如果使用name属性，则使用byName的自动注入策略，而使用type属性时则使用byType自动注入策略。如果既不制定name也不制定type属性，这时将通过反射机制使用byName自动注入策略。

## @Required
&emsp; 这个注解表明bean的属性必须在配置的时候设置，通过一个bean定义的显式的属性值或通过自动装配，若@Required注解的bean属性未被设置，容器将抛出BeanInitializationException。