---
layout: post
title: "Java to Kotlin (A Refactoring Guidebook) Review"
category: engineering
tags: review
published: false
summary: review of Java to Kotlin
---

![Java to Kotlin](/public/java-to-kotlin.jpg)

[Java to Kotlin](https://www.oreilly.com/library/view/java-to-kotlin/9781492082262/)

From Authors:- Duncan McGregor & Nat Pryce

This is a reference to the first printed edition August 2021 (401 pages)

The printed book also contains the Bibliography and Index pages

Subtitled with "A Refactoring Guidebook"

There are **twenty-three chapters** that take a refactoring, mostly the Java idiom, from one concept "to" another concept

---

Not surprisingly, there is a lot of code in the book and is rendered quite small (compared with [Atomic Kotlin](https://griffio.github.io/kotlin/2021/02/12/Atomic-Kotlin-Review/) -  consideration should be made if you would prefer to get the digital version only

**This is a strategy book** about refactoring from Java code and also refactoring if Java developers themselves that are motivated enough to break out

Though this is not a Kotlin learning book aimed at beginners - it avoids knowing about Coroutines, libraries and frameworks that are evolving 
and for the legions of Android developers - it is not about Android either

Kotlin has enough "taste" that it appeals to maybe Python developers and possibly has encouraged for the first time new developers onto the JVM 

Mobile developers on IOS (Swift) and Android (Kotlin) can benefit

The Java language is enough to repel new adoption and the intial inertia of the enterprise glory years 15-20 years ago still carry it on

The "grain" of the language shows through - Java "varnished" over with some Kotlin is the place to start 

The book takes the initial Java to Kotlin conversion that the Intellij IDEA can perform

* Kotlinify *

Transformation or Kotlinate 

When Java began to rely on annotation processors, e.g. Lombok, AutoValue etc, to become tolerable - these need to be built into the compiler
taking immutable values and transforming with functions.

** Chapter 21 ** Exceptions to Values
This takes are refactoring 
e.g Result<Data, Error>
[Scala 3 union](https://docs.scala-lang.org/scala3/book/types-union.html) types are the most consice 

The key take-away is that keeping a system building and working is the most valuable refactoring

This book is beneficial as You are getting at least 5 years of Kotlin design experiences from the authors and skills in refactoring 
