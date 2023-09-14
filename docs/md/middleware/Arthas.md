---
title: Arthas
author: Charles Chu
date: 2021/05/01
isOriginal: true
---

# Arthas  <Badge text="持续更新" type="warning" />

&emsp; Arthas 是一款线上监控诊断产品，通过全局视角实时查看应用 load、内存、gc、线程的状态信息，并能在不修改应用代码的情况下，对业务问题进行诊断，包括查看方法调用的出入参、异常，监测方法执行耗时，类加载信息等，大大提升线上问题排查效率。

## 命令
### dashboard
&emsp; 命令可以查看当前系统的实时数据面板。
```shell
$ dashboard
ID   NAME                           GROUP           PRIORITY   STATE     %CPU      DELTA_TIME TIME      INTERRUPTE DAEMON
-1   C2 CompilerThread0             -               -1         -         1.55      0.077      0:8.684   false      true
53   Timer-for-arthas-dashboard-07b system          5          RUNNABLE  0.08      0.004      0:0.004   false      true
22   scheduling-1                   main            5          TIMED_WAI 0.06      0.003      0:0.287   false      false
-1   C1 CompilerThread0             -               -1         -         0.06      0.003      0:2.171   false      true
-1   VM Periodic Task Thread        -               -1         -         0.03      0.001      0:0.092   false      true
49   arthas-NettyHttpTelnetBootstra system          5          RUNNABLE  0.02      0.001      0:0.156   false      true
16   Catalina-utility-1             main            1          TIMED_WAI 0.0       0.000      0:0.029   false      false
-1   G1 Young RemSet Sampling       -               -1         -         0.0       0.000      0:0.019   false      true
17   Catalina-utility-2             main            1          WAITING   0.0       0.000      0:0.025   false      false
34   http-nio-8080-ClientPoller     main            5          RUNNABLE  0.0       0.000      0:0.016   false      true
23   http-nio-8080-BlockPoller      main            5          RUNNABLE  0.0       0.000      0:0.011   false      true
-1   VM Thread                      -               -1         -         0.0       0.000      0:0.032   false      true
-1   Service Thread                 -               -1         -         0.0       0.000      0:0.006   false      true
-1   GC Thread#5                    -               -1         -         0.0       0.000      0:0.043   false      true
Memory                     used     total    max      usage    GC
heap                       36M      70M      4096M    0.90%    gc.g1_young_generation.count   12
g1_eden_space              6M       18M      -1       33.33%                                  86
g1_old_gen                 30M      50M      4096M    0.74%    gc.g1_old_generation.count     0
g1_survivor_space          491K     2048K    -1       24.01%   gc.g1_old_generation.time(ms)  0
nonheap                    66M      69M      -1       96.56%
codeheap_'non-nmethods'    1M       2M       5M       22.39%
metaspace                  46M      47M      -1       98.01%
Runtime
os.name                                                        Mac OS X
os.version                                                     10.15.4
java.version                                                   15
java.home                                                      /Library/Java/JavaVirtualMachines/jdk-15.jdk/Contents/Home
systemload.average                                             10.68
processors                                                     8
uptime                                                         272s
```
- ID: Java级别的线程ID，注意这个ID不能跟jstack中的nativeID一一对应。
- NAME: 线程名
- GROUP: 线程组名
- PRIORITY: 线程优先级, 1~10之间的数字，越大表示优先级越高
- STATE: 线程的状态
- CPU%: 线程的cpu使用率。比如采样间隔1000ms，某个线程的增量cpu时间为100ms，则cpu使用率=100/1000=10%
- DELTA_TIME: 上次采样之后线程运行增量CPU时间，数据格式为秒
- TIME: 线程运行总CPU时间，数据格式为分:秒
- INTERRUPTED: 线程当前的中断位状态
- DAEMON: 是否是daemon线程

### thread
&emsp; 查看当前线程信息，查看线程的堆栈。

参数名称 | 参数说明
-- | --
id |  线程id，显示指定线程的运行堆栈
[n:] | 指定最忙的前N个线程并打印堆栈
[b]  | 找出当前阻塞其他线程的线程，目前只支持找出synchronized关键字阻塞住的线程， 如果是java.util.concurrent.Lock， 目前还不支持。
[i ] | 指定cpu占比统计的采样间隔，单位为毫秒
[--all] | 显示所有匹配的线程
[--state] | 查看指定状态的线程；如thread --state WAITING

#### 工作原理说明
- 首先第一次采样，获取所有线程的 CPU 时间(调用的是java.lang.management.ThreadMXBean#getThreadCpuTime()及sun.management.HotspotThreadMBean.getInternalThreadCpuTimes()接口)
- 然后睡眠等待一个间隔时间（默认为 200ms，可以通过-i指定间隔时间）
- 再次第二次采样，获取所有线程的 CPU 时间，对比两次采样数据，计算出每个线程的增量 CPU 时间
- 线程 CPU 使用率 = 线程增量 CPU 时间 / 采样间隔时间 * 100%

```shell
$ thread -n 3
"C1 CompilerThread0" [Internal] cpuUsage=1.63% deltaTime=3ms time=1170ms


"arthas-command-execute" Id=23 cpuUsage=0.11% deltaTime=0ms time=401ms RUNNABLE
    at java.management@11.0.7/sun.management.ThreadImpl.dumpThreads0(Native Method)
    at java.management@11.0.7/sun.management.ThreadImpl.getThreadInfo(ThreadImpl.java:466)
    at com.taobao.arthas.core.command.monitor200.ThreadCommand.processTopBusyThreads(ThreadCommand.java:199)
    at com.taobao.arthas.core.command.monitor200.ThreadCommand.process(ThreadCommand.java:122)
    at com.taobao.arthas.core.shell.command.impl.AnnotatedCommandImpl.process(AnnotatedCommandImpl.java:82)
    at com.taobao.arthas.core.shell.command.impl.AnnotatedCommandImpl.access$100(AnnotatedCommandImpl.java:18)
    at com.taobao.arthas.core.shell.command.impl.AnnotatedCommandImpl$ProcessHandler.handle(AnnotatedCommandImpl.java:111)
    at com.taobao.arthas.core.shell.command.impl.AnnotatedCommandImpl$ProcessHandler.handle(AnnotatedCommandImpl.java:108)
    at com.taobao.arthas.core.shell.system.impl.ProcessImpl$CommandProcessTask.run(ProcessImpl.java:385)
    at java.base@11.0.7/java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:515)
    at java.base@11.0.7/java.util.concurrent.FutureTask.run(FutureTask.java:264)
    at java.base@11.0.7/java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.run(ScheduledThreadPoolExecutor.java:304)
    at java.base@11.0.7/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1128)
    at java.base@11.0.7/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:628)
    at java.base@11.0.7/java.lang.Thread.run(Thread.java:834)


"VM Periodic Task Thread" [Internal] cpuUsage=0.07% deltaTime=0ms time=584ms
```
- cpuUsage为采样间隔时间内线程的CPU使用率，与dashboard命令的数据一致。
- deltaTime为采样间隔时间内线程的增量CPU时间，小于1ms时被取整显示为0ms。
- time 线程运行总CPU时间。

### jvm
&emsp; 查看当前JVM信息
#### THREAD相关
- COUNT: JVM当前活跃的线程数
- DAEMON-COUNT: JVM当前活跃的守护线程数
- PEAK-COUNT: 从JVM启动开始曾经活着的最大线程数
- STARTED-COUNT: 从JVM启动开始总共启动过的线程次数
- DEADLOCK-COUNT: JVM当前死锁的线程数
#### 文件描述符相关
- MAX-FILE-DESCRIPTOR-COUNT：JVM进程最大可以打开的文件描述符数
- OPEN-FILE-DESCRIPTOR-COUNT：JVM当前打开的文件描述符数

### sysprop
&emsp; 查看当前JVM的系统属性(System Property)

&emsp; 使用方式和map类似，sysprop key 得到 value值

### sysenv
&emsp; 查看当前JVM的环境属性(System Property)，与sysprop类似

### vmoption
&emsp; 查看，更新VM诊断相关的参数

### perfcounter
&emsp; 查看当前JVM的 Perf Counter信息
```shell
$ perfcounter
 java.ci.totalTime                            2325637411
 java.cls.loadedClasses                       3403
 java.cls.sharedLoadedClasses                 0
 java.cls.sharedUnloadedClasses               0
 java.cls.unloadedClasses                     0
 java.property.java.version                   11.0.4
 java.property.java.vm.info                   mixed mode
 java.property.java.vm.name                   OpenJDK 64-Bit Server VM
...
```

### logger
&emsp; 查看logger信息，更新logger level

#### 查看logger信息
```shell
[arthas@2062]$ logger
 name                                   ROOT
 class                                  ch.qos.logback.classic.Logger
 classLoader                            sun.misc.Launcher$AppClassLoader@2a139a55
 classLoaderHash                        2a139a55
 level                                  INFO
 effectiveLevel                         INFO
 additivity                             true
 codeSource                             file:/Users/hengyunabc/.m2/repository/ch/qos/logback/logback-classic/1.2.3/logback-classic-1.2.3.jar
 appenders                              name            CONSOLE
                                        class           ch.qos.logback.core.ConsoleAppender
                                        classLoader     sun.misc.Launcher$AppClassLoader@2a139a55
                                        classLoaderHash 2a139a55
                                        target          System.out
                                        name            APPLICATION
                                        class           ch.qos.logback.core.rolling.RollingFileAppender
                                        classLoader     sun.misc.Launcher$AppClassLoader@2a139a55
                                        classLoaderHash 2a139a55
                                        file            app.log
                                        name            ASYNC
                                        class           ch.qos.logback.classic.AsyncAppender
                                        classLoader     sun.misc.Launcher$AppClassLoader@2a139a55
                                        classLoaderHash 2a139a55
                                        appenderRef     [APPLICATION]

```

#### 更新logger level
```shell
logger --name ROOT --level debug
```

### getstatic
&emsp; 查看类的静态属性

&emsp; 使用方法为`getstatic class_name field_name`

### Ognl
&emsp; 可以动态执行代码。
- params：参数，数组形式，可以通过param[0]获取第一个参数；
- returnObj：返回值
- target：当前对象
- throwExp：异常信息

### sc
&emsp; 查看JVM已加载的类信息，“Search-Class” 的简写，这个命令能搜索出所有已经加载到 JVM 中的 Class 信息
参数名称 | 参数说明
-- | -- 
class-pattern | 类名表达式匹配
method-pattern | 方法名表达式匹配
[d] | 输出当前类的详细信息，包括这个类所加载的原始文件来源、类的声明、加载的ClassLoader等详细信息。如果一个类被多个ClassLoader所加载，则会出现多次
[E] | 开启正则表达式匹配，默认为通配符匹配
[f] | 输出当前类的成员变量信息（需要配合参数-d一起使用）
[x:] | 指定输出静态变量时属性的遍历深度，默认为 0，即直接使用 toString 输出
[c:] | 指定class的 ClassLoader 的 hashcode
[classLoaderClass:] | 指定执行表达式的 ClassLoader 的 class name
[n:] | 具有详细信息的匹配类的最大数量（默认为100）

### sm
&emsp; 查看已加载类的方法信息，“Search-Method” 的简写，这个命令能搜索出所有已经加载了 Class 信息的方法信息。

&emsp; sm 命令只能看到由当前类所声明 (declaring) 的方法，父类则无法看到。
参数名称 | 参数说明
-- | --
class-pattern | 类名表达式匹配
method-pattern | 方法名表达式匹配
[d] | 展示每个方法的详细信息
[E] | 开启正则表达式匹配，默认为通配符匹配
[c:] | 指定class的 ClassLoader 的 hashcode
[classLoaderClass:] | 指定执行表达式的 ClassLoader 的 class name
[n:] | 具有详细信息的匹配类的最大数量（默认为100）

### jad
&emsp; 反编译指定已加载类的源码；jad 命令将 JVM 中实际运行的 class 的 byte code 反编译成 java 代码，便于你理解业务逻辑；

&emsp; 在 Arthas Console 上，反编译出来的源码是带语法高亮的，阅读更方便

&emsp; 当然，反编译出来的 java 代码可能会存在语法错误，但不影响你进行阅读理解
参数名称 | 参数说明
-- | --
class-pattern | 类名表达式匹配
[c:] | 类所属 ClassLoader 的 hashcode
[classLoaderClass:] | 指定执行表达式的 ClassLoader 的 class name
[E] | 开启正则表达式匹配，默认为通配符匹配

#### 反编译时只显示源代码
&emsp; 默认情况下，反编译结果里会带有ClassLoader信息，通过--source-only选项，可以只打印源代码。方便和mc/redefine命令结合使用。
`jad --source-only java.lang.String`

#### 反编译指定的函数
&emsp; 加上指定的函数名
`jad java.lang.String toString`

### mc
&emsp; Memory Compiler/内存编译器，编译.java文件生成.class。

### retransform
&emsp; 加载外部的.class文件，retransform jvm已加载的类。
- 查看 retransform entry：retransform -l
- 删除指定 retransform entry：retransform -d  id
- 删除所有 retransform entry：retransform --deleteAll

### redefine
&emsp; 加载外部的.class文件，redefine jvm已加载的类。

&emsp; redefine的class不能修改、添加、删除类的field和method，包括方法参数、方法名称及返回值

### dump
&emsp; dump 已加载类的 bytecode 到特定目录

&emsp; 程序在计算机中运行时，在内存、CPU、I/O等设备上的数据都是动态的（或者说是易失的），也就是说数据使用完或者发生异常就会丢掉。如果我想得到某些时刻的数据（有可能是调试程序Bug或者收集某些信息），就要把他转储（dump）为静态（如文件）的形式。否则，这些数据你永远都拿不到。

### classloader
&emsp; 查看classloader的继承树，urls，类加载信息

&emsp; classloader 命令将 JVM 中所有的classloader的信息统计出来，并可以展示继承树，urls等。
1. 显示所有类加载器的信息；
2. 获取某个类加载器所在的jar包；
3. 获取某个资源在哪个jar包中；
4. 加载某个类；

### monitor
&emsp; 对方法执行监控

&emsp; monitor 命令是一个非实时返回命令.

&emsp; 实时返回命令是输入之后立即返回，而非实时返回的命令，则是不断的等待目标 Java 进程返回信息，直到用户输入 Ctrl+C 为止。

&emsp; 方法拥有一个命名参数 [c:]，意思是统计周期（cycle of output），拥有一个整型的参数值，默认值为120秒

### watch
&emsp; 方法执行数据观测，观察指定方法的调用情况

&emsp; 能观察到的范围为：返回值、抛出异常、入参，通过编写 OGNL 表达式进行对应变量的查看。
参数名称 | 参数说明
-- | -- 
class-pattern | 类名表达式匹配
method-pattern | 方法名表达式匹配
express | 观察表达式
condition-express | 条件表达式
[b] | 在方法调用之前观察
[e] | 在方法异常之后观察
[s] | 在方法返回之后观察
[f] | 在方法结束之后(正常返回和异常返回)观察
[E] | 开启正则表达式匹配，默认为通配符匹配
[x:] | 指定输出结果的属性遍历深度，默认为 1

```shell
# 例子
watch demo.MathGame primeFactors "{params,target,returnObj}" -x 2 -b -s -n 2
-x 2：指定输出结果的属性遍历深度；
-n 2：表示只执行两次；
# 这里输出结果中，第一次输出的是方法调用前的观察表达式的结果，第二次输出的是方法返回后的表达式的结果
# 结果的输出顺序和事件发生的先后顺序一致，和命令中 -s -b 的顺序无关
```

### trace
&emsp; 方法内部调用路径，并输出方法路径上的每个节点上耗时
```shell
trace *StringUtils isBlank '#cost>100'
#cost 方法执行耗时,表示当执行时间超过100ms的时候，才会输出trace的结果。
```
包含jdk的函数：默认情况下，trace不会包含jdk里的函数调用，如果希望trace jdk里的函数，需要显式设置--skipJDKMethod false。
`trace --skipJDKMethod false demo.MathGame run`

### stack
&emsp; 输出当前方法被调用的调用路径

### tt
&emsp; 方法执行数据的时空隧道，记录下指定方法每次调用的入参，返回信息和抛出的异常，并能对这些不同的时间下调用进行观测

#### 记录调用
&emsp; 对于一个最基本的使用来说，就是记录下当前方法的每次调用环境现场。
```shell
$ tt -t demo.MathGame primeFactors
Press Ctrl+C to abort.
Affect(class-cnt:1 , method-cnt:1) cost in 66 ms.
 INDEX   TIMESTAMP            COST(ms)  IS-RET  IS-EXP   OBJECT         CLASS         METHOD
----------------------------------------------------------------------------------------------------
 1000    2018-12-04 11:15:38  1.096236  false   true     0x4b67cf4d     MathGame      primeFactors
 1001    2018-12-04 11:15:39  0.191848  false   true     0x4b67cf4d     MathGame      primeFactors
 1002    2018-12-04 11:15:40  0.069523  false   true     0x4b67cf4d     MathGame      primeFactors
 1003    2018-12-04 11:15:41  0.186073  false   true     0x4b67cf4d     MathGame      primeFactors
 1004    2018-12-04 11:15:42  17.76437  true    false    0x4b67cf4d     MathGame      primeFactors
```

- -t：参数表明希望记录下类的方法的每次执行情况。
- -l：参数表明查看已经记录的所有数据。
- -s：参数用于对现有记录进行检索，后面加上检索条件
- -i：参数后边跟着对应的 INDEX 编号查看到他的详细信息。
- -p：用指定index的参数重做一次调用。-replay-times可指定调用次数，--replay-interval指定多次调用间隔(单位ms, 默认1000ms)
- -delete：删除所有的记录

表格字段 | 字段解释
-- | -- 
INDEX | 时间片段记录编号，每一个编号代表着一次调用，后续tt还有很多命令都是基于此编号指定记录操作，非常重要。
TIMESTAMP | 方法执行的本机时间，记录了这个时间片段所发生的本机时间
COST(ms) | 方法执行的耗时
IS-RET | 方法是否以正常返回的形式结束
IS-EXP | 方法是否以抛异常的形式结束
OBJECT | 执行对象的hashCode()，注意，曾经有人误认为是对象在JVM中的内存地址，但很遗憾他不是。但他能帮助你简单的标记当前执行方法的类实体
CLASS | 执行的类名
METHOD | 执行的方法名

### profiler
- profiler start：启动profiler，默认情况下生成cpu的火焰图；
- profiler list：显示所有支持的事件；
- profiler getSamples：获取已采集的sample的数量；
- profiler status：查看profiler的状态，运行的时间；
- profiler stop：停止profiler，生成火焰图的结果，指定输出目录和输出格式：svg/html


## 热修改代码流程
1. 通过jad反编译需要修改的类，并保存为java文件
2. 通过vim修改java代码
3. 通过sc查找修改类的ClassLoader(类加载器)
4. 通过mc进行编译，通过参数指定ClassLoader为第三步查询的CLassLoader
5. 通过retransform重新加载编译好的class文件


## HTTP API
&emsp; Http API 提供类似RESTful的交互接口，请求和响应均为JSON格式的数据。相对于Telnet/WebConsole的输出非结构化文本数据，Http API可以提供结构化的数据，支持更复杂的交互功能，比如特定应用场景的一系列诊断操作。

&emsp; 访问地址：Http API接口地址为：http://ip:port/api，必须使用POST方式提交请求参数。如POST http://127.0.0.1:8563/api 。
```shell
{
      "action": "exec",
      "requestId": "req112",
      "sessionId": "94766d3c-8b39-42d3-8596-98aee3ccbefb",
      "consumerId": "955dbd1325334a84972b0f3ac19de4f7_2",
      "command": "version",
      "execTimeout": "10000"
}
```
- action : 请求的动作/行为：
    - exec : 同步执行命令，命令正常结束或者超时后中断命令执行后返回命令的执行结果。
    - async_exec : 异步执行命令，立即返回命令的调度结果，命令执行结果通过pull_results获取。
    - interrupt_job : 中断会话当前的命令，类似Telnet Ctrl + c的功能。
    - pull_results : 获取异步执行的命令的结果，以http 长轮询（long-polling）方式重复执行
    - init_session : 创建会话
    - join_session : 加入会话，用于支持多人共享同一个Arthas会话
    - close_session : 关闭会话
- requestId : 可选请求ID，由客户端生成。
- sessionId : Arthas会话ID，一次性命令不需要设置会话ID。
- consumerId : Arthas消费者ID，用于多人共享会话。
- command : Arthas命令。
- execTimeout : 命令同步执行的超时时间(ms)，默认为30000。

### 一次性命令
&emsp; 与执行批处理命令类似，一次性命令以同步方式执行。不需要创建会话，不需要设置sessionId选项。
```shell
{
  "action": "exec",
  "command": "version"
}

{
   "state" : "SUCCEEDED",
   "sessionId" : "ee3bc004-4586-43de-bac0-b69d6db7a869",
   "body" : {
      "results" : [
         {
            "type" : "version",
            "version" : "3.3.7",
            "jobId" : 5
         },
         {
            "jobId" : 5,
            "statusCode" : 0,
            "type" : "status"
         }
      ],
      "timeExpired" : false,
      "command" : "version",
      "jobStatus" : "TERMINATED",
      "jobId" : 5
   }
}
```
- state: 请求处理状态：
    - SCHEDULED：异步执行命令时表示已经创建job并已提交到命令执行队列，命令可能还没开始执行或者执行中；
    - SUCCEEDED：请求处理成功（完成状态）；
    - FAILED：请求处理失败（完成状态），通常附带message说明原因；
    - REFUSED：请求被拒绝（完成状态），通常附带message说明原因；
- sessionId : Arthas会话ID，一次性命令自动创建及销毁临时会话
- body.jobId: 命令的任务ID，同一任务输出的所有Result都是相同的jobId
- body.jobStatus: 任务状态，同步执行正常结束为TERMINATED 
- body.timeExpired: 任务执行是否超时
- body/results: 命令执行的结果列表

#### type中包含的值

##### status
&emsp; 每个命令执行结束后都有唯一的status结果。statusCode 为0表示执行成功，statusCode 为非0值表示执行失败，类似进程退出码(exit code)。
```shell
{
    "jobId" : 5,
    "statusCode" : 0,
    "type" : "status"
}

# 命令执行失败时一般会提供错误消息，如
{
  "jobId":3,
  "message":"The argument 'class-pattern' is required",
  "statusCode":-10,
  "type":"status"
}
```

##### input_status
&emsp; type为input_status表示输入状态：用于UI交互时控制用户输入，每次执行命令前后会发送改变的消息。
```shell
{
    "inputStatus" : "ALLOW_INPUT",
    "type" : "input_status",
    "jobId" : 0
}
 
# inputStatus 的值说明：
#    ALLOW_INPUT : 允许用户输入命令，表示会话没有在执行的前台命令，可以接受新的命令。
#    ALLOW_INTERRUPT : 允许用户中断命令执行，表示当前正在执行命令，用户可以发送interrupt_job中断执行。
#    DISABLED : 禁用状态，不能输入命令也不能中断命令。
```

##### command
&emsp; type为command表示输入的命令数据，用于交互UI回显用户输入的命令，拉取的会话命令消息历史会包含command类型的消息，按顺序处理即可。
```shell 
 {
    "type" : "command",
    "jobId" : 3,
    "state" : "SCHEDULED",
    "command" : "watch demo.MathGame primeFactors \"{params, returnObj, throwExp}\" "
 }
```

##### enhancer
&emsp; type为enhancer表示类增强结果：trace/watch/jad/tt等命令需要对类进行增强，会接收到这个enhancer结果。可能出现enhancer结果成功，但没有命中方法的情况，客户端可以根据enhancer结果提示用户。
```shell
 {
    "success" : true,
    "jobId" : 3,
    "effect" : {
       "listenerId" : 3,
       "cost" : 24,
       "classCount" : 1,
       "methodCount" : 1
    },
    "type" : "enhancer"
 } 
```