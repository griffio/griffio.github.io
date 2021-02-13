---
layout: post
title: "Atomic Kotlin Review"
category: kotlin
tags: review
published: false
summary: review of Atomic Kotlin
---

![Atomic Kotlin](/public/atomic_kotlin.jpg)

This is a reference to a printed edition from January 2021 (627 pages)

[Atomic Kotlin Printed Book](https://www.atomickotlin.com/printbook/)

This is a Lean Pub released book and process doesn't allow for the creating of indices

The booked is aimed at both novices and experienced programmers

Why Kotlin?

Kotlin has had the benefit and picking from field tested language features from C-Sharp, Scala, Swift and Python and addresses most of the pitfalls of Java elobrated in Effective Java.

One of the main improvement is the removal of much the Java Generics implementation with a new type system somewhat borrowed from C Share (in and out variance) and Scala's Any and Nothing as top and bottom type system.

Imperative mutable data, Class Object Orientated Data, Functional Algebra to manipulate data in Lamdbas

If you haven't been a programmer for decades, migrating from one language to another, there are some notes about where languages features and constructs originated 

Some areas that Kotlin does well compared to Java are data classes, lambdas, expressions, no-semi colons, easily extension methods

Even if Java continues to add features like records it will still be very clunky and verbose

Kotlin strives to be it's own language - for example to jettison the 'C' style `for` syntax - opting for something more like Visual Basic or Python. 

For example, one area where Kotlin is not 100% portable with Java is the lack of a package private scope

This Java default visibility scope may have been dropped as the Kotlin scoping is more suitable for cross platform use (e.g modules).
https://discuss.kotlinlang.org/t/kotlin-to-support-package-protected-visibility/1544/62
Advocates of package private argue it allows a logical public interface for the package hiding of private implementation classes
The counter argument is that it is only private if you don't look.

Decision to make classes final - a number of populare frameworks use Java built in defaults that make adoption of Kotlin that bit difficult

Setting default different from Java will normally please some, like library authors but annoy new comers that don't know why they are prevented from doing something

The Book covers only a basic example example of Co-variance and Contra-variance - more detailed explanation - readers will have to go elsewhere

Multithreading and Co-routines are not mentioned
 
Readers new to JVM languages will need to know about type erasure and Kotlin support for some type capture at compile time reification  

Overall the Book gives a very readable and thorough walk around Kotlin's core features that are likely to remain in 1.x versions of Kotlin

For more using more advanced features and Android developers would look to more specific books
