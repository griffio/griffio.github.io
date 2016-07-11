---
layout: post
title: "Kotlin (Array)"
category: programming
tags: kotlin
published: false
summary: kotlin array
---

### [Kotlin Array](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-array/)

Java Array has runtime type checking to prevent

Produces "error: generic array creation"

~~~ java

public class Arrays<T> {
  public T[][] create2d(int height, int width) {
      return new T[height][width];
  }
}

~~~

In Kotlin Array<String> is still generated as Object[String]

inline functions support reified type parameters to avoid using reflection using class references

> This function has a reified type parameter and thus can only be inlined at compilation time, not called directly.

#### 2d array of String

<script src="https://gist.github.com/griffio/0394829a2ec8e1877c7eaa55dce7b6d4.js"></script>

