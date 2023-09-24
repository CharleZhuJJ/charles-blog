---
title: ActiveMQ
author: Charles Chu
date: 2021/09/30
isOriginal: true
---

# ActiveMQ

&emsp; Apache ActiveMQ是Apache软件基金会所研发的开放源代码消息中间件；由于ActiveMQ是一个纯Java程序，因此只需要操作系统支持Java虚拟机，ActiveMQ便可执行。

## 消息持久化
&emsp; ActiveMQ提供了以下三种的消息存储方式：
1. Memory 消息存储-基于内存的消息存储。
2. 基于日志消息存储方式，KahaDB是ActiveMQ的默认日志存储方式，它提供了容量的提升和恢复能力。
3. 基于JDBC的消息存储方式-数据存储于数据库（例如：MySQL）中。

### ActiveMQ持久化机制流程图
![Persistence](/public/middleware/activemq/Persistence.png)

### 基于jdbc的消息持久化实现
1. application.yml
```yaml
server:
    port: 9001
spring:
    activemq:
        broker-url: tcp://192.168.66.133:61616
        user: admin
        password: admin
jms:
    pub-sub-domain: false # false：点对点队列模式， true：发布/订阅模式
    template:
        delivery-mode: persistent # 持久化
        
activemq:
    name: springboot-queue01
```

2. activemq.xml
```xml
<!--配置数据库连接池-->
<bean name="mysql-ds" class="com.alibaba.druid.pool.DruidDataSource" destroy-method="close">
    <property name="driverClassName" value="com.mysql.jdbc.Driver" />
    <property name="url" value="jdbc:mysql://192.168.66.133:3306/db_activemq" />
    <property name="username" value="root" />
    <property name="password" value="123456"/>
</bean>

<!--JDBC Jdbc用于master/slave模式的数据库分享 -->
<persistenceAdapter>
    <jdbcPersistenceAdapter dataSource="#mysql-ds"/>
</persistenceAdapter>
```

3. 拷贝mysql及durid数据源的jar包到activemq的lib目录下
4. 重启activemq

## 消息事务
&emsp; 消息事务，是保证消息传递原子性的一个重要特征，和JDBC的事务特征类似。

&emsp; 一个事务性发送，其中一组消息要么能够全部保证到达服务器，要么都不到达服务器。

&emsp; 生产者、消费者与消息服务器直接都支持事务性；ActionMQ的事务主要偏向在生产者的应用。

![Transaction](/public/middleware/activemq/Transaction.png)

### 生产者事务（一）
```java
public void sendMessageTx(){
    ConnectionFactory connectionFactory = jmsMessagingTemplate.getConnectionFactory();
    Session session = null;
    try {
        Connection connection = connectionFactory.createConnection();
        /**
        * 参数一：是否开启消息事务
        */
        session = connection.createSession(true, Session.AUTO_ACKNOWLEDGE);
        MessageProducer producer =  session.createProducer(session.createQueue(name));
        for(int i=1;i<=10;i++){
            //模拟异常
            if(i==4){
                int a = 10/0;
            }
            TextMessage textMessage = session.createTextMessage("消息--" +  i);
            producer.send(textMessage);
        }
        //注意：一旦开启事务发送，那么就必须使用commit方法进行事务提交，否则消息无法到达MQ服务器
        session.commit();
    } catch (JMSException e) {
        e.printStackTrace();
        //消息事务回滚
        try {
            session.rollback();
        } catch (JMSException e1) {
            e1.printStackTrace();
        }
    }
}
```

### 生产者事务（二）
```java
// 配置类
@Configuration
public class ActiveMqConfig {
    @Bean
    public PlatformTransactionManager transactionManager(ConnectionFactory connectionFactory) {
        return new JmsTransactionManager(connectionFactory);
    }
}

// 业务类
@Service
public class MessageService {
    @Autowired
    private JmsMessagingTemplate jmsMessagingTemplate;
    @Value("${activemq.name}")
    private String name;
  
    @Transactional // 对消息发送加入事务管理（同时也对JDBC数据库的事务生效）
    public void sendMessage(){
        for(int i=1;i<=10;i++) {
        //模拟异常
        if(i==4){
            int a = 10/0;
        }
        jmsMessagingTemplate.convertAndSend(name, "消息---"+i);
        }
    }
}
```

### 消费者事务
```java
@Component
public class Consumer {
    /**
    * 接收消息的方法
    */
    @JmsListener(destination="${activemq.name}",containerFactory ="jmsQueryListenerFactory")
    public void receiveMessage(TextMessage textMessage,Session session) throws JMSException {
        try {
            System.out.println("消息内容：" + textMessage.getText() + ",是否重发：" + textMessage.getJMSRedelivered());
            int i = 100/0; //模拟异常
            session.commit();//提交事务
        } catch (JMSException e) {
            try {
                session.rollback();//回滚事务
            } catch (JMSException e1) {
            }
            e.printStackTrace();
        }
    }
}
```

## 消息确认机制
&emsp; JMS消息只有在被确认之后，才认为已经被成功地消费了。消息的成功消费通常包含三个阶段：客户接收消息、客户处理消息和消息被确认。在事务性会话中，当一个事务被提交的时候，确认自动发生。在非事务性会话中，消息何时被确认取决于创建会话时的应答模式（acknowledgement mode）。该参数有以下三个可选值：

值 | 描述
-- | --
Session.AUTO_ACKNOWLEDGE | 当客户成功的从receive方法返回的时候，或者从MessageListener.onMessage方法成功返回的时候，会话自动确认客户收到的消息
Session.CLIENT_ACKNOWLEDGE | 客户通过消息的acknowledge方法确认消息。需要注意的是，在这种模式中，确认是在会话层上进行：确认一个被消费的消息将自动确认所有已被会话消费的消息。例如，如果一个消息消费者消费了10个消息，然后确认第5个消息，那么所有10个消息都被确认
Session.DUPS_ACKNOWLEDGE | 该选择只是会话迟钝确认消息的提交。如果JMS provider失败，那么可能会导致一些重复的消息。如果是重复的消息，那么JMS provider必须把消息头的MSRedelivered字段设置为true

&emsp; 注意：消息确认机制与事务机制是冲突的，只能选其中一种。所以演示消息确认前，先关闭事务。
```java
// 配置类
@Configuration
public class ActiveMqConfig {
    @Bean(name="jmsQueryListenerFactory")
    public DefaultJmsListenerContainerFactory jmsListenerContainerFactory(ConnectionFactory connectionFactory){
        DefaultJmsListenerContainerFactory factory=new DefaultJmsListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory);
        factory.setSessionTransacted(false); // 不开启事务操作
        factory.setSessionAcknowledgeMode(1); //自动确认
        // factory.setSessionAcknowledgeMode(4); //手动确认
        return factory;
    }
}

// auto_acknowledge 自动确认
@JmsListener(destination="${activemq.name}",containerFactory ="jmsQueryListenerFactory")
public void receiveMessage(TextMessage textMessage){
    try {
        System.out.println("消息内容：" + textMessage.getText() + ",是否重发：" + textMessage.getJMSRedelivered());
        throw new RuntimeException("test");
    } catch (JMSException e) {
        e.printStackTrace();
    }
}

// client_acknowledge 手动确认
@JmsListener(destination="${activemq.name}",containerFactory = "jmsQueryListenerFactory")
public void receiveMessage(TextMessage textMessage){
    try {
        System.out.println("消息内容：" + textMessage.getText() + ",是否重发：" + textMessage.getJMSRedelivered());
        textMessage.acknowledge(); // 确认收到消息，一旦消息确认，消息不会重新发送
        throw new RuntimeException("test");
    } catch (JMSException e) {
        e.printStackTrace();
    }
}
```

## 消息投递方式

### 同步发送
&emsp; 消息生产者使用持久（Persistent）传递模式发送消息的时候，Producer.send() 方法会被阻塞，直到broker 发送一个确认消息给生产者(ProducerAck)，这个确认消息暗示broker已经成功接收到消息并把消息保存到二级存储中。

### 异步发送
&emsp; 如果应用程序能够容忍一些消息的丢失，那么可以使用异步发送。异步发送不会在受到broker的确认之前一直阻塞 Producer.send方法。

&emsp; 默认情况(alwaysSyncSend=false,useAsyncSend=false)，非持久化消息、事务内的消息均采用异步发送；对于持久化消息采用同步发送。
```java
@Configuration
public class ActiveConfig {
    /**
    * 配置用于异步发送的非持久化JmsTemplate
    */
    @Autowired
    @Bean
    public JmsTemplate asynJmsTemplate(PooledConnectionFactory pooledConnectionFactory) {
        JmsTemplate template = new JmsTemplate(pooledConnectionFactory);
        template.setExplicitQosEnabled(true);
        template.setDeliveryMode(DeliveryMode.NON_PERSISTENT);
        return template;
    }
    
    /**
    * 配置用于同步发送的持久化JmsTemplate
    */
    @Autowired
    @Bean
    public JmsTemplate synJmsTemplate(PooledConnectionFactory pooledConnectionFactory) {
        JmsTemplate template = new JmsTemplate(pooledConnectionFactory);
        return template;
    }
}


/**
* 异步投递，回调函数，以确认消息是否发送成功！
* @return
*/
@RequestMapping("/send")
public String sendQueue(){
    Connection connection = null;
    Session session = null;
    ActiveMQMessageProducer producer = null;
    // 获取连接工厂
    ConnectionFactory connectionFactory = jmsMessagingTemplate.getConnectionFactory();
    try {
        connection = connectionFactory.createConnection();
        session = connection.createSession(true, Session.AUTO_ACKNOWLEDGE);
        Queue queue = session.createQueue(name);
        int count = 10;
        producer = session.createProducer(queue);
        producer.setDeliveryMode(DeliveryMode.NON_PERSISTENT);
        long start = System.currentTimeMillis();
        for (int i = 0; i < count; i++) {
            //创建需要发送的消息
            TextMessage textMessage = session.createTextMessage("Hello");
            //设置消息唯一ID
            String msgid = UUID.randomUUID().toString();
            textMessage.setJMSMessageID(msgid);
            producer.send(textMessage, new AsyncCallback() {
                @Override
                public void onSuccess() {
                    // 使用msgid标识来进行消息发送成功的处理
                    System.out.println(msgid+" 消息发送成功");
                }
                
                @Override
                public void onException(JMSException exception) {
                    // 使用msgid表示进行消息发送失败的处理
                    System.out.println(msgid+" 消息发送失败");
                    exception.printStackTrace();
                }
            });
        }
        session.commit();
    } catch (Exception e) {
        e.printStackTrace();
    }
    return "ok";
}
```

### 延迟投递
&emsp; 生产者提供两个发送消息的方法，一个是即时发送消息，一个是延时发送消息。
1. 修改activemq.xml
```xml
<broker xmlns="http://activemq.apache.org/schema/core" ...
schedulerSupport="true" >  <!-- 添加schedulerSupport="true"配置 -->
......
</broker>
```

2. 在代码中设置延迟时长
```java
/**
* 延时投递
*/
public String sendQueue() {
    Connection connection = null;
    Session session = null;
    ActiveMQMessageProducer producer = null;
    // 获取连接工厂
    ConnectionFactory connectionFactory = jmsMessagingTemplate.getConnectionFactory();
    try {
        connection = connectionFactory.createConnection();
        session = connection.createSession(true, Session.AUTO_ACKNOWLEDGE);
        Queue queue = session.createQueue(name);
        int count = 10;
        producer = (ActiveMQMessageProducer) session.createProducer(queue);
        producer.setDeliveryMode(DeliveryMode.NON_PERSISTENT);
        //创建需要发送的消息
        TextMessage textMessage = session.createTextMessage("Hello");
        //设置延时时长(延时10秒)
        textMessage.setLongProperty(ScheduledMessage.AMQ_SCHEDULED_DELAY, 10000);
        producer.send(textMessage);
        session.commit();
    } catch (Exception e) {
        e.printStackTrace();
    }
    return "ok";
}
```

### 定时投递
1. 启动类添加定时注解
```java
@SpringBootApplication
@EnableScheduling // 开启定时功能
public class MyActiveMQApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyActiveMQApplication.class,args);
    }
}
```

2. 在生产者添加@Scheduled设置定时
```java
// 消息生产者
@Component
public class ProducerController3 {
    @Value("${activemq.name}")
    private String name;
    @Autowired
    private JmsMessagingTemplate jmsMessagingTemplate;
    
    // 设置延时投递，每隔3秒定投
    @Scheduled(fixedDelay = 3000)
    public void sendQueue() {
        jmsMessagingTemplate.convertAndSend(name, "消息ID:" + UUID.randomUUID().toString().substring(0,6));
        System.out.println("消息发送成功...");
    }
}
```

## 死信队列
&emsp; DLQ-Dead Letter Queue，死信队列，用来保存处理失败或者过期的消息。

&emsp; 出现以下情况时，消息会被重发：
- A transacted session is used and rollback() is called.
- A transacted session is closed before commit is called.
- A session is using CLIENT_ACKNOWLEDGE and Session.recover() is called.

&emsp; 当一个消息被重发超过6(缺省为6次)次数时，会给broker发送一个"Poison ack"，这个消息被认为是apoison pill，这时broker会将这个消息发送到死信队列，以便后续处理。

&emsp; 注意两点：
1. 缺省持久消息过期，会被送到DLQ，非持久消息不会送到DLQ
2. 缺省的死信队列是ActiveMQ.DLQ，如果没有特别指定，死信都会被发送到这个队列。可以通过配置文件(activemq.xml)来调整死信发送策略。

### java代码
1. activemq.xml，为每个队列建立独立的死信队列
```xml
<destinationPolicy>
    <policyMap>
        <policyEntries>
            <policyEntry queue=">">
                <deadLetterStrategy>
                    <individualDeadLetterStrategy queuePrefix="DLQ." useQueueForQueueMessages="true" />
                </deadLetterStrategy>
            </policyEntry>
            
            <policyEntry topic=">" >
                <pendingMessageLimitStrategy>
                    <constantPendingMessageLimitStrategy limit="1000"/>
                </pendingMessageLimitStrategy>
            </policyEntry>
        </policyEntries>
    </policyMap>
</destinationPolicy>
```

2. RedeliveryPolicy重发策略设置
```java
@Configuration
public class ActiveMqConfig {
    //RedeliveryPolicy重发策略设置
    @Bean
    public RedeliveryPolicy redeliveryPolicy(){
        RedeliveryPolicy redeliveryPolicy= new RedeliveryPolicy();
        //是否在每次尝试重新发送失败后,增长这个等待时间
        redeliveryPolicy.setUseExponentialBackOff(true);
        //重发次数,默认为6次 这里设置为10次
        redeliveryPolicy.setMaximumRedeliveries(10);
        //重发时间间隔,默认为1秒
        redeliveryPolicy.setInitialRedeliveryDelay(1);
        //第一次失败后重新发送之前等待500毫秒,第二次失败再等待500 * 2毫秒,这里的2就是value
        redeliveryPolicy.setBackOffMultiplier(2);
        //是否避免消息碰撞
        redeliveryPolicy.setUseCollisionAvoidance(false);
        //设置重发最大拖延时间-1 表示没有拖延只有UseExponentialBackOff(true)为true时生效
        redeliveryPolicy.setMaximumRedeliveryDelay(-1);
        return redeliveryPolicy;
    }
    
    @Bean
    public ActiveMQConnectionFactory activeMQConnectionFactory (
        @Value("${spring.activemq.broker-url}")String url,RedeliveryPolicy redeliveryPolicy){
        
        ActiveMQConnectionFactory activeMQConnectionFactory = new ActiveMQConnectionFactory( "admin", "admin", url);
        activeMQConnectionFactory.setRedeliveryPolicy(redeliveryPolicy);
        return activeMQConnectionFactory;
    }
    
    @Bean
    public PlatformTransactionManager transactionManager(ConnectionFactory connectionFactory) {
        return new JmsTransactionManager(connectionFactory);
    }
    
    @Bean(name="jmsQueryListenerFactory")
    public DefaultJmsListenerContainerFactory jmsListenerContainerFactory(
        ConnectionFactory connectionFactory,PlatformTransactionManager transactionManager){
        
        DefaultJmsListenerContainerFactory factory=new DefaultJmsListenerContainerFactory ();
        factory.setTransactionManager(transactionManager);
        factory.setConnectionFactory(connectionFactory);
        factory.setSessionTransacted(true); // 开启事务
        factory.setSessionAcknowledgeMode(1);
        return factory;
    }
}
```