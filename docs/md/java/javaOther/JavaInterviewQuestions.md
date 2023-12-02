---
title: Java面试题
author: Charles Chu
date: 2023/02/26
isOriginal: true
---

# Java面试题 <Badge text="持续更新" type="warning" />

## 构造器是否可以重写
&emsp;  Constructor 不能被 override（重写），但是可以 overload（重载），所以你可以看到⼀个类中有多个构造函数的情况。

## == 和 equals 的区别
&emsp;  == : 它的作用是判断两个对象的地址是不是相等。即，判断两个对象是不是同一个对象。(基本数据类型 == 比较的是值，引用数据类型 == 比较的是内存地址)。

&emsp;  equals() : 它的作用也是判断两个对象是否相等。但它一般有两种使用情况：

- 类没有覆盖 equals() 方法。则通过 equals() 比较该类的两个对象时，等价于通过“==”比较这两个对象。
- 类覆盖了 equals() 方法。一般，我们都覆盖 equals() 方法来两个对象的内容相等；若它们的内容相等，则返回 true (即，认为这两个对象相等)。

## 为什么重写 equals 时必须重写 hashCode 方法：
&emsp;  如果两个对象相等，则 hashcode 一定也是相同的。两个对象相等，对两个对象分别调用 equals 方法都返回 true。两个对象有相同的 hashcode 值，它们也不一定是相等的。因此，equals 方法被覆盖过，则 hashCode 方法也必须被覆盖

## 为什么要有 hashcode：以“HashSet 如何检查重复”为例子来说明为什么要有 hashCode：
&emsp;  当你把对象加入 HashSet 时，HashSet 会先计算对象的 hashcode 值来判断对象加入的位置，同时也会与其他已经加入的对象的 hashcode 值作比较，如果没有相符的 hashcode，HashSet 会假设对象没有重复出现。但是如果发现有相同 hashcode 值的对象，这时会调用 equals()方法来检查 hashcode 相等的对象是否真的相同。如果两者相同，HashSet 就不会让其加入操作成功。如果不同的话，就会重新散列到其他位置。这样我们就大大减少了 equals 的次数，相应就大大提高了执行速度。

## HashMap 使用 String 作为 key 有什么好处
&emsp;  HashMap 内部实现是通过 key 的 hashcode 来确定 value 的存储位置，因为字符串是不可变的，所以当创建字符串时，它的 hashcode 被缓存下来，不需要再次计算，所以相比于其他对象更快。

## JAVA子类继承父类后new子类对象的过程
1. 父类静态变量
2. 父类静态代码块
3. 子类静态变量
4. 子类静态代码块
5. 父类非静态变量
6. 父类非静态代码块
7. 父类匿名内部类
8. 父类静态方法
9. 子类非静态变量
10. 子类非静态代码块
11. 子类匿名内部类
12. 子类构造方法。

总结：先父后子，先静态后非静态
- 父类静态-子类静态（静态代码块只执行一次）
- 父类非静态-父类构造（子类无参构造写不写super(),默认都走父类无参构造，子类构造写super(有参)，走父类的有参构造）
- 子类非静态-子类构造 (创建子类对象时无参走无参构造方法，有参走有参构造方法)
```java
public class Father {
    
    static{
        System.out.println("父类的静态代码块{}执行了。。。");
        System.out.println();
    }
    
    {
        System.out.println("父类的非静态代码块{}执行了。。。");
        System.out.println();
    }
    
    public Father(){
        System.out.println("父类的无参构造structure 执行了。。。");
        System.out.println();
    }
    
    public Father(String name,Integer age){
        //super(); 默认执行父类的无参构造
        this.name = name;
        this.age = age;
        System.out.println("父类的有参构造structure 执行了。。。");
        System.out.println();
    }
    
    public static void Read(){
        System.out.println("父类的静态Read方法执行了。。。");
        System.out.println();
    }
    
    public void tour(){
        System.out.println("父类的非静态tour方法执行了。。。");
        System.out.println();
    }
    
    private String name;
    private Integer age;
    
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    
    public Integer getAge() {
        return age;
    }
    
    public void setAge(Integer age) {
        this.age = age;
    }
}

public class Son extends Father {

    static{
        System.out.println("子类的静态代码块{}执行了。。。");
        System.out.println();
    }
    
    {
        System.out.println("子类的非静态代码块{}执行了。。。");
        System.out.println();
    }
    
    public Son(){
        //super(); 默认执行Father的无参构造
        System.out.println("子类的无参构造structure 执行了。。。");
        System.out.println();
    }
    
    public Son(String name, Integer age) {
        //super(); 默认执行Father的无参构造
        super(name,age); //执行Father的有参构造
        this.name = name;
        this.age = age;
        System.out.println("子类的有参构造structure 执行了。。。");
        System.out.println();
    }

    public static void Read(){
        System.out.println("子类的静态Read方法执行了。。。");
        System.out.println();
    }
    
    @Override
    public void tour(){
        System.out.println("子类的非静态tour方法执行了。。。");
        System.out.println();
    }
    
    private String name;
    private Integer age;
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

}

public class MainTest {
    public static void main(String[] args) {      
        Son son = new Son();
        System.out.println("======================");
        Son son1 =new Son("谭谭",32);
    }

}

/*
输出结果：
父类的静态代码块{}执行了。。。

子类的静态代码块{}执行了。。。

父类的非静态代码块{}执行了。。。

父类的无参构造structure 执行了。。。

子类的非静态代码块{}执行了。。。

子类的无参构造structure 执行了。。。

======================
父类的非静态代码块{}执行了。。。

父类的有参构造structure 执行了。。。

子类的非静态代码块{}执行了。。。

子类的有参构造structure 执行了。。。
*/
```

## JAVA中的集合
集合可以分为Collection（单列集合）和Map（双列集合）

- Collection又可以分为Set（不可存储重复元素）和List（可存储重复元素）
    - Set又可以分为HashSethe和TreeSet
    - List又可以分为ArrayList，LinkedList和Vector
- Map又可以分为HashMap和TreeMap
![Collection](/public/java/javaOther/javaInterviewQuestions/Collection.png)
![Map](/public/java/javaOther/javaInterviewQuestions/Map.png)

## 数据库表中加索引的情况

### 适合加索引的情况
1. 字段的数值具有唯一性限制
    - 业务上具有唯一特性的字段，即便是组合字段，也必须建成唯一索引，这种唯一索引对insert的速度损耗可以忽略，但能显著提高查找速度。
2. 频繁作为WHERE查询条件的字段
    - 如果某个字段在SELECT语句的WHERE条件中经常被使用，那么就需要给这个字段创建索引。尤其是在数据量大的情况下，创建普通索引都可以大幅提升数据查询的效率。
3. 经常 GROUP BY 和 ORDER BY 的列
    - 索引就是让数据按照某种顺序进行存储或检索，当对数据进行分组查询或排序的时候，就需要对分组或者排序的字段进行索引。
    - 如果待排序的列有多个，那么可以在这些列上建立组合索引。
4. 需要 UPDATE 和 DELET 的 WHERE 条件列
    - 当按条件查询再进行 UPDATE 和 DELETE 操作时（先查再改），如果对 WHERE 字段创建了索引，就能大幅提升效率。
    - 原理： 因为我们需要先使用 WHERE 检录出这些记录，随后再对其进行更新或删除。如果更新的字段是非索引字段，提升的效率会更明显，因为更新非索引字段不需要维护已有索引。
5. DISTINCT 字段需要创建索引
    - 当需要对某个字段进行去重，使用DISTINCT时，对这个字段创建索引，也会提升查询效率。
    - 索引会对数据按照某种顺序进行排序，所以在去重的时候也会快很多。
6. 多表 JOIN 连接操作时，创建索引注意事项
    - 连接表的数量尽量不要超过3张：因为每增加一张表就相当于增加了一次嵌套的循环，数量级增长会非常快，严重影响效率。
    - 对 WHERE 条件创建索引 ，因为 WHERE 才是对数据条件的过滤。如果在数据量非常大的情况下，没有 WHERE 条件过滤是非常可怕的。
    - 对用于连接的字段创建索引，并且该字段在多张表中的类型必须一致 。
7. 使用列的类型小的创建索引
8. 使用字符串前缀创建索引
    - 截取前缀时过多达不到节省索引存储空间的目的，过少则会因为重复内容太多从而导致字段的散列度（选择性）降低。
    - 在varchar字段上建立索引时，必须指定索引长度，没必要对全字段建立索引，根据实际文本区分度决定索引长度。
    - 索引的长度与区分度是一对矛盾体，一般对字符串类型数据，长度为 20 的索引，区分度会高达90% 以上，可以使用 count(distinct left(列名, 索引长度)) / count(*)的区分度来确定。
9. 区分度高(散列性高)的列适合作为索引
10. 使用最频繁的列放到联合索引的左侧
    - 这样也可以较少的建立一些索引。同时，由于"最左前缀原则"，可以增加联合索引的使用率。
11. 在多个字段都要创建索引的情况下，联合索引优于单值索引

### 不适合加索引的情况
1. 在 WHERE 中使用不到的字段，不要设置索引
2. 数据量小的表（少于1000行）最好不要使用索引
3. 有大量重复数据的列上不要建立索引
    - 举例：要在 100 万行数据中查找其中的 50 万行（比如性别为男的数据），一旦创建了索引，你需要先访问 50 万次索引，然后再访问 50 万次数据表，这样加起来的开销比不使用索引可能还要大。
  当数据重复度大，比如 高于 10% 的时候，也不需要对这个字段使用索引。
4. 避免对经常更新的表创建过多的索引
5. 不建议用无序的值作为索引
    - 例如身份证、UUID(在索引比较时需要转为ASCII，并且插入时可能造成页分裂)、MD5、HASH、无序长字符串等。
6. 删除不再使用或者很少使用的索引
7. 不要定义冗余或重复的索引

## 字符常量与字符串常量有什么区别

### 1.数据类型
- char(字符型)为基本数据类型；
- string(字符串型)为引用数据类型；

### 2.表示方式
- char(字符型)用单引号引起的单个字符；
- string(字符串型)用双引号引起的0个或者多个字符；

### 3.表达含义
- char(字符型)表示一个整形的值(ASCII值)，可以进行表达式运算，可以与整形数据类型进行转换；
- string(字符串型)表示的是一个内存地址的值，即该字符串存放在内存中的位置；

### 4.内存大小
- char(字符型)占用两个字节；
- string(字符串型)占用若干个字节；


## 策略模式
&emsp; 在策略模式（Strategy Pattern）中，一个类的行为或其算法可以在运行时更改。这种类型的设计模式属于行为型模式。

&emsp; 在策略模式中，我们创建表示各种策略的对象和一个行为随着策略对象改变而改变的 context 对象。策略对象改变 context 对象的执行算法。
- 意图：定义一系列的算法,把它们一个个封装起来, 并且使它们可相互替换。
- 主要解决：在有多种算法相似的情况下，使用 if...else 所带来的复杂和难以维护。
- 关键代码：实现同一个接口。
- 应用实例： 旅行的出游方式，选择骑自行车、坐汽车，每一种旅行方式都是一个策略。 
- 优点： 1、算法可以自由切换。 2、避免使用多重条件判断。 3、扩展性良好。
- 缺点： 1、策略类会增多。 2、所有策略类都需要对外暴露。

```java
// Context上下文角色，也叫Context封装角色
// 起承上启下的作用，屏蔽高层模块对策略、算法的直接访问，封装可能存在的变化。
public class Context {
   // 维护一个对Strategy对象的引用  
   private Strategy strategy;
 
   // 创建的时候，通过构造函数的对象，选择对应的策略
   // 通过构造方法，传入具体的策略
   public Context(Strategy strategy){
      this.strategy = strategy;
   }
 
   public int executeStrategy(int num1, int num2){
      return strategy.doOperation(num1, num2);
   }
}

// Strategy是策略类，定义每个策略或算法必须具有的方法和属性
public interface Strategy {
   public int doOperation(int num1, int num2);
}

// 具体策略类，封装了具体的算法或行为
public class OperationAdd implements Strategy{
   @Override
   public int doOperation(int num1, int num2) {
      return num1 + num2;
   }
}

public static void main(String[] args) {
  // 创建的时候，通过构造函数的对象，选择对应的策略
  Context context = new Context(new OperationAdd());    
  System.out.println("10 + 5 = " + context.executeStrategy(10, 5));
}
```


## SpringBoot 中实现跨域的方式
&emsp; 域：协议 + 域名 + 端口；三者完全相同则为同域，反之有其一不同均为不同域。

&emsp; 跨域请求：当前【发起请求】的域和【请求指向】的域属于不同域时，该次请求称之为跨域请求。

### 全局跨域
1. 返回新的CorsFilter
    - 在任意配置类，返回一个新的CorsFIlter的Bean ，并添加映射路径和具体的CORS配置路径
2. 重写WebMvcConfigurer接口的addCorsMappings方法

### 局部跨域
1. 使用注解@CrossOrigin
    - 在类上上使用注解，表示该类的所有方法允许跨域；也可以在方法上使用注解。
2. 手动设置响应头 (HttpServletResponse)
    - response.addHeader("Access-Allow-Control-Origin","*")

## Spring的依赖注入：降低程序间的耦合（依赖关系）
&emsp; 将创建对象的管理交给spring容器，由Spring为我们提供，我们只需要在配置文件中说明依赖关系的维护

### 依赖注入能注入的数据
- 基本数据类型和String
- 其他bean类型（在配置文件中或者注解配置过的bean）
- 复杂类型/集合类型

### 注入的方式
- 使用构造函数提供
- 使用set方法提供
- 使用注解提供


## redis 5种数据结构以及使用场景
### String（字符串）
- 计数器
- 随机验证码

### Hash（字典）
- 存储对象类型的数据（如用户信息数据）

### List（列表）
- 消息队列
- 用户消息时间线 
- 文章的评论列表

### Set（集合）
- 标签
- 共同好友（两个set实现交集、并集、差集）

### Sorted Set（有序集合）
- 排行榜


## HTTP 协议
&emsp;  HTTP 协议是一种基于文本的传输协议，HTTP 协议中的报文都是以明文的方式进行传输，不做任何加密

### HTTP 中间人攻击
&emsp; 在 HTTP 传输过程中，中间人能看到并且修改 HTTP 通讯中所有的请求和响应内容，所以使用 HTTP 是非常的不安全

### 防止中间人攻击
- 对称加密（双方约定加密方式）：在第一次传输的时候，约定使用何种加密方式。如果第一次通信被拦截到了，那么秘钥就会泄露给中间人，中间人仍然可以解密后续的通信；
- 非对称加密：在约定加密方式的时候由服务器生成一对公私钥，服务器将公钥返回给客户端，客户端本地生成一串秘钥(AES_KEY)用于对称加密，并通过服务器发送的公钥进行加密得到(AES_KEY_SECRET)，之后返回给服务端，服务端通过私钥将客户端发送的AES_KEY_SECRET进行解密得到AEK_KEY,最后客户端和服务器通过AEK_KEY进行报文的加密通讯，改造如下
![AsymmetricEncryption](/public/java/javaOther/javaInterviewQuestions/AsymmetricEncryption.png)

非对称加密也不安全：中间人既然拿不到AES_KEY，那我就把自己模拟成一个客户端和服务器端的结合体，在用户->中间人的过程中中间人模拟服务器的行为，这样可以拿到用户请求的明文，在中间人->服务器的过程中中间人模拟客户端行为，这样可以拿到服务器响应的明文，以此来进行中间人攻击
![Middleman](/public/java/javaOther/javaInterviewQuestions/Middleman.png)

## HTTPS 协议
- HTTPS 其实是SSL+HTTP的简称；服务器是通过 SSL 证书来传递公钥，客户端会对 SSL 证书进行验证，其中证书认证体系就是确保SSL安全的关键。
- 权威认证机构在CA认证体系中，所有的证书都是由权威机构来颁发，而权威机构的 CA 证书都是已经在操作系统中内置的，我们把这些证书称之为CA根证书；


## TCP，UDP
1. TCP是面向链接的，虽然说网络的不安全不稳定特性决定了多少次握手都不能保证连接的可靠性，但TCP的三次握手在最低限度上(实际上也很大程度上保证了)保证了连接的可靠性。
UDP不是面向连接的，UDP传送数据前并不与对方建立连接，对接收到的数据也不发送确认信号，发送端不知道数据是否会正确接收，当然也不用重发，所以说UDP是无连接的、不可靠的一种数据传输协议。　　
2. 也正由于1所说的特点，使得UDP的开销更小数据传输速率更高，因为不必进行收发数据的确认，所以UDP的实时性更好。
3. TCP适用于传输大量的数据，UDP适用于传输少量的数据。


## @Resource和@Autowired
- @Resource和@Autowired都是做bean的注入时使用
- @Resource并不是Spring的注解，它的包是javax.annotation.Resource，需要导入，但是Spring支持该注解的注入。
- @Autowired为Spring提供的注解，需要导入包org.springframework.beans.factory.annotation.Autowired;只按照byType注入。

### @Autowired
- @Autowired注解是按照类型（byType）装配依赖对象，默认情况下它要求依赖对象必须存在，如果允许null值，可以设置它的required属性为false。
- 如果我们想使用按照名称（byName）来装配，可以结合@Qualifier注解一起使用。

### @Resource
- @Resource默认按照ByName自动注入，由J2EE提供，需要导入包javax.annotation.Resource。
- @Resource有两个重要的属性：name和type，而Spring将@Resource注解的name属性解析为bean的名字，而type属性则解析为bean的类型。
- 所以，如果使用name属性，则使用byName的自动注入策略，而使用type属性时则使用byType自动注入策略。如果既不制定name也不制定type属性，这时将通过反射机制使用byName自动注入策略。

## Springboot 读取配置文件的注解

### @Value
```yaml
application.properties：
demo.name=Name
demo.age=18
```

```java
@Value("${demo.name}")
private String name;
```

### @ConfigurationProperties
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

## 线程安全
- 多个线程访问同一个对象时，不用考虑这些线程在运行时环境下的调度和交替执行，也不需要进行额外的同步，或者在调用方进行任何其他操作，调用这个对象的行为都可以获得正确的结果，那么这个对象就是线程安全的。
- 一个类或者程序所提供的接口对于线程来说是原子操作或者多个线程之间的切换不会导致该接口的执行结果存在二义性，也就是说我们不用考虑同步的问题。
- 线程安全问题大多是由全局变量及静态变量引起的，局部变量逃逸也可能导致线程安全问题。
- 若每个线程中对全局变量、静态变量只有读操作，而无写操作，一般来说，这个全局变量是线程安全的；若有多个线程同时执行写操作，一般都需要考虑线程同步，否则的话就可能影响线程安全。


## @synchronized 
&emsp; @synchronized 的作用是创建一个互斥锁，保证此时没有其它线程对self对象进行修改，保证代码的安全性。也就是包装这段代码是原子性的，安全的。

```java
class RetryTest1 {
  private int i = 0;
  private static int s = 0;

  //线程不安全
  public void add(){ 
    s++;
  }

  //线程安全.因为i是非静态变量，即每个类对象拥有各自的变量。这里synchronized(this)意思就是本类对象的意思。所以是线程安全的。
  public void addSyncI(){ 
    synchronized (this) {
      i++;
    }
  }

  //线程不安全.因为s是静态变量，这里synchronized(this)意思就是本类对象的意思。
  public void addSyncS(){ 
    synchronized (this) {
      s++;
    }
  }

  //线程不安全.因为s是静态变量，而synchronized修饰的是非静态方法，即如果多线程中同时调用不同类对象的该方法，就会有问题。
  public synchronized void addSyncFun(){ 
    s++;
  }

  //线程安全.因为synchronized修饰的是静态方法，即这个方法本身任何情况下都是互斥的，所以是线程安全的。
  public static synchronized void addSyncStaticFun(){ 
    s++;
  }
}
```

## 数据库中引起全表扫描的SQL语句
### 1、模糊查询（like）
- 原因：like本身效率就比较低，应该尽量避免查询条件使用like；对于like ‘%...%’（全模糊）这样的条件，是无法使用索引的，全表扫描自然效率很低；另外，由于匹配算法的关系，模糊查询的字段长度越大，模糊查询效率越低。
- 解决办法：首先尽量避免模糊查询，如果因为业务需要一定要使用模糊查询，则至少保证不要使用全模糊查询：
    - 对于右模糊查询，即like ‘…%’，是会使用索引的；
    - 左模糊like‘%...’无法直接使用索引，但可以利用reverse + function index 的形式，变化成 like ‘…%’；
    - 全模糊是无法优化的，一定要的话考虑用搜索引擎。出于降低数据库服务器的负载考虑，尽可能地减少数据库模糊查询。

### 2、查询条件中含有is null
- 原因：Oracle 9i中，查询字段is null时单索引失效，引起全表扫描。
-  解决方法：SQL语法中使用NULL会有很多麻烦，最好索引列都是NOT NULL的；对于is null，可以建立组合索引，nvl(字段,0),对表和索引analyse后，is null查询时可以重新启用索引查找,但是效率还不是值得肯定；is not null 时永远不会使用索引。一般数据量大的表不要用is null查询。

### 3、查询条件中有不等于操作符（<>、!=）
- 原因：SQL中，不等于操作符会限制索引，引起全表扫描，即使比较的字段上有索引。
- 解决方法：通过把不等于操作符改成or，可以使用索引，避免全表扫描。例如，把column<>’aaa’，改成column<’aaa’ or column>’aaa’，就可以使用索引了。　

### 4、or使用不当
- 原因：where子句中比较的两个条件，一个有索引，一个没索引，使用or则会引起全表扫描。例如：where A==1 or B==2，A上有索引，B上没索引，则比较B==2时会重新开始全表扫描。　

### 5、组合索引
- 排序时应按照组合索引中各列的顺序进行排序，即使索引中只有一个列是要排序的，否则排序性能会比较差。
```sql
create index skip1 on emp5(job,empno，date); 
select job，empno from emp5 where job=’manager’and empno=’10’ order by job,empno,date desc;
-- 实际上只是查询出符合job=’manager’and empno=’10’条件的记录并按date降序排列，
-- 但是如果只写成order by date desc性能较差。
```

### 6、在where子句中对字段进行函数操作
- 在where子句中对字段进行函数操作，这将导致引擎放弃使用索引而进行全表扫描。

### 7、不带任何条件的count
- select count(*) from table；这样不带任何条件的count会引起全表扫描，并且没有任何业务意义，是一定要杜绝的。

### 8、Update 语句
- 如果只更改1、2个字段，不要Update全部字段，否则频繁调用会引起明显的性能消耗，同时带来大量日志。


## Spring中使用到的设计模式
### 1、工厂设计模式
- Spring使用工厂模式可以通过 BeanFactory 或 ApplicationContext 创建 bean 对象。

### 2、单例设计模式
- 线程池、缓存、日志对象
- Spring 中 bean 的默认作用域就是 singleton(单例)的。

### 3、代理模式
- AOP（基于动态代理） 如果要代理的对象，实现了某个接口，那么Spring AOP会使用JDK Proxy，去创建代理对象，而对于没有实现接口的对象，就无法使用 JDK Proxy 去进行代理了，这时候Spring AOP会使用Cglib ，这时候Spring AOP会使用 Cglib 生成一个被代理对象的子类来作为代理。Spring AOP 属于运行时增强，而 AspectJ 是编译时增强

### 4、模板方法
&emsp; 模板方法模式是一种行为设计模式，它定义一个操作中的算法的骨架，而将一些步骤延迟到子类中。 模板方法使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤的实现方式

- Spring 中 jdbcTemplate、hibernateTemplate 等以 Template 结尾的对数据库操作的类，它们就使用到了模板模式。一般情况下，我们都是使用继承的方式来实现模板模式，但是 Spring 并没有使用这种方式，而是使用Callback 模式与模板方法模式配合，既达到了代码复用的效果，同时增加了灵活性。

### 5、观察者模式
&emsp; 观察者模式是一种对象行为型模式。它表示的是一种对象与对象之间具有依赖关系，当一个对象发生改变的时候，这个对象所依赖的对象也会做出反应。

- Spring 事件驱动模型

### 6、适配器模式
&emsp; 适配器模式(Adapter Pattern) 将一个接口转换成客户希望的另一个接口，适配器模式使接口不兼容的那些类可以一起工作，其别名为包装器(Wrapper)。

- Spring AOP 的实现是基于代理模式，但是 Spring AOP 的增强或通知(Advice)使用到了适配器模式
- 在Spring MVC中，DispatcherServlet 根据请求信息调用 HandlerMapping，解析请求对应的 Handler。解析到对应的 Handler（也就是我们平常说的 Controller 控制器）后，开始由HandlerAdapter 适配器处理。HandlerAdapter 作为期望接口，具体的适配器实现类用于对目标类进行适配，Controller 作为需要适配的类。

### 7、装饰者模式
&emsp; 装饰者模式可以动态地给对象添加一些额外的属性或行为。相比于使用继承，装饰者模式更加灵活。

- InputStream家族，InputStream 类下有 FileInputStream (读取文件)、BufferedInputStream (增加缓存,使读取文件速度大大提升)等子类都在不修改InputStream 代码的情况下扩展了它的功能。

## ioc的作用
&emsp; ioc的思想最核心的地方在于，资源不由使用资源的双方管理，而由不使用资源的第三方管理，这可以带来很多好处。

- 第一，资源集中管理，实现资源的可配置和易管理。
- 第二，降低了使用资源双方的依赖程度，也就是我们说的耦合度。

## equals与==的区别
1. ==是判断两个变量或实例是不是指向同一个内存空间，equals是判断两个变量或实例所指向的内存空间的值是不是相同 
2. ==是指对内存地址进行比较 ， equals()是对字符串的内容进行比较
3. ==指引用是否相同， equals()指的是值是否相同


## 为什么重写equals方法，还必须要重写hashcode方法
1. 使用hashcode方法提前校验，可以避免每一次比对都调用equals方法，提高效率（hashcode不等，equals一定不等，则无需比较equals，提升效率。hashcode相等，equals可能相等，也可能不等。)
2. 保证是同一个对象，如果重写了equals方法，而没有重写hashcode方法，会出现equals相等的对象，hashcode不相等的情况，重写hashcode方法就是为了避免这种情况的出现。
3. HashSet内部不允许重复元素，HashSet添加数据的时候，是通过HashCode和equals方法都会true的时候才会判断两个元素完全相同

&emsp; 不被重写（原生）的hashCode值是根据内存地址换算出来的一个值


## toString()、String.valueOf、(String)强转，区别
- 1、toString()，可能会抛空指针异常
    - 在这种使用方法中，因为java.lang.Object类里已有public方法.toString()，所以java对象都可以调用此方法。但在使用时要注意，必须保证object不是null值，否则将抛出NullPointerException异常。采用这种方法时，通常派生类会覆盖Object里的toString()方法。
- 2、String.valueOf()，推荐使用，返回字符串“null”
    - String.valueOf()方法不会出现空指针异常，而且是静态的方法，直接通过String调用即可，只是有一点需要注意，就是上面提到的，如果为null，String.valueOf()返回结果是字符串“null”。而不是null。
- 3、(String)强转，不推荐使用
    - （String）是标准的类型转换，将Object类型转为String类型，使用(String)强转时，最好使用instanceof做一个类型检查，以判断是否可以进行强转，否则容易抛出ClassCastException异常。需要注意的是编写的时候，编译器并不会提示有语法错误，所以这个方法要谨慎的使用。

## 常见加密算法简析 
### 1、对称加密算法（AES、DES、3DES）
&emsp; 对称加密算法是指加密和解密采用相同的密钥，是可逆的（即可解密）。

&emsp; AES加密算法是密码学中的高级加密标准，采用的是对称分组密码体制，密钥长度的最少支持为128。AES加密算法是美国联邦政府采用的区块加密标准，这个标准用来替代原先的DES，已经被多方分析且广为全世界使用。

- 优点：加密速度快
- 缺点：密钥的传递和保存是一个问题，参与加密和解密的双方使用的密钥是一样的，这样密钥就很容易泄露。

### 2、非对称加密算法（RSA、DSA、ECC）
&emsp; 非对称加密算法是指加密和解密采用不同的密钥（公钥和私钥），因此非对称加密也叫公钥加密，是可逆的（即可解密）。公钥密码体制根据其所依据的难题一般分为三类：大素数分解问题类、离散对数问题类、椭圆曲线类。

&emsp; RSA加密算法是基于一个十分简单的数论事实：将两个大素数相乘十分容易，但是想要对其乘积进行因式分解极其困难，因此可以将乘积公开作为加密密钥。虽然RSA的安全性一直未能得到理论上的证明，但它经历了各种攻击至今未被完全攻破。 

- 优点：加密和解密的密钥不一致，公钥是可以公开的，只需保证私钥不被泄露即可，这样就密钥的传递变的简单很多，从而降低了被破解的几率。
- 缺点：加密速度慢

#### RSA加密算法既可以用来做数据加密，也可以用来数字签名。

- 数据加密过程：发送者用公钥加密，接收者用私钥解密（只有拥有私钥的接收者才能解读加密的内容）
- 数字签名过程：甲方用私钥加密，乙方用公钥解密（乙方解密成功说明就是甲方加的密，甲方就不可以抵赖）

### 3、线性散列算法算法（MD5、SHA1、HMAC）
&emsp; MD5全称是Message-Digest Algorithm 5（信息摘要算法5），单向的算法不可逆（被MD5加密的数据不能被解密）。MD5加密后的数据长度要比加密数据小的多，且长度固定，且加密后的串是唯一的。

&emsp; 适用场景：常用在不可还原的密码存储、信息完整性校验等。

&emsp; 信息完整性校验：典型的应用是对一段信息产生信息摘要，以防止被篡改。如果再有一个第三方的认证机构，用MD5还可以防止文件作者的“抵赖”，这就是所谓的数字签名应用。

#### SHA-1 与 MD5 的比较
&emsp; SHA-1摘要比MD5摘要长32 位，所以SHA-1对强行攻击有更大的强度，比MD5更安全。使用强行技术，产生任何一个报文使其摘要等于给定报摘要的难度对MD5是2^128数量级的操作，而对SHA-1则是2^160数量级的操作。

&emsp; 在相同的硬件上，SHA-1 的运行速度比 MD5 慢。

### 4、混合加密
&emsp; 由于以上加密算法都有各自的缺点（RSA加密速度慢、AES密钥存储问题、MD5加密不可逆），因此实际应用时常将几种加密算法混合使用。

&emsp; 例如：RSA+AES：采用RSA加密AES的密钥，采用AES对数据进行加密，这样集成了两种加密算法的优点，既保证了数据加密的速度，又实现了安全方便的密钥管理。

#### 采用多少位的密钥合适
&emsp; 一般来讲密钥长度越长，安全性越高，但是加密速度越慢。所以密钥长度也要合理的选择，一般RSA建议采用1024位的数字，AES建议采用128位即可。

### 5、Base64
&emsp; 严格意义讲，Base64并不能算是一种加密算法，而是一种编码格式，是网络上最常见的用于传输8bid字节代码的编码方式之一。

&emsp; Base64编码可用于在HTTP环境下传递较长的标识信息，Base编码不仅不仅比较简单，同时也据有不可读性（编码的数据不会被肉眼直接看到）。