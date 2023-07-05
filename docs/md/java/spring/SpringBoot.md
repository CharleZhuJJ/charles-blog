# SpringBoot

## SpringBoot 的 starters（场景启动器）

&emsp; Spring Boot 通过将我们常用的功能场景抽取出来，做成的一系列场景启动器，这些启动器帮我们导入了实现各个功能所需要依赖的全部组件，我们只需要在项目中引入这些 starters，相关场景的所有依赖就会全部被导入进来，并且我们可以抛弃繁杂的配置，仅需要通过配置文件来进行少量的配置就可以使用相应的功能。

## 自动装配

&emsp; SpringBoot 定义了一套接口规范，这套规范规定：SpringBoot 在启动时会扫描外部引用 jar 包中的 META-INF/spring.factories 文件，将文件中配置的类型信息加载到 Spring 容器，并执行类中定义的各种操作。对于外部 jar 来说，只需要按照 SpringBoot 定义的标准，就能将自己的功能装置进 SpringBoot。

&emsp; 具体实现：

1. SpringBoot 的核心注解@SpringBootApplication，其包含了@EnableAutoConfiguration 注解，启用 SpringBoot 的自动配置机制；
2. @EnableAutoConfiguration 是一个简单地注解，自动装配核心功能的实现是通过 AutoConfigurationImportSelector 类；
3. AutoConfigurationImportSelector 实现 ImportSelector 接口中的 selectImports 方法，主要用于获取所有符合条件的类的全限定类名，加载到 IoC 容器中

```java
public String[] selectImports(AnnotationMetadata annotationMetadata) {
    // 判断自动装配开关是否打开。默认spring.boot.enableautoconfiguration=true；
    // 可在 application.properties 或 application.yml 中设置
    if (!this.isEnabled(annotationMetadata)) {
        return NO_IMPORTS;
    } else {
        // 获取所有需要装配的bean
        AutoConfigurationMetadata autoConfigurationMetadata =
                                            AutoConfigurationMetadataLoader.loadMetadata(this.beanClassLoader);
        // 用于获取EnableAutoConfiguration注解中的 exclude 和 excludeName。
        AnnotationAttributes attributes = this.getAttributes(annotationMetadata);
       // 获取需要自动装配的所有配置类，读取META-INF/spring.factories
       List<String> configurations = this.getCandidateConfigurations(annotationMetadata, attributes);
       // 去除重复配置类
       configurations = this.removeDuplicates(configurations);
       Set<String> exclusions = this.getExclusions(annotationMetadata, attributes);
       this.checkExcludedClasses(configurations, exclusions);
       configurations.removeAll(exclusions);
       // 筛选，@ConditionalOnXXX 中的所有条件都满足，该类才会生效；
       configurations = this.filter(configurations, autoConfigurationMetadata);
       this.fireAutoConfigurationImportEvents(configurations, exclusions);
        return StringUtils.toStringArray(configurations);
    }
}
```

&emsp; Spring Boot 通过@EnableAutoConfiguration 开启自动装配，通过 SpringFactoriesLoader 最终加载 META-INF/spring.factories 中的自动配置类实现自动装配，自动配置类其实就是通过@Conditional 按需加载的配置类，想要其生效必须引入 spring-boot-starter-xxx 包实现起步依赖。

![Conditional](/public/java/spring/Conditional.png)

## Springboot 注解

### 1、@SpringBootApplication

&emsp; 申明让 spring boot 自动给程序进行必要的配置，这个配置等同于：@Configuration ，@EnableAutoConfiguration 和 @ComponentScan 三个配置。

### 2、@ResponseBody

&emsp; 表示该方法的返回结果直接写入 HTTP response body 中，一般在异步获取数据时使用，用于构建 RESTful 的 api。
加上@Responsebody 后，会直接返回 json 数据。该注解一般会配合@RequestMapping 一起使用。

### 3、@Controller

&emsp; 用于定义控制器类，在 spring 项目中由控制器负责将用户发来的 URL 请求转发到对应的服务接口（service 层），一般这个注解在类中，通常方法需要配合注解@RequestMapping。在对应的方法上，视图解析器可以解析 return 的 jsp,html 页面，并且跳转到相应页面；若返回 json 等内容到页面，则需要加@ResponseBody 注解；

### 4、@RestController

&emsp; 用于标注控制层组件(如 struts 中的 action)，@ResponseBody + @Controller

### 5、@RequestMapping

&emsp; 提供路由信息，负责 URL 到 Controller 中的具体函数的映射。RequestMapping 是一个用来处理请求地址映射的注解，可用于类或方法上。

&emsp; 用于类上，表示类中的所有响应请求的方法都是以该地址作为父路径。该注解有六个属性：

- params:指定 request 中必须包含某些参数值是，才让该方法处理。
- headers:指定 request 中必须包含某些指定的 header 值，才能让该方法处理请求。
- value:指定请求的实际地址，指定的地址可以是 URI Template 模式
- method:指定请求的 method 类型， GET、POST、PUT、DELETE 等
- consumes:指定处理请求的提交内容类型（Content-Type），如 application/json,text/html;
- produces:指定返回的内容类型，仅当 request 请求头中的(Accept)类型中包含该指定类型才返回

### 6、@EnableAutoConfiguration

&emsp; SpringBoot 自动配置（auto-configuration）：尝试根据你添加的 jar 依赖自动配置你的 Spring 应用。例如，如果你的 classpath 下存在 HSQLDB，并且你没有手动配置任何数据库连接 beans，那么我们将自动配置一个内存型（in-memory）数据库”。你可以将@EnableAutoConfiguration 或者@SpringBootApplication 注解添加到一个@Configuration 类上来选择自动配置。如果发现应用了你不想要的特定自动配置类，你可以使用@EnableAutoConfiguration 注解的排除属性来禁用它们。

- 借助@Import 的帮助，将所有符合自动配置条件的 bean 定义加载到 IoC 容器。最关键的要属@Import(EnableAutoConfigurationImportSelector.class)，借助 EnableAutoConfigurationImportSelector，可以帮助 SpringBoot 应用将所有符合条件的@Configuration 配置都加载到当前 SpringBoot 创建并使用的 IoC 容器
- @EnableAutoConfiguration 会根据类路径中的 jar 依赖为项目进行自动配置，如：添加了 spring-boot-starter-web 依赖，会自动添加 Tomcat 和 Spring MVC 的依赖，Spring Boot 会对 Tomcat 和 Spring MVC 进行自动配置。

### 7、@ComponentScan

&emsp; 表示将该类自动发现扫描组件。如果扫描到有@Component、@Controller、@Service 等这些注解的类，并注册为 Bean，可以自动收集所有的 Spring 组件，包括@Configuration 类。我们经常使用@ComponentScan 注解搜索 beans，并结合@Autowired 注解导入。可以自动收集所有的 Spring 组件，包括@Configuration 类。我们经常使用@ComponentScan 注解搜索 beans，并结合@Autowired 注解导入。如果没有配置的话，Spring Boot 会扫描启动类所在包下以及子包下的使用了@Service,@Repository 等注解的类。

### 8、@Configuration

&emsp; 相当于传统的 xml 配置文件，如果有些第三方库需要用到 xml 文件，建议仍然通过@Configuration 类作为项目的配置主类——可以使用@ImportResource 注解加载 xml 配置文件。

### 9、@Import

&emsp; 用来导入其他配置类。

### 10、@ImportResource

&emsp; 用来加载 xml 配置文件。

### 11、@Autowired

&emsp; 自动导入依赖的 bean。byType 方式。把配置好的 Bean 拿来用，完成属性、方法的组装，它可以对类成员变量、方法及构造函数进行标注，完成自动装配的工作。当加上（required=false）时，就算找不到 bean 也不报错。
@Inject：等价于默认的@Autowired，只是没有 required 属性；

### 12、@Qualifier

&emsp; 当有多个同一类型的 Bean 时，可以用@Qualifier(“name”)来指定。与@Autowired 配合使用。@Qualifier 限定描述符除了能根据名字进行注入，但能进行更细粒度的控制如何选择候选者

### 13、@Service

&emsp; 一般用于修饰 service 层的组件

### 14、@Repository

&emsp; 使用@Repository 注解可以确保 DAO 或者 repositories 提供异常转译，这个注解修饰的 DAO 或者 repositories 类会被 ComponetScan 发现并配置，同时也不需要为它们提供 XML 配置项。

### 15、@Bean

&emsp; 用@Bean 标注方法等价于 XML 中配置的 bean。意思是产生一个 bean,并交给 spring 管理。

### 16、@DependsOn

&emsp; @DependsOn 注解可以配置 Spring IoC 容器在初始化一个 Bean 之前，先初始化其他的 Bean 对象。

### 17、@Primary

&emsp; 当系统中需要配置多个具有相同类型的 bean 时，@Primary 可以定义这些 Bean 的优先级。

### 18、@Value

&emsp; 注入 Spring boot application.properties 配置的属性的值。

### 19、@Component

&emsp; 泛指组件，当组件不好归类的时候，我们可以使用这个注解进行标注。

### 20、@Resource(name=”name”,type=”type”)

&emsp; 没有括号内内容的话，默认 byName。与@Autowired 干类似的事。

### 21、@ControllerAdvice

&emsp; 是@Component 注解的一个延伸注解，Spring 会自动扫描并检测被@ControllerAdvice 所标注的类。@ControllerAdvice 需要和@ExceptionHandler、@InitBinder 以及@ModelAttribute 注解搭配使用，主要是用来处理控制器所抛出的异常信息。

### 22、@ExceptionHandler（Exception.class）

&emsp; 注解用于标注处理特定类型异常类所抛出异常的方法。当控制器中的方法抛出异常时，Spring 会自动捕获异常，并将捕获的异常信息传递给被@ExceptionHandler 标注的方法。

## springboot 读取配置文件的注解

### 1、@Value

```yaml
application.properties：
demo.name=Name
demo.age=18
```

```java
java代码：
@Value("${demo.name}")
private String name;
```

### 2、@ConfigurationProperties

```yaml
application.properties：
demo.phone=10086
demo.wife=self
```

```java
@Component
@ConfigurationProperties(prefix = "demo")    //用于绑定属性，其中prefix表示所绑定的属性的前缀
@PropertySource(value = "config.properties") // 表示配置文件路径
public class ConfigBeanProp {
    // 属性名称和配置文件的name一致
    private String phone;
    private String wife;
}
```

## SpringBoot 中实现跨域的 5 种方式:

&emsp; 域：协议 + 域名 + 端口；三者完全相同则为同域，反之有其一不同均为不同域。
&emsp; 跨域请求：当前【发起请求】的域和【请求指向】的域属于不同域时，该次请求称之为跨域请求。

- 全局跨域
  - 返回新的 CorsFilter ： 在任意配置类，返回一个新的 CorsFIlter 的 Bean ，并添加映射路径和具体的 CORS 配置路径
  - 重写 WebMvcConfigurer 接口的 addCorsMappings 方法
- 局部跨域
  - 使用注解 @CrossOrigin：在类上上使用注解，表示该类的所有方法允许跨域；也可以在方法上使用注解。
  - 手动设置响应头 (HttpServletResponse)：response.addHeader("Access-Allow-Control-Origin","\*")

## springboot 项目配置文件加密

&emsp; 依赖

```xml
<dependency>
    <groupId>com.github.ulisesbocchio</groupId>
    <artifactId>jasypt-spring-boot-starter</artifactId>
    <version>2.1.1</version>
</dependency>
```

```yaml
application.yml
jasypt:
  encryptor:
    password: B6YD-ABFF-EXC6-T9YQ --加密密码，自定义
    algorithm: PBEWithMD5AndDES --加密方式
```

&emsp; 获取加密后的密码

```java
@ContextConfiguration(locations = { "classpath:application-development.yml" })
public class JasyptSamples extends AbstractJUnit4SpringContextTests {
    public final static void main(String[] args) throws Exception {
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        // 加密方式，和配置文件中的algorithm保持一致
        encryptor.setAlgorithm("PBEWithMD5AndDES");
        // 加密密码，和配置文件中的password保持一致
        encryptor.setPassword("B6YD-ABFF-EXC6-T9YQ");

        // 需要加密的原文
        String plainText = "2020workfromhome!";
        // 加密
        String encryptedText = encryptor.encrypt(plainText);
        // 解密
        String decryptedText = encryptor.decrypt(encryptedText);

        System.out.println("plainText: " + plainText + " ---> encryptedText: " + encryptedText);
        System.out.println("encryptedText: " + encryptedText + " ---> decryptedText: " + decryptedText);
    }
}
```

&emsp; 配置文件中使用加密后的密码

```yaml
spring：
  datasource:
    password: ENC(v7n0OYKp1bqYMLHFigGbMg==) -- v7n0OYKp1bqYMLHFigGbMg== 是加密后的密码
```

## SpringBoot 项目使用 SLF4J+logback

&emsp; 在 resource 目录下创建一个文件，命名为 logback.xml

```xml
<?xml version='1.0' encoding='UTF-8'?>
<!--日志配置-->
<configuration>
    <!--直接定义属性-->
    <property name="" value=""/>

    <!--通过配置文件定义属性-->
    <springProperty name="" source=""/>

    <!--定义并描述一个日志的输出属性-->
    <appender name="" class="">
    </appender>

    <!--创建一个具体的日志输出-->
    <logger name="" level="" additivity="">
   	 <appender-ref ref=""/>
    </logger>

    <!--基础的日志输出-->
    <root level="">
   	 <appender-ref ref=""/>
    </root>
</configuration>
```

### 1、configuration

\<configuration>是 logback.xml 这个 xml 文件的根节点，它包含以下属性：

- scan：当此属性设置为 true 时，配置文件如果发生改变，将会被重新加载，默认值为 true。
- scanPeriod：设置监测配置文件是否有修改的时间间隔，如果没有给出时间单位，默认单位是毫秒。当 scan 为 true 时，此属性生效。默认的时间间隔为 1 分钟。
- debug：当此属性设置为 true 时，将打印出 logback 内部日志信息，实时查看 logback 运行状态。默认值为 false。

### 2、property

&emsp; property 可以直接设置，例如：

```xml
<property name="logFile" value="logs/mutest"/>
```

&emsp; 这样就设置了一个名为 logFile 的变量，后续通过${logFile}的方式就引用到了其值 logs/mutest。

### 3、springProperty

&emsp; springProperty 配合配置文件，例如：

```xml
<springProperty name="logFile" source="log.file"/>
```

&emsp; 也是设置了名为 logFile 的变量，但没有直接赋值，而是通过 source 指向了配置文件的路径，配置文件中是这样的：

```yaml
log:
  file: logs/mutest
```

### 4、root

&emsp; root 节点，必选节点，用来指定最基础的日志输出级别并指定\<appender>，可以理解为根 logger。

&emsp; 一个典型的 root 节点如下：

```xml
<root level="debug">
 <appender-ref ref="console" />
 <appender-ref ref="file" />
</root>
```

### 5、appender

&emsp; appender 节点是非常关键的一个节点，负责格式化一个日志输出节点（也就是描述日志存储类型、位置、滚动规则等属性）。appender 作用类似于构造一个日志模板，而 logger 是真正的日志输出者，使用某个 appender 作为模板去写日志。

#### 5.1、ConsoleAppender

&emsp; ConsoleAppender 的作用是将日志输出到控制台，一般在本地调试时使用，它的配置非常简单，一个典型的 ConsoleAppender 如下：

```xml
<appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
 <encoder>
        <pattern>%d [%thread] %-5level %logger{50} -[%file:%line]- %msg%n</pattern>
        <charset>UTF-8</charset>
    </encoder>
</appender>
```

&emsp; appender 有 name 和 class 两个属性：

- name：appender 节点的名称，在后文中被 logger 节点引用。一个 logback 配置文件中不能有重复的 appender name。
- class：使用何种日志输出策略，分别是 ConsoleAppender（控制台日志）、FileAppender（文件日志）、RollingFileAppender（滚动文件日志）。

#### 5.2、RollingFileAppender

&emsp; RollingFileAppender 用于滚动记录文件，先将日志记录到指定文件，当符合某个条件时，将日志记录到其他文件。一个典型的 RollingFileAppender 节点如下：

```xml
<configuration>
 <!--直接定义属性-->
    <property name="logFile" value="logs/mutest"/>
    <property name="maxFileSize" value="30MB"/>

 <appender name="fileLog" class="ch.qos.logback.core.rolling.RollingFileAppender">
  <!--日志文件存储路径，来自property设置-->
        <file>${logFile}.log</file>
        <encoder>
            <pattern>%d [%thread] %-5level -[%file:%line]- %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
         <!--每天生成一个新的活动日志文件，旧的日志归档，后缀名为2019.08.12这种格式-->
            <fileNamePattern>${logFile}.%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <!--活动日志文件最大值，超过这个值将产生新日志文件-->
            <maxFileSize>${maxFileSize}</maxFileSize>
            <!--只保留最近30天的日志-->
         <maxHistory>30</maxHistory>
         <!--用来指定日志文件的上限大小，那么到了这个值，就会删除旧的日志-->
         <totalSizeCap>1GB</totalSizeCap>
        </rollingPolicy>
        <!--用来指定日志文件的上限大小，那么到了这个值，就会删除旧的日志-->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>error</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>
</configuration>
```

&emsp; 另外，RollingFileAppender 节点下有一些常用的子节点：

- \<filter>：日志输出拦截器，可以自定义拦截器也可以用系统一些定义好的拦截器。
- \<rollingPolicy>：当发生滚动时，决定 RollingFileAppender 的行为，涉及文件移动和重命名。属性 class 定义具体的滚动策略类。
  - SizeAndTimeBasedRollingPolicy：根据日志文件大小和时间周期作为切分条件，满足其中任意一个就要做切分。maxFileSize 的值决定了当天的日志文件大小上限，超过这个上限，同一天将会有多个日志文件，因此\<fileNamePattern>${logFile}.%d{yyyy-MM-dd}.%i\</fileNamePattern>中有一个%i，就是为应对同一天生成多个日志文件而写，在日志量很大的情况下，会出现 mutest.log.2020-07-28.0.log、mutest.2020-07-28.1.log 这种情况。
  - TimeBasedRollingPolicy：只以时间周期为切分条件，在这种策略下，存档日志名称格式设置为\<fileNamePattern>${logFile}.%d{yyyy-MM-dd}.log\</fileNamePattern>即可。
  - SizeBasedTriggeringPolicy：只以文件大小为切分条件，在这种策略下，\<maxFileSize>日志滚动的唯一触发条件。
- \<fileNamePattern>：必要节点。以${logFile}.%d{yyyy-MM-dd}.%i.log 为例（mutest.2019-07-28.0.log），有这么几个部分：
  - ${logFile}：固定文件名称前缀，这里是引用了\<property>中设置的变量。
  - %d{yyyy-MM}：指定日志名称中间日期的格式，如果只有%d，将默认使用 yyyy-MM-dd 格式。
  - %i：当日志量过大，导致同一天生成两个及以上日志文件时，这个属性将为日志名称加一个索引作为后缀，以加以区分。
  - .log.zip：指定存档日志文件的压缩格式。

&emsp; 还有几个属性，要根据滚动策略去添加：

- \<maxFileSize>：这是活动文件的大小，SizeAndTimeBasedRollingPolicy 策略和 SizeBasedTriggeringPolicy 策略下必须有。默认值是 10MB。超过这个大小，就要生成新的活动文件了。
- \<maxHistory>：可选节点，控制保留的归档文件的最大数量，超出数量就删除旧文件。假设设置每个月滚动，且\<maxHistory>是 6，则只保存最近 6 个月的文件，删除之前的旧文件。注意，删除旧文件是，那些为了归档而创建的目录也会被删。
- \<totalSizeCap>：可选节点，表示日志文件总大小超过 1GB 将删除存档日志文件。

### 6、logger

&emsp; logger 节点，可选节点，作用是指明具体的包或类的日志输出级别，以及要使用的\<appender>

&emsp; 一个典型的 logger 节点如下：

```xml
<!-- name 属性表示匹配的logger类型前缀 -->
<logger name="com.mutest.demo">
    <level value="INFO" />
    <!-- 引用的appender，类似于spring的ref -->
    <appender-ref ref="fileLog" />
    <appender-ref ref="STDOUT" />
</logger>
```

- name：必写属性，指定具体包或类，被指定的包或类中的日志输出将遵从该 logger 规定配置。
- level：非必写属性，指定日志输出级别，该级别将覆盖 root 配置的输出级别。
- addtivity：非必写属性，是否向上级 loger 传递打印信息。默认是 true。
- appender-ref：引用的 appender，引用后将实现 appender 中定义的行为，例如上面示例中引用了 fileLog 这个 appender，那么 com.mutest.demo 中打印的日志将按 fileLog 的配置进行记录。一个 logger 可以有多个引用，互不影响。

### 7、日志滚动

&emsp; 如果不设置日志滚动策略，那么会一直向一个文件中追加日志，日志文件会越来越大，想要查找有用信息会很慢，而且有占满磁盘的风险。所以，我们要设置滚动策略，即满足一定条件，生成一个新文件，而旧日志文件进行归档。

#### 7.1、 时间策略

&emsp; 以时间周期为切分条件，\<rollingPolicy>的 class 要设置为 ch.qos.logback.core.rolling.TimeBasedRollingPolicy，一个典型示例（每天生成一个日志文件，保存 30 天的日志文件）如下：

```xml
<configuration>
  <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
      <fileNamePattern>logFile.%d{yyyy-MM-dd}.log</fileNamePattern>
      <maxHistory>30</maxHistory>
    </rollingPolicy>
    <encoder>
      <pattern>%-4relative [%thread] %-5level %logger{35} - %msg%n</pattern>
    </encoder>
  </appender>

  <root level="DEBUG">
    <appender-ref ref="FILE" />
  </root>
</configuration>
```

#### 7.2、 文件大小策略

&emsp; 以文件大小为切分条件，\<rollingPolicy>的 class 要设置为 ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy，一个典型示例（活动日志文件大小超过 30M 则生成新的活动日志文件）如下：

```xml
<configuration>
  <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <rollingPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
      <fileNamePattern>logFile.%d{yyyy-MM-dd}.%i.log</fileNamePattern>
      <maxFileSize>30MB</maxFileSize>
    </rollingPolicy>
    <encoder>
      <pattern>%-4relative [%thread] %-5level %logger{35} - %msg%n</pattern>
    </encoder>
  </appender>

  <root level="DEBUG">
    <appender-ref ref="FILE" />
  </root>
</configuration>
```

&emsp; 要注意的是，\<fileNamePattern>中，%i 必须要有，如果同一天产生多个归档日志文件，%i 会产生一个后缀加以区分。例如 mutest.2019-07-28.0.log 和 mutest.2019-07-28.1.log。

#### 7.3、时间与文件大小策略

&emsp; 根据日志文件大小和时间周期作为切分条件，满足其中任意一个就要做切分。\<rollingPolicy>的 class 要设置为 ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy，一个典型示例如下：

```xml
<configuration>
  <appender name="fileLog" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>mutest.log</file>
        <encoder>
            <pattern>%d [%thread] %-5level -[%file:%line]- %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <fileNamePattern>${logFile}.%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <maxFileSize>${maxFileSize}</maxFileSize>
        </rollingPolicy>
    </appender>

  <root level="DEBUG">
    <appender-ref ref="FILE" />
  </root>
</configuration>
```

&emsp; 同样\<fileNamePattern>中必须有%i。

## Spring Boot 获取 Bean 的 3 种方式

### 方式一、注解@PostConstruct：

```java
import com.example.javautilsproject.service.AutoMethodDemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import javax.annotation.PostConstruct;

/**
 * springboot静态方法获取 bean 的三种方式(一)
 */
@Component
public class StaticMethodGetBean_1 {

    @Autowired
    private AutoMethodDemoService autoMethodDemoService;

    @Autowired
    private static AutoMethodDemoService staticAutoMethodDemoService;

    @PostConstruct
    public void init() {
        staticAutoMethodDemoService = autoMethodDemoService;
    }

    public static String getAuthorizer() {
        return staticAutoMethodDemoService.test();
    }
}
```

&emsp; PostConstruct 注释用于在依赖关系注入完成之后需要执行的方法上，以执行任何初始化。此方法必须在将类放入服务之前调用。

&emsp; 应用 PostConstruct 注释的方法必须遵守以下所有标准：

- 该方法不得有任何参数，除非是在 EJB 拦截器 (interceptor) 的情况下，根据 EJB 规范的定义，在这种情况下它将带有一个 InvocationContext 对象
- 该方法的返回类型必须为 void；
- 该方法不得抛出已检查异常；
- 应用 PostConstruct 的方法可以是 public、protected、package private 或 private；
- 除了应用程序客户端之外，该方法不能是 static；
- 该方法可以是 final；
- 如果该方法抛出未检查异常，那么不得将类放入服务中，除非是能够处理异常并可从中恢复的 EJB。

### 方式二：启动类 ApplicationContext

&emsp; 实现方式：在 springboot 的启动类中，定义 static 变量 ApplicationContext，利用容器的 getBean 方法获得依赖对象。

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class Application {
    public static ConfigurableApplicationContext ac;
    public static void main(String[] args) {
       ac = SpringApplication.run(Application.class, args);
    }

}

// 调用方式
@RestController
public class TestController {

    @GetMapping("test2")
    public void method_2() {
        AutoMethodDemoService methodDemoService = Application.ac.getBean(AutoMethodDemoService.class);
        String test2 = methodDemoService.test2();
        System.out.println(test2);
    }
}
```

### 方式三：手动注入 ApplicationContext

```java
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;


/**
 * springboot静态方法获取 bean 的三种方式(三)
 */
@Component
public class StaticMethodGetBean_3<T> implements ApplicationContextAware {
    private static ApplicationContext applicationContext;
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        StaticMethodGetBean_3.applicationContext = applicationContext;
    }

    public static <T> T  getBean(Class<T> clazz) {
        return applicationContext != null?applicationContext.getBean(clazz):null;
    }
}

// 调用方式
@Test
public void method_3() {
    AutoMethodDemoService autoMethodDemoService = StaticMethodGetBean_3.getBean(AutoMethodDemoService.class);
    String test3 = autoMethodDemoService.test3();
    System.out.println(test3);
}
```
