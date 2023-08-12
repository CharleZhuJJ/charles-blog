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