---
title: Spring事务
author: Charles Chu
date: 2023/03/11
isOriginal: true
---

# Spring事务

## 事务失效情况
### 1、没有被 Spring 管理
```java
// @Service
public class OrderServiceImpl implements OrderService {    
    @Transactional    
    public void updateOrder(Order order) {
        // update order    
    }
}
// 如果此时把 @Service 注解注释掉，这个类就不会被加载成一个 Bean，那这个类就不会被 Spring 管理了，事务自然就失效了。
```

### 2、方法不是 public 的
&emsp;大概意思就是 @Transactional 只能用于 public 的方法上，否则事务不会失效，如果要用在非 public 方法上，可以开启 AspectJ 代理模式。

### 3、自身调用问题
```java
// 案例一：（解决方案：update方法添加事务）
@Service
public class OrderServiceImpl implements OrderService {    
    public void update(Order order) {
            updateOrder(order);    
    }   
 
    @Transactional    
    public void updateOrder(Order order) {       
     // update order    
    }
}

// 案例二（解决方案：我们将要事务分离出来的方法写在另一个service中，即把updateOrder分离到另一个service）
@Service
public class OrderServiceImpl implements OrderService {
    @Transactional
    public void update(Order order) {
        updateOrder(order);
    }
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void updateOrder(Order order) {
        // update order
    }
}
```

### 4、异常类型错误
```java
// @Service
public class OrderServiceImpl implements OrderService {
    @Transactional
    public void updateOrder(Order order) {
        try {
            // update order
        } catch {
            throw new Exception("更新错误");
        }
    }
}
 
// 这样事务也是不生效的，因为默认回滚的是：RuntimeException，如果你想触发其他异常的回滚，需要在注解上配置一下，如：
@Transactional(rollbackFor = Exception.class)
```

### 5、数据库引擎不支持事务
&emsp; 以MySQL为例，MyISAM引擎是不支持事务操作的，一般要支持事务都会使用InnoDB引擎，根据MySQL的官方文档说明，从MySQL 5.5.5 开始的默认存储引擎是InnoDB，之前默认的都是MyISAM，所以这一点要值得注意，如果底层引擎不支持事务，那么再怎么设置也没有用。

### 6、没有配置事务管理器
&emsp; 如果没有配置以下DataSourceTransactionManager数据源事务管理器，那么事务也不会生效
```java
@Bean
public PlatformTransactionManager transactionManager(DataSource dataSource) {
  return new DataSourceTransactionManager(dataSource);
}  
```
但在 Spring Boot 中只要引入了spring-boot-starter-data-jdbc启动器依赖就会自动配置DataSourceTransactionManager数据源事务管理器，所以 Spring Boot框架不存在这个问题，但在传统的 Spring框架中需要注意。

