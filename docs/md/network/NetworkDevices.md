---
title: 常见的网络设备
author: Charles Chu
date: 2022/09/28
isOriginal: true
---

# 常见的网络设备

## 集线器
&emsp; 集线器将消息进行广播，数据链路层校验MAC地址与自己不匹配时，则丢弃数据 (物理层)

- 从A网口进入集线器的消息，此时还是电信号。这⾥经过⼀个PHY模块。 
- ⾸先要先了解每个网口，都可能接着网线，而每根网线的传输的格式都是有可能不同的。而PHY的作用，就是把这些格式转化为⼀个通用的格式。 
- 举个例⼦。PHY就好⽐⼀个翻译器，有的⼈说英⽂，有的⼈说⽇⽂。但是PHY，会把它统⼀转为普通话，给内部电路处理。内部电路处理完之后，再经过PHY模块，转为英语，或⽇⽂从对应网口⾥ 输出。
- 经过PHY的处理后，以电信号的形式输入到中继电路，被⽆脑广播，再次经过PHY模块后变成B，C，D网口的格式输出。
![Hub](/public/network/networkDevices/Hub.png)

## 交换机
&emsp; 交换机，⼜叫switch，跟集线器⻓得很像。 但是功能更强⼀些，从网络分层上来说，属于数据链路层，⽐集线器所在的物理层还要⾼⼀层。 所有发到交换机的数据，都会先进入交换机的缓存区。接着消息再被转发到对应机器上。 注意这⾥用的是转发，而不是集线器的广播。

&emsp; MAC地址表：交换机内部维护了⼀张MAC地址表。 
- 记录了端口号和MAC地址的对应关系。 这个表的数据是交换机不断学习的结果。 
- 当A发消息到交换机时，交换机发现消息是从1号端口进来的，则会在MAC地址表上，记录A的MAC地址对应1号端口。
- 如果A没有很⻓时间没发消息到这个1号端口，那这条记录就会过期并被删除。
- 那么，当时间⾜够⻓，ABC 都发过消息给交换机后，地址表就会有完整的关系信息
![MacAddress](/public/network/networkDevices/MacAddress.png)
- A准备发送消息给B，此时A会把B的MAC地址，放入要发送的数据⾥。数据顺着网线发出。 
- 交换机从端口收到数据，会把数据⾥的源和⽬的MAC地址提出来，跟MAC地址表进⾏对⽐。
- 发现B的MAC地址正好在2号端口，那么就把数据转发给2号端口。 
- 此时B电脑从网线收到来⾃交换机2号端口的数据。
- 如果MAC地址表⾥找不到对应的MAC地址，则会和集线器一样，将消息进行广播
![Switch](/public/network/networkDevices/Switch.png)
- 其实对⽐可以发现，交换机和集线器内部结构很像。 重点需要提到的是MAC模块。
- 消息以电信号的形式从网口进入，到了PHY会被转成通用格式的电信号。 而MAC模块的作用是把这个电信号转为数字信号，这样就能提取出MAC包头，并通过MAC数据帧末尾的 FCS校验这个包有没有问题，如果没问题，则把数据放到内存缓冲区⾥，否则直接丢弃。 
- 另外，这个MAC模块，虽然这么叫。但其实交换机MAC模块不具有 MAC 地址。因此交换机的端口不核对接收方 MAC 地址，而是直接接收所有的包并存放到缓冲区中。
- 放入到内存缓冲区后，还会把MAC地址和端口号记录到MAC地址表中。同时检查⽬的MAC地址在不在 MAC地址表中，在的话则会转发到对应端口。否则广播。

### 交换机和⼆层交换机和三层交换机
- 这⼀部分提到的交换机，其实就是⼆层交换机，也就是⼯作在第⼆层（数据链路层）的交换机，⼆者没区别。 
- 而三层交换机，是⼯作在第三层（网络层）的交换机，其实就是路由器。

## 网桥
&emsp; 网桥，本质上可以理解为两个网线口的交换机，正好可以把两台电脑给连起来，也叫桥接。

### 交换机与网桥的区别 
- 交换机是多网线口的网桥，可以把多台电脑给连（桥接）起来。 其他功能方面，大差不差，不必太过纠结。 


## 路由器
- 有了交换机之后，⼩网吧⾥的电脑就都可以被连起来了。交换机网口不够？那就再接个交换机。
- 但世界上电脑这么多，交换机⾥的MAC地址表难道全都要记住吗? 显然做不到。
- 为了解决这个问题。 于是就有了路由器，⼯作在网络层，⽐数据链路层更⾼⼀层。

### 路由表 
- 路由器的作用，可以帮助我们在互联网世界⾥转发消息到对应的IP。
- 交换机，是通过 MAC 头部中，接收方 MAC 地址，来判断转发⽬标的。 
- 路由器，则是根据 IP 头部中， IP 地址来判断的。 由于使用的地址不同，记录转发信息的表也会不同。
- 类似交换机的MAC地址表，路由器也维护了⼀张路由表。 而路由表，是用于告诉路由器，什么样的消息该转发到什么端口。
![RouteTable](/public/network/networkDevices/RouteTable.png)
- 假设A要发消息到D。也就是 192.168.0.105/24 要发消息到 192.168.1.11/24 。 
- 那么A会把消息经过交换机发到路由器。 
- 路由器通过 192.168.0.105/24 获得其网络号是 192.168.0.0 ，而且的地的网络号 是 192.168.1.0 ，⼆者网络号不同，处于不同局域网。 
- 查路由表，发现 192.168.1.0 ,在e2端口，那么就会把消息从e2端口发出，到达交换机，交换机发现 MAC地址是它局域网下的D机器，就把消息打过去。 
- 当然，如果路由表⾥找不到，那就打到默认网关吧，也就是从e1口发出，发到IP 192.0.2.1 。这个路由器的路由表不知道该去哪，说不定其他路由器知道。

### 路由器内部结构
![Router](/public/network/networkDevices/Router.png)
- 路由器内部，分为控制平⾯和数据平⾯，说白了就是对应软件部分和硬件部分。 
- 硬件部分跟交换机很像。数据从A网口进入，此时数据还是网线上格式的电信号，会被PHY模块转为通用信号格式，再被MAC模块转为数字信号，通过FCS进⾏错误校验，同时校验MAC地址是否是自己，通过校验则进入内存缓冲区，否则丢弃。 
- 再进入软件部分，由路由选择处理器，通过⼀定规则（软件逻辑），查询路由表判断转发⽬标和对应转发口，再经由硬件部分的交换结构转发出去。 
- 如果路由表中⽆法找到匹配记录，路由器会丢弃这个包，并通过ICMP消息告知发送方。

### 路由器和交换机的主要区别 
#### MAC模块的区别 
- 路由器和交换机不同点在于，它的每个网口下，都有⼀个MAC地址和IP地址。 
- 正因为路由器具有 MAC 地址，因此它能够成为数据链路层的的发送方和接收方。
- 交换机，是不具备MAC地址的，而MAC报头是需要填上目的MAC地址的。因此交换机从来都不是数据的目的地，它只简单转发数据帧到目的地。 
- 但路由器，是有MAC地址的，因此MAC报头就可以写上，下⼀站目的地就是xx路由。 
- 到了路由器后，路由器可以再次组装下⼀站的目的MAC地址是再下⼀个路由，通过这⼀点，让数据在路由和路由之间传输。 
- 而同时因为交换机不具有MAC地址，因此也不会校验收到的数据帧的MAC地址是不是⾃⼰的，全部收下做转发。而路由器则会校验数据帧的MAC报头⾥的⽬的MAC地址是不是⾃⼰，是的话才会收入内存缓冲区，否则丢弃。 

#### 找不到转发目的地时的处理方式有区别 
- 如果在路由表中无法找到匹配的记录，路由器会丢弃这个包，并通过 ICMP消息告知发送方。 
- 而交换机在MAC地址表⾥找不到转发端口时会选择广播。 这里的处理方式两者是不同的，原因在于网络规模的大⼩。 
    - 交换机连接的网络最多也就是几千台设备的规模，这个规模并不大。如果只有几千台设备，遇到不知道应该转发到哪⾥的包，交换机可以将包发送到所有的端口上，虽然这个方法很简单粗暴，但不会引发什么问题。 
    - 但路由器⼯作的网络环境就是互联网，全世界所有的设备都连接在互联网上，规模⾮常大，并且这个规 模还在持续扩大中。如果此时它的操作跟交换机⼀样，将不知道应该转发到哪⾥的包发送到整个网络 上，那就会产⽣大量的网络包，造成网络拥塞。因此，路由器遇到不知道该转发到哪⾥的包，就会直接丢弃。

## 光猫
&emsp; 光猫（modem），是⼀种调制解调器，其实就是用于光电信号转换的设备。 

### 路由器和光猫的区别 
- 不管是交换机还是路由器，前⾯都是提到网口输入的是电信号。但现在流⾏的是光纤传输，传输的是光信号。 
- 接收数据时，光猫可以将光纤⾥的光信号转化为电信号，发给路由器，路由器内部再转成数字信号，并在此基础上做各种处理。 
- 相反，也会把路由器传来的电信号转为光信号，发到光纤，并进入互联网。
![SwitchRouterModem](/public/network/networkDevices/SwitchRouterModem.png)


## 小结
- 两台电脑可以通过⼀根网线直接连接，进⾏通信。 
- 机器⼀多，可以把网线都接到集线器（物理层）上，但是集线器会不管三七⼆⼗⼀进⾏广播。 
- 不想广播，可以用（⼆层）交换机（数据链路层），⼜叫多端口网桥，它⽐较聪明，会⾃我学习生产MAC地址表，知道消息发到哪，那就不需要广播啦 
- 互联网电脑这么多，交换机MAC地址表总不能全放下吧。改用路由器（网络层），也叫三层交换机，通过网段的方式定位要把消息转发到哪，就不需要像交换机那样⼀条条记录MAC地址啦。
- 路由器和光猫之间是好搭档，光猫负责把光纤⾥的光信号转换成电信号给路由器。 
- 现在⼀般情况下，家⾥已经不用集线器和交换机了，⼤部分路由器也⽀持交换机的功能。所以可以看到，家⾥的台式机电脑⼀般就连到⼀个路由器，再连个光猫就够能快乐上网了。

## 网关
&emsp; 网关实质上是一个网络通向其他网络的IP地址。

&emsp; 比如有网络A和网络B，网络A的IP地址范围为192.168.1.1~192. 168.1.254，子网掩码为255.255.255.0；网络B的IP地址范围为192.168.2.1~192.168.2.254，子网掩码为255.255.255.0。

&emsp; 在没有路由器的情况下，两个网络之间是不能进行TCP/IP通信的，即使是两个网络连接在同一台交换机(或集线器)上，TCP/IP协议也会根据子网掩码(255.255.255.0)判定两个网络中的主机处在不同的网络里。

&emsp; 而要实现这两个网络之间的通信，则必须通过网关。

&emsp; 如果网络A中的主机发现数据包的目的主机不在本地网络中，就把数据包转发给它自己的网关，再由网关转发给网络B的网关，网络B的网关再转发给网络B的某个主机。网络B向网络A转发数据包的过程。

&emsp; 所以说，只有设置好网关的IP地址，TCP/IP协议才能实现不同网络之间的相互通信。网关的IP地址是具有路由功能的设备的IP地址，具有路由功能的设备有路由器、启用了路由协议的服务器(实质上相当于一台路由器)、代理服务器(也相当于一台路由器)。