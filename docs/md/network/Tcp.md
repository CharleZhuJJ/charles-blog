---
title: TCP
author: Charles Chu
date: 2022/09/30
isOriginal: true
---

# TCP <Badge text="持续更新" type="warning" />

&emsp; TCP是一个传输层协议，提供可靠传输，支持全双工，是一个连接导向的协议。

## 单工、半双工、双工
- 在任何一个时刻，如果数据只能单向发送，就是单工。
- 如果在某个时刻数据可以向一个方向传输，也可以向另一个方向反方向传输，而且交替进行，叫作半双工；半双工需要至少 1 条线路。
- 如果任何时刻数据都可以双向收发，这就是全双工，全双工需要大于 1 条线路。
- TCP 是一个双工协议，数据任何时候都可以双向传输。这就意味着客户端和服务端可以平等地发送、接收信息。

## TCP协议的主要特点
- TCP是面向连接的运输层协议；所谓面向连接就是双方传输数据之前，必须先建立一条通道，例如三次握手就是建议通道的一个过程，而四次挥手则是结束销毁通道的一个其中过程。
- 每一条TCP连接只能有两个端点（即两个套接字），只能是点对点的；
- TCP提供可靠的传输服务。传送的数据无差错、不丢失、不重复、按序到达；
- TCP提供全双工通信。允许通信双方的应用进程在任何时候都可以发送数据，因为两端都设有发送缓存和接受缓存；
- 面向字节流。虽然应用程序与TCP交互是一次一个大小不等的数据块，但TCP把这些数据看成一连串无结构的字节流，它不保证接收方收到的数据块和发送方发送的数据块具有对应大小关系，例如，发送方应用程序交给发送方的TCP10个数据块，接收方的TCP可能只用收到的4个数据块字节流交付给上层的应用程序

## TCP的可靠性原理
&emsp; 可靠传输有如下两个特点:
- 传输信道无差错,保证传输数据正确;
- 不管发送方以多快的速度发送数据,接收方总是来得及处理收到的数据;

1. 首先，采用三次握手来建立TCP连接，四次握手来释放TCP连接，从而保证建立的传输信道是可靠的。
2. 其次，TCP采用了连续ARQ协议（回退N(Go-back-N)；超时自动重传）来保证数据传输的正确性，使用滑动窗口协议来保证接方能够及时处理所接收到的数据，进行流量控制。
3. 最后，TCP使用慢开始、拥塞避免、快重传和快恢复来进行拥塞控制，避免网络拥塞。


## 三次握手
![ThreeWayHandshake](/public/network/tcp/ThreeWayHandshake.png)
&emsp; 服务端代码，对socket执行bind方法可以绑定监听端口，然后执行listen方法后，就会进入监听（LISTEN）状态。内核会为每一个处于LISTEN状态socket 分配两个队列，分别叫半连接队列和全连接队列。
![ThreeWayHandshakeQueue](/public/network/tcp/ThreeWayHandshakeQueue.png)

## 半连接队列和全连接队列
- 半连接队列（SYN队列），服务端收到第一次握手后，会将sock加入到这个队列中，队列内的sock都处于SYN_RECV 状态。
- 全连接队列（ACCEPT队列），在服务端收到第三次握手后，会将半连接队列的sock取出，放到全连接队列中。队列里的sock都处 ESTABLISHED状态。这里面的连接，就等着服务端执行accept()后被取出了。

&emsp; 虽然都叫队列，但其实全连接队列（icsk_accept_queue）是个链表，而半连接队列（syn_table）是个哈希表。
![Syn&AcceptQueue](/public/network/tcp/Syn&AcceptQueue.png)

### 为什么半连接队列要设计成哈希表
&emsp; 出于效率考虑，全连接队列被设计成链表，而半连接队列被设计为哈希表。
1. 先对比下全连接里队列，他本质是个链表，因为也是线性结构，说它是个队列也没毛病。它里面放的都是已经建立完成的连接，这些连接正等待被取走。而服务端取走连接的过程中，并不关心具体是哪个连接，只要是个连接就行，所以直接从队列头取就行了。这个过程算法复杂度为O(1)。
2. 而半连接队列却不太一样，因为队列里的都是不完整的连接，嗷嗷等待着第三次握手的到来。那么现在有一个第三次握手来了，则需要从队列里把相应IP端口的连接取出，如果半连接队列还是个链表，那我们就需要依次遍历，才能拿到我们想要的那个连接，算法复杂度就是O(n)。而如果将半连接队列设计成哈希表，那么查找半连接的算法复杂度就回到O(1)了。

### 全连接队列满了会怎么样
1. 如果队列满了，服务端还收到客户端的第三次握手ACK，默认当然会丢弃这个ACK。
2. 但除了丢弃之外，还有一些附带行为，这会受 tcp_abort_on_overflow 参数的影响。
- tcp_abort_on_overflow设置为 0，全连接队列满了之后，会丢弃这个第三次握手ACK包，并且开启定时器，重传第二次握手的SYN+ACK，如果重传超过一定限制次数，还会把对应的半连接队列里的连接给删掉。
![TcpAbortOnOverflow0](/public/network/tcp/TcpAbortOnOverflow0.png)
- tcp_abort_on_overflow设置为 1，全连接队列满了之后，就直接发RST给客户端，效果上看就是连接断了。这个现象是不是很熟悉，服务端端口未监听时，客户端尝试去连接，服务端也会回一个RST。这两个情况长一样，所以客户端这时候收到RST之后，其实无法区分到底是端口未监听，还是全连接队列满了。
![TcpAbortOnOverflow1](/public/network/tcp/TcpAbortOnOverflow1.png)


### 半连接队列要是满了会怎么样
1. 一般是丢弃，但这个行为可以通过 tcp_syncookies 参数去控制。
2. 但比起这个，更重要的是先了解下半连接队列为什么会被打满。

&emsp; 首先我们需要明白，一般情况下，半连接的"生存"时间其实很短，只有在第一次和第三次握手间，如果半连接都满了，说明服务端疯狂收到第一次握手求，可能遇到了SYN Flood攻击。

#### SYN Flood攻击
&emsp; 所谓SYN Flood攻击，可以简单理解为，攻击方模拟客户端疯狂发第一次握手请求过来，在服务端憨憨地回复第二次握手过去之后，客户端死活不发第三次握手过来，这样做，可以把服务端半连接队列打满，从而导致正常连接不能正常进来。
![SynFlood](/public/network/tcp/SynFlood.png)

#### tcp_syncookies
&emsp; 当它被设置为1的时候，客户端发来第一次握手SYN时，服务端不会将其放入半连接队列中，而是直接生成一个cookies，这个cookies会跟着第二次握手，发回客户端。客户端在发第三次握手的时候带上这个cookies，服务端验证到它就是当初发出去的那个，就会建立连接并放入到全连接队列中。可以看出整个过程不再需要半连接队列的参与。
![TcpSynCookies](/public/network/tcp/TcpSynCookies.png)

#### 会有一个cookies队列吗
&emsp; 可以反过来想一下，如果有cookies队列，那它会跟半连接队列一样，到头来，还是会被SYN Flood 攻击打满。实际上cookies并不会有一个专门的队列保存，它是通过通信双方的IP地址端口、时间戳、MSS等信息进行实时计算的，保存在TCP报头的seq里。
![CookiesQueue](/public/network/tcp/CookiesQueue.png)

##### cookies方案为什么不直接取代半连接队列
1. cookies方案虽然能防 SYN Flood攻击，但是也有一些问题。因为服务端并不会保存连接信息，所以如果传输过程中数据包丢了，也不会重发第二次握手的信息。
2. 编码解码cookies，都是比较耗CPU的，利用这一点，如果此时攻击者构造大量的第三次握手包（ACK包），同时带上各种瞎编的cookies信息，服务端收到ACK包后以为是正经cookies，憨憨地跑去解码（耗CPU），最后发现不是正经数据包后才丢弃。

&emsp; 这种通过构造大量ACK包去消耗服务端资源的攻击，叫ACK攻击，受到攻击的服务器可能会因为CPU资源耗尽导致没能响应正经请求。

## 四次挥手
![FourWave](/public/network/tcp/FourWave.png)

&emsp; 假设，这次四次挥⼿是由客户端主动发起的，那它就是主动⽅。服务器是被动接收客户端的挥⼿请求的，叫被动⽅。 
- 客户端和服务器，⼀开始，都是处于 ESTABLISHED 状态。 
- 第⼀次挥⼿：⼀般情况下，主动⽅执⾏ close() 或 shutdown() ⽅法，会发个FIN报⽂ 出来，表示"我不再发送数据了"。 
- 第⼆次挥⼿：在收到主动⽅的 FIN 报⽂后，被动⽅⽴⻢回应⼀个 ACK ，意思是"我收到你的FIN了，也知道你不再发数据了"。 上⾯提到的是主动⽅不再发送数据了。但如果这时候，被动⽅还有数据要发，那就继续发。注意，虽然第⼆次和第三次挥⼿之间，被动⽅是能发数据到主动⽅的，但主动⽅能不能正常收就不⼀定了，这个待会说。
- 第三次挥⼿：在被动⽅在感知到第⼆次挥⼿之后，会做了⼀系列的收尾⼯作，最后也调⽤⼀个 close() , 这时候就会发出第三次挥⼿的 FIN-ACK 。 
- 第四次挥⼿：主动⽅回⼀个 ACK ，意思是收到了。

## 三次挥手
### 情况一
&emsp; 在第⼀次挥⼿之后，如果被动⽅没有数据要发给主动⽅。第⼆和第三次挥⼿是有可能合并传输的。这样就出现了三次挥⼿。
![ThreeWave1](/public/network/tcp/ThreeWave1.png)

### 情况二
&emsp; TCP中还有个特性叫延迟确认。可以简单理解为：接收⽅收到数据以后不需要⽴刻⻢上回复ACK确认包。 

&emsp; 在此基础上，不是每⼀次发送数据包都能对应收到⼀个 ACK 确认包，因为接收⽅可以合并确认。⽽这个合并确认，放在四次挥⼿⾥，可以把第⼆次挥⼿、第三次挥⼿，以及他们之间的数据传输都合并在⼀起发送。因此也就出现了三次挥⼿。
![ThreeWave2](/public/network/tcp/ThreeWave2.png)

## 两次挥手
&emsp; 如果TCP连接的两端，IP+端⼝是⼀样的情况下，那么在关闭连接的时候，也同样做到了⼀端发出了⼀ 个FIN，也收到了⼀个 ACK，只不过正好这两端其实是 同⼀个socket 。⽽这种两端IP+端⼝都⼀样的连接，叫TCP⾃连接。同⼀个socket确实可以⾃⼰连⾃⼰，形成⼀个连接。
![TwoWave](/public/network/tcp/TwoWave.png)

## 四次握⼿（TCP同时打开）
&emsp; 两个服务即使客户端，也是服务端。
![FourWayHandshake](/public/network/tcp/FourWayHandshake.png)

## TCP粘包问题
&emsp; 粘包这个问题的根因是由于开发⼈员没有正确理解TCP⾯向字节流的数据传输⽅式，本身并不是TCP的问题，是开发者的问题。 
- TCP不管发送端要发什么，都基于字节流把数据发到接收端。这个字节流⾥可能包含上⼀次想要发的数据的部分信息。接收端根据需要在消息⾥加上识别消息边界的信息。不加就可能出现粘包问题。 
- TCP粘包跟Nagle算法有关系，但关闭 Nagle 算法并不解决粘包问题。
- UDP是基于数据报的传输协议，不会有粘包问题。
- IP层也切⽚，但是因为不关⼼消息⾥有啥，因此有不会有粘包问题。 
- TCP发送端可以发10次字节流数据，接收端可以分100次去取；UDP发送端发了10次数据报，那接收端就要在10次收完。 
-数据包也只是按着TCP的⽅式进⾏组装和拆分，如果数据包有错，那数据包也只是犯了每个数据包都会犯的错⽽已。

## ARP（Address Resolution Protocal）  
&emsp; 地址解析协议。⽤于将IP地址解析为以太⽹的MAC地址的协议。 位于数据链路层中。

&emsp; 在局域⽹中，当主机A有数据要发送给主机B时，A必须知道B的IP地址。但是仅仅有IP地址还是不够的，因为IP数据报⽂还需要在数据链路层封装成帧才能通过物理⽹络发送。因为发送端还必须有接收端的MAC地址，所以需要⼀个从IP地址到MAC地址的映射。ARP就是⼲这事情的协议。
![Arp](/public/network/tcp/Arp.png)
- A查本地ARP表发现B的IP和MAC映射关系不存在 
- A通过ARP⼴播的形式向局域⽹发出消息，询问某IP对应的MAC地址是多少。⽐如A此时知道B的IP，但并不知道B的MAC地址是多少，就会尝试在局域⽹内发起ARP⼴播，询问局域⽹下所有机器，哪个机器的IP与B的IP⼀致。
- B收到这个ARP消息，发现A要问的IP与⾃⼰的IP⼀致，就会把⾃⼰的MAC地址作为应答返回给A。
- 此时A就知道了B的MAC地址，顺便把消息记录到本地ARP表⾥，下次直接⽤表⾥的关系就⾏，不需要每次都去问。

## MSS & MTU
### MSS
&emsp; MSS(Maximum Segment Size) 。TCP提交给IP层最⼤分段⼤⼩，不包含TCP Header和TCP Option，只包含TCP Payload，MSS是TCP⽤来限制应⽤层最⼤的发送字节数。 

&emsp; 假设 MTU= 1500 byte，那么 MSS = 1500- 20(IP Header) -20 (TCP Header) = 1460 byte，如果应⽤层有2000 byte发送，那么需要两个切⽚才可以完成发送，第⼀个 TCP 切⽚ = 1460，第⼆个TCP切⽚ = 540。

### MTU
&emsp; MTU(Maximum Transmit Unit)，最⼤传输单元。 其实这个是由数据链路层提供，为了告诉上层IP层，⾃⼰的传输能⼒是多⼤。IP层就会根据它进⾏数据包切分。⼀般MTU=1500 Byte。 

&emsp; 假设IP层有 <=1500 byte需要发送，只需要⼀个IP包就可以完成发送任务；

&emsp; 假设 IP 层有 > 1500 byte 数据需要发送，需要分⽚才能完成发送，分⽚后的IP Header ID相同，同时为了分⽚后能在接收端把切⽚组装起来，还需要在分⽚后的IP包⾥加上各种信息。⽐如这个分⽚在原来的IP包⾥的偏移offset。
![Mss&Mtu](/public/network/tcp/Mss&Mtu.png)

## 数据在TCP分段原因
&emsp; 数据在TCP分段，就是为了在IP层不需要分⽚，同时发⽣重传的时候只重传分段后的⼩份数据。
![NoTcpSegmentation](/public/network/tcp/NoTcpSegmentation.png)
&emsp; 分段后
![TcpSegmentation](/public/network/tcp/TcpSegmentation.png)

## RST
&emsp; RST，⼀般⽤来异常地关闭⼀个连接。它是⼀个TCP包头中的标志位。

&emsp; 正常情况下，不管是发出，还是收到置了这个标志位的数据包，相应的内存、端⼝等连接资源都会被释放。从效果上来看就是TCP连接被关闭了。

&emsp; 如果本端应⽤层尝试去执⾏读数据操作，⽐如recv ，应⽤层就会收到`Connection reset by peer`的报错，意思是远端已经关闭连接。
![RstRecv](/public/network/tcp/RstRecv.png)

&emsp; 如果本端应⽤层尝试去执⾏写数据操作，⽐如send ，那么应⽤层就会收到`Broken pipe`的报错，意思是发送通道已经坏了。
![RstSend](/public/network/tcp/RstSend.png)

## 流量控制
### RTT和RTO
- RTT：发送一个数据包到收到对应的ACK，所花费的时间
- RTO：重传时间间隔（TCP在发送一个数据包后会启动一个重传定时器，RTO即定时器的重传时间）
    - 开始预先算一个定时器时间，如果回复ACK，重传定时器就自动失效，即不需要重传；如果没有回复ACK，RTO定时器时间就到了，重传。
    -  RTO是本次发送当前数据包所预估的超时时间，RTO不是固定写死的配置，是经过RTT计算出来的。

### 滑动窗口
- TCP报文头有个字段叫Window，用于接收方通知发送方自己还有多少缓存区可以接收数据，发送方根据接收方的处理能力来发送数据，不会导致接收方处理不过来，这便是流量控制。
- 发送方都维持了一个连续的允许发送的帧的序号，称为发送窗口；同时，接收方也维持了一个连续的允许接收的帧的序号，称为接收窗口。
- 发送窗口和接收窗口的序号的上下界不一定要一样，甚至大小也可以不同。
不同的滑动窗口协议窗口大小一般不同。
- 发送方窗口内的序列号代表了那些已经被发送，但是还没有被确认的帧，或者是那些可以被发送的帧。
![SlidingWindow](/public/network/tcp/SlidingWindow.png)

&emsp; 滑动窗口由四部分组成每个字节的数据都有唯一顺序的编码，随着时间发展，未确认部分与可以发送数据包编码部分向右移动，形式滑动窗口
1. 绿色：发送成功并已经ACK确认的数据
2. 黄色：发送成功等待ACK确认的数据(占用滑动窗口大小)
3. 紫色：滑动窗口剩余大小可以发送的字节数量(滑动窗口可用大小)
4. 灰色：后续数据编码

- 接收窗口的大小就是滑动窗口的最大值，数据传输过程中滑动窗口的可用大小是动态变化的。
- 但是还有这么一点，滑动窗口的设计仅仅是考虑到了处理方的处理能力，但是没有考虑到道路的通畅问题
- 就好像服务端可以处理100M数据，但是传输的数据99M都堵在路上了，这不就是导致道路阻塞了么？这就需要另外一个设计拥塞避免

#### TCP的滑动窗口主要有两个作用
1. 保证TCP的可靠性
2. 保证TCP的流控特性

### 流量控制的目的
- 如果发送者发送数据过快，接收者来不及接收，那么就会有分组丢失。
- 为了避免分组丢失，控制发送者的发送速度，使得接收者来得及接收，这就是流量控制。
- 流量控制根本目的是防止分组丢失，它是构成TCP可靠性的一方面。

### 如何实现流量控制
- 由滑动窗口协议（连续ARQ协议）实现。滑动窗口协议既保证了分组无差错、有序接收，也实现了流量控制。
- 主要的方式就是接收方返回的 ACK 中会包含自己的接收窗口的大小，并且利用大小来控制发送方的数据发送。
![Arq](/public/network/tcp/Arq.png)

### 流量控制引发的死锁
- 当发送者收到了一个窗口为0的应答，发送者便停止发送，等待接收者的下一个应答。
- 但是如果这个窗口不为0的应答在传输过程丢失，发送者一直等待下去，而接收者以为发送者已经收到该应答，等待接收新数据，这样双方就相互等待，从而产生死锁。
- 为了避免流量控制引发的死锁，TCP使用了持续计时器。每当发送者收到一个零窗口的应答后就启动该计时器。时间一到便主动发送报文询问接收者的窗口大小。若接收者仍然返回零窗口，则重置该计时器继续等待；若窗口不为0，则表示应答报文丢失了，此时重置发送窗口后开始发送，这样就避免了死锁的产生。