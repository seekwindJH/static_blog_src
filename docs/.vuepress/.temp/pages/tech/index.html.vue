<template><div><ul>
<li v-for="item in $page.frontmatter.actions"><a v-bind:href="item.link"><span>{{item.text}}</span></a></li>
</ul></div></template>


