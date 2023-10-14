---
title: Kafka
author: Charles Chu
date: 2021/07/08
isOriginal: true
---

# Kafka  <Badge text="持续更新" type="warning" />

&emsp; Kafka 是一个分布式的基于发布/订阅模式的消息队列（Message Queue），主要应用于大数据实时处理领域。

&emsp; Kafka 是一个分布式消息队列，Kafka 对消息保存时根据 Topic 进行归类，Kafka 集群有多个 Kafka实例组成，每个实例 Server 称为 broker。

&emsp; 无论是 Kafka 集群还是 Consumer 都依赖于 ZooKeeper 集群保存一些 meta 信息，来保证系统可用性

##  Kafka 基础架构
![Infrastructure](/public/middleware/kafka/Infrastructure.png)
1. Producer ：消息生产者，就是向 kafka broker 发消息的客户端；
2. Consumer ：消息消费者，向 kafka broker 取消息的客户端；
3. Consumer Group （CG ）：消费者组，由多个 consumer 组成。 消费者组内每个消费者负责消费不同分区的数据，一个分区只能由一个组内消费者消费；消费者组之间互不影响。所有的消费者都属于某个消费者组，即消费者组是逻辑上的一个订阅者。
4. Broker ：一台 kafka 服务器就是一个 broker。一个集群由多个 broker 组成。一个 broker可以容纳多个 topic。
5. Topic ：可以理解为一个队列， 生产者和消费者面向的都是一个 topic；
6. Partition ：为了实现扩展性，一个非常大的 topic 可以分布到多个 broker（即服务器）上，一个 topic 可以分为多个 partition，每个 partition 是一个有序的队列；
7. Replica：副本，为保证集群中的某个节点发生故障时，该节点上的 partition 数据不丢失，且 kafka 仍然能够继续工作，kafka 提供了副本机制，一个 topic 的每个分区都有若干个副本，一个 leader 和若干个 follower。
8. leader ：每个分区多个副本的“主”，生产者发送数据的对象，以及消费者消费数据的对象都是 leader。
9. follower ：每个分区多个副本中的“从”，实时从 leader 中同步数据，保持和 leader 数据的同步。leader 发生故障时，某个 follower 会成为新的 follower。

## Kafka 工作流程
![WorkProcess](/public/middleware/kafka/WorkProcess.png)
&emsp; Kafka 中消息是以 topic 进行分类的，生产者生产消息，消费者消费消息，都是面向 topic的。

&emsp; topic 是逻辑上的概念，而 partition 是物理上的概念，每个 partition 对应于一个 log 文件，该 log 文件中存储的就是 producer 生产的数据。Producer 生产的数据会被不断追加到该log 文件末端，且每条数据都有自己的 offset。消费者组中的每个消费者，都会实时记录自己消费到了哪个 offset，以便出错恢复时，从上次的位置继续消费。

## Kafka文件存储机制
![FileStorage](/public/middleware/kafka/FileStorage.png)
&emsp; 由于生产者生产的消息会不断追加到 log 文件末尾，为防止 log 文件过大导致数据定位效率低下，Kafka 采取了 分片和 索引机制，将每个 partition 分为多个 segment。每个 segment对应两个文件——“.index”文件和“.log”文件。

&emsp; “.index”文件存储大量的索引信息，“.log”文件存储大量的数据，索引文件中的元数据指向对应数据文件中 message 的物理偏移地址。

## Kafka 生产者
### 分区策略
1. 指明 partition 的情况下，直接将指明的值直接作为 partiton 值；	
2. 没有指明 partition 值但有 key 的情况下，将 key 的 hash 值与 topic 的 partition数进行取余得到 partition 值；
3. 既没有 partition 值又没有 key 值的情况下，第一次调用时随机生成一个整数（后面每次调用在这个整数上自增），将这个值与 topic 可用的 partition 总数取余得到 partition值，也就是常说的 round-robin 算法。

### 数据可靠性保证

#### 1. ACK
&emsp; 为保证 producer 发送的数据，能可靠的发送到指定的 topic，topic 的每个 partition 收到producer 发送的数据后，都需要向 producer 发送 ack（acknowledgement 确认收到），如果producer 收到 ack，就会进行下一轮的发送，否则重新发送数据。		
![Ack](/public/middleware/kafka/Ack.png)	

#### 2. ISR		
&emsp; Leader 维护了一个动态的 in-sync replica set (ISR)，意为和 leader 保持同步的 follower 集合。当 ISR 中的 follower 完成数据的同步之后，leader 就会给 follower 发送 ack。如果follower长时间未向leader同步数据 ， 则该follower将被踢出ISR ， 该时间阈值由replica.lag.time.max.ms 参数设定。Leader 发生故障之后，就会从 ISR 中选举新的 leader。

#### 3. ack 应答机制
&emsp; 对于某些不太重要的数据，对数据的可靠性要求不是很高，能够容忍数据的少量丢失，所以没必要等 ISR 中的 follower 全部接收成功。
- 0：producer 不等待 broker 的 ack，这一操作提供了一个最低的延迟，broker 一接收到还没有写入磁盘就已经返回，当 broker 故障时有可能丢失数据；
- 1：producer 等待 broker 的 ack，partition 的 leader 落盘成功后返回 ack，如果在 follower同步成功之前 leader 故障，那么将会丢失数据；
- -1（all）：producer 等待 broker 的 ack，partition 的 leader 和 follower 全部落盘成功后才返回 ack。但是如果在 follower 同步完成后，broker 发送 ack 之前，leader 发生故障，那么会造成数据重复。

#### 4. 故障处理细节：Log文件中的HW和LEO	
![Leo&Hw](/public/middleware/kafka/Leo&Hw.png)	
- LEO：指的是每个副本最大的 offset ；
- HW：指的是消费者能见到的最大的 offset ，ISR 队列中最小的 LEO

##### follower故障
&emsp; follower 发生故障后会被临时踢出 ISR，待该 follower 恢复后，follower 会读取本地磁盘记录的上次的 HW，并将 log 文件高于 HW 的部分截取掉，从 HW 开始向 leader 进行同步。等该 follower 的 LEO 大于等于该 Partition 的 的 HW，即 follower 追上 leader 之后，就可以重新加入 ISR 了。

##### leader 故障
&emsp; leader 发生故障之后，会从 ISR 中选出一个新的 leader，之后，为保证多个副本之间的数据一致性，其余的 follower 会先将各自的 log 文件高于 HW 的部分截掉，然后从新的 leader同步数据。

&emsp; 注意：这只能保证副本之间的数据一致性，并不能保证数据不丢失或者不重复

## Kafka 消费者

### 消费方式
- consumer 采用 pull（拉）模式从 broker 中读取数据。
- pull 模式不足之处是，如果 kafka 没有数据，消费者可能会陷入循环中，一直返回空数据。针对这一点，Kafka 的消费者在消费数据时会传入一个时长参数 timeout，如果当前没有数据可供消费，consumer 会等待一段时间之后再返回，这段时长即为 timeout。

### 分区分配策略
&emsp; 一个 consumer group 中有多个 consumer，一个 topic 有多个 partition，所以必然会涉及到 partition 的分配问题，即确定那个 partition 由哪个 consumer 来消费。Kafka 有两种分配策略，一是 RoundRobin，一是 Range。

### offset 的维护
- 由于 consumer 在消费过程中可能会出现断电宕机等故障，consumer 恢复后，需要从故障前的位置的继续消费，所以 consumer 需要实时记录自己消费到了哪个 offset，以便故障恢复后继续消费。
- Kafka 0.9 版本之前，consumer 默认将 offset 保存在 Zookeeper 中，从 0.9 版本开始，consumer 默认将 offset 保存在 Kafka 一个内置的 topic 中，该 topic 为__consumer_offsets。

## Kafka 高效读写
- 顺序写磁盘
    - Kafka 的 producer 生产数据，要写入到 log 文件中，写的过程是一直追加到文件末端，为顺序写。官网有数据表明，同样的磁盘，顺序写能到 600M/s，而随机写只有 100K/s。这与磁盘的机械机构有关，顺序写之所以快，是因为其省去了大量磁头寻址的时间。
- 零复制技术

## Zookeeper 在 Kafka 中的作用
- Kafka 集群中有一个 broker 会被选举为 Controller，负责管理集群 broker 的上下线，所有 topic 的分区副本分配和 leader 选举等工作。
- Controller 的管理工作都是依赖于 Zookeeper 的。

## Kafka 命令行操作

### 查看当前服务器中的所有 topic
```shell
kafka-topics.sh --zookeeper hadoop102:2181 --list
```
### 创建 topic
```shell
kafka-topics.sh --zookeeper hadoop102:2181 --create --replication-factor 3 --partitions 1 --topic first

# 参数说明
# --topic 定义 topic 名
# --replication-factor 定义副本数
# --partitions 定义分区数
```

### 删除 topic
```shell
kafka-topics.sh --zookeeper hadoop102:2181 --delete --topic first

# 需要 server.properties 中设置 delete.topic.enable=true 否则只是标记删除。
```

### 发送消息
```shell
kafka-console-producer.sh --broker- list hadoop102:9092 --topic first
>hello world
>atguigu atguigu
```

### 消费消息
```shell
kafka-console-consumer.sh \ --zookeeper hadoop102:2181 --topic first
kafka-console-consumer.sh \ --bootstrap-server hadoop102:9092 --topic first
kafka-console-consumer.sh \ --bootstrap-server hadoop102:9092 --from-beginning --topic first

# --from-beginning：会把主题中以往所有的数据都读取出来。
```

### 查看某个 Topic 的详情
```shell
kafka-topics.sh --zookeeper hadoop102:2181 --describe --topic first
```

### 修改分区数
```shell
kafka-topics.sh --zookeeper hadoop102:2181 --alter --topic first --partitions 6
```

## Kafka API

### Producer
&emsp; Kafka 的 Producer 发送消息采用的是异步发送的方式。在消息发送的过程中，涉及到了两个线程: main 线程和 Sender 线程，以及一个线程共享变量RecordAccumulator。main 线程将消息发送给 RecordAccumulator，Sender 线程不断从 RecordAccumulator 中拉取消息发送到 Kafka broker。
```java
// KafkaProducer：需要创建一个生产者对象，用来发送数据
// ProducerConfig：获取所需的一系列配置参数
// ProducerRecord：每条数据都要封装成一个 ProducerRecord 对象

public static void main(String[] args) throws ExecutionException,InterruptedException {
    Properties props = new Properties();
    //kafka 集群，broker-list
    props.put("bootstrap.servers", "hadoop102:9092");
    props.put("acks", "all");
    //重试次数
    props.put("retries", 1);
    //批次大小
    props.put("batch.size", 16384);
    //等待时间
    props.put("linger.ms", 1);
    //RecordAccumulator 缓冲区大小
    props.put("buffer.memory", 33554432);
    props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
    props.put("value.serializer","org.apache.kafka.common.serialization.StringSerializer");
    Producer<String, String> producer = new KafkaProducer<>(props);
    for (int i = 0; i < 100; i++) {
        // 异步发送-不带回调函数
        producer.send(new ProducerRecord<String, String>("first", Integer.toString(i), Integer.toString(i)));
        
        // 异步发送-带回调函数
        producer.send(new ProducerRecord<String, String>("first",Integer.toString(i), Integer.toString(i)), 
            new Callback() {
                //回调函数，该方法会在 Producer 收到 ack 时调用，为异步调用
                @Override
                public void onCompletion(RecordMetadata metadata, Exception exception) {
                    if (exception == null) {
                        System.out.println("success->" +metadata.offset());
                    } else {
                        exception.printStackTrace();
                    }
                }
            }
        );

        // 同步发送
        producer.send(new ProducerRecord<String, String>("first",Integer.toString(i), Integer.toString(i))).get();
    }
    producer.close();
}
```

### Consumer
- Consumer 消费数据时的可靠性是很容易保证的，因为数据在Kafka中是持久化的，所以不用担心数据丢失问题。
- 由于 consumer 在消费过程中可能会出现断电宕机等故障，consumer 恢复后，需要从故障前的位置的继续消费，所以 consumer 需要实时记录自己消费到了哪个 offset，以便故障恢复后继续消费。
```java
// KafkaConsumer：需要创建一个消费者对象，用来消费数据
// ConsumerConfig：获取所需的一系列配置参数
// ConsuemrRecord：每条数据都要封装成一个 ConsumerRecord 对象

// 自动提交offset
public static void main(String[] args) {
    Properties props = new Properties();
    props.put("bootstrap.servers", "hadoop102:9092");
    props.put("group.id", "test");
    // 为了使我们能够专注于自己的业务逻辑，Kafka 提供了自动提交 offset 的功能。自动提交 offset 的相关参数：
    props.put("enable.auto.commit", "true"); // 是否开启自动提交 offset 功能
    props.put("auto.commit.interval.ms", "1000"); // 自动提交 offset 的时间间隔
    props.put("key.deserializer","org.apache.kafka.common.serialization.StringDeserializer");
    props.put("value.deserializer","org.apache.kafka.common.serialization.StringDeserializer");
    
   KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);
   consumer.subscribe(Arrays.asList("first"));
   while (true) {
       ConsumerRecords<String, String> records = consumer.poll(100);
       for (ConsumerRecord<String, String> record : records){
           System.out.printf("offset = %d, key = %s, value= %s%n", record.offset(), record.key(), record.value());
       }
   }
}

// 手动提交offset
// 无论是同步提交还是异步提交 offset，都有可能会造成数据的漏消费或者重复消费。
// 先提交 offset 后消费，有可能造成数据的漏消费；而先消费后提交 offset，有可能会造成数据的重复消费。
public static void main(String[] args) {
    Properties props = new Properties();
    props.put("bootstrap.servers", "hadoop102:9092"); //Kafka 集群
    props.put("group.id", "test"); //消费者组，只要 group.id 相同，就属于同一个消费者组
    //关闭自动提交 offset
    props.put("enable.auto.commit", "false");
    KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);
    consumer.subscribe(Arrays.asList("first"));//消费者订阅主题
    while (true) {
        ConsumerRecords<String, String> records = consumer.poll(100); //消费者拉取数据
        for (ConsumerRecord<String, String> record : records) {
            System.out.printf("offset = %d, key = %s, value = %s%n", record.offset(), record.key(), record.value());
        }
        //同步提交，当前线程会阻塞直到 offset 提交成功
        consumer.commitSync();
        
        //异步提交
        consumer.commitAsync(new OffsetCommitCallback() {
            @Override
            public void onComplete(Map<TopicPartition, OffsetAndMetadata> offsets, Exception exception) {
                if (exception != null) {
                    System.err.println("Commit failed for" + offsets);
                }
            }
        });
    }
}
```

### Producer 拦截器(interceptor)
&emsp; 对于 producer 而言，interceptor 使得用户在消息发送前以及 producer 回调逻辑前有机会对消息做一些定制化需求，比如修改消息等。同时，producer 允许用户指定多个 interceptor按序作用于同一条消息从而形成一个拦截链(interceptor chain)。Intercetpor 的实现接口是org.apache.kafka.clients.producer.ProducerInterceptor
```java
// 构造拦截器
public class TimeInterceptor implements ProducerInterceptor<String, String> {
    // 获取配置信息和初始化数据时调用。
    @Override
    public void configure(Map<String, ?> configs) {}
    
    // 该方法封装进 KafkaProducer.send 方法中，即它运行在用户主线程中。
    // Producer 确保在消息被序列化以及计算分区前调用该方法。
    // 用户可以在该方法中对消息做任何操作，但最好保证不要修改消息所属的 topic 和分区，否则会影响目标分区的计算。
    @Override
    public ProducerRecord<String, String> onSend(ProducerRecord<String, String> record) {
        // 创建一个新的 record，把时间戳写入消息体的最前部
        return new ProducerRecord(record.topic(), record.partition(), record.timestamp(), record.key(),
        System.currentTimeMillis() + "," + record.value().toString());
    }
    
    // 该方法会在消息从 RecordAccumulator 成功发送到 Kafka Broker 之后，或者在发送过程中失败时调用。
    // 并且通常都是在 producer 回调逻辑触发之前。
    // onAcknowledgement 运行在producer 的 IO 线程中，因此不要在该方法中放入很重的逻辑，否则会拖慢 producer 的消息发送效率。
    @Override
    public void onAcknowledgement(RecordMetadata metadata, Exception exception) {}
    
    // 关闭 interceptor，主要用于执行一些资源清理工作
    @Override
    public void close() {}
}

// 拦截器的使用
public static void main(String[] args) throws Exception {
    // 1 设置配置信息
    Properties props = new Properties();
    props.put("bootstrap.servers", "hadoop102:9092");
    props.put("acks", "all");
    props.put("retries", 3);
    props.put("batch.size", 16384);
    props.put("linger.ms", 1);
    props.put("buffer.memory", 33554432);
    props.put("key.serializer","org.apache.kafka.common.serialization.StringSerializer");
    props.put("value.serializer","org.apache.kafka.common.serialization.StringSerializer");
    // 2 构建拦截链
    // 另外倘若指定了多个 interceptor，则 producer 将按照指定顺序调用它们，
    List<String> interceptors = new ArrayList<>();
    interceptors.add("com.atguigu.kafka.interceptor.TimeInterceptor");
    interceptors.add("com.atguigu.kafka.interceptor.CounterInterceptor");
    props.put(ProducerConfig.INTERCEPTOR_CLASSES_CONFIG,interceptors);
    String topic = "first";
    Producer<String, String> producer = new KafkaProducer<>(props);
    // 3 发送消息
    for (int i = 0; i < 10; i++) {
        ProducerRecord<String, String> record = new ProducerRecord<>(topic, "message" + i);
        producer.send(record);
    }
    // 4 一定要关闭 producer，这样才会调用 interceptor 的 close 方法
    producer.close();
}
```