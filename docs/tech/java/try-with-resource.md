---
title: Try With Resource的优劣
date: 2023-03-07 23:33:10
tags:
  - java
---
Try with Resource是java7推出的一种语法糖，旨在更清晰简单地管理资源类的创建与关闭。

## 1. Try With Resource的最佳实践

在传统的资源类操作中，我们通常需要手动关闭资源。

```java
public class MyService {
  @Autowired
  private DataSource dataSource;
  public static void main(String[] args) {

  }
}
```
