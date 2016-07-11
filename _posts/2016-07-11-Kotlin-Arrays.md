---
layout: post
title: "Kotlin (Array)"
category: programming
tags: kotlin
published: false
summary: kotlin array
---

### [Kotlin Array](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-array/)

Before looking at Kotlin, as a [background](http://gafter.blogspot.com/2006/11/reified-generics-for-java.html), Java has always supported runtime type checking of Array elements (reified) but cannot support generic parameterized array types at compile time. 

*Produces "error: generic array creation"*

~~~ java

public class Arrays<T> {
  public T[][] create2d(int height, int width) {
      return new T[height][width];
  }
}

~~~

Unless you lean on reflection by providing a type class parameter to instantiate array of type "clazz: Class<T>", the difference with Kotlin is that we can use the generic type <T> directly.

In Kotlin Array<String> is still generated as a Java Platform Object[String] array.

Inlined functions support reified type parameters to avoid using reflection with class references.

Only type parameters of inlined functions can be reified.

#### 2d array of String

<script src="https://gist.github.com/griffio/0394829a2ec8e1877c7eaa55dce7b6d4.js"></script>

[Kotlin spec defines reified type parameters](https://github.com/JetBrains/kotlin/blob/master/spec-docs/reified-type-parameters.md)
