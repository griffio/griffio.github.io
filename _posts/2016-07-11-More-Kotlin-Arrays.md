---
layout: post
title: "More Kotlin (Array)"
category: programming
tags: kotlin
published: true
summary: kotlin array
---

### [Kotlin Array](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-array/)

Before looking at Kotlin, as a [background](http://gafter.blogspot.com/2006/11/reified-generics-for-java.html), Java has always supported runtime type checking of Array elements (reified) but cannot support generic parameterized array types at compile time. The desired Java snippet below produces "error: generic array creation" :

~~~ java

public class Arrays<T> {
  public T[][] create2d(int height, int width) {
      return new T[height][width];
  }
}

~~~

In Java, you must lean on reflection by providing a type class parameter to instantiate the array of type ```clazz: Class<T>```, the difference with Kotlin is that we can use the generic type <T> directly.

[Inline functions](https://kotlinlang.org/docs/reference/inline-functions.html) support reified type parameters to avoid using reflection with class references - the limitation is only type parameters of inlined functions can be reified -
**All other generic types are erased at runtime**.

Kotlin, for example, defining ```Array<Int>``` is still compiled down to a Java Platform ```Object[Integer]```, the array type is enforced by the Kotlin compiler as invariant. Where as, Java arrays are covariant allowing unsafe generic assignments like ```array of Object = array of Integer```. 

---

Kotlin currently doesn't support any array literal ```[]={1,2,3}``` initialisation and we must use explicit construction when building, for example, n-dimensional arrays. Below is a 2d array of int.

<script src="https://gist.github.com/griffio/ac6386d41298be68e8768ec2a3f7dc80.js"></script>

---

#### 2D array of String printing a table

The height and width are specified, then each row height and column width index is provided to the Array initialization lambda.

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



