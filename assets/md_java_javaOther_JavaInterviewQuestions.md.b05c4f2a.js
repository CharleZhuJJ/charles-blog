import{_ as i}from"./chunks/ArticleMetadata.8b6b367a.js";import{_ as A,H as l,o as p,c as D,C as t,a as o,J as e,E as C,V as B,D as u,G as E}from"./chunks/framework.981adca9.js";const F="/charles-blog/assets/Collection.70e01d0a.png",h="/charles-blog/assets/Map.512e2014.png",P=JSON.parse('{"title":"Java面试题","description":"","frontmatter":{"title":"Java面试题","author":"Charles Chu","date":"2023/02/26","isOriginal":true},"headers":[],"relativePath":"md/java/javaOther/JavaInterviewQuestions.md","filePath":"md/java/javaOther/JavaInterviewQuestions.md","lastUpdated":1697269547000}'),d={name:"md/java/javaOther/JavaInterviewQuestions.md"},m={id:"java面试题",tabindex:"-1"},g=t("a",{class:"header-anchor",href:"#java面试题","aria-label":'Permalink to "Java面试题 <Badge text="持续更新" type="warning" />"'},"​",-1),q=B(`<h2 id="构造器是否可以重写" tabindex="-1">构造器是否可以重写 <a class="header-anchor" href="#构造器是否可以重写" aria-label="Permalink to &quot;构造器是否可以重写&quot;">​</a></h2><p>  Constructor 不能被 override（重写），但是可以 overload（重载），所以你可以看到⼀个类中有多个构造函数的情况。</p><h2 id="和-equals-的区别" tabindex="-1">== 和 equals 的区别 <a class="header-anchor" href="#和-equals-的区别" aria-label="Permalink to &quot;== 和 equals 的区别&quot;">​</a></h2><p>  == : 它的作用是判断两个对象的地址是不是相等。即，判断两个对象是不是同一个对象。(基本数据类型 == 比较的是值，引用数据类型 == 比较的是内存地址)。</p><p>  equals() : 它的作用也是判断两个对象是否相等。但它一般有两种使用情况：</p><ul><li>类没有覆盖 equals() 方法。则通过 equals() 比较该类的两个对象时，等价于通过“==”比较这两个对象。</li><li>类覆盖了 equals() 方法。一般，我们都覆盖 equals() 方法来两个对象的内容相等；若它们的内容相等，则返回 true (即，认为这两个对象相等)。</li></ul><h2 id="为什么重写-equals-时必须重写-hashcode-方法" tabindex="-1">为什么重写 equals 时必须重写 hashCode 方法： <a class="header-anchor" href="#为什么重写-equals-时必须重写-hashcode-方法" aria-label="Permalink to &quot;为什么重写 equals 时必须重写 hashCode 方法：&quot;">​</a></h2><p>  如果两个对象相等，则 hashcode 一定也是相同的。两个对象相等，对两个对象分别调用 equals 方法都返回 true。两个对象有相同的 hashcode 值，它们也不一定是相等的。因此，equals 方法被覆盖过，则 hashCode 方法也必须被覆盖</p><h2 id="为什么要有-hashcode-以-hashset-如何检查重复-为例子来说明为什么要有-hashcode" tabindex="-1">为什么要有 hashcode：以“HashSet 如何检查重复”为例子来说明为什么要有 hashCode： <a class="header-anchor" href="#为什么要有-hashcode-以-hashset-如何检查重复-为例子来说明为什么要有-hashcode" aria-label="Permalink to &quot;为什么要有 hashcode：以“HashSet 如何检查重复”为例子来说明为什么要有 hashCode：&quot;">​</a></h2><p>  当你把对象加入 HashSet 时，HashSet 会先计算对象的 hashcode 值来判断对象加入的位置，同时也会与其他已经加入的对象的 hashcode 值作比较，如果没有相符的 hashcode，HashSet 会假设对象没有重复出现。但是如果发现有相同 hashcode 值的对象，这时会调用 equals()方法来检查 hashcode 相等的对象是否真的相同。如果两者相同，HashSet 就不会让其加入操作成功。如果不同的话，就会重新散列到其他位置。这样我们就大大减少了 equals 的次数，相应就大大提高了执行速度。</p><h2 id="hashmap-使用-string-作为-key-有什么好处" tabindex="-1">HashMap 使用 String 作为 key 有什么好处 <a class="header-anchor" href="#hashmap-使用-string-作为-key-有什么好处" aria-label="Permalink to &quot;HashMap 使用 String 作为 key 有什么好处&quot;">​</a></h2><p>  HashMap 内部实现是通过 key 的 hashcode 来确定 value 的存储位置，因为字符串是不可变的，所以当创建字符串时，它的 hashcode 被缓存下来，不需要再次计算，所以相比于其他对象更快。</p><h2 id="java子类继承父类后new子类对象的过程" tabindex="-1">JAVA子类继承父类后new子类对象的过程 <a class="header-anchor" href="#java子类继承父类后new子类对象的过程" aria-label="Permalink to &quot;JAVA子类继承父类后new子类对象的过程&quot;">​</a></h2><ol><li>父类静态变量</li><li>父类静态代码块</li><li>子类静态变量</li><li>子类静态代码块</li><li>父类非静态变量</li><li>父类非静态代码块</li><li>父类匿名内部类</li><li>父类静态方法</li><li>子类非静态变量</li><li>子类非静态代码块</li><li>子类匿名内部类</li><li>子类构造方法。</li></ol><p>总结：先父后子，先静态后非静态</p><ul><li>父类静态-子类静态（静态代码块只执行一次）</li><li>父类非静态-父类构造（子类无参构造写不写super(),默认都走父类无参构造，子类构造写super(有参)，走父类的有参构造）</li><li>子类非静态-子类构造 (创建子类对象时无参走无参构造方法，有参走有参构造方法)</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#F47067;">public</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">class</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">Father</span><span style="color:#ADBAC7;"> {</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">static</span><span style="color:#ADBAC7;">{</span></span>
<span class="line"><span style="color:#ADBAC7;">        System.out.</span><span style="color:#DCBDFB;">println</span><span style="color:#ADBAC7;">(</span><span style="color:#96D0FF;">&quot;父类的静态代码块{}执行了。。。&quot;</span><span style="color:#ADBAC7;">);</span></span>
<span class="line"><span style="color:#ADBAC7;">        System.out.</span><span style="color:#DCBDFB;">println</span><span style="color:#ADBAC7;">();</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#ADBAC7;">    {</span></span>
<span class="line"><span style="color:#ADBAC7;">        System.out.</span><span style="color:#DCBDFB;">println</span><span style="color:#ADBAC7;">(</span><span style="color:#96D0FF;">&quot;父类的非静态代码块{}执行了。。。&quot;</span><span style="color:#ADBAC7;">);</span></span>
<span class="line"><span style="color:#ADBAC7;">        System.out.</span><span style="color:#DCBDFB;">println</span><span style="color:#ADBAC7;">();</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">public</span><span style="color:#ADBAC7;"> </span><span style="color:#DCBDFB;">Father</span><span style="color:#ADBAC7;">(){</span></span>
<span class="line"><span style="color:#ADBAC7;">        System.out.</span><span style="color:#DCBDFB;">println</span><span style="color:#ADBAC7;">(</span><span style="color:#96D0FF;">&quot;父类的无参构造structure 执行了。。。&quot;</span><span style="color:#ADBAC7;">);</span></span>
<span class="line"><span style="color:#ADBAC7;">        System.out.</span><span style="color:#DCBDFB;">println</span><span style="color:#ADBAC7;">();</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">public</span><span style="color:#ADBAC7;"> </span><span style="color:#DCBDFB;">Father</span><span style="color:#ADBAC7;">(String </span><span style="color:#F69D50;">name</span><span style="color:#ADBAC7;">,Integer </span><span style="color:#F69D50;">age</span><span style="color:#ADBAC7;">){</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#768390;">//super(); 默认执行父类的无参构造</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#6CB6FF;">this</span><span style="color:#ADBAC7;">.name </span><span style="color:#F47067;">=</span><span style="color:#ADBAC7;"> name;</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#6CB6FF;">this</span><span style="color:#ADBAC7;">.age </span><span style="color:#F47067;">=</span><span style="color:#ADBAC7;"> age;</span></span>
<span class="line"><span style="color:#ADBAC7;">        System.out.</span><span style="color:#DCBDFB;">println</span><span style="color:#ADBAC7;">(</span><span style="color:#96D0FF;">&quot;父类的有参构造structure 执行了。。。&quot;</span><span style="color:#ADBAC7;">);</span></span>
<span class="line"><span style="color:#ADBAC7;">        System.out.</span><span style="color:#DCBDFB;">println</span><span style="color:#ADBAC7;">();</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">public</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">static</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">void</span><span style="color:#ADBAC7;"> </span><span style="color:#DCBDFB;">Read</span><span style="color:#ADBAC7;">(){</span></span>
<span class="line"><span style="color:#ADBAC7;">        System.out.</span><span style="color:#DCBDFB;">println</span><span style="color:#ADBAC7;">(</span><span style="color:#96D0FF;">&quot;父类的静态Read方法执行了。。。&quot;</span><span style="color:#ADBAC7;">);</span></span>
<span class="line"><span style="color:#ADBAC7;">        System.out.</span><span style="color:#DCBDFB;">println</span><span style="color:#ADBAC7;">();</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">public</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">void</span><span style="color:#ADBAC7;"> </span><span style="color:#DCBDFB;">tour</span><span style="color:#ADBAC7;">(){</span></span>
<span class="line"><span style="color:#ADBAC7;">        System.out.</span><span style="color:#DCBDFB;">println</span><span style="color:#ADBAC7;">(</span><span style="color:#96D0FF;">&quot;父类的非静态tour方法执行了。。。&quot;</span><span style="color:#ADBAC7;">);</span></span>
<span class="line"><span style="color:#ADBAC7;">        System.out.</span><span style="color:#DCBDFB;">println</span><span style="color:#ADBAC7;">();</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">private</span><span style="color:#ADBAC7;"> String</span><span style="color:#F69D50;"> </span><span style="color:#ADBAC7;">name;</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">private</span><span style="color:#ADBAC7;"> Integer</span><span style="color:#F69D50;"> </span><span style="color:#ADBAC7;">age;</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">public</span><span style="color:#ADBAC7;"> String </span><span style="color:#DCBDFB;">getName</span><span style="color:#ADBAC7;">() {</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F47067;">return</span><span style="color:#ADBAC7;"> name;</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">public</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">void</span><span style="color:#ADBAC7;"> </span><span style="color:#DCBDFB;">setName</span><span style="color:#ADBAC7;">(String </span><span style="color:#F69D50;">name</span><span style="color:#ADBAC7;">) {</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#6CB6FF;">this</span><span style="color:#ADBAC7;">.name </span><span style="color:#F47067;">=</span><span style="color:#ADBAC7;"> name;</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">public</span><span style="color:#ADBAC7;"> Integer </span><span style="color:#DCBDFB;">getAge</span><span style="color:#ADBAC7;">() {</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F47067;">return</span><span style="color:#ADBAC7;"> age;</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">public</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">void</span><span style="color:#ADBAC7;"> </span><span style="color:#DCBDFB;">setAge</span><span style="color:#ADBAC7;">(Integer </span><span style="color:#F69D50;">age</span><span style="color:#ADBAC7;">) {</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#6CB6FF;">this</span><span style="color:#ADBAC7;">.age </span><span style="color:#F47067;">=</span><span style="color:#ADBAC7;"> age;</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"><span style="color:#ADBAC7;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F47067;">public</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">class</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">Son</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">extends</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">Father</span><span style="color:#ADBAC7;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">static</span><span style="color:#ADBAC7;">{</span></span>
<span class="line"><span style="color:#ADBAC7;">        System.out.</span><span style="color:#DCBDFB;">println</span><span style="color:#ADBAC7;">(</span><span style="color:#96D0FF;">&quot;子类的静态代码块{}执行了。。。&quot;</span><span style="color:#ADBAC7;">);</span></span>
<span class="line"><span style="color:#ADBAC7;">        System.out.</span><span style="color:#DCBDFB;">println</span><span style="color:#ADBAC7;">();</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#ADBAC7;">    {</span></span>
<span class="line"><span style="color:#ADBAC7;">        System.out.</span><span style="color:#DCBDFB;">println</span><span style="color:#ADBAC7;">(</span><span style="color:#96D0FF;">&quot;子类的非静态代码块{}执行了。。。&quot;</span><span style="color:#ADBAC7;">);</span></span>
<span class="line"><span style="color:#ADBAC7;">        System.out.</span><span style="color:#DCBDFB;">println</span><span style="color:#ADBAC7;">();</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">public</span><span style="color:#ADBAC7;"> </span><span style="color:#DCBDFB;">Son</span><span style="color:#ADBAC7;">(){</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#768390;">//super(); 默认执行Father的无参构造</span></span>
<span class="line"><span style="color:#ADBAC7;">        System.out.</span><span style="color:#DCBDFB;">println</span><span style="color:#ADBAC7;">(</span><span style="color:#96D0FF;">&quot;子类的无参构造structure 执行了。。。&quot;</span><span style="color:#ADBAC7;">);</span></span>
<span class="line"><span style="color:#ADBAC7;">        System.out.</span><span style="color:#DCBDFB;">println</span><span style="color:#ADBAC7;">();</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">public</span><span style="color:#ADBAC7;"> </span><span style="color:#DCBDFB;">Son</span><span style="color:#ADBAC7;">(String </span><span style="color:#F69D50;">name</span><span style="color:#ADBAC7;">, Integer </span><span style="color:#F69D50;">age</span><span style="color:#ADBAC7;">) {</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#768390;">//super(); 默认执行Father的无参构造</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#6CB6FF;">super</span><span style="color:#ADBAC7;">(name,age); </span><span style="color:#768390;">//执行Father的有参构造</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#6CB6FF;">this</span><span style="color:#ADBAC7;">.name </span><span style="color:#F47067;">=</span><span style="color:#ADBAC7;"> name;</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#6CB6FF;">this</span><span style="color:#ADBAC7;">.age </span><span style="color:#F47067;">=</span><span style="color:#ADBAC7;"> age;</span></span>
<span class="line"><span style="color:#ADBAC7;">        System.out.</span><span style="color:#DCBDFB;">println</span><span style="color:#ADBAC7;">(</span><span style="color:#96D0FF;">&quot;子类的有参构造structure 执行了。。。&quot;</span><span style="color:#ADBAC7;">);</span></span>
<span class="line"><span style="color:#ADBAC7;">        System.out.</span><span style="color:#DCBDFB;">println</span><span style="color:#ADBAC7;">();</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">public</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">static</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">void</span><span style="color:#ADBAC7;"> </span><span style="color:#DCBDFB;">Read</span><span style="color:#ADBAC7;">(){</span></span>
<span class="line"><span style="color:#ADBAC7;">        System.out.</span><span style="color:#DCBDFB;">println</span><span style="color:#ADBAC7;">(</span><span style="color:#96D0FF;">&quot;子类的静态Read方法执行了。。。&quot;</span><span style="color:#ADBAC7;">);</span></span>
<span class="line"><span style="color:#ADBAC7;">        System.out.</span><span style="color:#DCBDFB;">println</span><span style="color:#ADBAC7;">();</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#ADBAC7;">    @</span><span style="color:#F47067;">Override</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">public</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">void</span><span style="color:#ADBAC7;"> </span><span style="color:#DCBDFB;">tour</span><span style="color:#ADBAC7;">(){</span></span>
<span class="line"><span style="color:#ADBAC7;">        System.out.</span><span style="color:#DCBDFB;">println</span><span style="color:#ADBAC7;">(</span><span style="color:#96D0FF;">&quot;子类的非静态tour方法执行了。。。&quot;</span><span style="color:#ADBAC7;">);</span></span>
<span class="line"><span style="color:#ADBAC7;">        System.out.</span><span style="color:#DCBDFB;">println</span><span style="color:#ADBAC7;">();</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">private</span><span style="color:#ADBAC7;"> String</span><span style="color:#F69D50;"> </span><span style="color:#ADBAC7;">name;</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">private</span><span style="color:#ADBAC7;"> Integer</span><span style="color:#F69D50;"> </span><span style="color:#ADBAC7;">age;</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">public</span><span style="color:#ADBAC7;"> String </span><span style="color:#DCBDFB;">getName</span><span style="color:#ADBAC7;">() {</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F47067;">return</span><span style="color:#ADBAC7;"> name;</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">public</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">void</span><span style="color:#ADBAC7;"> </span><span style="color:#DCBDFB;">setName</span><span style="color:#ADBAC7;">(String </span><span style="color:#F69D50;">name</span><span style="color:#ADBAC7;">) {</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#6CB6FF;">this</span><span style="color:#ADBAC7;">.name </span><span style="color:#F47067;">=</span><span style="color:#ADBAC7;"> name;</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">public</span><span style="color:#ADBAC7;"> Integer </span><span style="color:#DCBDFB;">getAge</span><span style="color:#ADBAC7;">() {</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F47067;">return</span><span style="color:#ADBAC7;"> age;</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">public</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">void</span><span style="color:#ADBAC7;"> </span><span style="color:#DCBDFB;">setAge</span><span style="color:#ADBAC7;">(Integer </span><span style="color:#F69D50;">age</span><span style="color:#ADBAC7;">) {</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#6CB6FF;">this</span><span style="color:#ADBAC7;">.age </span><span style="color:#F47067;">=</span><span style="color:#ADBAC7;"> age;</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ADBAC7;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F47067;">public</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">class</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">MainTest</span><span style="color:#ADBAC7;"> {</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">public</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">static</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">void</span><span style="color:#ADBAC7;"> </span><span style="color:#DCBDFB;">main</span><span style="color:#ADBAC7;">(</span><span style="color:#F47067;">String</span><span style="color:#ADBAC7;">[] </span><span style="color:#F69D50;">args</span><span style="color:#ADBAC7;">) {      </span></span>
<span class="line"><span style="color:#ADBAC7;">        Son</span><span style="color:#F69D50;"> </span><span style="color:#ADBAC7;">son</span><span style="color:#F69D50;"> </span><span style="color:#F47067;">=</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">new</span><span style="color:#ADBAC7;"> </span><span style="color:#DCBDFB;">Son</span><span style="color:#ADBAC7;">();</span></span>
<span class="line"><span style="color:#ADBAC7;">        System.out.</span><span style="color:#DCBDFB;">println</span><span style="color:#ADBAC7;">(</span><span style="color:#96D0FF;">&quot;======================&quot;</span><span style="color:#ADBAC7;">);</span></span>
<span class="line"><span style="color:#ADBAC7;">        Son</span><span style="color:#F69D50;"> </span><span style="color:#ADBAC7;">son1</span><span style="color:#F69D50;"> </span><span style="color:#F47067;">=new</span><span style="color:#ADBAC7;"> </span><span style="color:#DCBDFB;">Son</span><span style="color:#ADBAC7;">(</span><span style="color:#96D0FF;">&quot;谭谭&quot;</span><span style="color:#ADBAC7;">,</span><span style="color:#6CB6FF;">32</span><span style="color:#ADBAC7;">);</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ADBAC7;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;">/*</span></span>
<span class="line"><span style="color:#768390;">输出结果：</span></span>
<span class="line"><span style="color:#768390;">父类的静态代码块{}执行了。。。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;">子类的静态代码块{}执行了。。。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;">父类的非静态代码块{}执行了。。。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;">父类的无参构造structure 执行了。。。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;">子类的非静态代码块{}执行了。。。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;">子类的无参构造structure 执行了。。。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;">======================</span></span>
<span class="line"><span style="color:#768390;">父类的非静态代码块{}执行了。。。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;">父类的有参构造structure 执行了。。。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;">子类的非静态代码块{}执行了。。。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#768390;">子类的有参构造structure 执行了。。。</span></span>
<span class="line"><span style="color:#768390;">*/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Father</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;父类的静态代码块{}执行了。。。&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;父类的非静态代码块{}执行了。。。&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Father</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;父类的无参构造structure 执行了。。。&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Father</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">name</span><span style="color:#24292E;">,Integer </span><span style="color:#E36209;">age</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//super(); 默认执行父类的无参构造</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> name;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.age </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> age;</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;父类的有参构造structure 执行了。。。&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Read</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;父类的静态Read方法执行了。。。&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tour</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;父类的非静态tour方法执行了。。。&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String name;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Integer age;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">getName</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> name;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setName</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">name</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> name;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Integer </span><span style="color:#6F42C1;">getAge</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> age;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setAge</span><span style="color:#24292E;">(Integer </span><span style="color:#E36209;">age</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.age </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> age;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Son</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Father</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;子类的静态代码块{}执行了。。。&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;子类的非静态代码块{}执行了。。。&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Son</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//super(); 默认执行Father的无参构造</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;子类的无参构造structure 执行了。。。&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Son</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">name</span><span style="color:#24292E;">, Integer </span><span style="color:#E36209;">age</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//super(); 默认执行Father的无参构造</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">(name,age); </span><span style="color:#6A737D;">//执行Father的有参构造</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> name;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.age </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> age;</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;子类的有参构造structure 执行了。。。&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Read</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;子类的静态Read方法执行了。。。&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tour</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;子类的非静态tour方法执行了。。。&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String name;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Integer age;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">getName</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> name;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setName</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">name</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> name;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Integer </span><span style="color:#6F42C1;">getAge</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> age;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setAge</span><span style="color:#24292E;">(Integer </span><span style="color:#E36209;">age</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.age </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> age;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MainTest</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {      </span></span>
<span class="line"><span style="color:#24292E;">        Son son </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Son</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;======================&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        Son son1 </span><span style="color:#D73A49;">=new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Son</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;谭谭&quot;</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">32</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">输出结果：</span></span>
<span class="line"><span style="color:#6A737D;">父类的静态代码块{}执行了。。。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">子类的静态代码块{}执行了。。。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">父类的非静态代码块{}执行了。。。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">父类的无参构造structure 执行了。。。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">子类的非静态代码块{}执行了。。。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">子类的无参构造structure 执行了。。。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">======================</span></span>
<span class="line"><span style="color:#6A737D;">父类的非静态代码块{}执行了。。。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">父类的有参构造structure 执行了。。。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">子类的非静态代码块{}执行了。。。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">子类的有参构造structure 执行了。。。</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre></div><h2 id="java中的集合" tabindex="-1">JAVA中的集合 <a class="header-anchor" href="#java中的集合" aria-label="Permalink to &quot;JAVA中的集合&quot;">​</a></h2><p>集合可以分为Collection（单列集合）和Map（双列集合）</p><ul><li>Collection又可以分为Set（不可存储重复元素）和List（可存储重复元素） <ul><li>Set又可以分为HashSethe和TreeSet</li><li>List又可以分为ArrayList，LinkedList和Vector</li></ul></li><li>Map又可以分为HashMap和TreeMap <img src="`+F+'" alt="Collection"><img src="'+h+'" alt="Map"></li></ul><h2 id="数据库表中加索引的情况" tabindex="-1">数据库表中加索引的情况 <a class="header-anchor" href="#数据库表中加索引的情况" aria-label="Permalink to &quot;数据库表中加索引的情况&quot;">​</a></h2><h3 id="适合加索引的情况" tabindex="-1">适合加索引的情况 <a class="header-anchor" href="#适合加索引的情况" aria-label="Permalink to &quot;适合加索引的情况&quot;">​</a></h3><ol><li>字段的数值具有唯一性限制 <ul><li>业务上具有唯一特性的字段，即便是组合字段，也必须建成唯一索引，这种唯一索引对insert的速度损耗可以忽略，但能显著提高查找速度。</li></ul></li><li>频繁作为WHERE查询条件的字段 <ul><li>如果某个字段在SELECT语句的WHERE条件中经常被使用，那么就需要给这个字段创建索引。尤其是在数据量大的情况下，创建普通索引都可以大幅提升数据查询的效率。</li></ul></li><li>经常 GROUP BY 和 ORDER BY 的列 <ul><li>索引就是让数据按照某种顺序进行存储或检索，当对数据进行分组查询或排序的时候，就需要对分组或者排序的字段进行索引。</li><li>如果待排序的列有多个，那么可以在这些列上建立组合索引。</li></ul></li><li>需要 UPDATE 和 DELET 的 WHERE 条件列 <ul><li>当按条件查询再进行 UPDATE 和 DELETE 操作时（先查再改），如果对 WHERE 字段创建了索引，就能大幅提升效率。</li><li>原理： 因为我们需要先使用 WHERE 检录出这些记录，随后再对其进行更新或删除。如果更新的字段是非索引字段，提升的效率会更明显，因为更新非索引字段不需要维护已有索引。</li></ul></li><li>DISTINCT 字段需要创建索引 <ul><li>当需要对某个字段进行去重，使用DISTINCT时，对这个字段创建索引，也会提升查询效率。</li><li>索引会对数据按照某种顺序进行排序，所以在去重的时候也会快很多。</li></ul></li><li>多表 JOIN 连接操作时，创建索引注意事项 <ul><li>连接表的数量尽量不要超过3张：因为每增加一张表就相当于增加了一次嵌套的循环，数量级增长会非常快，严重影响效率。</li><li>对 WHERE 条件创建索引 ，因为 WHERE 才是对数据条件的过滤。如果在数据量非常大的情况下，没有 WHERE 条件过滤是非常可怕的。</li><li>对用于连接的字段创建索引，并且该字段在多张表中的类型必须一致 。</li></ul></li><li>使用列的类型小的创建索引</li><li>使用字符串前缀创建索引 <ul><li>截取前缀时过多达不到节省索引存储空间的目的，过少则会因为重复内容太多从而导致字段的散列度（选择性）降低。</li><li>在varchar字段上建立索引时，必须指定索引长度，没必要对全字段建立索引，根据实际文本区分度决定索引长度。</li><li>索引的长度与区分度是一对矛盾体，一般对字符串类型数据，长度为 20 的索引，区分度会高达90% 以上，可以使用 count(distinct left(列名, 索引长度)) / count(*)的区分度来确定。</li></ul></li><li>区分度高(散列性高)的列适合作为索引</li><li>使用最频繁的列放到联合索引的左侧 <ul><li>这样也可以较少的建立一些索引。同时，由于&quot;最左前缀原则&quot;，可以增加联合索引的使用率。</li></ul></li><li>在多个字段都要创建索引的情况下，联合索引优于单值索引</li></ol><h3 id="不适合加索引的情况" tabindex="-1">不适合加索引的情况 <a class="header-anchor" href="#不适合加索引的情况" aria-label="Permalink to &quot;不适合加索引的情况&quot;">​</a></h3><ol><li>在 WHERE 中使用不到的字段，不要设置索引</li><li>数据量小的表（少于1000行）最好不要使用索引</li><li>有大量重复数据的列上不要建立索引 <ul><li>举例：要在 100 万行数据中查找其中的 50 万行（比如性别为男的数据），一旦创建了索引，你需要先访问 50 万次索引，然后再访问 50 万次数据表，这样加起来的开销比不使用索引可能还要大。   当数据重复度大，比如 高于 10% 的时候，也不需要对这个字段使用索引。</li></ul></li><li>避免对经常更新的表创建过多的索引</li><li>不建议用无序的值作为索引 <ul><li>例如身份证、UUID(在索引比较时需要转为ASCII，并且插入时可能造成页分裂)、MD5、HASH、无序长字符串等。</li></ul></li><li>删除不再使用或者很少使用的索引</li><li>不要定义冗余或重复的索引</li></ol><h2 id="字符常量与字符串常量有什么区别" tabindex="-1">字符常量与字符串常量有什么区别 <a class="header-anchor" href="#字符常量与字符串常量有什么区别" aria-label="Permalink to &quot;字符常量与字符串常量有什么区别&quot;">​</a></h2><h3 id="_1-数据类型" tabindex="-1">1.数据类型 <a class="header-anchor" href="#_1-数据类型" aria-label="Permalink to &quot;1.数据类型&quot;">​</a></h3><ul><li>char(字符型)为基本数据类型；</li><li>string(字符串型)为引用数据类型；</li></ul><h3 id="_2-表示方式" tabindex="-1">2.表示方式 <a class="header-anchor" href="#_2-表示方式" aria-label="Permalink to &quot;2.表示方式&quot;">​</a></h3><ul><li>char(字符型)用单引号引起的单个字符；</li><li>string(字符串型)用双引号引起的0个或者多个字符；</li></ul><h3 id="_3-表达含义" tabindex="-1">3.表达含义 <a class="header-anchor" href="#_3-表达含义" aria-label="Permalink to &quot;3.表达含义&quot;">​</a></h3><ul><li>char(字符型)表示一个整形的值(ASCII值)，可以进行表达式运算，可以与整形数据类型进行转换；</li><li>string(字符串型)表示的是一个内存地址的值，即该字符串存放在内存中的位置；</li></ul><h3 id="_4-内存大小" tabindex="-1">4.内存大小 <a class="header-anchor" href="#_4-内存大小" aria-label="Permalink to &quot;4.内存大小&quot;">​</a></h3><ul><li>char(字符型)占用两个字节；</li><li>string(字符串型)占用若干个字节；</li></ul>',34);function S(s,b,v,_,I,f){const c=l("Badge"),r=i,y=l("ClientOnly");return p(),D("div",null,[t("h1",m,[o("Java面试题 "),e(c,{text:"持续更新",type:"warning"}),o(),g]),e(y,null,{default:C(()=>{var n,a;return[(((n=s.$frontmatter)==null?void 0:n.aside)??!0)&&(((a=s.$frontmatter)==null?void 0:a.showArticleMetadata)??!0)?(p(),u(r,{key:0,article:s.$frontmatter},null,8,["article"])):E("",!0)]}),_:1}),q])}const x=A(d,[["render",S]]);export{P as __pageData,x as default};
