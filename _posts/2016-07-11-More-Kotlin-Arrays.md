---
layout: post
title: "More Kotlin (Array)"
category: programming
tags: kotlin
published: true
summary: kotlin array
runcode: true
---

### [Kotlin Array](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-array/)

Before looking at Kotlin, as a [background](http://gafter.blogspot.com/2006/11/reified-generics-for-java.html), Java has always supported *runtime* type checking of Array elements (reified) but it cannot support generic parameterized array types at *compile time*. The desired Java snippet below produces "error: generic array creation" :

~~~ java

public class Arrays<T> {
  public T[][] create2d(int height, int width) {
      return new T[height][width];
  }
}

~~~

In Java, you must lean on reflection by providing a type class parameter to instantiate the array of type ```clazz: Class<T>```, the difference with Kotlin is that we **can** use the generic type as a ```<reified T>``` directly.

[Inline functions](https://kotlinlang.org/docs/reference/inline-functions.html) support reified type parameters to avoid using reflection with class references - the limitation is only type parameters of inlined functions can be reified -
**All other generic types are erased at runtime**.

Kotlin, for example, defining ```Array<Int>``` is still compiled down to a Java Platform ```Object[Integer]```, the array type is enforced by the Kotlin compiler as invariant. Where as, Java arrays are covariant allowing unsafe generic assignments like ```array of Object = array of Integer```. 

---

Kotlin currently doesn't support any array literal ```[]={1,2,3}``` initialisation and we must use explicit construction when building, for example, n-dimensional arrays. Below is a 2d array of int.

<script src="https://gist.github.com/griffio/ac6386d41298be68e8768ec2a3f7dc80.js"></script>

---

#### 2D array of String printing a table

The height and width are specified, then each row height and column width index is provided to the Array initialization lambda.

~~~ kotlin

inline fun <reified T> matrix2d(height: Int, width: Int, init: (Int, Int) -> Array<T>) = Array<Array<T>>(height, { row -> init(row, width) })

fun main(args: Array<String>) {
  val table = matrix2d(5, 10, { row: Int, width: Int -> Array(width) { col -> "|$row$col" } })

	for (cells in table) {
	  for (cell in cells) {
		  print(cell)
    }
		  println("|")
	}
}

~~~

[Kotlin spec defines reified type parameters](https://github.com/JetBrains/kotlin/blob/master/spec-docs/reified-type-parameters.md)

