# JVM

&emsp; JVM是Java Virtual Machine（Java虚拟机）的缩写，是一个虚构出来的计算机，是通过在实际的计算机上仿真模拟计算机功能来实现的，JVM屏蔽了与具体操作系统平台相关的信息，Java程序只需生成在Java虚拟机上运行的字节码，就可以在多种平台上不加修改的运行。JVM在执行字节码时，实际上最终还是把字节码解释成具体平台上的机器指令执行。

## Java8内存结构图
![MemorySructure](/public/java/javaUnderlayer/jvm/MemorySructure.png)

## 堆内存
&emsp; JVM内存中最大的一块。此内存区域存放对象实例及数组，几乎所有的对象实例都在这里分配内存；

&emsp; Java堆是垃圾收集器（GC）管理的主要区域，所以也称为“GC堆”。由于现在收集器基本上都采用分代收集算法，堆被划分为新生代（年轻代）和老年代。

&emsp; 新生代：程序新建对象一般是从该区域分配内存的，新生代是GC收集垃圾的频繁区域。新生代内存区域被划分成三部分：Eden空间、相等的两块Survivor空间（From（S0）和 To（S1））空间，默认情况下按照8：1：1的比例来分配。

&emsp; 一般情况下，新创建的对象都会被分配到Eden区(一些大对象特殊处理)，这些对象经过第一次Minor GC后，如果仍然存活，并且能够被另一块Survivor区域所容纳，则使用复制算法将这些还存活的对象复制到另一块Survivor区域中，然后清理所使用过的Eden以及Survivor区域，并且将这些对象的年龄+1。对象在Survivor区中每熬过一次Minor GC，年龄就会增加1岁，当它的年龄增加到设定的参数值时，就会被移动到年老代中。

&emsp; 老年代：一般都是长生命周期的对象。对于一些较大的对象（即需要分配一块较大的连续内存空间）则直接进入到老年代。可通过启动参数设置来代表超过多大时就不在新生代分配（-XX:PretenureSizeThreshold =1024，单位为字节，默认为0）
![HeapMemory](/public/java/javaUnderlayer/jvm/HeapMemory.png)

## 方法区
&emsp; 存储类信息， 常量，静态变量，编译器编译后的代码等数据。

&emsp; 存储被 JVM 加载的类信息（字段、成员方法的字节码指令等）、运行时常量池（字面量、符号引用等）、JIT 编译后的 Code Cache 等信息；

## 栈
&emsp; 分为Java虚拟机栈和本地方法栈，主要用于方法的执行。

&emsp; JVM栈：线程私有的，生命周期与线程相同。虚拟机栈表述的是Java方法执行的内容模型：每个方法被执行的时候都会同时创建一个栈帧，用于存储局部变量表、操作栈、动态链接、方法出口等信息。每一个方法被调用直至执行完成的过程，就对应着一个栈帧在虚拟机中从入栈到出栈的过程。

## 程序计数器
&emsp; 用于标记当前线程所执行的字节码的信号指示器（存放下一条指令所在单元的地址的地方）。每个线程都有一个程序计数器，就是一个指针，指向方法区的方法，由执行引擎读取下一条指令。

## 参数内存区域图
![ParameterMemory](/public/java/javaUnderlayer/jvm/ParameterMemory.png)
### JVM通用参数设置
1. -Xms 初始堆的大小
2. -Xmx 最大堆的大小
    - Xms和Xms最好设置为一样，减轻伸缩堆大小带来的压力
3. -Xmn设置新生代的大小
    - -XX:NewSize=n: 设置新生代初始大小；
    - -XX:MaxNewSize=n: 设置新生代最大空间的大小
    - 一般NewSize和MaxNewSize值设为相同，较少运行期间内存申请的开销。
4. -XX:PremSize=n: 设置永久代最小空间的大小（java8以前）
5. -XX:MaxPremSize=n: 设置永久代最大空间的大小（java8以前）
    - PremSize和MaxPremSize最好设置一样大，减轻伸缩大小带来的压力
6. -XX:MetasapceSize=n 设置元数据的大小（java8以后）
7. -XX:MaxMetaspace=n 设置最大元数据的大小（java8以后）
8. -Xss 设置每个线程的栈大小，Java1.5以后默认值为1024K
9. -XX:NewRatio=n:设置新生代和老年代的比值。
    - 如设置为3，表示新生代与老年代比值为1：3，年轻代占整个年轻代老年代的1/4
10. -XX:SurvivorRatio=n:新生代中Eden区与其中一个Survivor区的比值。
    - 因为Survivor区有两个，若该值设置为3，表示Eden:Survivor=3:2，两个Survivor区占整个年轻代的1/5

#### 参数说明
- 以-X开头的都是非标准的，这些参数并不能保证在所有的JVM上都被实现；
- 以-XX开头的都是不稳定的并且不推荐在生产环境中使用的。

## 评价JVM的重要指标
1. 最大停顿时间：GC期间应用程序停止的持续时间；
2. 吞吐量（Throughput）：GC的花费时间和程序运行时间占比进行度量；
3. 最大内存占用大小：如果最大停顿时间和吞吐量都满足目标，GC会降低堆的大小直到吞吐量和最大停顿时间其中一个目标不能满足为止。

## jvm监控命令
### 1、jinfo
&emsp; 查看JVM配置信息；获取运行中的java进程的配置信息，VM参数信息。
```shell
jinfo [-opt] <pid>
```

### 2、jmap
&emsp; 查看堆（heap）配置及使用情况
```shell
jmap -heap <pid>
```

### 3、jstat
&emsp; 查看GC情况；用于监控java应用程序的资源、实时性能等，包括了堆内存的使用、GC的监控
```shell
-- 监控GC信息，interval：输出时间间隔（毫秒），count：输出次数
jstat -gcutil <pid> <interval> <count> 
```

### 4、jstack
&emsp; 查看线程状态信息；用于分析线程的堆栈状态信息，尤其可用于死锁检测。
```shell
-- 输出线程状态信息到文件
jstack [-l] <pid> > filename
-- 例子
jstack -l 1115 > thread.txt
```
&emsp; 使用IBM的jca457.jar工具打开线程状态信息文件，分析线程的运行状态情况。

### 5、jmap
内存dump信息；可以输出所有内存中的对象。可以将JVM中的heap，以二进制输出成文本。
```shell
-- 获取内存dump到文件
jmap -dump:live,format=b,file=heap.bin <pid>
```

### dump分析工具
- jhat
- ha456.jar（Heap Analyzer)
- Eclipse MAT（Memory Analyzer）

## JVM调优
### 1、cpu占用过高
- 1.1、用top命令查看cpu占用情况
![Top](/public/java/javaUnderlayer/jvm/Top.png)

- 1.2、用top -Hp命令查看线程的情况：（查看具体哪个线程一直占用CPU，如图显示为7287线程）
![TopHp](/public/java/javaUnderlayer/jvm/TopHp.png)

- 1.3、把线程号转换为16进制
```shell
# 把线程号转换为16进制
[root@localhost ~]# printf "%x" 7287
1c77
```

- 1.4、用jstack工具查看线程栈情况
![Jstack](/public/java/javaUnderlayer/jvm/Jstack.png)
&emsp; 通过jstack工具输出现在的线程栈，再通过grep命令结合上一步拿到的线程16进制的id定位到这个线程的运行情况，其中jstack后面的7268是第（1）步定位到的进程号，grep后面的是（2）、（3）步定位到的线程号。从输出结果可以看到这个线程处于运行状态，在执行com.spareyaya.jvm.service.EndlessLoopService.service 这个方法，代码行号是19行，这样就可以去到代码的19行，找到其所在的代码块，看看是不是处于循环中，这样就定位到了问题。

### 2、死锁
- 2.1、jps查看java进程
![Jps](/public/java/javaUnderlayer/jvm/Jps.png)

- 2.2、jstack查看死锁问题
&emsp; jstack最大的好处就是会把产生死锁的信息（包含是什么线程产生的）输出到最后，所以我们只需要看最后的内容就行了
![JstackLock](/public/java/javaUnderlayer/jvm/JstackLock.png)

### 3、内存泄漏
&emsp; 内存泄漏的另一个可能的表现是请求的响应时间变长了。这是因为频繁发生的GC会暂停其它所有线程（Stop The World）造成的。
#### 方法一
- 3.1、加上运行参数-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=heap.bin，意思是发生OOM时把堆内存信息dump出来。
- 3.2、得到heap.dump文件，然后我们借助eclipse的MAT插件来分析
- 3.3、File->Open Heap Dump... ，然后选择刚才dump出来的文件，选择Leak Suspects
![Mat](/public/java/javaUnderlayer/jvm/Mat.png)
- 3.4、MAT会列出所有可能发生内存泄漏的对象：可以看到居然有21260个Thread对象，3386个ThreadPoolExecutor对象
![MatLeak](/public/java/javaUnderlayer/jvm/MatLeak.png)

#### 方法二
- 3.1、用jps定位到进程号
- 3.2、用jstat分析gc活动情况
```shell
# 输出gc的情况，输出时间，每8行输出一个行头信息，统计的进程号是24836，每1000毫秒输出一次信息。
jstat -gcutil -t -h8 24836 1000
Timestamp         S0     S1     E      O      M     CCS    YGC     YGCT    FGC    FGCT     GCT
    29.1        32.81   0.00  23.48  85.92  92.84  84.13    14     0.339    0    0.000    0.339
    30.1        32.81   0.00  78.12  85.92  92.84  84.13    14     0.339    0    0.000    0.339
    31.1         0.00   0.00  22.70  91.74  92.72  83.71    15     0.389    1    0.233    0.622

Timestamp是距离jvm启动的时间;
S0、S1、E是新生代的两个Survivor和Eden;
O是老年代区;
M是Metaspace;
CCS使用压缩比例;
YGC和YGCT分别是新生代gc的次数和时间;
FGC和FGCT分别是老年代gc的次数和时间;
GCT是gc的总时间;
虽然发生了gc，但是老年代内存占用率根本没下降，说明有的对象没法被回收（当然也不排除这些对象真的是有用）
```
- 3.3、用jmap工具dump出内存快照
&emsp; jmap可以把指定java进程的内存快照dump出来，效果和第一种处理办法一样，不同的是它不用等OOM就可以做到，而且dump出来的快照也会小很多。
```shell
jmap -dump:live,format=b,file=heap.bin 24836
```
&emsp; 这时会得到heap.bin的内存快照文件，然后就可以用eclipse来分析了。
