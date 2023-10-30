---
title: 浅谈设计模式
author: Charles Chu
date: 2022/12/14
isOriginal: true
---

# 浅谈设计模式

## 创建型模式

&emsp; 创建型模式的作用就是创建对象，说到创建一个对象，最熟悉的就是 new 一个对象，然后 set 相关属性。但是，在很多场景下，我们需要给客户端提供更加友好的创建对象的方式，尤其是那种我们定义了类，但是需要提供给其他开发者用的时候。

### 1.简单工厂模式

&emsp; 简单地说，简单工厂模式通常就是这样，一个工厂类 XxxFactory，里面有一个静态方法，根据我们不同的参数，返回不同的派生自同一个父类（或实现同一接口）的实例对象。

```java
public class FoodFactory {
    public static Food makeFood(String name) {
        // 其中，LanZhouNoodle 和 HuangMenChicken 都继承自 Food。
        if (name.equals("noodle")) {
            Food noodle = new LanZhouNoodle();
            noodle.addSpicy("more");
            return noodle;
        } else if (name.equals("chicken")) {
            Food chicken = new HuangMenChicken();
            chicken.addCondiment("potato");
            return chicken;
        } else {
            return null;
        }
    }
}
```

### 2.工厂模式

&emsp; 之所以需要引入工厂模式，是因为我们往往需要使用两个或两个以上的工厂。

&emsp; 第一步，我们需要选取合适的工厂，然后第二步基本上和简单工厂一样。

&emsp; 核心在于，我们需要在第一步选好我们需要的工厂。比如，我们有 LogFactory 接口，实现类有 FileLogFactory 和 KafkaLogFactory，分别对应将日志写入文件和写入 Kafka 中，显然，我们客户端第一步就需要决定到底要实例化 FileLogFactory 还是 KafkaLogFactory，这将决定之后的所有的操作。

```java
public interface FoodFactory {
    Food makeFood(String name);
}

// ChineseFoodA、ChineseFoodB、AmericanFoodA、AmericanFoodB 都派生自 Food。
public class ChineseFoodFactory implements FoodFactory {
    @Override
    public Food makeFood(String name) {
        if (name.equals("A")) {
            return new ChineseFoodA();
        } else if (name.equals("B")) {
            return new ChineseFoodB();
        } else {
            return null;
        }
    }
}

public class AmericanFoodFactory implements FoodFactory {
    @Override
    public Food makeFood(String name) {
        if (name.equals("A")) {
            return new AmericanFoodA();
        } else if (name.equals("B")) {
            return new AmericanFoodB();
        } else {
            return null;
        }
    }
}

// 客户端
public class APP {
    public static void main(String[] args) {
        // 先选择一个具体的工厂
        FoodFactory factory = new ChineseFoodFactory();
        // 由第一步的工厂产生具体的对象，不同的工厂造出不一样的对象
        Food food = factory.makeFood("A");
    }
}
```

### 3.抽象工厂模式

&emsp; 当涉及到这种产品族的问题的时候，就需要抽象工厂模式来支持了。我们不再定义 CPU 工厂、主板工厂、硬盘工厂、显示屏工厂等等，我们直接定义电脑工厂，每个电脑工厂负责生产所有的设备，这样能保证肯定不存在兼容问题。

&emsp; 这个时候，对于客户端来说，不再需要单独挑选 CPU 厂商、主板厂商、硬盘厂商等，直接选择一家品牌工厂，品牌工厂会负责生产所有的东西，而且能保证肯定是兼容可用的。

![AbstractFactoryPattern](/public/java/javaOther/designPatterns/AbstractFactoryPattern.png)

&emsp; 当然，抽象工厂的问题也是显而易见的，比如我们要加个显示器，就需要修改所有的工厂，给所有的工厂都加上制造显示器的方法。这有点违反了对修改关闭，对扩展开放这个设计原则。

```java
public static void main(String[] args) {
    // 第一步就要选定一个“大厂”
    ComputerFactory cf = new AmdFactory();
    // 从这个大厂造 CPU
    CPU cpu = cf.makeCPU();
    // 从这个大厂造主板
    MainBoard board = cf.makeMainBoard();
    // 从这个大厂造硬盘
    HardDisk hardDisk = cf.makeHardDisk();

   // 将同一个厂子出来的 CPU、主板、硬盘组装在一起
   Computer result = new Computer(cpu, board, hardDisk);
}
```

&emsp; 在 Mybatis 的运用:SqlSessionFactory 工厂类来封装 SqlSession 的创建过程；

&emsp; 在 Spring 中的运用：BeanFactory 就是 Bean 生成的工厂。一个 Spring Bean 在生成过程中会经历复杂的一个生命周期，而这些生命周期对于使用者来说是无需关心的，所以就可以将 Bean 创建过程的逻辑给封装起来，提取出一个 Bean 的工厂。

### 4.单例模式

&emsp; 单例模式是指一个类在一个进程中只有一个实例对象（但也不一定，比如 Spring 中的 Bean 的单例是指在一个容器中是单例的）；单例模式创建分为饿汉式和懒汉式。

```java
// 饿汉模式
public class Singleton {
    // 首先，将 new Singleton() 堵死
    private Singleton() {};
    // 创建私有静态实例，意味着这个类第一次使用的时候就会进行创建
    private static Singleton instance = new Singleton();

    public static Singleton getInstance() {
        return instance;
    }
    // 瞎写一个静态方法。这里想说的是，如果我们只是要调用 Singleton.getDate(...)，
    // 本来是不想要生成 Singleton 实例的，不过没办法，已经生成了
    public static Date getDate(String mode) {return new Date();}
}

// 饱汉模式，懒汉式
 // volatile关键字的作用：防止重排序。因为创建对象的过程不是原子，大概会分为三个步骤
    // 第一步：分配内存空间给Singleton这个对象
    // 第二步：初始化对象
    // 第三步：将INSTANCE变量指向Singleton这个对象内存地址
// 假设没有使用volatile关键字发生了重排序，第二步和第三步执行过程被调换了，也就是先将INSTANCE变量指向Singleton这个对象内存地址，
// 再初始化对象。这样在发生并发的情况下，另一个线程经过第一个if非空判断时，发现已经为不为空，就直接返回了这个对象，
// 但是此时这个对象还未初始化，内部的属性可能都是空值，一旦被使用的话，就很有可能出现空指针这些问题。
public class Singleton {
    // 首先，也是先堵死 new Singleton() 这条路
    private Singleton() {}
    // 和饿汉模式相比，这边不需要先实例化出来，注意这里的 volatile，它是必须的
    private static volatile Singleton instance = null;

    // 双重检查，指的是两次检查 instance 是否为 null。
    // volatile 在这里是需要的
    public static Singleton getInstance() {
        if (instance == null) {
            // 加锁
            synchronized (Singleton.class) {
                // 这一次判断也是必须的，不然会有并发问题
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}

// 嵌套类
public class Singleton3 {
    private Singleton3() {}
    // 主要是使用了 嵌套类可以访问外部类的静态属性和静态方法 的特性
    private static class Holder {
        private static Singleton3 instance = new Singleton3();
    }
    public static Singleton3 getInstance() {
        return Holder.instance;
    }
}
```

### 5.建造者模式

&emsp; 经常碰见的 XxxBuilder 的类，通常都是建造者模式的产物。

&emsp; Spring 中的运用：BeanDefinitionBuilder

```java
Food food = new FoodBuilder().a().b().c().build();
Food food = Food.builder().a().b().c().build();
// 套路就是先 new 一个 Builder，然后可以链式地调用一堆方法，最后再调用一次 build() 方法，我们需要的对象就有了。
// 核心是：先把所有的属性都设置给 Builder，然后 build() 方法的时候，将这些属性复制给实际产生的对象。

// 建造者例子：
class User {
    // 下面是“一堆”的属性
    private String name;
    private String password;
    private String nickName;
    private int age;

    // 构造方法私有化，不然客户端就会直接调用构造方法了
    private User(String name, String password, String nickName, int age) {
        this.name = name;
        this.password = password;
        this.nickName = nickName;
        this.age = age;
    }

    // 静态方法，用于生成一个 Builder，这个不一定要有，不过写这个方法是一个很好的习惯，
    // 有些代码要求别人写 new User.UserBuilder().a()...build() 看上去就没那么好
    public static UserBuilder builder() {
        return new UserBuilder();
    }

    public static class UserBuilder {
        // 下面是和 User 一模一样的一堆属性
        private String  name;
        private String password;
        private String nickName;
        private int age;

        private UserBuilder() {
        }

        // 链式调用设置各个属性值，返回 this，即 UserBuilder
        public UserBuilder name(String name) {
            this.name = name;
            return this;
        }

        public UserBuilder password(String password) {
            this.password = password;
            return this;
        }

        public UserBuilder nickName(String nickName) {
            this.nickName = nickName;
            return this;
        }

        public UserBuilder age(int age) {
            this.age = age;
            return this;
        }

        // build() 方法负责将 UserBuilder 中设置好的属性“复制”到 User 中。
        // 当然，可以在 “复制” 之前做点检验
        public User build() {
            if (name == null || password == null) {
                throw new RuntimeException("用户名和密码必填");
            }
            if (age <= 0 || age >= 150) {
                throw new RuntimeException("年龄不合法");
            }
            // 还可以做赋予”默认值“的功能
              if (nickName == null) {
                nickName = name;
            }
            return new User(name, password, nickName, age);
        }
    }
}

// 客户端调用
public class APP {
    public static void main(String[] args) {
        User d = User.builder()
                .name("foo")
                .password("pAss12345")
                .age(25)
                .build();
    }
}
```

### 6.原型模式

&emsp; 原型模式很简单：有一个原型实例，基于这个原型实例产生新的实例，也就是“克隆”了。

&emsp; Object 类中有一个 clone() 方法，它用于生成一个新的对象，当然，如果我们要调用这个方法，java 要求我们的类必须先实现 Cloneable 接口，此接口没有定义任何方法，但是不这么做的话，在 clone() 的时候，会抛出 CloneNotSupportedException 异常。

## 创建型模式总结

&emsp; 创建型模式总体上比较简单，它们的作用就是为了产生实例对象，算是各种工作的第一步了，因为我们写的是面向对象的代码，所以我们第一步当然是需要创建一个对象了。

- 简单工厂模式最简单；
- 工厂模式在简单工厂模式的基础上增加了选择工厂的维度，需要第一步选择合适的工厂；
- 抽象工厂模式有产品族的概念，如果各个产品是存在兼容性问题的，就要用抽象工厂模式。
- 单例模式就不说了，为了保证全局使用的是同一对象，一方面是安全性考虑，一方面是为了节省资源；
- 建造者模式专门对付属性很多的那种类，为了让代码更优美；
- 原型模式用得最少，了解和 Object 类中的 clone() 方法相关的知识即可。

## 结构型模式

&emsp; 结构型模式旨在通过改变代码结构来达到解耦的目的，使得我们的代码容易维护和扩展。

### 1.代理模式

&emsp; 用一个代理来隐藏具体实现类的实现细节，通常还用于在真实的实现的前后添加一部分逻辑。

&emsp; 既然说是代理，那就要对客户端隐藏真实实现，由代理来负责客户端的所有请求。当然，代理只是个代理，它不会完成实际的业务逻辑，而是一层皮而已，但是对于客户端来说，它必须表现得就是客户端需要的真实实现。

&emsp; 代理模式说白了就是做 “方法包装” 或做 “方法增强”。在面向切面编程中，其实就是动态代理的过程。

```java
public interface FoodService {
    Food makeChicken();
    Food makeNoodle();
}

public class FoodServiceImpl implements FoodService {
    public Food makeChicken() {
         Food f = new Chicken()
         f.setChicken("1kg");
        f.setSpicy("1g");
        f.setSalt("3g");
        return f;
    }
    public Food makeNoodle() {
        Food f = new Noodle();
        f.setNoodle("500g");
        f.setSalt("5g");
        return f;
    }
}

// 代理要表现得“就像是”真实实现类，所以需要实现 FoodService
public class FoodServiceProxy implements FoodService {
    // 内部一定要有一个真实的实现类，当然也可以通过构造方法注入
    private FoodService foodService = new FoodServiceImpl();

    public Food makeChicken() {
        System.out.println("我们马上要开始制作鸡肉了");

        // 如果我们定义这句为核心代码的话，那么，核心代码是真实实现类做的，
        // 代理只是在核心代码前后做些“无足轻重”的事情
        Food food = foodService.makeChicken();

        System.out.println("鸡肉制作完成啦，加点胡椒粉"); // 增强
        food.addCondiment("pepper");

        return food;
    }
    public Food makeNoodle() {
        System.out.println("准备制作拉面~");
        Food food = foodService.makeNoodle();
        System.out.println("制作完成啦")
        return food;
    }
}
```

### 2.适配器模式

&emsp; 适配器模式做的就是，有一个接口需要实现，但是我们现成的对象都不满足，需要加一层适配器来进行适配。

&emsp; 适配器模式总体来说分三种：默认适配器模式、对象适配器模式、类适配器模式。

&emsp; 适配器使用场景：mybatis，它本身在运行的时候也需要产生日志，但是 mybatis 框架在设计的时候，无法知道项目中具体使用的是什么框架，所以只能适配各种日志的框架，项目使用什么框架，mybatis 就使用什么框架。

&emsp; 适配器模式和代理模式的异同：

- 比较这两种模式，其实是比较对象适配器模式和代理模式，在代码结构上，它们很相似，都需要一个具体的实现类的实例。但是它们的目的不一样，代理模式做的是增强原方法的活；适配器做的是适配的活，为的是提供“把鸡包装成鸭，然后当做鸭来使用”，而鸡和鸭它们之间原本没有继承关系。

#### 默认适配器模式

&emsp; 我们用 Appache commons-io 包中的 FileAlterationListener 做例子：此接口的一大问题是抽象方法太多了，如果我们要用这个接口，意味着我们要实现每一个抽象方法，如果我们只是想要监控文件夹中的文件创建和文件删除事件，可是我们还是不得不实现所有的方法，很明显，这不是我们想要的。

&emsp; 所以，我们需要下面一个适配器，它用于实现上面的接口，但是所有的方法都是空方法，我们就可以转而定义自己的类来继承下面这个类即可。

```java
public interface FileAlterationListener {
    void onStart(final FileAlterationObserver observer);
    void onDirectoryCreate(final File directory);
    void onDirectoryChange(final File directory);
    void onDirectoryDelete(final File directory);
    void onFileCreate(final File file);
    void onFileChange(final File file);
    void onFileDelete(final File file);
    void onStop(final FileAlterationObserver observer);
}

public class FileAlterationListenerAdaptor implements FileAlterationListener {
    public void onStart(final FileAlterationObserver observer) {}
    public void onDirectoryCreate(final File directory) {}
    public void onDirectoryChange(final File directory) {}
    public void onDirectoryDelete(final File directory) {}
    public void onFileCreate(final File file) {}
    public void onFileChange(final File file) {}
    public void onFileDelete(final File file) {}
    public void onStop(final FileAlterationObserver observer) {}
}

public class FileMonitor extends FileAlterationListenerAdaptor {
    public void onFileCreate(final File file) {
        // 文件创建
        doSomething();
    }
    public void onFileDelete(final File file) {
        // 文件删除
        doSomething();
    }
}
```

#### 对象适配器模式

```java
public interface Duck {
    public void quack(); // 鸭的呱呱叫
    public void fly(); // 飞
}

public interface Cock {
    public void gobble(); // 鸡的咕咕叫
    public void fly(); // 飞
}

public class WildCock implements Cock {
    public void gobble() {
        System.out.println("咕咕叫");
    }
    public void fly() {
        System.out.println("鸡也会飞哦");
    }
}

// 毫无疑问，首先，这个适配器肯定需要 implements Duck，这样才能当做鸭来用
public class CockAdapter implements Duck {

    Cock cock;
    // 构造方法中需要一个鸡的实例，此类就是将这只鸡适配成鸭来用
      public CockAdapter(Cock cock) {
        this.cock = cock;
    }

    // 实现鸭的呱呱叫方法
    @Override
      public void quack() {
        // 内部其实是一只鸡的咕咕叫
        cock.gobble();
    }

      @Override
      public void fly() {
        cock.fly();
    }
}

public static void main(String[] args) {
    // 有一只野鸡
      Cock wildCock = new WildCock();
      // 成功将野鸡适配成鸭
      Duck duck = new CockAdapter(wildCock);
      ...
}
```

#### 类适配器模式

&emsp; 看到这个图，大家应该很容易理解的吧，通过继承的方法，适配器自动获得了所需要的大部分方法。这个时候，客户端使用更加简单，直接 Target t = new SomeAdapter(); 就可以了。
![ClassAdapterpattern.png](/public/java/javaOther/designPatterns/ClassAdapterpattern.png)

### 3.桥梁模式

&emsp; 理解桥梁模式，其实就是理解代码抽象和解耦。

```java
// 定义接口
public interface DrawAPI {
   public void draw(int radius, int x, int y);
}

// 接口的实现类
public class RedPen implements DrawAPI {
    @Override
    public void draw(int radius, int x, int y) {
        System.out.println("用红色笔画图，radius:" + radius + ", x:" + x + ", y:" + y);
    }
}
public class GreenPen implements DrawAPI {
    @Override
    public void draw(int radius, int x, int y) {
        System.out.println("用绿色笔画图，radius:" + radius + ", x:" + x + ", y:" + y);
    }
}
public class BluePen implements DrawAPI {
    @Override
    public void draw(int radius, int x, int y) {
        System.out.println("用蓝色笔画图，radius:" + radius + ", x:" + x + ", y:" + y);
    }
}

// 定义一个抽象类，此类的实现类都需要使用 DrawAPI：
public abstract class Shape {
    protected DrawAPI drawAPI;
    protected Shape(DrawAPI drawAPI) {
        this.drawAPI = drawAPI;
    }
    public abstract void draw();
}

// 圆形
public class Circle extends Shape {
    private int radius;
    public Circle(int radius, DrawAPI drawAPI) {
        super(drawAPI);
        this.radius = radius;
    }
    public void draw() {
        drawAPI.draw(radius, 0, 0);
    }
}
// 长方形
public class Rectangle extends Shape {
    private int x;
    private int y;
    public Rectangle(int x, int y, DrawAPI drawAPI) {
        super(drawAPI);
        this.x = x;
        this.y = y;
    }
    public void draw() {
        drawAPI.draw(0, x, y);
    }
}

// 客户端
public static void main(String[] args) {
    Shape greenCircle = new Circle(10, new GreenPen());
    Shape redRectangle = new Rectangle(4, 8, new RedPen());
    greenCircle.draw();
    redRectangle.draw();
}
```

### 4.装饰模式

&emsp; 既然说是装饰，那么往往就是添加小功能这种，而且，我们要满足可以添加多个小功能。

```java
// 抽象基类
public abstract class Beverage {
      // 返回描述
      public abstract String getDescription();
      // 返回价格
      public abstract double cost();
}

// 基础实现
public class BlackTea extends Beverage {
      public String getDescription() {
        return "红茶";
    }
      public double cost() {
        return 10;
    }
}
public class GreenTea extends Beverage {
    public String getDescription() {
        return "绿茶";
    }
      public double cost() {
        return 11;
    }
}

// 装饰者基类
public abstract class Condiment extends Beverage {
}

// 继承装饰者基类
public class Lemon extends Condiment {
    private Beverage bevarage;
    // 这里很关键，需要传入具体的饮料，如需要传入没有被装饰的红茶或绿茶，
    // 当然也可以传入已经装饰好的芒果绿茶，这样可以做芒果柠檬绿茶
    public Lemon(Beverage bevarage) {
        this.bevarage = bevarage;
    }
    public String getDescription() {
        // 装饰
        return bevarage.getDescription() + ", 加柠檬";
    }
    public double cost() {
        // 装饰
        return beverage.cost() + 2; // 加柠檬需要 2 元
    }
}

public class Mango extends Condiment {
    private Beverage bevarage;
    public Mango(Beverage bevarage) {
        this.bevarage = bevarage;
    }
    public String getDescription() {
        return bevarage.getDescription() + ", 加芒果";
    }
    public double cost() {
        return beverage.cost() + 3; // 加芒果需要 3 元
    }
}

// 客户端：
public static void main(String[] args) {
    // 首先，我们需要一个基础饮料，红茶、绿茶或咖啡
    Beverage beverage = new GreenTea();
    // 开始装饰
    beverage = new Lemon(beverage); // 先加一份柠檬
    beverage = new Mongo(beverage); // 再加一份芒果

    System.out.println(beverage.getDescription() + " 价格：￥" + beverage.cost());
    //"绿茶, 加柠檬, 加芒果 价格：￥16"
}
```

#### java IO 中的装饰模式

![javaIoDecorationMode.png](/public/java/javaOther/designPatterns/JavaIoDecorationMode.png)

### 5.门面模式

&emsp; 门面模式（也叫外观模式，Facade Pattern）在许多源码中有使用。

&emsp; 门面模式的优点显而易见，客户端不再需要关注实例化时应该使用哪个实现类，直接调用门面提供的方法就可以了，因为门面类提供的方法的方法名对于客户端来说已经很友好了。

```java
public class ShapeMaker {
   private Shape circle;
   private Shape rectangle;
   private Shape square;

   public ShapeMaker() {
      circle = new Circle();
      rectangle = new Rectangle();
      square = new Square();
   }

  /**
   * 下面定义一堆方法，具体应该调用什么方法，由这个门面来决定
   */
   public void drawCircle(){
      circle.draw();
   }
   public void drawRectangle(){
      rectangle.draw();
   }
   public void drawSquare(){
      square.draw();
   }
}

// 客户端
public static void main(String[] args) {
  ShapeMaker shapeMaker = new ShapeMaker();
  // 客户端调用现在更加清晰了
  shapeMaker.drawCircle();
  shapeMaker.drawRectangle();
  shapeMaker.drawSquare();
}
```

### 6.组合模式

&emsp; 组合模式用于表示具有层次结构的数据，使得我们对单个对象和组合对象的访问具有一致性。

```java
// 每个员工都有姓名、部门、薪水这些属性，同时还有下属员工集合（虽然可能集合为空）
// 而下属员工和自己的结构是一样的，也有姓名、部门这些属性，同时也有他们的下属员工集合。
public class Employee {
   private String name;
   private String dept;
   private int salary;
   private List<Employee> subordinates; // 下属

   public Employee(String name,String dept, int sal) {
      this.name = name;
      this.dept = dept;
      this.salary = sal;
      subordinates = new ArrayList<Employee>();
   }

   public void add(Employee e) {
      subordinates.add(e);
   }

   public void remove(Employee e) {
      subordinates.remove(e);
   }

   public List<Employee> getSubordinates(){
     return subordinates;
   }

   public String toString(){
      return ("Employee :[ Name : " + name + ", dept : " + dept + ", salary :" + salary+" ]");
   }
}
```

### 7.享元模式

&emsp; 英文是 Flyweight Pattern。Flyweight 是轻量级的意思，享元分开来说就是共享元器件，也就是复用已经生成的对象，这种做法当然也就是轻量级的了。

&emsp; 复用对象最简单的方式是，用一个 HashMap 来存放每次新生成的对象。每次需要一个对象的时候，先到 HashMap 中看看有没有，如果没有，再生成新的对象，然后将这个对象放入 HashMap 中。

## 结构型模式总结

- 代理模式是做方法增强的；
- 适配器模式是把鸡包装成鸭这种用来适配接口的；
- 桥梁模式做到了很好的解耦；
- 装饰模式从名字上就看得出来，适合于装饰类或者说是增强类的场景；
- 门面模式的优点是客户端不需要关心实例化过程，只要调用需要的方法即可；
- 组合模式用于描述具有层次结构的数据；
- 享元模式是为了在特定的场景中缓存已经创建的对象，用于提高性能。

## 行为型模式

&emsp; 行为型模式关注的是各个类之间的相互作用，将职责划分清楚，使得我们的代码更加地清晰。

### 1.策略模式

&emsp; 在策略模式（Strategy Pattern）中，一个类的行为或其算法可以在运行时更改。这种类型的设计模式属于行为型模式。

&emsp; 在策略模式中，我们创建表示各种策略的对象和一个行为随着策略对象改变而改变的 context 对象。策略对象改变 context 对象的执行算法。

- 意图：定义一系列的算法,把它们一个个封装起来, 并且使它们可相互替换。
- 主要解决：在有多种算法相似的情况下，使用 if...else 所带来的复杂和难以维护。
- 关键代码：实现同一个接口。
- 应用实例： 旅行的出游方式，选择骑自行车、坐汽车，每一种旅行方式都是一个策略。
- 优点： 1、算法可以自由切换。 2、避免使用多重条件判断。 3、扩展 q 性良好。
- 缺点： 1、策略类会增多。 2、所有策略类都需要对外暴露。

&emsp; springmvc 中的应用：@PathVariable、@RequestParam、@RequestBody 等注解，一旦我们使用了注解，SpringMVC 会处理注解，从请求中获取到参数，然后再调用接口传递过来，而这个过程，就使用到了策略模式。

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

### 2.观察者模式

&emsp; 观察者订阅自己关心的主题和主题有数据变化后通知观察者们。

```java
// 定义主题：
public class Subject {
    private List<Observer> observers = new ArrayList<Observer>();
    private int state;
    public int getState() {
        return state;
    }
    public void setState(int state) {
        this.state = state;
        // 数据已变更，通知观察者们
        notifyAllObservers();
    }
    // 注册观察者
    public void attach(Observer observer) {
        observers.add(observer);
    }
    // 通知观察者们
    public void notifyAllObservers() {
        for (Observer observer : observers) {
            observer.update();
        }
    }
}

// 定义观察者接口
public abstract class Observer {
    protected Subject subject;
    public abstract void update();
}

// 具体的观察者
public class BinaryObserver extends Observer {
    // 在构造方法中进行订阅主题
    public BinaryObserver(Subject subject) {
        this.subject = subject;
        // 通常在构造方法中将 this 发布出去的操作一定要小心
        this.subject.attach(this);
    }
    // 该方法由主题类在数据变更的时候进行调用
    @Override
    public void update() {
        String result = Integer.toBinaryString(subject.getState());
        System.out.println("订阅的数据发生变化，新的数据处理为二进制值为：" + result);
    }
}

public class HexaObserver extends Observer {
    public HexaObserver(Subject subject) {
        this.subject = subject;
        this.subject.attach(this);
    }
    @Override
    public void update() {
        String result = Integer.toHexString(subject.getState()).toUpperCase();
        System.out.println("订阅的数据发生变化，新的数据处理为十六进制值为：" + result);
    }
}

// 客户端
public static void main(String[] args) {
    // 先定义一个主题
    Subject subject1 = new Subject();
    // 定义观察者
    new BinaryObserver(subject1);
    new HexaObserver(subject1);

    // 模拟数据变更，这个时候，观察者们的 update 方法将会被调用
    subject.setState(11);
}
```

### 3.责任链模式

&emsp; 责任链通常需要先建立一个单向链表，然后调用方只需要调用头部节点就可以了，后面会自动流转下去。比如流程审批就是一个很好的例子，只要终端用户提交申请，根据申请的内容信息，自动建立一条责任链，然后就可以开始流转了。

&emsp; 有这么一个场景，用户参加一个活动可以领取奖品，但是活动需要进行很多的规则校验然后才能放行，比如首先需要校验用户是否是新用户、今日参与人数是否有限额、全场参与人数是否有限额等等。设定的规则都通过后，才能让用户领走奖品。

&emsp; 在 SpringMVC 中，可以通过使用 HandlerInterceptor 对每个请求进行拦截。而 HandlerInterceptor 其实就使用到了责任链模式

```java
// 定义流程上节点的基类
public abstract class RuleHandler {
    // 后继节点
    protected RuleHandler successor;

    public abstract void apply(Context context);

    public void setSuccessor(RuleHandler successor) {
        this.successor = successor;
    }

    public RuleHandler getSuccessor() {
        return successor;
    }
}

// 定义节点
// 校验用户是否是新用户：
public class NewUserRuleHandler extends RuleHandler {
    public void apply(Context context) {
        if (context.isNewUser()) {
            // 如果有后继节点的话，传递下去
            if (this.getSuccessor() != null) {
                this.getSuccessor().apply(context);
            }
        } else {
            throw new RuntimeException("该活动仅限新用户参与");
        }
    }
}
// 校验用户所在地区是否可以参与：
public class LocationRuleHandler extends RuleHandler {
    public void apply(Context context) {
        boolean allowed = activityService.isSupportedLocation(context.getLocation);
        if (allowed) {
            if (this.getSuccessor() != null) {
                this.getSuccessor().apply(context);
            }
        } else {
            throw new RuntimeException("非常抱歉，您所在的地区无法参与本次活动");
        }
    }
}
// 校验奖品是否已领完：
public class LimitRuleHandler extends RuleHandler {
    public void apply(Context context) {
        int remainedTimes = activityService.queryRemainedTimes(context); // 查询剩余奖品
        if (remainedTimes > 0) {
            if (this.getSuccessor() != null) {
                this.getSuccessor().apply(userInfo);
            }
        } else {
            throw new RuntimeException("您来得太晚了，奖品被领完了");
        }
    }
}

// 客户端
public static void main(String[] args) {
    RuleHandler newUserHandler = new NewUserRuleHandler();
    RuleHandler locationHandler = new LocationRuleHandler();
    RuleHandler limitHandler = new LimitRuleHandler();

    // 假设本次活动仅校验地区和奖品数量，不校验新老用户
    locationHandler.setSuccessor(limitHandler);

    locationHandler.apply(context);
}
```

### 4.模板方法模式

&emsp; 模板方法中定义了调用方法的顺序，其中有抽象方法，子类必须实现它，其实模板方法中有几个抽象方法完全是自由的，我们也可以将三个方法都设置为抽象方法，让子类来实现。也就是说，模板方法只负责定义第一步应该要做什么，第二步应该做什么，第三步应该做什么，至于怎么做，由子类来实现。

&emsp; 在 Spring 中的运用：ApplicationContext 在使用之前需要调用一下 refresh 方法，在整个刷新过程有一个 onRefresh 方法，onRefresh 就是一个模板方法。

```java
// 定义抽象类
public abstract class AbstractTemplate {
    // 这就是模板方法
    public void templateMethod() {
        init();
        apply(); // 这个是重点
        end(); // 可以作为钩子方法
    }

    protected void init() {
        System.out.println("init 抽象层已经实现，子类也可以选择覆写");
    }

    // 留给子类实现
    protected abstract void apply();

    protected void end() {
    }
}

// 实现类
public class ConcreteTemplate extends AbstractTemplate {
    public void apply() {
        System.out.println("子类实现抽象方法 apply");
    }

    public void end() {
        System.out.println("我们可以把 method3 当做钩子方法来使用，需要的时候覆写就可以了");
    }
}

// 客户端
public static void main(String[] args) {
    AbstractTemplate t = new ConcreteTemplate();
    // 调用模板方法
    t.templateMethod();
}
```

### 5.状态模式

```java
// 定义状态接口
public interface State {
    public void doAction(Context context);
}

// 实现接口
public class DeductState implements State {

    public void doAction(Context context) {
        System.out.println("商品卖出，准备减库存");
        context.setState(this);

        //... 执行减库存的具体操作
    }

    public String toString() {
        return "Deduct State";
    }
}
public class RevertState implements State {

    public void doAction(Context context) {
        System.out.println("给此商品补库存");
        context.setState(this);

        //... 执行加库存的具体操作
    }

    public String toString() {
        return "Revert State";
    }
}

public class Context {
    private State state;
      private String name;
      public Context(String name) {
        this.name = name;
    }

      public void setState(State state) {
        this.state = state;
    }
      public void getState() {
        return this.state;
    }
}

// 客户端
public static void main(String[] args) {
    // 我们需要操作的是 iPhone X
    Context context = new Context("iPhone X");

    // 看看怎么进行补库存操作
      State revertState = new RevertState();
      revertState.doAction(context);

    // 同样的，减库存操作也非常简单
      State deductState = new DeductState();
      deductState.doAction(context);

      // 如果需要我们可以获取当前的状态
    // context.getState().toString();
}
```
