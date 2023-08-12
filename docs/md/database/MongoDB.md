---
title: MongoDB
author: Charles Chu
date: 2023/07/22
isOriginal: true
---

# MongoDB

&emsp; MongoDB中的记录是一个文档，它是一个由字段和值对（field:value）组成的数据结构。

&emsp; MongoDB文档类似于JSON对象，即一个文档认为就是一个对象。字段的数据类型是字符型，它的值除了使用基本的一些类型外，还可以包括其他文档、普通数组和文档数组。

&emsp; 对于这样的数据，我们更适合使用MongoDB来实现数据的存储：
1. 数据量大；
2. 写入操作频繁（读写都很频繁）；
3. 价值较低的数据，对事务性要求不高。
![Mongo&mysql](/public/database/mongoDb/Mongo&mysql.png)

&emsp; MongoDB的最小存储单位就是文档(document)对象。文档对象对应于关系型数据库的行。数据在MongoDB中以BSON（Binary-JSON）的格式存储在磁盘。

## 登陆mongo客户端
```shell
# 进入mongo安装目录，进入bin目录
./mongo
# 或者
./mongo -u root -p root

# 或者登陆后，在admin数据库下进行超级用户的登录验证 
db.auth(“root”,”root″)
```

## 数据库的操作

### 1、选择和创建数据库
```shell
# 选择和创建数据库的语法格式，如果数据库不存在则自动创建
use `数据库名称`
# 例如，以下语句创建 articledb 数据库：
use articledb

# 注意: 在MongoDB中，集合只有在内容插入后才会创建! 
# 就是说，创建集合(数据表)后要再插入一个文档(记录)，集合才会真正创建。

# 数据库名可以是满足以下条件的任意UTF-8字符串。
    # 不能是空字符串（ "")。
    # 不得含有 ' '（空格)、.、$、/、\和\0 (空字符)。
    # 应全部小写。
    # 最多64字节。

# 有一些数据库名是保留的，可以直接访问这些有特殊作用的数据库。
    # admin ： 从权限的角度来看，这是"root"数据库。要是将一个用户添加到这个数据库，这个用户自动继承所有数据库的权限。一些特定的服务器端命令也只能从这个数据库运行，比如列出所有的数据库或者关闭服务器。
    # local: 这个数据永远不会被复制，可以用来存储限于本地单台服务器的任意集合。
    # config : 当Mongo用于分片设置时，config数据库在内部使用，用于保存分片的相关信息。
```

### 2、查看有权限查看的所有的数据库命令
```shell
show dbs
或
show databases
```

### 3、查看当前正在使用的数据库命令
```shell
db
```

### 4、删除数据库
```shell
# 语法格式如下，主要用来删除已经持久化的数据库
db.dropDatabase()
```

## 集合的操作

### 1、创建集合
```shell
# 集合，类似关系型数据库中的表；可以显示的创建，也可以隐式的创建。
# 集合的显式创建：（name: 要创建的集合名称）
db.createCollection(name)
# 例如：创建一个名为 mycollection 的普通集合。
db.createCollection("mycollection")

# 集合的隐式创建:
# 当向一个集合中插入一个文档的时候，如果集合不存在，则会自动创建集合。
# 通常我们使用隐式创建文档即可

# 集合的命名规范：
    # 集合名不能是空字符串 ""。
    # 集合名不能含有 \0字符（空字符)，这个字符表示集合名的结尾。
    # 集合名不能以 "system."开头，这是为系统集合保留的前缀。
    # 用户创建的集合名字不能含有保留字符。有些驱动程序的确支持在集合名里面包含，这是因为某些系统生成的集合中包含该字符。除非你要访问这种系统创建的集合，否则千万不要在名字里出现$。
```

### 2、查看当前库中的集合
```shell
show collections
或
show tables
```

### 3、删除集合
```shell
# 集合的删除，如果成功删除选定集合，则 drop() 方法返回 true，否则返回 false。
db.collection.drop()
或
db.集合.drop() 
# 例如：要删除mycollection集合
db.mycollection.drop()
```

## 文档的操作

### 1、单个文档插入
```shell
# 使用insert() 或 save() 方法向集合中插入文档，语法如下
db.collection.insert(
 <document or array of documents>, # 要插入到集合中的文档或文档数组。（(json格式）
 {
  writeConcern: <document>,
  ordered: <boolean>
 }
)

# 要向comment的集合(表)中插入一条测试数据
db.comment.insert({"articleid":"100000","content":"今天天气真好，阳光明媚","userid":"1001","nickname":"Rose",
"createdatetime":new Date(),"likenum":NumberInt(10),"state":null})   

# 执行后，如下，说明插入一个数据成功了。
WriteResult({ "nInserted" : 1 })

# 文档键命名规范：
    # 键不能含有 \0 (空字符)。这个字符用来表示键的结尾。
    # .和$有特别的意义，只有在特定环境下才能使用。
    # 以下划线 "_"开头的键是保留的(不是严格要求的)。

# 提示
    # comment集合如果不存在，则会隐式创建
    # mongo中的数字，默认情况下是double类型，如果要存整型，必须使用函数NumberInt(整型数字)，否则取出来就有问题了。
    # 插入当前日期使用 new Date()
    # 插入的数据没有指定 _id ，会自动生成主键值
    # 如果某字段没值，可以赋值为null，或不写该字段。
```

#### 参数
![DocumentParameter](/public/database/mongoDb/DocumentParameter.png)

#### 注意
- 文档中的键/值对是有序的。
- 文档中的值不仅可以是在双引号里面的字符串，还可以是其他几种数据类型（甚至可以是整个嵌入的文档)。
- MongoDB区分类型和大小写。
- MongoDB的文档不能有重复的键。
- 文档的键是字符串。除了少数例外情况，键可以使用任意UTF-8字符。

### 2、批量插入文档
```shell
db.collection.insertMany(
 [ <document 1> , <document 2>, ... ],
 {
   writeConcern: <document>,
   ordered: <boolean>
 }
)

# 示例：
db.comment.insertMany([
 {"_id":"1","articleid":"100001","content":"我们不应该把清晨浪费在手机上，健康很重要，一杯温水幸福你我
他。","userid":"1002","nickname":"相忘于江湖","createdatetime":new Date("2019-08-
05T22:08:15.522Z"),"likenum":NumberInt(1000),"state":"1"},
 {"_id":"2","articleid":"100001","content":"我夏天空腹喝凉开水，冬天喝温开水","userid":"1005","nickname":"伊人憔
悴","createdatetime":new Date("2019-08-05T23:58:51.485Z"),"likenum":NumberInt(888),"state":"1"},
 {"_id":"3","articleid":"100001","content":"我一直喝凉开水，冬天夏天都喝。","userid":"1004","nickname":"杰克船
长","createdatetime":new Date("2019-08-06T01:05:06.321Z"),"likenum":NumberInt(666),"state":"1"},
 {"_id":"4","articleid":"100001","content":"专家说不能空腹吃饭，影响健康。","userid":"1003","nickname":"凯
撒","createdatetime":new Date("2019-08-06T08:18:35.288Z"),"likenum":NumberInt(2000),"state":"1"},
 {"_id":"5","articleid":"100001","content":"研究表明，刚烧开的水千万不能喝，因为烫
嘴。","userid":"1003","nickname":"凯撒","createdatetime":new Date("2019-08-
06T11:01:02.521Z"),"likenum":NumberInt(3000),"state":"1"} 
]);

# 提示：
    # 插入时指定了 _id ，则主键就是该值。
    # 如果某条数据插入失败，将会终止插入，但已经插入成功的数据不会回滚掉。
    # 因为批量插入由于数据较多容易出现失败，因此，可以使用try catch进行异常捕捉处理，测试的时候可以不处理。
```

### 3、文档的查询
```shell
# 查询数据的语法格式如下:
db.collection.find(<query>, [projection])
# <query>:可选。使用查询运算符指定选择筛选器。若要返回集合中的所有文档，请省略此参数或传递空文档( {} )。
# [projection]:可选。指定要在与查询筛选器匹配的文档中返回的字段（投影）。若要返回匹配文档中的所有字段，请省略此参数。
```

#### 3.1、查询所有
```shell
# 查询comment集合的所有文档
db.comment.find()
或
db.comment.find({})
```

#### 3.2、条件查询
```shell 
# 按一定条件来查询：查询userid为1003的记录
db.comment.find({userid:'1003'})
```

#### 3.3、查询只返回一条
```shell
# 如果只需要返回符合条件的第一条数据：
db.comment.findOne({userid:'1003'})
```

#### 3.4、投影查询（Projection Query）
```shell 
# 投影查询：不显示所有字段，只显示指定的字段
# 示例：查询userid为1003的记录，只显示 _id 、userid、nickname:
db.comment.find({userid:"1003"},{userid:1,nickname:1})

# 投影查询默认 _id 会显示。若不显示 _id ：
db.comment.find({userid:"1003"},{userid:1,nickname:1,_id:0})
```

#### 3.5、统计查询
```shell
# 统计查询使用count()方法，语法:
db.collection.count(query, options)
# query:查询选择条件
# options:可选。用于修改计数的额外选项。

# 统计所有记录数，统计comment集合的所有的记录数：
db.comment.count()

# 按条件统计记录数，统计userid为1003的记录条数：
db.comment.count({userid:"1003"})
```

#### 3.6、分页列表查询
```shell
# 可以使用limit()方法来读取指定数量的数据，使用skip()方法来跳过指定数量的数据
# 基本语法如下：
db.COLLECTION_NAME.find().limit(NUMBER).skip(NUMBER)

# 如果想返回指定条数的记录，可以在find方法后调用limit来返回结果(TopN)，默认值20：
db.comment.find().limit(3)

# skip 方法同样接受一个数字参数作为跳过的记录条数。（前N个不要）,默认值是0
db.comment.find().skip(3)

# 分页查询：需求：每页2个，第二页开始：跳过前两条数据，接着值显示3和4条数据:
db.comment.find().skip(0).limit(2) # 第一页
db.comment.find().skip(2).limit(2) # 第二页
db.comment.find().skip(4).limit(2) # 第三页
```

#### 3.7、 排序查询
```shell
# sort()方法可以通过参数指定排序的字段，并使用1和-1来指定排序的方式（其中1为升序排列，而-1是用于降序排列。)
# 语法如下所示：
db.COLLECTION_NAME.find().sort({KEY:1})
或
db.集合名称.find().sort(排序方式)

# 示例：对userid降序排列，并对访问量进行升序排列
db.comment.find().sort({userid:-1,likenum:1})

# 提示
skip(),limilt(),sort()三个放在一起执行的时候，执行的顺序是先sort(),然后是skip()，最后是显示的limit()，和命令编写顺序无关。
```

#### 3.8、正则的复杂条件查询
```shell
# MongoDB的模糊查询是通过正则表达式的方式实现的
db.collection.find({field:/正则表达式/})
或
db.集合.find({字段:/正则表达式/})

# 示例，我要查询评论内容包含“开水”的所有文档
db.comment.find({content:/开水/})
# 要查询评论的内容中以 “专家”开头的
db.comment.find({content:/^专家/})
```

#### 3.9、比较查询
```shell
db.集合名称.find({ "field" : { $gt: value }}) // 大于: field > value
db.集合名称.find({ "field" : { $lt: value }}) // 小于: field < value
db.集合名称.find({ "field" : { $gte: value }}) // 大于等于: field >= value
db.集合名称.find({ "field" : { $lte: value }}) // 小于等于: field <= value
db.集合名称.find({ "field" : { $ne: value }}) // 不等于: field != value
```

#### 3.10、包含查询
```shell
# 包含使用$in操作符。示例：查询评论的集合中userid字段包含1003或1004的文档
db.comment.find({userid:{$in:["1003","1004"]}})

# 不包含使用 $nin操作符。示例：查询评论集合中userid字段不包含1003和1004的文档
db.comment.find({userid:{$nin:["1003","1004"]}})
```

#### 3.11、条件连接查询
```shell
# 需要查询同时满足两个以上条件，需要使用$and操作符将条件进行关联。（相当于SQL的and） 格式为
$and:[ {  },{  },{ } ]
# 示例：查询评论集合中 likenum大于等于700 并且小于2000的文档：
db.comment.find({$and:[{likenum:{$gte:NumberInt(700)}},{likenum:{$lt:NumberInt(2000)}}]})

# 如果两个以上条件之间是或者的关系，我们使用 操作符进行关联，与前面 and的使用方式相同 格式为:
$or:[ {  },{  },{   } ]
# 示例：查询评论集合中 userid为1003，或者点赞数小于1000的文档记录
db.comment.find({$or:[ {userid:"1003"} ,{likenum:{$lt:1000} }]})
```

### 4、文档的更新
```shell
# 语法：
db.collection.update(query, update, options)
//或
db.collection.update(
 <query>, # 更新的选择条件。可以使用与find（）方法中相同的查询选择器，类似sql update查询内where后面的。
 <update>, # 要应用的修改
 {
  upsert: <boolean>, # 可选。如果设置为true，则在没有与查询条件匹配的文档时创建新文档。
  multi: <boolean>, # 如果设置为true，则更新符合查询条件的多个文档。
  writeConcern: <document>, # 可选。表示写问题的文档。抛出异常的级别。
  collation: <document>,
  arrayFilters: [ <filterdocument1>, ... ], # 可选。一个筛选文档数组，用于确定要为数组字段上的更新操作修改哪些数组元素。
  hint:  <document|string>     // Available starting in MongoDB 4.2
 }
)
```

#### 4.1、覆盖的修改
```shell
# 如我们想修改_id为1的记录，点赞量为1001：
db.comment.update({_id:"1"},{likenum:NumberInt(1001)})
# 执行后，我们会发现，这条文档除了likenum字段其它字段都不见了
```

#### 4.2、局部修改
```shell 
# 局部修改：$set
# 我们想修改_id为2的记录，浏览量为889
db.comment.update({_id:"2"},{$set:{likenum:NumberInt(889)}})
```

#### 4.3、批量的修改
```shell 
# 更新所有用户为 1003 的用户的昵称为“凯撒大帝”
# 默认只修改第一条数据
db.comment.update({userid:"1003"},{$set:{nickname:"凯撒2"}})
# 修改所有符合条件的数据
db.comment.update({userid:"1003"},{$set:{nickname:"凯撒大帝"}},{multi:true})
# 如果不加后面的参数multi，则只更新符合条件的第一条记录

# 列值增长的修改，如果我们想实现对某列值在原有值的基础上进行增加或减少，可以使用 $inc 运算符来实现。
# 对3号数据的点赞数，每次递增1：
db.comment.update({_id:"3"},{$inc:{likenum:NumberInt(1)}})
```

### 5、文档的删除
```shell
# 删除文档的语法结构：
db.集合名称.remove(条件)
# 将数据全部删除
db.comment.remove({})

# 示例：删除 _id=1的记录:
db.comment.remove({_id:"1"})
```

## 索引
&emsp; 索引支持在MongoDB中高效地执行查询。如果没有索引，MongoDB必须执行全集合扫描，即扫描集合中的每个文档，以选择与查询语句匹配的文档。如果查询存在适当的索引，MongoDB可以使用该索引限制必须检查的文档数。

&emsp; 索引是特殊的数据结构，它以易于遍历的形式存储集合数据集的一小部分。索引存储特定字段或一组字段的值，按字段值排序。索引项的排序支持有效的相等匹配和基于范围的查询操作。此外，MongoDB还可以使用索引中的排序返回排序结果。

&emsp; MongoDB索引使用B树数据结构（确切的说是B-Tree，MySQL是B+Tree）

### 索引类型

#### 1、单字段索引
- MongoDB支持在文档的单个字段上创建用户定义的升序/降序索引，称为单字段索引（Single Field Index）。
- 对于单个字段索引和排序操作，索引键的排序顺序（即升序或降序）并不重要，因为MongoDB可以在任何方向上遍历索引。
![SingleFieldIndex](/public/database/mongoDb/SingleFieldIndex.png)

#### 2、复合索引
- MongoDB还支持多个字段的用户定义索引，即复合索引（Compound Index）。
- 复合索引中列出的字段顺序具有重要意义。例如，如果复合索引由 { userid: 1, score: -1 } 组成，则索引首先按userid正序排序，然后在每个userid的值内，再在按score倒序排序。
![CompoundIndex](/public/database/mongoDb/CompoundIndex.png)

### 索引操作
#### 1、索引的查看
```shell
# 返回一个集合中的所有索引的数组，该语法命令运行要求是 MongoDB 3.0+
db.collection.getIndexes()
# 示例:
db.comment.getIndexes()
[
   {
        "v" : 2,
        "key" : {
            "_id" : 1
       },
        "name" : "_id_",
        "ns" : "articledb.comment"
   }
]

# 结果中显示的是默认 _id 索引。
# 默认_id索引：MongoDB在创建集合的过程中，在 _id 字段上创建一个唯一的索引，默认名字为 _id_ ，该索引可防止客户端插入两个具有相同值的文档，您不能在_id字段上删除此索引。
```

#### 2、索引的创建
```shell
# 在集合上创建索引
db.collection.createIndex(keys, options)
# keys：包含字段和值对的文档，其中字段是索引键，值描述该字段的索引类型。
#       对于字段上的升序索引，指定值1；对于降序索引，请指定值-1。比如： { 字段:1或-1} 
# options：可选。包含一组控制索引创建的选项的文档。
#         name：索引的名称。
#         unique：建立的索引是否唯一。

# 示例
# 单字段索引，对 userid 字段建立索引：
 db.comment.createIndex({userid:1})
{
   "createdCollectionAutomatically" : false,
   "numIndexesBefore" : 1,
   "numIndexesAfter" : 2,
   "ok" : 1
}

# 复合索引：对 userid 和 nickname 同时建立复合（Compound）索引：
db.comment.createIndex({userid:1,nickname:-1})
{
   "createdCollectionAutomatically" : false,
   "numIndexesBefore" : 2,
   "numIndexesAfter" : 3,
   "ok" : 1
}
```

#### 3、索引的移除
```shell
# 指定索引的移除
db.collection.dropIndex(index)
# index：指定要删除的索引

# 示例：删除 comment 集合中 userid 字段上的升序索引
db.comment.dropIndex({userid:1})
{ "nIndexesWas" : 3, "ok" : 1 }

# 所有索引的移除
db.collection.dropIndexes()
# 示例：删除 spit 集合中所有索引
db.comment.dropIndexes()
{
   "nIndexesWas" : 2,
   "msg" : "non-_id indexes dropped for collection",
   "ok" : 1
}

# 提示： _id 的字段的索引是无法删除的，只能删除非 _id 字段的索引。
```

#### 4、索引的使用
&emsp; 分析查询性能（Analyze Query Performance）通常使用执行计划（Explain Plan）来查看查询的情况，如查询耗费的时间、是否基于索引查询等。

&emsp; 关键点： 
- "stage" : "COLLSCAN", 表示全集合扫描
- "stage" : "IXSCAN" ,基于索引的扫描

```shell
db.collection.find(query,options).explain(options)

# 示例，查看根据userid查询数据的情况：
db.comment.find({userid:"1003"}).explain()
{
    "queryPlanner" : {
        "plannerVersion" : 1,
        "namespace" : "articledb.comment",
        "indexFilterSet" : false,
        "parsedQuery" : {
            "userid" : {
                "$eq" : "1003"
           }
       },
        "winningPlan" : {
            "stage" : "COLLSCAN", # 表示全集合扫描
            "filter" : {
                "userid" : {
                    "$eq" : "1003"
               }
           },
            "direction" : "forward"
       },
        "rejectedPlans" : [ ]
   },
    "serverInfo" : {
        "host" : "9ef3740277ad",
        "port" : 27017,
        "version" : "4.0.10",
        "gitVersion" : "c389e7f69f637f7a1ac3cc9fae843b635f20b766"
   },
    "ok" : 1
}
```

#### 5、涵盖的查询
&emsp; 当查询条件和查询的投影仅包含索引字段时，MongoDB直接从索引返回结果，而不扫描任何文档或将文档带入内存。 这些覆盖的查询可以非常有效。
![CoveringQueries](/public/database/mongoDb/CoveringQueries.png) 
```shell
db.comment.find({userid:"1003"},{userid:1,_id:0})
{ "userid" : "1003" }
{ "userid" : "1003" }
```

## 副本集
&emsp; MongoDB中的副本集（Replica Set）是一组维护相同数据集的mongod服务。 副本集可提供冗余和高可用性，是所有生产部署的基础。

&emsp; 也可以说，副本集类似于有自动故障恢复功能的主从集群。通俗的讲就是用多台机器进行同一数据的异步同步，从而使多台机器拥有同一数据的多个副本，并且当主库当掉时在不需要用户干预的情况下自动切换其他备份服务器做主库。而且还可以利用副本服务器做只读服务器，实现读写分离，提高负载。

### 主从复制和副本集区别
&emsp; 主从集群和副本集最大的区别就是副本集没有固定的“主节点”；整个集群会选出一个“主节点”，当其挂掉后，又在剩下的从节点中选中其他节点为“主节点”，副本集总有一个活跃点(主、primary)和一个或多个备份节点(从、secondary)。

### 副本集有两种类型三种角色
#### 两种类型
- 主节点（ Primary）类型：数据操作的主要连接点，可读写。
- 次要（辅助、从）节点（ Secondaries）类型：数据冗余备份节点，可以读或选举。

#### 三种角色
- 主要成员（Primary）：主要接收所有写操作。就是主节点。
- 副本成员（Replicate）：从主节点通过复制操作以维护相同的数据集，即备份数据，不可写操作，但可以读操作（但需要配置）。是默认的一种从节点类型
- 仲裁者（ Arbiter）：不保留任何数据的副本，只具有投票选举作用。当然也可以将仲裁服务器维护为副本集的一部分，即副本成员同时也可以是仲裁者。也是一种从节点类型
![ReplicaSet](/public/database/mongoDb/ReplicaSet.png)

&emsp; 如果你的副本+主节点的个数是偶数，建议加一个仲裁者，形成奇数，容易满足大多数的投票。

&emsp; 如果你的副本+主节点的个数是奇数，可以不加仲裁者。

### 副本集的创建
#### 1、所有节点的配置文件上定义副本集名称
```shell
replication:
 #副本集的名称
 replSetName: myrs
```

#### 2、初始化配置副本集
```shell
# 语法：
rs.initiate(configuration)

# 使用默认的配置来初始化副本集，尽量在主节点操作
rs.initiate()
```

#### 3、查看副本集的配置内容
本质是查询的是system.replset的表中的数据
```shell
# 返回包含当前副本集配置的文档
rs.conf(configuration)
# rs.config() 是该方法的别名。
# configuration：可选，如果没有配置，则使用默认主节点配置

# 示例
rs.conf()
{
    "_id" : "myrs", # 副本集的配置数据存储的主键值，默认就是副本集的名字
    "version" : 1,
    "protocolVersion" : NumberLong(1),
    "writeConcernMajorityJournalDefault" : true,
    "members" : [ # 副本集成员数组
       {
            "_id" : 0,
            "host" : "180.76.159.126:27017",
            "arbiterOnly" : false, # 该成员不是仲裁节点
            "buildIndexes" : true,
            "hidden" : false,
            "priority" : 1,
            "tags" : {
           },
            "slaveDelay" : NumberLong(0),
            "votes" : 1
       }
   ],
    "settings" : { # 副本集的参数配置
        "chainingAllowed" : true,
        "heartbeatIntervalMillis" : 2000,
        "heartbeatTimeoutSecs" : 10,
        "electionTimeoutMillis" : 10000,
        "catchUpTimeoutMillis" : -1,
        "catchUpTakeoverDelayMillis" : 30000,
        "getLastErrorModes" : {
       },
        "getLastErrorDefaults" : {
            "w" : 1,
            "wtimeout" : 0
       },
        "replicaSetId" : ObjectId("5d539bdcd6a308e600d126bb")
   }
}
```

#### 4、查看副本集状态
```shell
# 语法
rs.status()
# 返回包含状态信息的文档
```

#### 5、添加副本从节点
```shell
# 在主节点添加从节点，将其他成员加入到副本集。语法：
rs.add(host, arbiterOnly)
# host：要添加到副本集的新成员
# arbiterOnly：如果为true，要添加到副本集的新成员

# 示例，将27018的副本节点添加到副本集中：
rs.add("180.76.159.126:27018")
```

#### 6、添加仲裁从节点
```shell
# 添加一个仲裁节点到副本集。语法:
rs.addArb(host)

# 示例，将27019的仲裁节点添加到副本集中：
rs.addArb("180.76.159.126:27019")
```

#### 7、副本集的数据读写操作
&emsp; 因为默认情况下，从节点是没有读写权限的，可以增加读的权限；设置为奴隶节点，允许在从成员上运行读的操作
```shell
# 语法：
rs.slaveOk()
或
rs.slaveOk(true)
# 该命令是 db.getMongo().setSlaveOk() 的简化命令

# 取消读操作权限
rs.slaveOk(false)
```

### 主节点的选举原则
&emsp;  MongoDB在副本集中，会自动进行主节点的选举，主节点选举的触发条件：
- 主节点故障
- 主节点网络不可达（默认心跳信息为10秒）
- 人工干预（rs.stepDown(600)）

&emsp; 一旦触发选举，就要根据一定规则来选主节点。

&emsp; 选举规则是根据票数来决定谁获胜：
- 票数最高，且获得了 “大多数”成员的投票支持的节点获胜。“大多数”的定义为：假设复制集内投票成员数量为N，则大多数为 N/2 + 1。例如：3个投票成员，则大多数的值是2。当复制集内存活成员数量不足大多数时，整个复制集将无法选举出Primary，复制集将无法提供写服务，处于只读状态。
- 若票数相同，且都获得了 “大多数”成员的投票支持的，数据新的节点获胜。数据的新旧是通过操作日志oplog来对比的。

&emsp; 可以通过设置优先级（priority）来设置额外票数。优先级即权重，取值为0-1000，相当于可额外增加0-1000的票数，优先级的值越大，就越可能获得多数成员的投票（votes）数。
```shell
# 修改优先级

# 先将配置导入cfg变量
cfg=rs.conf()

# 然后修改值（ID号默认从0开始）
cfg.members[1].priority=2

# 重新加载配置
rs.reconfig(cfg)
```

### SpringDataMongoDB 连接副本集
```yaml
mongodb://host1,host2,host3/dbName?connect=replicaSet&slaveOk=true&replicaSet=副本集名字
# slaveOk=true ：开启副本节点读的功能，可实现读写分离。
# connect=replicaSet ：自动到副本集中选择读写的主机。如果slaveOK是打开的，则实现了读写分离
```

## 分片集群
&emsp; 分片(sharding)是指将数据拆分，将其分散存在不同的机器上的过程。有时也用分区(partitioning)来表示这个概念。将数据分散到不同的机器上，不需要功能强大的大型计算机就可以储存更多的数据，处理更多的负载。

&emsp; MongoDB分片群集包含以下组件：
- 分片（存储）：每个分片包含分片数据的子集。 每个分片都可以部署为副本集。
- mongos （路由）：mongos充当查询路由器，在客户端应用程序和分片集群之间提供接口。
- config servers （“调度”的配置）：配置服务器存储群集的元数据和配置设置。 从MongoDB 3.4开始，必须将配置服务器部署为副本集（CSRS）
![ShardedCluster](/public/database/mongoDb/ShardedCluster.png)

### 分片集群搭建

#### 1、第一，二套副本集的创建
```shell
replication:
 #副本集的名称
 replSetName: myshardrs01
sharding:
 #分片角色
 clusterRole: shardsvr
 ```

#### 2、初始化该副本集和创建主节点，添加从节点
```shell
rs.initiate()
rs.add("180.76.159.126:27118")
rs.addArb("180.76.159.126:27218")
```

#### 3、配置节点（config server）副本集的搭建
```shell
replication:
 replSetName: myconfigrs
sharding:
 # 分片角色   
 clusterRole: configsvr
```

#### 4、初始化该副本集和创建主节点，添加从节点
```shell
rs.initiate()
rs.add("180.76.159.126:27119")
rs.add("180.76.159.126:27219")
```

#### 5、路由节点的创建
```shell
sharding:
 #指定配置节点的副本集
 configDB: myconfigrs/180.76.159.126:27019,180.76.159.126:27119,180.76.159.126:27219
```

#### 6、启动mongos

#### 7、在路由节点上进行分片配置操作

##### 7.1、添加分片
```shell
# 语法：
sh.addShard("IP:Port")
# 示例，将第一套分片副本集添加进来
sh.addShard("myshardrs01/192.168.0.2:27018,180.76.159.126:27118,180.76.159.126:27218")
# 查看分片状态情况
sh.status()
```

##### 7.2、开启分片功能
```shell
# 语法:
sh.enableSharding("库名")
# 示例，在mongos上的articledb数据库配置sharding:
sh.enableSharding("articledb")
```

##### 7.3、集合分片
```shell
# 对集合分片，必须使用 sh.shardCollection() 方法指定集合和分片键
sh.shardCollection("库名.集合名",{"key":1})
# 对集合进行分片时,你需要选择一个 片键（Shard Key） , shard key 是每条记录都必须包含的,且建立了索引的单个字段或复合字段,
# MongoDB按照片键将数据划分到不同的 数据块 中,并将 数据块 均衡地分布到所有分片中.
# 为了按照片键划分数据块,MongoDB使用 基于哈希的分片方式（随机平均分配）或者基于范围的分片方式（数值大小分配）。

# 分片规则一：哈希策略
sh.shardCollection("articledb.comment",{"nickname":"hashed"})
# 分片规则二：范围策略
sh.shardCollection("articledb.author",{"age":1})
```

### 删除分片
```shell
# 提示：如果添加分片失败，需要先手动移除分片，检查添加分片的信息的正确性后，再次添加分片。
# 移除分片
use admin
db.runCommand( { removeShard: "myshardrs02" } )
# 注意：如果只剩下最后一个 shard，是无法删除的
# 移除时会自动转移分片数据，需要一个时间过程。
# 完成后，再次执行删除分片命令才能真正删除。
```

### SpringDataMongDB 连接分片集群
``` yaml
uri: mongodb://180.76.159.126:27017,180.76.159.126:27117/articledb
```

## 安全认证
&emsp; MongoDB使用的是基于角色的访问控制(Role-Based Access Control,RBAC)来管理用户对实例的访问。通过对用户授予一个或多个角色来控制用户访问数据库资源的权限和数据库操作的权限，在对用户分配角色之前，用户无法访问实例。

### 角色权限的查看
```shell
# 查询所有角色权限(仅用户自定义角色)
db.runCommand({ rolesInfo: 1 })

# 查询所有角色权限(包含内置角色)
db.runCommand({ rolesInfo: 1, showBuiltinRoles: true })

# 查询当前数据库中的某角色的权限
db.runCommand({ rolesInfo: "<rolename>" })

# 查询其它数据库中指定的角色权限
db.runCommand({ rolesInfo: { role: "<rolename>", db: "<database>" } }

# 查询多个角色权限
db.runCommand(
 {
    rolesInfo: [
      "<rolename>",
     { role: "<rolename>", db: "<database>" },
      ...
   ]  
 }
)
```

### 常用的内置角色
- 数据库用户角色： read、readWrite;
- 所有数据库用户角色： readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
- 数据库管理角色： dbAdmin、dbOwner、userAdmin；
- 集群管理角色： clusterAdmin、clusterManager、clusterMonitor、hostManager；
- 备份恢复角色： backup、restore；
- 超级用户角色： root
- 内部角色： system
![Roles](/public/database/mongoDb/Roles.png)

### 单实例环境的安全认证
#### 1、创建管理员用户
&emsp; 创建两个管理员用户，一个是系统的超级管理员 myroot ，一个是admin库的管理用户myadmin
```shell
# 切换到admin库
use admin

# 创建系统超级用户 myroot,设置密码123456，设置角色root
db.createUser({user:"myroot",pwd:"123456",roles:[ { "role" : "root", "db" :"admin" } ]})
# 或
db.createUser({user:"myroot",pwd:"123456",roles:["root"]})
# 如果不指定数据库，则创建的指定的权限的用户在所有的数据库上有效，如 {role:"userAdminAnyDatabase", db:""}

# 创建专门用来管理admin库的账号myadmin，只用来作为用户权限的管理
db.createUser({user:"myadmin",pwd:"123456",roles:[{role:"userAdminAnyDatabase",db:"admin"}]})

# 查看已经创建了的用户的情况：
db.system.users.find()

# 删除用户
db.dropUser("myadmin")

# 认证测试：
# 切换到admin：
use admin
# 密码输错：
db.auth("myroot","12345")
Error: Authentication failed.
0
# 密码正确：
db.auth("myroot","123456")
1
```

#### 2、创建普通用户
&emsp; 创建普通用户可以在没有开启认证的时候添加，也可以在开启认证之后添加，但开启认证之后，必须使用有操作admin库的用户登录认证后才能操作。底层都是将用户信息保存在了admin数据库的集合system.users中。
```shell
# 创建(切换)将来要操作的数据库articledb,
use articledb

# 创建用户，拥有articledb数据库的读写权限readWrite，密码是123456
db.createUser({user: "bobo", pwd: "123456", roles: [{ role: "readWrite", db:"articledb" }]})

# 测试是否可用
db.auth("bobo","123456")
```

#### 3、以开启认证的方式启动服务
&emsp; 有两种方式开启权限认证启动服务：一种是参数方式，一种是配置文件方式。
```shell
# 参数方式，在启动时指定参数 -- auth：
/usr/local/mongodb/bin/mongod -f /mongodb/single/mongod.conf --auth

# 配置文件方式，在mongod.conf配置文件中加入，启动时不用加 --auth参数
security:
 #开启授权认证
authorization: enabled
```

#### 4、开启了认证的情况下的客户端登录
&emsp; 有两种认证方式，一种是先登录，在mongo shell中认证；一种是登录时直接认证。
```shell
# 先连接再认证
/usr/local/mongodb/bin/mongo --host 180.76.159.126 --port27017
use admin
db.auth("myroot","123456")

# 连接时直接认证
# 对admin数据库进行登录认证和相关操作：
/usr/local/mongodb/bin/mongo --host 180.76.159.126 --port 27017 --authenticationDatabase admin -u myroot -p 123456
# 对articledb数据库进行登录认证和相关操作
/usr/local/mongodb/bin/mongo --host 180.76.159.126 --port 27017 --authenticationDatabase articledb -u bobo -p 123456
```

#### 5、SpringDataMongoDB连接认证
&emsp; 使用用户名和密码连接到 MongoDB 服务器，必须使用'username:password@hostname/dbname' 格式
```shell
uri: mongodb://bobo:123456@180.76.159.126:27017/articledb
```

### 副本集环境的安全认证
&emsp; 副本集和共享集群的各个节点成员之间使用内部身份验证，可以使用密钥文件或x.509证书。

&emsp; 密钥文件比较简单，密钥文件的内容必须在6到1024个字符之间，并且在unix/linux系统中文件所有者必须有对文件至少有读的权限。官方推荐如果是测试环境可以使用密钥文件，但是正式环境，官方推荐x.509证书。原理就是，集群中每一个实例彼此连接的时候都检验彼此使用的证书的内容是否相同。只有证书相同的实例彼此才可以访问。

#### 1、通过主节点添加一个管理员帐号
&emsp; 只需要在主节点上添加用户，副本集会自动同步
```shell
# 创建超管用户：myroot，密码：123456
use admin
db.createUser({user:"myroot",pwd:"123456",roles:["root"]})
```

#### 2、创建副本集认证的key文件
&emsp; 所有副本集节点都必须要用同一份keyfile，一般是在一台机器上生成，然后拷贝到其他机器上，且必须有读的权限
```shell
# 1、生成一个key文件到当前文件夹中。可以使用任何方法生成密钥文件。
openssl rand -base64 90 -out ./mongo.keyfile
# 2、使用chmod来更改文件权限，仅为文件所有者提供读取权限
chmod 400 ./mongo.keyfile
```

#### 3、修改配置文件指定keyfile
&emsp; 分别编辑几个服务的mongod.conf文件，添加相关内容
```shell
security:
 #KeyFile鉴权文件
 keyFile: /mongodb/replica_sets/myrs_27017/mongo.keyfile
 #开启认证方式运行
 authorization: enabled
```

#### 4、SpringDataMongoDB连接副本集的认证
```shell
uri:
mongodb://bobo:123456@180.76.159.126:27017,180.76.159.126:27018,180.76.159.126:27019/articledb?
        connect=replicaSet&slaveOk=true&replicaSet=myrs
```
