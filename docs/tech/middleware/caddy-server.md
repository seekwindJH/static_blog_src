---
title: Caddy 一款极简的Web服务器
date: 2022-06-21 17:38:25
---

当使用Apache服务器时，需要进行繁琐的XML配置。Nginx一定程度上解决了配置文件繁琐冗长的问题，但是Nginx需要依赖于其他软件。

<!--more-->


Web服务器，即提供网上信息服务的一类服务器。常见的信息服务如**网页HTTP服务**、**文件FTP服务**、**邮件SMTP服务**等。市场占有率较高的Web服务器是Apache服务器和Nginx服务器，还有常见于Windows NT的IIS服务器。目前Nginx正在以非常快的速度赶超Apache服务器。

---

Caddy是一种十分容易上手的轻量级服务器。它使用Golang开发，因此打包后的二进制可执行文件不依赖于其他软件或函数库。若要获取更加官方的说明，请查阅[Caddy官方文档](https://caddyserver.com/docs/)。

## 1. Caddyfile

一个简单的监听PHP-fpm端口的Caddy服务器配置文件`Caddyfile`如下:

```conf
:443 {
    root * /var/www/php/ # 设置网站根目录
    encode gzip # 将Response压缩，节约带宽
    tls /root/ssl/seekwind.xyz.crt /root/ssl/seekwind.xyz.key # 公私钥
    log {
        output file /var/logs/php-fpm.log # 输出日志到文件output.log
    }
    php_fastcgi 127.0.0.1:9000 # 监听php-fpm端口
    file_server # 接收静态文件请求，可跟参数代表静态文件路径
}
```

这种类型的Caddy配置文件被称为"Caddyfile"。Caddyfile文件使用起来非常简单，一共有以下两种人性化的方式：
1. 直接通过`caddy run`或`caddy start`启动服务，则会默认使用`pwd`目录下名为`Caddyfile`的配置文件。
2. 如果想指定配置文件的路径及名称，则通过`caddy run --config /path/to/file`启动服务。

## 2. Json格式的配置文件

在底层，Caddy并不会直接使用Caddyfile，而是将Caddyfile通过Adapter适配器转化成Json格式的配置文件，再读取Json配置文件。因此，Json格式的配置文件被称为**Caddy Native配置文件**。

Json格式的配置文件书写复杂，且一般通过Caddy服务器的`2019`端口的管理员WebAPI进行运行时写入，很少通过启动命令的adapter选项直接指定Json配置文件。但是由于Json配置文件是更加底层的配置文件，能够实现比Caddyfile更加强大、精确的功能，因此在有必要时，我们必须使用Json配置文件。

> Combo Caddyfile+CLI或者Json+WebAPI是常见的方式。


## 3. rewrites、try_files、uri指令

这三个指令都是将**客户端发来的请求URI**转化成另一个**真正的URI**。

1. `rewrite`: 
    **描述**：将原始的URI转化成目标的URI，像是一种服务器内部的重定向。[rewrite官方说明](https://caddyserver.com/docs/caddyfile/directives/rewrite#rewrite)
    **用法**：
  ```shell
  rewrite * /index.php?{query}&p={path}
  ```

2. `try_files`:
    **描述**：像是rewrite的加强版，接收到请求时，依次访问try_files后面的URI，直至有一个访问成功。[try_files官方说明](https://caddyserver.com/docs/caddyfile/directives/try_files#try-files)
    **用法**：
  ```shell
  try_files {path} {path}/ /index.php?{query}&p={path} =404
  ```

3. `uri`:
    **描述**：像是rewrite的简化版，不对原始uri做大改动，只做微小修改，例如修改前缀、修改后缀。[uri官方说明](https://caddyserver.com/docs/caddyfile/directives/uri#uri)
    **用法**：
  ```shell
  uri strip_prefix /api
  uri strip_suffix .php
  uri replace /docs/ /v1/docs/
  uri path_regexp /{2,} /
  ```