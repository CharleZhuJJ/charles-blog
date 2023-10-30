---
title: Oracle
author: Charles Chu
date: 2021/06/07
isOriginal: true
---

# Oracle <Badge text="持续更新" type="warning" />

## Oracle体系结构
&emsp; Oracle数据库可以是单实例，也可以是多实例（即RAC）。
- 如果是单实例的话，即一个数据库对应一个实例；
- 如果是多实例的话，即一个数据库对应多个实例，例如RAC1和RAC2。


### Oracle单实例体系结构
![SingleInstance](/public/database/oracle/SingleInstance.jpg)

&emsp; Oracle服务器是一个数据库管理系统，它包括一个Oracle实例（动态）和一个Oracle数据库（静态）。Oracle实例是一个运行的概念（如操作系统的进程）,提供了一种访问Oracle数据库的方式；始终打开一个，并且只能打开一个Oracle数据库。

&emsp; Oracle实例是又SGA和一些后台服务进程组成；

&emsp; Oracle数据库是一个被统一处理的数据的集合，从物理角度来看包括三类文件：数据文件，控制文件，重做文件。从逻辑角度来看，Oracle数据库至少包含一个表空间，表空间至少包含一个段，段又区组成，区又块组成。

&emsp; Oracle还设计了其他的关键文件用来为整个系统服务，如配置文件，密码文件，归档日志文件，还有用户进程和服务进程。（发起连接的应用程序或工具通常被称为用户进程，发起连接后，Oracle服务器就会创建一个进程来接受连接，这个进程就是服务进程；服务进程代表用户进程与Oracle实例进行通信）

## 内存结构
- SGA(System Global Area)：由所有服务进程和后台进程共享；
- PGA(Program Global Area)：由每个服务进程、后台进程专有；每个进程都有一个PGA。

### SGA
&emsp; SGA包含实例的数据和控制信息，包含如下内存结构：
1. Database buffer cache：缓存了从磁盘上检索的数据块。
2. Redo log buffer：缓存了写到磁盘之前的重做信息。
3. Shared pool：缓存了各用户间可共享的各种结构。
4. Large pool：一个可选的区域，用来缓存大的I/O请求，以支持并行查询、共享服务器模式以及某些备份操作。
5. Java pool：保存java虚拟机中特定会话的数据与java代码。
6. Streams pool：由Oracle streams使用。
7. Keep buffer cache：保存buffer cache中存储的数据，使其尽时间可能长。
8. Recycle buffer cache：保存buffer cache中即将过期的数据。
9. nK block size buffer：为与数据库默认数据块大小不同的数据块提供缓存。用来支持表空间传输。
![Sga](/public/database/oracle/Sga.jpg)

### PGA
&emsp; 每个服务进程私有的内存区域，包含如下结构：
1. Private SQL area：包含绑定信息、运行时的内存结构。每个发出sql语句的会话，都有一个private SQL area（私有SQL区）
2. Session memory：为保存会话中的变量以及其他与会话相关的信息，而分配的内存区。
![Pga](/public/database/oracle/Pga.jpg)

## RAC
&emsp; RAC是real application clusters的缩写，译为“实时应用集群”。
![Rac](/public/database/oracle/Rac.jpg)

### RAC的特点
- RAC的每个实例都有属于自己的SGA、后台进程。
- 由于数据文件、控制文件共享于所有实例，所以必须放在	x共享存储中。
- 联机重做日志文件：只有一个实例可以写入，但是其他实例可以在恢复和存档期间读取。
- 归档日志：属于该实例，但在介质恢复期间，其他实例需要访问所需的归档日志。
- alert和trace日志：属于每个实例自己，其他实例不可读写。

### RAC的主要组件包括
- 共享磁盘系统
- Oracle集群件
- 集群互联
- Oracle内核组件


## Oracle集群件：clusterware
&emsp; Oracle集群件能使节点能够互相通信，构成集群，从而这些节点能够像单个逻辑服务器那样整体运行。构成Oracle集群件的后台进程和服务是 crs(cluster ready service)，CRS的组件包括：
- crs守护进程crsd
- Oracle集群同步服务守护进程ocssd
- 事件管理器守护进程evmd
- Oracle通知服务ons

