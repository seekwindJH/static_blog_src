---
title: 泛型擦除与泛型数组
date: 2022-06-22 16:31:07
---
# 泛型擦除与泛型数组

什么是泛型擦除？为什么不能有泛型数组？

<!-- more -->

## 1. 泛型擦除

在许多编程语言中，都有泛型的概念。例如在Java中，我们最常用的泛型是`ArrayList<T>`，它提供了类似`T[]`的功能。但实际上，两者有着本质的区别：

|类型|`ArrayList<T>`|T[]|
|---|---|---|
|继承性|`ArrayList<T>`并非`ArrayList<Object>`的子类，因此前者不能赋值给后者|`T[]`是`Object[]`的子类，因此前者能赋值给后者|
|运行时|在运行时，它被视为`ArrayList`，后面的模板类型`T`被擦除|在运行时，依然被视为`T[]`，保留类型`T`|

上面的表格可以概括为一句对仗的句子：“**数组类型在运行时强化，泛型类型在运行时擦除**”。用下面两段代码段可以加深对这句话的理解：

* 数组在运行时强化：
```java
Object[] objects = new int[1]; 
objects[0] = "hello"; // Runtime Error: ArrayStpreException
```
这段代码在编译期不会报错，但在运行时会产生一个`ArrayStoreException`，这就是所谓的“运行时加强”。事实上，现代编译期可以在编译期产生一个Waring，告知程序员，此处可能会发生`ArrayStoreException`。

* 泛型在运行时擦除：
```java
List<Object> objectArr = new ArrayList<Integer>(); // Compile Error 
objectArr.add("hello");
```
这段代码在运行时就会报错，而且是在第一行直接报错。编译器提示，`List<Object>`类型的引用不能存储`ArrayList<Integer>`类型的对象。即使`Integer`是`Object`的子类，但是`ArrayList<Integer>`并非`List<Object>`的子类。这就是泛型类型在编译期严格的类型模式。然而这种严格的类型模式仅仅在编译期被保留，在运行时尖括号中的类型信息就会被丢弃。这种特性被称为**泛型擦除**。

> 在阅读了上面这两端代码后，就能够理解数组与泛型的区别了。为什么要设计“泛型擦除”这种奇怪的特性呢？那是因为，泛型的概念在Java5中才被引入，在早于Java5的版本中，程序员只能使用`ArrayList`而不是`ArrayList<Integer>`。`ArrayList`在理论上是可以存储任何的`ArrayList<T>`对象的（当然，我们不建议这么做）。在新版本Java中使用泛型擦除，是为了提供万恶的“向下兼容”。例如，在老版本中，我们创建的`ArrayList`Java4引用，可以接收新版本提供的`ArrayList<Integer>`Java5对象。

> 数组类型在运行时强化，泛型类型在运行时擦除。

## 2. 泛型数组

了解了数组在运行时加强，泛型在运行时擦除这一特点后，我们无意中想到一个骚操作，用数组的继承特性破坏泛型的非继承性：
```java
List<String>[] stringLists = new ArrayList<>[1]; 
List<Integer> intList = List.of(12); // create an integer List
List Object[] objects = stringLists; 
objects[0] = intList; // Without ArrayStoreException
```
1. 创建一个泛型数组`List<String>[] stringLists`的对象，把它交给引用类型`Object[] objects`
2. 然后将另一个泛型`List<Integer>`赋值给`object[1]`

虽然看起来很不合理，明明是一个“应该存储`List<String>`对象”的泛型数组，却无意间存储了一个`List<Integer>`对象，但这段代码理论上却是可运行的。由于泛型信息会在运行时被擦除，无论是`List<String>`还是`List<Integer>`，在运行时都被降格为`List`对象。因此`List<String>[]`存储`List<Integer>`，在JVM看来，不过是平平无奇的`List[]`存储`List`，并不会触发运行时的`ArrayStoreException`。`ArrayStoreException`被隐藏起来了，这使得程序在类型不安全的状态下持续运行，`ClassCastException`终究会在未来的某一刻出现，那时可能为时已晚😫。

解决方案：为了安全起见，我们必须引入一种机制，避免`ArrayStoreException`被隐藏而留下后患。最简单的方法，就是不允许创建泛型数组😝。现在，你只要书写`List<String>[]`这种类型，编译器在编译期就会告诉你“**创建泛型数组是非法的**”。编译器就是这么得不信任程序员。为了替代泛型数组，我们可以使用嵌套的泛型。

```java
List<List<String>> stringLists = new ArrayList<>();
```
> 创建泛型数组是非法的
