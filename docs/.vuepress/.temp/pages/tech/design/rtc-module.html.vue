<template><div><h2 id="_1-点对点通信" tabindex="-1"><a class="header-anchor" href="#_1-点对点通信" aria-hidden="true">#</a> 1. 点对点通信</h2>
<p>对每组通信，channel命名为A:B，代表B向A发送消息。A通过订阅pattern &quot;A:*&quot;来监听所有发给A的消息，B通过channel &quot;A:B&quot;来发送一条消息。</p>
<div class="language-jsno ext-jsno line-numbers-mode"><pre v-pre class="language-jsno"><code>{'type': 'psubscribe', 'pattern': None, 'channel': 'A:*', 'data': 1}
{'type': 'pmessage', 'pattern': 'A:*', 'channel': 'A:B', 'data': 'hello'}
{'type': 'pmessage', 'pattern': 'A:*', 'channel': 'A:M', 'data': 'hello'}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


