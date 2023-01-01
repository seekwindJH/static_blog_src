---
date: 2022-8-20 16:19:54
sidebar: false
home: true
heroText: 开发技术
tagline: 记录技术踩坑，分享开发经验
actions:
  - text: Java
    link: /tech/java/generic-erasure-and-generic-array
    type: secondary
---
<ul>
<li v-for="item in $page.frontmatter.actions"><a v-bind:href="item.link"><span>{{item.text}}</span></a></li>
</ul>