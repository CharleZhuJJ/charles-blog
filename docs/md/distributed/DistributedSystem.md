# 分布式系统

&emsp; 分布式系统是部分在不同的节点上，通过网络协同工作的系统

## CAP

- Consistency：all nodes see the same data at the same time
  - 一致性：更新操作成功并返回客户端完成后，分布式的所有节点在同一时间大的数据完全一致；
- Availability：read and writes always succeed.
  - 可用性：读和写操作都能成功；-
- Partition tolerance：the system continues to operate despite arbitrary message loss or failure of part of the system
  - 分区容错性：再出现网络故障导致分布式节点间不能通信时，系统能否继续服务

&emsp; 在分布式系统的设计中，没有一种设计可以同时满足一致性，可用性，分区容错性 3 个特性。C、A、P 只能同时满足两个目标，而由于在分布式系统中，P 是必须要保留的，所以要在 C 和 A 间进行取舍。假如要保证服务的可用性，就选择 AP 模型，而要保证一致性的话，就选择 CP 模型。

![CAP](/public/imgdistributed/distributedSystem/CAP.png)
