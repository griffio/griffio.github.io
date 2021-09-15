---
layout: post
title: "Java to Kotlin (A Refactoring Guidebook) Review"
category: engineering
tags: review
published: true
summary: review of Java to Kotlin
---

[Java to Kotlin](https://www.oreilly.com/library/view/java-to-kotlin/9781492082262/)

![Java to Kotlin](/public/java-to-kotlin.jpg)

From Authors:- Duncan McGregor & Nat Pryce 

This is a reference to the first O'Reilly printed edition (ISBN: 9781492082279) August 2021 (401 pages)

The printed book also contains a bibliography and index pages

Subtitled with "A Refactoring Guidebook"

There are **twenty-three chapters** that take a refactoring, starting mostly in the Java idiom, from one concept "to" another concept

---

**Not surprisingly**, there is a lot of code in the book and is rendered quite small as the examples are nearly production ready - consideration should be made if you would prefer to get the digital version only to follow along better. A supplemental web site is [java-to-kotlin.dev](https://java-to-kotlin.dev)

**This is a strategy book** about refactoring from Java code and also refactoring of Java developers themselves that are motivated enough to break out of the mindset

Though this is not a Kotlin learning book aimed at beginners - it avoids knowing about [Coroutines](https://kotlinlang.org/docs/coroutines-overview.html), libraries and frameworks that are evolving

For the legions of Android developers - it is not about Android either, however Mobile developers on IOS (Swift) and Android (Java) can benefit

**Kotlin has enough** "taste" that it appeals to the Pythonista and possibly has encouraged, in a long time, new developers onto the JVM 

The Java language is enough to repel new adoption even with [additional features](https://openjdk.java.net/jeps/359), with the initial inertia of deployment in Enterprise, 15-20 years ago, to carry it along 

The "grain" of the language still shows through - Java "varnished" over with some Kotlin is the place to start 

**To Kotlinify**

When Java began to rely on annotation processors to become tolerable (e.g. Lombok, AutoValue etc), the benefits in taking immutable values and transforming with functions has to be built into the compiler, then a new language is required

The early chapters of the book take the initial Java to Kotlin conversions that Intellij IDEA can perform and adds **Chapter 4** (Optional to Nullable) to show how Kotlin fixes a [billon dollar IOU](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/) of Java Null Pointers

**Terraforming Java** into Planet Kotlin with only simple top level functions takes Us far enough into the [Goldilocks Zone](https://exoplanets.nasa.gov/resources/323/goldilocks-zone/) to be useful

To keep transforming or to "Kotlinate" existing Object-Orientated Kotlin is also encouraged in **Chapter 16** (Intefaces to Functions)

**Chapter 21** (Exceptions to Values)

This chapter, for example, takes a detailed refactoring for handling failure in a program and provides great insights

As Kotlin doesn't support checked exceptions, error detection by the caller using some kind of value based idiom is preferred 

In Kotlin - the `null` type is still a valid return value to communicate to the caller, often better than fire-bucket exception throwing, however there is no way to provide any error information. Error checking in local functions that provide data to the rest of the program is still required and throwing Exceptions should be performed at the perimeters of the program - see 
Danny Thorpe's excellent [Delphi Component Design - Rules of thumb for implementing exception handlers](https://dl.acm.org/doi/book/10.5555/524370)

Kotlin doesn't have an Either or [Result](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-result/) implementation that represents a union type 

e.g Result<Data, Error>

**Kotlin the language** still has places to go where cherry picking some language transformation features are useful, for example [Scala 3 union](https://docs.scala-lang.org/scala3/book/types-union.html) types are the most concise representation such that it becomes `Data | Error` without the clunky enclosing Either type and is a great improvement

---

This book is beneficial to the reader, that goes beyond syntax changes, by getting at least 5 years of Kotlin design experience from the authors and their skills in testing and refactoring towards functional thinking

**The key teaching** from this book is that keeping a system building and working is the most valuable refactoring

