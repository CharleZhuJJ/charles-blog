import{_ as h}from"./chunks/ArticleMetadata.8b6b367a.js";import{_ as P,H as t,o as i,c as I,C as n,a as r,J as o,E as p,V as u,D as _,G as m}from"./chunks/framework.981adca9.js";const x="/charles-blog/assets/IpType.a4d84979.png",f="/charles-blog/assets/Mask.4daa1869.png",b="/charles-blog/assets/IpAndMaskCal.2c584c95.png",N=JSON.parse('{"title":"IP","description":"","frontmatter":{"title":"IP","author":"Charles Chu","date":"2022/09/30","isOriginal":true},"headers":[],"relativePath":"md/network/Ip.md","filePath":"md/network/Ip.md","lastUpdated":1691825438000}'),k={name:"md/network/Ip.md"},A={id:"ip",tabindex:"-1"},g=n("a",{class:"header-anchor",href:"#ip","aria-label":'Permalink to "IP <Badge text="持续更新" type="warning" />"'},"​",-1),q=u('<ul><li>IP地址是以网络号和主机号来标示网络上的主机的，我们把网络号相同的主机称之为本地网络，网络号不相同的主机称之为远程网络主机</li><li>本地网络中的主机可以直接相互通信；远程网络中的主机要相互通信必须通过本地网关（Gateway）来传递转发数据。</li><li>IP地址对应于OSI参考模型的第三层网络层，工作在网络层的路由器根据目标IP和源IP来判断是否属于同一网段，如果是不同网段，则转发数据包。</li><li>常见的IP地址分为IPv4与IPv6两大类，当前广泛应用的是IPv4，目前IPv4几乎耗尽，下一阶段必然会进行版本升级到IPv6；</li></ul><h2 id="ip地址格式和表示" tabindex="-1">IP地址格式和表示 <a class="header-anchor" href="#ip地址格式和表示" aria-label="Permalink to &quot;IP地址格式和表示&quot;">​</a></h2><ul><li>IP地址(IPv4)由32位二进制数组成，分为4段（4个字节），每一段为8位二进制数（1个字节），中间使用英文的标点符号.隔开</li><li>由于二进制数太长，为了便于记忆和识别，把每一段8位二进制数转成十进制，大小为0至255。IP地址的这种表示法叫做「点分十进制表示法」。</li><li>IP地址表示为：xxx.xxx.xxx.xxx</li><li>计算机的IP地址由两部分组成，一部分为网络标识，一部分为主机标识，同一网段内的计算机网络部分相同，主机部分不能同时重复出现。</li><li>路由器连接不同网段，负责不同网段之间的数据转发，交换机连接的是同一网段的计算机。</li><li>通过设置网络地址和主机地址，在互相连接的整个网络中保证每台主机的IP地址不会互相重叠，即IP地址具有了唯一性。</li></ul><h2 id="ip地址分类详解" tabindex="-1">IP地址分类详解 <a class="header-anchor" href="#ip地址分类详解" aria-label="Permalink to &quot;IP地址分类详解&quot;">​</a></h2><p>  IP地址分A、B、C、D、E五类，其中A、B、C这三类是比较常用的IP地址，D、E类为特殊地址。 <img src="'+x+'" alt="IpType"></p><h2 id="子网掩码" tabindex="-1">子网掩码 <a class="header-anchor" href="#子网掩码" aria-label="Permalink to &quot;子网掩码&quot;">​</a></h2><h3 id="子网掩码的概念及作用" tabindex="-1">子网掩码的概念及作用 <a class="header-anchor" href="#子网掩码的概念及作用" aria-label="Permalink to &quot;子网掩码的概念及作用&quot;">​</a></h3><ul><li>通过子网掩码，才能表明一台主机所在的子网与其他子网的关系，使网络正常工作。</li><li>子网掩码和IP地址做与运算，分离出IP地址中的网络地址和主机地址，用于判断该IP地址是在本地网络上，还是在远程网络网上。</li><li>子网掩码还用于将网络进一步划分为若干子网，以避免主机过多而拥堵或过少而IP浪费。</li></ul><h3 id="子网掩码的组成" tabindex="-1">子网掩码的组成 <a class="header-anchor" href="#子网掩码的组成" aria-label="Permalink to &quot;子网掩码的组成&quot;">​</a></h3><ul><li>同IP地址一样，子网掩码是由长度为32位二进制数组成的一个地址。</li><li>子网掩码32位与IP地址32位相对应，IP地址如果某位是网络地址，则子网掩码为1，否则为0。</li><li>左边连续的1的个数代表网络号的长度，（使用时必须是连续的，理论上也可以不连续），右边连续的0的个数代表主机号的长度。举个栗子：如：11111111.11111111.11111111.00000000</li></ul><h3 id="为什么要使用子网掩码" tabindex="-1">为什么要使用子网掩码 <a class="header-anchor" href="#为什么要使用子网掩码" aria-label="Permalink to &quot;为什么要使用子网掩码&quot;">​</a></h3><ul><li>两台主机要通信，首先要判断是否处于同一网段，即网络地址是否相同。</li><li>如果相同，那么可以把数据包直接发送到目标主机，否则就需要路由网关将数据包转发送到目的地。</li><li>例子：A主机要与B主机通信，A和B各自的IP地址与A主机的子网掩码进行And与运算，看得出的结果： <ul><li>1、结果如果相同，则说明这两台主机是处于同一个网段，这样A可以通过ARP广播发现B的MAC地址，B也可以发现A的MAC地址来实现正常通信。</li><li>2、如果结果不同，ARP广播会在本地网关终结，这时候A会把发给B的数据包先发给本地网关，网关再根据B主机的IP地址来查询路由表，再将数据包继续传递转发，最终送达到目的地B。 <img src="'+f+'" alt="Mask"></li></ul></li></ul><h3 id="子网掩码和ip地址的关系" tabindex="-1">子网掩码和IP地址的关系 <a class="header-anchor" href="#子网掩码和ip地址的关系" aria-label="Permalink to &quot;子网掩码和IP地址的关系&quot;">​</a></h3><ul><li>子网掩码是用来判断任意两台主机的IP地址是否属于同一网络的依据</li><li>拿双方主机的IP地址和自己主机的子网掩码做与运算，如结果为同一网络，就可以直接通信</li></ul><h3 id="根据ip地址和子网掩码-计算网络地址" tabindex="-1">根据IP地址和子网掩码，计算网络地址 <a class="header-anchor" href="#根据ip地址和子网掩码-计算网络地址" aria-label="Permalink to &quot;根据IP地址和子网掩码，计算网络地址&quot;">​</a></h3><ul><li>将IP地址与子网掩码转换成二进制数。</li><li>将二进制形式的 IP 地址与子网掩码做与运算。</li><li>将得出的结果转化为十进制，便得到网络地址。 <img src="'+b+'" alt="IpAndMaskCal"></li></ul>',16);function B(a,C,v,T,w,y){const s=t("Badge"),c=h,d=t("ClientOnly");return i(),I("div",null,[n("h1",A,[r("IP "),o(s,{text:"持续更新",type:"warning"}),r(),g]),o(d,null,{default:p(()=>{var e,l;return[(((e=a.$frontmatter)==null?void 0:e.aside)??!0)&&(((l=a.$frontmatter)==null?void 0:l.showArticleMetadata)??!0)?(i(),_(c,{key:0,article:a.$frontmatter},null,8,["article"])):m("",!0)]}),_:1}),q])}const $=P(k,[["render",B]]);export{N as __pageData,$ as default};