---
title: Nginx
author: Charles Chu
date: 2022/09/04
isOriginal: true
---

# Nginx  <Badge text="持续更新" type="warning" />
&emsp; Nginx（“engine x”）一个具有高性能的HTTP和反向代理的WEB服务器，同时也是一个POP3/SMTP/IMAP代理服务器，是由伊戈尔·赛索耶夫(俄罗斯人)使用C语言编写的，Nginx的第一个版本是2004年10月4号发布的0.1.0版本。Nginx开源。

## Nginx的功能特性及常用功能
&emsp; Nginx提供的基本功能服务从大体上归纳为"基本HTTP服务"、“高级HTTP服务”和"邮件服务"等三大类。

&emsp; Nginx常用功能主要包括HTTP代理和反向代理、负载均衡和web缓存。

### 基本HTTP服务
&emsp; Nginx提供基本HTTP服务，可作为HTTP代理服务器和反向代理服务器，支持通过缓存加速访问，可以完成简单的负载均衡和容错，支持包过滤、SSL等功能

### 高级HTTP服务
&emsp; Nginx提供高级HTTP服务，可以进行自定义配置，支持虚拟主机、URL重定向、网络监控和流媒体传输。

### 邮件服务
&emsp; Nginx作为邮件代理服务器，支持IMAP/POP3代理服务功能，支持内部SMTP服务功能。

### HTTP代理和反向代理
&emsp; HTTP代理和反向代理服务是Nginx服务器作为Web服务器的主要功能功能之一，尤其是反向代理服务，是应用十分广泛的功能。

### 负载均衡
&emsp; Nginx负载均衡主要对大量前端访问和流量进行分流，以保证前端用户访问效率。

### web缓存
&emsp; Nginx被用于缓存前端请求，可以缓存万维网、域名系统和其他网络所搜等，从而提高Web服务器性能。

## Nginx的优点
1. 速度更快、并发更高
    - Nginx之所以有这么高的并发处理能力和这么好的性能原因在于：Nginx采用了多进程和I/O多路复用(epoll)的底层实现。
2. 配置简单，扩展性强
    - Nginx的设计极具扩展性，它本身就是由很多模块组成，这些模块的使用可以通过配置文件的配置来添加。
3. 高可靠性
    - Nginx采用的是多进程模式运行，其中有一个master主进程和N多个worker进程，worker进程的数量我们可以手动设置，每个worker进程之间都是相互独立提供服务，并且master主进程可以在某一个worker进程出错时，快速去"拉起"新的worker进程提供服务。
4. 热部署
    - 可以在Nginx不停止的情况下，对Nginx进行文件升级、更新配置和更换日志文件等功能。
5. 成本低、BSD许可证
