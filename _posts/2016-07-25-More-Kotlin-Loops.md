---
layout: post
title: "More Kotlin (Loops)"
category: programming
tags: kotlin
published: true
summary: kotlin loops
---

### [Kotlin for-loops](https://kotlinlang.org/docs/reference/control-flow.html#for-loops)

When encountering a new language the first point of interest is looking at the [looping](http://kotlinlang.org/docs/reference/control-flow.html#for-loops), repeating syntax. A common question is - Why doesn’t Kotlin support the traditional **for-loop** structure shown below?

``` java
for (int i=0; i<100; i++) {
  println(i)
}
```

The reason **for** is designed, instead, to be idiomatic or native with the Kotlin language as it works on extensible expressions that return an [iterator](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/-iterator/index.html) and implement next(), hasNext() methods.

Below, the expression "0..99" is an iterable [IntProgression](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.ranges/-int-progression/) :-

```  kotlin
for (i in 0..99) {
  println(i)
}
```

less often needed, a reverse progression can be applied with ```(0..99).reversed()``` or

``` kotlin
for (i in 99 downTo 0) {
  println(i)
}
```

skipping a progression is supported with the step parameter

``` kotlin
for (i in 99 downTo 0 step 10) {
  println(i)
}
```

using the progression Iterable for filtering each element 

``` kotlin
for (i in (1..99).filter { it > 50 }) {
  println(i)
}
```
---

Library support

To express a range that excludes the end value, use the [until](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.ranges/until.html
) infix method :

``` kotlin
for (i in 0 until 100) {
  // 0..99
  println(i)
}
```

The Kotlin core library [repeat](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/repeat.html) function implementation is a **for** wrapper that provides a zero-based iteration index:

``` kotlin 

public inline fun repeat(times: Int, action: (Int) -> Unit) {
  for (index in 0..times - 1) {
    action(index)
  }
}
```

``` kotlin
repeat(times = 5) {
  // implicit "it" is 0..4
  println(it)
}
```
---
When you need the value and index:-

[with-index](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/with-index.html) on collections allocates an iterator object [indexed-value](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/-indexed-value/index.html) containing index and value: 

``` kotlin
for ((index,value) in ('a'..'z').withIndex()) {
  // index is 0..25 value is 'a..z'
  println("$index $value")
}
```
[for-each-indexed](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/for-each-indexed.html) on collections provides the index and value without allocating an intermediate IndexValue class:
```kotlin
 ('a'..'z').forEachIndexed { index, value -> println("$index $value") }
```
---

As the [documentation](https://kotlinlang.org/docs/reference/control-flow.html#for-loops) specifies that **for** operates over anything that provides an iterator.

If we want to make classes iterable without using inheritance, we can make it work with the **for** idiom by providing our own iterator operator implementation.

In the example below, let's make the sides of the Shape object iterable and also support the forEach extension method :-

``` kotlin

class Shape(val sides: Int) {

  public operator fun iterator() = (1..sides).iterator() 

  public inline fun forEach(action: (Int) -> Unit): Unit {
    for (element in this) action(element)
  }
}

fun main(args: Array<String>) {

  val shape = Shape(sides = 6)

  for (side in shape) {
    println("This is side $side")
  }

  shape.forEach { println("This is side $it") }
}

```

The same extensions are implemented to make Kotlin [Array](https://github.com/JetBrains/kotlin/blob/1.0.3/core/builtins/native/kotlin/Array.kt#L59) iterable.
