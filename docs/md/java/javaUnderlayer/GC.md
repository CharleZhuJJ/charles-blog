---
title: GC
author: Charles Chu
date: 2021/12/14
isOriginal: true
---

# GC <Badge text="持续更新" type="warning" />

## Garbage Collector 垃圾收集器(GC)

&emsp; 作用：

1. 分配内存；
2. 确保引用对象的内存使用；
3. 回收不再引用的对象
   &emsp; gc 线程开始工作时，都需要 STW（stop the world）暂停所有工作线程。

## 垃圾对象是怎么找到的

### 1、引用计数算法

&emsp; 就是给对象添加一个计数器 rc，当计数器的值为 0 的时候，那么该对象就是垃圾了。

- 每当有一个地方引用它的时候，计数器就加 1，rc++
- 每当有一个引用失效的时候，计数器就减 1，rc--

#### 优缺点

- 优点：这种方案的原理很简单，而且判定的效率也非常高，适合内存少的场景。
- 缺点：引用计数算法问题，相互引用：
  - 比如两个对象循环引用，a 对象引用了 b 对象，b 对象也引用了 a 对象，a、b 对象却没有再被其他对象所引用了，其实正常来说这两个对象已经是垃圾了，因为没有其他对象在使用了，但是计数器内的数值却不是 0，所以引用计数算法就无法回收它们。这种算法是比较直接的找到垃圾，然后去回收，也被称为"直接垃圾收集"。

![CrossReferencing](/public/java/javaUnderlayer/gc/CrossReferencing.png)

### 2、根可达算法

&emsp; 这也是 JVM 默认使用的寻找垃圾算法它的原理就是定义了一系列的根，我们把它称为 "GC Roots" ，从 "GC Roots" 开始往下进行搜索，走过的路径我们把它称为 "引用链" ，当一个对象到 "GC Roots"之间没有任何引用链相连时，那么这个对象就可以被当做垃圾回收了。

&emsp; root search：如图，根可达算法就可以避免计数器算法不好解决的循环引用问题，Object 6、Object 7、Object 8 彼此之前有引用关系，但是没有与"GC Roots" 相连，那么就会被当做垃圾所回收。

![GcRoot](/public/java/javaUnderlayer/gc/GcRoot.png)

#### GC Roots

&emsp; 在 java 中，有固定的 GC Roots 对象和不固定的临时 GC Roots 对象

- 固定的 GC Roots：

  - 在虚拟机栈(栈帧的本地变量表)中所引用的对象，譬如各个线程被调用的方法堆栈中使用到的参数、局部变量、临时变量等。
  - 在方法区中类静态属性引用的对象，譬如 Java 类的引用静态变量。
  - 在方法区中常量引用的对象，譬如字符串常量池中的引用。
  - 在方法区栈中 JNI (譬如 Native 方法)引用的对象。
  - Java 虚拟机内部的引用，如基本数据类型对应的 Class 对象，一些常驻的异常对象(空指针异常、OOM 等)，还有类加载器。
  - 所有被 Synchronized 持有的对象。
  - 反应 Java 虚拟机内部情况的 JMXBean、JVMTI 中注册的回调本地代码缓存等。

- 临时 GC Roots：
  - 为什么会有临时的 GC Roots：目前的垃圾回收大部分都是分代收集和局部回收，如果只针对某一部分区域进行局部回收，那么就必须要考虑的当前区域的对象有可能正被其他区域的对象所引用，这时候就要将这部分关联的对象也添加到 GC Roots 中去来确保根可达算法的准确性。这种算法是利用了逆向思维，找到使用的对象，剩下的就是垃圾，也被称为"间接垃圾收集"。

#### 优缺点

- 优点
  - 无需对象维护 GC 元信息，开销小；单次扫描即可批量识别、回收对象，吞吐高
- 缺点
  - 多线程环境下对象间的引用关系随时在变化，为保证 GC Root 标记的准确性，需在不变化的 snapshot 中进行，会产生 Stop The World（以下简称 STW） 卡顿现象

## GC 算法

### 1、标记-清除算法（Mark-Sweep）

&emsp; 标记-清除算法分为“标记”和“清除”两个阶段：（应用于老年代）

1. 首先标记出所需要回收的对象；
2. 在标记完成后统一回收所有被标记的对象。

#### 优缺点

- 优点：
  - 实现简单；
- 缺点：
  - 标记过程需要扫描整个内存，效率低；标记清除后会产生大量不连续的内存碎片，导致以后在程序运行过程中需要分配较大对象时，无法找到足够的连续内存而不得不提前触发另一次垃圾收集动作。

![MarkSweep](/public/java/javaUnderlayer/gc/MarkSweep.png)

### 2、复制算法（Mark-Copy）

&emsp; 将可用的内存按容量划分为大小相等的两块，每次只使用其中的一块，当这一块内存用完了，就将还存活的对象复制到另一块内存上；然后再把已使用的内存空间一次性清理掉。每次对整个半区进行内存回收，避免内存碎片问题，只需移动堆顶指针，按顺序分配内存即可。应用于新生代。

#### 优缺点

- 优点：
  - 实现简单，运行高效。直接针对半区回收，无内存碎片问题；分配内存只需移动堆顶指针，高效顺序分配
- 缺点：
  - 将内存缩小为原来的一半，代价高；当对象存活率较高时需要进行较多的复制操作，效率降低。（复制耗时）

![MarkCopy](/public/java/javaUnderlayer/gc/MarkCopy.png)

### 3、标记-整理算法（Mark-Compact）

&emsp; 在标记-清除算法基础上做了改造（应用于老年代）

&emsp; 首先标记出所有需要回收的对象；标记完成后不直接对可回收对象进行清理，而是让所有存活的对象都向一端移动；并清理可回收的对象。这个过程叫做整理。

#### 优缺点

- 优点：
  - 改进了标记-清楚算法在内存被整理以后产生大量不连续内存碎片问题；改进了复制算法在对象存活率较高时带来的效率问题；
- 缺点：
  - 对象移动需 STW 同步更新引用关系，会增加延迟

### 4、分代收集算法

&emsp; 根据内存中对象的存活周期不同，将内存划分为新生代和老年代。当新创建对象一般在新生代中分配内存空间，新生代垃圾收集器回收几次以后仍然存活的对象会被移动到老年代内存中；当大对象在新生代中无法找到足够的连续内存时也直接在老年代中创建。不同的区域使用不用的垃圾收集算法。

- 新生代：
  - Eden 空间：采用标记整理算法；
  - Survivor 空间：采用复制算法；
- 老年代：
  - 采用标记清除或标记整理算法。

### GC 算法对比

- 执行效率：从算法的时间复杂度来看，复制算法最优，标记清除次之，标记整理最低
- 内存利用率：标记整理算法和标记清除算法较高，复制算法最差
- 内存整齐程度：复制算法和标记整理算法较整齐，标记清除算法最差

## GC 分类

### 1. YoungGC

&emsp; YoungGC，也称为 MinorGC，当 Eden 区满时，触发 MinorGC。

&emsp; 在 GC 前，Survivor-To 保持清空，对象保存在 Eden 和 Survivor-From 中；GC 运行时，Eden 中的存活的对象复制到 Survivor-To 中；Survivor-From 中的存活对象，会考虑对象年龄，如果年龄没达到阈值，对象复制到 Survivor-To 中；如果达到阈值，对象被复制到老年代。复制阶段完成后，Eden 和 Survivor-From 会被清空。如果在复制过程中，Survivor-To 被填满了，剩余的对象会被复制到老年代中。最后 Survivor-From 和 Survivor-To 会调换，下次 GC 时，Survivor-To 会变成 Survivor-From。

### 2. FullGC

&emsp; FullGC，也称为 MajorGC，主要针对老年代/永久代的垃圾收集。

&emsp; FullGCc 触发条件：

1. 老年代空间不足；
2. 方法区（永久代）空间不足；
3. 通过 MinorGC 后进入老年代的平均大小大于老年代的可用内存；
4. 由 Eden，Survivor-From 向 Survivor-To 复制时，对象大小大于 Survivor-To 可用内存，把对象转存到老年代，且老年代可用内存小于该对象大小。

## GC 收集器及工作区域图

![GcContact](/public/java/javaUnderlayer/gc/GcContact.png)

### 收集器分类

#### 1、串行收集器

&emsp; 为单线程 GC，内存不足触发 GC 后会暂停所有用户线程，适合 Client 模式的应用，适用于单处理器或者小数据量情况下的垃圾收集

- Serial：用于新生代垃圾收集，复制算法；单线程导致效率慢，但是消耗额外内存最小
- SerialOld：用于老年代垃圾收集，使用标记整理算法；
  ![SerialCollector](/public/java/javaUnderlayer/gc/SerialCollector.png)

#### 2、并行收集器

&emsp; 通过多线程运行垃圾收集，适合 Server 模式以及多 CPU 环境，适用于吞吐量优先场景。

- PerNewGC：新生代并行处理器，可以和 CMS GC 一起使用；线程数默认与核数相同，可配置
  ![PerNewGC](/public/java/javaUnderlayer/gc/PerNewGC.png)
- Parallel Scavenge：新生代并行处理器，多线程，并行收集。
- ParallelOld：老年代收集器，多线程，并行收集。
  ![Parallel&Old](/public/java/javaUnderlayer/gc/Parallel&Old.png)

#### 3、并发收集器

- ConcurrentMarkSweep，简称 CMS，即并发标记清除；执行 GC 任务的时候，GC 线程是和应用线程一起工作的，暂停应用时间最少的 Collector，适用于响应时间优先场景。 - 初始标记（initial mark）：STW 快速收集 GC Roots - 并发标记（concurrent mark）：从 GC Roots 出发检测引用链，标记可回收对象；与用户线程并发执行，通过增量更新来避免误回收 - 重新标记（remark）：STW 重新分析被增量更新所收集的 GC Roots - 并发清除（concurrent sweep）：并发清除可回收对象
  ![ConcurrentCollector](/public/java/javaUnderlayer/gc/ConcurrentCollector.png)

#### 4、G1（Garbage First）收集器

&emsp; 替代 CMS 的垃圾收集器，也是以关注响应时间为目标、服务器端应用的垃圾收集器，是并行，并发增量的底停顿的收集器

&emsp; G1 可以面向堆内存的任何空间来进行回收，衡量的标准也不再是根据年代来区分，而是哪块空间的垃圾最多就回收哪块儿空间

## 不需要进行 GC 优化的情况

1. Minor GC 执行的很快，小于 50ms；
2. Minor GC 执行的并不频繁，大概 10 秒一次；
3. Full GC 执行的很快，小于 1 秒；
4. Full GC 执行的并不频繁，如 10 分钟一次

## GC 优化方式

- YGC 频繁：可以通过增大新生代的大小，通过参数-Xmn 调整新生代分配值；
- YGC 耗时较长时：可以通过适当减小新生代的大小，通过参数-Xmn 调整新生代分配值；
- FGC 频繁时：
  - 如果 FGC 前后，Tenured 的使用值几乎无释放，且接近其分配值，说明 Tenured 的值设置小了；可通过减小新生代的大小或者增大堆的大小；
  - 对于 java1.8，如果 FGC 前后，Metaspace 的使用率越来越大，且 FGC 前后的值接近分配值，就需要增大 Metasize 的设定值的大小。
  - 对于 java1.8 以前的，FGC 前后，Pern 代的使用值不断增大，且 FGC 前后，接近 Perm 分配值，表明 Perm 的值设置小了
