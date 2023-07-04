---
title: 解决 Maven 传递依赖污染的问题
author: charles Chu
date: 2023/02/03
categories:
  - Bug万象集
tags:
  - Maven
  - Java
showComment: false
aside: true
isOriginal: true
---

# Spring 杂叙 <Badge text="持续更新" type="warning" />

- Spring 是核心，提供了基础功能；
- Spring MVC 是基于 Spring 的一个 MVC 框架 ；
- Spring Boot 是为简化 Spring 配置的快速开发整合包；
- Spring Cloud 是构建在 Spring Boot 之上的服务治理框架。

## Spring 的三大核心思想

&emsp; AOP-面向切面思想、IOC-控制反转、DI-依赖注入

## Spring 的优缺点

### 优点

- 方便解耦，简化开发；Spring 就是一个大工厂，可以将所有对象的创建和依赖关系的维护，交给 Spring 管理
- AOP 编程的支持；Spring 提供面向切面编程，可以方便的实现对程序进行权限拦截、运行监控等功能。
- 声明式事务的支持；只需要通过配置就可以完成对事务的管理，而无需手动编程。

### 缺点

- Spring 明明一个很轻量级的框架，却给人感觉大而全
- Spring 依赖反射，反射影响性能
- 使用门槛升高，入门 Spring 需要较长时间

## spring 模块

![spring模块](/public/java/spring/springModule.png)

- spring core：提供了框架的基本组成部分，包括控制反转（Inversion of Control，IOC）和依赖注入（Dependency Injection，DI）功能。

* spring beans：提供了 BeanFactory，是工厂模式的一个经典实现，Spring 将管理对象称为 Bean。
* spring context：Spring 上下文容器，它是 BeanFactory 功能加强的一个子接口；构建于 core 封装包基础上的 context 封装包，提供了一种框架式的对象访问方法。
* spring jdbc：提供了一个 JDBC 的抽象层，消除了烦琐的 JDBC 编码和数据库厂商特有的错误代码解析， 用于简化 JDBC。
* spring aop：提供了面向切面的编程实现，让你可以自定义拦截器、切点等。
* spring Web：提供了针对 Web 开发的集成特性，例如文件上传，利用 servlet listeners 进行 ioc 容器初始化和针对 Web 的 ApplicationContext。
* spring test：主要为测试提供支持的，支持使用 JUnit 或 TestNG 对 Spring 组件进行单元测试和集成测试。

## Spring 中使用到的设计模式

### 1、工厂设计模式

&emsp; Spring 使用工厂模式可以通过 BeanFactory 或 ApplicationContext 创建 bean 对象。

### 2、单例设计模式

&emsp;线程池、缓存、日志对象
&emsp;Spring 中 bean 的默认作用域就是 singleton(单例)的。

### 3、代理模式

&emsp;AOP（基于动态代理） 如果要代理的对象，实现了某个接口，那么 Spring AOP 会使用 JDK Proxy，去创建代理对象，而对于没有实现接口的对象，就无法使用 JDK Proxy 去进行代理了，这时候 Spring AOP 会使用 Cglib ，这时候 Spring AOP 会使用 Cglib 生成一个被代理对象的子类来作为代理。Spring AOP 属于运行时增强，而 AspectJ 是编译时增强

### 4、模板方法

&emsp;模板方法模式是一种行为设计模式，它定义一个操作中的算法的骨架，而将一些步骤延迟到子类中。 模板方法使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤的实现方式
&emsp;Spring 中 jdbcTemplate、hibernateTemplate 等以 Template 结尾的对数据库操作的类，它们就使用到了模板模式。一般情况下，我们都是使用继承的方式来实现模板模式，但是 Spring 并没有使用这种方式，而是使用 Callback 模式与模板方法模式配合，既达到了代码复用的效果，同时增加了灵活性。

### 5、观察者模式

&emsp;观察者模式是一种对象行为型模式。它表示的是一种对象与对象之间具有依赖关系，当一个对象发生改变的时候，这个对象所依赖的对象也会做出反应。

- Spring 事件驱动模型
- 如 Spring 中 listener 的实现–ApplicationListener。

### 6、适配器模式

&emsp;适配器模式(Adapter Pattern) 将一个接口转换成客户希望的另一个接口，适配器模式使接口不兼容的那些类可以一起工作，其别名为包装器(Wrapper)。

- Spring AOP 的实现是基于代理模式，但是 Spring AOP 的增强或通知(Advice)使用到了适配器模式
- 在 Spring MVC 中，DispatcherServlet 根据请求信息调用 HandlerMapping，解析请求对应的 Handler。解析到对应的 Handler（也就是我们平常说的 Controller 控制器）后，开始由 HandlerAdapter 适配器处理。HandlerAdapter 作为期望接口，具体的适配器实现类用于对目标类进行适配，Controller 作为需要适配的类。

### 7、装饰者模式

&emsp;装饰者模式可以动态地给对象添加一些额外的属性或行为。相比于使用继承，装饰者模式更加灵活。

- InputStream 家族，InputStream 类下有 FileInputStream (读取文件)、BufferedInputStream (增加缓存,使读取文件速度大大提升)等子类都在不修改 InputStream 代码的情况下扩展了它的功能。

## spring bean

&emsp;Spring beans 是那些形成 Spring 应用的主干的 java 对象。它们被 Spring IOC 容器初始化，装配，和管理。这些 beans 通过容器中配置的元数据创建。比如，以 XML 文件中 的形式定义。

&emsp;一个 Spring Bean 的定义包含容器必知的所有配置元数据，包括如何创建一个 bean，它的生命周期详情及它的依赖。

### SpringBean 生命周期大致分为 4 个阶段

![springBean生命周期](/public/java/spring/springBean.png)

#### 1、实例化

&emsp; 实例化该 Bean 对象

#### 2、填充属性

&emsp; 给该 Bean 赋值

#### 3、初始化

- 如果实现了 Aware 接口，会通过其接口获取容器资源
- 如果实现了 BeanPostProcessor 接口，则会回调该接口的前置和后置处理增强
- 如果配置了 init-method 方法，会执行该方法

#### 4、销毁

- 如果实现了 DisposableBean 接口，则会回调该接口的 destroy 方法
- 如果配置了 destroy-method 方法，则会执行 destroy-method 配置的方法

### bean 装配

&emsp; 指在 Spring 容器中把 bean 组装到一起，前提是容器需要知道 bean 的依赖关系，如何通过依赖注入来把它们装配到一起。

### bean 的自动装配

&emsp;在 Spring 框架中，在配置文件中设定 bean 的依赖关系是一个很好的机制，Spring 容器能够自动装配相互合作的 bean，这意味着容器不需要和配置，能通过 Bean 工厂自动处理 bean 之间的协作。这意味着 Spring 可以通过向 Bean Factory 中注入的方式自动搞定 bean 之间的依赖关系。自动装配可以设置在每个 bean 上，也可以设定在特定的 bean 上。

### Spring 自动装配 bean 的方式：

&emsp; 在 spring 中，对象无需自己查找或创建与其关联的其他对象，由容器负责把需要相互协作的对象引用赋予各个对象，使用 autowire 来配置自动装载模式。

&emsp;在 Spring 框架 xml 配置中共有 5 种自动装配：

- no：默认的方式是不进行自动装配的，通过手工设置 ref 属性来进行装配 bean。
- byName：通过 bean 的名称进行自动装配，如果一个 bean 的 property 与另一 bean 的 name 相同，就进行自动装配。
- byType：通过参数的数据类型进行自动装配。
- constructor：利用构造函数进行装配，并且构造函数的参数通过 byType 进行装配。
- autodetect：自动探测，如果有构造方法，通过 construct 的方式自动装配，否则使用 byType 的方式自动装配。

### 使用@Autowired 注解自动装配的过程

&emsp; 使用@Autowired 注解来自动装配指定的 bean。在使用@Autowired 注解之前需要在 Spring 配置文件进行配置，<context:annotation-config />。

&emsp;在使用@Autowired 时，首先在容器中查询对应类型的 bean：

- 如果查询结果刚好为一个，就将该 bean 装配给@Autowired 指定的数据；
- 如果查询的结果不止一个，那么@Autowired 会根据名称来查找；
- 如果上述查找的结果为空，那么会抛出异常。解决方法时，使用 required=false。

### bean 标签

#### 作用

- 用于配置对象让 spring 来创建的。
- 默认情况下它调用的是类中的无参构造函数。如果没有无参构造函数则不能创建成功。

#### 属性

- id：给对象在容器中提供一个唯一标识。用于获取对象。
- class：指定类的全限定类名。用于反射创建对象。默认情况下调用无参构造函数。
- scope：指定对象的作用范围。
  - singleton :默认值，单例的.
  - prototype :多例的.
  - request :WEB 项目中,Spring 创建一个 Bean 的对象,将对象存入到 request 域中.
  - session :WEB 项目中,Spring 创建一个 Bean 的对象,将对象存入到 session 域中.
  - global session :WEB 项目中,应用在 Portlet 环境.如果没有 Portlet 环境那么 globalSession 相当于 session.
- init-method：指定类中的初始化方法名称。
- destroy-method：指定类中销毁方法名称。

### 实例化 Bean 的三种方式

#### 第一种方式：使用默认无参构造函数

&emsp;在默认情况下：它会根据默认无参构造函数来创建类对象。如果 bean 中没有默认无参构造函数，将会创建失败。

```xml
<bean id="accountService" class="com.itheima.service.impl.AccountServiceImpl"/>
```

#### 第二种方式：spring 管理静态工厂

&emsp;使用某个类中的静态方法创建对象，并存入 spring 容器

```java
/**
* 模拟一个静态工厂，创建业务层实现类
*/
public class StaticFactory {
    public static IAccountService createAccountService(){
        return new AccountServiceImpl();
    }
}
```

```xml
<!-- 此种方式是:
使用 StaticFactory 类中的静态方法 createAccountService 创建对象，并存入spring 容器
    id 属性：指定 bean 的 id，用于从容器中获取
    class 属性：指定静态工厂的全限定类名
    factory-method 属性：指定生产对象的静态方法
-->
<bean id="accountService" class="com.itheima.factory.StaticFactory" factory-method="createAccountService"></bean>
```

#### 第三种方式：spring 管理实例工厂- 使用实例工厂的方法创建对象

&emsp;使用某个类中的方法创建对象，并存入 spring 容器

```java
/**
* 模拟一个实例工厂，创建业务层实现类
* 此工厂创建对象，必须现有工厂实例对象，再调用方法
*/
public class InstanceFactory {
    public IAccountService createAccountService(){
        return new AccountServiceImpl();
    }
}
```

```xml
<!-- 此种方式是：先把工厂的创建交给 spring 来管理。然后在使用工厂的 bean 来调用里面的方法
    factory-bean 属性：用于指定实例工厂 bean 的 id。
    factory-method 属性：用于指定实例工厂中创建对象的方法。
-->
<bean id="instancFactory" class="com.itheima.factory.InstanceFactory"></bean>
<bean id="accountService" factory-bean="instancFactory"    factory-method="createAccountService"></bean>
```

## spring 的依赖注入

&emsp;依赖关系的维护：就称之为依赖注入

&emsp;所谓依赖注入（Dependency Injection），即组件之间的依赖关系由容器在应用系统运行期来决定，也就是由容器动态地将某种依赖关系的目标对象实例注入到应用系统中的各个关联的组件之中。

&emsp;不管是依赖注入，还是控制反转，其含义完全相同。当某个 Java 对象（调用者）需要调用另一个 Java 对象（被依赖对象）的方法时，在传统模式下通常有两种做法：

1. 原始做法: 调用者主动创建被依赖对象，然后再调用被依赖对象的方法；

2. 简单工厂模式: 调用者先找到被依赖对象的工厂，然后主动通过工厂去获取被依赖对象，最后再调用被依赖对象的方法。

&emsp; 注意上面的主动二字，这必然会导致调用者与被依赖对象实现类的硬编码耦合，非常不利于项目升级的维护。使用 Spring 框架之后，调用者无需主动获取被依赖对象，调用者只要被动接受 Spring 容器为调用者的成员变量赋值即可，由此可见，使用 Spring 后，调用者获取被依赖对象的方式由原来的主动获取，变成了被动接受——所以称之为控制反转。

&emsp; 另外从 Spring 容器的角度来看，Spring 容器负责将被依赖对象赋值给调用者的成员变量——相当于为调用者注入它依赖的实例，因此称之为依赖注入。

### 依赖注入的基本原则

&emsp; 应用组件不应该负责查找资源或者其他依赖的协作对象。配置对象的工作应该由 IoC 容器负责，“查找资源”的逻辑应该从应用组件的代码中抽取出来，交给 IoC 容器负责。容器全权负责组件的装配，它会把符合依赖关系的对象通过属性（JavaBean 中的 setter）或者是构造器传递给需要的对象。

### 依赖注入有什么优势

&emsp; 依赖注入之所以更流行是因为它是一种更可取的方式：让容器全权负责依赖查询，受管组件只需要暴露 JavaBean 的 setter 方法或者带参数的构造器或者接口，使容器可以在初始化时组装对象的依赖关系。其与依赖查找方式相比，主要优势为：

- 查找定位操作与应用代码完全无关。
- 不依赖于容器的 API，可以很容易地在任何容器以外使用应用对象。
- 不需要特殊的接口，绝大多数对象可以做到完全不必依赖容器。

### 构造注入

&emsp; 利用构造器来设置依赖关系的方式，被称为构造注入。通俗来说，就是驱动 Spring 在底层以反射方式执行带指定参数的构造器，当执行带参数的构造器时，就可利用构造器参数对成员变量执行初始化——这就是构造注入的本质。

#### 构造注入优势

1. 构造注入可以在构造器中决定依赖关系的注入顺序，优先依赖的优先注入；
2. 对于依赖关系无需变化的 Bean，构造注入更有用处。因为没有 setter 方法，所有的依赖关系全部在构造器内设定，无须担心后续的代码对依赖关系产生破坏；
3. 依赖关系只能在构造器中设定，则只有组件的创建者才能改变组件的依赖关系，对组件的调用者而言，组件内部的依赖关系完全透明，更符合高内聚的原则。
4. Notes 建议采用设值注入为主，构造注入为辅的注入策略。对于依赖关系无须变化的注入，尽量采用构造注入；而其他依赖关系的注入，则考虑采用设值注入。

#### 构造函数注入示例

```java
public class AccountServiceImpl implements IAccountService {
    private String name;
    private Integer age;
    private Date birthday;

    public AccountServiceImpl(String name, Integer age, Date birthday) {
        this.name = name;
        this.age = age;
        this.birthday = birthday;
    }
    @Override
    public void saveAccount() {
        System.out.println(name+","+age+","+birthday);
    }
}
```

```xml
<!-- 使用构造函数的方式，给 service 中的属性传值
要求：
    类中需要提供一个对应参数列表的构造函数。
涉及的标签：
    constructor-arg
属性：
    index:指定参数在构造函数参数列表的索引位置，索引的位置是从0开始
    type:指定参数在构造函数中的数据类型
    name:指定参数在构造函数中的名称 用这个找给谁赋值
    =======上面三个都是找给谁赋值，下面两个指的是赋什么值的==============
    value:它能赋的值是基本数据类型和 String 类型
    ref:它能赋的值是其他 bean 类型，也就是说，必须得是在配置文件中配置过的 bean
-->
<bean id="accountService" class="com.itheima.service.impl.AccountServiceImpl">
    <constructor-arg name="name" value=" 张三 "></constructor-arg>
    <constructor-arg name="age" value="18"></constructor-arg>
    <constructor-arg name="birthday" ref="now"></constructor-arg>
</bean>
<bean id="now" class="java.util.Date"></bean>
```

### 设值注入

&emsp;设值注入是指 IoC 容器通过成员变量的 setter 方法来注入被依赖对象。这种注入方式简单、直观，因而在 Spring 的依赖注入里大量使用。

#### 设值注入优点

1. 与传统的 JavaBean 的写法更相似，程序开发人员更容易理解、接受。通过 setter 方法设定依赖关系显得更加直观、自然；
2. 对于复杂的依赖关系，如果采用构造注入，会导致构造器过于臃肿，难以阅读。Spring 在创建 Bean 实例时，需要同时实例化其依赖的全部实例，因而导致性能下降。而使用设值注入，则能避免这些问题。
3. 尤其在某些成员变量可选的情况下，多参数的构造器更加笨重。

#### set 方法注入示例

&emsp;实际开发中，此种方式用的较多

```java
public class AccountServiceImpl implements IAccountService {
    private String name;
    private Integer age;
    private Date birthday;

    public void setName(String name) {
        this.name = name;
    }
    public void setAge(Integer age) {
        this.age = age;
    }
    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }
}
```

```xml
<!-- 通过配置文件给 bean 中的属性传值：使用 set 方法的方式
涉及的标签：
    property
属性：
    name：找的是类中 set 方法后面的部分
    value：给属性赋值是基本数据类型和 string 类型的
    ref：给属性赋值是其他 bean 类型的
-->
<bean id="accountService" class="com.itheima.service.impl.AccountServiceImpl">
    <property name="name" value="test"></property>
    <property name="age" value="21"></property>
    <property name="birthday" ref="now"></property>
</bean>
<bean id="now" class="java.util.Date"></bean>
```

## spring 的事务隔离

&emsp; spring 有五大隔离级别，默认值为 ISOLATION_DEFAULT（使用数据库的设置），其他四个隔离级别和数据库的隔离级别一致：

- ISOLATION_DEFAULT：用底层数据库的设置隔离级别，数据库设置的是什么我就用什么；
- ISOLATION_READ_UNCOMMITTED：未提交读，最低隔离级别、事务未提交前，就可被其他事务读取（会出现幻读、脏读、不可重复读）；
- ISOLATION_READ_COMMITTED：提交读，一个事务提交后才能被其他事务读取到（会造成幻读、不可重复读），SQL server 的默认级别；
- ISOLATION_REPEATABLE_READ：可重复读，保证多次读取同一个数据时，其值都和事务开始时候的内容是一致，禁止读取到别的事务未提交的数据（会造成幻读），MySQL 的默认级别；
- ISOLATION_SERIALIZABLE：序列化，代价最高最可靠的隔离级别，该隔离级别能防止脏读、不可重复读、幻读。

### Spring 的事务传播（Transaction Propagation）

#### 1.PROPAGATION_REQUIRED

&emsp; 字面意思：传播-必须

> PROPAGATION_REQUIRED 是其默认传播属性，强制开启事务，如果之前的方法已经开启了事务，则加入前一个事务，二者在物理上属于同一个事务。

```java
// PROPAGATION_REQUIRED伪代码
try {
    conn.setAutoCommit(false);
    transactionalMethod1();
    transactionalMethod2();  // 若transactionalMethod2()发生了异常，transactionalMethod1()也会回滚
    conn.commit();
} catch (SQLException e) {
    conn.rollback();
} finally {
    conn.close();
}
```

示例

```java
// 一：不会回滚的情况（事务失效）
@Transactional(rollbackFor = Exception.class)
public void tryCatchRollBackFail(String name) {
    jdbcTemplate.execute("INSERT INTO USER (NAME) VALUES ('" + name + "')");
    try {
        // methodThrowsException()什么也没干，就抛了个异常，调用方将其抛出的异常try catch了，该场景下是不会触发回滚的
        methodThrowsException();
    } catch (RollBackException e) {
        //do nothing
    }
}

public void methodThrowsException() throws RollBackException {
    throw new RollBackException(ROLL_BACK_MESSAGE);
}

// 二：会回滚的情况（事务生效）
@Transactional(rollbackFor = Throwable.class)
public void tryCatchRollBackSuccess(String name, String anotherName) {
    jdbcTemplate.execute("INSERT INTO USER (NAME) VALUES ('" + name + "')");
    try {
        // 带事务，抛异常回滚
        userService.insertWithTxThrowException(anotherName);
    } catch (RollBackException e) {
        // do nothing
    }
}

// 默认都是PROPAGATION_REQUIRED。前者开启事务，后者加入前面开启的事务，二者同属于一个物理事务。
@Transactional(rollbackFor = Throwable.class)
public void insertWithTxThrowException(String name) throws RollBackException {
    jdbcTemplate.execute("INSERT INTO USER (NAME) VALUES ('" + name + "')");
    // 方法抛出异常，将事务标记为回滚。tryCatchRollBackSuccess和当前方法同属一个事务，tryCatchRollBackSuccess方法也会回滚
    throw new RollBackException(ROLL_BACK_MESSAGE);
}
```

#### 2.PROPAGATION_REQUIRES_NEW

&emsp;字面意思：传播- 必须-新的

> PROPAGATION_REQUIRES_NEW 与 PROPAGATION_REQUIRED 不同的是，其总是开启独立的事务，不会参与到已存在的事务中，这就保证了两个事务的状态相互独立，互不影响，不会因为一方的回滚而干扰到另一方

```java
// PROPAGATION_REQUIRES_NEW伪代码，开启独立事务，事务回滚互不干扰
//Transaction1
try {
    conn.setAutoCommit(false);
    transactionalMethod1();
    conn.commit();
} catch (SQLException e) {
    conn.rollback();
} finally {
    conn.close();
}
//Transaction2
try {
    conn.setAutoCommit(false);
    transactionalMethod2();
    conn.commit();
} catch (SQLException e) {
    conn.rollback();
} finally {
    conn.close();
}
```

示例

```java
@Transactional(rollbackFor = Throwable.class)
public void tryCatchRollBackSuccess(String name, String anotherName) {
    jdbcTemplate.execute("INSERT INTO USER (NAME) VALUES ('" + name + "')");
    try {
        // 带事务，抛异常回滚，异常被try catch了
        userService.insertWithTxThrowException(anotherName);
    } catch (RollBackException e) {
        // do nothing
    }
}

// 独立事务，只会回滚自己，不影响tryCatchRollBackSuccess中的方法
@Transactional(rollbackFor = Throwable.class, propagation = Propagation.REQUIRES_NEW)
public void insertWithTxThrowException(String name) throws RollBackException {
    jdbcTemplate.execute("INSERT INTO USER (NAME) VALUES ('" + name + "')");
    throw new RollBackException(ROLL_BACK_MESSAGE);
}
```

#### 3.PROPAGATION_NESTED

&emsp;字面意思：传播-嵌套

> ATION_NESTED 可以在一个已存在的物理事务上设置多个供回滚使用的保存点。这种部分回滚可以让内部事务在其自己的作用域内回滚，与此同时，外部事务可以在某些操作回滚后继续执行。其底层实现就是数据库的 savepoint。

```java
@Transactional(rollbackFor = Throwable.class)
public void invokeNestedTx(String name,String otherName) {
    jdbcTemplate.execute("INSERT INTO USER (NAME) VALUES ('" + name + "')");
    try {
        userService.insertWithTxNested(otherName);
    } catch (RollBackException e) {
        // do nothing
    }
    // 如果这里抛出异常，将导致两个方法都回滚
    // throw new RollBackException(ROLL_BACK_MESSAGE);
}

// 外部事务方法invokeNestedTx()开启事务，内部事务方法insertWithTxNested标记为嵌套事务；
// 内部事务的回滚通过保存点完成，不会影响外部事务。而外部方法的回滚，则会连带内部方法一块回滚。
@Transactional(rollbackFor = Throwable.class,propagation = Propagation.NESTED)
public void insertWithTxNested(String name) throws RollBackException {
    jdbcTemplate.execute("INSERT INTO USER (NAME) VALUES ('" + name + "')");
    throw new RollBackException(ROLL_BACK_MESSAGE);
}
```

## 使用 Junit 单元测试：测试我们的配置

&emsp;Spring 整合 junit 的配置

1. 导入 spring 整合 junit 的 jar(坐标)
2. 使用 Junit 提供的一个注解把原有的 main 方法替换了，替换成 spring 提供@Runwith，如：@RunWith(SpringJUnit4ClassRunner.class)
3. 告知 spring 的运行器，spring 和 ioc 创建是基于 xml 还是注解的，并且说明位置

- @ContextConfiguration
  - locations：指定 xml 文件的位置，加上 classpath 关键字，表示在类路径下，@ContextConfiguration(locations = "classpath:bean.xml")
  - classes：指定注解类所在地位置，@ContextConfiguration(classes = SpringConfiguration.class)

&emsp; 当我们使用 spring 5.x 版本的时候，要求 junit 的 jar 必须是 4.12 及以上

## IOC

&emsp; 控制反转即 IoC (Inversion of Control)，它把传统上由程序代码直接操控的对象的调用权交给容器，通过容器来实现对象组件的装配和管理。所谓的“控制反转”概念就是对组件对象控制权的转移，从程序代码本身转移到了外部容器。把对象的控制权交给了 spring，由 spring 容器进行管理

&emsp; Spring IOC 负责创建对象，管理对象（通过依赖注入（DI），装配对象，配置对象，并且管理这些对象的整个生命周期。

### Spring IoC 的实现机制/原理

&emsp; 工厂模式加反射机制

```java
interface Fruit {
   public abstract void eat();
 }

class Apple implements Fruit {
    public void eat(){
        System.out.println("Apple");
    }
}

class Orange implements Fruit {
    public void eat(){
        System.out.println("Orange");
    }
}

class Factory {
    public static Fruit getInstance(String ClassName) {
        Fruit f=null;
        try {
            f=(Fruit)Class.forName(ClassName).newInstance();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return f;
    }
}

class Client {
    public static void main(String[] a) {
        Fruit f=Factory.getInstance("io.github.dunwu.spring.Apple");
        if(f!=null){
            f.eat();
        }
    }
}
```

### IoC 解决了以下问题

- 创建了许多重复对象，造成大量资源浪费；
- 更换实现类需要改动多个地方；
- 创建和配置组件工作繁杂，给组件调用方带来极大不便。

### IoC 的作用

&emsp; ioc 的思想最核心的地方在于，资源不由使用资源的双方管理，而由不使用资源的第三方管理，这可以带来很多好处。

- 第一，资源集中管理，实现资源的可配置和易管理。
- 第二，降低了使用资源双方的依赖程度，也就是我们说的耦合度。
- 托管了类的产生过程，比如我们需要在类的产生过程中做一些处理，最直接的例子就是代理，如果有容器程序可以把这部分处理交给容器，应用程序则无需去关心类是如何完成代理的

### IoC 的优点

- IOC 或 依赖注入把应用的代码量降到最低。
- 它使应用容易测试，单元测试不再需要单例和 JNDI 查找机制。
- 最小的代价和最小的侵入性使松散耦合得以实现。
- IOC 容器支持加载服务时的饿汉式初始化和懒加载。

### Spring 主要提供的两种 IOC 容器

&emsp; 一种是 「BeanFactory」，还有一种是 「ApplicationContext」

&emsp; 它们的区别就在于，BeanFactory 只提供了最基本的实例化对象和拿对象的功能，而 ApplicationContext 是继承了 BeanFactory 所派生出来的产物，是其子类，它的作用更加的强大，比如支持注解注入、国际化等功能

#### BeanFactory 和 ApplicationContext 的区别：

&emsp; BeanFactory 才是 Spring 容器中的顶层接口。ApplicationContext 是 BeanFactory 的子接口。

&emsp; BeanFactory 和 ApplicationContext 的区别： 创建对象的时间点不一样。

- ApplicationContext：启动容器时，读取配置文件，一次性创建所有 bean。（占用内存空间）
- BeanFactory：什么时候使用什么时候创建对象。(延迟加载)

&emsp; BeanFactory 简单粗暴，可以理解为就是个 HashMap，Key 是 BeanName，Value 是 Bean 实例。通常只提供注册（put），获取（get）这两个功能。我们可以称之为 “低级容器”。

&emsp; ApplicationContext 可以称之为 “高级容器”。继承了多个接口，因此具备了更多的功能。例如资源的获取，支持多种消息（例如 JSP tag 的支持），对 BeanFactory 多了工具级别的支持等待。该接口定义了一个 refresh 方法，用于刷新整个容器，即重新加载/刷新所有的 bean。

#### ApplicationContext 接口的实现类

1. ClassPathXmlApplicationContext ：它是从类的根路径下加载配置文件 推荐使用这种；可以加载类路径下的配置文件，要求配置文件必须在类路径下。不在的话，加载不了。(更常用)
2. FileSystemXmlApplicationContext：它是从磁盘路径上加载配置文件，配置文件可以在磁盘的任意位置。(必须有访问权限）
3. AnnotationConfigApplicationContext：当我们使用注解配置容器对象时，需要使用此类来创建 spring 容器。它用来读取注解。

## AOP

&emsp; AOP(Aspect-Oriented Programming)，一般称为面向切面编程，作为面向对象的一种补充，用于将那些与业务无关，但却对多个对象产生影响的公共行为和逻辑，抽取并封装为一个可重用的模块，这个模块被命名为“切面”（Aspect），减少系统中的重复代码，降低了模块间的耦合度，同时提高了系统的可维护性。可用于权限认证、日志、事务处理等。

&emsp; 一个接口想设置多个切面类进行校验，这些切面的执行顺序：一个自定义的 AOP 注解可以对应多个切面类，这些切面类执行顺序由@Order 注解管理，该注解后的数字越小，所在切面类越先执行。

### AOP 解决了以下问题

&emsp; 切面逻辑编写繁琐，有多少个业务方法就需要编写多少次。

### AOP 相关术语

#### Joinpoint(连接点)

&emsp; 连接点，是程序执行的一个点。例如，一个方法的执行或者一个异常的处理。在 Spring AOP 中，一个连接点总是代表一个方法执行。

#### Pointcut(切入点)

&emsp; 切点，决定处理如权限校验、日志记录等在何处切入业务代码中（即织入切面）。切点分为 execution 方式和 annotation 方式。execution 用路径表达式指定哪些类织入切面，annotation 指定被哪些注解修饰的代码织入切面；

#### Advice (通知/增强)

&emsp; 处理，包括处理时机和处理内容。处理内容就是要做什么事，比如校验权限和记录日志。处理时机就是在什么时机执行处理内容

&emsp; 通知的类型：前置通知,后置通知,异常通知,最终通知,环绕通知。

#### Introduction(引介)

&emsp; 引介是一种特殊的通知在不修改类代码的前提下, Introduction 可以在运行期为类动态地添加一些方法或 Field。

#### Target( 目标对象)

&emsp; 代理的目标对象。

#### Weaving( 织入)

&emsp; 是指把增强应用到目标对象来创建新的代理对象的过程。

&emsp; spring 采用动态代理织入，而 AspectJ 采用编译期织入和类装载期织入。

#### Proxy （代理）

&emsp; 一个类被 AOP 织入增强后，就产生一个结果代理类。

#### Aspect(切面)

&emsp; 切面是通知和切点的结合。通知和切点共同定义了切面的全部内容。在 Spring AOP 中，切面可以使用通用类（基于模式的风格） 或者在普通类中以
@AspectJ 注解来实现
![Aspect](/public/java/spring/aspect.png)

### 注解

#### 1. @Pointcut 注解

&emsp; 用来定义一个切面，即上文中所关注的某件事情的入口，切入点定义了事件触发时机;

&emsp; @Pointcut 注解指定一个切面，定义需要拦截的东西，这里介绍两个常用的表达式：一个是使用 execution()，另一个是使用 annotation()。

##### execution 表达式

&emsp; 以 execution(_ com.mutest.controller.._.\*(..))) 表达式为例：(返回值类型 包名...包名.类名.方法名(方法的参数))

- 第一个 _ 号的位置：表示返回值类型，_ 表示所有类型。
- 包名：表示需要拦截的包名，后面的两个句点表示当前包和当前包的所有子包，本例中指 com.mutest.controller 包、子包下所有类的方法。
- 第二个 _ 号的位置：表示类名，_ 表示所有类。
- _(..)：这个星号表示方法名，_ 表示所有的方法，后面括弧里面表示方法的参数，两个句点表示任何参数。

##### annotation() 表达式

&emsp; annotation() 方式是针对某个注解来定义切面，如：@Pointcut("@annotation(com.example.demo.PermissionsAnnotation)")

#### 2. @Around

&emsp; 注解用于修饰 Around 增强处理，Around 增强处理非常强大，表现在：

- @Around 可以自由选择增强动作与目标方法的执行顺序，也就是说可以在增强动作前后，甚至过程中执行目标方法。这个特性的实现在于，调用 ProceedingJoinPoint 参数的 procedd()方法才会执行目标方法。
- @Around 可以改变执行目标方法的参数值，也可以改变执行目标方法之后的返回值。

##### Around 增强处理特点

- 当定义一个 Around 增强处理方法时，该方法的第一个形参必须是 ProceedingJoinPoint 类型（至少一个形参）。在增强处理方法体内，调用 ProceedingJoinPoint 的 proceed 方法才会执行目标方法：这就是@Around 增强处理可以完全控制目标方法执行时机、如何执行的关键；如果程序没有调用 ProceedingJoinPoint 的 proceed 方法，则目标方法不会执行。
- 调用 ProceedingJoinPoint 的 proceed 方法时，还可以传入一个 Object[]对象，该数组中的值将被传入目标方法作为实参——这就是 Around 增强处理方法可以改变目标方法参数值的关键。这就是如果传入的 Object[]数组长度与目标方法所需要的参数个数不相等，或者 Object[]数组元素与目标方法所需参数的类型不匹配，程序就会出现异常。

&emsp; @Around 功能虽然强大，但通常需要在线程安全的环境下使用。因此，如果使用普通的 Before、AfterReturning 就能解决的问题，就没有必要使用 Around 了。如果需要目标方法执行之前和之后共享某种状态数据，则应该考虑使用 Around.尤其是需要使用增强处理阻止目标的执行，或需要改变目标方法的返回值时，则只能使用 Around 增强处理了。

#### 3. @Before

&emsp; 注解指定的方法在切面切入目标方法之前执行，可以做一些 Log 处理，也可以做一些信息的统计。

&emsp; JointPoint 对象很有用，可以用它来获取一个签名，利用签名可以获取请求的包名、方法名，包括参数（通过 joinPoint.getArgs() 获取）等

#### 4. @After

&emsp; 和 @Before 注解相对应，指定的方法在切面切入目标方法之后执行，也可以做一些完成某方法之后的 Log 处理。

#### 5. @AfterReturning

&emsp; 和@After 有些类似，区别在于@AfterReturning 注解可以用来捕获切入方法执行完之后的返回值，对返回值进行业务逻辑上的增强处理。

&emsp; 在@AfterReturning 注解 中，属性 returning 的值必须要和参数保持一致，否则会检测不到。该方法中的第二个入参就是被切方法的返回值，在 doAfterReturning 方法中可以对返回值进行增强，可以根据业务需要做相应的封装

```java
 @AfterReturning(pointcut = "pointCut()", returning = "result")
 public void doAfterReturning(JoinPoint joinPoint, Object result) {
     Signature signature = joinPoint.getSignature();
     String classMethod = signature.getName();
     log.info("方法{}执行完毕，返回参数为：{}", classMethod, result);
     // 实际项目中可以根据业务做具体的返回值增强
     log.info("对返回参数进行业务上的增强：{}", result + "增强版");
 }
```

#### 6. @AfterThrowing

&emsp; 当被切方法执行过程中抛出异常时，会进入 @AfterThrowing 注解的方法中执行，在该方法中可以做一些异常的处理逻辑。要注意的是 throwing 属性的值必须要和参数一致，否则会报错。该方法中的第二个入参即为抛出的异常。

```java
@AfterThrowing(pointcut = "pointCut()", throwing = "ex")
public void afterThrowing(JoinPoint joinPoint, Throwable ex) {
        Signature signature = joinPoint.getSignature();
        String method = signature.getName();
        // 处理异常的逻辑
        log.info("执行方法{}出错，异常为：{}", method, ex);
}
```

### Spring AOP and AspectJ AOP

&emsp; AOP 实现的关键在于代理模式，AOP 代理主要分为静态代理和动态代理。静态代理的代表为 AspectJ；动态代理则以 Spring AOP 为代表。

- AspectJ 是静态代理的增强，所谓静态代理，就是 AOP 框架会在编译阶段生成 AOP 代理类，因此也称为编译时增强，他会在编译阶段将 AspectJ(切面)织入到 Java 字节码中，运行的时候就是增强之后的 AOP 对象。
- Spring AOP 使用的动态代理，所谓的动态代理就是说 AOP 框架不会去修改字节码，而是每次运行时在内存中临时为方法生成一个 AOP 对象，这个 AOP 对象包含了目标对象的全部方法，并且在特定的切点做了增强处理，并回调原对象的方法。

&emsp; 静态代理与动态代理区别在于生成 AOP 代理对象的时机不同，相对来说 AspectJ 的静态代理方式具有更好的性能，但是 AspectJ 需要特定的编译器进行处理，而 Spring AOP 则无需特定的编译器处理。

&emsp; Spring AOP 中的动态代理主要有两种方式，JDK 动态代理和 CGLIB 动态代理：

- JDK 动态代理只提供接口的代理，必须要实现某个接口，不支持类的代理。核心 InvocationHandler 接口和 Proxy 类，InvocationHandler 通过 invoke()方法反射来调用目标类中的代码，动态地将横切逻辑和业务编织在一起；接着，Proxy 利用 InvocationHandler 动态创建一个符合某一接口的的实例, 生成目标类的代理对象。
- 如果代理类没有实现 InvocationHandler 接口，那么 Spring AOP 会选择使用 CGLIB 来动态代理目标类。CGLIB（Code Generation Library），是一个代码生成的类库，可以在运行时动态的生成指定类的一个子类对象，并覆盖其中特定方法并添加增强代码，从而实现 AOP。CGLIB 是通过继承的方式做的动态代理，因此如果某个类被标记为 final，那么它是无法使用 CGLIB 做动态代理的。

## spring 解决循环依赖问题

&emsp; 循环依赖就是说两个对象相互依赖，形成了一个环形的调用链路

&emsp; spring 使用三级缓存去解决循环依赖的，其核心逻辑就是把实例化和初始化的步骤分开，然后放入缓存中，供另一个对象调用

- 第一级缓存：用来保存实例化、初始化都完成的对象
- 第二级缓存：用来保存实例化完成，但是未初始化完成的对象
- 第三级缓存：用来保存一个对象工厂，提供一个匿名内部类，用于创建二级缓存中的对象

### 当 A、B 两个类发生循环引用时大致流程

1. A 完成实例化后，去创建一个对象工厂，并放入三级缓存当中
   - 如果 A 被 AOP 代理，那么通过这个工厂获取到的就是 A 代理后的对象
   - 如果 A 没有被 AOP 代理，那么这个工厂获取到的就是 A 实例化的对象
2. A 进行属性注入时，去创建 B
3. B 进行属性注入，需要 A ，则从三级缓存中去取 A 工厂代理对象并注入，然后删除三级缓存中的 A 工厂，将 A 对象放入二级缓存
4. B 完成后续属性注入，直到初始化结束，将 B 放入一级缓存
5. A 从一级缓存中取到 B 并且注入 B, 直到完成后续操作，将 A 从二级缓存删除并且放入一级缓存，循环依赖结束

### Spring 解决循环依赖有两个前提条件

1. 不全是构造器方式的循环依赖(否则无法分离初始化和实例化的操作)
2. 必须是单例(否则无法保证是同一对象)

### 为什么要使用三级缓存，二级缓存不能解决吗

&emsp; 可以，三级缓存的功能是只有真正发生循环依赖的时候，才去提前生成代理对象，否则只会创建一个工厂并将其放入到三级缓存中，但是不会去通过这个工厂去真正创建对象。

&emsp; 如果使用二级缓存解决循环依赖，意味着所有 Bean 在实例化后就要完成 AOP 代理，这样违背了 Spring 设计的原则，Spring 在设计之初就是在 Bean 生命周期的最后一步来完成 AOP 代理，而不是在实例化后就立马进行 AOP 代理
