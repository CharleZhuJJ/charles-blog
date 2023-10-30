---
title: MySQL
author: Charles Chu
date: 2023/07/23
isOriginal: true
---

# MySQL

## MySQL体系结构
![MysqlInstruction](/public/database/mysql/MysqlInstruction.png)

- Connectors：指不同语言与SQL的交互
- Management Services & Utilities：系统管理和控制工具，例如备份恢复、Mysql复制、集群等
- Connection Pool：连接池，管理缓冲用户连接
- SQL Interface：SQL接口，接受用户的SQL命令，并且返回用户需要查询的结果。比如select from就是调用SQL Interface
- Parser：解析器，SQL命令传递到解析器的时候会被解析器验证和解析。
    - a. 将SQL语句分解成数据结构，并将这个结构传递到后续步骤，以后SQL语句的传递和处理就是基于这个结构的
    - b. 如果在分解构成中遇到错误，那么就说明这个sql语句是不合理的
- Optimizer：查询优化器，SQL语句在查询之前会使用查询优化器对查询进行优化。
- Caches & Buffers：查询缓存，如果查询缓存有命中的查询结果，查询语句就可以直接去查询缓存中取数据。
- Engines：存储引擎，Mysql的存储引擎是插件式的。


### 1、连接层
&emsp; 最上层是一些客户端和链接服务，包含本地sock通信和大多数基于客户端/服务端工具实现的类似于TCP/IP的通信。 主要完成一些类似于连接处理、授权认证、及相关的安全方案。在该层上引入了线程池的概念，为通过认证安全接入的客户端提供线程。同样在该层上可以实现基于SSL的安全链接 。服务器也会为安全接入的每个客户端验证它所具有的操作权限。

### 2、服务层
&emsp; 第二层架构主要完成大多数的核心服务功能，如 SQL接口，并完成缓存的查询，SQL的分析和优化，部分内置函数的执行 。所有跨存储引擎的功能也在这一层实现，如过程、函数等。在该层，服务器会解析查询并创建相应的内部解析树，并对其完成相应的优化如确定表的查询的顺序，是否利用索引等， 最后生成相应的执行操作。 如果是select语句，服务器还会查询内部的缓存，如果缓存空间足够大，这样在解决大量读操作的环境中能够很好的提升系统的性能。

### 3、引擎层
&emsp; 存储引擎层， 存储引擎真正的负责了MySQL中数据的存储和提取，服务器通过API和存储引擎进行通信 。不同的存储引擎具有不同的功能，这样我们可以根据自己的需要，来选取合适的存储引擎。

### 4、存储层
&emsp; 数据存储层， 主要是将数据存储在文件系统之上，并完成与存储引擎的交互。

### 特点
&emsp; 和其他数据库相比，MySQL有点与众不同，它的架构可以在多种不同场景中应用并发挥良好作用。主要体现在存储引擎上，插件式的存储引擎架构，将查询处理和其他的系统任务以及数据的存储提取分离。这种架构可以根据业务的需求和实际需要选择合适的存储引擎。

## MySQL存储引擎
&emsp; Mysql中的数据用各种不同的技术存储在文件（或内存）中。这些技术中的每一种技术都使用不同的存储机制、索引技巧、锁定水平并且最终提供广泛的不同的功能和能力。这些不同的技术以及配套的相关功能在MySQL中被称为存储引擎（也称作表类型）。

&emsp; 可以通过指定 show engines ，来查询当前数据库支持的存储引擎

### InnDB
&emsp; InnDB是5.5版本后MySQL的默认存储引擎，事务性数据库的首选，支持ACID事务，支持行级锁定；适合处理多重并发的更新请求；事务；自动灾难恢复；支持外键；支持自动增加列AUTO_INCREMENT属性

&emsp; 但是对比MyISAM的存储引擎，InnoDB写的处理效率差一些，并且占用更多的磁盘空间以保留数据和索引。

#### 存储方式
1. 使用共享表空间存储， 这种方式创建的表的表结构保存在.frm文件中， 数据和索引保存在innodb_data_home_dir 和 innodb_data_file_path定义的表空间中，可以是多个文件。
2. 使用多表空间存储，这种方式创建表的结构仍然存在.frm文件中，但是每个表的数据和索引单独保存在.ibd中。

### MyISAM
&emsp; 拥有较高的插入，查询速度，但不支持事务；强调的是性能。二进制数据文件可以在不同操作数据系统中迁移。

&emsp; 适合管理邮件或Web服务器日志数据

### BDB
&emsp; 源自Berkeley DB，事务性数据库的另一种选择，支持COMMIT和ROLLBACK等其他事务特性；

### Memory
&emsp; 所有数据置于内存的存储引擎，拥有极高的插入，更新和查询效率。但会占用和数据量成正比的内存空间。并且内容在Mysql重新启动时丢失；
1. 目标数据较小，而且被非常频繁地访问；
2. 数据是临时的，而且要求必须立即可用；
3. 数据丢失不会对应用服务器产生实质的负面影响

### Merge 
&emsp; 将一定数量的MyISAM表联合而成一个整体，在超大规模数据存储时很有用；

&emsp; 几个相同的MyISAM表的聚合；merge表中没有数据，对Mergr类型的表可以进行查询、更新、删除操作，实际上是对内部的MyISAM表操作；

### Archive
&emsp; 非常适合存储大量的独立的，作为历史记录的数据。因为它们不经常被读取。Archive拥有高效的插入速度，但其对查询的支持相对较差；

&emsp; Archive是归纳；使用zlib压缩库，在记录被请求时实时压缩，经常被用来当作仓库使用。

### Federated
&emsp; 将不同的Mysql服务器联合起来，逻辑上组成一个完整的数据库。非常适合分布式应用；

### Cluster/NDB
&emsp; 高冗余的存储引擎，用多台数据机器联合提供服务以提高整体性能和安全性。适合数据量大，安全和性能要求高的应用；

### CSV
&emsp; 逻辑上由逗号分割数据的存储引擎。它会在数据库子目录里为每个数据表创建一个.CSV文件。这是一种普通文本文件，每个数据行占用一个文本行。CSV存储引擎不支持索引。

### BlackHole 
&emsp; 黑洞引擎，写入的任何数据都会消失，一般用于记录binlog做复制的中继


## MySQL文件类型

### 1、参数文件(my.cnf)
&emsp; mysql实例启动时，会先读取配置参数文件my.cnf，用于寻找数据库的各种文件所在的位置以及制定某些初始化参数

&emsp; 参数文件中的类型可以分两种类型，动态参数（dynamic）和静态参数（static）
- 动态参数：可以在mysql实例运行的时候进行修改，修改后别的connection重新进行连接就可以生效。如：set global sort_buffer_size = 329999；
- 静态参数：在整个mysql实例运行期间不得进行修改。

### 2、日志文件
&emsp; 记录了Mysql对数据的操作，Mysql运行的情况等等。Mysql也需要日志文件来保证事务的正常运行。

&emsp; Mysql主要包括以下几种日志：错误日志、查询日志、慢查询日志、事务日志、二进制日志；

#### 2.1、错误日志
&emsp; 错误日志对mysql的启动，运行，关闭过程进行了记录。该文件不但记录了出错信息，还记录一些警告信息以及正确的信息

#### 2.2、慢查询日志（slow log）
&emsp; 慢查询日志就是记录运行较慢的sql语句信息。可以设置一个阈值，将运行时间超过该阈值的sql语句的运行信息记录到slow log日志里，运行时间等于阈值，不会记录到slow log。

&emsp; 阈值可以通过long_query_time来设置。show variables like 'long_query_time'查询阈值。log_queries_not_using_indexes，如果sql没有使用索引也会记录
```shell
# 该参数用来控制慢查询日志是否开启，可取值：1 和 0 ，1代表开启，0代表关闭
slow_query_log=1

# 该参数用来指定慢查询日志的文件名
slow_query_log_file=slow_query.log

# 该选项用来配置查询的时间限制， 超过这个时间将认为值慢查询， 将需要进行日志记录， 默认10s
long_query_time=10
```

#### 2.3、全查询日志（general log）
&emsp; 记录了对mysql数据库所有的信息请求，不论这些请求信息是否得到了正确的执行。

&emsp; 默认情况下MySQL查询日志是关闭的。生产环境，如果开启MySQL查询日志，对性能还是有蛮大的影响。
```shell
#该选项用来开启查询日志 ， 可选值 ：0或者1； 0代表关闭，1代表开启
general_log=1

#设置日志的文件名 ， 如果没有指定， 默认的文件名为 host_name.log
general_log_file=file_name
```

#### 2.4、二进制日志(binlog)
&emsp; 记录对数据库进行变更的操作(不包含select，show这类操作)，还记录了执行数据库更改的操作时间和执行时间等信息，以二进制的形式保存在磁盘；binlog是通过追加的方式进行写入的。

##### 作用
1. 数据恢复recovery，通过使用mysqlbinlog工具来恢复数据；
2. 主从复制(replication)，slave和master进行实时同步。

##### binlog日志参数
1. max_binglong_size：指定了单个二进制文件的最大值，如果超过了会产生新的日志文件，后缀名+1，并且记录到.index文件中；
2. binlog_chache_size：使用innodb存储引擎时，所有未提交uncommitted的二进制日志会被记录到一个缓存中，等该事务提交时committed直接将缓存中的二进制日志写入到二进制日志文件中，而该缓存的大小由此参数决定。
3. sync_binlog：对于InnoDB存储引擎而言，只有在事务提交时才会记录biglog，此时记录还在内存中，mysql通过sync_binlog参数控制biglog的刷盘时机，取值范围是0-N；
    - 0：不去强制要求，由系统自行判断何时写入磁盘；
    - 1：每次commit的时候都要将binlog写入磁盘；
    - N：每N个事务，才会将binlog写入磁盘。
4. binlog-do-db、binlog-ingore-db：需要写入或忽略写入哪些库的日志。默认为空，表示将所有库的日志写入到二进制文件中。
5. binlog-format：日志格式，statement、row、mixed
    - statement：每一条会修改数据的sql都会记录在binlog中。日志文件小，节约IO，提高性能；但准确性差，某些情况导致主从数据不一致；
    - row：不记录sql语句上下文相关信息，仅保存哪条记录被修改。准确性强；但日志文件较大，较大的网络IO和磁盘IO；
    - mixed：以上两种的混合，在statement和row之间选择一种；一般的复制使用STATEMENT模式保存binlog，对于STATEMENT模式无法复制的操作使用ROW模式保存binlog。准确性强，文件大小适中；但可能主从不一致。

##### 日志读取
&emsp; 由于日志以二进制方式存储，不能直接读取，需要用mysqlbinlog工具来查看

&emsp; 语法：mysqlbinlog log-file；

##### 日志删除
&emsp; 对于比较繁忙的系统，由于每天生成日志量大 ，这些日志如果长时间不清楚，将会占用大量的磁盘空间。
```shell
#1、通过 Reset Master 指令删除全部 binlog 日志，删除之后，日志编号，将从 xxxx.000001重新开始 。
Reset Master
    
# 2、删除指定编号之前的所有数据：
purge master logs to 'mysqlbin.******'  # 该命令将删除 ****** 编号之前的所有日志。
        
# 3、删除指定日期之前的所有数据：
purge master logs before 'yyyy-mm-dd hh24:mi:ss'  # 该命令将删除日志为 "yyyy-mm-dd hh24:mi:ss" 之前产生的所有日志 。
    
# 4、设置日志的过期天数，过了指定的天数后日志将会被自动删除，这样将有利于减少DBA管理日志的工作量。
--expire_logs_days=days;
```

### 3、套接字文件（socket）
&emsp; Linux系统下本地连接mysql可以采用linux域套接字socket方式，需要一个套接字socket发文件

### 4、pid文件
&emsp; 当mysql实例启动的时候，会将自己的进程id写入pid文件。

### 5、innodb存储文件
&emsp; InnoDB将存储的数据库放在表空间文件中

### 6、redo文件
&emsp; redo log是用来恢复数据的，用于保障已提交事务的持久化特性。

&emsp; 所有的数据库都是日志先行，先写日志，再写数据文件，所以才会有redo log。

&emsp; 默认情况有2个文件分别为ib_logfile0 和 ib_logfile1；它们记录了innodb存储引擎的事务日志。如果数据库由于所有主机掉电导致实例失败，innodb存储引擎会使用redo log恢复到掉电前的时刻，以此来保证数据的完整性。

&emsp; redo log包括两部分：
- 内存中的日志缓冲(redo log buffer)
- 磁盘上的日志文件(redo log file)

&emsp; mysql每执行一条DML语句，先将记录写入redo log buffer，后续某个时间点再一次性将多个操作记录写到redo log file。这种先写日志，再写磁盘的技术就是MySQL里经常说到的WAL(Write-Ahead Logging) 技术。

&emsp; 在计算机操作系统中，用户空间(user space)下的缓冲区数据一般情况下是无法直接写入磁盘的，中间必须经过操作系统内核空间(kernel space)缓冲区(OS Buffer)。因此，redo log buffer写入redo log file实际上是先写入OS Buffer，然后再通过系统调用fsync()将其刷到redo log file中，过程如下：
![RedoLog](/public/database/mysql/RedoLog.png)

&emsp; mysql支持三种将redo log buffer写入redo log file的时机，可以通过innodb_flush_log_at_trx_commit参数配置，各参数值含义如下：
参数 | 含义
 -- | -- 
0（延迟写） | 事务提交时不会将redo log buffer中日志写入os buffer，而是每秒写入os buffer并调用fsync() 写入到redo log file中。也就是说设置为0是约每秒刷新写入到磁盘中的，当系统崩溃，会丢失1秒钟的数据。
1（实时写，实时刷） | 事务每次提交都会将redo log buffer中的日志写入os buffer并调用fsync()刷到redo log file中。这种方式即使系统崩溃也不会丢失任何数据，但是每次提交都写入磁盘，IO的性能较差。
2（实时写，延迟刷） | 每次提交都仅写入到os buffer，然后是每秒调用fsync() 将os buffer中的日志写到redo log file。

&emsp; MySQL的表数据是存放在磁盘上的，因此想要存取的时候都要经历磁盘IO,然而即使是使用SSD磁盘IO也是非常消耗性能的。为了提升性能InnoDB提供了缓冲池(Buffer Pool)，Buffer Pool中包含了磁盘数据页的映射，可以当做缓存来使用：
- 读数据：会首先从缓冲池中读取，如果缓冲池中没有，则从磁盘读取在放入缓冲池；
- 写数据：会首先写入缓冲池，缓冲池中的数据会定期同步到磁盘中。

&emsp; 当MySQL系统宕机，断电的时候可能会丢数据！因为我们的数据已经提交了，但此时是在缓冲池里头，还没来得及在磁盘持久化，所以我们急需一种机制需要存一下已提交事务的数据，为恢复数据使用。于是redo log就派上用场了。

### 7、undo文件
&emsp; undo log是用来回滚数据的，用于保障未提交事务的原子性。

&emsp; 存储了与redo文件相反的数据更新操作，如果rollback的话，就把undod段里面数据回写到数据文件里面。

&emsp; redo和undo之间是有关联的，交替合作保证数据的一致性和安全性。
![UndoLog](/public/database/mysql/UndoLog.png)
1. 每条数据变更(insert/update/delete)操作都伴随一条undo log的生成,并且回滚日志必须先于数据持久化到磁盘上；
2. 所谓的回滚就是根据回滚日志做逆向操作，比如delete的逆向操作为insert，insert的逆向操作为delete，update的逆向为update等。

### redo log  和 undo log
- redo log是用来恢复数据的，用于保障已提交事务的持久化特性.
    - redo log叫做重做日志，是用来实现事务的持久性。该日志文件由两部分组成：重做日志缓冲（redo log buffer）以及重做日志文件（redo log）,前者是在内存中，后者在磁盘中。当事务提交之后会把所有修改信息都会存到该日志中。
- undo log是用来回滚数据的，用于保障未提交事务的原子性
    - undo log 叫做回滚日志，用于记录数据被修改前的信息。他正好跟重做日志所记录的相反，重做日志记录数据被修改后的信息。undo log主要记录的是数据的逻辑变化，为了在发生错误时回滚之前的操作，需要将之前的操作都记录下来，然后在发生错误时才可以回滚。 
    - 每条数据变更(insert/update/delete)操作都伴随一条undo log的生成,并且回滚日志必须先于数据持久化到磁盘上。

- 事务的持久性性是通过 redo log 来实现的		
- 事务的原子性是通过 undo log 来实现的

## MVCC
&emsp; MVCC (MultiVersion Concurrency Control) 叫做多版本并发控制。

&emsp; InnoDB的MVCC，是通过在每行记录的后面保存两个隐藏的列来实现的。这两个列，一个保存了行的创建时间，一个保存了行的过期时间，当然存储的并不是实际的时间值，而是系统版本号。他的主要实现思想是通过数据多版本来做到读写分离。从而实现不加锁读进而做到读写并行。

## MySQL数据类型

### char和varchar
- char(n) 若存入字符数小于n，则以空格补于其后，查询的时候再将空格去掉。所以char类型存储的字符串末尾不能有空格；
- char(n) 固定长度，char(4)不管是存入几个字符，都将占用4个字符；varchar是存入的实际字符数+1个字节；
- char类型的字符串检索速度要比varchar类型的快；

### varchar和text
- varchar可以指定n，text不能指定；
- varchar是存入的实际字符数+1个字节；text是实际字符数+2个字节；
- text类型不能有默认值；
- varchar可以直接创建索引；text创建索引要指定前多少个字符；varchar查询速度快于text

### blob和text
- text以文本方式存储，英文存储区分大小写，而blob是以二进制方式存储，不分大小写。
- blob存储的数据只能整体读出。 
- text可以指定字符集，blob不用指定字符集。

### timestamp
这个字段里的时间数据会随其他字段修改的时候自动刷新，所以这个数据类型的字段可以存放这条记录最后被修改的时间。

## MySQL初始数据库
1. INFORMATION_SCHEMA：提供了访问数据库元数据的方式；
    - 元数据是关于数据的数据，如数据库名或表名，列的数据类型，或访问权限等。
    - INFORMATION_SCHEM是信息数据库，有数个只读表，实际上是视图
2. mysql：mysql的核心数据库
    - 主要负责存储数据库的用户、权限设置、关键字等mysql自己需要使用的控制和管理信息。
3. test：测试数据库

## 索引（index）
&emsp; 一种的特殊的文件，包含着对数据表里所有的记录的引用指针。

&emsp; 索引是帮助MySQL高效获取数据的数据结构（有序）。

&emsp; 索引可以加快数据检索的操作，但会使数据修改操作变慢。每修改数据记录，索引就必须刷新一次；为了弥补这个缺陷，有一个DELAY_KEY_WRITE项，可以暂时制止每次修改都立即刷新，等全部记录修改完成后再进行刷新。

### 索引的优势和劣势
#### 优势
1. 类似于书籍的目录索引，提高数据检索的效率，降低数据库的IO成本。
2. 通过索引列对数据进行排序，降低数据排序的成本，降低CPU的消耗。

#### 劣势
1. 实际上索引也是一张表，该表中保存了主键与索引字段，并指向实体类的记录，所以索引列也是要占用空间的。
2. 虽然索引大大提高了查询效率，同时却也降低更新表的速度，如对表进行INSERT、UPDATE、DELETE。因为更新表时，MySQL 不仅要保存数据，还要保存一下索引文件。每次更新添加了索引列的字段，都会调整因为更新所带来的键值变化后的索引信息。                              

### 索引结构
&emsp; 索引是在MySQL的存储引擎层中实现的，而不是在服务器层实现的 。所以每种存储引擎的索引都不一定完全相同，也不是所有的存储引擎都支持所有的索引类型的。MySQL目前提供了以下4种索引：
- BTREE 索引 ： 最常见的索引类型，大部分索引都支持 B 树索引。
- HASH 索引：只有Memory引擎支持 ， 使用场景简单 。
- R-tree 索引（空间索引）：空间索引是MyISAM引擎的一个特殊索引类型，主要用于地理空间数据类型，通常使用较少，不做特别介绍。
- Full-text （全文索引） ：全文索引也是MyISAM的一个特殊索引类型，主要用于全文索引，InnoDB从Mysql5.6版本开始支持全文索引。

#### BTREE
&emsp; BTree又叫多路平衡搜索树，一颗m叉的BTree特性如下：
- 树中每个节点最多包含m个孩子。
- 除根节点与叶子节点外，每个节点至少有[ceil(m/2)]个孩子。
- 若根节点不是叶子节点，则至少有两个孩子。
- 所有的叶子节点都在同一层。
- 每个非叶子节点由n个key与n+1个指针组成，其中[ceil(m/2)-1] <= n <= m-1

&emsp; 以5叉BTree为例，key的数量：公式推导[ceil(m/2)-1] <= n <= m-1。所以 2 <= n <=4 。当n>4时，中间节点分裂到父节点，两边节点分裂。
![BTree1](/public/database/mysql/BTree1.png)
![BTree2](/public/database/mysql/BTree2.png)
![BTree3](/public/database/mysql/BTree3.png)
![BTree4](/public/database/mysql/BTree4.png)
![BTree5](/public/database/mysql/BTree5.png)

#### 索引类别
1. 普通索引：（又关键字Key 或 index 定义的索引）：加快对数据的访问速度；
2. 唯一索引：被索引的数据列不可以包含重复的值（UNIQUE）：避免数据出现重复性；
3. 主索引：为主键字段创建一个索引：和唯一索引的区别是，主索引的关键字是PRIMARY
4. 外键索引：为外键字段定义一外键约束条件：
5. 复合索引：覆盖多个数据列：index(A,B,C) 可以当作A 或 （A,B）的索引来使用，不能当作B或（B,C）的索引

#### 索引设计原则
&emsp; 索引的设计可以遵循一些已有的原则，创建索引的时候请尽量考虑符合这些原则，便于提升索引的使用效率，更高效的使用索引。
- 对查询频次较高，且数据量比较大的表建立索引。
- 索引字段的选择，最佳候选列应当从where子句的条件中提取，如果where子句中的组合比较多，那么应当挑选最常用、过滤效果最好的列的组合。
- 使用唯一索引 ，区分度越高，使用索引的效率越高。
- 索引可以有效的提升查询数据的效率，但索引数量不是多多益善，索引越多，维护索引的代价自然也就水涨船高 。对于插入、更新、删除等DML操作比较频繁的表来说，索引过多，会引入相当高的维护代价，降低DML操作的效率，增加相应操作的时间消耗。 另外索引过多的话，MySQL也会犯选择困难病，虽然最终仍然会找到一个可用的索引，但无疑提高了选择的代价。
- 使用短索引，索引创建之后也是使用硬盘来存储的，因此提升索引访问的I/O效率，也可以提升总体的访问效率。 假如构成索引的字段总长度比较短，那么在给定大小的存储块内可以存储更多的索引值，相应的可以有效的提升MySQL访问索引的I/O效率。
- 利用最左前缀 ，N个列组合而成的组合索引，那么相当于是创建了N个索引，如果查询时where子句中使用了组成该索引的前几个字段，那么这条查询SQL可以利用组合索引来提升查询效率。

#### 索引相关SQL

##### 创建索引
```sql
CREATE [UNIQUE|FULLTEXT|SPATIAL] INDEX index_name
[USING index_type]
ON tbl_name(index_col_name,...)
index_col_name : column_name[(length)][ASC | DESC]

-- 例子：
create index idx_city_name on city(city_name);

-- 添加一个主键，这意味着索引值必须是唯一的，且不能为NULL
alter table tb_name add primary key(column_list);

-- 创建索引的值必须是唯一的（除了NULL外，NULL可能会出现多次）
alter table tb_name add unique index_name(column_list);

-- 添加普通索引， 索引值可以出现多次。
alter table tb_name add index index_name(column_list);

-- 指定了索引为FULLTEXT， 用于全文索引
alter table tb_name add fulltext index_name(column_list);


-- 创建复合索引:
CREATE INDEX idx_name_email_status ON tb_seller(NAME,email,STATUS);
-- 就相当于
-- 对name 创建索引 ;
-- 对name , email 创建了索引 ;
-- 对name , email, status 创建了索引 ;
```

##### 查看索引
```sql
show index from table_name;

-- 例子：
show index from city;
```

##### 删除索引
```sql
DROP INDEX index_name ON tbl_name;

-- 例子：
drop index idx_city_name on city;
```

## 数据库中引起全表扫描的SQL语句

### 1、模糊查询（like）
- 原因：like本身效率就比较低，应该尽量避免查询条件使用like；对于like ‘%...%’（全模糊）这样的条件，是无法使用索引的，全表扫描自然效率很低；另外，由于匹配算法的关系，模糊查询的字段长度越大，模糊查询效率越低。
- 解决办法：首先尽量避免模糊查询，如果因为业务需要一定要使用模糊查询，则至少保证不要使用全模糊查询：
    - 对于右模糊查询，即like ‘…%’，是会使用索引的；
    - 左模糊like‘%...’无法直接使用索引，但可以利用reverse + function index 的形式，变化成 like ‘…%’；
    - 全模糊是无法优化的，一定要的话考虑用搜索引擎。出于降低数据库服务器的负载考虑，尽可能地减少数据库模糊查询。

### 2、查询条件中有不等于操作符（<>、!=）
- 原因：SQL中，不等于操作符会限制索引，引起全表扫描，即使比较的字段上有索引。
- 解决方法：通过把不等于操作符改成or，可以使用索引，避免全表扫描。例如，把column<>’aaa’，改成column<’aaa’ or column>’aaa’，就可以使用索引了。　

### 3、or使用不当
&emsp; 原因：where子句中比较的两个条件，一个有索引，一个没索引，使用or则会引起全表扫描。例如：where A==1 or B==2，A上有索引，B上没索引，则比较B==2时会重新开始全表扫描。　

### 4、组合索引
&emsp; 排序时应按照组合索引中各列的顺序进行排序，即使索引中只有一个列是要排序的，否则排序性能会比较差。
```sql
create index skip1 on emp5(job,empno，date); 

select job，empno from emp5 where job=’manager’and empno=’10’ order by job,empno,date desc;
-- 实际上只是查询出符合job=’manager’and empno=’10’条件的记录并按date降序排列
-- 但是写成order by date desc性能较差。
```

### 5、在where子句中对字段进行函数操作
&emsp; 在where子句中对字段进行函数操作，这将导致引擎放弃使用索引而进行全表扫描。

### 6、不带任何条件的count
&emsp; select count(*) from table；这样不带任何条件的count会引起全表扫描，并且没有任何业务意义，是一定要杜绝的。
### 7、Update 语句
&emsp; 如果只更改1、2个字段，不要Update全部字段，否则频繁调用会引起明显的性能消耗，同时带来大量日志。

### 8、列与列对比
```sql
-- 某个表中，有两列（id和c_id）都建了单独索引，下面这种查询条件不会走索引；
-- 这种情况会被认为还不如走全表扫描。
select * from test where id=c_id;
```

### 9、数据类型的转换
&emsp; 当查询条件存在隐式转换时，索引会失效。（字符串不加单引号）
```sql
--比如在数据库里id存的number类型，但是在查询时，却用了下面的形式：
select * from sunyang where id='123';
```

### 10、如果MySQL评估使用索引比全表更慢，则不使用索引。

## Explain
### 1. id
&emsp; id 字段是 select查询的序列号，是一组数字，表示的是查询中执行select子句或者是操作表的顺序。id 情况有三种：
- id 相同表示加载表的顺序是从上到下。
- id 不同id值越大，优先级越高，越先被执行。	
- id 有相同，也有不同，同时存在。id相同的可以认为是一组，从上往下顺序执行；在所有的组中，id的值越大，优先级越高，越先执行。

### 2. select_type
&emsp; 可以看id的执行实例，总共有以下几种类型：
- SIMPLE： 表示简单的查询，此查询不包含 UNION 查询或子查询
- PRIMARY： 表示此查询是最外层的查询
- SUBQUERY： 子查询中的第一个 SELECT
- UNION： 表示此查询是 UNION 的第二或随后的查询
- DEPENDENT UNION：UNION 中的第二个或后面的查询语句, 取决于外面的查询
- UNION RESULT, UNION 的结果
- DEPENDENT SUBQUERY: 子查询中的第一个 SELECT, 取决于外面的查询. 即子查询依赖于外层查询的结果.
- DERIVED：衍生，表示导出表的SELECT（FROM子句的子查询）

### 3. table
&emsp; 输出结果集的表。\<derived2>的表示id为2的u和o表衍生出来的。

### 4. type
&emsp; type 字段比较重要，它提供了判断查询是否高效的重要依据依据。通过type字段，我们判断此次查询是全表扫描还是索引扫描等。type常用的取值有:
- system: 表中只有一条数据， 这个类型是特殊的 const 类型。
- const: 针对主键或唯一索引的等值查询扫描，最多只返回一行数据。const 查询速度非常快， 因为它仅仅读取一次即可。例如下面的这个查询，它使用了主键索引，因此 type 就是 const 类型的：explain select * from user_info where id = 2；
- eq_ref: 此类型通常出现在多表的 join 查询，表示对于前表的每一个结果，都只能匹配到后表的一行结果。并且查询的比较操作通常是 =，查询效率较高。例如：explain select * from user_info, order_info where user_info.id = order_info.user_id;
- ref: 此类型通常出现在多表的 join 查询，针对于非唯一或非主键索引，或者是使用了 最左前缀 规则索引的查询。例如下面这个例子中， 就使用到了 ref 类型的查询：explain select * from user_info, order_info where user_info.id = order_info.user_id AND order_info.user_id = 5
- range: 表示使用索引范围查询，通过索引字段范围获取表中部分数据记录。这个类型通常出现在 =, <>, >, >=, <, <=, IS NULL, <=>, BETWEEN, IN() 操作中。例如下面的例子就是一个范围查询：explain select * from user_info  where id between 2 and 8；
- index: 表示全索引扫描(full index scan)，和 ALL 类型类似，只不过 ALL 类型是全表扫描，而 index 类型则仅仅扫描所有的索引， 而不扫描数据。index 类型通常出现在：所要查询的数据直接在索引树中就可以获取到, 而不需要扫描数据。当是这种情况时，Extra 字段 会显示 Using index。
- ALL: 表示全表扫描，这个类型的查询是性能最差的查询之一。通常来说， 我们的查询不应该出现 ALL 类型的查询，因为这样的查询在数据量大的情况下，对数据库的性能是巨大的灾难。如一个查询是 ALL 类型查询， 那么一般来说可以对相应的字段添加索引来避免。

&emsp; 通常来说, 不同的 type 类型的性能关系如下:
ALL < index < range ~ index_merge < ref < eq_ref < const < system

### 5. possible_keys
&emsp; 它表示 mysql 在查询时，可能使用到的索引。注意，即使有些索引在 possible_keys 中出现，但是并不表示此索引会真正地被 mysql 使用到。mysql 在查询时具体使用了哪些索引，由 key 字段决定。

### 6. key
&emsp; 此字段是 mysql 在当前查询时所真正使用到的索引。比如请客吃饭，possible_keys是应到多少人，key是实到多少人。

### 7. key_len
&emsp;  表示查询优化器使用了索引的字节数，这个字段可以评估组合索引是否完全被使用。

### 8. ref
&emsp; 这个表示显示索引的哪一列被使用了，如果可能的话,是一个常量。前文的type属性里也有ref，注意区别。

### 9. rows
&emsp; rows 也是一个重要的字段，mysql 查询优化器根据统计信息，估算 sql 要查找到结果集需要扫描读取的数据行数，这个值非常直观的显示 sql 效率好坏， 原则上 rows 越少越好。

### 10. extra
&emsp; explain 中的很多额外的信息会在 extra 字段显示, 常见的有以下几种内容:
- using filesort ：表示 mysql 需额外的排序操作，不能通过索引顺序达到排序效果。一般有 using filesort都建议优化去掉，因为这样的查询 cpu 资源消耗大。
- using index：覆盖索引扫描，表示查询在索引树中就可查找所需数据，不用扫描表数据文件，往往说明性能不错。
- using temporary：查询有使用临时表, 一般出现于排序， 分组和多表 join 的情况， 查询效率不高，建议优化。
- using where ：表名使用了where过滤。
- ref: 此类型通常出现在多表的 join 查询，针对于非唯一或非主键索引，或者是使用了 最左前缀 规则索引的查询。例如下面这个例子中， 就使用到了 ref 类型的查询：explain select * from user_info, order_info where user_info.id = order_info.user_id AND order_info.user_id = 5


## 查看SQL执行频率
&emsp; MySQL 客户端连接成功后，通过 show [session|global] status 命令可以提供服务器状态信息。show[session|global] status 可以根据需要加上参数“session”或者“global”来显示 session 级（当前连接）的统计结果和 global 级（自数据库上次启动至今）的统计结果。如果不写，默认使用参数是“session”。
```sql
-- 执行 select 操作的次数，一次查询只累加 1。
show status like 'Com_select';

-- 执行 INSERT 操作的次数，对于批量插入的 INSERT 操作，只累加一次。
show status like 'Com_insert'

-- 执行 UPDATE 操作的次数。
show status like 'Com_update'

--执行 DELETE 操作的次数。
show status like 'Com_delete'

-- select 查询返回的行数。
show status like 'Innodb_rows_read'

-- 执行 INSERT 操作插入的行数。
show status like 'Innodb_rows_inserted'

-- 执行 UPDATE 操作更新的行数。
show status like 'Innodb_rows_updated'
 
-- 执行 DELETE 操作删除的行数。
show status like 'Innodb_rows_deleted'

-- 试图连接 MySQL 服务器的次数。
show status like 'Connections'

-- 服务器工作时间。
show status like 'Uptime'

-- 慢查询的次数。
show status like 'Slow_queries'
```

## 定位低效率执行SQL
&emsp; 慢查询日志: 通过慢查询日志定位那些执行效率较低的SQL语句，用--log-slow-queries[=file_name]选项启动时，mysqld 写一个包含所有执行时间超过long_query_time 秒的 SQL 语句的日志文件。

&emsp;  show processlist : 慢查询日志在查询结束以后才记录，所以在应用反映执行效率出现问题的时候查询慢查询日志并不能定位问题，可以使用show processlist命令查看当前MySQL正在进行的线程，包括线程的状态、是否锁表等，可以实时地查看 SQL 的执行情况，同时对一些锁表操作进行优化。
![ShowProcesslist](/public/database/mysql/ShowProcesslist.png)

1. id列，用户登录mysql时，系统分配的"connection_id"，可以使用函数connection_id()查看
2. user列，显示当前用户。如果不是root，这个命令就只显示用户权限范围的sql语句
3. host列，当前主机名
4. db列，显示这个进程目前连接的是哪个数据库
5. command列，显示当前连接的执行的命令，一般取值为休眠（sleep），查询（query），连接（connect）等
6. time列，显示这个状态持续的时间，单位是秒
7. state列，显示使用当前连接的sql语句的状态，很重要的列。state描述的是语句执行中的某一个状态。一个sql语句，以查询为例，可能需要经过copying to tmp table、sorting result、sendingdata等状态才可以完成
8. info列，显示这个sql语句，是判断问题语句的一个重要依据

## show profile分析SQL
&emsp; Mysql从5.0.37版本开始增加了对show profiles和show profile语句的支持。
```sql
-- 通过 have_profiling 参数，能够看到当前MySQL是否支持profile：
select @@have_profiling

-- 默认profiling是关闭的
select @@profiling;

-- 可以通过set语句在Session级别开启profiling：
set profiling=1; //开启profiling 开关；
```

&emsp; show profiles能够在做SQL优化时帮助我们了解时间都耗费到哪里去了。
![ShowProfiles](/public/database/mysql/ShowProfiles.png)
&emsp; 通过show profile for query query_id 语句可以查看到该SQL执行过程中每个线程的状态和消耗的时间
![ShowProfileFor](/public/database/mysql/ShowProfileFor.png)

## SQL优化

### 1、大批量插入数据
- 主键顺序插入：因为InnoDB类型的表是按照主键的顺序保存的，所以将导入的数据按照主键的顺序排列，可以有效的提高导入数据的效率。如果InnoDB表没有主键，那么系统会自动默认创建一个内部列作为主键，所以如果可以给表创建一个主键，将可以利用这点，来提高导入数据的效率。
- 关闭唯一性校验：在导入数据前执行 SET UNIQUE_CHECKS=0，关闭唯一性校验，在导入结束后执行SET 	UNIQUE_CHECKS=1，恢复唯一性校验，可以提高导入的效率。
- 手动提交事务：如果应用使用自动提交的方式，建议在导入前执行 SET AUTOCOMMIT=0，关闭自动提交，导入结束后再执行 SET AUTOCOMMIT=1，打开自动提交，也可以提高导入的效率。

### 2、优化insert语句
#### 2.1、对一张表插入多行数据
- 如果需要同时对一张表插入很多行数据时，应该尽量使用多个值表的insert语句，
- 这种方式将大大的缩减客户端与数据库之间的连接、关闭等消耗。使得效率比分开执行的单个insert语句快。
```sql
-- 示例，原始方法
insert into tb_test values(1,'Tom');
insert into tb_test values(2,'Cat');
insert into tb_test values(3,'Jerry');

-- 优化后的方案为 
insert into tb_test values(1,'Tom'),(2,'Cat')，(3,'Jerry');
```

#### 2.2、在事务中进行数据插入
```sql
start transaction;
insert into tb_test values(1,'Tom');
insert into tb_test values(2,'Cat');
insert into tb_test values(3,'Jerry');
commit;
```

#### 2.3、数据有序插入
```sql
-- 原始数据：
insert into tb_test values(2,'Cat');
insert into tb_test values(1,'Tom');
insert into tb_test values(3,'Jerry');

-- 优化后：
insert into tb_test values(1,'Tom');
insert into tb_test values(2,'Cat');
insert into tb_test values(3,'Jerry');
```

### 3、优化order by语句

#### 3.1、直接返回有序数据
&emsp; 通过有序索引顺序扫描直接返回有序数据，这种情况即为 using index，不需要额外排序，操作效率高。
```sql
-- 示例：原始操作：
select * from emp order by age desc;

-- 优化后：
select id,age from emp order by age desc;
```

#### 3.2、尽量减少额外的排序
&emsp; 尽量减少额外的排序，通过索引直接返回有序数据(using index)。
&emsp; where条件和Order by使用相同的索引，并且Order By的顺序和索引顺序相同， 并且Order by的字段都是升序，或者都是降序
```sql
-- 示例：有age，salary两个字段的复合索引
select id,age,salary from emp order by age desc salary asc;  -- false

-- 优化后：
select id,age,salary from emp order by age desc salary desc; -- true
```

### 4、优化group by语句
&emsp; 由于GROUP BY 实际上也同样会进行排序操作，而且与ORDER BY 相比，GROUP BY 主要只是多了排序之后的分组操作。所以，在GROUP BY 的实现过程中，与 ORDER BY 一样也可以利用到索引。
```sql
-- 如果查询包含 group by 但是用户想要避免排序结果的消耗， 则可以执行order by null 禁止排序 。
-- 示例：
select age,count(*) from emp group by age;

-- 优化后：
select age,count(*) from emp group by age order by null;
```

### 5、优化分页查询
&emsp; 一般分页查询时，通过创建覆盖索引能够比较好地提高性能。一个常见又非常头疼的问题就是limit 2000000,10 ，此时需要MySQL排序前2000010 记录，仅仅返回2000000 - 2000010 的记录，其他记录丢弃，查询排序的代价非常大。
```sql
-- 在索引上完成排序分页操作，最后根据主键关联回原表查询所需要的其他列内容。
-- 示例：
select * from tb_item limit 2000000,10;

-- 优化后：
select * from tb_item t,(select id from tb_item order by id limit 2000000,10) a where t.id = a.id;
```

### 6、 使用SQL提示
&emsp; SQL提示，是优化数据库的一个重要手段，简单来说，就是在SQL语句中加入一些人为的提示来达到优化操作的目的。
- USE INDEX：在查询语句中表名的后面，添加 use index 来提供希望MySQL去参考的索引列表，就可以让MySQL不再考虑其他可用的索引。
- IGNORE INDEX：如果用户只是单纯的想让MySQL忽略一个或者多个索引，则可以使用 ignore index 作为 hint 。
- FORCE INDEX：为强制MySQL使用一个特定的索引，可在查询中使用 force index 作为hint 。


## 视图（View）
&emsp; 视图是一种虚拟存在的表。视图并不在数据库中实际存在，行和列数据来自定义视图的查询中使用的表，并且是在使用视图时动态生成的。通俗的讲，视图就是一条SELECT语句执行后返回的结果集。所以我们在创建视图的时候，主要的工作就落在创建这条SQL查询语句上。

&emsp; 视图相对于普通的表的优势主要包括以下几项。
- 简单：使用视图的用户完全不需要关心后面对应的表的结构、关联条件和筛选条件，对用户来说已经是过滤好的复合条件的结果集。
- 安全：使用视图的用户只能访问他们被允许查询的结果集，对表的权限管理并不能限制到某个行某个列，但是通过视图就可以简单的实现。
- 数据独立：一旦视图的结构确定了，可以屏蔽表结构变化对用户的影响，源表增加列对视图没有影响；源表修改列名，则可以通过修改视图来解决，不会造成对访问者的影响。

### 视图相关SQL

#### 创建视图
```sql
CREATE [OR REPLACE] [ALGORITHM = {UNDEFINED | MERGE | TEMPTABLE}]
VIEW view_name [(column_list)]
AS select_statement
[WITH [CASCADED | LOCAL] CHECK OPTION]

-- 例子：
create or replace view city_country_view as
select t.*,c.country_name from country c , city t where c.country_id = t.country_id;
```

#### 修改视图
```sql
ALTER [ALGORITHM = {UNDEFINED | MERGE | TEMPTABLE}]
VIEW view_name [(column_list)]
AS select_statement
[WITH [CASCADED | LOCAL] CHECK OPTION]
选项 :
WITH [CASCADED | LOCAL] CHECK OPTION 决定了是否允许更新数据使记录不再满足视图的条件。
    LOCAL ： 只要满足本视图的条件就可以更新。
    CASCADED ： 必须满足所有针对该视图的所有视图的条件才可以更新。 默认值.
```

#### 查看视图
&emsp; 从MySQL 5.1版本开始，使用SHOW TABLES命令的时候不仅显示表的名字，同时也会显示视图的名字
```sql
show tables;
SHOW TABLE STATUS; -- 不但可以显示表的信息，同时也可以显示视图的信息。

 -- 查询某个视图的定义
SHOW CREATE VIEW view_name;

-- 例子：
show create view city_country_view;
```

#### 删除视图
```sql
DROP VIEW [IF EXISTS] view_name [, view_name] ...[RESTRICT | CASCADE]

-- 例子，删除视图city_country_view :
DROP VIEW city_country_view ;
```

## 存储过程和存储函数
&emsp; 存储过程和存储函数是事先经过编译并存储在数据库中的一段 SQL 语句的集合，调用存储过程和存储函数可以简化应用开发人员的很多工作，减少数据在数据库和应用服务器之间的传输，对于提高数据处理的效率是有好处的。

&emsp; 存储过程和函数的区别在于函数必须有返回值，而存储过程没有

- 函数：是一个有返回值的过程；
- 过程：是一个没有返回值的函数；

### 相关SQL

#### 创建存储过程
```sql
CREATE PROCEDURE procedure_name ([proc_parameter[,...]])
begin
-- SQL语句
end ;

-- 例子：
delimiter $   -- 定义分隔符为‘$’
create procedure pro_test1()
begin
select 'Hello Mysql' ;
end$ -- 语句结束，可以执行该命令
delimiter ; -- 重新还原分隔符为‘;’
-- tips：
 -- DELIMITER关键字用来声明SQL语句的分隔符,告诉MySQL解释器，该段命令是否已经结束了，mysql是否可以执行了。
 -- 默认情况下，delimiter是分号';'。在命令行客户端中，如果有一行命令以分号结束，那么回车后，mysql将会执行该命令。
```

#### 调用存储过程
```sql
call procedure_name() ;

-- 例子
call pro_test1();
```

#### 查看存储过程
```sql
-- 查询db_name数据库中的所有的存储过程（在mysql库中查询）
select name from mysql.proc where db='db_name';

-- 查询存储过程的状态信息
show procedure status;

-- 查询某个存储过程的定义
show create procedure pro_test1;
```

#### 删除存储过程
```sql
DROP PROCEDURE [IF EXISTS] sp_name ；

-- 例子：
drop procedure pro_test1;
```

#### 存储过程语法
&emsp; 存储过程是可以编程的，意味着可以使用变量，表达式，控制结构，来完成比较复杂的功能。

##### 1、变量
&emsp; DECLARE
```sql
-- 通过 DECLARE 可以定义一个局部变量，该变量的作用范围只能在 BEGIN…END 块中。
DECLARE var_name[,...] type [DEFAULT value]

-- 例子：
delimiter $
create procedure pro_test2()
begin
    declare num int default 5;
    select num+ 10;
end$
delimiter ;
```

&emsp; SET
```sql
-- 直接赋值使用 SET，可以赋常量或者赋表达式
SET var_name = expr [, var_name = expr] ...

-- 例子：
DELIMITER $
CREATE PROCEDURE pro_test3()
BEGIN
    DECLARE NAME VARCHAR(20);
    SET NAME = 'MYSQL';
    SELECT NAME ;
END$
DELIMITER ;
```
&emsp; 可以通过select ... into 方式进行赋值操作
```sql        
DELIMITER $
CREATE PROCEDURE pro_test5()
BEGIN
    declare countnum int;
    select count(*) into countnum from city;
    select countnum;
END$
DELIMITER ;
```

##### 2、if条件判断
```sql    
if search_condition then statement_list
    [elseif search_condition then statement_list] ...
    [else statement_list]
end if;

-- 例子：
-- 180 及以上 ----------> 身材高挑；
-- 170 - 180 ---------> 标准身材；
-- 170 以下 ----------> 一般身材
delimiter $
create procedure pro_test6()
begin
    declare height int default 175;
    declare description varchar(50);
    if height >= 180 then
        set description = '身材高挑';
    elseif height >= 170 and height < 180 then
        set description = '标准身材';
    else
        set description = '一般身材';
    end if;
    
    select description ;
end$
delimiter ;
```

##### 3、传递参数
```sql
create procedure procedure_name([in/out/inout] 参数名 参数类型)
...
```

&emsp; IN : 该参数可以作为输入，也就是需要调用方传入值 , 默认
```sql
-- IN的例子：根据定义的身高变量，判定当前身高的所属的身材类型
delimiter $
create procedure pro_test5(in height int)
begin
    declare description varchar(50) default '';
    if height >= 180 then
        set description='身材高挑';
    elseif height >= 170 and height < 180 then
        set description='标准身材';
    else
        set description='一般身材';
    end if;
    
    select concat('身高 ', height , '对应的身材类型为:',description);
end$
    delimiter ;
```

&emsp; OUT: 该参数作为输出，也就是该参数可以作为返回值
```sql 
-- OUT的例子：根据传入的身高变量，获取当前身高的所属的身材类型
create procedure pro_test5(in height int , out description varchar(100))
begin
    if height >= 180 then
        set description='身材高挑';
    elseif height >= 170 and height < 180 then
        set description='标准身材';
    else
        set description='一般身材';
    end if;
end$

-- 调用函数：
call pro_test5(168, @description);
select @description;
-- @description: 在变量名称前面加上“@”符号，叫做用户会话变量，代表整个会话过程他都是有作用的，这个类似于全局变量一样。
-- @@global.sort_buffer_size : 这种在变量前加上 "@@" 符号, 叫做系统变量。
```

&emsp; INOUT: 既可以作为输入参数，也可以作为输出参数


##### 4、case结构
```sql
-- 方式一 :
CASE case_value
    WHEN when_value THEN statement_list
    [WHEN when_value THEN statement_list] ...
    [ELSE statement_list]
END CASE;

-- 方式二 :
CASE
    WHEN search_condition THEN statement_list
    [WHEN search_condition THEN statement_list] ...
    [ELSE statement_list]
END CASE;

-- 例子：给定一个月份, 然后计算出所在的季度
delimiter $
create procedure pro_test9(month int)
begin
    declare result varchar(20);
    case
        when month >= 1 and month <=3 then set result = '第一季度';
        when month >= 4 and month <=6 then set result = '第二季度';
        when month >= 7 and month <=9 then set result = '第三季度';
        when month >= 10 and month <=12 then set result = '第四季度';
    end case;
    
    select concat('您输入的月份为 :', month , ' , 该月份为 : ' , result) as content ;
end$
delimiter ;
```

##### 5、while循环
```sql    
while search_condition do
    statement_list
end while;

-- 例子：计算从1加到n的值
delimiter $
create procedure pro_test8(n int)
begin
    declare total int default 0;
    declare num int default 1;
    while num<=n do
        set total = total + num;
        set num = num + 1;
    end while;
    select total;
end$
delimiter ;
```

##### 6、repeat结构
&emsp; 有条件的循环控制语句, 当满足条件的时候退出循环。 

&emsp; while 是满足条件才执行，repeat 是满足条件就退出循环。
```sql    
REPEAT
    statement_list
    UNTIL search_condition  -- UNTIL search_condition 结束条件没有分号
END REPEAT;

-- 例子：计算从1加到n的值
delimiter $
create procedure pro_test10(n int)
begin
    declare total int default 0;
    repeat
        set total = total + n;
        set n = n - 1;
        until n=0  -- 注意：结束条件没有分号
    end repeat;
    
    select total ;
end$
delimiter ;
```

##### 7、loop语句
&emsp; LOOP实现简单的循环，退出循环的条件需要使用其他的语句定义，通常可以使用 LEAVE 语句实现
```sql
[begin_label:] LOOP -- 给LOOP循环起别名
    statement_list  -- 如果不在 statement_list 中增加退出循环的语句，那么 LOOP 语句可以用来实现简单的死循环。
END LOOP [end_label]
```

##### 8、leave语句
&emsp; 用来从标注的流程构造中退出，通常和BEGIN ... END 或者循环一起使用。
```sql
-- loop和leave的例子：
delimiter $
CREATE PROCEDURE pro_test11(n int)
BEGIN
    declare total int default 0;
    ins: LOOP
        IF n <= 0 then
            leave ins;
        END IF;
        
        set total = total + n;
        set n = n - 1;
    END LOOP ins;
    
    select total;
END$
delimiter ;
```

##### 9、游标/光标
&emsp; 游标是用来存储查询结果集的数据类型,在存储过程和存储函数中可以使用光标对结果集进行循环的处理。

&emsp; 光标的使用包括光标的声明、OPEN、FETCH 和 CLOSE
```sql
DELIMITER $
create procedure pro_test12()
begin
    DECLARE id int(11);
    DECLARE name varchar(50);
    DECLARE age int(11);
    DECLARE salary int(11);
    DECLARE has_data int default 1;
    
    DECLARE emp_result CURSOR FOR select * from emp;
    DECLARE EXIT HANDLER FOR NOT FOUND set has_data = 0;
    -- 拿不到数据会触发句柄，意思是抓取不到数据时，将has_data设置为0，该句声明必须在声明游标语句之后
    
    open emp_result;
    
    repeat
        fetch emp_result into id , name , age , salary;
        select concat('id为',id, ', name 为' ,name , ', age为 ' ,age , ', 薪水为: ', salary);
        until has_data = 0
    end repeat;
    
    close emp_result;
end$
DELIMITER ;
```

#### 创建存储函数
```sql   
CREATE FUNCTION function_name([param type ... ])
RETURNS type
BEGIN
    ...
END;

-- 例子：定义一个存储函数, 请求满足条件的总记录数;
delimiter $
create function count_city(countryId int)
returns int
begin
    declare cnum int ;
    select count(*) into cnum from city where country_id = countryId;    
    return cnum;
end$
delimiter ;

-- 调用
select count_city(1);
```


## 触发器
&emsp; 触发器是与表有关的数据库对象，指在 insert/update/delete 之前或之后，触发并执行触发器中定义的SQL语句集合。触发器的这种特性可以协助应用在数据库端确保数据的完整性 , 日志记录 , 数据校验等操作 。

&emsp; 使用别名 OLD 和 NEW 来引用触发器中发生变化的记录内容，这与其他的数据库是相似的。现在触发器还只支持行级触发，不支持语句级触发。
触发器类型 | NEW和OLD的使用
-- | --
INSERT型触发器 | NEW表示将要或者已经新增的数据
UPDATE型触发器 | OLD表示修改之前的数据，NEW表示将要或已经修改后的数据
DELETE型触发器 | OLD表示将要或者已经删除的数据

### 相关SQL

#### 创建触发器
```sql
create trigger trigger_name
before/after   insert/update/delete
on tbl_name
[ for each row ] -- 行级触发器
begin
    trigger_stmt ;
end;

-- 例子：通过触发器记录 emp 表的数据变更日志, 包含增加, 修改, 删除 ;

-- 创建 insert 型触发器，完成插入数据时的日志记录 :
DELIMITER $
create trigger emp_logs_insert_trigger
after insert
on emp
for each row
begin
    insert into emp_logs (id,operation,operate_time,operate_id,operate_params)
        values(null,'insert',now(),new.id,
        concat('插入后(id:',new.id,', name:',new.name,', age:',new.age,', salary:',new.salary,')'));
end $
DELIMITER ;

-- 创建 update 型触发器，完成更新数据时的日志记录 :
DELIMITER $
create trigger emp_logs_update_trigger
after update
on emp
for each row
begin
    insert into emp_logs (id,operation,operate_time,operate_id,operate_params)
    values(null,'update',now(),new.id,
    concat('修改前(id:',old.id,', name:',old.name,', age:',old.age,', salary:',old.salary,') , 修改后(id'
    ,new.id, 'name:',new.name,', age:',new.age,', salary:',new.salary,')'));
end $
DELIMITER ;
        
-- 创建delete 行的触发器 , 完成删除数据时的日志记录 :
DELIMITER $
create trigger emp_logs_delete_trigger
after delete
on emp
for each row
begin
    insert into emp_logs (id,operation,operate_time,operate_id,operate_params)
    values(null,'delete',now(),old.id,
    concat('删除前(id:',old.id,', name:',old.name,', age:',old.age,', salary:',old.salary,')'));
end $
DELIMITER ;
```

#### 删除触发器
```sql
-- 如果没有指定 schema_name，默认为当前数据库 。        
drop trigger [schema_name.]trigger_name 
```

#### 查看触发器
```sql
-- 查看触发器的状态、语法等信息。
show triggers; 
```

## 锁

### 锁分类
- 从对数据操作的粒度分 ：
    - 1） 表锁：操作时，会锁定整个表。
    - 2） 行锁：操作时，会锁定当前操作行。

&emsp; 表级锁更适合于以查询为主，只有少量按索引条件更新数据的应用，如Web 应用；而行级锁则更适合于有大量按索引条件并发更新少量不同数据，同时又有并查询的应用，如一些在线事务处理（OLTP）系统。

- 从对数据操作的类型分：
    - 1） 读锁（共享锁）：针对同一份数据，多个读操作可以同时进行而不会互相影响。
    - 2） 写锁（排它锁）：当前操作没有完成之前，它会阻断其他写锁和读锁。

&emsp; 读锁会阻塞写，但是不会阻塞读。而写锁，则既会阻塞读，又会阻塞写。

- 对于UPDATE、DELETE和INSERT语句，InnoDB会自动给涉及数据集加排他锁（X)；
- 对于普通SELECT语句，InnoDB不会加任何锁；
```sql
-- 可以通过以下语句显示给记录集加共享锁或排他锁 。
-- 共享锁（S）：
SELECT * FROM table_name WHERE ... LOCK IN SHARE MODE
-- 排他锁（X) ：
SELECT * FROM table_name WHERE ... FOR UPDATE  -- （悲观锁）
```

### for update：（一个原则：一锁二判三更新）
- for update是在数据库中上锁用的，可以为数据库中的行上一个排它锁。当一个事务的操作未完成时候，其他事务可以读取，但是不能写入或更新。
- 默认是行级别的锁，当有明确指定的主键/索引时候，是行级锁。否则是表级别。
- for update 仅适用于InnoDB，并且必须开启事务，在begin与commit之间才生效。
- 如果没查到记录会加锁吗？会的。有主键/索引产生间隙锁，无主键/索引产生表锁表级锁。

### 悲观锁
&emsp; 在读取数据时添加排它锁行锁，阻止其他进程访问，适合写入频繁的场景。
```sql
begin;
select * from goods where id = 1 for update;
update goods set stock = stock - 1 where id = 1;
commit;
```

### 乐观锁
&emsp; 不添加锁，在更新数据时判断程序中的库存量和数据库中的库存量是否相等，相等则更新数据，否则，从数据库中重新获取库存量，直到数据更新成功，适用于读频繁的场景。
```sql
-- 不加锁获取 id=1 的商品对象
select * from goods where id = 1
begin;

-- 更新 stock 值，只有程序中获取到的库存量与数据库中的库存量相等才执行更新
update goods set stock = stock - 1 where id = 1 and stock = cur_stock;
commit;
```

- 如果执行了更新语句，会对这一行数据加上排他锁（写锁），提交commit之后，会释放锁。另外一个线程update语句才可以执行解除阻塞状态。前提是两个线程操作同一行数据。
- 如果不通过索引条件检索数据，那么InnoDB将对表中的所有记录加锁，实际效果跟表锁一样。
- 当我们用范围条件，而不是使用相等条件检索数据，并请求共享或排他锁时，InnoDB会给符合条件的已有数据进行加锁； 对于键值在条件范围内但并不存在的记录，叫做 "间隙（GAP）" ，InnoDB也会对这个 "间隙" 加锁，这种锁机制就是所谓的 间隙锁（Next-Key锁） 。


### 锁的优化建议
- 尽可能让所有数据检索都能通过索引来完成，避免无索引行锁升级为表锁。
- 合理设计索引，尽量缩小锁的范围
- 尽可能减少索引条件，及索引范围，避免间隙锁
- 尽量控制事务大小，减少锁定资源量和时间长度
- 尽可使用低级别事务隔离（但是需要业务层面满足需求）

## 事务

### 事务的四大特征
1. 原子性：是不可分割的最小操作单位，要么同时成功，要么同时失败。通过undo log实现原子性。
2. 持久性：当事务提交或回滚后，数据库会持久化的保存数据。通过redo log实现持久性。
3. 隔离性：多个事务之间。相互独立。
4. 一致性：事务操作前后，数据总量不变

### 事务的隔离级别
&emsp; 概念：多个事务之间隔离的，相互独立的。但是如果多个事务操作同一批数据，则会引发一些问题，设置不同的隔离级别就可以解决这些问题。

&emsp; 存在问题：
1. 脏读：一个事务，读取到另一个事务中没有提交的数据
2. 不可重复读(虚读)：在同一个事务中，两次读取到的数据不一样。
3. 幻读：一个事务操作(DML)数据表中所有记录，另一个事务添加了一条数据，则第一个事务查询不到新添加的数据

&emsp; 隔离级别：可靠性性高的，并发性能低
1. read uncommitted：读未提交；在该隔离级别，所有事务都可以看到其他未提交事务的执行结果。（ 产生的问题：脏读、不可重复读、幻读）
2. read committed：读已提交 （Oracle默认）一个事务只能看见已经提交事务所做的改变。同一select可能返回不同结果。（产生的问题：不可重复读、幻读）
3. repeatable read：可重复读 （MySQL默认隔离级别）同一事务的多个实例在并发读取数据时，会看到同样的数据行。(产生的问题：幻读)
4. serializable：串行化（ 可以解决所有的问题）

#### 数据库查询隔离级别
```sql
select @@tx_isolation;
```

#### 数据库设置隔离级别
```sql
set global transaction isolation level  `级别字符串`
```

#### 查看事务的默认提交方式
```sql
-- 1 代表自动提交  0 代表手动提交
SELECT @@autocommit;
```

#### 修改默认提交方式
```sql
set @@autocommit = 0;
```

## JOSN类型

&emsp; 前置准备
```sql
CREATE TABLE testproject (
   `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
   `skill` JSON NOT NULL,
   `student` JSON NOT NULL,
   PRIMARY KEY (`id`)
);

INSERT INTO `testproject` (student, skill) VALUES ('{"id": 1, "name": "ggjg"}', '["java", "go", "vue"]');
INSERT INTO `testproject` (student, skill) VALUES ('{"id": 5, "name": "guogege"}', '[]');
```

&emsp; 查询 json 中的数据用 column->path 的形式

&emsp; 其中对象类型 path 这样表示 $.path, 而数组类型则是 $[index]
```sql
-- 查询testproject表student字段中json对象id为1的记录：
SELECT * FROM testproject WHERE student->'$.id'= 1;
SELECT skill->'$[0]' FROM testproject;
```

&emsp; 也可以用函数json_extract
```sql
SELECT * FROM testproject WHERE json_extract(student,'$.id')= 1;
```

&emsp; column->path  和 json_extract 查出来结果包含双引号，使用JSON_UNQUOTE 或 ->> 
```sql
SELECT * FROM testproject WHERE student->> '$.id'= 1;
```

&emsp; JSON_CONTAINS:（用JSON_CONTAINS(字段,JSON_OBJECT(‘json属性’, “内容”))）
```sql
-- 查询json数组里面对象的id等于142的记录
select * from log2 where JSON_CONTAINS(data,JSON_OBJECT('id', "142"))
```

&emsp; field自定义排序函数的格式(将获取出来的数据根据str1,str2,str3,str4等的顺序排序)
```sql
-- 语法：order by field(value,str1,str2,str3,str4,,,,,,strn)，其中value后面的参数自定义，不限制参数个数 
select * from driver_log order by field(name,'Suzi','Ben','Henry');
```

## MySQL查用工具

### 1、mysql
```shell
# 语法
    mysql [options] [database]
# 参数：
    -u, --user=name #指定用户名
    -p, --password[=name] #指定密码
    -h, --host=name #指定服务器IP或域名
    -P, --port= #指定连接端口
    -e, --execute=sql #执行SQL语句并退出
```

### 2、mysqladmin
&emsp; mysqladmin是一个执行管理操作的客户端程序。可以用它来检查服务器的配置和当前状态、创建并删除数据库等。

### 3、mysqlbinlog
&emsp; 由于服务器生成的二进制日志文件以二进制格式保存，所以如果想要检查这些文本的文本格式，就会使用到mysqlbinlog日志管理工具。
```shell 
# 语法：
    mysqlbinlog [options] log-files1 log-files2 ...
# 参数：
    -d, --database=name #指定数据库名称，只列出指定的数据库相关操作。
    -o, --offset=# #忽略掉日志中的前n行命令。
    -r,--result-file=name #将输出的文本格式日志输出到指定文件。
    -s, --short-form #显示简单格式， 省略掉一些信息。
    --start-datatime=date1 --stop-datetime=date2 #指定日期间隔内的所有日志。
    --start-position=pos1 --stop-position=pos2 #指定位置间隔内的所有日志。
```
### 4、mysqldump
&emsp; mysqldump 客户端工具用来备份数据库或在不同数据库之间进行数据迁移。备份内容包含创建表，及插入表的SQL语句。
```shell
# 语法：
    mysqldump [options] db_name [tables]
    mysqldump [options] --database/-B db1 [db2 db3...]
    mysqldump [options] --all-databases/-A
# 参数：
    -u, --user=name #指定用户名
    -p, --password[=name] #指定密码
    -h, --host=name #指定服务器IP或域名
    -P, --port=name #指定连接端口
    --add-drop-database #在每个数据库创建语句前加上 Drop database 语句
    --add-drop-table #在每个表创建语句前加上 Drop table 语句 , 默认开启 ; 不开启(--skip-add-drop-table)
    -n, --no-create-db #不包含数据库的创建语句
    -t, --no-create-info #不包含数据表的创建语句
    -d --no-data #不包含数据
    -T, --tab=name #自动生成两个文件：一个.sql文件，创建表结构的语句；一个.txt文件，数据文件，相当于select into outfile
```

### 5、mysqlimport/source
&emsp; mysqlimport 是客户端数据导入工具，用来导入mysqldump 加 -T 参数后导出的文本文件。
```shell
# 语法：
    txt文件：mysqlimport [options] db_name textfile1 [textfile2...]
    sql文件：source /root/tb_book.sql
```

### 6、mysqlshow
&emsp; mysqlshow 客户端对象查找工具，用来很快地查找存在哪些数据库、数据库中的表、表中的列或者索引。
```shell    
# 语法
    mysqlshow [options] [db_name [table_name [col_name]]]
# 参数：
    --count # 显示数据库及表的统计信息（数据库，表 均可以不指定）
    -i # 显示指定数据库或者指定表的状态信息 
```

### 7、mysqlslap
&emsp; mysqlslap：mysql自带的基准测试工具，可以模拟多个客户端对MySQL服务器进行并发执行sql语句，还可以指定存储引擎。

#### 基准测试
- 数据库的基准测试是对数据库的性能指标进行定量的、可复现的、可对比的测试；
- 基准测试不关心业务逻辑，更加简单、直接、易于测试；数据可由工具生成，不要求真实；
- 基准测试的作用就是分析在当前的配置下，数据库的性能表现，从而找到MySQL的性能阈值，并根据实际系统的要求调整配置。

#### 基准测试的指标
- TPS/QPS：衡量吞吐量；
- 响应时间：（平均响应时间、最小响应时间、最大响应时间、时间百分比）
- 并发量：同时处理的查询请求的数量

#### 测试流程
1. 建立测试数据库schema和待测试的表tables；
2. 根据table的结果，利用脚本生成一定数量的有效随机数据；
3. 用mysqlslap对相应的query语句进行测试；
4. 结果数据的分析

```shell
--auto-generate-sql( -a) # 自动生成测试表和数据，表示用mysqlslap工具自己生成的SQL脚本来测试并发压力；
--auto-generate-sql-load-type=type # 测试语句的类型。测试的是读还是写还是两者混合的。取值包括：read，key，write，update和mixed(默认)；
--auto-generate-sql-add-auto-increment # 代表对生成的表自动添加auto_increment列，从5.1.18版本开始支持；
--number-char-cols=N（ -x N） # 自动生成的测试表中包含多少个字符类型的列，默认1；
--number-int-cols=N（-y N） # 自动生成的测试表中包含多少个数字类型的列，默认1；
--number-of-queries=N # 总共要运行多少次查询。每个客户运行的查询数量可以用查询总数/并发数来计算；
--query=name（-q） # 使用自定义脚本执行测试；
--create-schema # 代表自定义的测试库名称，测试的database，默认为mysqlslap。
--commint=N  # 多少条DML后提交一次；
--concurrency=N（ -c N） # 表示并发量。可指定多个值，以逗号或者--delimiter参数指定的值做为分隔符；
--delimiter # 指定的值作为分隔符；
--engine=engine_name（-e engine_name） # 代表要测试的引擎，可以有多个，用分隔符隔开。例如：--engines=myisam,innodb；
--iterations=N（-i N） # 测试执行的迭代次数，要运行这些测试多少次；
--only-print # 只打印测试sql，不真正操作数据库；
--debug-info（-T） # 打印内存和CPU的相关信息；
--no-drop # 执行完成后不删除数据。
```

## 数据库权限分配
```sql
-- 将数据库所有权限分配给用户
GRANT ALL PRIVILEGES ON 数据库名.* To '用户名'@'%';
GRANT ALL PRIVILEGES ON bcs_new.* To 'bcs'@'%';
```

