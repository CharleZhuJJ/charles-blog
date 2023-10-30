---
title: 锁（Lock）
author: Charles Chu
date: 2023/09/02
isOriginal: true
---

# 锁（Lock）

## 乐观锁
![OptimisticLock](/public/java/javaOther/lock/OptimisticLock.png)
&emsp; 乐观锁是我们经常无意间用到的东西，是一种乐观思想，这种乐观思想就是认为：当前环境读数据的多，写数据的少，并发读多，并发写少。因此，在读数据的时候，并不会给当前线程加锁，在写数据的时候，会进行判断当前的值与期望值时候相同，如果相同则进行更新，更新期间进行加锁，保证原子性。

&emsp; 这个理论应该很多人会比较熟悉，CAS理论，比较并替换，在数据库设计中经常采用version版本号来进行乐观锁的实现。

## 悲观锁
![PessimisticLock](/public/java/javaOther/lock/PessimisticLock.png)
&emsp; 相比于乐观锁，悲观锁是一种非常悲观的思想，遇到事总是想到最坏的情况，认为写多读少，因此无论是读取数据还是写入数据，都会当作要修改其他里面的数据，通通上锁，指导这个线程释放锁后其他线程获取。

&emsp; 在java里面悲观锁有两种实现：synchronized、ReentrantLock。

## 自旋锁
![SpinLock](/public/java/javaOther/lock/SpinLock.png)

### 原理
&emsp; 为了让线程进行等待，让线程不断执行一个空操作的循环，类似你去找一个朋友，朋友在家里干活让你等一下，你就在门口徘徊，不去干别的事，徘徊了N次之后发现还没来人，直接先去干别的事，等他打电话叫你。

### 优点
&emsp; 主要是为了避免线程的挂起跟唤醒的开销，因为这部分的开销都需要在系统的内核态中完成，然后反馈到虚拟机，这样子的操作对虚拟机并发性能带来了巨大的压力。

### 缺点
&emsp; 既然是执行空操作，必然会占用处理器的时间，当占用的时间过长的时候，处理器的资源会被白白消耗掉，而且这部分消耗是一直在做没有任何意义的工作，性能上是非常浪费的。面对这种情况，等待的时间必须有一定的限度，如果自旋超过了限定的次数仍然没有成功获得锁，就应当使用传统的方式去挂起线程。

### 默认值
&emsp; JVM默认值10次，配置参数为：-XX:PreBlockSpin

## 递归锁（可重入锁）
![ReentrantLock](/public/java/javaOther/lock/ReentrantLock.png)
### 原理
&emsp; 任何线程获取了锁之后可以再次获取该锁而不会被阻塞，识别获取锁的线程是否为当前占据锁的线程，如果是则再次成功获取。获取锁后进行自增

### 优点
&emsp; 可以避免死锁。

### 实现
&emsp; synchronized、ReentrantLock。

## 读写锁
![ReadWriteLock](/public/java/javaOther/lock/ReadWriteLock.png)
&emsp; 读写锁是通过ReentrantReadWriteLock这个类来实现，在JAVA里面，为了提高性能而提供了这么个东西，读的地方用读锁，写的地方用写锁，读锁并不互斥，读写互斥，这部分直接由JVM进行控制。

在编码上，需要手动进行区分，下面的代码可以看到实现方式
```java

// 创建一个读写锁
private ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();
// 获取读锁
rwLock.readLock().lock();
// 释放读锁
rwLock.readLock().unlock();
// 创建一个写锁
rwLock.writeLock().lock();
// 写锁 释放
rwLock.writeLock().unlock();
```

## 公平锁
![FairLock](/public/java/javaOther/lock/FairLock.png)
&emsp; 公平锁是一种设计思想，多线程在进行数据请求的过程中，先去队列中申请锁，按照FIFO先进先出的原则拿到线程，然后占有锁。

## 非公平锁
![UnFairLock](/public/java/javaOther/lock/UnFairLock.png)
&emsp; 既然有公平锁，那就有非公平锁，也是一种设计思想。线程尝试获取锁，如果获取不到，这时候采用公平锁的方式进行，与此同时，多个线程获取锁的顺序有一定的随机性，并非按照先到先得的方式进行。

### 优点
&emsp; 性能上高于公平锁

### 缺点
&emsp; 存在线程饥饿问题，存在某一个线程一直获取不到锁导致一直等待，“饿死了”

&emsp; 在java里面，synchronized默认就是非公平锁，ReentrantLock可以通过构造函数来设置该锁是公平的还是非公平的，默认是非公平的。
```java

private final ReentrantLock.Sync sync;
    public ReentrantLock() {
        this.sync = new ReentrantLock.NonfairSync();
    }

    public ReentrantLock(boolean fair) {
        if(fair){
            this.sync = new ReentrantLock.FairSync();
        }else{
            this.sync = new ReentrantLock.NonfairSync();
        }
    }
}
```

## 共享锁
&emsp; 多个线程可以获取读锁，以共享的形式持有，本质上与乐观锁，读写锁一样，JAVA的共享锁也是ReentrantReadWriteLock

## 独占锁
&emsp; 只有一个线程可以获取锁，与悲观锁，互斥锁一样，JAVA的独占锁有：synchronized，ReentrantLock

## 重量级锁
![HeavyweightLock](/public/java/javaOther/lock/HeavyweightLock.png)
&emsp; 重量级锁其实是一种称呼，synchronized就是一种重量级锁，它是通过内部一个叫做监视器锁来实现，而监视器锁本质上是依赖于系统的Mutex Lock（互斥锁）来实现，当加锁的时候需要用用户态切换为核心态，这样子的成本非常高，因此这种依赖于操作系统Mutex Lock的锁称为重量级锁。为了优化synchronized的性能，引入了轻量级锁，偏向锁。

## 轻量级锁
![LightweightLock](/public/java/javaOther/lock/LightweightLock.png)
&emsp; 在JDK1.6的时候，为了优化重量级锁，引入了一种优化机制：轻量级锁。由于锁的获取默认采用重量级，互斥的开销很大，因此在没有竞争的时候采用CAS去操作以便消除同步使用的互斥锁。

### 优点
&emsp; 在没有资源竞争的情况下，通过CAS操作避免了互斥锁的开销

### 缺点
&emsp; 如果存在竞争，此时会额外增加CAS的开销，此时导致轻量级锁比传统重量级锁更慢。

## 偏向锁
![BiasedLock](/public/java/javaOther/lock/BiasedLock.png)
&emsp; 除了轻量级锁，JDK1.6还加入了另外一种锁优化机制，偏向锁。偏向锁里面最重要的一个理解就是：偏心。这个锁会非常偏心对待第一个获得它的线程，如果在接下来的执行过程中，该锁一直没有被其他的线程获取，则持有偏向锁的线程将永远不需要再进行同步。

### 优点
&emsp; 针对第一个线程，连CAS都不用做了，性能上强于轻量级锁

### 缺点
&emsp; 如果程序中的锁总是被不同线程访问，那这个偏向锁就是多余的，永远都有第一个。

## 分段锁
&emsp; 在java里面最好的实现就是ConcurrentHashMap，它里面划分了非常多的HashMap，默认是16个，如果需要添加一个key-value，并不是将整个HashMap锁住，而是先进行hashcode计算从而得出这个key-value应该放在哪个HashMap里面，然后开始对该HashMap进行加锁，并完成put操作。在多线程中，想象一下同时进行的时候，是不是做到了真正意义上的同步进行。在这里为了方便里面，我用HashMap来代替Segment，其实两者是一样的东西，只不过Segment是继承了ReentrantLock来进行加锁，非常优秀的设计。

## 互斥锁
&emsp; 互斥锁用最简单的一句话来理解：某个资源只能被一个线程访问，读读，读写，写读，写写都是一样的。

## 同步锁
&emsp; 与互斥锁一样，在同一个时间只允许一个线程访问一个资源，实现用synchronized

## 死锁
&emsp; 死锁并不是一种思想或者技术，而是一种状态，当线程A持有资源a，线程B持有资源b，线程A等着B释放b，线程B等着线程A释放a，进入了死循环，造成死锁。

## 总结
&emsp; JAVA里面主要有ReentrantLock ，synchronized，Lock三种，类别也是不一样
- synchronized：属于独占锁、悲观锁、可重入锁、非公平锁
- ReentrantLock：继承了Lock类，可重入锁、悲观锁、独占锁、互斥锁、同步锁。
- Lock：Java中的接口，可重入锁、悲观锁、独占锁、互斥锁、同步锁