---
title: Https
author: Charles Chu
date: 2022/09/28
isOriginal: true
---

# Https <Badge text="持续更新" type="warning" />

&emsp; HTTPS （全称：Hypertext Transfer Protocol Secure），是以安全为目标的 HTTP 通道，在HTTP的基础上通过传输加密和身份认证保证了传输过程的安全性 。HTTPS 在HTTP 的基础下加入SSL，HTTPS 的安全基础是 SSL，因此加密的详细内容就需要 SSL。 

## HTTP与HTTPS的区别
&emsp; HTTP 是明文传输协议，HTTPS 协议是由 SSL+HTTP 协议构建的可进行加密传输、身份认证的网络协议，比 HTTP 协议安全
- HTTPS比HTTP更加安全，对搜索引擎更友好，利于SEO，谷歌、百度优先索引HTTPS网页
- HTTPS需要用到SSL证书，而HTTP不用
- HTTPS标准端口443，HTTP标准端口80
- HTTPS基于传输层，HTTP基于应用层
- HTTPS在浏览器显示绿色安全锁，HTTP没有显示

## HTTPS的整体过程
&emsp; HTTPS的整体过程分为证书验证和数据传输阶段，HTTPS 在内容传输的加密上使用的是对称加密，非对称加密只作用在证书验证阶段。具体的交互过程如下：
![HttpsProcess](/public/network/https/HttpsProcess.png)

### 证书验证阶段
- 浏览器发起 HTTPS 请求。
- 服务端返回 HTTPS 证书。（Server把事先配置好的公钥证书返回给客户端）
- 客户端验证证书是否合法，如果不合法则提示告警。（比如是否在有效期内，证书的用途是不是匹配Client请求的站点，是不是在CRL吊销列表里面，它的上一级证书是否有效，这是一个递归的过程，直到验证到根证书（操作系统内置的Root证书或者Client内置的Root证书））

### 数据传输阶段
- 当证书验证合法后，在本地生成随机数。
- 通过公钥加密随机数，并把加密后的随机数传输到服务端。
- 服务端通过私钥对随机数进行解密。
- 服务端通过客户端传入的随机数构造对称加密算法，对返回结果内容进行加密后传输。


#### 为什么数据传输是用对称加密
&emsp; 首先，非对称加密的加解密效率是非常低的，而 HTTP 的应用场景中通常端与端之间存在大量的交互，非对称加密的效率是无法接受的。

&emsp; 另外，在 HTTPS 的场景中只有服务端保存了私钥，一对公私钥只能实现单向的加解密，所以 HTTPS 中内容传输加密采取的是对称加密，而不是非对称加密。


## 证书
&emsp;  SSL证书是数字证书的一种，类似于驾驶证、护照和营业执照的电子副本。因为配置在服务器上，也称为SSL服务器证书。

### 为什么需要证书
&emsp; 防止“中间人”攻击，同时可以为网站提供身份证明。

&emsp; 将服务器公钥放在数字证书（由数字证书认证机构颁发）中，只要证书是可信的，公钥就是可信的。

### 证书包含信息
- 颁发机构信息
- 公钥
- 公司信息
- 域名
- 有效期
- 指纹

### 证书的合法性依据是什么
&emsp; 首先，权威机构是要有认证的，不是随便一个机构都有资格颁发证书，不然也不叫做权威机构。

&emsp; 另外，证书的可信性基于信任制，权威机构需要对其颁发的证书进行信用背书，只要是权威机构生成的证书，我们就认为是合法的。

&emsp; 所以权威机构会对申请者的信息进行审核，不同等级的权威机构对审核的要求也不一样，于是证书也分为免费的、便宜的和贵的。


### 浏览器如何验证证书的合法性
- 验证域名、有效期等信息是否正确。证书上都有包含这些信息，比较容易完成验证。
- 判断证书来源是否合法。每份签发证书都可以根据验证链查找到对应的根证书，操作系统、浏览器会在本地存储权威机构的根证书，利用本地根证书可以对对应机构签发证书完成来源验证。
- 判断证书是否被篡改。 需要与 CA 服务器进行校验。
- 判断证书是否已吊销。 通过 CRL（Certificate Revocation List 证书注销列表）和 OCSP（Online Certificate Status Protocol 在线证书状态协议）实现。其中 OCSP 可用于第 3 步中以减少与 CA 服务器的交互，提高验证效率。	

&emsp; 以上任意一步都满足的情况下浏览器才认为证书是合法的。

## 使用 HTTPS 会被抓包吗
&emsp; 会被抓包，HTTPS 只防止用户在不知情的情况下通信被监听，如果用户主动授信，是可以构建“中间人”网络，代理软件可以对传输内容进行解密。

&emsp; HTTPS 可以防止用户在不知情的情况下通信链路被监听，对于主动授信的抓包操作是不提供防护的，因为这个场景用户是已经对风险知情。
