<template><div><p>当使用Apache服务器时，需要进行繁琐的XML配置。Nginx一定程度上解决了配置文件繁琐冗长的问题，但是Nginx需要依赖于其他软件。</p>
<!--more-->
<p>Web服务器，即提供网上信息服务的一类服务器。常见的信息服务如<strong>网页HTTP服务</strong>、<strong>文件FTP服务</strong>、<strong>邮件SMTP服务</strong>等。市场占有率较高的Web服务器是Apache服务器和Nginx服务器，还有常见于Windows NT的IIS服务器。目前Nginx正在以非常快的速度赶超Apache服务器。</p>
<hr>
<p>Caddy是一种十分容易上手的轻量级服务器。它使用Golang开发，因此打包后的二进制可执行文件不依赖于其他软件或函数库。若要获取更加官方的说明，请查阅<a href="https://caddyserver.com/docs/" target="_blank" rel="noopener noreferrer">Caddy官方文档<ExternalLinkIcon/></a>。</p>
<h2 id="_1-caddyfile" tabindex="-1"><a class="header-anchor" href="#_1-caddyfile" aria-hidden="true">#</a> 1. Caddyfile</h2>
<p>一个简单的监听PHP-fpm端口的Caddy服务器配置文件<code v-pre>Caddyfile</code>如下:</p>
<div class="language-conf ext-conf line-numbers-mode"><pre v-pre class="language-conf"><code>:443 {
    root * /var/www/php/ # 设置网站根目录
    encode gzip # 将Response压缩，节约带宽
    tls /root/ssl/seekwind.xyz.crt /root/ssl/seekwind.xyz.key # 公私钥
    log {
        output file /var/logs/php-fpm.log # 输出日志到文件output.log
    }
    php_fastcgi 127.0.0.1:9000 # 监听php-fpm端口
    file_server # 接收静态文件请求，可跟参数代表静态文件路径
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种类型的Caddy配置文件被称为&quot;Caddyfile&quot;。Caddyfile文件使用起来非常简单，一共有以下两种人性化的方式：</p>
<ol>
<li>直接通过<code v-pre>caddy run</code>或<code v-pre>caddy start</code>启动服务，则会默认使用<code v-pre>pwd</code>目录下名为<code v-pre>Caddyfile</code>的配置文件。</li>
<li>如果想指定配置文件的路径及名称，则通过<code v-pre>caddy run --config /path/to/file</code>启动服务。</li>
</ol>
<h2 id="_2-json格式的配置文件" tabindex="-1"><a class="header-anchor" href="#_2-json格式的配置文件" aria-hidden="true">#</a> 2. Json格式的配置文件</h2>
<p>在底层，Caddy并不会直接使用Caddyfile，而是将Caddyfile通过Adapter适配器转化成Json格式的配置文件，再读取Json配置文件。因此，Json格式的配置文件被称为<strong>Caddy Native配置文件</strong>。</p>
<p>Json格式的配置文件书写复杂，且一般通过Caddy服务器的<code v-pre>2019</code>端口的管理员WebAPI进行运行时写入，很少通过启动命令的adapter选项直接指定Json配置文件。但是由于Json配置文件是更加底层的配置文件，能够实现比Caddyfile更加强大、精确的功能，因此在有必要时，我们必须使用Json配置文件。</p>
<blockquote>
<p>Combo Caddyfile+CLI或者Json+WebAPI是常见的方式。</p>
</blockquote>
<h2 id="_3-rewrites、try-files、uri指令" tabindex="-1"><a class="header-anchor" href="#_3-rewrites、try-files、uri指令" aria-hidden="true">#</a> 3. rewrites、try_files、uri指令</h2>
<p>这三个指令都是将<strong>客户端发来的请求URI</strong>转化成另一个<strong>真正的URI</strong>。</p>
<ol>
<li><code v-pre>rewrite</code>:
<strong>描述</strong>：将原始的URI转化成目标的URI，像是一种服务器内部的重定向。<a href="https://caddyserver.com/docs/caddyfile/directives/rewrite#rewrite" target="_blank" rel="noopener noreferrer">rewrite官方说明<ExternalLinkIcon/></a>
<strong>用法</strong>：</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>rewrite * /index.php?<span class="token punctuation">{</span>query<span class="token punctuation">}</span><span class="token operator">&amp;</span><span class="token assign-left variable">p</span><span class="token operator">=</span><span class="token punctuation">{</span>path<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li><code v-pre>try_files</code>:
<strong>描述</strong>：像是rewrite的加强版，接收到请求时，依次访问try_files后面的URI，直至有一个访问成功。<a href="https://caddyserver.com/docs/caddyfile/directives/try_files#try-files" target="_blank" rel="noopener noreferrer">try_files官方说明<ExternalLinkIcon/></a>
<strong>用法</strong>：</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>try_files <span class="token punctuation">{</span>path<span class="token punctuation">}</span> <span class="token punctuation">{</span>path<span class="token punctuation">}</span>/ /index.php?<span class="token punctuation">{</span>query<span class="token punctuation">}</span><span class="token operator">&amp;</span><span class="token assign-left variable">p</span><span class="token operator">=</span><span class="token punctuation">{</span>path<span class="token punctuation">}</span> <span class="token operator">=</span><span class="token number">404</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li><code v-pre>uri</code>:
<strong>描述</strong>：像是rewrite的简化版，不对原始uri做大改动，只做微小修改，例如修改前缀、修改后缀。<a href="https://caddyserver.com/docs/caddyfile/directives/uri#uri" target="_blank" rel="noopener noreferrer">uri官方说明<ExternalLinkIcon/></a>
<strong>用法</strong>：</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>uri strip_prefix /api
uri strip_suffix .php
uri replace /docs/ /v1/docs/
uri path_regexp /<span class="token punctuation">{</span><span class="token number">2</span>,<span class="token punctuation">}</span> /
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


