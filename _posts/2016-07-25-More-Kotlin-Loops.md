---
layout: post
title: "More Kotlin (Loops)"
category: programming
tags: kotlin
published: true
summary: kotlin loops
---

### [Kotlin for-loops](https://kotlinlang.org/docs/reference/control-flow.html#for-loops)

Looping, repeating syntax - a common question is why Kotlin doesn’t support the traditional **for-loop** structure below:

``` java
for (int i=0; i<100; i++) {
  println(i)
}
```

Instead, **for** works on extensible expressions that return an iterator(), next() or hasNext() method:

```  kotlin
for (i in 0..99) {
	 println(i)
}
```
---

The Kotlin core library [repeat](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/repeat.html) function implementation is a **for** wrapper that provides a zero-based iteration index:

``` kotlin 

public inline fun repeat(times: Int, action: (Int) -> Unit) {
  for (index in 0..times - 1) {
    action(index)
  }
}
```

```
repeat(times) {
  println(it)
}
```
---

[with-index](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/with-index.html) on collections provides an iterator object containing index and value: 

``` kotlin
for ((index,value) in ('a'..'z').withIndex()) {
  // index is 0..25 value is 'a..z'
  println("$index $value")
}
```
