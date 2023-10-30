---
title: 关于我
author: Charles Chu
date: 2023/06/22
isOriginal: true
showArticleMetadata: false
aside: false
lastUpdated: false
---

<div class="wrap">
    <div class="introduce">
        <!-- 头像 -->
        <div class="avatar"><img src="/public/common/avatar.png" /></div>
        <div class="content">
            <pre>大家好，我是小朱，目前在招行就职。是一个热爱篮球，热爱运动的码农。</pre>
            <pre>这个博客主要记录我编程以来的知识点总结,也会分享工作中遇到的技术问题及解决方案。</pre>
            <pre>希望这里的文章都能给你带来收获，同时也欢迎你与我进行技术交流讨论。</pre>
            <pre>可以通过一下方式联系我：</pre>
            <ul>
                <li>QQ：601499934</li>
                <li>Email：601499934@qq.com</li>
            </ul>
        </div>
    </div>
</div>

<style lang="less">
    .wrap{
        width: 720px;
        margin: 72px auto 32px;
        
        @media(max-width: 720px){
            width: 100%;
        }
        .introduce{
            display: flex;
            width: 100%;
            .avatar{
                flex-shrink: 0;
                width: 100px;
                height: 100px;
                margin-right: 16px;
                border-radius: 50%;
                background-color: #e6e6e6;
            }
            .content{
                flex: 1;
                white-space: break-spaces;
            }
        } 
    }
</style>
