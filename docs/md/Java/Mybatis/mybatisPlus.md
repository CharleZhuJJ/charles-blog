# Mybatis-Plus

## Mybatis-plus 配置

### configLocation

&emsp; MyBatis 配置文件位置，如果您有单独的 MyBatis 配置，请将其路径配置到 configLocation 中。

```yaml
mybatis-plus:
  config-location: classpath:mybatis-config.xml
```

```xml
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">
     <property name="configLocation" value="classpath:mybatis-config.xml"/>
</bean>
```

### mapperLocations

&emsp; MyBatis Mapper 所对应的 XML 文件位置

```yaml
mybatis-plus:
  mapper-locations: classpath*:mybatis/*.xml
```

```xml
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">
    <property name="mapperLocations" value="classpath*:mybatis/*.xml"/>
</bean>
```

### typeAliasesPackage：

&emsp; MyBaits 别名包扫描路径，通过该属性可以给包中的类注册别名，注册后在 Mapper 对应的 XML 文件中可以直接使用类名，而不用使用全限定的类名（即 XML 中调用的时候不用包含包名）

```yaml
mybatis-plus:
  type-aliases-package: cn.itcast.mp.pojo
```

```xml
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">
    <property name="typeAliasesPackage" value="com.baomidou.mybatisplus.samples.quickstart.entity"/>
</bean>
```

### mapUnderscoreToCamelCase

&emsp; 是否开启自动驼峰命名规则（camel case）映射，即从经典数据库列名 A_COLUMN（下划线命名） 到经典 Java 属性名 aColumn（驼峰命名） 的类似映射。

```yaml
#关闭自动驼峰映射，该参数不能和mybatis-plus.config-location同时存在
mybatis-plus:
  configuration:
    map-underscore-to-camel-case: false
```

### cacheEnabled

&emsp; 全局地开启或关闭配置文件中的所有映射器已经配置的任何缓存，默认为 true。

```yaml
mybatis-plus:
  configuration:
    cache-enabled: false
```

### idType

&emsp; 全局默认主键类型，设置后，即可省略实体对象中的@TableId(type = IdType.AUTO)配置

```yaml
mybatis-plus:
  global-config:
    db-config:
      id-type: auto
```

```xml
<!--这里使用MP提供的sqlSessionFactory，完成了Spring与MP的整合-->
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource"/>
    <property name="globalConfig">
        <bean class="com.baomidou.mybatisplus.core.config.GlobalConfig">
            <property name="dbConfig">
                <bean class="com.baomidou.mybatisplus.core.config.GlobalConfig$DbConfig">
                    <property name="idType" value="AUTO"/>
                </bean>
            </property>
        </bean>
    </property>
</bean>
```

## 默认 sql 是不可见的，如果需要打印 sql，需要配置日志

```yaml
# 配置日志
mybatis-plus.configuration.log-impl=org.apache.ibatis.logging.stdout.StdOutImpl
```

## Mybatis-plus 的实现

```java
@Test
public void testUserList() throws Exception{
    String resource = "mybatis-config.xml";
    InputStream inputStream = Resources.getResourceAsStream(resource);
    //这里使用的是MP中的MybatisSqlSessionFactoryBuilder
    // MybatisSqlSessionFactoryBuilder继承的BaseMapper中的方法就载入到了SqlSession中，所以就可以直接使用相关的方法；
    SqlSessionFactory sqlSessionFactory = new MybatisSqlSessionFactoryBuilder().build(inputStream);
    SqlSession sqlSession = sqlSessionFactory.openSession();
    UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
}
```

## Mybatis-plus 的 Sql 注入的原理

1. MP 在启动后会将 BaseMapper 中的一系列的方法注册到 meppedStatements 中；ISqlInjector 负责 SQL 的注入工作，它是一个接口，AbstractSqlInjector 是它的实现类。
   ![ISsqlInjector](/public/java/mybatis/ISsqlInjector.png)
2. 在 AbstractSqlInjector 中，主要是由 inspectInject()方法进行注入

```java
public void inspectInject(MapperBuilderAssistant builderAssistant, Class<?> mapperClass) {
    Class<?> modelClass = this.extractModelClass(mapperClass);
    if(modelClass != null) {
        String className = mapperClass.toString();
        Set<String> mapperRegistryCache = GlobalConfigUtils.getMapperRegistryCache(builderAssistant.getConfiguration());
        if(!mapperRegistryCache.contains(className)) {
            List<AbstractMethod> methodList = this.getMethodList();
            if(CollectionUtils.isNotEmpty(methodList)) {
                TableInfo tableInfo = TableInfoHelper.initTableInfo(builderAssistant, modelClass);
                // 循环注入自定义方法
                methodList.forEach((m) -> {
                    m.inject(builderAssistant, mapperClass, modelClass, tableInfo);
                });
            } else {
                logger.debug(mapperClass.toString() + ", No effective injection method was found.");
            }

            mapperRegistryCache.add(className);
        }
    }
}
```

3. 最终调用抽象方法 injectMappedStatement 进行真正的注入

```java
/**
* 注入自定义 MappedStatement
*
* @param mapperClass mapper 接口
* @param modelClass mapper 泛型
* @param tableInfo 数据库表反射信息
* @return MappedStatement
*/
public abstract MappedStatement injectMappedStatement(Class<?> var1, Class<?> var2, TableInfo var3);
```

4. 该方法的实现，就是 basemapper 中的默认方法
   ![AbstractMethod](/public/java/mybatis/AbstractMethod.png)

&emsp; 以 SelectById 为例查看：（生成了 SqlSource 对象，再将 SQL 通过 addSelectMappedStatement 方法添加到 meppedStatements 中）

```java
public class SelectById extends AbstractMethod {
    public SelectById() {
    }

    public MappedStatement injectMappedStatement(Class<?> mapperClass, Class<?> modelClass, TableInfo tableInfo) {
        SqlMethod sqlMethod = SqlMethod.LOGIC_SELECT_BY_ID;
        SqlSource sqlSource = new RawSqlSource(this.configuration, String.format(sqlMethod.getSql(),
                new Object[]{this.sqlSelectColumns(tableInfo, false), tableInfo.getTableName(),
                tableInfo.getKeyColumn(), tableInfo.getKeyProperty(),
                tableInfo.getLogicDeleteSql(true, false)}), Object.class);
        return this.addSelectMappedStatement(mapperClass, sqlMethod.getMethod(), sqlSource, modelClass, tableInfo);
    }
}
```

## 自定义 sql 注入器

### 1. 编写 mapper

```java
public interface MyBaseMapper<T> extends BaseMapper<T> {
    List<T> findAll();
}
```

### 2.编写 SqlInjector

```java
public class MySqlInjector extends DefaultSqlInjector {
    @Override
    public List<AbstractMethod> getMethodList() {
       List<AbstractMethod> list = new ArrayList<>();
       // 获取父类中的集合
       list.addAll(super.getMethodList());
       // 再扩充自定义的方法
       list.add(new FindAll());

      return list;
    }
}
```

### 3.编写具体的方法

```java
public class FindAll extends AbstractMethod {
    @Override
    public MappedStatement injectMappedStatement(Class<?> mapperClass, Class<?>  modelClass, TableInfo tableInfo) {
        String sqlMethod = "findAll";
        String sql = "select * from " + tableInfo.getTableName();
        SqlSource sqlSource = languageDriver.createSqlSource(configuration, sql,  modelClass);
        return this.addSelectMappedStatement(mapperClass, sqlMethod, sqlSource,  modelClass, tableInfo);
    }
}
```

### 4.注册到 Spring 容器

```java
/**
* 自定义SQL注入器
*/
@Bean
public MySqlInjector mySqlInjector(){
    return new MySqlInjector();
}
```

## Mybatis-plus 相关注解

### @TableName

&emsp;注解在类上，指定类和数据库表的映射关系。实体类的类名（转成小写后）和数据库表名相同时，可以不指定该注解。

### @TableId

&emsp;注解在实体类的某一字段上，表示这个字段对应数据库表的主键。当主键名为 id 时（表中列名为 id，实体类中字段名为 id），无需使用该注解显式指定主键，mp 会自动关联。若类的字段名和表的列名不一致，可用 value 属性指定表的列名。另，这个注解有个重要的属性 type，用于指定主键策略。

```java
public enum IdType {
    AUTO(0), // 数据库id自增
    NONE(1), // 未设置主键
    INPUT(2), // 手动输入
    ID_WORKER(3), // 默认的全局唯一id
    UUID(4), // 全局唯一id uuid
    ID_WORKER_STR(5); //ID_WORKER 字符串表示法
}
```

### @TableField

&emsp;注解在某一字段上，指定 Java 实体类的字段和数据库表的列的映射关系。这个注解有如下几个应用场景。

- 排除非表字段：若 Java 实体类中某个字段，不对应表中的任何列，它只是用于保存一些额外的，或组装后的数据，则可以设置 exist 属性为 false，这样在对实体对象进行插入时，会忽略这个字段。排除非表字段也可以通过其他方式完成，如使用 static 或 transient 关键字。
- 字段填充策略：通过 fill 属性指定，字段为空时会进行自动填充
- 属性名和字段名不一致：用 value 属性指定数据库的字段名
- 属性值不查询出来：用 select 属性指定查询出来的对象中的属性值为 null

### @Version

&emsp; 乐观锁注解

### @EnumValue

&emsp; 注解在枚举字段上

### @TableLogic

&emsp; 逻辑删除

### @KeySequence

&emsp; 序列主键策略（oracle）

### @InterceptorIgnore

&emsp; 插件过滤规则

## Mybatis-plus 的自动填充

### 1、实体类字段属性上需要增加注解

```java
// 字段添加填充内容
@TableField(fill = FieldFill.INSERT)
private Date createTime;
@TableField(fill = FieldFill.INSERT_UPDATE)
private Date updateTime;
```

### 2、编写处理器来处理这个注解

```java
public class MyMetaObjectHandler implements MetaObjectHandler {
    // 插入时的填充策略
    @Override
    public void insertFill(MetaObject metaObject) {
        // Object createDate = this.getFieldValByName("createTime", metaObject); 根据属性名获取属性值
        // setFieldValByName(String fieldName, Object fieldVal, MetaObject metaObject)
        this.setFieldValByName("createTime",new Date(),metaObject);
        this.setFieldValByName("updateTime",new Date(),metaObject);
    }
    // 更新时的填充策略
    @Override
    public void updateFill(MetaObject metaObject) {
        this.setFieldValByName("updateTime",new Date(),metaObject);
    }
}
```

## 乐观锁

- 乐观锁：故名思意十分乐观，它总是认为不会出现问题，无论干什么不去上锁！如果出现了问题，再次更新值测试
- 悲观锁：故名思意十分悲观，它总是认为总是出现问题，无论干什么都会上锁！再去操作！

### 乐观锁实现方式

- 取出记录时，获取当前 version
- 更新时，带上这个 version
- 执行更新时， set version = newVersion where version = oldVersion
- 如果 version 不对，就更新失败

```sql
-- 乐观锁：1、先查询，获得版本号 version = 1
-- A
update user set name = "kuangshen", version = version + 1
where id = 2 and version = 1
-- B 线程抢先完成，这个时候 version = 2，会导致 A 修改失败！
update user set name = "kuangshen", version = version + 1
where id = 2 and version = 1
```

### MybatisPlus 实现乐观锁

#### 1、实体类加对应的字段

```java
@Version //乐观锁Version注解
private Integer version;
```

#### 2、注册组件

```java
// 扫描我们的 mapper 文件夹
@MapperScan("com.kuang.mapper")
@EnableTransactionManagement
@Configuration // 配置类
public class MyBatisPlusConfig {
    // 注册乐观锁插件
    @Bean
    public OptimisticLockerInterceptor optimisticLockerInterceptor() {
        return new OptimisticLockerInterceptor();
    }
}
```

## Mybatis-plus 的分页查询

### 1、配置拦截器组件

```java
// 分页插件
@Bean
public PaginationInterceptor paginationInterceptor() {
    return new PaginationInterceptor();
}
```

### 2、直接使用 Page 对象即可

```java
public void testPage(){
    // 参数一：当前页
    // 参数二：页面大小
    // 使用了分页插件之后，所有的分页操作也变得简单的！
    Page<User> page = new Page<>(2,5);
    userMapper.selectPage(page,null);
    page.getRecords().forEach(System.out::println);
    System.out.println(page.getTotal());
}
```

## Mybatis-plus 的逻辑删除

### 1、实体类中增加属性

```java
@TableLogic //逻辑删除
private Integer deleted;
```

### 2、配置组件

```yaml
# 配置逻辑删除
mybatis-plus.global-config.db-config.sql-injector:com.baomidou.mybatisplus.mapper.LogicSqlInjector
mybatis-plus.global-config.db-config.logic-delete-value=1
mybatis-plus.global-config.db-config.logic-not-delete-value=0
```

## Mybatis-plus 的性能分析插件

```java
/**
* SQL执行效率插件
*/
@Bean
@Profile({"dev","test"})// 设置 dev test 环境开启，保证我们的效率
public PerformanceInterceptor performanceInterceptor() {
    PerformanceInterceptor performanceInterceptor = new PerformanceInterceptor();
    performanceInterceptor.setMaxTime(100); // ms设置sql执行的最大时间，如果超过了则不执行
    performanceInterceptor.setFormat(true); // 是否格式化代码
   return performanceInterceptor;
}
```

## Mybatis-plus 中 Oracle 主键 Sequence

### 1、创建序列

```sql
--创建序列
CREATE SEQUENCE SEQ_USER START WITH 1 INCREMENT BY 1
```

### 2、配置 id 生成策略

```yaml
#id生成策略
mybatis-plus:
  global-config:
    db-config:
      id-type: input
```

### 3、配置序列

```java
@Configuration
@MapperScan("cn.itcast.mp.mapper") //设置mapper接口的扫描包
public class MybatisPlusConfig {
    /**
    * 序列生成器
    */
    @Bean
    public OracleKeyGenerator oracleKeyGenerator(){
        return new OracleKeyGenerator();
   }
}
```

### 4、在实体对象中指定序列的名称

```java
@KeySequence(value = "SEQ_USER", clazz = Long.class)
public class User{
    ......
}
```

## Mybatis-plus 的通用枚举

### 1、定义枚举类

```java
public enum SexEnum implements IEnum<Integer> {
    MAN(1,"男"),
    WOMAN(2,"女");

    private int value;
    private String desc;

     SexEnum(int value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    @Override
    public Integer getValue() {
        return this.value;
    }

    @Override
    public String toString() {
        return this.desc;
    }
}
```

### 2、配置

```yaml
# 枚举包扫描
mybatis-plus.type-enums-package=cn.itcast.mp.enums
```

### 3、实体类添加属性

```java
private SexEnum sex;
```
