---
layout: post
title: "Atomic Kotlin Review"
category: kotlin
tags: review
published: true
summary: review of Atomic Kotlin
---

![Atomic Kotlin](/public/atomic_kotlin.jpg)

[Atomic Kotlin Printed Book](https://www.atomickotlin.com/printbook/)

This is a reference to a printed edition from January 2021 (627 pages)

From Authors:

Bruce Eckel (Thinking in Java)

Svetlana Isakova (Kotlin in Action)

**As a Lean Pub** released book the process doesn't allow for the creating of indices, however it is structured with a summary in the Table of Contents

The booked is aimed at both novices and experienced programmers as Kotlin cherry-picks from newer languages and supports historical OOP features

**Why Kotlin?**

Kotlin has had the benefit to pick from a field of tested language features in mainstream use particularly C-Sharp, Scala, Swift, Python, even Visual Basic to address most of the pitfalls of Java elaborated in [Effective Java](https://www.oreilly.com/library/view/effective-java/9780134686097/)

One of the main improvements is a removal of the Java Generics implementation with a new type system somewhat borrowed from C Sharp (in and out variance) and Scala's (Any and Nothing) hierarchy

**Intentionally blending** the styles, and covered in this Book, of Imperative mutable data, Class Object Orientated Data, Functional Algebra to manipulate data in Lamdbas and collections

If you haven't been a programmer across the century, migrating from one language to another, there are some notes about where languages features and constructs originated in Kotlin 

Some areas that Kotlin does well compared to Java are data classes, lambdas, expressions, no-semi colons, easy to add extension methods

Even if Java continues to add features, like records [OpenJDK](https://openjdk.java.net/jeps/359), it will still be very clunky and verbose

Kotlin strives to be it's own language as well - for example to jettison the 'Java' style `for` syntax - opting for something more like Visual Basic or Python use 

**On the other-hand**, one area where Kotlin is not 100% portable with Java is the lack of a package private scope

This Java default visibility scope may have been dropped as the Kotlin scoping is more suitable for cross platform use (e.g modules)
[Debated to this day](https://discuss.kotlinlang.org/t/kotlin-to-support-package-protected-visibility/1544/62)

Advocates of package private argue it allows a logical public interface for the package hiding of private implementation classes

**The counter argument** is that it is only private if you don't look

Decisions to make classes final - a number of popular frameworks use these Java built in defaults that make adoption of Kotlin that bit difficult

Also, setting defaults different from Java will normally please some, like library authors but annoy new comers that don't know why they are prevented from doing something

**Atomic Kotlin Book covers only a basic** example of Generics and Co-variance and Contra-variance - more detailed explanation - readers will have to go elsewhere

Multithreading and Co-routines are not mentioned in the Book
 
For readers new to JVM languages, they will need to know about type erasure and Kotlin's support for some kind of type capture [reification](https://kotlinlang.org/docs/inline-functions.html) at compile time

**Overall this Book** gives a very readable, well spaced out and thorough walk around Kotlin's core features that are likely to remain in 1.x versions of Kotlin and there is online exercise content to supplement (https://www.atomickotlin.com/exercises/)

On using more advanced features or Android developers who would look to more specific books like [Effective Kotlin](https://griffio.github.io/kotlin/2020/01/10/Effective-Kotlin-Review/) or resources [Android Basics](https://developer.android.com/courses/android-basics-kotlin/unit-1)
