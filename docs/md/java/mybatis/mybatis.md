# Mybatis

## Mybatis缓存

### 一级缓存
- 它指的是Mybatis中SqlSession对象的缓存。
- 当我们执行查询之后，查询的结果会同时存入到SqlSession为我们提供一块区域中。
- 该区域的结构是一个Map。当我们再次查询同样的数据，mybatis会先去sqlsession中
- 查询是否有，有的话直接拿出来用。
- 当SqlSession对象消失时，mybatis的一级缓存也就消失了。

&emsp; 一级缓存是 SqlSession 级别的缓存，只要 SqlSession 没有 flush 或 close，它就存在。

&emsp; 一级缓存是 SqlSession 范围的缓存，当调用 SqlSession 的修改，添加，删除，commit()，close()等方法时，就会清空一级缓存。

### 二级缓存
&emsp;  它指的是Mybatis中SqlSessionFactory对象的缓存。由同一个SqlSessionFactory对象创建的SqlSession共享其缓存。

&emsp;二级缓存是 mapper 映射级别的缓存，多个 SqlSession 去操作同一个 Mapper 映射的 sql 语句，多个SqlSession 可以共用二级缓存，二级缓存是跨 SqlSession 的。

&emsp; 当我们在使用二级缓存时，所缓存的类一定要实现 java.io.Serializable 接口，这种就可以使用序列化方式来保存对象。

#### 二级缓存的使用步骤
- 第一步：让Mybatis框架支持二级缓存（在SqlMapConfig.xml中配置）
- 第二步：让当前的映射文件支持二级缓存（在IUserDao.xml中配置）
- 第三步：让当前的操作支持二级缓存（在select标签中配置）

## #{}和${}的区别
Mybatis的Mapper.xml语句中parameterType向SQL语句传参有两种方式：#{}和${}

我们经常使用的是#{},一般解说是因为这种方式可以防止SQL注入，简单的说#{}这种方式SQL语句是经过预编译的，它是把#{}中间的参数转义成字符串，举个例子：
```sql
-- 预编译后,会动态解析成一个参数标记符?：
select * from student where student_name = #{name} 
select * from student where student_name = ?
 
-- 而使用${}在动态解析时候，会传入参数字符串
select * from student where student_name = ${name} 
select * from student where student_name = 'lyrics'
```
- #{} 这种取值是编译好SQL语句再取值，${} 这种是取值以后再去编译SQL语句
- #{}方式能够很大程度防止sql注入。$方式无法防止Sql注入。
- $方式一般用于传入数据库对象

## Mybatis中的Mapper接口里的方法，是不能重载的
&emsp;  因为是使用 全限名+方法名 的保存和寻找策略。Mapper 接口的工作原理是 JDK 动态代理，Mybatis 运行时会使用 JDK动态代理为 Mapper 接口生成代理对象 proxy，代理对象会拦截接口方法，转而执行 MapperStatement 所代表的 sql，然后将 sql 执行结果返回。

## Mybatis是如何将sql执行结果封装为目标对象并返回的？都有哪些映射形式？
- 第一种是使用标签，逐一定义数据库列名和对象属性名之间的映射关系。
- 第二种是使用 sql 列的别名功能，将列的别名书写为对象属性名。
&emsp;  有了列名与属性名的映射关系后，Mybatis 通过反射创建对象，同时使用反射给对象的属性逐一赋值并返回，那些找不到映射关系的属性，是无法完成赋值的。

## Mybatis 动态 sql 有什么用？执行原理？有哪些动态 sql？
&emsp;  Mybatis 动态 sql 可以在 Xml 映射文件内，以标签的形式编写动态 sql，执行原理 是根据表达式的值 完成逻辑判断并动态拼接 sql 的功能。Mybatis 提供了 9 种动态 sql 标签：trim | where | set | foreach | if | choose | when | otherwise | bind。

## Mybatis连接多个数据源
### 配置多个数据源
```java
@Configuration
// 扫描对应库中的dao包所在位置,dao位置也要对应放在不同位置,利用不同的dao请求不同的数据源数据
@MapperScan(basePackages = {"com.wdbyte.mapper.primary"}, sqlSessionFactoryRef = "sqlSessionFactory")
public class PrimaryDataSourceConfig {
 
    @Bean(name = "dataSource")
    @ConfigurationProperties(prefix = "spring.datasource.primary") 
    // 读取yml配置文件的数据库连接配置（url,username,password,driverClassName）
    @Primary // @Primary 表示默认的,必须且指定一个
    public DataSource dataSource() {
        return DataSourceBuilder.create().build();
    }
 
    @Bean(name = "sqlSessionFactory")
    @Primary
    // @Qualifier("dataSource") 注入上面配置的数据源
    public SqlSessionFactory sqlSessionFactory(@Qualifier("dataSource") DataSource dataSource) throws Exception {
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(dataSource);
        bean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:mapper/*.xml"));
        return bean.getObject();
    }
 
    @Bean(name = "sqlSessionTemplate")
    @Primary
    public SqlSessionTemplate sqlSessionTemplate(@Qualifier("sqlSessionFactory") SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }
}
```

## mybatis中的jdbcType
```xml
<insert id="insert"  parameterType="java.xx.xx" >
    insert into table values name = #{name,jdbcType=VARCHAR}　
</insert>
// jdbcType=VARCHAR,这是为了程序的安全性。
// 当传入的参数name为空时不会使程序出现问题；当name为空时，mybatis不知道具体要转换成什么jdbcType类型，有些特殊情况会报错
```
