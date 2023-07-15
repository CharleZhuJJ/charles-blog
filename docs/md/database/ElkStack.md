# ELK Stack

&emsp; The Elastic Stack, 包括 Elasticsearch、Kibana、Beats 和 Logstash（也称为 ELK Stack）。能够安全可靠地获取任何来源、任何格式的数据，然后实时地对数据进行搜索、分析和可视化。Elaticsearch，简称为 ES， ES 是一个开源的高扩展的分布式全文搜索引擎，是整个 ElasticStack 技术栈的核心。它可以近乎实时的存储、检索数据；本身扩展性很好，可以扩展到上百台服务器，处理 PB 级别的数据。
![ElkStack](/public/database/elk/ElkStack.png)

- Elasticsearch
    - Elasticsearch 基于java，基于Lucene，是个开源分布式搜索引擎，它的特点有：分布式，零配置，自动发现，索引自动分片，索引副本机制，restful风格接口，多数据源，自动搜索负载，近实时搜索等。
- Logstash
    - Logstash 基于java，是一个开源的用于收集,分析和存储日志的工具。（数据抽取转化工具）一般工作方式为c/s架构，client端安装在需要收集信息的主机上，server端负责将收到的各节点日志进行过滤、修改等操作在一并发往elasticsearch或其他组件上去。 
- Kibana
    - Kibana 基于nodejs，也是一个开源和免费的工具，Kibana可以为 Logstash 和 ElasticSearch 提供的日志分析友好的Web 界面，可以汇总、分析和搜索重要数据日志。
- Beats
    - Beats是elastic公司开源的一款采集系统监控数据的代理agent，是在被监控服务器上以客户端形式运行的数据收集器的统称，可以直接把数据发送给Elasticsearch或者通过Logstash发送给Elasticsearch，然后进行后续的数据分析活动。
    - Beats由如下组成:
        - Packetbeat：是一个网络数据包分析器，用于监控、收集网络流量信息，Packetbeat嗅探服务器之间的流量，解析应用层协议，并关联到消息的处理，其支 持ICMP (v4 and v6)、DNS、HTTP、Mysql、PostgreSQL、Redis、MongoDB、Memcache等协议；
        - Filebeat：用于监控、收集服务器日志文件，其已取代 logstash forwarder；
        - Metricbeat：可定期获取外部系统的监控指标信息，其可以监控、收集 Apache、HAProxy、MongoDB、MySQL、Nginx、PostgreSQL、Redis、System、Zookeeper等服务；
        - Winlogbeat：用于监控、收集Windows系统的日志信息；
        - Auditbeat：轻量型审计日志采集器。收集您 Linux 审计框架的数据，监控文件完整性。
        - Heartbeat：面向运行状态监测的轻量型采集器。通过主动探测来监测服务的可用性。通过给定 URL 列表，Heartbeat 仅仅询问：网站运行正常吗？Heartbeat 会将此信息和响应时间发送至 Elastic 的其他部分，以进行进一步分析。
        - Functionbeat：面向云端数据的无服务器采集器。在作为一项功能部署在云服务提供商的功能即服务 (FaaS) 平台上后，Functionbeat 即能收集、传送并监测来自您的云服务的相关数据。

## Elasticsearch
&emsp; Elasticsearch是一个基于Lucene的搜索服务器。它提供了一个分布式多用户能力的全文搜索引擎，基于RESTful web接口。Elasticsearch是用Java语言开发的，并作为Apache许可条款下的开放源码发布，是一种流行的企业级搜索引擎。

&emsp; Elasticsearch数据格式：ES 里的 Index 可以看做一个库，而 Types 相当于表，Documents 则相当于表的行。这里 Types 的概念已经被逐渐弱化，Elasticsearch 6.X 中，一个 index 下已经只能包含一个type。
![EsDataType](/public/database/elk/EsDataType.png)

&emsp; ElasticSearch通常用于网站的全文检索，这意味着ElasticSearch将承担着整个系统最大搜索量的搜索业务。然而在如此大数据量的情况下，ElasticSearch仍然能够非常出色的完成任务： 

示例：

&emsp; 关系型数据库中的数据表
```
+----+------------+
| id | name       |
+----+------------+
|  1 | zhang san  |
|  2 | zhang san2 |
|  3 | zhang san3 |
|  4 | li si      |
+----+------------+
```
&emsp; 假设这张数据表的数据量非常庞大，若是想进行模糊查询，查询姓 zhang 的用户信息，那么它的效率一定是很低的，因为它需要从第一条数据开始遍历到最后一条数据。来看看ElasticSearch是如何做的，它采用的是一种叫 倒排索引 的方式，即：在插入数据的时候就建立了一张关键字与id的对应表：
```
+---------+-------+
| keyword | id    |
+----+------------+
|  zhang  | 1,2,3 |
|   san   | 1,2,3 |
|    li   |   4   |
|    si   |   4   |
+---------+-------+
```
&emsp; 它会将名字中的关键字提取出来，并记录当前id拥有哪些关键字，将其存放起来，此时我们查询姓 zhang 的用户信息时，我们将直接得到姓 zhang 的用户id为 1、2、3 ，然后通过id找到用户信息即可，查询效率大幅提升了。	


### es相关名词解释

#### 索引（Index）
&emsp; 一个索引就是一个拥有几分相似特征的文档的集合。一个索引由一个名字来标识（必须全部是小写字母），并且当我们要对这个索引中的文档进行索引、搜索、更新和删除的时候，都要使用到这个名字。在一个集群中，可以定义任意多的索引。能搜索的数据必须索引，这样的好处是可以提高查询速度，比如：新华字典前面的目录就是索引的意思，目录可以提高查询速度。

&emsp; Elasticsearch 索引的精髓：一切设计都是为了提高搜索的性能。


#### 文档（Document）
&emsp; es中的最小数据单元

&emsp; 一个文档是一个可被索引的基础信息单元，也就是一条数据。文档以 JSON（Javascript Object Notation）格式来表示，而 JSON 是一个到处存在的互联网数据交互格式。在一个 index 里面，你可以存储任意多的文档。

#### 字段（Field）
&emsp; 相当于是数据表的字段，对文档数据根据不同属性进行的分类标识。每个字段可能多次出现在一个文档里，这样的字段叫多值字段（multivalued）

#### 映射（Mapping）
&emsp;mapping 是处理数据的方式和规则方面做一些限制，如：某个字段的数据类型、默认值、分析器、是否被索引等等。这些都是映射里面可以设置的，其它就是处理 ES 里面数据的一些使用规则设置也叫做映射，按着最优规则处理数据对性能提高很大，因此才需要建立映射，并且需要思考如何建立映射才能对性能更好。

#### 分片（Shards）
&emsp; 一个索引可以存储超出单个节点硬件限制的大量数据。比如，一个具有 10 亿文档数据的索引占据 1TB 的磁盘空间，而任一节点都可能没有这样大的磁盘空间。或者单个节点处理搜索请求，响应太慢。为了解决这个问题，Elasticsearch 提供了将索引划分成多份的能力，每一份就称之为分片。当你创建一个索引的时候，你可以指定你想要的分片的数量。每个分片本身也是一个功能完善并且独立的“索引”，这个“索引”可以被放置到集群中的任何节点上。

&emsp; 分片很重要，主要有两方面的原因：
1. 允许你水平分割 / 扩展你的内容容量。
2. 允许你在分片之上进行分布式的、并行的操作，进而提高性能/吞吐量。

&emsp; 至于一个分片怎样分布，它的文档怎样聚合和搜索请求，是完全由 Elasticsearch 管理的，对于作为用户的你来说，这些都是透明的，无需过分关心。
能正常提供查询和插入的分片我们叫做主分片（primary shard），其余的我们就管他们叫做备份的分片（replica shard）。

#### 副本（Replicas）
&emsp; 在一个网络 / 云的环境里，失败随时都可能发生，在某个分片/节点不知怎么的就处于离线状态，或者由于任何原因消失了，这种情况下，有一个故障转移机制是非常有用并且是强烈推荐的。为此目的，Elasticsearch 允许你创建分片的一份或多份拷贝，这些拷贝叫做复制分片(副本)。

&emsp; 复制分片之所以重要，有两个主要原因：
1. 在分片/节点失败的情况下，提供了高可用性。因为这个原因，注意到复制分片从不与原/主要（original/primary）分片置于同一节点上是非常重要的。
2. 扩展你的搜索量/吞吐量，因为搜索可以在所有的副本上并行运行。

&emsp; 总之，每个索引可以被分成多个分片。一个索引也可以被复制 0 次（意思是没有复制）或多次。一旦复制了，每个索引就有了主分片（作为复制源的原来的分片）和复制分片（主分片的拷贝）之别。分片和复制的数量可以在索引创建的时候指定。在索引创建之后，你可以在任何时候动态地改变复制的数量，但是你事后不能改变分片的数量。

&emsp; 默认情况下，Elasticsearch 中的每个索引被分片 1 个主分片和 1 个复制，这意味着，如果你的集群中至少有两个节点，你的索引将会有 1 个主分片和另外 1 个复制分片（1 个完全拷贝），这样的话每个索引总共就有 2 个分片，我们需要根据索引需要确定分片个数。


### es安装
``` shell
#创建elsearch用户，Elasticsearch不支持root用户运行
useradd elsearch

#解压安装包
tar -xvf elasticsearch-6.5.4.tar.gz -C /itcast/es/

#修改配置文件
vim conf/elasticsearch.yml
network.host: 0.0.0.0 #设置ip地址，任意网络均可访问

#启动ES服务
su - elsearch
cd bin
./elasticsearch 或 ./elasticsearch -d #后台启动

# 启动成功后，访问9200端口
```

### es常用的配置项
``` shell
cluster.name: 
# 配置elasticsearch的集群名称，默认是elasticsearch。建议修改成一个有意义的名称。
 
node.name:
# 节点名，通常一台物理服务器就是一个节点，es会默认随机指定一个名字，建议指定一个有意义的名称，方便管理
# 一个或多个节点组成一个cluster集群，集群是一个逻辑的概念，节点是物理概念。
 
path.conf: 
# 设置配置文件的存储路径，tar或zip包安装默认在es根目录下的config文件夹，rpm安装默认在/etc/elasticsearch
 
path.data:
# 设置索引数据的存储路径，默认是es根目录下的data文件夹，可以设置多个存储路径，用逗号隔开。
 
path.logs:
# 设置日志文件的存储路径，默认是es根目录下的logs文件夹
 
path.plugins: 
# 设置插件的存放路径，默认是es根目录下的plugins文件夹
 
bootstrap.memory_lock: true
# 设置为true可以锁住ES使用的内存，避免内存与swap分区交换数据。
 
network.host: 
# 设置绑定主机的ip地址，设置为0.0.0.0表示绑定任何ip，允许外网访问，生产环境建议设置为具体的ip。
 
http.port: 9200
# 设置对外服务的http端口，默认为9200。
 
transport.tcp.port: 9300  
# 集群结点之间通信端口
    
node.master: 
# 指定该节点是否有资格被选举成为master结点，默认是true，如果原来的master宕机会重新选举新的master。
 
node.data: 
# 指定该节点是否存储索引数据，默认为true。
 
node.ingest: 
# 是否允许成为协调节点
 
discovery.zen.ping.unicast.hosts: ["host1:port", "host2:port", "..."]
# 设置集群中master节点的初始列表。
 
discovery.zen.ping.timeout: 3s
# 设置ES自动发现节点连接超时的时间，默认为3秒，如果网络延迟高可设置大些。
 
discovery.zen.minimum_master_nodes:
# 主结点数量的最少值 ,此值的公式为：(master_eligible_nodes / 2) + 1 ，比如：有3个符合要求的主结点，那么这里要设置为2。
 
node.max_local_storage_nodes: 
# 单机允许的最大存储结点数，通常单机启动一个结点建议设置为1，开发环境如果单机启动多个节点可设置大于1。
```    

### es集群

#### 集群的发现机制
&emsp; ES 内部是如何通过一个相同的设置 cluster.name 就能将不同的节点连接到同一个集群的？

&emsp; 答案是 Zen Discovery。
- Zen Discovery 是 Elasticsearch 的内置默认发现模块（发现模块的职责是发现集群中的节点以及选举 Master 节点）。
- 它提供单播和基于文件的发现，并且可以扩展为通过插件支持云环境和其他形式的发现。
- Elasticsearch 默认被配置为使用单播发现，以防止节点无意中加入集群。只有在同一台机器上运行的节点才会自动组成集群。
- 如果集群的节点运行在不同的机器上，使用单播，你可以为 Elasticsearch 提供一些它应该去尝试连接的节点列表。当一个节点联系到单播列表中的成员时，它就会得到整个集群所有节点的状态，然后它会联系 Master 节点，并加入集群。这意味着单播列表不需要包含集群中的所有节点， 它只是需要足够的节点，当一个新节点联系上其中一个并且说上话就可以了。
- 节点启动后先 Ping ，如果 discovery.zen.ping.unicast.hosts 有设置，则 Ping 设置中的 Host ，否则尝试 ping localhost 的几个端口。

#### 集群的选举机制
- 选举开始，先从各节点认为的 Master 中选，规则很简单，按照 ID 的字典序排序，取第一个。如果各节点都没有认为的 Master ，则从所有节点中选择，规则同上。这里有个限制条件就是 discovery.zen.minimum_master_nodes ，如果节点数达不到最小值的限制，则循环上述过程，直到节点数足够可以开始选举。
- 最后选举结果是肯定能选举出一个 Master ，如果只有一个 Local 节点那就选出的是自己。
- 如果当前节点是 Master ，则开始等待节点数达到 discovery.zen.minimum_master_nodes，然后提供服务。
- 如果当前节点不是 Master ，则尝试加入 Master 。Elasticsearch 将以上服务发现以及选主的流程叫做 Zen Discovery 。
- 由于它支持任意数目的集群（ 1- N ），所以不能像 Zookeeper 那样限制节点必须是奇数，也就无法用投票的机制来选主，而是通过一个规则。只要所有的节点都遵循同样的规则，得到的信息都是对等的，选出来的主节点肯定是一致的。
- 但分布式系统的问题就出在信息不对等的情况，这时候很容易出现脑裂（Split-Brain）的问题。大多数解决方案就是设置一个 Quorum 值，要求可用节点必须大于 Quorum（一般是超过半数节点），才能对外提供服务。而 Elasticsearch 中，这个 Quorum 的配置就是 discovery.zen.minimum_master_nodes 

#### 脑裂现象
&emsp; 同时如果由于网络或其他原因导致集群中选举出多个 Master 节点，使得数据更新时出现不一致，这种现象称之为脑裂，即集群中不同的节点对于 Master 的选择出现了分歧，出现了多个 Master 竞争。

- 脑裂问题的原因：
    - 网络问题： 集群间的网络延迟导致一些节点访问不到Master，认为Master挂掉了，从而选举出新的Master，并对Master上的分片和副本标红，分配新的主分片
    - 节点负载： 主节点的角色既为 Master 又为 Data，访问量较大时可能会导致 ES 停止响应（假死状态）造成大面积延迟，此时其他节点得不到主节点的响应认为主节点挂掉了，会重新选取主节点。
    - 内存回收： 主节点的角色既为 Master 又为 Data，当 Data 节点上的 ES 进程占用的内存较大，引发 JVM 的大规模内存回收，造成 ES 进程失去响应。
- 优化措施：
    - 适当调大响应时间，减少误判。 通过参数 discovery.zen.ping_timeout 设置节点状态的响应时间，默认为 3s，可以适当调大。如果 Master 在该响应时间的范围内没有做出响应应答，判断该节点已经挂掉了。调大参数（如 6s，discovery.zen.ping_timeout:6），可适当减少误判。
    - 选举触发。 我们需要在候选集群中的节点的配置文件中设置参数 discovery.zen.munimum_master_nodes 的值。这个参数表示在选举主节点时需要参与选举的候选主节点的节点数，默认值是 1，官方建议取值(master_eligibel_nodes / 2)+1，其中 master_eligibel_nodes 为候选主节点的个数。这样做既能防止脑裂现象的发生，也能最大限度地提升集群的高可用性，因为只要不少于 discovery.zen.munimum_master_nodes 个候选节点存活，选举工作就能正常进行。当小于这个值的时候，无法触发选举行为，集群无法使用，不会造成分片混乱的情况。
    - 角色分离。 候选主节点和数据节点进行角色分离，这样可以减轻主节点的负担，防止主节点的假死状态发生，减少对主节点“已死”的误判。


#### 数据路由
&emsp; 一个文档，最终会落在主分片的一个分片上，到底应该在哪一个分片？ 这就是数据路由。

路由算法（哈希值对主分片数取模）

&emsp; shard = hash(routing) % number_of_primary_shards  

&emsp; （ routing默认为文档_id；可能是手动指定，也可能是自动生成）
```
// 手动指定 routing number
PUT /test_index/_doc/15?routing=num
{
    "num": 0,
    "tags": []
}
```
场景：

&emsp;  在程序中，架构师可以手动指定已有数据的一个属性为路由值，好处是可以定制一类文档数据存储到一个分片中。缺点是设计不好，会造成数据倾斜。

&emsp; 所以，不同文档尽量放到不同的索引中。剩下的事情交给es集群自己处理。


#### 文档的增删改内部机制

##### 增删改 
&emsp; 增删改可以看做update,都是对数据的改动。一个改动请求发送到es集群，具体流程如下：
- 客户端向 ES1 节点（协调节点）发送写请求，通过路由计算公式得到值为 0，则当前数据应被写到主分片 S0 上。
- ES1 节点将请求转发到 S0 主分片所在的节点 ES3，ES3 接受请求并写入到磁盘。
- 并发将数据复制到两个副本分片 R0 上，其中通过乐观并发控制数据的冲突。一旦所有的副本分片都报告成功，则节点 ES3 将向协调节点报告成功，协调节点向客户端报告成功。
![EsWriteData](/public/database/elk/EsWriteData.png)

##### 查询
1. 客户端发送请求到任意一个节点，成为协调节点
2. 协调节点对文档进行路由，将请求转发到对应的节点，此时会使用round-robin随机轮询算法，在主分片以及其所有副本分片中随机选择一个，让读请求负载均衡
3. 接收请求的节点返回文档给协调节点
4. 协调节点返回文档给客户端
5. 特殊情况：文档如果还在建立索引过程中，可能只有主分片有，任何一个副本分片都没有，此时可能会导致无法读取到文档，但是文档完成索引建立之后，主分片和副本分片就都有了。

### es存储原理
- 分段存储
- 延迟写
- 段合并

#### 写索引的流程：（延迟写）
- 一个新文档被索引之后，先被写入到内存中，但是为了防止数据的丢失，会追加一份数据到事务日志中。
- 不断有新的文档被写入到内存，同时也都会记录到事务日志中。这时新数据还不能被检索和查询。
- 当达到默认的刷新时间或内存中的数据达到一定量后，会触发一次  Refresh，将内存中的数据以一个新段形式刷新到文件缓存系统中并清空内存。这时虽然新段未被提交到磁盘，但是可以提供文档的检索功能且不能被修改。
- 随着新文档索引不断被写入，当日志数据大小超过 512M 或者时间超过 30 分钟时，会触发一次 Flush。
- 通过这种方式当断电或需要重启时，ES 不仅要根据提交点去加载已经持久化过的段，还需要工具 Translog 里的记录，把未持久化的数据重新持久化到磁盘上，避免了数据丢失的可能。
![EsWriteIndex](/public/database/elk/EsWriteIndex.png)


### 分词器 analyzer
&emsp;作用：切分词语，normalization，提升recall召回率（搜索的时候，增加能够搜索到的结果的数量）

&emsp; 给你一段句子，然后将这段句子拆分成一个一个的单个的单词，同时对每个单词进行normalization（时态转换，单复数转换）


#### analyzer 组成部分

##### character filter
&emsp; 在一段文本进行分词之前，先进行预处理，比如说最常见的就是，过滤html标签

&emsp;（\<span>hello\<span> --> hello），& --> and（I&you --> I and you）

##### tokenizer
&emsp; 分词 hello you and me --> hello, you, and, me

##### token filter
lowercase（Tom --> tom）

stop word（a/the/an）

synonymom（dogs --> dog，liked --> like，mother --> mom，small --> little）

&emsp; 一个分词器，很重要，将一段文本进行各种处理，最后处理好的结果才会拿去建立倒排索引。


#### 重建倒排索引
&emsp; normalization正规化，建立倒排索引的时候，会执行一个操作，也就是说对拆分出的各个单词进行相应的处理，以提升后面搜索的时候能够搜索到相关联的文档的概率时态的转换，单复数的转换，同义词的转换，大小写的转换。
```
mom ―> mother
liked ―> like
small ―> little
dogs ―> dog
```

### es的http操作

#### 索引操作

##### 1、创建索引
&emsp; 对比关系型数据库，创建索引就等同于创建数据库
```shell
PUT请求：http://127.0.0.1:9200/索引名
# 返回结果:
    {
        "acknowledged": true,  #【响应结果】: true（操作成功）
        "shards_acknowledged": true, #【分片结果】: true（分片操作成功）；创建索引库的分片数默认1片，在7.0.0之前版本中，默认5片
        "index": "shopping" # 索引名称
    }
```    

##### 2、查看所有索引
&emsp; 类似于MySQL中的show tables
```shell 
GET请求：http://127.0.0.1:9200/_cat/indices?v
# 参数说明：
    a) _cat 表示查看的意思;
    b) indices表示索引
# 返回结果：
    health status index    uuid                   pri rep docs.count docs.deleted store.size pri.store.size
    yellow open   shopping 4h4Dmkn4TvWvkYcmHFeqFA   1   1          0            0       208b           208b
    表头说明：
        a) health：当前服务器健康状态; green(集群完整) yellow(单点正常、集群不完整) red(单点不正常)
        b) status：索引打开、关闭状态
        c) index：索引名
        d) uuid：索引统一编号
        e) pri：主分片数量
        f) rep：副本数量
        g) docs.count：可用文档数量
        h) docs.deleted：文档删除状态（逻辑删除）
        i) store.size：主分片和副分片整体占空间大小
        j) pri.store.size：主分片占空间大小
```

##### 3、查看单个索引
&emsp; 查看索引发送的请求路径和创建索引是一致的。但是HTTP方法不一致
```shell
GET请求：http://127.0.0.1:9200/shopping
# 返回结果：
    {
        "shopping": { # 索引名
            "aliases": {}, # 别名
            "mappings": {}, # 映射
            "settings": { # 设置
                "index": { # 索引的设置
                    "creation_date": "1663071606626",  # 创建时间
                    "number_of_shards": "1", # 主分片数量
                    "number_of_replicas": "1", # 副本分片数量
                    "uuid": "4h4Dmkn4TvWvkYcmHFeqFA", # 唯一索引
                    "version": { # 版本信息
                        "created": "7080099"
                    },
                    "provided_name": "shopping" # 名称
                }
            }
        }
    }
```

##### 4、删除索引
```shell
DELETE请求 ：http://127.0.0.1:9200/shopping
```

#### 文档操作

##### 1、创建文档
&emsp; 文档可以类比为关系型数据库中的表数据，添加的数据格式为JSON格式
```shell
POST请求：http://127.0.0.1:9200/shopping/_doc 
# 返回结果：
    {
        "_index": "shopping", # 索引名
        "_type": "_doc", # 类型：文档类型
        "_id": "tN_bNoMBYY62oGdvcQCo", # 唯一标识，随机生成；长度为20个字符，URL安全，base64编码，GUID，分布式生成不冲突 
        "_version": 1, # 版本
        "result": "created", # 结果：create表示创建成功
        "_shards": { # 分片
            "total": 2,  # 总数
            "successful": 1, # 成功
            "failed": 0 # 失败
        },
        "_seq_no": 0,
        "_primary_term": 1
    }
# 上述例子的唯一标识是随机的，如果想要自定义唯一标识，创建时需要指定
    POST请求：http://127.0.0.1:9200/shopping/_doc/1  （自定义ID为1）
```

##### 2、查看文档
&emsp; 需要指明文档的唯一性标识，类似于MySQL中数据的主键查询
```shell
GET请求：http://127.0.0.1:9200/shopping/_doc/1
# 返回结果：
    {
        "_index": "shopping", # 索引名
        "_type": "_doc",
        "_id": "1",
        "_version": 1,
        "_seq_no": 1,
        "_primary_term": 1,
        "found": true, #  查询结果，true为找到
        "_source": { # 文档源信息
            "title": "小米手机",
            "category": "小米",
            "images": "http://www.gulixueyuan.com/xm.jpg",
            "price": 3999
        }
    }
```

##### 3、修改文档
&emsp; 和新增文档一样，输入相同的URL地址请求，如果请求体变化，会将原有的数据内容覆盖
```shell
POST 请求 ：http://127.0.0.1:9200/shopping/_doc/1
返回结果：
    {
    "_index": "shopping",
    "_type": "_doc",
    "_id": "1",
    "_version": 2, # 版本信息
    "result": "updated", # 结果：update表示数据被更新
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 2,
    "_primary_term": 2
}
        
# 为防止覆盖原有数据，我们在新增时，设置为强制创建，不会覆盖原有文档；如果已经存在，会返回创建失败
PUT请求： /test_index/_doc/id/_create
```

##### 4、修改字段
&emsp; 只修改某一给条数据的局部信息
```shell
POST请求 ：http://127.0.0.1:9200/shopping/_update/1
请求体：
    {
        "doc": {
            "price":3000.00
        }
    }
```    

##### 5、删除文档
&emsp; 删除一个文档不会立即从磁盘上移除，它只是被标记成已删除（逻辑删除）
```shell     
DELETE 请求 ：http://127.0.0.1:9200/shopping/_doc/1
# 返回结果：
    {
    "_index": "shopping",
    "_type": "_doc",
    "_id": "1",
    "_version": 4, # 对数据的操作，都会更新版本
    "result": "deleted", # deleted 表示数据被标记为删除
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 4,
    "_primary_term": 2
}
```

##### 6、删除多条文档
```shell
POST 请求 ：http://127.0.0.1:9200/shopping/_delete_by_query
请求体：
    {
        "query":{
            "match":{
                "price":4000.00
            }
        }
    }
# 返回结果：
    {
    "took": 2844, # 耗时
    "timed_out": false, # 是否超时
    "total": 2, # 总数
    "deleted": 2, # 删除数量
    "batches": 1,
    "version_conflicts": 0,
    "noops": 0,
    "retries": {
        "bulk": 0,
        "search": 0
    },
    "throttled_millis": 0,
    "requests_per_second": -1.0,
    "throttled_until_millis": 0,
    "failures": []
}
```

#### 映射操作
&emsp; 类似于数据库(database)中的表结构(table)

&emsp; 创建数据库表需要设置字段名称，类型，长度，约束等；索引库也一样，需要知道这个类型下有哪些字段，每个字段有哪些约束信息，这就叫做映射。

##### 1、创建映射
```shell
PUT 请求 ：http://127.0.0.1:9200/student/_mapping
请求体：
    {
        "properties": {
            "name":{ # 字段名
                "type": "text", # 数据类型
                "index": true # 是否索引，默认为 true，可以用来进行搜索
                "stroe": false # store：是否将数据进行独立存储，默认为 false
            },
            "sex":{ # 字段名
                "type": "text", # 数据类型
                "index": false # 是否索引，默认为 true，
            },
            "age":{ # 字段名
                "type": "long", # 数据类型
                "index": false # 是否索引，默认为 true，
            }
        }
    }

# 数据类型：
    1) String类型
        1.1）text：可分词
        1.2）keyword：不可分词，数据会作为完整字段进行匹配
    2) Numerical：数值类型
        2.1） 基本数据类型：long、integer、short、byte、double、float、half_float
        2.2） 浮点数的高精度类型：scaled_float
    3) Date：日期类型
    4) Array：数组类型
    5) Object：对象
```

##### 2、查看映射
```shell     
GET 请求 ：http://127.0.0.1:9200/student/_mapping
```

#### 高级查询
&emsp; 基于JSON提供完整的查询DSL来定义查询,DSL(Domain Specific Language特定领域语言）

##### 1、查询所有文档(match_all)
```shell
GET 请求 ：http://127.0.0.1:9200/student/_search
请求体：
    {
        "query": { # 这里的 query 代表一个查询对象，里面可以有不同的查询属性
            "match_all": {} # 查询类型，例如：match_all(代表查询所有)， match，term ，range 等等
        }
    }
# 返回结果：
    {
        "took": 2157, # 查询花费时间，单位毫秒
        "timed_out": false, # 是否超时
        "_shards": { # 分片信息
            "total": 1, # 总数
            "successful": 1, # 成功
            "skipped": 0, # 忽略
            "failed": 0 # 失败 
        },
        "hits": { # 搜索命中结果
            "total": { # 搜索条件匹配的文档总数
                "value": 5, # 总命中计数的值
                "relation": "eq" # 计数规则，eq 表示计数准确，gte 表示计数不准确
            },
            "max_score": 1.0, # 匹配度分值
            "hits": [...] # 命中结果集合
        }
    }
```    

##### 2、匹配查询(match)
&emsp; 把查询条件进行分词，然后进行查询，多个词条之间是or的关系
```shell     
GET 请求 ：http://127.0.0.1:9200/student/_search
请求体：
    {
        "query": {
            "match": {
                "name":"zhangsan"
            }
        }
    }
```    

##### 3、字段匹配查询(multi_match)
&emsp; 可以在多个字段中查询
```shell     
GET 请求 ：http://127.0.0.1:9200/student/_search
请求体：
    {
        "query": {
            "multi_match": {
                "query": "zhangsan",
                "fields": ["name","nickname"]
            }
        }
    }
```

##### 4、关键字精确查询(term)
&emsp; 精确的关键词匹配查询，不对查询条件进行分词。
```shell
GET 请求 ：http://127.0.0.1:9200/student/_search
请求体：
    {
    "query": {
        "term": {
            "name": {
                "value": "zhangsan"
            }
        }
    }
``` 

##### 5、多关键字精确查询(terms)
&emsp; 允许你指定多值进行匹配；如果这个字段包含了指定值中的任何一个值，那么这个文档满足条件，类似于mysql的in）  
```shell
GET 请求 ：http://127.0.0.1:9200/student/_search
请求体：
    {
        "query": {
            "terms": {
                "name": ["zhangsan","lisi"]
            }
        }
    }  
```

##### 6、指定查询字段
&emsp; 默认情况下，会把文档中保存在_source 的所有字段都返回。如果我们只想获取其中的部分字段，我们可以添加_source 的过滤
```shell
GET 请求 ：http://127.0.0.1:9200/student/_search
请求体：
    {
    "_source": ["name","nickname"],
    "query": {
        "terms": {
            "nickname": ["zhangsan"]
        }
    }
```     

##### 7、过滤字段
```shell
GET 请求 ：http://127.0.0.1:9200/student/_search
请求体：
    {
        "_source": {
            "excludes": ["name","nickname"]
        },
        "query": {
            "terms": {
                "nickname": ["zhangsan"]
            }
        }
    }   
```

##### 8、组合查询(bool)
&emsp; （`bool`把各种其它查询通过`must`（必须）、`must_not`（必须不）、`should`（应该）的方式进行组合）
```shell
GET 请求 ：http://127.0.0.1:9200/student/_search
{
    "query": {
        "bool": {
            "must": [
                {
                    "match": {
                        "name": "zhangsan"
                    }
                }
            ],
            "must_not": [
                {
                    "match": {
                        "age": "40"
                    }
                }
            ],
            "should": [
                {
                    "match": {
                        "sex": "男"
                    }
                }
            ]
        }
    }
}
```

##### 9、范围查询(range)
&emsp; 查询找出那些落在指定区间内的数字或者时间
```shell        
GET 请求 ：http://127.0.0.1:9200/student/_search
请求体：
    {
        "query": {
            "range": {
                "age": {
                    "gte": 30,
                    "lte": 35
                }
            }
        }
    }
```        

##### 10、模糊查询
&emsp; 返回包含与搜索字词相似的字词的文档
```shell
GET 请求 ：http://127.0.0.1:9200/student/_search
请求体：
    {
        "query": {
            "fuzzy": {
                "title": {
                    "value": "zhangsan",
                    "fuzziness": 2 # 编辑距离
                }
            }
        }
    }
# 编辑距离是将一个术语转换为另一个术语所需的一个字符更改的次数。这些更改可以包括：
    更改字符（box → fox）
    删除字符（black → lack）
    插入字符（sic → sick）
    转置两个相邻字符（act → cat）
# 为了找到相似的术语，fuzzy查询会在指定的编辑距离内创建一组搜索词的所有可能的变体或扩展。然后查询返回每个扩展的完全匹配。
# 通过 fuzziness 修改编辑距离。一般使用默认值 AUTO，根据术语的长度生成编辑距离。
```

##### 11、单字段排序(sort)
&emsp; 可以让我们按照不同的字段进行排序，并且通过 order指定排序的方式
```shell
GET 请求 ：http://127.0.0.1:9200/student/_search
请求体：
    {
        "query": {
            "match": {
                "name":"zhangsan"
            }
        },
        "sort": [{
            "age": {
                "order":"desc"
            }
        }]
    }
```    

##### 12、多字段排序
```shell     
GET 请求 ：http://127.0.0.1:9200/student/_search
请求体：
    {
        "query": {
            "match_all": {}
        },
        "sort": [
            {
                "age": {
                    "order": "desc"
                }
            },
            {
                "_score":{
                    "order": "desc"
                }
            }
        ]
    }
```

##### 13、高亮查询
&emsp; 对查询内容中的关键字部分，进行标签和样式(高亮)的设置
```shell         
GET 请求 ：http://127.0.0.1:9200/student/_search
请求体：
    {
        "query": {
            "match": {
                "name": "zhangsan"
            }
        },
        "highlight": {
            "pre_tags": "<font color='red'>", # 前置标签
            "post_tags": "</font>", #后置标签
            "fields": { # 需要高亮的字段
                "name": {} 
            }
        }
    }
```       

##### 14、分页查询
```shell
GET 请求 ：http://127.0.0.1:9200/student/_search
请求体：
    {
        "query": {
            "match_all": {}
        },
        "sort": [
            {
                "age": {
                    "order": "desc"
                }
            }
        ],
        "from": 0, # 当前页的起始索引，默认从 0 开始。 from = (pageNum - 1) * size
        "size": 2  # 每页显示多少条
    }   

# 在集群系统中深度分页：
    在一个有5个主分片的索引中搜索。当我们请求结果的第一页（结果1到10）时，每个分片产生自己最顶端10个结果然后返回它们
    给请求节点(requesting node)，它再排序这所有的50个结果以选出顶端的10个结果。现在假设我们请求第1000页——结果10001到10010。
    工作方式都相同，不同的是每个分片都必须产生顶端的10010个结果。然后请求节点排序这50050个结果并丢弃50040个！
```

##### 15、聚合查询
```shell
GET 请求 ：http://127.0.0.1:9200/student/_search
请求体：
    {
        "aggs":{
            "max_age":{ # 名称
                "max":{"field":"age"} # max：最大值
            },
            "min_age":{ # 名称
                "min":{"field":"age"} # min：最小值
            },
            "sum_age":{
                "sum":{"field":"age"} # sum：求和
            },
            "avg_age":{
                "avg":{"field":"age"} # avg：平均值
            },
            "distinct_age":{
                "cardinality":{  # 去重后再去总数
                    "field":"age"
                }
            },
            "stats_age":{
                "stats":{"field":"age"} # stats 聚合，对某个字段一次性返回 count，max，min，avg 和 sum 五个指标
            }
        },
        "size":0 # 不显示原数据
    } 
        
# 划分范围 histogram
请求体：
    {
        "size" : 0,
        "aggs":{
            "price":{
                "histogram":{ 
                "field": "price",
                "interval": 2000 # interval：2000，划分范围，0~2000，2000~4000，4000~6000，6000~8000，8000~10000
                }
            }
        }
    }
            
# 按照日期分组聚合date_histogram
请求体：
    {
        "size" : 0,
        "aggs": {
            "sales": {
                "date_histogram": {
                "field": "sold_date",
                "interval": "month", 
                "format": "yyyy-MM-dd",
                "min_doc_count" : 0,  # 一条数据都没有，那么这个区间也是要返回的，不然默认是会过滤掉这个区间的
                "extended_bounds" : { 
                    "min" : "2019-01-01", # 起始日期
                    "max" : "2020-12-31"  # 截止日期
                }
                }
            }
        }
    }     
```

##### 16、桶聚合查询
&emsp; 相当于sql中的group by语句
```shell
GET 请求 ：http://127.0.0.1:9200/student/_search    
请求体：
    {
        "aggs":{
            "age_groupby":{
                "terms":{
                    "field":"age"
                }
            }
        },
        "size":0
    }     
```    

### 17、exists查询
可以用于查找文档中是否包含指定字段或没有某个字段，类似于SQL语句中的IS_NULL条件
```shell     
GET 请求：http://127.0.0.1:9200/student/_search
请求体：
    {
        "exists": {
            "field": "title"
        }
    }
```

#### 定位错误语法
``` shell
GET 请求： http://127.0.0.1:9200/book/_validate/query?explain
请求体：
    {
        "query": {
        "mach": {
            "description": "java程序员"
        }
        }
    }
```        

#### 查看集群状态
```shell         
GET 请求： http://127.0.0.1:1003/_cluster/health
返回内容：
    {
        "cluster_name": "my-elasticsearch",
        "status": "green", # status字段表示当前集群在总体上是否工作正常。
                            # green:  所有的主分片和副本分片都正常运行。
                            # yellow: 所有的主分片都正常运行，但不是所有的副本分片都正常运行。
                            # red:    有主分片没能正常运行。
        "timed_out": false,
        "number_of_nodes": 3,
        "number_of_data_nodes": 3,
        "active_primary_shards": 0,
        "active_shards": 0,
        "relocating_shards": 0,
        "initializing_shards": 0,
        "unassigned_shards": 0,
        "delayed_unassigned_shards": 0,
        "number_of_pending_tasks": 0,
        "number_of_in_flight_fetch": 0,
        "task_max_waiting_in_queue_millis": 0,
        "active_shards_percent_as_number": 100.0
    }       
```         