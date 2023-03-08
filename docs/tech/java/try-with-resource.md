---
title: Try With Resource的优劣
date: 2023-03-07 23:33:10
tags:
  - java
---
Try with Resource是java7推出的一种语法糖，旨在更清晰简单地管理资源类的创建与关闭。

## 1. Try With Resource的最佳实践

在传统的资源类操作中，我们通常需要手动关闭资源。在如下代码中，我们有两个资源类（`Connection`&`PrepareStatement`）需要关闭，关闭逻辑被写在了finally代码块中。

```java
public class MyService {
  @Autowired
  private DataSource dataSource;
  public static void main(String[] args) {
    Connection connection = null;
    PrepareStatement ps = null;
    try {
      connection = dataSource.getConnection();
      ps = connection.createPrepareStatement();
      // do someting
    } catch (SQLExpection e) {
      // deal with exception
    } finally {
      if (ps != null && !ps.isClosed()) {
        try {
          ps.close();
        } catch (SQLExpection e) {
          // deal with exception
        }
      }
      if (connection != null && !connection.isClosed()) {
        try {
          connection.close();
        } catch (SQLExpection e) {
          // deal with exception
        }
      }
    }
  }
}
```

我们使用Try With Resource语法糖，可以达到完全相同的目的。只要资源类实现了`AutoCloseable`接口，并且被写在了紧跟在try后面的小括号内，就不需要手写finally代码块来关闭它。这是Java编译器在编译器实现的。

```java
public class MyService {
  @Autowired
  private DataSource dataSource;
  public static void main(String[] args) {

    try (Connection connection = dataSource.getConnection();
         PrepareStatement ps = connection.createPrepareStatement();) {
      // do someting
    } catch (SQLExpection e) {
      // deal with exception
    }
  }
}
```

## 2. 它的局限性

我们可能认为，只要在try后方的括号内声明了这个变量，我们就可以自动关闭该资源类了，实际上它还有三个局限性：

1. 我们必须在括号内对该资源进行初始化，且该资源默认被声明final类型（**即使在Java9中，我们不需要在括号中创建资源类了，但是资源类也需要为final或者逻辑上是final**）。这意味着，我们不可能先将资源类声明为null，然后再在try花括号的代码块中赋值这个资源类。然而有时这么做是必要的，比如，我需要对`Connection`对象进行一系列操作，然后才能构建`PrepareStatement`对象。这时，我们就需要使用两层嵌套的try，如下所示。如果资源类数量很多，那么嵌套层数会更深，代码反而变得复杂臃肿了（阶梯状的try）。
```java
try (Connection connection = dataSource.getConnection();) {
  // 对connection进行一系列操作
  try (PrepareStatement ps = connection.createPrepareStatement();) {
  // do someting
  } catch (SQLExpection e) {
    // deal with exception
  }
} catch (SQLExpection e) {
  // deal with exception
}
```

2. 难以定制化关闭资源时的异常的后续操作。例如，如果connection关闭失败，我想在控制台打印日志"连接关闭异常"；如果ps关闭失败，我想在控制台打印"数据库预处理语句关闭异常"。那么，我们使用Try With Resource语法时，依然需要将其写成上面嵌套try的形式。

3. 资源类必须实现AutoCloseable接口。可能有些坑人的第三方库中的资源类未实现该接口，我们只要避免使用这些第三方库即可，这倒不是大问题。