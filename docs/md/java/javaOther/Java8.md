---
title: Java8
author: Charles Chu
date: 2023/02/26
isOriginal: true
---

# Java8 <Badge text="持续更新" type="warning" />

## 函数式接口

&emsp; 函数式接口(Functional Interface)就是一个有且仅有一个抽象方法，但是可以有多个非抽象方法的接口。函数式接口可以被隐式转换为 lambda 表达式。允许把函数作为一个方法的参数（函数作为参数传递进方法中）

```java
public class Java8Tester {
   public static void main(String args[]){
      Java8Tester tester = new Java8Tester();
      MathOperation addition = (int a, int b) -> a + b;
      System.out.println("10 + 5 = " + tester.operate(10, 5, addition));
      //结果：10 + 5 = 15
   }

   interface MathOperation {
      int operation(int a, int b);
   }

   private int operate(int a, int b, MathOperation mathOperation){
      return mathOperation.operation(a, b);
   }
}
```

## Stream

&emsp; 以一种声明的方式处理数据。将要处理的元素集合看作一种流， 流在管道中传输， 并且可以在管道的节点上进行处理， 比如筛选， 排序，聚合等。

### 1、生成流

```java
List<String> strings = Arrays.asList("abc", "", "bc", "efg", "abcd","", "jkl");
List<String> filtered = strings.stream().filter(string->!string.isEmpty()).collect(Collectors.toList());
```

### 2、map 方法

&emsp; 用于映射每个元素到对应的结果（map 方法用于映射每个元素到对应的结果，一对一。）

#### map

&emsp; map 会将每一条输入映射为一个新对象。{苹果，梨子}.map(去皮） = {去皮苹果，去皮梨子} 其中： “去皮”函数的类型为：A => B

![map](/public/java/javaOther/java8/Map.png)

```java
// 例子：使用 map 输出了元素对应的平方数：
List<Integer> numbers = Arrays.asList(3, 2, 2, 3, 7, 3, 5);
// 获取对应的平方数
List<Integer> squaresList = numbers.stream().map( i -> i*i).distinct().collect(Collectors.toList());
```

&emsp; 对于 Stream 中包含的元素使用给定的转换函数进行转换操作，新生成的 Stream 只包含转换生成的元素。这个方法有三个对于原始类型的变种方法，分别是：mapToInt，mapToLong 和 mapToDouble。这三个方法也比较好理解，比如 mapToInt 就是把原始 Stream 转换成一个新的 Stream，这个新生成的 Stream 中的元素都是 int 类型。之所以会有这样三个变种方法，可以免除自动装箱/拆箱的额外消耗；

#### flatMap

&emsp; flat 是扁平的意思。它把数组流中的每一个值，使用所提供的函数执行一遍，一一对应。得到元素相同的数组流。只不过，里面的元素也是一个子数组流。把这些子数组合并成一个数组以后，元素个数大概率会和原数组流的个数不同。

&emsp; flatMap 包含两个操作：会将每一个输入对象输入映射为一个新集合，然后把这些新集合连成一个大集合。 {苹果，梨子}.flatMap(切碎) = {苹果碎片 1，苹果碎片 2，梨子碎片 1，梨子碎片 2} 其中： “切碎”函数的类型为： A => List\<B>

![map](/public/java/javaOther/java8/FlatMap.png)

### 3、filter 方法

&emsp; 用于通过设置的条件过滤出元素

```java
// 使用 filter 方法过滤出空字符串
List<String>strings = Arrays.asList("abc", "", "bc", "efg", "abcd","", "jkl");
// 获取空字符串的数量
long count = strings.stream().filter(string -> string.isEmpty()).count();
```

### 4、limit

&emsp; 方法用于获取指定数量的流。

```java
// 使用 limit 方法打印出 10 条数据：
Random random = new Random();
random.ints().limit(10).forEach(System.out::println);
```

### 5、Collectors 类

&emsp; 实现了很多归约操作，例如将流转换成集合和聚合元素。Collectors 可用于返回列表或字符串

```java
List<String>strings = Arrays.asList("abc", "", "bc", "efg", "abcd","", "jkl");
List<String> filtered = strings.stream().filter(string -> !string.isEmpty()).collect(Collectors.toList());
System.out.println("筛选列表: " + filtered);
String mergedString = strings.stream().filter(string -> !string.isEmpty()).collect(Collectors.joining(", "));
System.out.println("合并字符串: " + mergedString);
```

### 6、统计

```java
List<Integer> numbers = Arrays.asList(3, 2, 2, 3, 7, 3, 5);
IntSummaryStatistics stats = numbers.stream().mapToInt((x) -> x).summaryStatistics();
System.out.println("列表中最大的数 : " + stats.getMax());
System.out.println("列表中最小的数 : " + stats.getMin());
System.out.println("所有数之和 : " + stats.getSum());
System.out.println("平均数 : " + stats.getAverage());
```

### 7、peek

&emsp; peek 操作接收的是一个 Consumer\<T> 函数。顾名思义 peek 操作会按照 Consumer\<T> 函数提供的逻辑去消费流中的每一个元素，同时有可能改变元素内部的一些属性。（与 map 最大的区别是它没有返回值。）

&emsp; peek 接收一个 Consumer，而 map 接收一个 Function。

&emsp; Consumer 是没有返回值的，它只是对 Stream 中的元素进行某些操作，但是操作之后的数据并不返回到 Stream 中，所以 Stream 中的元素还是原来的元素。

&emsp; 而 Function 是有返回值的，这意味着对于 Stream 的元素的所有操作都会作为新的结果返回到 Stream 中。

&emsp; 这就是为什么 peek String 不会发生变化而 peek Object 会发送变化的原因。

### 8、reduce

&emsp; 主要作用是把 Stream 元素组合起来进行操作

```java
List<Integer> numList = Arrays.asList(1,2,3,4,5);
int result = numList.stream().reduce((a,b) -> {
  System.out.println("a=" + a + ",b=" + b);
  return a + b;
} ).get();
System.out.println(result);
//a=1,b=2
//a=3,b=3
//a=6,b=4
//a=10,b=5
// 15
```

## Optional

&emsp; optional 是个容器：它可以保存类型 T 的值，或者仅仅保存 null。Optional 提供很多有用的方法，这样我们就不用显式进行空值检测。Optional 类的引入很好的解决空指针异常。

```java
public class Java8Tester {
   public static void main(String args[]){
      Java8Tester java8Tester = new Java8Tester();
      Integer value1 = null;
      Integer value2 = new Integer(10);

      // Optional.ofNullable - 允许传递为 null 参数
      Optional<Integer> a = Optional.ofNullable(value1);
      // Optional.of - 如果传递的参数是 null，抛出异常 NullPointerException
      Optional<Integer> b = Optional.of(value2);

      System.out.println(java8Tester.sum(a,b));
   }

   public Integer sum(Optional<Integer> a, Optional<Integer> b){
      // Optional.isPresent - 判断值是否存在
      System.out.println("第一个参数值存在: " + a.isPresent());  //false
      System.out.println("第二个参数值存在: " + b.isPresent());  //true

      // Optional.orElse - 如果值存在，返回它，否则返回默认值
      Integer value1 = a.orElse(new Integer(0));
      //Optional.get - 获取值，值需要存在
      Integer value2 = b.get();
      return value1 + value2;  //10
   }
}
```

## Comparator.comparing

### 1、Comparator.comparing(参数 1)

```java
Comparator.comparing(Employee::getName)   --等价
(o1, o2) -> o1.getName().compareTo(o2.getName())
```

### 2、Comparator.comparing(参数 1，参数 2)

```java
Comparator.comparing(Employee::getName, (s1, s2) -> {return s2.compareTo(s1);})  --自定义比较器
```

### 3、Comparator.reversed

&emsp; 返回相反的排序规则

```java
Comparator.comparing(Employee::getName).reversed()
```

### 4、Comparator.thenComparing

```java
// 例子：首先使用 name 排序，紧接着在使用ege 排序
Comparator.comparing(Employee::getAge).thenComparing(Employee::getName)
```
