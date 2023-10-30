---
title: Zookeeper
author: Charles Chu
date: 2021/10/18
isOriginal: true
---

# Zookeeper  <Badge text="持续更新" type="warning" />

&emsp; ZooKeeper是一个分布式的，开放源码的分布式应用程序协调服务。它是一个为分布式应用提供一致性服务的软件，提供的功能包括：配置维护、域名服务、分布式同步、组服务等。

&emsp; zookeeper的数据节点可以视为树状结构（或者目录），树中的各节点被称为znode（即zookeeper node）

## znode
&emsp; znode，兼具文件和目录两种特点。既像文件一样维护着数据、元信息、ACL、时间戳等数据结构，又像目录一样可以作为路径标识的一部分。

&emsp; 一个znode大体上分为3各部分：
- 节点的数据：即znode data(节点path, 节点data)的关系就像是java map中(key,value)的关系
- 子节点的引用：节点的子节点children
- 节点的状态stat：用来描述当前节点的创建、修改记录，包括cZxid、ctime等
- 访问权限（acl）：记录客户端对znode节点的访问权限，如IP等。

### Znode的三种类型
- 持久节点（persistent node）节点会被持久
- 临时节点（ephemeral node）客户端断开连接后，ZooKeeper 会自动删除临时节点
- 顺序节点（sequential node）每次创建顺序节点，ZooKeeper 都会在路径后面自动添加上10位的数字，从1开始，最大是2147483647 （2^32-1）

### Znode的四种形式
- 持久节点:如 create /test/a  "hello"，通过 create
- 持久顺序节点:通过 create -s
- 临时节点:通过 create -e
- 临时顺序节点:通过 create -s -e

## zookeeper常用Shell命令

### 远程登录zookeeper命令
```shell
./zkCli.sh -server ip
```

### 1、新增节点
```shell
create [-s] [-e] path data  
# 其中-s 为有序节点，-e 临时节点，ZooKeeper的临时节点不允许拥有子节点。

create /hadoop "123456"
```

### 2、更新节点
```shell
set path data [version]
# 可以基于版本号进行更改，此时类似于乐观锁机制.
# 当你传入的数据版本号(dataVersion)和当前节点的数据版本号不符合时，zookeeper会拒绝本次修改

set /hadoop "345" 1
```

### 3、删除节点
```shell
delete path [version] 
# 和更新节点数据一样，也可以传入版本号

delete /hadoop 0 
version No is not valid : /hadoop 
# 当你传入的数据版本号 (dataVersion)和当前节点的数据版本号不符合时，zookeeper 不会执行删除操作。

delete /hadoop 1

# 要想删除某个节点及其所有后代节点，可以使用递归删除
rmr path 
```

### 4、查看节点
```shell
# get path
get /hadoop

123456
cZxid = 0x4  # 数据节点创建时的事务 ID
ctime = Thu Dec 12 14:55:53 CST 2019 # 数据节点创建时的时间
mZxid = 0x4 # 数据节点最后一次更新时的事务 ID
mtime = Thu Dec 12 14:55:53 CST 2019 # 数据节点最后一次更新时的时间
pZxid = 0x4 # 数据节点的子节点最后一次被修改时的事务 ID
cversion = 0 # 子节点的更改次数
dataVersion = 0 # 节点数据的更改次数
aclVersion = 0 # 节点的 ACL 的更改次数
ephemeralOwner = 0x0 # 如果节点是临时节点，则表示创建该节点的会话的SessionID；如果节点是持久节点，则该属性值为 0
dataLength = 6 # 数据内容的长度
numChildren = 0 # 数据节点当前的子节点个数
```
### 5、查看节点状态
```shell
stat path
# stat命令的返回值和 get 命令类似，但不会返回节点数据
```

### 6、查看节点列表
```shell
# 查看节点列表有 ls path 和 ls2 path 两个命令，后者是前者的增强。
ls path

# 不仅可以查看指定路径下的所有节点，还可以查看当前节点的信息
ls2 path
```

### 7、监听器
&emsp; zookeeper 的触发器是一次性的 (One-time trigger)，即触发一次后就会立即失效。
```shell
get path [watch]
# 使用 get path [watch] 注册的监听器能够在节点内容发生改变的时候，向客户端发出通知。
get /hadoop watch
set /hadoop 45678
WATCHER::WatchedEvent state:SyncConnected type:NodeDataChanged path:/hadoop # 节点值改变

stat path [watch]
# 使用 stat path [watch] 注册的监听器能够在节点状态发生改变的时候，向客户端发出通知
stat /hadoop watch
set /hadoop 112233
WATCHER::WatchedEvent state:SyncConnected type:NodeDataChanged path:/hadoop # 节点值改变

ls path [watch]
ls2 path [watch]
# ​使用 ls path [watch] 或 ls2 path [watch] 注册的监听器能够监听该节点下所有子节点的增加和删除操作。
ls /hadoop watch 
create /hadoop/yarn "aaa"
WATCHER::WatchedEvent state:SyncConnected type:NodeChildrenChanged path:/hadoop
```

## 一致性协议(zab协议)
&emsp; zab协议 的全称是 Zookeeper Atomic Broadcast （zookeeper原子广播）。zookeeper是通过 zab协议来保证分布式事务的最终一致性。

&emsp; 基于zab协议，zookeeper集群中的角色主要有以下三类：
角色 | 描述
-- | --
领导者（Leader） |  领导者负责进行投票的发起和决议，更新系统状态。
学习者（Learner）- 跟随者（Follower） | Follower用于接受客户请求并向客户端返回结果，在选主过程中参与投票 
学习者（Learner）- 观察者（Observer） | Observer可以接受客户端连接，将写请求转发给leader节点。当Observer不参加投票过程，只同步leader的状态。Observer的目的是为了扩展系统，提高读取速度。
客户端（Client） | 请求发起方

### zab广播模式工作原理
&emsp; 通过类似两阶段提交协议的方式解决数据一致性
![ZabPrinciple](/public/middleware/zookeeper/ZabPrinciple.png)
1. leader从客户端收到一个写请求；
2. leader生成一个新的事务并为这个事务生成一个唯一的ZXID；
3. leader将这个事务提议(propose)发送给所有的follows节点；
4. follower节点将收到的事务请求加入到历史队列(history queue)中,并发送ack给leader；
5. 当leader收到大多数follower（半数以上节点）的ack消息，leader会发送commit请求；
6. 当follower收到commit请求时，从历史队列中将事务请求commit；

## Zookeeper初始化Leader的选举
- 集群机器 ID
    - 集群机器 ID 是指 myid，它是每一个集群机器中的编号文件，代表 ZooKeeper 集群服务器的标识，手动生成，全局唯一。
- 事务 ID
    - 事务 ID 是指 zxid，Zookeeper 会给每个更新请求分配一个事务 ID，它是一个 64 位的数字，由 Leader 统一进行分配，全局唯一，不断递增，在一个节点的状态信息中可以查看到最新的事务 ID 信息。
![VoteLeader](/public/middleware/zookeeper/VoteLeader.png)
&emsp; 在集群初始化阶段，只有两台以以上的 ZK 启动才会发生leader选举，过程如下：
1. 每个 Server 发出一个投票。初始选举 ZK1 和 ZK2 都会将自己作为 Leader 服务器来进行投票，每次投票会包含所推举的服务器的(myid, ZXID)，此时 ZK1 的投票为(1, 0)，ZK2 的投票为(2, 0)，然后各自将这个投票发给集群中其他机器。
2. 收到投票。集群的每个服务器收到投票后，首先判断该投票的有效性，如检查是否是本轮投票、是否来自 LOOKING 状态的服务器。
3. 处理投票。每个发起投票的服务器需要将别人的投票和自己的投票进行比较，规则如下:
优先检查 ZXID。ZXID 比较大的服务器优先作为 Leader。如果 ZXID 相同，那么就比较 myid。myid 较大的服务器作为Leader服务器。
4. 统计投票。每次投票后，服务器都会统计投票信息，判断是否已经有过半机器接受到相同的投票信息，对于 ZK1、ZK2 而言，都统计出集群中已经有两台机器接受了(2, 0)的投票信息，此时便认为已经选出 ZK2 作为Leader。
5. 改变服务器状态。一旦确定了 Leader，每个服务器就会更新自己的状态，如果是Follower，那么就变更为 FOLLOWING，如果是 Leader，就变更为 LEADING。当新的 Zookeeper 节点 ZK3 启动时，发现已经有 Leader 了，不再选举，直接将直接的状态从 LOOKING 改为 FOLLOWING。

## zookeeper的acl权限控制
&emsp; zookeeper的access control list 访问控制列表可以做到节点的权限控制；

&emsp; acl 权限控制，使用scheme：id：permission 来标识，主要涵盖 3 个方面：
- 权限模式（scheme）：授权的策略
- 授权对象（id）：授权的对象
- 权限（permission）：授予的权限

&emsp; 其特性如下：
- zooKeeper的权限控制是基于每个znode节点的，需要对每个节点设置权限
- 每个znode支持设置多种权限控制方案和多个权限
- 子节点不会继承父节点的权限，客户端无权访问某节点，但可能可以访问它的子节点

### 权限模式(​采用何种方式授权)
方案 | 描述
-- | -- 
world | 只有一个用户：anyone，代表登录zokeeper所有人（默认）
ip | 对客户端使用IP地址认证
auth | 使用已添加认证的用户认证
digest | 使用“用户名:密码”方式认证

### 授权对象(给谁授予权限)
&emsp; ​授权对象ID是指，权限赋予的实体，例如：IP 地址或用户。

### 授予的权限
&emsp; create、delete、read、writer、admin也就是 增、删、改、查、管理权限，这5种权限简写为cdrwa。

&emsp; 这5种权限中，delete是指对子节点的删除权限，其它4种权限指对自身节点的操作权限。
权限  | ACL简写  | 描述
-- | -- | --
create | c | 可以创建子节点
delete | d | 可以删除子节点（仅下一级节点）
read | r | 可以读取节点数据及显示子节点列表
write | w | 可以设置节点数据
admin | a | 可以设置节点访问控制列表权限

### 授权的相关命令
命令 | 使用方式 | 描述 
-- | -- | -- 
getAcl | getAcl | 读取ACL权限
setAcl | setAcl | 设置ACL权限
addauth | addauth | 添加认证用户

```shell
# world授权模式
# setAcl <path> world:anyone:<acl>
setAcl /node1 world:anyone:cdrwa

# IP授权模式
# setAcl <path> ip:<ip>:<acl>
setAcl /node2 ip:192.168.60.129:cdrwa

# Auth授权模式
# addauth digest <user>:<password> #添加认证用户
# setAcl <path> auth:<user>:<acl>
addauth digest itcast:123456
setAcl /node3 auth:itcast:cdrwa

# Digest授权模式
# 先经过SHA1和BASE64处理的password
# echo -n <user>:<password> | openssl dgst -binary -sha1 | openssl base64
# setAcl <path> digest:<user>:<password>:<acl>
echo -n itheima:123456 | openssl dgst -binary -sha1 | openssl base64 #得到123456的密文qlzQzCLKhBROghkooLvb+Mlwv4A=
setAcl /node4 digest:itheima:qlzQzCLKhBROghkooLvb+Mlwv4A=:cdrwa

# 多种模式授权，同一个节点可以同时使用多种模式授权，用逗号分隔
setAcl /node5 ip:192.168.60.129:cdra,auth:itcast:cdrwa,digest:itheima:qlzQzCLKhBROghkooLvb+Mlwv4A=:cdrwa
```

## zookeeper 事件监听机制
&emsp; zookeeper提供了数据的发布/订阅功能，多个订阅者可同时监听某一特定主题对象，当该主题对象的自身状态发生变化时(例如节点内容改变、节点下的子节点列表改变等)，会实时、主动通知所有订阅者

### watcher架构
客户端首先将Watcher注册到服务端，同时将Watcher对象保存到客户端的Watch管理器中。当ZooKeeper服务端监听的数据状态发生变化时，服务端会主动通知客户端，接着客户端的Watch管理器会触发相关Watcher来回调相应处理逻辑，从而完成整体的数据发布/订阅流程。
![Watch](/public/middleware/zookeeper/Watch.png)

#### 四个特性
- 一次性：一旦一个Wather触发之后，Zookeeper就会将它从存储中移除，如果还要继续监听这个节点，就需要我们在客户端的监听回调中，再次对节点的监听watch事件设置为True。否则客户端只能接收到一次该节点的变更通知
- 客户端串行：客户端的Wather回调处理是串行同步的过程，不要因为一个Wather的逻辑阻塞整个客户端
- 轻量：Wather通知的单位是WathedEvent，只包含通知状态、事件类型和节点路径，不包含具体的事件内容，具体的时间内容需要客户端主动去重新获取数据
- 异步:  Zookeeper服务器发送watcher的通知事件到客户端是异步的，不能期望能够监控到节点每次的变化，Zookeeper只能保证最终的一致性，而无法保证强一致性。

#### watcher接口设计

##### KeeperState
&emsp; KeeperState是客户端与服务端连接状态发生变化时对应的通知类型。
枚举属性 | 说明
-- | --
SyncConnected | 客户端与服务器正常连接时
Disconnected | 客户端与服务器断开连接时
Expired | 会话session失效时
AuthFailed | 身份认证失败时

##### EventType
&emsp; EventType是数据节点(znode)发生变化时对应的通知类型。
枚举属性 | 说明
-- | -- 
None | 无
NodeCreated | Watcher监听的数据节点被创建时
NodeDeleted | Watcher监听的数据节点被删除时
NodeDataChanged | Watcher监听的数据节点内容发生变更时(无论内容数据是否变化)
NodeChildrenChanged | Watcher监听的数据节点的子节点列表发生变更时

&emsp; EventType变化时KeeperState永远处于SyncConnected通知状态下；当KeeperState发生变化时，EventType永远为None。

## Curator
&emsp; Curator是Netflix公司开源的一套zookeeper客户端框架，解决了很多Zookeeper客户端非常底层的细节开发工作，包括连接重连、反复注册Watcher和NodeExistsException异常等等，现在是Apache的开源项目。

&emsp; Curator封装了很多功能（分布式锁、leader选举、分布式队列、共享计数器等等），更加简单易用。

### 1、session重连策略
```java
//3秒后重连一次，只重连1次
RetryPolicy retryPolicy = new RetryOneTime(3000);

//每3秒重连一次，重连3次
RetryPolicy retryPolicy = new RetryNTimes(3,3000);

//每3秒重连一次，总等待时间超过10秒后停止重连
RetryPolicy retryPolicy=new RetryUntilElapsed(10000,3000);

// baseSleepTimeMs * Math.max(1, random.nextInt(1 << (retryCount+ 1)))
RetryPolicy retryPolicy = new ExponentialBackoffRetry(1000, 3);
```

### 2、连接到zookeeper
```java
// 创建连接对象
CuratorFramework client= CuratorFrameworkFactory.builder()
    // IP地址端口号
    .connectString("192.168.60.130:2181,192.168.60.130:2182,192.168.60.130:2183")
    // 会话超时时间
    .sessionTimeoutMs(5000)
    // 重连机制
    .retryPolicy(retryPolicy)
    // 命名空间
    .namespace("create")
    // 构建连接对象
    .build();
    
// 打开连接
client.start();

// 执行操作.....

// 关闭连接
client.close();
```

### 3、新增节点
```java
client.create()
    // 节点的类型
    .withMode(CreateMode.PERSISTENT)
    // 节点的权限列表 world:anyone:cdrwa
    .withACL(ZooDefs.Ids.OPEN_ACL_UNSAFE)
    // arg1:节点的路径，arg2:节点的数据
    .forPath("/node1", "node1".getBytes());
    
// 自定义权限列表
// 权限列表
List<ACL> list = new ArrayList<ACL>();
// 授权模式和授权对象
Id id = new Id("ip", "192.168.60.130");
list.add(new ACL(ZooDefs.Perms.ALL, id));
client.create().withMode(CreateMode.PERSISTENT).withACL(list).forPath("/node2", "node2".getBytes());

// 递归创建节点树
client.create().creatingParentsIfNeeded().withMode(CreateMode.PERSISTENT)
    .withACL(ZooDefs.Ids.OPEN_ACL_UNSAFE).forPath("/node3/node31", "node31".getBytes());
    
 // 异步方式创建节点
client.create().creatingParentsIfNeeded().withMode(CreateMode.PERSISTENT)
    .withACL(ZooDefs.Ids.OPEN_ACL_UNSAFE)
    // 异步回调接口
    .inBackground(new BackgroundCallback() {
        public void processResult(CuratorFramework curatorFramework, CuratorEvent curatorEvent) throws Exception {
            // 节点的路径
            System.out.println(curatorEvent.getPath());
            // 时间类型
            System.out.println(curatorEvent.getType());
        }
    })
    .forPath("/node4","node4".getBytes());   
```

### 4、更新节点
```java
// arg1:节点的路径,arg2:节点的数据
client.setData().forPath("/node1", "node11".getBytes());

// 指定版本号
client.setData().withVersion(2).forPath("/node1", "node1111".getBytes());
```

### 5、删除节点
```java
client.delete().forPath("/node1");

//删除包含子节点的节点
client.delete().deletingChildrenIfNeeded().withVersion(-1).forPath("/node1");
```

### 6、查看节点
```java
byte [] bys=client.getData().forPath("/node1");

// 读取数据时读取节点的属性
Stat stat=new Stat();
byte [] bys=client.getData().storingStatIn(stat).forPath("/node1");
```

### 7、查看子节点
```java
List<String> list = client.getChildren().forPath("/get");
```

### 8、检查节点是否存在
```java
Stat stat= client.checkExists().forPath("/node2");
```

### 9、watcherAPI
&emsp; NodeCache : 只是监听某一个特定的节点，监听节点的新增和修改

&emsp; PathChildrenCache : 监控ZNode的子节点。当一个子节点增加，更新，删除时，PathCache会改变它的状态，会包含最新的子节点，子节点的数据和状态
```java
// 监视某个节点的数据变化。arg1:连接对象，arg2:监视的节点路径
NodeCache nodeCache=new NodeCache(client,"/watcher1");
// 启动监视器对象
nodeCache.start();
nodeCache.getListenable().addListener(new NodeCacheListener() {
    // 节点变化时回调的方法
    public void nodeChanged() throws Exception {
        System.out.println(nodeCache.getCurrentData().getPath());
        System.out.println(newString(nodeCache.getCurrentData().getData()));
   }
});
//关闭监视器对象
nodeCache.close();


// 监视子节点的变化。arg1:连接对象，arg2:监视的节点路径，arg3:事件中是否可以获取节点的数据
PathChildrenCache pathChildrenCache=new PathChildrenCache(client,"/watcher1",true);
// 启动监听
pathChildrenCache.start();
pathChildrenCache.getListenable().addListener(new PathChildrenCacheListener() {
    // 当子节点方法变化时回调的方法
    public void childEvent(CuratorFramework curatorFramework,PathChildrenCacheEvent pathChildrenCacheEvent) {
        // 节点的事件类型
        System.out.println(pathChildrenCacheEvent.getType());
        // 节点的路径
        System.out.println(pathChildrenCacheEvent.getData().getPath());
        // 节点数据
        System.out.println(new String(pathChildrenCacheEvent.getData().getData()));
    }
});

// 关闭监听
pathChildrenCache.close();
```

### 10、事务
```java
client.inTransaction().
    create().forPath("node1", "node1".getBytes()).
    and().
    create().forPath("node2", "node2".getBytes()).
    and().
    commit();
```

### 11、分布式锁
&emsp; InterProcessMutex：分布式可重入排它锁

&emsp; InterProcessReadWriteLock：分布式读写锁
```java
// 排他锁。arg1:连接对象，arg2:节点路径
InterProcessLock interProcessLock = new InterProcessMutex(client,"/lock1");
// 获取锁
interProcessLock.acquire();
for (int i = 1; i <= 10; i++) {
    Thread.sleep(3000);
    System.out.println(i);
}
// 释放锁
interProcessLock.release();

// 读锁
InterProcessReadWriteLock interProcessReadWriteLock=new InterProcessReadWriteLock(client, "/lock1");
// 获取读锁对象
InterProcessLock interProcessLock=interProcessReadWriteLock.readLock();
// 获取锁
interProcessLock.acquire();
for (int i = 1; i <= 10; i++) {
    Thread.sleep(3000);
    System.out.println(i);
}
// 释放锁
interProcessLock.release();

// 写锁
InterProcessReadWriteLock interProcessReadWriteLock=new InterProcessReadWriteLock(client, "/lock1");
// 获取写锁对象
InterProcessLock interProcessLock=interProcessReadWriteLock.writeLock();
// 获取锁
interProcessLock.acquire();
for (int i = 1; i <= 10; i++) {
    Thread.sleep(3000);
    System.out.println(i);
}
// 释放锁
interProcessLock.release();
```

## zookeeper应用场景
&emsp; zooKeeper是一个经典的分布式数据一致性解决方案，致力于为分布式应用提供一个高性能、高可用，且具有严格顺序访问控制能力的分布式协调存储服务。Zookeeper 最常用的一个使用场景就是作为注册中心，生产者将自己提供的服务注册到 Zookeeper，然后消费者从 Zookeeper 中拿到生产者的服务列表信息，然后再去调用生产者的内容数据，比如 Dubbo，Kafka 都是使用 Zookeeper 作为注册中心的。

### 维护配置信息
&emsp; 将公共的配置存放在Zookeeper的节点中，应用程序连接到Zookeeper中并对Zookeeper中配置节点进行读取或者修改（对于写操作可以进行权限验证设置）
![ManagerConfiguration](/public/middleware/zookeeper/ManagerConfiguration.png)

### 分布式锁服务
1. 首先zookeeper中我们可以创建一个/distributed_lock持久化节点
2. 然后再在/distributed_lock节点下创建自己的临时顺序节点，比如：/distributed_lock/task_00000000008
3. 获取所有的/distributed_lock下的所有子节点，并排序
4. 判读自己创建的节点是否最小值（第一位）
5. 如果是，则获取得到锁，执行自己的业务逻辑，最后删除这个临时节点。
6. 如果不是最小值，则需要监听自己创建节点前一位节点的数据变化，并阻塞。
7. 当前一位节点被删除时，我们需要通过递归来判断自己创建的节点是否在是最小的，如果是则执行5）；如果不是则执行6）（就是递归循环的判断）
![DistributedLock](/public/middleware/zookeeper/DistributedLock.png)

### 分布式队列
1. 首先利用Zookeeper中临时顺序节点的特点
2. 当生产者创建节点生产时，需要判断父节点下临时顺序子节点的个数，如果达到了上限，则阻塞等待；如果没有达到，就创建节点。
3. 当消费者获取节点时，如果父节点中不存在临时顺序子节点，则阻塞等待；如果有子节点，则获取执行自己的业务，执行完毕后删除该节点即可。
4. 获取时获取最小值，保证FIFO特性。

### 集群管理（负载均衡）
![ClusterManagement](/public/middleware/zookeeper/ClusterManagement.png)

### 生成分布式唯一ID