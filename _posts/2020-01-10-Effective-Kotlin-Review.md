---
layout: post
title: "Effective Kotlin Review"
category: kotlin
tags: review
published: true
summary: review of Effective Kotlin
---

[Effective Kotlin Book](https://leanpub.com/effectivekotlin/)

![Effective Kotlin Book](/public/effective_kotlin.jpg)

From author [Marcin Moskala](https://leanpub.com/u/mmoskala)

This is a reference to the printed edition from late 2019

The book is presented at 437 pages including a table of contents, however it doesn't contain an index.

**Effective Kotlin** - effectiveness can be considered the concept of being able to achieve better results through general rules of applicability rather than through explict measurements of efficiency. Some aspects of efficiency are put forward in this book as well.

**Do you need this book?**

The book is split into three parts:

* Good Code

* Code Design

* Efficiency 

**And 52 items** related to getting your Kotlin code to be less error prone with higher readability.

Firstly, its not Mobile Platform specific and covers the language around the standard library.

However, not especially as a first take for beginners either or if you prefer to get your answers from StackOverflow, as
the material is designed around the trade offs that effectively communicate Kotlin code across a development team.

**The effective cost** to mitigate is the time spent reading and understanding Kotlin code versus trying to use every Kotlin feature for maximum conciseness.

The book doesn't cover coverting from Java to Kotlin except for platform types and making Java code "Kotlin friendly".

There is a lot of talk about "Clean" "Dry" code, however it should also be considered that to ["prefer duplication over the wrong abstraction"](https://www.sandimetz.com/blog/2016/1/20/the-wrong-abstraction) is also effective.

Nulls are still a valid type in Kotlin and can be used effectively.

**[The original Effective Java](https://www.oreilly.com/library/view/effective-javatm-programming/0201310058/)** book, that I first purchased in 2001, was a much needed behind the scenes of Java and much of that relates to adding defensive programming against the Java Language that the official Java Standard API missed in hindsight.

**The Kotlin language** benefited from Effective Java and addresses most of the traps and pitfalls of commonly misunderstood subtleties e.g Data Classes, comparators and hashcode/equals.

If you are performing a code review and need to justify a requested change this book can give you recommendations and some foresight.

**There are only** brief references to Coroutines or multi-threaded programming in handling mutability and state.

Kotlin still has more potential to offer in terms of what one book can address and shouldn't just focus on "beginners".

**[Danny Thorpe's Delphi Component Design](https://dl.acm.org/doi/book/10.5555/524370)** classic from 1996  shows us how an
internal look at a similar integrated language tool looks like with a eye of an insider.

Particularly, it will be interesting to see how well an "Effective Kotlin Coroutines" could be as an entire book too, for something that has many trade-offs still being discovered as the API evolves.
