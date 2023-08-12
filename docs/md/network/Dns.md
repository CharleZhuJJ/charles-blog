---
title: DNS
author: Charles Chu
date: 2022/09/30
isOriginal: true
---

# DNS  <Badge text="持续更新" type="warning" />

&emsp; DNS通过主机名，最终得到该主机名对应的IP地址的过程叫做域名解析（或主机名解析）。

&emsp; 通俗的讲，我们更习惯于记住一个网站的名字，www.baidu.com，而不是记住它的ip地址，比如：167.23.10.2

&emsp; 将主机域名转换为ip地址，属于应用层协议，使用UDP传输。

## 工作原理
![Dns](/public/network/dns/WorkingPrincipl.png)
- 第一步，客户端向本地DNS服务器发送解析请求
- 第二步，本地DNS如有相应记录会直接返回结果给客户端，如没有就向DNS根服务器发送请求
- 第三步，DSN根服务器接收到请求，返回给本地服务器一个所查询域的主域名服务器的地址
- 第四步，本地dns服务器再向返回的主域名服务器地址发送查询请求
- 第五步，主域名服务器如有记录就返回结果，没有的话返回相关的下级域名服务器地址
- 第六步，本地DNS服务器继续向接收到的地址进行查询请求
- 第七步，下级域名服务器有相应记录，返回结果
- 第八步，本地dns服务器将收到的返回地址发给客户端，同时写入自己的缓存，以便下次查询
- DNS域名查询实际上就是个不断递归查询的过程，直到查找到相应结果，需要注意的时，当找不到相应记录，会返回空结果，而不是超时信息

## DNS记录
```shell
# A记录
www.example.com.     IN     A     139.18.28.5;
# A 是记录的类型，A 记录代表着这是一条用于解析 IPv4 地址的记录。
# 从这条记录可知，www.example.com的 IP 地址是 139.18.28.5。

# CNAME（用于定义域名的别名）
a.example.com.          IN     CNAME   b.example.com.
# 这条 DNS 记录定义了 a.example.com 是 b.example.com 的别名。
# 用户在浏览器中输入 a.example.com 时候，通过 DNS 查询会知道 a.example.com 是 b.example.com 的别名，
# 因此需要实际 IP 的时候，会去拿 b.example.com 的 A 记录。
# 当你想把一个网站迁移到新域名，旧域名仍然保留的时候；还有当你想将自己的静态资源放到 CDN 上的时候，CNAME 就非常有用。

# AAAA 记录 (和 A 记录类似，AAAA 记录则是域名和 IPv6 地址的映射关系)

# MX记录(邮件记录，用来描述邮件服务器的域名)

# NS 记录(描述 DNS 服务器网址,当一个 DNS 查询看到 NS 记录的时候，会再去 NS 记录配置的 DNS 服务器查询，得到最终的记录。)
a.com.     IN      NS      ns1.a.com.
a.com.     IN      NS      ns2.a.com.
# 当解析 a.com 地址时，我们看到 a.com 有两个 NS 记录，所以确定最终 a.com 的记录在 ns1.a.com 和 ns2.a.com 上。
# 从设计上看，ns1 和 ns2 是网站 a.com 提供的智能 DNS 服务器，可以提供负载均衡、分布式 Sharding 等服务。
# 通常数字小的 NS 记录优先级更高，也就是 ns1 会优先于 ns2 响应。
# 配置了上面的 NS 记录后，如果还配置了 a.com 的 A 记录，那么这个 A 记录会被 NS 记录覆盖。
```