import{_ as t}from"./chunks/ArticleMetadata.8b6b367a.js";import{_ as r,H as c,o,c as i,J as h,E as y,C as l,a as d,V as A,D as k,G as D}from"./chunks/framework.981adca9.js";const C="/charles-blog/assets/OptimisticLock.f0611625.png",u="/charles-blog/assets/PessimisticLock.fd395b69.png",b="/charles-blog/assets/SpinLock.6864f2e9.png",B="/charles-blog/assets/ReentrantLock.fb4a200f.png",m="/charles-blog/assets/ReadWriteLock.94c17971.png",L="/charles-blog/assets/FairLock.7679542d.png",f="/charles-blog/assets/UnFairLock.0b6be8e5.png",F="/charles-blog/assets/HeavyweightLock.4136df46.png",q="/charles-blog/assets/LightweightLock.9c6761eb.png",g="/charles-blog/assets/BiasedLock.743ce087.png",N=JSON.parse('{"title":"锁（Lock）","description":"","frontmatter":{"title":"锁（Lock）","author":"Charles Chu","date":"2023/09/02","isOriginal":true},"headers":[],"relativePath":"md/java/javaOther/Lock.md","filePath":"md/java/javaOther/Lock.md","lastUpdated":1693644602000}'),_={name:"md/java/javaOther/Lock.md"},E=l("h1",{id:"锁-lock",tabindex:"-1"},[d("锁（Lock） "),l("a",{class:"header-anchor",href:"#锁-lock","aria-label":'Permalink to "锁（Lock）"'},"​")],-1),v=A('<h2 id="乐观锁" tabindex="-1">乐观锁 <a class="header-anchor" href="#乐观锁" aria-label="Permalink to &quot;乐观锁&quot;">​</a></h2><p><img src="'+C+'" alt="OptimisticLock">   乐观锁是我们经常无意间用到的东西，是一种乐观思想，这种乐观思想就是认为：当前环境读数据的多，写数据的少，并发读多，并发写少。因此，在读数据的时候，并不会给当前线程加锁，在写数据的时候，会进行判断当前的值与期望值时候相同，如果相同则进行更新，更新期间进行加锁，保证原子性。</p><p>  这个理论应该很多人会比较熟悉，CAS理论，比较并替换，在数据库设计中经常采用version版本号来进行乐观锁的实现。</p><h2 id="悲观锁" tabindex="-1">悲观锁 <a class="header-anchor" href="#悲观锁" aria-label="Permalink to &quot;悲观锁&quot;">​</a></h2><p><img src="'+u+'" alt="PessimisticLock">   相比于乐观锁，悲观锁是一种非常悲观的思想，遇到事总是想到最坏的情况，认为写多读少，因此无论是读取数据还是写入数据，都会当作要修改其他里面的数据，通通上锁，指导这个线程释放锁后其他线程获取。</p><p>  在java里面悲观锁有两种实现：synchronized、ReentrantLock。</p><h2 id="自旋锁" tabindex="-1">自旋锁 <a class="header-anchor" href="#自旋锁" aria-label="Permalink to &quot;自旋锁&quot;">​</a></h2><p><img src="'+b+'" alt="SpinLock"></p><h3 id="原理" tabindex="-1">原理 <a class="header-anchor" href="#原理" aria-label="Permalink to &quot;原理&quot;">​</a></h3><p>  为了让线程进行等待，让线程不断执行一个空操作的循环，类似你去找一个朋友，朋友在家里干活让你等一下，你就在门口徘徊，不去干别的事，徘徊了N次之后发现还没来人，直接先去干别的事，等他打电话叫你。</p><h3 id="优点" tabindex="-1">优点 <a class="header-anchor" href="#优点" aria-label="Permalink to &quot;优点&quot;">​</a></h3><p>  主要是为了避免线程的挂起跟唤醒的开销，因为这部分的开销都需要在系统的内核态中完成，然后反馈到虚拟机，这样子的操作对虚拟机并发性能带来了巨大的压力。</p><h3 id="缺点" tabindex="-1">缺点 <a class="header-anchor" href="#缺点" aria-label="Permalink to &quot;缺点&quot;">​</a></h3><p>  既然是执行空操作，必然会占用处理器的时间，当占用的时间过长的时候，处理器的资源会被白白消耗掉，而且这部分消耗是一直在做没有任何意义的工作，性能上是非常浪费的。面对这种情况，等待的时间必须有一定的限度，如果自旋超过了限定的次数仍然没有成功获得锁，就应当使用传统的方式去挂起线程。</p><h3 id="默认值" tabindex="-1">默认值 <a class="header-anchor" href="#默认值" aria-label="Permalink to &quot;默认值&quot;">​</a></h3><p>  JVM默认值10次，配置参数为：-XX:PreBlockSpin</p><h2 id="递归锁-可重入锁" tabindex="-1">递归锁（可重入锁） <a class="header-anchor" href="#递归锁-可重入锁" aria-label="Permalink to &quot;递归锁（可重入锁）&quot;">​</a></h2><p><img src="'+B+'" alt="ReentrantLock"></p><h3 id="原理-1" tabindex="-1">原理 <a class="header-anchor" href="#原理-1" aria-label="Permalink to &quot;原理&quot;">​</a></h3><p>  任何线程获取了锁之后可以再次获取该锁而不会被阻塞，识别获取锁的线程是否为当前占据锁的线程，如果是则再次成功获取。获取锁后进行自增</p><h3 id="优点-1" tabindex="-1">优点 <a class="header-anchor" href="#优点-1" aria-label="Permalink to &quot;优点&quot;">​</a></h3><p>  可以避免死锁。</p><h3 id="实现" tabindex="-1">实现 <a class="header-anchor" href="#实现" aria-label="Permalink to &quot;实现&quot;">​</a></h3><p>  synchronized、ReentrantLock。</p><h2 id="读写锁" tabindex="-1">读写锁 <a class="header-anchor" href="#读写锁" aria-label="Permalink to &quot;读写锁&quot;">​</a></h2><p><img src="'+m+`" alt="ReadWriteLock">   读写锁是通过ReentrantReadWriteLock这个类来实现，在JAVA里面，为了提高性能而提供了这么个东西，读的地方用读锁，写的地方用写锁，读锁并不互斥，读写互斥，这部分直接由JVM进行控制。</p><p>在编码上，需要手动进行区分，下面的代码可以看到实现方式</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#768390;">// 创建一个读写锁</span></span>
<span class="line"><span style="color:#F47067;">private</span><span style="color:#ADBAC7;"> ReentrantReadWriteLock</span><span style="color:#F69D50;"> </span><span style="color:#ADBAC7;">rwLock</span><span style="color:#F69D50;"> </span><span style="color:#F47067;">=</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">new</span><span style="color:#ADBAC7;"> </span><span style="color:#DCBDFB;">ReentrantReadWriteLock</span><span style="color:#ADBAC7;">();</span></span>
<span class="line"><span style="color:#768390;">// 获取读锁</span></span>
<span class="line"><span style="color:#ADBAC7;">rwLock.</span><span style="color:#DCBDFB;">readLock</span><span style="color:#ADBAC7;">().</span><span style="color:#DCBDFB;">lock</span><span style="color:#ADBAC7;">();</span></span>
<span class="line"><span style="color:#768390;">// 释放读锁</span></span>
<span class="line"><span style="color:#ADBAC7;">rwLock.</span><span style="color:#DCBDFB;">readLock</span><span style="color:#ADBAC7;">().</span><span style="color:#DCBDFB;">unlock</span><span style="color:#ADBAC7;">();</span></span>
<span class="line"><span style="color:#768390;">// 创建一个写锁</span></span>
<span class="line"><span style="color:#ADBAC7;">rwLock.</span><span style="color:#DCBDFB;">writeLock</span><span style="color:#ADBAC7;">().</span><span style="color:#DCBDFB;">lock</span><span style="color:#ADBAC7;">();</span></span>
<span class="line"><span style="color:#768390;">// 写锁 释放</span></span>
<span class="line"><span style="color:#ADBAC7;">rwLock.</span><span style="color:#DCBDFB;">writeLock</span><span style="color:#ADBAC7;">().</span><span style="color:#DCBDFB;">unlock</span><span style="color:#ADBAC7;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 创建一个读写锁</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> ReentrantReadWriteLock rwLock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ReentrantReadWriteLock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#6A737D;">// 获取读锁</span></span>
<span class="line"><span style="color:#24292E;">rwLock.</span><span style="color:#6F42C1;">readLock</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">lock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#6A737D;">// 释放读锁</span></span>
<span class="line"><span style="color:#24292E;">rwLock.</span><span style="color:#6F42C1;">readLock</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">unlock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#6A737D;">// 创建一个写锁</span></span>
<span class="line"><span style="color:#24292E;">rwLock.</span><span style="color:#6F42C1;">writeLock</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">lock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#6A737D;">// 写锁 释放</span></span>
<span class="line"><span style="color:#24292E;">rwLock.</span><span style="color:#6F42C1;">writeLock</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">unlock</span><span style="color:#24292E;">();</span></span></code></pre></div><h2 id="公平锁" tabindex="-1">公平锁 <a class="header-anchor" href="#公平锁" aria-label="Permalink to &quot;公平锁&quot;">​</a></h2><p><img src="`+L+'" alt="FairLock">   公平锁是一种设计思想，多线程在进行数据请求的过程中，先去队列中申请锁，按照FIFO先进先出的原则拿到线程，然后占有锁。</p><h2 id="非公平锁" tabindex="-1">非公平锁 <a class="header-anchor" href="#非公平锁" aria-label="Permalink to &quot;非公平锁&quot;">​</a></h2><p><img src="'+f+`" alt="UnFairLock">   既然有公平锁，那就有非公平锁，也是一种设计思想。线程尝试获取锁，如果获取不到，这时候采用公平锁的方式进行，与此同时，多个线程获取锁的顺序有一定的随机性，并非按照先到先得的方式进行。</p><h3 id="优点-2" tabindex="-1">优点 <a class="header-anchor" href="#优点-2" aria-label="Permalink to &quot;优点&quot;">​</a></h3><p>  性能上高于公平锁</p><h3 id="缺点-1" tabindex="-1">缺点 <a class="header-anchor" href="#缺点-1" aria-label="Permalink to &quot;缺点&quot;">​</a></h3><p>  存在线程饥饿问题，存在某一个线程一直获取不到锁导致一直等待，“饿死了”</p><p>  在java里面，synchronized默认就是非公平锁，ReentrantLock可以通过构造函数来设置该锁是公平的还是非公平的，默认是非公平的。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark-dimmed vp-code-dark"><code><span class="line"><span style="color:#F47067;">private</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">final</span><span style="color:#ADBAC7;"> ReentrantLock</span><span style="color:#F69D50;">.</span><span style="color:#ADBAC7;">Sync</span><span style="color:#F69D50;"> </span><span style="color:#ADBAC7;">sync;</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">public</span><span style="color:#ADBAC7;"> </span><span style="color:#DCBDFB;">ReentrantLock</span><span style="color:#ADBAC7;">() {</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#6CB6FF;">this</span><span style="color:#ADBAC7;">.sync </span><span style="color:#F47067;">=</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">new</span><span style="color:#ADBAC7;"> ReentrantLock.</span><span style="color:#DCBDFB;">NonfairSync</span><span style="color:#ADBAC7;">();</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">public</span><span style="color:#ADBAC7;"> </span><span style="color:#DCBDFB;">ReentrantLock</span><span style="color:#ADBAC7;">(</span><span style="color:#F47067;">boolean</span><span style="color:#ADBAC7;"> fair) {</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F47067;">if</span><span style="color:#ADBAC7;">(fair){</span></span>
<span class="line"><span style="color:#ADBAC7;">            </span><span style="color:#6CB6FF;">this</span><span style="color:#ADBAC7;">.sync </span><span style="color:#F47067;">=</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">new</span><span style="color:#ADBAC7;"> ReentrantLock.</span><span style="color:#DCBDFB;">FairSync</span><span style="color:#ADBAC7;">();</span></span>
<span class="line"><span style="color:#ADBAC7;">        }</span><span style="color:#F47067;">else</span><span style="color:#ADBAC7;">{</span></span>
<span class="line"><span style="color:#ADBAC7;">            </span><span style="color:#6CB6FF;">this</span><span style="color:#ADBAC7;">.sync </span><span style="color:#F47067;">=</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">new</span><span style="color:#ADBAC7;"> ReentrantLock.</span><span style="color:#DCBDFB;">NonfairSync</span><span style="color:#ADBAC7;">();</span></span>
<span class="line"><span style="color:#ADBAC7;">        }</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"><span style="color:#ADBAC7;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ReentrantLock.Sync sync;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ReentrantLock</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.sync </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> ReentrantLock.</span><span style="color:#6F42C1;">NonfairSync</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ReentrantLock</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> fair) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(fair){</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.sync </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> ReentrantLock.</span><span style="color:#6F42C1;">FairSync</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span><span style="color:#D73A49;">else</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.sync </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> ReentrantLock.</span><span style="color:#6F42C1;">NonfairSync</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="共享锁" tabindex="-1">共享锁 <a class="header-anchor" href="#共享锁" aria-label="Permalink to &quot;共享锁&quot;">​</a></h2><p>  多个线程可以获取读锁，以共享的形式持有，本质上与乐观锁，读写锁一样，JAVA的共享锁也是ReentrantReadWriteLock</p><h2 id="独占锁" tabindex="-1">独占锁 <a class="header-anchor" href="#独占锁" aria-label="Permalink to &quot;独占锁&quot;">​</a></h2><p>  只有一个线程可以获取锁，与悲观锁，互斥锁一样，JAVA的独占锁有：synchronized，ReentrantLock</p><h2 id="重量级锁" tabindex="-1">重量级锁 <a class="header-anchor" href="#重量级锁" aria-label="Permalink to &quot;重量级锁&quot;">​</a></h2><p><img src="`+F+'" alt="HeavyweightLock">   重量级锁其实是一种称呼，synchronized就是一种重量级锁，它是通过内部一个叫做监视器锁来实现，而监视器锁本质上是依赖于系统的Mutex Lock（互斥锁）来实现，当加锁的时候需要用用户态切换为核心态，这样子的成本非常高，因此这种依赖于操作系统Mutex Lock的锁称为重量级锁。为了优化synchronized的性能，引入了轻量级锁，偏向锁。</p><h2 id="轻量级锁" tabindex="-1">轻量级锁 <a class="header-anchor" href="#轻量级锁" aria-label="Permalink to &quot;轻量级锁&quot;">​</a></h2><p><img src="'+q+'" alt="LightweightLock">   在JDK1.6的时候，为了优化重量级锁，引入了一种优化机制：轻量级锁。由于锁的获取默认采用重量级，互斥的开销很大，因此在没有竞争的时候采用CAS去操作以便消除同步使用的互斥锁。</p><h3 id="优点-3" tabindex="-1">优点 <a class="header-anchor" href="#优点-3" aria-label="Permalink to &quot;优点&quot;">​</a></h3><p>  在没有资源竞争的情况下，通过CAS操作避免了互斥锁的开销</p><h3 id="缺点-2" tabindex="-1">缺点 <a class="header-anchor" href="#缺点-2" aria-label="Permalink to &quot;缺点&quot;">​</a></h3><p>  如果存在竞争，此时会额外增加CAS的开销，此时导致轻量级锁比传统重量级锁更慢。</p><h2 id="偏向锁" tabindex="-1">偏向锁 <a class="header-anchor" href="#偏向锁" aria-label="Permalink to &quot;偏向锁&quot;">​</a></h2><p><img src="'+g+'" alt="BiasedLock">   除了轻量级锁，JDK1.6还加入了另外一种锁优化机制，偏向锁。偏向锁里面最重要的一个理解就是：偏心。这个锁会非常偏心对待第一个获得它的线程，如果在接下来的执行过程中，该锁一直没有被其他的线程获取，则持有偏向锁的线程将永远不需要再进行同步。</p><h3 id="优点-4" tabindex="-1">优点 <a class="header-anchor" href="#优点-4" aria-label="Permalink to &quot;优点&quot;">​</a></h3><p>  针对第一个线程，连CAS都不用做了，性能上强于轻量级锁</p><h3 id="缺点-3" tabindex="-1">缺点 <a class="header-anchor" href="#缺点-3" aria-label="Permalink to &quot;缺点&quot;">​</a></h3><p>  如果程序中的锁总是被不同线程访问，那这个偏向锁就是多余的，永远都有第一个。</p><h2 id="分段锁" tabindex="-1">分段锁 <a class="header-anchor" href="#分段锁" aria-label="Permalink to &quot;分段锁&quot;">​</a></h2><p>  在java里面最好的实现就是ConcurrentHashMap，它里面划分了非常多的HashMap，默认是16个，如果需要添加一个key-value，并不是将整个HashMap锁住，而是先进行hashcode计算从而得出这个key-value应该放在哪个HashMap里面，然后开始对该HashMap进行加锁，并完成put操作。在多线程中，想象一下同时进行的时候，是不是做到了真正意义上的同步进行。在这里为了方便里面，我用HashMap来代替Segment，其实两者是一样的东西，只不过Segment是继承了ReentrantLock来进行加锁，非常优秀的设计。</p><h2 id="互斥锁" tabindex="-1">互斥锁 <a class="header-anchor" href="#互斥锁" aria-label="Permalink to &quot;互斥锁&quot;">​</a></h2><p>  互斥锁用最简单的一句话来理解：某个资源只能被一个线程访问，读读，读写，写读，写写都是一样的。</p><h2 id="同步锁" tabindex="-1">同步锁 <a class="header-anchor" href="#同步锁" aria-label="Permalink to &quot;同步锁&quot;">​</a></h2><p>  与互斥锁一样，在同一个时间只允许一个线程访问一个资源，实现用synchronized</p><h2 id="死锁" tabindex="-1">死锁 <a class="header-anchor" href="#死锁" aria-label="Permalink to &quot;死锁&quot;">​</a></h2><p>  死锁并不是一种思想或者技术，而是一种状态，当线程A持有资源a，线程B持有资源b，线程A等着B释放b，线程B等着线程A释放a，进入了死循环，造成死锁。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>  JAVA里面主要有ReentrantLock ，synchronized，Lock三种，类别也是不一样</p><ul><li>synchronized：属于独占锁、悲观锁、可重入锁、非公平锁</li><li>ReentrantLock：继承了Lock类，可重入锁、悲观锁、独占锁、互斥锁、同步锁。</li><li>Lock：Java中的接口，可重入锁、悲观锁、独占锁、互斥锁、同步锁</li></ul>',67);function P(a,R,x,w,S,V){const e=t,p=c("ClientOnly");return o(),i("div",null,[E,h(p,null,{default:y(()=>{var s,n;return[(((s=a.$frontmatter)==null?void 0:s.aside)??!0)&&(((n=a.$frontmatter)==null?void 0:n.showArticleMetadata)??!0)?(o(),k(e,{key:0,article:a.$frontmatter},null,8,["article"])):D("",!0)]}),_:1}),v])}const J=r(_,[["render",P]]);export{N as __pageData,J as default};