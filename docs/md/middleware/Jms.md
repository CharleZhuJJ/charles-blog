---
title: JMS
author: Charles Chu
date: 2021/09/30
isOriginal: true
---

# JMS

&emsp; JMS（Java Messaging Service）是Java平台上有关面向消息中间件的技术规范，它便于消息系统中的Java应用程序进行消息交换,并且通过提供标准的产生、发送、接收消息的接口简化企业应用的开发。

&emsp; JMS本身只定义了一系列的接口规范，是一种与厂商无关的 API，用来访问消息收发系统。它类似于JDBC(java Database Connectivity)：这里，JDBC 是可以用来访问许多不同关系数据库的 API，而 JMS则提供同样与厂商无关的访问方法，以访问消息收发服务。

## JMS编程API

### 1.ConnectionFactory
&emsp; 创建Connection对象的工厂，针对两种不同的jms消息模型，分别有QueueConnectionFactory和TopicConnectionFactory两种。

### 2.Destination
&emsp; Destination的意思是消息生产者的消息发送目标或者说消息消费者的消息来源。对于消息生产者来说，它的Destination是某个队列（Queue）或某个主题（Topic）;对于消息消费者来说，它的Destination也是某个队列或主题（即消息来源）。所以，Destination实际上就是两种类型的对象：Queue、Topic

### 3.Connection
&emsp; Connection表示在客户端和JMS系统之间建立的链接（对TCP/IP socket的包装）。Connection可以产生一个或多个Session

### 4.Session
&emsp; Session 是我们对消息进行操作的接口，可以通过session创建生产者、消费者、消息等。Session 提供了事务的功能，如果需要使用session发送/接收多个消息时，可以将这些发送/接收动作放到一个事务中。

### 5.Producter
&emsp; Producter（消息生产者）：消息生产者由Session创建，并用于将消息发送到Destination。同样，消息生产者分两种类型：QueueSender和TopicPublisher。可以调用消息生产者的方法（send或publish方法）发送消息。

### 6.Consumer
&emsp; Consumer（消息消费者）：消息消费者由Session创建，用于接收被发送到Destination的消息。两种类型：QueueReceiver和TopicSubscriber。可分别通过session的createReceiver(Queue)或createSubscriber(Topic)来创建。当然，也可以session的creatDurableSubscriber方法来创建持久化的订阅者。

### 7.MessageListener
&emsp; 消息监听器。如果注册了消息监听器，一旦消息到达，将自动调用监听器的onMessage方法。EJB中的MDB（Message-Driven Bean）就是一种MessageListener。
![Module](/public/middleware/jms/Module.png)

## JMS消息组成格式
&emsp; 整个JMS协议组成结构如下
结构 | 描述
-- | --
JMS Provider | 消息中间件/消息服务器
JMS Producer | 消息生产者 
JMS Consumer | 消息消费者
JMS Message | 消息

### JMS Message 
&emsp; JMS Message消息由三部分组成：消息头，消息体，消息属性；

#### 消息头
&emsp; JMS消息头预定义了若干字段用于客户端与JMS提供者之间识别和发送消息，预编译头如下：
名称 | 描述
-- | --
JMSDestination(*) | 消息发送的 Destination，在发送过程中由提供者设置
JMSMessageID(*) | 唯一标识提供者发送的每一条消息。这个字段是在发送过程中由提供者设置的，客户机只能在消息发送后才能确定消息的 JMSMessageID
JMSDeliveryMode(*) | 消息持久化。包含值 DeliveryMode.PERSISTENT 或者DeliveryMode.NON_PERSISTENT。
JMSTimestamp | 提供者发送消息的时间，由提供者在发送过程中设置
JMSExpiration(*) | 消息失效的时间，毫秒，值 0 表明消息不会过期，默认值为0
JMSPriority(*) | 消息的优先级，由提供者在发送过程中设置。优先级 0 的优先级最低，优先级 9 的优先级最高。0-4为普通消息，5-9为加急消息。ActiveMQ不保证优先级高就一定先发送，只保证了加急消息必须先于普通消息发送。默认值为4
JMSCorrelationID(*) | 通常用来链接响应消息与请求消息，由发送消息的 JMS 程序设置。
JMSReplyTo | 请求程序用它来指出回复消息应发送的地方，由发送消息的 JMS 程序设置
JMSTypeJMS | 程序用它来指出消息的类型。
JMSRedelivered | 消息的重发标志，false，代表该消息是第一次发生，true，代表该消息为重发消息

&emsp; 开发者只可以设置JMSCorrelationID，JMSReplyTo，JMSType。

#### 消息体
&emsp; 在消息体中，JMS API定义了五种类型的消息格式，让我们可以以不同的形式发送和接受消息，并提供了对已有消息格式的兼容。

&emsp; JMS 定义了五种不同的消息正文格式，以及调用的消息类型，允许你发送并接收一些不同形式的数据，提供现有消息格式的一些级别的兼容性。
- TextMessage -- 一个字符串对象 *
- MapMessage -- 一套名称-值对（Map）
- ObjectMessage -- 一个序列化的 Java 对象 *
- BytesMessage -- 一个字节的数据流 *
- StreamMessage -- Java原始值的数据流
```java
public void send(){
    jmsTemplate.send(name, new MessageCreator() {
        @Override
        public Message createMessage(Session session) throws JMSException {
            // 发送TextMessage消息
            TextMessage textMessage = session.createTextMessage("文本消息");
            return textMessage;
            
            // 发送MapMessage消息
            MapMessage mapMessage = session.createMapMessage();
            mapMessage.setString("name","张三");
            mapMessage.setInt("age",20);
            return mapMessage;
            
            // 发送ObjectMessage消息
            // 注意：ActiveMQ5.12后，为了安全考虑，ActiveMQ默认不接受自定义的序列化对象，需要将自定义的加入到受信任的列表。
            User user = new User();
            user.setName("小苍");
            user.setAge(18);
            ObjectMessage objectMessage = session.createObjectMessage(user);
            return objectMessage;
            
            // 发送BytesMessage消息
            BytesMessage bytesMessage = session.createBytesMessage();
            try {
                File file = new File("d:/spring.jpg");
                FileInputStream in = new FileInputStream(file);
                byte[] bytes = new byte[(int)file.length()];
                in.read(bytes);
                bytesMessage.writeBytes(bytes);
            } catch (Exception e) {
                e.printStackTrace();
            }
            return bytesMessage;
            
            // 发送StreamMessage消息
            StreamMessage streamMessage = session.createStreamMessage();
            streamMessage.writeString("你好，ActiveMQ");
            streamMessage.writeInt(20);
            return streamMessage;
        }
    });
}

@JmsListener(destination = "${activemq.name}")
public void receive(Message message){
    // 接收TextMessage的方法
    if(message instanceof TextMessage){
        TextMessage textMessage = (TextMessage)message;
        try {
            System.out.println("接收消息："+textMessage.getText());
        } catch (JMSException e) {
            e.printStackTrace();
        }
    }
    
    // 接收MapMessage消息
    if(message instanceof MapMessage){
        MapMessage mapMessage = (MapMessage)message;
        try {
            System.out.println("名称："+mapMessage.getString("name"));
            System.out.println("年龄："+mapMessage.getString("age"));
        } catch (JMSException e) {
            e.printStackTrace();
        }
    }
    
    // 接收ObjectMessage消息
    if(message instanceof ObjectMessage){
        ObjectMessage objectMessage = (ObjectMessage)message;
        try {
            User user = (User)objectMessage.getObject();
            System.out.println(user.getUsername());
            System.out.println(user.getPassword());
        } catch (JMSException e) {
            e.printStackTrace();
        }
    }
    
    // 接收BytesMessage消息
    BytesMessage bytesMessage = (BytesMessage)message;
    FileOutputStream out = new FileOutputStream("d:/abc.jpg");
    byte[] buf = new byte[(int)bytesMessage.getBodyLength()];
    bytesMessage.readBytes(buf);
    out.write(buf);
    out.close();
    
    // 接收StreamMessage消息
    StreamMessage streamMessage = (StreamMessage)message;
    String str = streamMessage.readString();
    int i = streamMessage.readInt();
    System.out.println(str);
    System.out.println(i);
}
```

#### 消息属性
&emsp; 我们可以给消息设置自定义属性，这些属性主要是提供给应用程序的。对于实现消息过滤功能，消息属性非常有用，JMS API定义了一些标准属性，JMS服务提供者可以选择性的提供部分标准属性。
```java
// 自定义属性
message.setStringProperty("Property",Property);
```