---
layout: post
title: "More Kotlin (Sealed Class Hierarchies)"
category: programming
tags: kotlin
published: true
summary: kotlin sealed classes
---

### [Kotlin sealed-hierarchies](http://kotlinlang.org/docs/reference/classes.html#sealed-classes)

In Java and Kotlin, traditional enums types allow a fixed set of constants with the restriction that they are implemented only as singletons (In the JVM).

Kotlin allows a class hierarchy which consists of a **sealed abstract super class** and enclosed named concrete implementations.

The following sealed class leans on the compiler and lets it do the work.

~~~ kotlin

sealed class ForceAllegiance {
    class Jedi: ForceAllegiance()
    class Sith: ForceAllegiance()
}

~~~

The Kotlin compiler ensures "when" covers all possible subclasses in the sealed class.

~~~ kotlin

fun ForceAllegiance.asString() = when (this) {
    is ForceAllegiance.Jedi -> "The Light"
    is ForceAllegiance.Sith -> "The Dark"
}

~~~

Not to be confused with [Abstract Data Types](https://en.wikipedia.org/wiki/Abstract_data_type) that occur in Java as encapsulated value types like "ZipCode".

These are [Algebraic Data Types](https://en.wikipedia.org/wiki/Algebraic_data_type) allowing us to count the inhabitants of a type and manipulate a sealed single data type of several kinds of "things".

**Note**: In Kotlin 1.1 there exists a proposal to extend sealed classes for use with [data class inheritance](https://github.com/Kotlin/KEEP/blob/master/proposals/data-class-inheritance.md).

---

Here is a more elaborate version of *FizzBuzz* where type safety is provided Sealed Classes for the conditions.
An invoke operator "T() calls T.invoke()" is used a factory to create the actual subclass instance.

<script src="https://gist.github.com/griffio/d84f39bce91898c5ee31df89e5b162e5.js"></script>

Below, shows type safe access without having to access String representations.

<script src="https://gist.github.com/griffio/ed73fcc7f2e39e2f7d05409bc2fd32b7.js"></script>
