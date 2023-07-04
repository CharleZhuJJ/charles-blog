# 进程，线程，线程池，调度

## 进程
### 1、进程的控制结构
#### 进程控制块（PCB，process control block）
&emsp;  PCB是进程存在的唯一标识，这意味一个进程一定会有对应的PCB，进程消失，PCB也会随之消失

- 进程描述信息：
    - 进程唯一的标记符，类似唯一id
    - 用户标识符，进程归属的用户，用户标识符主要为共享和保护服务
- 进程控制和管理信息：
    - 进程当前状态，比如运行、就绪、阻塞等，作为处理机分配调度的依据
    - 进程优先级，描述进程抢占处理机的优先级，优先级高的进程可以优先获得处理机
- 资源分配清单：
    - 用于说明有关内存地址空间或虚拟地址空间的状况，所打开文件的列表和所使用的输入/输出设备信息
- CPU 相关信息：
    - 指CPU中各寄存器值，当进程被切换时，CPU状态信息都必须保存在相应的PCB中，以便进程重新执行时，能再从断点继续执行。

##### PCB组成的队列

&emsp;  PCB通过链表的方式进行组织，把具有相同状态的进程链在一起，组成各种队列：
- 所有处于就绪状态的 进程 链在一起，称为就绪队列
- 把所有因等待某事件而处于等待状态的 进程 链在一起就组成各种阻塞队列
  
![pdbQueue](/public/java/javaOther/thread/PdbQueue.png)

### 2、进程的状态
#### 进程三态
&emsp;  进程的执行期间，至少具备三种基本状态，即运行态、就绪态、阻塞态。
![processStatus3](/public/java/javaOther/thread/ProcessStatus3.png)
##### 状态的意义
- 运行态（Runing）：时刻进程占用 CPU
- 就绪态（Ready）：可运行，但因为其他进程正在运行而暂停停止
- 阻塞状态（Blocked）：该进程等待某个事件（比如IO读取）停止运行，这时，即使给它CPU控制权，它也无法运行

##### 状态转换流程
- CPU 调度绪态进程执行，进入运行状态，时间片使用完了，回到就绪态，等待CPU调度
- CPU 调度绪态进程执行，进入运行状态，执行IO请求，进入阻塞态，IO请求完成，CPU收到 中断 信号，进入就绪态，等待 C P U 调度

#### 进程五态
&emsp;  在三态基础上，做一次细化，出现了另外两个基本状态，创建态和结束态。
![processStatus5](/public/java/javaOther/thread/ProcessStatus5.png)

##### 状态的意义
- 创建态（new）：进程正在被创建
- 就绪态（Ready）：可运行，但因为其他进程正在运行而暂停停止
- 运行态（Runing）：时刻进程占用 C P U
- 结束态（Exit）：进程正在从系统中消失时的状态
- 阻塞状态（Blocked）：该进程等待某个事件（比如IO读取）停止运行，这时，即使给它CPU控制权，它也无法运行

##### 状态的变迁
- NULL => 创建态（new）：一个新进程被创建时的第一个状态
- 创建态（new） => 就绪态（Ready）：当进程创建完成，进入就绪态
- 就绪态（Ready）=> 运行态（Runing）：C P U 从就绪队列选择进程执行，进入运行态
- 运行态（Runing）=> 结束态（Exit）：当进程已经运行完成或出错时，进入结束状
- 运行态（Runing） => 就绪态（Ready）：分配给进程的时间片使用完，进入就绪态
- 运行态（Runing） => 阻塞状态（Blocked）：进程执行等待事件，进入阻塞态
- 阻塞状态（Blocked） => 就绪态（Ready）：进程事件完成，C P U 收到 中断 信号 ，进入就绪态

#### 进程七态
&emsp;  其实进程还有一种状态叫挂起态，挂起态代表该进程不会占用内存空间，它会被换出到硬盘空间保存，当需要使用它的时候，会被换入，加载到内存，挂起态可以分为下面两种。
- 阻塞挂起状态：进程在外存（硬盘）并等待某个事件的出现
- 就绪挂起状态：进程在外存（硬盘），但只要进入内存，即刻立刻运行 

&emsp; 结合上述的两种挂起态，就组成了进程七态。
![processStatus7](/public/java/javaOther/thread/ProcessStatus7.png)

### 3、进程的上下文切换
&emsp;  CPU把一个进程切换到另一个进程运行的过程，称为进程上下文切换。

&emsp;  CPU上下文 是指 CPU 寄存器 和 程序计数器
- CPU 寄存器 是 CPU 内置的容量小，速度极快的缓存
- 程序计数器是用来存储 是 CPU 正在执行的指令位置或即将执行的下一条指令位置

&emsp;  CPU上下文切换就是把前一个任务的CPU上下文 保存起来，然后在加载当前任务的CPU上下文，最后再跳转到 程序计数器 所指的新位置，运行任务。

&emsp;  上面说到所谓的任务，主要包含进程、线程和中断。所以，可以根据任务的不同，把 CPU 上下文切换分成：进程上下文切换、线程上下文切换和中断上下文切换。

&emsp;  进程上下文切换的内容包含用户空间资源（虚拟内存、栈、全局变量等）与内核空间资源（内核堆栈、寄存器等）。

&emsp;  在做上下文切换的时候，会把前一个 进程 的上下文保存到它的PCB中，然后加载当前 进程 的PCB上下文到 CPU中，使得进程继续执行
![contextSwitch](/public/java/javaOther/thread/ContextSwitch.png)

#### 发生进程上下文切换的场景
- 为了保证所有进程可以得到公平调度，CPU 时间被划分为一段段的时间片，这些时间片再被轮流分配给各个进程。这样，当某个进程的时间片耗尽了，切换到其它正在等待 CPU 的进程运行
- 进程在系统资源不足（比如内存不足）时，要等到资源满足后才可以运行，这个时候进程也会被挂起，并由系统调度其他进程运行。
- 当进程通过睡眠函数 sleep 这样的方法将自己主动挂起时，自然也会重新调度。
- 当有优先级更高的进程运行时，为了保证高优先级进程的运行，当前进程会被挂起，由高优先级进程来运行
- 发生硬件中断时，CPU 上的进程会被中断挂起，转而执行内核中的中断服务程序。

## 线程
&emsp;  系统分配处理器时间资源的基本单元，或者说进程之内独立执行的一个单元执行流。线程——程序执行的最小单位。

&emsp;  进程是最小的资源分配单位，线程是最小的运行单位，一个进程下面能有一个或多个线程，每个线程都有独立一套的寄存器和栈，这样可以确保线程的控制流是相对独立的。
![thread](/public/java/javaOther/thread/Thread.png)

### 线程带来的好处
- 一个进程中可以同时存在多个线程
- 让进程具备多任务并行处理能力
- 同进程下的各个线程之间可以共享进程资源 （同进程内的多线程通信十分简单高效）
- 更轻量与高效

### 线程带来的坏处
- 因为进程资源共享，所以会产生资源竞争，需要通过锁机制来协同
- 当进程中的一个线程奔溃时，会导致其所属进程的所有线程奔溃（一般游戏的用户设计不会采用多线程方式）

### 线程与进程的对比
&emsp;  线程比进程不管是时间效率，还是空间效率都要高
- 进程是最小的资源（包括内存、打开的文件等）分配单位，线程是最小的运行单位
- 进程拥有一个完整的资源平台，而线程只独享必不可少的资源，如寄存器和栈
- 线程同样具有就绪、阻塞、执行三种基本状态，同样具有状态之间的转换关系（和进程大同小异）
- 线程的创建、终止时间比进程快，因为进程在创建的过程中，还需要资源管理信息，比如内存管理信息、文件管理信息，所以线程在创建的过程中，不会涉及这些资源管理信息，而是共享它们（线程管理的资源较少）
- 同一个进程内的线程切换比进程切换快，因为线程具有相同的地址空间（虚拟内存共享），这意味着同一个进程的线程都具有同一个页表，那么在切换的时候不需要切换页表。而对于进程之间的切换，切换的时候要把页表给切换掉，而页表的切换过程开销是比较大的
- 由于同一进程的各线程间共享内存和文件资源，那么在线程之间数据传递的时候，就不需要经过内核了，这就使得线程之间的数据交互效率更高了

### 线程的上下文切换
![threadContextSwitch](/public/java/javaOther/thread/ThreadContextSwitch.png)

&emsp;  当进程只有一个线程时，可以认为进程等于线程，线程上下文的切换分两种情况
- 不同进程的线程，切换的过程就跟进程上下文切换一样
- 两个线程是属于同一个进程，因为虚拟内存是共享的，所以在切换时，虚拟内存这些资源就保持不动，只需要切换线程的私有数据、寄存器等不共享的数据 
  
&emsp; 所以线程的上下文切换相比进程，开销要小很多。

### 异步和多线程
&emsp;  异步和多线程并不是一个同等关系,异步是最终目的,多线程只是我们实现异步的一种手段。异步是当一个调用请求发送给被调用者,而调用者不用等待其结果的返回而可以做其它的事情。实现异步可以采用多线程技术或则交给另外的进程来处理。

### 线程安全
- 多个线程访问同一个对象时，不用考虑这些线程在运行时环境下的调度和交替执行，也不需要进行额外的同步，或者在调用方进行任何其他操作，调用这个对象的行为都可以获得正确的结果，那么这个对象就是线程安全的。
- 一个类或者程序所提供的接口对于线程来说是原子操作或者多个线程之间的切换不会导致该接口的执行结果存在二义性，也就是说我们不用考虑同步的问题。
- 线程安全问题大多是由全局变量及静态变量引起的，局部变量逃逸也可能导致线程安全问题。
- 若每个线程中对全局变量、静态变量只有读操作，而无写操作，一般来说，这个全局变量是线程安全的；若有多个线程同时执行写操作，一般都需要考虑线程同步，否则的话就可能影响线程安全。

### 守护线程
&emsp;  默认情况下，java进程需要等待所有线程都运行结束，才会结束，有一种特殊线程叫守护线程，当所有的非守护线程都结束后，即使它没有执行完，也会强制结束。默认的线程都是非守护线程。垃圾回收线程就是典型的守护线程

### 线程的阻塞
- sleep()
  - 使线程休眠，会将运行中的线程进入阻塞状态。当休眠时间结束后，重新争抢cpu的时间片继续运行
- join()
  - join是指调用该方法的线程进入阻塞状态，等待某线程执行完成后恢复运行
  
## 线程池
&emsp;  预先创建好一些线程，任务提交时直接执行，既可以节约创建线程的时间，又可以控制线程的数量。

### 线程池例子
1. 客户到银行时，开启柜台进行办理，柜台相当于线程，客户相当于任务，有两个是常开的柜台，三个是临时柜台。2就是核心线程数，5是最大线程数。即有两个核心线程；
2. 当柜台开到第二个后，都还在处理业务。客户再来就到排队大厅排队。排队大厅只有三个座位。
3. 排队大厅坐满时，再来客户就继续开柜台处理，目前最大有三个临时柜台，也就是三个救急线程
4. 此时再来客户，就无法正常为其 提供业务，采用拒绝策略来处理它们
5. 当柜台处理完业务，就会从排队大厅取任务，当柜台隔一段空闲时间都取不到任务时，如果当前线程数大于核心线程数时，就会回收线程。即撤销该柜台。

### 线程池优势
- 降低资源消耗：线程池通常会维护一些线程（数量为 corePoolSize），这些线程被重复使用来执行不同的任务，任务完成后不会销毁。在待处理任务量很大的时候，通过对线程资源的复用，避免了线程的频繁创建与销毁，从而降低了系统资源消耗。
- 提高响应速度：由于线程池维护了一批 alive 状态的线程，当任务到达时，不需要再创建线程，而是直接由这些线程去执行任务，从而减少了任务的等待时间。
- 提高线程的可管理性：使用线程池可以对线程进行统一的分配，调优和监控。

### 线程池执行流程
![threadPool](/public/java/javaOther/thread/ThreadPool.png)

### Executors工具类
&emsp;  为我们创建一个线程池，其本质就是new了一个ThreadPoolExecutor对象。
```java
public ThreadPoolExecutor(
    int corePoolSize,  // 线程池的核心线程数，说白了就是，即便是线程池里没有任何任务，也会有corePoolSize个线程在候着等任务。
    int maximumPoolSize, // 最大线程数，不管你提交多少任务，线程池里最多工作线程数就是maximumPoolSize。
    long keepAliveTime,  // 线程的存活时间。当非核心线程处于空闲状态的时间超过这个时间后，该线程将被回收。
    TimeUnit unit,  // 这个用来指定keepAliveTime的单位，比如秒:TimeUnit.SECONDS。
    BlockingQueue<Runnable> workQueue,  // 一个阻塞队列，提交的任务将会被放到这个队列里。
    ThreadFactory threadFactory,  // （可选） 线程工厂，用来创建线程，主要是为了给线程起名字，默认工厂的线程名字：pool-1-thread-3。
    RejectedExecutionHandler handler // （可选）拒绝策略，当线程池里线程被耗尽，且队列也满了的时候会调用。
) {}
```
#### 参数关系
- 若当前线程池中线程数 < corePoolSize，则每来一个任务就创建一个线程去执行；
- 若当前线程池中线程数 >= corePoolSize，会尝试将任务添加到任务队列。如果添加成功，则任务会等待空闲线程将其取出并执行；
- 若队列已满，且当前线程池中线程数 < maximumPoolSize，创建新的线程；
- 若当前线程池中线程数 >= maximumPoolSize，则会采用拒绝策略（JDK提供了四种，下面会介绍到）

##### workQueue
&emsp;  参数workQueue是指提交但未执行的任务队列。若当前线程池中线程数>=corePoolSize时，就会尝试将任务添加到任务队列中。

&emsp;  主要有以下几种：
- SynchronousQueue：直接提交队列（同步队列）。SynchronousQueue没有容量，所以实际上提交的任务不会被添加到任务队列，总是将新任务提交给线程执行，如果没有空闲的线程，则尝试创建新的线程，如果线程数量已经达到最大值（maximumPoolSize），则执行拒绝策略。（这是一个内部没有任何容量的阻塞队列，任何一次插入操作的元素都要等待相对的删除/读取操作，否则进行插入操作的线程就要一直等待，反之亦然。）
- LinkedBlockingQueue：无界的任务队列。当有新的任务来到时，若系统的线程数小于corePoolSize，线程池会创建新的线程执行任务；当系统的线程数量等于corePoolSize后，因为是无界的任务队列，总是能成功将任务添加到任务队列中，所以线程数量不再增加。若任务创建的速度远大于任务处理的速度，无界队列会快速增长，直到内存耗尽。
- ArrayBlockingQueue： 有界队列，基于数组实现。在线程池初始化时，指定队列的容量，后续无法再调整。这种有界队列有利于防止资源耗尽，但可能更难调整和控制。

##### handler
&emsp;  JDK内置了四种拒绝策略：
- DiscardOldestPolicy策略：丢弃任务队列中最早添加的任务，并尝试提交当前任务；
- CallerRunsPolicy策略：调用主线程执行被拒绝的任务，这提供了一种简单的反馈控制机制，将降低新任务的提交速度。
- DiscardPolicy策略：默默丢弃无法处理的任务，不予任何处理。
- AbortPolicy策略（默认）：直接抛出异常（RejectedExecutionException），阻止系统正常工作。

#### Executors封装线程池
##### 1、newFixedThreadPool
&emsp;  定长线程池，其特点是最大线程数就是核心线程数，意味着线程池只能创建核心线程每当提交一个任务就创建一个线程，直到达到线程池的最大数量，这时线程数量不再变化，当线程发生错误结束时，线程池会补充一个新的线程；线程执行完任务立即回收。
```java
// 使用默认线程工厂
public static ExecutorService newFixedThreadPool(int nThreads) {
    return new ThreadPoolExecutor(nThreads, nThreads, 0L, TimeUnit.MILLISECONDS, new LinkedBlockingQueue<Runnable>());
}
// 需要自定义线程工厂
public static ExecutorService newFixedThreadPool(int nThreads, ThreadFactory threadFactory) {
    return new ThreadPoolExecutor(nThreads,nThreads,0L,TimeUnit.MILLISECONDS,
            new LinkedBlockingQueue<Runnable>(),threadFactory);
}
 
// 使用示例：
// 1. 创建线程池对象，设置核心线程和最大线程数为5
ExecutorService fixedThreadPool = Executors.newFixedThreadPool(5);
// 2. 创建Runnable（任务）
Runnable task =new Runnable(){
  public void run() {
     System.out.println(Thread.currentThread().getName() + "--->运行");
  }
};
// 3. 向线程池提交任务
fixedThreadPool.execute(task);    
```

##### 2、newCachedThreadPool
&emsp;  可缓存的线程池，没有核心线程，如果线程池的容量超过了任务数，自动回收空闲线程，任务增加时可以自动添加新线程，线程池的容量不限制；线程闲置60s后回收，任务队列使用SynchronousQueue这种无容量的同步队列。适用于任务量大但耗时低的场景。
```java
public static ExecutorService newCachedThreadPool() {
    return new ThreadPoolExecutor(0, Integer.MAX_VALUE, 60L, TimeUnit.SECONDS, new SynchronousQueue<Runnable>());
}
 
// 使用示例
// 1. 创建缓存线程池
ExecutorService cachedThreadPool = Executors.newCachedThreadPool();
// 2. 创建Runnable（任务）
Runnable task = new Runnable(){
  public void run() {
     System.out.println(Thread.currentThread().getName() + "--->运行");
  }
};
// 3. 向线程池提交任务
cachedThreadPool.execute(task);
```

##### 3、newScheduledThreadPool
&emsp;  定时线程池。指定核心线程数量，普通线程数量无限，线程执行完任务立即回收，任务队列为延时阻塞队列。适用于执行定时或周期性的任务。
```java
public static ScheduledExecutorService newScheduledThreadPool(int corePoolSize) {
    return new ScheduledThreadPoolExecutor(corePoolSize);
}
 
// 继承了 ThreadPoolExecutor
public class ScheduledThreadPoolExecutor extends ThreadPoolExecutor  implements ScheduledExecutorService {
    // 构造函数，省略了自定义线程工厂的构造函数
 public ScheduledThreadPoolExecutor(int corePoolSize) {
     super(corePoolSize, Integer.MAX_VALUE, 0, NANOSECONDS, new DelayedWorkQueue());
 }
 // 延时执行任务
 public ScheduledFuture<?> schedule(Runnable command, long delay, TimeUnit unit) {...}
 // 定时执行任务
 public ScheduledFuture<?> scheduleAtFixedRate(Runnable command, long initialDelay, long period, TimeUnit unit) {...}
}
 
// 使用示例
// 1. 创建定时线程池
ExecutorService scheduledThreadPool = Executors.newScheduledThreadPool(5);
// 2. 创建Runnable（任务）
Runnable task = new Runnable(){
  public void run() {
     System.out.println(Thread.currentThread().getName() + "--->运行");
  }
};
// 3. 向线程池提交任务
scheduledThreadPool.schedule(task, 2, TimeUnit.SECONDS); // 延迟2s后执行任务
scheduledThreadPool.scheduleAtFixedRate(task,50,2000,TimeUnit.MILLISECONDS);// 延迟50ms后、每隔2000ms执行任务
```

##### 4、newSingleThreadExecutor
&emsp;  单线程的线程池，特点是线程池中只有一个线程（核心线程），线程执行完任务立即回收，使用有界阻塞队列。线程异常结束，会创建一个新的线程，能确保任务按提交顺序执行；
```java
public static ExecutorService newSingleThreadExecutor() {
    return new FinalizableDelegatedExecutorService
        (new ThreadPoolExecutor(1, 1, 0L, TimeUnit.MILLISECONDS, new LinkedBlockingQueue<Runnable>()));
}
 
// 使用示例
// 1. 创建单线程线程池
ExecutorService singleThreadExecutor = Executors.newSingleThreadExecutor();
// 2. 创建Runnable（任务）
Runnable task = new Runnable(){
  public void run() {
     System.out.println(Thread.currentThread().getName() + "--->运行");
  }
};
// 3. 向线程池提交任务
singleThreadExecutor.execute(task);
```

##### 5、newSingleThreadScheduledExecutor
&emsp;  单线程可执行周期性任务的线程池；
```java
ScheduledExecutorService singleScheduledExecutor = Executors.newSingleThreadScheduledExecutor();
```

##### 6、newWorkStealingPool
&emsp;  任务窃取线程池，不保证执行顺序，适合任务耗时差异较大。线程池中有多个线程队列，有的线程队列中有大量的比较耗时的任务堆积，而有的线程队列却是空的，就存在有的线程处于饥饿状态，当一个线程处于饥饿状态时，它就会去其它的线程队列中窃取任务。解决饥饿导致的效率问题。

&emsp;  默认创建的并行 level 是 CPU 的核数。主线程结束，即使线程池有任务也会立即停止。
```java
ExecutorService workStealingExecutor = Executors.newWorkStealingPool();
```

#### ThreadPoolExecutor方法
##### 1、线程初始化
&emsp;  默认情况下，创建线程池之后，线程池中是没有线程的，需要提交任务之后才会创建线程。

&emsp;  在实际中如果需要线程池创建之后立即创建线程，可以通过以下两个方法办到：
- prestartCoreThread()：boolean prestartCoreThread()，初始化一个核心线程
- prestartAllCoreThreads()：int prestartAllCoreThreads()，初始化所有核心线程，并返回初始化的线程数

##### 2、线程池关闭
&emsp;  ThreadPoolExecutor提供了两个方法，用于线程池的关闭：
- shutdown()：不会立即终止线程池，而是要等所有任务缓存队列中的任务都执行完后才终止，但再也不会接受新的任务
- shutdownNow()：立即终止线程池，并尝试打断正在执行的任务，并且清空任务缓存队列，返回尚未执行的任务

##### 3、线程池容量调整
&emsp;  ThreadPoolExecutor提供了动态调整线程池容量大小的方法：
- setCorePoolSize：设置核心池大小
- setMaximumPoolSize：设置线程池最大能创建的线程数目大小

&emsp;  当上述参数从小变大时，ThreadPoolExecutor进行线程赋值，还可能立即创建新的线程来执行任务。

##### 4、使用线程池
```java
public static void main(String[] args) {
  // 创建线程池
  ThreadPoolExecutor threadPool = new ThreadPoolExecutor(3,5,5,TimeUnit.SECONDS,new ArrayBlockingQueue<Runnable>(5));
  // 向线程池提交任务
  for (int i = 0; i < threadPool.getCorePoolSize(); i++) {
       threadPool.execute(new Runnable() {
            @Override
            public void run() {
                for (int x = 0; x < 2; x++) {
                  System.out.println(Thread.currentThread().getName() + ":" + x);
                   try {
                       Thread.sleep(2000);
                   } catch (InterruptedException e) {
                       e.printStackTrace();
                   }
                }
            }
       });
  }
  // 关闭线程池
  threadPool.shutdown(); // 设置线程池的状态为SHUTDOWN，然后中断所有没有正在执行任务的线程
  // threadPool.shutdownNow(); // 设置线程池的状态为STOP，然后尝试停止所有的正在执行或暂停任务的线程，并返回等待执行任务的列表
 }
 ```

## 调度
### 调度原则
#### 1、CPU 利用率
&emsp;  运行程序发生了I/O 事件的请求，因此阻塞，导致进程在等待硬盘的数据返回。这样的过程，势必会造成 C P U 突然的空闲。所以为了提高 C P U 利用率，发生等待事件使 C P U 空闲的情况下，调度程序需要从就绪队列中选择一个进程来运行。（PS：调度程序应确保 C P U 一直保持匆忙的状态，可提高 C P U 的利用率）

#### 2、系统吞吐量
&emsp;  程序执行某个任务花费的时间会比较长，如果这个程序一直占用着 C P U，会造成系统吞吐量的降低。所以要提高系统的吞吐率，调度程序要权衡长任务和短任务进程的运行完成数量。（吞吐量表示的是单位时间内 C P U 完成进程的数量，长作业的进程会占用较长的 C P U 资源，因此会降低吞吐量，相反，短作业的进程会提升系统吞吐量）

#### 3、周转时间
&emsp;  从进程开始到结束的过程中，实际上是包含两个时间，分别是进程运行时间和进程等待时间，这两个时间总和就称为周转时间。进程的周转时间越小越好，如果进程的等待时间很长，而运行时间很短，那周转时间就很长，调度程序应该避免这种情况发生。（周转时间是进程运行和阻塞时间总和，一个进程的周转时间越小越好）

#### 4、等待时间
&emsp;  处于就绪队列的进程，也不能等太久，希望这个等待的时间越短越好，因为可以使进程更快的在 C P U 中执行。所以就绪队列中，进程的等待时间，也是调度程序所需要考虑的原则（这个等待时间不是阻塞状态的时间，而是进程处于就绪队列的时间，等待时间越长，用户越不满意）。

#### 5、响应时间
&emsp;  对于鼠标、键盘这种交互式比较强的应用，我们当然希望它的响应时间越快越好，否则就会影响用户体验了。所以，对于交互式比较强的应用，响应时间也是调度程序需要考虑的原则（ 用户提交请求到系统第一次产生响应所花费的时间，在交互式系统中，响应时间是衡量调度算法好坏的主要标准）。

### 调度算法
#### 1、先来先服务算法（First Come First Severd, FCFS）
&emsp;  先来先服务算法简称 F C F S，顾名思义，谁先来，谁先被 C P U 执行，后到的就乖乖排队等待，十分简单的算法，C P U每次调度 就绪队列 的第一个进程，直到进程退出或阻塞，才会把该进程入队到队尾，然后接着继续调度第一个进程，依此类推。
![FCFS](/public/java/javaOther/thread/FCFS.png)
- FCFS算法看似很公平，但是当一个长作业先运行了，后面的短作业等待的时间就会很长，所以不利于短作业，会降低系统吞吐量。
- FCFS对长作业有利，适用于 C P U 繁忙型作业的系统，而不适用于 I/O 繁忙型作业的系统。

#### 2、最短作业优先算法（Shortest Job First, SJF）
&emsp;  优先选择运行时间最短的进程，有助于提高系统吞吐量。但是对长作业不利，所以很容易造成一种极端现象。比如，一个 长作业 在就绪队列等待运行，而这个就绪队列有非常多的短作业，最终使得 长作业 不断的往后推，周转时间变长，致使长作业长期不会被运行（适用于 I/O 繁忙型作业的系统）。
![SJF](/public/java/javaOther/thread/SJF.png)

#### 3、3、高响应比优先算法 （Highest Response Ratio Next, HRRN）
&emsp;  因为前面的先进先出算法和最短作业优先算法都没有很好的权衡短作业和长作业，所以高响应比优先算法主要是权衡了短作业和长作业。

&emsp;  每次进行进程调度时，先计算响应比优先权，然后把响应比优先权最高的进程投入运行。
![HRRN](/public/java/javaOther/thread/HRRN.png)
&emsp;  如果两个进程的等待时间相同时，要求的服务时间越短，优先权就越高，这样短作业的进程容易被选中运行（如果等待时间较短，进程的运行时间越短，优先权就会越高 => 等待时间较短的短作业进程）

&emsp;  如果两个进程要求的服务时间相同时，等待时间越长，优先权就越高，这就兼顾到了长作业进程，因为进程的响应比可以随时间等待的增加而提高，当其等待时间足够长时，其响应比便可以升到很高，从而获得运行的机会（如果要求服务时间比较长，进程的等待时间越长，优先权就会越高 => 等待时间较长的长作业进程）

#### 4、时间片轮转（Round Robin, RR）算法
&emsp;  时间片轮转是最古老、最简单、最公平且使用最广的算法，给每个进程分配相同时间片（Quantum），允许进程在该时间段中运行。
![RR](/public/java/javaOther/thread/RR.png)
- 如果时间片用完，进程还在运行，将会把此进程放入就绪队列，并继续调度另外一个进程，依此类推
- 如果该进程在时间片结束前阻塞或结束，则调度另外一个进程
- 进程时间片用完，需要被重新分配时间片

&emsp;  需要注意的是，如果时间片设置的太短，会导致CPU上下文切换态频繁，太长又可能引起对短作业进程的响应时间变长，所以时间片设为 20ms~50ms 通常是一个比较合理的折中值

#### 5、最高优先级（Highest Priority First，HPF）算法
&emsp;  前面的时间片轮转算法让所有的进程同等重要，不偏袒谁，大家的运行时间都一样。但是，对于多用户计算机系统就有不同的看法了，它们希望调度是有优先级的，希望调度程序能从就绪队列中选择最高优先级的进程运行，这就是最高优先级（Highest Priority First，HPF）算法。

&emsp;  进程的优先级可以分为：
- 静态优先级：创建进程时候，已经确定优先级，整个运行时间优先级都不会变化
- 动态优先级：根据进程的动态变化调整优先级，比如进程运行时间增加，则降低其优先级，如果进程等待时间（就绪队列的等待时间）增加，则提高优先级。

&emsp;  有两种处理优先级高的方法：
- 非抢占式：当就绪队列中出现优先级高的进程，运行完当前进程，再选择优先级高的进程。
- 抢占式：当就绪队列中出现优先级高的进程，当前进程挂起，调度优先级高的进程运行。

&emsp;  但是依然有缺点，可能会导致低优先级的进程永远不会运行。

#### 6、多级反馈队列（Multilevel Feedback Queue）算法
&emsp;  多级反馈队列（Multilevel Feedback Queue）算法 是基于时间片轮转算法和最高优先级算法演进而来，如同它的名字一样，根据优先级分组成多个队列，在算法中涉及两个概念：
- 多级：表示有多个队列，每个队列优先级从高到低，优先级越高的队列拥有的时间片越短
- 反馈：表示有新的进程进入优先级高的队列时，停止当前运行进程，去运行优先级高的队列
![MFQ](/public/java/javaOther/thread/MFQ.png)

&emsp;  工作流程：

- 多个队列，赋予每个队列不同的优先级，每个队列优先级从高到低，同时优先级越高时间片越短
- 新进的 进程 会被放入 第一级队列 尾部，按先来先服务的原则排队等待被调度，如果第一级队列时间片用完，还有进程没有执行，把第一级队列剩余的进程 放入 第二级队列的尾部，依此类推
- 当优先级高队列为空，正在运行低优先级队列的进程时，有新进程 进入 高优先级队列，这时立即停止当前运行进程，把当前进程放入 原队列 尾部，转而去 运行 高优先级队列的进程。

&emsp;  可以发现，对于短作业可能可以在第一级队列很快被处理完。对于长作业，如果在第一级队列处理不完，可以移入下次队列等待被执行，虽然等待的时间变长了，但是运行时间也会更长了，很好的兼顾了长短作业，同时有较好的响应时间。