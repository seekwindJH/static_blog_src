---
title: docker
date: 2023-01-16 20:12:17
---
```bash
docker run -itd --name mysql-ruoyi -p 13306:3306 -e MYSQL_ROOT_PASSWORD=ceirtl312*_31e mysql:5.7.40
docker run -d --name redis-ruoyi -p 16379:6379 redis
docker run -it --rm --name rabbitmq-test -p 15673:5672 -p 15672:15672 rabbitmq:3.11-management
docker run -d --name redis-test2 -p 16380:6379 redis
```
