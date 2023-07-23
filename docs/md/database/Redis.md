# Redis
&emsp; Redis (REmote DIctionary Server) 是用C语言开发的一个开源的高性能键值对（key-value）数据库。

## 特征
1. 数据间没有必然的关联关系
2. 内部采用单线程机制进行工作
3. 高性能。官方提供测试数据，50个并发执行100000 个请求,读的速度是110000 次/s,写的速度是81000次/s。
4. 多数据类型支持：
    - 字符串类型；string
    - 列表类型；list
    - 散列类型；hash
    - 集合类型；set
    - 有序集合类型；sorted_set
5. 持久化支持。可以进行数据灾难恢复


## Redis数据结构
&emsp; redis 自身是一个 Map，其中所有的数据都是采用 key : value 的形式存储；

&emsp; 数据类型指的是存储的数据的类型，也就是 value 部分的类型，key 部分永远都是字符串；

### String（字符串）单个数据
- 存储内容
    - 通常使用字符串，如果字符串以整数的形式展示，可以作为数字操作使用；
- 存储数据的格式
    - 一个存储空间保存一个数据；
- 使用场景
    - 计数器
    - 随机验证码

#### 相关命令

##### 添加
```shell
# 添加：
set key value

# 添加/修改多个数据：
mset key1 value1 key2 value2

# 追加信息到原始信息后部（如果原始信息存在就追加，否则新建）：
append key value

# 设置数值数据增加指定范围的值（数值为负数等同于decr）：
incr key;
incrby key increment;
incrbyfloat key increment;
# string在redis内部存储默认就是一个字符串，当遇到增减类操作incr，decr时会转成数值型进行计算
# 按数值进行操作的数据，如果原始数据不能转成数值，或超越了redis 数值上限范围，将报错。
# 9223372036854775807（java中long型数据最大值，Long.MAX_VALUE）

# 设置数值数据减少指定范围的值：
decr key;
decrby key increment;

# 设置数据具有指定的生命周期：
# 设置过期时间单位为秒
setex key seconds value
# 设置过期时间单位为毫秒
psetex key milliseconds value
```

##### 获取
```shell
# 获取：
get key

# 获取多个数据：
mget key1 key2

# 获取数据字符个数（字符串长度）：
strlen key
```

##### 删除
```shell
# 删除： 
del key
```

### Hash（哈希类型，字典，map格式 ）
&emsp; 对一系列存储的数据进行编组，方便管理，典型应用存储对象信息
- 存储数据的格式
    - 一个存储空间保存多个键值对数据
- 使用场景
    - 存储对象类型的数据（如用户信息数据）
- hash类型
    - 底层使用哈希表结构实现数据存储
- 注意
    - 每个 hash 可以存储 2^32 - 1 个键值对
    - hgetall 操作可以获取全部属性，如果内部field过多，遍历整体数据效率就很会低，有可能成为数据访问瓶颈

#### 相关命令

##### 添加/修改数据
```shell
# 添加/修改数据：
hset key field value

# 添加/修改多个数据：
hmset key field1 value1 field2 value2

# 设置指定字段的数值数据增加指定范围的值
hincrby key field increment
hincrbyfloat key field increment

# Redis Hsetnx 命令用于为哈希表中不存在的的字段赋值 。
# 如果哈希表不存在，一个新的哈希表被创建并进行 HSET 操作。如果字段已经存在于哈希表中，操作无效。
hsetnx key field value
```

##### 获取
```shell
# 获取指定的field对应的值
hget key field

# 获取所有的field和value 
hgetall key

# 获取多个数据
hmget key field1 field2

# 获取哈希表中字段的数量
hlen key

# 获取哈希表中是否存在指定的字段
hexists key field

# 获取哈希表中所有的字段名或字段值
# 字段名：
hkeys key
# 字段值：
hvals key
```

##### 删除
```shell
# 删除： 
hdel key field1  [field2]
```

### List（列表，linkedlist格式，支持重复元素）
&emsp; 存储多个数据，并对数据进入存储空间的顺序进行区分
- 存储结构
    - 一个存储空间保存多个数据，且通过数据可以体现进入顺序
- 使用场景
    - 消息队列，用户消息时间线 ，文章的评论列表
- list类型
    - 保存多个数据，底层使用双向链表存储结构实现
- 注意
    - list中保存的数据都是string类型的，数据总容量是有限的，最多2^32 - 1 个元素 (4294967295)。
    - 获取全部数据操作结束索引设置为-1

#### 相关命令

##### 添加
```shell
# 将元素加入列表左边
lpush key value1 [value2]

# 将元素加入列表右边
rpush key value1 [value2]
```

##### 获取
```shell
# 范围获取：start从0开始；end设置为-1 为最后一个
lrange key start end

# 获取第index个的数据，从0开始计算 
lindex key index

# 查询所有数量
llen key
      
# 获取并移除数据：
# 删除列表最左边的元素，并将元素返回
lpop key

# 删除列表最右边的元素，并将元素返回
rpop key
    
# 规定时间内获取并移除数据
# 命令移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止
blpop key1 [key2] timeout

# 移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
brpop key1 [key2] timeout

# 从列表中弹出一个值，将弹出的元素插入到另外一个列表中并返回它；如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
brpoplpush source destination timeout
```

##### 删除
```shell
lrem key count value
# 根据参数 COUNT 的值，移除列表中与参数 VALUE 相等的元素。
# count > 0 : 从表头开始向表尾搜索，移除与 VALUE 相等的元素，数量为 COUNT 。
# count < 0 : 从表尾开始向表头搜索，移除与 VALUE 相等的元素，数量为 COUNT 的绝对值。
# count = 0 : 移除表中所有与 VALUE 相等的值。
# 示例：
127.0.0.1:6379> lrange p 0 -1
1) "1"
2) "3"
3) "1"
4) "1"
# p队列中有 1，3，1，1

# 从左移除一个2
127.0.0.1:6379> lrem p 1 2
(integer) 0

# 从右移除一个1
127.0.0.1:6379> lrem p 1 1
(integer) 1

# 结果为3，1，1
127.0.0.1:6379> lrange p 0 -1
1) "3"
2) "1"
3) "1"
```

### Set（集合，不允许重复元素）
&emsp; 存储大量的数据，在查询方面提供更高的效率
- 存储结构
    - 能够保存大量的数据，高效的内部存储机制，便于查询
- 使用场景
    - 标签，共同好友（两个set实现交集、并集、差集）
- set类型
    - 与hash存储结构完全相同，仅存储键，不存储值（nil），并且值是不允许重复的
- 注意事项
    - set 类型不允许数据重复，如果添加的数据在 set 中已经存在，将只保留一份
    - set 虽然与hash的存储结构相同，但是无法启用hash中存储值的空间

#### 相关命令

##### 添加
```shell
# 添加数据：
sadd key value1 [value2]
```

##### 获取
```shell
# 获取全部数据:
smembers key

# 获取集合数据总量：
scard key

# 判断集合中是否包含指定数据
sismember key member

# 返回集合中一个或多个随机数，由count决定数量
srandmember key [count]

# 求两个集合的交、并、差集
# 返回给定所有集合的交集
sinter key1 key2
# 返回给定所有集合的交集并存储在 destination 中
sinterstore destination key1 [key2]

# 返回所有给定集合的并集
sunion key1 [key2]
# 所有给定集合的并集存储在 destination 集合中
sunionstore destination key1 [key2]

# 返回第一个集合与其他集合之间的差异
sdiff key1 [key2]
# 返回给定所有集合的差集并存储在 destination 中
sdiffstore destination key1 [key2]
```

##### 删除
```shell
# 删除set集合中的某个元素：
srem key value

# 移除并返回集合中的一个随机元素
spop key [count]
    
# 将 member 元素从 source 集合移动到 destination 集合
smove source destination member
```

### Sorted Set（有序集合，不允许重复元素，且元素有顺序）
&emsp; 数据排序有利于数据的有效展示，需要提供一种可以根据自身特征进行排序的方式
- 存储结构
    - 新的存储模型，可以保存可排序的数据
- 使用场景
    - 排行榜
- sorted_set类型
    - 在set的存储结构基础上添加可排序字段
- 注意事项
    - score保存的数据存储空间是64位，如果是整数范围是-9007199254740992~9007199254740992
    - score保存的数据也可以是一个双精度的double值，基于双精度浮点数的特征，可能会丢失精度，使用时候要慎重
    - sorted_set底层存储还是基于set结构的，因此数据不能重复，如果重复添加相同的数据，score值将被反复覆盖，保留最后一次修改结果

#### 相关命令

##### 添加
```shell
# 添加数据：
zadd key score1 member1 [score2 member2]
```

##### 获取
```shell
# 通过索引区间返回有序集合指定区间内的成员
zrange key start stop [WITHSCORES]

# 按条件获取数据：通过分数返回有序集合指定区间内的成员
zrangebyscore key min max [WITHSCORES] [LIMIT]

# 返回有序集中指定区间内的成员，通过索引，分数从高到低
zrevrange key start stop [WITHSCORES]

# 返回有序集中指定分数区间内的成员，分数从高到低排序
zrevrangebyscore key max min [WITHSCORES]

# 获取集合数据总量：
# 获取有序集合的成员数：
zcard key

# 计算在有序集合中指定区间分数的成员数 
zcount key min max
    
# 集合交、并操作：
# 计算给定的一个或多个有序集的交集并将结果集存储在新的有序集合 destination 中
# 默认情况下，结果集中某个成员的分数值是所有给定集下该成员分数值之和。
# numkeys 代表要合并几个集合
zinterstore destination numkeys key [key ...]

# 计算给定的一个或多个有序集的并集，并存储在新的 key 中
zunionstore destination numkeys key [key ...]
    
# 获取数据对应的索引（排名）
# 返回有序集合中指定成员的索引，从小打到，从0开始计算，不存在为-1
zrank key member

# 返回有序集合中指定成员的排名，有序集成员按分数值递减(从大到小)排序
zrevrank key member
    
# 返回有序集中，成员的分数值
zscore key member

# 有序集合中对指定成员的分数加上增量 increment
zincrby key increment member
```

##### 删除
```shell
# 删除数据：
zrem key member [member ...]

# 移除有序集合中给定的排名区间的所有成员
zremrangebyrank key start stop

# 移除有序集合中给定的分数区间的所有成员
zremrangebyscore key min max
```

## key的通用操作指令
```shell
# 删除指定key
del key

# 获取key是否存在
exists key

# 获取key的类型
type key

# 为指定key设置有效期:
# 为给定 key 设置过期时间，单位为秒
expire key seconds

# 为给定 key 设置过期时间，单位为毫秒
pexpire key milliseconds

# 时间参数是 UNIX 时间戳(unix timestamp)。
expireat key timestamp

# 设置 key 过期时间的时间戳(unix timestamp) 以毫秒计
pexpireat key milliseconds-timestamp
    
# 获取key的有效时间
# 以秒为单位，返回给定 key 的剩余生存时间(TTL, time to live)。
ttl key
# 结果
    # XX ：剩余时间
    # -1 ：永久有效的数据
    # -2 ：已经过期的数据 或 被删除的数据 或 未定义的数据

# 以毫秒为单位返回 key 的剩余的过期时间。
pttl key
    
# 切换key从时效性转换为永久性
persist key

# 查询key：keys pattern
# 查询模式规则:
# * 匹配任意数量的任意符号 
# ? 配合一个任意符号 
# [] 匹配一个指定符号
keys *         # 查询所有
keys it*       # 查询所有以it开头
keys *heima    # 查询所有以heima结尾
keys ??heima   # 查询所有前面两个字符任意，后面以heima结尾
keys user:?    # 查询所有以user:开头，最后一个字符任意
keys u[st]er:1 # 查询所有以u开头，以er:1结尾，中间包含一个字母，s或t

# 为key改名
# 当 key 和 newKey 相同，或者 key 不存在时，返回一个错误。 
rename key newkey

# 仅当 newkey 不存在时，将 key 改名为 newkey 。
renamenx key newkey
    
# 对所有key排序
# 因为sort命令默认排序对象为数字，当需要对字符串进行排序时，需要显式地在sort命令之后添加alpha修饰符。
sort key [alpha]
```

## 数据库的通用操作
```shell
# 切换数据库
select index

# 数据移动
move key db

# 数据清除
# 当前数据库的 key 的数量
dbsize

# 删除当前数据库的所有key 
flushdb

# 删除所有数据库的所有key
flushall
```

## 持久化
- RDB（数据，快照）：将当前数据状态进行保存，快照形式，存储数据结果，存储格式简单，关注点在数据；
- AOF（过程，日志）：将数据的操作过程进行保存，日志形式，存储操作过程，存储格式复杂，关注点在数据的操作过程；

### RDB（redis database）
&emsp; save指令的执行会阻塞当前Redis服务器，直到当前RDB过程完成为止，有可能会造成长时间阻塞，线上环境不建议使用；

#### 1、save
```shell
# 手动执行一次保存操作
sava
```

##### save指令相关配置
```shell
# 说明：设置存储至本地数据库时是否压缩数据，默认为 yes，采用 LZF 压缩
# 经验：通常默认为开启状态，如果设置为no，可以节省 CPU 运行时间，但会使存储的文件变大（巨大）
rdbcompression yes

# 说明：设置是否进行RDB文件格式校验，该校验过程在写文件和读文件过程均进行
# 经验：通常默认为开启状态，如果设置为no，可以节约读写性过程约10%时间消耗，但是存储一定的数据损坏风险
rdbchecksum yes

# 说明：设置本地数据库文件名，默认值为 dump.rdb
# 经验：通常设置为dump-端口号.rdb
dbfilename dump.rdb

# 说明：设置存储.rdb文件的路径
# 经验：通常设置成存储空间较大的目录中，目录名称data
dir /usr/local/redis/data

# 在redis.conf文件中配置
# 满足限定时间范围内key的变化数量达到指定数量即进行持久化
# second：监控时间范围；changes：监控key的变化量
save <second> <changes>
# eg：
save 900 1
save 300 10
save 60 10000
```

##### 提示
- save配置要根据实际业务情况进行设置，频度过高或过低都会出现性能问题，结果可能是灾难性的；
- save配置中对于second与changes设置通常具有互补对应关系，尽量不要设置成包含性关系；
- save配置启动后执行的是bgsave操作

####  2、bgsave
&emsp; bgsave命令是针对save阻塞问题做的优化。Redis内部所有涉及到RDB操作都采用bgsave的方式，save命令可以放弃使用。
```shell
# 手动启动后台保存操作，但不是立即执行
bgsave
```

##### bgsave指令工作原理
![BgSave](/public/database/redis/BgSave.png)

##### bgsave指令相关配置
```shell
# 说明：后台存储过程中如果出现错误现象，是否停止保存操作
# 经验：通常默认为开启状态
stop-writes-on-bgsave-error yes
```

#### save和bgsave指令比对
方式 | save指令 | bgsave指令
-- | -- | --
读写 | 同步 | 异步
阻塞客户端指令 | 是 | 否
额外内存消耗 | 否 | 是
启动新进程 | 否 | 是

#### RDB的优缺点

##### 优点
- RDB是一个紧凑压缩的二进制文件，存储效率较高
- RDB内部存储的是redis在某个时间点的数据快照，非常适合用于数据备份，全量复制等场景
- RDB恢复数据的速度要比AOF快很多
-- 应用：服务器中每X小时执行bgsave备份，并将RDB文件拷贝到远程机器中，用于灾难恢复。

##### 缺点
- RDB方式无论是执行指令还是利用配置，无法做到实时持久化，具有较大的可能性丢失数据
- bgsave指令每次运行要执行fork操作创建子进程，要牺牲掉一些性能
- Redis的众多版本中未进行RDB文件格式的版本统一，有可能出现各版本服务之间数据格式无法兼容现象


### AOF（Append Only File）
&emsp; 以独立日志的方式记录每次写命令，重启时再重新执行AOF文件中命令达到恢复数据的目的。AOF的主要作用是解决了数据持久化的实时性，目前已经是Redis持久化的主流方式。

#### 1、AOF写数据三种策略(appendfsync)
- always(每次）
    - 每次写入操作均同步到AOF文件中，数据零误差，性能较低，不建议使用；
- everysec（每秒）
    - 每秒将缓冲区中的指令同步到AOF文件中，数据准确性较高，性能较高，建议使用，也是默认设置；
    - 在系统突然宕机的情况下丢失1秒内的数据；
- no（系统控制）
    - 由操作系统控制每次同步到AOF文件的周期，整体过程不可控；

#### 2、AOF相关配置
```shell
# 是否开启AOF持久化功能，默认为no
appendonly yes|no

# AOF写数据策略
appendfsync always|everysec|no

# AOF持久化文件名，默认文件名未appendonly.aof，建议配置为appendonly-端口号.aof
appendfilename filename

# AOF持久化文件保存路径，与RDB持久化文件保持一致即可
dir
```

#### 3、AOF重写
&emsp; 随着命令不断写入AOF，文件会越来越大，为了解决这个问题，Redis引入了AOF重写机制压缩文件体积。

&emsp; AOF文件重写是将Redis进程内的数据转化为写命令同步到新AOF文件的过程。简单说就是将对同一个数据的若干个条命令执行结果转化成最终结果数据对应的指令进行记录。

##### 3.1、AOF重写作用
- 降低磁盘占用量，提高磁盘利用率
- 提高持久化效率，降低持久化写时间，提高IO性能
- 降低数据恢复用时，提高数据恢复效率

##### 3.2、AOF重写规则
- 进程内已超时的数据不再写入文件
- 忽略无效指令，重写时使用进程内数据直接生成，这样新的AOF文件只保留最终数据的写入命令
    - 如del key1、 hdel key2、srem key3、set key4 111、set key4 222等
- 对同一数据的多条写命令合并为一条命令
    - 如lpush list1 a、lpush list1 b、 lpush list1 c 可以转化为：lpush list1 a b c。
    - 为防止数据量过大造成客户端缓冲区溢出，对list、set、hash、zset等类型，每条指令最多写入64个元素

##### 3.3、重写方式
```shell
# 手动重写
bgrewriteaof

# 自动重写，配置
# auto-aof-rewrite-min-size <size> 当前aof文件大于多少字节后才触发
# auto-aof-rewrite-percentage <percentage>  aof文件增长比例，指当前aof文件比上次重写的增长比例大小。
auto-aof-rewrite-min-size 64mb
auto-aof-rewrite-percentage 100
```

##### 自动重写触发比对参数
&emsp; 运行指令info Persistence获取具体信息
![AutoRewrite](/public/database/redis/AutoRewrite.png)


### RDB和AOF的区别
持久化方式 | RDB | AOF
-- | -- | --
占用存储空间 | 小（数据级：压缩） | 大（指令级：重写）
存储速度 | 慢 | 快
恢复速度 | 快 | 慢
数据安全性 | 会丢失数据 | 依据策略决定
资源消耗 | 高/重量级 | 低/轻量级
启动优先级 | 低 | 高

## 事务
&emsp; 一个命令执行的队列，将一系列预定义命令包装成一个整体（一个队列）。当执行时，一次性按照添加顺序依次执行，中间不会被打断或者干扰。

### 相关命令
```shell
# 开启事务：设定事务的开启位置，此指令执行后，后续的所有指令均加入到事务中
multi

# 执行事务：设定事务的结束位置，同时执行事务。与multi成对出现，成对使用
# 加入事务的命令暂时进入到任务队列中，并没有立即执行，只有执行exec命令才开始执行
exec

# 取消事务：终止当前事务的定义，发生在multi之后，exec之前
discard
```

### 注意事项
1. 语法错误：指命令书写格式有误；
    - 处理结果：如果定义的事务中所包含的命令存在语法错误，整体事务中所有命令均不会执行。包括那些语法正确的命令。
2. 运行错误：指命令格式正确，但是无法正确的执行。例如对list进行incr操作；
    - 处理结果：能够正确运行的命令会执行，运行错误的命令不会被执行，已经执行完毕的命令对应的数据不会自动回滚，需要程序员自己在代码中实现回滚。


## 锁

### 1、监视锁
&emsp; 对 key 添加监视锁，在执行exec前如果key发生了变化，终止事务执行
```shell
# 添加监视锁
watch key1 [key2.....]

# 取消对所有key的监视
unwatch
```

&emsp; 由于WATCH命令的作用只是当被监控的键值被修改后阻止之后一个事务的执行，而不能保证其他客户端不修改这一键值，所以在一般的情况下我们需要在EXEC执行失败后重新执行整个函数。执行EXEC命令后会取消对所有键的监控，如果不想执行事务中的命令也可以使用UNWATCH命令来取消监控。

### 2、分布式锁
&emsp; 使用 setnx 设置一个公共锁：该方法是一种设计概念，依赖规范保障，具有风险性

&emsp; 利用setnx命令的返回值特征，有值则返回设置失败，无值则返回设置成功
- 对于返回设置成功的，拥有控制权，进行下一步的具体业务操作
- 对于返回设置失败的，不具有控制权，排队或等待

&emsp; 操作完毕通过del操作释放锁
```shell
setnx lock-key value
```

### 3、分布式锁改良
&emsp; 使用 expire 为锁key添加时间限定，到时不释放，放弃锁
```shell
expire lock-key second
pexpire lock-key milliseconds
```

&emsp; 由于操作通常都是微秒或毫秒级，因此该锁定时间不宜设置过大。具体时间需要业务测试后确认。


## 数据删除策略

### 1、定时删除
&emsp; 创建一个定时器，当key设置有过期时间，且过期时间到达时，由定时器任务立即执行对键的删除操作；
- 优点：节约内存，到时就删除，快速释放掉不必要的内存占用
- 缺点：CPU压力很大，无论CPU此时负载量多高，均占用CPU，会影响redis服务器响应时间和指令吞吐量

&emsp; 总结：用处理器性能换取存储空间 （拿时间换空间）

### 2、惰性删除：
&emsp; 数据到达过期时间，不做处理。等下次访问该数据时：
- 如果未过期，返回数据
- 发现已过期，删除，返回不存在

&emsp; 优点：节约CPU性能，发现必须删除的时候才删除

&emsp; 缺点：内存压力很大，出现长期占用内存的数据

&emsp; 总结：用存储空间换取处理器性能（拿时间换空间）

### 3、定期删除
&emsp; 周期性轮询redis库中的时效性数据，采用随机抽取的策略，利用过期数据占比的方式控制删除频度

- 特点1：CPU性能占用设置有峰值，检测频度可自定义设置
- 特点2：内存压力不是很大，长期占用内存的冷数据会被持续清理

&emsp; 总结：周期性抽查存储空间（随机抽查，重点抽查）


## 逐出算法
&emsp; 当新数据进入redis时，如果内存不足：
- Redis使用内存存储数据，在执行每一个命令前，会调用freeMemoryIfNeeded()检测内存是否充足。如果内存不满足新加入数据的最低存储要求，redis要临时删除一些数据为当前指令清理存储空间。清理数据的策略称为逐出算法。
- 注意：逐出数据的过程不是100%能够清理出足够的可使用的内存空间，如果不成功则反复执行。当对所有数据尝试完毕后，如果不能达到内存清理的要求，将出现错误信息。
```shell
(error) OOM command not allowed when used memory >'maxmemory'
```

### 影响数据逐出的相关配置
```shell
# 最大可使用内存：占用物理内存的比例，默认值为0，表示不限制。生产环境中根据需求设定，通常设置在50%以上。
maxmemory

# 每次选取待删除数据的个数
# 选取数据时并不会全库扫描，导致严重的性能消耗，降低读写性能。因此采用随机获取数据的方式作为待检测删除数据
maxmemory-samples

# 删除策略；达到最大内存后的，对被挑选出来的数据进行删除的策略
maxmemory-policy
# 检测易失数据（可能会过期的数据集server.db[i].expires ）
    # volatile-lru：挑选最近最少使用的数据淘汰
    # volatile-lfu：挑选最近使用次数最少的数据淘汰
    # volatile-ttl：挑选将要过期的数据淘汰
    # volatile-random：任意选择数据淘汰
# 检测全库数据（所有数据集server.db[i].dict ）
    # allkeys-lru：挑选最近最少使用的数据淘汰
    # allkeys-lfu：挑选最近使用次数最少的数据淘汰
    # allkeys-random：任意选择数据淘汰
# 放弃数据驱逐
    # no-enviction（驱逐）：禁止驱逐数据（redis4.0中默认策略），会引发错误OOM（Out Of Memory）
```

## 服务器相关配置
```shell
# 设置服务器以守护进程的方式运行
daemonize yes|no

# 绑定主机地址
bind 127.0.0.1

# 设置服务器端口号
port 6379

# 设置数据库数量
databases 16

# 设置服务器以指定日志记录级别
# 注意：日志级别开发期设置为verbose即可，生产环境中配置为notice，简化日志输出量，降低写日志IO的频度
loglevel debug|verbose|notice|warning

# 日志记录文件名
logfile 端口号.log

# 设置同一时间最大客户端连接数，默认无限制。当客户端连接到达上限，Redis会关闭新的连接
maxclients 10000

# 客户端闲置等待最大时长，达到最大值后关闭连接。如需关闭该功能，设置为 0
timeout 300

# 导入并加载指定配置文件信息，用于快速创建redis公共配置较多的redis实例配置文件，便于维护
include /path/server-端口号.conf
```

## 主从复制
&emsp; 为了避免单点Redis服务器故障，准备多台服务器，互相连通。

&emsp; 将数据复制多个副本保存在不同的服务器上，连接在一起，并保证数据是同步的。即使有其中一台服务器宕机，其他服务器依然可以继续提供服务，实现Redis的高可用，同时实现数据冗余备份。

&emsp; 主从复制即将master中的数据即时、有效的复制到slave中。
![MasterSlave](/public/database/redis/MasterSlave.png)

- 特征 
    - 一个master可以拥有多个slave，一个slave只对应一个master
- 职责
    - master
        - 写数据
        - 执行写操作时，将出现变化的数据自动同步到slave
        - 读数据（可忽略）
    - slave
        - 读数据
        - 写数据（禁止）
- 主从复制的作用
    - 读写分离：master写、slave读，提高服务器的读写负载能力；
    - 负载均衡：基于主从结构，配合读写分离，由slave分担master负载，并根据需求的变化，改变slave的数量，通过多个从节点分担数据读取负载，大大提高Redis服务器并发量与数据吞吐量；
    - 故障恢复：当master出现问题时，由slave提供服务，实现快速的故障恢复；
    - 数据冗余：实现数据热备份，是持久化之外的一种数据冗余方式；
    - 高可用基石：基于主从复制，构建哨兵模式与集群，实现Redis的高可用方案；

### 主从复制3个阶段
1. 建立连接阶段（即准备阶段）；
2. 数据同步阶段；
3. 命令传播阶段.
![MasterSlaveStep](/public/database/redis/MasterSlaveStep.png)

#### 1、建立连接阶段
&emsp; 建立slave到master的连接，使master能够识别slave，并保存slave端口号
![MasterSlaveConn](/public/database/redis/MasterSlaveConn.png)
```shell
# 主从连接（slave连接master）
# 1、客户端发送命令:
slaveof <masterip> <masterport>
slaveof 192.168.80.128 6379

# 2、启动服务器参数:
redis-server -slaveof <masterip> <masterport>
redis-server -slaveof 192.168.80.128 6379

# 3、服务器配置
slaveof <masterip> <masterport>
slaveof 192.168.80.128 6379

# 主从断开连接：slave断开连接后，不会删除已有数据，只是不再接受master发送的数据
slaveof no one

# 授权访问设置：
# 1、master设置密码：（命令行）
config set requirepass <password>
config get requirepass

# 2.1、slave客户端发送命令设置密码
auth <password>
# 2.2 slave配置文件设置密码
masterauth <password>
# 2.3 slave启动服务器设置密码
redis-server –a <password>
```

#### 2、数据同步阶段
- 在slave初次连接master后，复制master中的所有数据到slave
- 将slave的数据库状态更新成master当前的数据库状态
![MasterSlaveSync](/public/database/redis/MasterSlaveSync.png)

#####  数据同步阶段master说明
1. 如果master数据量巨大，数据同步阶段应避开流量高峰期，避免造成master阻塞，影响业务正常执行；
2. 复制缓冲区大小设定不合理，会导致数据溢出。如进行全量复制周期太长，进行部分复制时发现数据已经存在丢失的情况，必须进行第二次全量复制，致使slave陷入死循环状态；
3. master单机内存占用主机内存的比例不应过大，建议使用50%-70%的内存，留下30%-50%的内存用于执行bgsave命令和创建复制缓冲区；
```shell
# 设置复制缓冲区大小
repl-backlog-size 1mb
```

##### 数据同步阶段slave说明
1. 为避免slave进行全量复制、部分复制时服务器响应阻塞或数据不同步，建议关闭此期间的对外服务；
2. 数据同步阶段，master发送给slave信息可以理解master是slave的一个客户端，主动向slave发送命令；
3. 多个slave同时对master请求数据同步，master发送的RDB文件增多，会对带宽造成巨大冲击，如果master带宽不足，因此数据同步需要根据业务需求，适量错峰；
4. slave过多时，建议调整拓扑结构，由一主多从结构变为树状结构，中间的节点既是master，也是slave。注意使用树状结构时，由于层级深度，导致深度越高的slave与最顶层master间数据同步延迟较大，数据一致性变差，应谨慎选择。
```shell
slave-serve-stale-data yes|no
```

#### 3、命令传播阶段
- 当master数据库状态被修改后，导致主从服务器数据库状态不一致，此时需要让主从数据同步到一致的状态，同步的动作称为命令传播；
- master将接收到的数据变更命令发送给slave，slave接收命令后执行命令；

### 部分复制的三个核心要素

#### 服务器的运行 id（run id）
- 概念：服务器运行ID是每一台服务器每次运行的身份识别码，一台服务器多次运行可以生成多个运行id；
- 组成：运行id由40位字符组成，是一个随机的十六进制字符；
    - 例如：fdc9ff13b9bbaab28db42b3d50f852bb5e3fcdce
- 作用：运行id被用于在服务器间进行传输，识别身份；
    - 如果想两次操作均对同一台服务器进行，必须每次操作携带对应的运行id，用于对方识别
- 实现方式：运行id在每台服务器启动时自动生成的，master在首次连接slave时，会将自己的运行ID发送给slave，slave保存此ID，通过info Server命令，可以查看节点的runid；

#### 主服务器的复制积压缓冲区
- 复制缓冲区，又名复制积压缓冲区，是一个先进先出（FIFO）的队列，用于存储服务器执行过的命令，每次传播命令，master都会将传播的命令记录下来，并存储在复制缓冲区；
- 由来：每台服务器启动时，如果开启有AOF或被连接成为master节点，即创建复制缓冲区
- 作用：用于保存master收到的所有指令（仅影响数据变更的指令，例如set）

#### 主从服务器的复制偏移量
- 概念：一个数字，描述复制缓冲区中的指令字节位置；
- 分类：
    - master复制偏移量：记录发送给所有slave的指令字节对应的位置（多个）
    - slave复制偏移量：记录slave接收master发送过来的指令字节对应的位置（一个）
- 数据来源：
    - master端：发送一次记录一次；
    - slave端：接收一次记录一次
- 作用：
    - 同步信息，比对master与slave的差异，当slave断线后，恢复数据使用

![MasterSlaveCopy](/public/database/redis/MasterSlaveCopy.png)

### 心跳机制
- 进入命令传播阶段候，master与slave间需要进行信息交换，使用心跳机制进行维护，实现双方连接保持在线；

#### master心跳：
- 指令：PING
- 周期：由repl-ping-slave-period决定，默认10秒
- 作用：判断slave是否在线
- 查询：INFO replication，获取slave最后一次连接时间间隔，lag项维持在0或1视为正常

#### slave心跳任务：
- 指令：REPLCONF ACK \{offset}
- 周期：1秒
- 作用
    - 汇报slave自己的复制偏移量，获取最新的数据变更指令
    - 判断master是否在线

- 当slave多数掉线，或延迟过高时，master为保障数据稳定性，将拒绝所有信息同步操作
```shell
# slave数量少于2个，或者所有slave的延迟都大于等于10秒时，强制关闭master写功能，停止数据同步
min-slaves-to-write 2
min-slaves-max-lag 8
```

