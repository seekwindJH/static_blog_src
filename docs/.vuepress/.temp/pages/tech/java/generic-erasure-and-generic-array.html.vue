<template><div><h1 id="泛型擦除与泛型数组" tabindex="-1"><a class="header-anchor" href="#泛型擦除与泛型数组" aria-hidden="true">#</a> 泛型擦除与泛型数组</h1>
<p>什么是泛型擦除？为什么不能有泛型数组？</p>
<!-- more -->
<h2 id="_1-泛型擦除" tabindex="-1"><a class="header-anchor" href="#_1-泛型擦除" aria-hidden="true">#</a> 1. 泛型擦除</h2>
<p>在许多编程语言中，都有泛型的概念。例如在Java中，我们最常用的泛型是<code v-pre>ArrayList&lt;T&gt;</code>，它提供了类似<code v-pre>T[]</code>的功能。但实际上，两者有着本质的区别：</p>
<table>
<thead>
<tr>
<th>类型</th>
<th><code v-pre>ArrayList&lt;T&gt;</code></th>
<th>T[]</th>
</tr>
</thead>
<tbody>
<tr>
<td>继承性</td>
<td><code v-pre>ArrayList&lt;T&gt;</code>并非<code v-pre>ArrayList&lt;Object&gt;</code>的子类，因此前者不能赋值给后者</td>
<td><code v-pre>T[]</code>是<code v-pre>Object[]</code>的子类，因此前者能赋值给后者</td>
</tr>
<tr>
<td>运行时</td>
<td>在运行时，它被视为<code v-pre>ArrayList</code>，后面的模板类型<code v-pre>T</code>被擦除</td>
<td>在运行时，依然被视为<code v-pre>T[]</code>，保留类型<code v-pre>T</code></td>
</tr>
</tbody>
</table>
<p>上面的表格可以概括为一句对仗的句子：“<strong>数组类型在运行时强化，泛型类型在运行时擦除</strong>”。用下面两段代码段可以加深对这句话的理解：</p>
<ul>
<li>数组在运行时强化：</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> objects <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span> 
objects<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"hello"</span><span class="token punctuation">;</span> <span class="token comment">// Runtime Error: ArrayStpreException</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码在编译期不会报错，但在运行时会产生一个<code v-pre>ArrayStoreException</code>，这就是所谓的“运行时加强”。事实上，现代编译期可以在编译期产生一个Waring，告知程序员，此处可能会发生<code v-pre>ArrayStoreException</code>。</p>
<ul>
<li>泛型在运行时擦除：</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> objectArr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Compile Error </span>
objectArr<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码在运行时就会报错，而且是在第一行直接报错。编译器提示，<code v-pre>List&lt;Object&gt;</code>类型的引用不能存储<code v-pre>ArrayList&lt;Integer&gt;</code>类型的对象。即使<code v-pre>Integer</code>是<code v-pre>Object</code>的子类，但是<code v-pre>ArrayList&lt;Integer&gt;</code>并非<code v-pre>List&lt;Object&gt;</code>的子类。这就是泛型类型在编译期严格的类型模式。然而这种严格的类型模式仅仅在编译期被保留，在运行时尖括号中的类型信息就会被丢弃。这种特性被称为<strong>泛型擦除</strong>。</p>
<blockquote>
<p>在阅读了上面这两端代码后，就能够理解数组与泛型的区别了。为什么要设计“泛型擦除”这种奇怪的特性呢？那是因为，泛型的概念在Java5中才被引入，在早于Java5的版本中，程序员只能使用<code v-pre>ArrayList</code>而不是<code v-pre>ArrayList&lt;Integer&gt;</code>。<code v-pre>ArrayList</code>在理论上是可以存储任何的<code v-pre>ArrayList&lt;T&gt;</code>对象的（当然，我们不建议这么做）。在新版本Java中使用泛型擦除，是为了提供万恶的“向下兼容”。例如，在老版本中，我们创建的<code v-pre>ArrayList</code>Java4引用，可以接收新版本提供的<code v-pre>ArrayList&lt;Integer&gt;</code>Java5对象。</p>
</blockquote>
<blockquote>
<p>数组类型在运行时强化，泛型类型在运行时擦除。</p>
</blockquote>
<h2 id="_2-泛型数组" tabindex="-1"><a class="header-anchor" href="#_2-泛型数组" aria-hidden="true">#</a> 2. 泛型数组</h2>
<p>了解了数组在运行时加强，泛型在运行时擦除这一特点后，我们无意中想到一个骚操作，用数组的继承特性破坏泛型的非继承性：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> stringLists <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span> 
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> intList <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// create an integer List</span>
<span class="token class-name">List</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> objects <span class="token operator">=</span> stringLists<span class="token punctuation">;</span> 
objects<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> intList<span class="token punctuation">;</span> <span class="token comment">// Without ArrayStoreException</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>创建一个泛型数组<code v-pre>List&lt;String&gt;[] stringLists</code>的对象，把它交给引用类型<code v-pre>Object[] objects</code></li>
<li>然后将另一个泛型<code v-pre>List&lt;Integer&gt;</code>赋值给<code v-pre>object[1]</code></li>
</ol>
<p>虽然看起来很不合理，明明是一个“应该存储<code v-pre>List&lt;String&gt;</code>对象”的泛型数组，却无意间存储了一个<code v-pre>List&lt;Integer&gt;</code>对象，但这段代码理论上却是可运行的。由于泛型信息会在运行时被擦除，无论是<code v-pre>List&lt;String&gt;</code>还是<code v-pre>List&lt;Integer&gt;</code>，在运行时都被降格为<code v-pre>List</code>对象。因此<code v-pre>List&lt;String&gt;[]</code>存储<code v-pre>List&lt;Integer&gt;</code>，在JVM看来，不过是平平无奇的<code v-pre>List[]</code>存储<code v-pre>List</code>，并不会触发运行时的<code v-pre>ArrayStoreException</code>。<code v-pre>ArrayStoreException</code>被隐藏起来了，这使得程序在类型不安全的状态下持续运行，<code v-pre>ClassCastException</code>终究会在未来的某一刻出现，那时可能为时已晚😫。</p>
<p>解决方案：为了安全起见，我们必须引入一种机制，避免<code v-pre>ArrayStoreException</code>被隐藏而留下后患。最简单的方法，就是不允许创建泛型数组😝。现在，你只要书写<code v-pre>List&lt;String&gt;[]</code>这种类型，编译器在编译期就会告诉你“<strong>创建泛型数组是非法的</strong>”。编译器就是这么得不信任程序员。为了替代泛型数组，我们可以使用嵌套的泛型。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span><span class="token punctuation">></span></span> stringLists <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>创建泛型数组是非法的</p>
</blockquote>
</div></template>


