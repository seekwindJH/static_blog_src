---
title: Stream API的使用场景——取代循环、简化结构
date: 2022-09-21 22:05:07
tag:
  - java
---
Stream API是Java 8引入的一种新的集合操作方式，是一种链式API，可以极大简化集合操作。 Stream API的详细教程参见[掘金文档](https://juejin.cn/post/6844903830254010381)。

<!-- more -->

## 1. 问题span

---

本人在公司写代码时，看到同事写的如下代码（内容已脱敏）。

```java
public boolean checkPhoneNumber(String phoneNumber) {
    if (phoneNumber == null) {
        throw new PhoneNumberException("ERR001", "电话号码为空！");
    }
    return phoneNumber.startsWith("134") 
        || phoneNumber.startsWith("135")
        || phoneNumber.startsWith("136")
        || phoneNumber.startsWith("137")
        || phoneNumber.startsWith("138")
        || phoneNumber.startsWith("139")
        || phoneNumber.startsWith("147")
        || phoneNumber.startsWith("148");
}
```

上述代码完成的事情非常简单，就是检查电话号码是不是以134（不含1349）、135、136、137、138、139、147或148开头。但是我们却足足要使用8个startWith方法，并将它们使用 `||`符号连接。这样的代码看起来十分简单粗暴，且极其占用篇幅，修改起来也是怕多一个空格少一个空格之类的。

## 2. 使用正则表达式，通配电话号码

使用正则表达式是一种可取的方法。

```java
public boolean checkPhoneNumber(String phoneNumber) {
    if (phoneNumber == null) {
        throw new PhoneNumberException("ERR001", "电话号码为空！");
    }
    String regexp = "^(134)|(135)|(136)|(137)|(138)|(139)|(147)|(148).*$";
    return phoneNumber.match(regexp);
}
```

但是使用正则表达式，就意味着代码风险不可控。且正则表达式的程序不够通俗易懂。

## 3. 使用Stream API

```java
public boolean checkPhoneNumber(String phoneNumber) {
    if (phoneNumber == null) {
        throw new PhoneNumberException("ERR001", "电话号码为空！");
    }
    return Stream.of("134","135","136","137","138","139","147","148")
            .anyMatch(phoneNumber::startsWith);  // 方法引用
}
```

这样，我们在保证了代码可读性与风险可控的前提下，又减小了程序的篇幅。
