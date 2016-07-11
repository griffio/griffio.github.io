---
layout: post
title: "More Kotlin (Array)"
category: programming
tags: kotlin
published: true
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

#### 2D array of String printing a table

<script src="https://gist.github.com/griffio/0394829a2ec8e1877c7eaa55dce7b6d4.js"></script>

#### Result
~~~

|00|01|02|03|04|05|06|07|08|09|
|10|11|12|13|14|15|16|17|18|19|
|20|21|22|23|24|25|26|27|28|29|
|30|31|32|33|34|35|36|37|38|39|
|40|41|42|43|44|45|46|47|48|49|

~~~

[Kotlin spec defines reified type parameters](https://github.com/JetBrains/kotlin/blob/master/spec-docs/reified-type-parameters.md)



