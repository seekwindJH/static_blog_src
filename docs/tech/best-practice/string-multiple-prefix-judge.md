---
title: 字符串前缀判断的最佳实践
date: 2022-10-25 22:40:32
tag: 
    - string
    - algo
category:
    - best practice
---

经常面临一类问题，判断该字符串是否以某些字符串开头。例如，输入一个字符串str，判断该字符串是否以字符串数组`{"33123","33124","32123","32","53","33226"}`的任意一个字符串为前缀。在那些烂代码中，我们经常见到这样的实现：
```java
public boolean isMatch(String str) {
    return str.startsWith("33123") 
        || str.startsWith("33124") 
        || str.startsWith("32123") 
        || str.startsWith("32") 
        || str.startsWith("53") 
        || str.startsWith("33226");
}
```
这样的代码，虽然在后续的项目维护中，也算还行，但是一旦情况的数量变多以后，函数将变得非常臃肿。我们可能很容易想到用下面这种方法去减少重复代码量，但是程序效率依旧很低`O(str_num*str_length)`。

```java
public boolean isMatch(String str) {
    List<String> prefixes = Arrays.asList("33123", "33124", "32123", "32", "53", "33226");
    return prefixes.stream().anyMatch(str::startsWith); // java8: stream api
}
```

<!--more-->

## 1. 索引的思考

有一种称之为索引的东西，被广泛地用于**加快查找**。在MySQL中，有**B+Tree索引**和**Hash索引**。Hash索引无法用于优化**不定长前缀**的查找。而**B+Tree**虽然不能用于前缀查找，但是该题中，我们仅需构建一棵普通的前缀树。

## 2. 前缀树

将字符串的每一个字符视为节点，那么一个字符串就是一个链表。将这些字符串prefixes所对应的链表的相同前缀合并，那么就会得到一棵前缀树。从给定字符串str的第一个字符开始，从树的根节点开始查找，若能达到任意一个叶子节点，则prefixes中存在str的前缀。该工具类的实现方法如下程序段所示。

```java
import java.util.HashMap;
import java.util.Map;

public class PrefixTree {
    private final String[] prefixes;
    private final TreeNode root;

    public Tree(String[] prefixes) {
        this.prefixes = prefixes;
        this.root = new TreeNode(0);
        /* 在构造方法内建树 */
        buildTree(root);
    }
    /* 构建树方法，只会在树的构建过程被调用一次 */
    /* 时间复杂度O(str_num*str_length) */
    private void buildTree(final TreeNode root) {
        for (String str : prefixes) {
            TreeNode node = root;
            for (char ch : str.toCharArray()) {
                int value = ch - '0';
                if (node.map.containsKey(value)) {
                    node = node.map.get(value);
                } else {
                    TreeNode newNode = new TreeNode(value);
                    node.map.put(value, newNode);
                    node = newNode;
                }
            }
            node.map.put(10, TreeNode.LEAF_NODE);
        }
    }
    /* 前缀匹配方法，真正在前缀的匹配过程中，只会调用这一个方法 */
    /* 时间复杂度O(str_length) */
    public boolean isMatch(final String str) {
        TreeNode node = root;
        for (char ch : str.toCharArray()) {
            int value = ch - '0';
            if (node.map.containsKey(value)) {
                node = node.map.get(value);
            } else return node.map.containsKey(10);
        }
        return false;
    }

    /* TreeNode静态内部类 */
    private static class TreeNode {
        /* 存储节点的值 */
        final int value;
        /* 叶子节点常量 */
        static final TreeNode LEAF_NODE = new TreeNode(0);
        /* 存储子节点的Map */
        Map<Integer, TreeNode> map;
        TreeNode(int value) {
            this.value = value;
            map = new HashMap<>();
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof TreeNode)) return false;
            TreeNode treeNode = (TreeNode) o;
            return value == treeNode.value;
        }

        @Override
        public int hashCode() {
            return value;
        }
    }
}
```

在读完上述前缀树程序后，我们需要注意：buildTree方法只会在前缀树的初始化过程中被调用一次，在后续的前缀匹配过程中，我们仅仅需要调用isMatch方法，而isMatch方法的时间复杂度是`O(str_length)`。
```java
boolean match = new PrefixTree(new String[]{
                "33123", "33124", "32123", "32", "53", "33226"
        }).isMatch("331213");
```

在IoC框架中，我们一般将`PrefixTree`声明为一个单例Bean，在需要使用时就不需要反复构建相同的前缀树了。下面是其在Spring Boot中的使用例子。

```java
// PrefixTreeConfig.java
@Configuration
public class PrefixTreeConfig {
    @Bean
    public PrefixTree firstPrefixTree() {
        return new PrefixTree(new String[]{
                "33123", "33124", "32123", "32", "53", "33226"
        });
    }
}
```
```java
@Service
public class HelloService {
    private PrefixTree firstPrefixTree;
    
    @Autowired
    public HelloService(@Resource PrefixTree firstPrefixTree) {
        this.firstPrefixTree = firstPrefixTree;
    }

    public void myMethod() {
        if (firstPrefixTree.isMatch("3312345433")) {
            // do something
        }
    }

}
```

## 3. Benchmark

性能测试程序如下所示。

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Random random = new Random();
        int prefixesNum = 200; // 前缀字符串的数量
        int prefixLength = 20; // 前缀字符串的长度
        int inputNum = 1 << 15; // 输入字符串的数量
        int hitRate = 40; // 前缀命中率
        
        List<String> prefixesList = new ArrayList<>(prefixesNum);
        for (int i = 0 ; i < prefixesNum ; ++ i) {
            StringBuilder sb = new StringBuilder(prefixLength);
            for (int j = 0 ; j < prefixLength ; ++ j) {
                sb.append(random.nextInt(10));
            }
            prefixesList.add(sb.toString());
        }
        String[] prefixes = new String[prefixesNum];
        prefixesList.toArray(prefixes);

        PrefixTree prefixTree = new PrefixTree(prefixes);
        
        List<String> list = new ArrayList<>(inputNum);
        
        for (int i = 0 ; i < inputNum ; ++ i) {
            int size = random.nextInt(20);
            StringBuilder sb = new StringBuilder(size);
            if (random.nextInt(100) < hitRate) {
                sb.append(prefixes[random.nextInt(prefixes.length)]);
            }
            for (int j = sb.length() ; j < size ; ++ j) {
                sb.append(random.nextInt(10));
            }
            list.add(sb.toString());
        }
        System.gc();
        Thread.sleep(100);
        long t1 = System.currentTimeMillis();
        for (String str : list) {
            prefixTree.isMatch(str);
        }
        long t2 = System.currentTimeMillis();
        for (String str : list) {
            Arrays.stream(prefixes).anyMatch(str::startsWith);
        }
        long t3 = System.currentTimeMillis();
        double durationPrefixesTree = t2 - t1;
        double durationStream = t3 - t2;
        System.out.printf("Prefixes Tree Total Time = [%.2f]s, Average Time = [%.2f]ms%n", durationPrefixesTree / 1000, durationPrefixesTree / inputNum);
        System.out.printf("Stream Total Time = [%.2f]s, Average Time = [%.2f]ms%n", durationStream / 1000, durationStream / inputNum);
        System.out.printf("Prefixes can reduce [%.2f]%% of time.%n", (1 - (durationPrefixesTree / durationStream)) * 100);
    }
}
```

经过测试，在大多数场景下(前缀数量多、前缀长度长、输入字符串多、命中率低)，相较于使用Stream方式，都能节省`90%`以上的时间。