---
layout: post
title: "More Kotlin (Zip)"
category: programming
tags: kotlin
published: true
summary: more kotlin examples
---

### [Kotlin stdlib Zip](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/zip.html)

[Zipping](https://en.wikipedia.org/wiki/Convolution_(computer_science)) interleaves two sequences until the shortest sequence completes.

Below are the definitions from the Kotlin standard library :-

~~~ scala

  infix fun <R> IntArray.zip(other: Array<out R>): List<Pair<Int, R>>

  inline fun <V> IntArray.zip(other: IntArray, transform: (Int, Int) -> V): List<V>
~~~

---

Examples from : [https://msdn.microsoft.com/library/dd267698](https://msdn.microsoft.com/library/dd267698(v=vs.100).aspx)

#### numbers zip words : 1 one 2 two 3 three

<script src="https://gist.github.com/griffio/ec0b521baeb7d61d65c7.js"></script>

#### numbers1.zip.numbers2(n1 > n2) : 5 2 3 4

<script src="https://gist.github.com/griffio/6ef484e9e74e84604b3a.js"></script>

#### quarterlySales.zip(quarterlySales * quarterlyRate).sum : 3276.77

<script src="https://gist.github.com/griffio/95118d3fcc849be9dea4.js"></script>

#### [tomasp.net/blog/idioms-in-linq](http://tomasp.net/blog/idioms-in-linq.aspx/)

Average unit price over 3 days : 10.33, 2.67, 13.33, 23.00

<script src="https://gist.github.com/griffio/9dd9458b015a341344b3.js"></script>

#### Further LINQ References :-

[kotlin-linq-examples](https://github.com/mythz/kotlin-linq-examples)
