---
title: 字符串全匹配的最佳实践
date: 2022-12-14 13:50:20
tag:
    - string
category:
    - best practice
---

## 1. 多个字符串的匹配

在业务逻辑中，不乏包含这类逻辑：判断标志位flag是否为`"ONE"`或`"TWO"`或`"THREE"`。

```java
if (flag.equals("ONE") || flag.equals("TWO") || flag.equals("THREE")) {
    /* 业务逻辑 */
}
```

事实上，我们可以使用Arrays.asList()方法来优化它，而不是使用stream api：

```java
if (Arrays.asList("ONE", "TWO", "THREE").contains(flag)) {
    /* 业务逻辑 */
}
```

## 2. 多个字符的匹配

这种业务逻辑更特殊：判断标志位flag是否为`'O'`或`'T'`或`"R"`。

```java
if ("OTR".conntains(flag)) {
    /* 业务逻辑 */
}
```

虽然这种方法很特殊，只能用在字符的匹配上，而不能用于字符串。但是越是使用范围小的方法，在恰当的时候使用，越是精巧。