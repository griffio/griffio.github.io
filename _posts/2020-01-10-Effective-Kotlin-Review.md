---
layout: post
title: "Effective Kotlin Review"
category: kotlin
tags: review
published: false
summary: review of Effective Kotlin
---

[Effective Kotlin Book]](https://leanpub.com/effectivekotlin/)

![Effective Kotlin Book](/public/effective_kotlin.jpg)

From author [Marcin Moskala](https://leanpub.com/u/mmoskala)

This is a reference to the printed edition from late 2019

Presented at 437 pages including a table of contents, however it doesn't contain an index.

Effective Kotlin - effectiveness can be considered the concept of being able to achieve better results through general rules of choice rather than through explict measurements of efficiency. Some aspects of efficiency are put forward in this book.

**Do you need this book?**

The book is split into three parts:

* Good Code

* Code Design

* Efficiency 

Firstly, its not Android specific and covers the language around the standard libary.

However, not especially as a first take for beginners either or if you prefer to get your answers from StackOverflow, as
the material is designed around the trades off to effectively communicate Kotlin code across a development team.
The book doesn't cover coverting from Java to Kotlin even though 

**The cost** to mitigate is the time spent reading and understanding Kotlin code.

There is a lot of talk about "clean" code 
It should also be considered that "prefer duplication over the wrong abstraction"
https://www.sandimetz.com/blog/2016/1/20/the-wrong-abstraction

Nulls are still a valid type in Kotlin and can be used effectively.

The original Effective Java book, that I first purchased in 2001, was a much needed behind the scenes of Java and much of that relates to adding defensive programming against the Java Language and official API missed.

The Kotlin language benefited from Effective Java and addresses most of the traps and pitfalls of commonly misunderstood subtleties e.g Data Classes and hascode/equals.

If you are performing a code review and need to justify a requested change or recommendation this book can give you 

There are only brief references to coroutines or multi-threaded programming in handling mutability and state.

Kotlin has still more potential to offer in terms of what it can be that one book 

Danny Thorpe's Delphi Component Design from 1996 https://dl.acm.org/doi/book/10.5555/524370 shows us how a
internal look at similar language and integrated tool looks like with a eye of an insider.

Particularly, it will be interesting to see how well an "Effective Kotlin Coroutines" could be as an entire book too, for something that too has many trade-offs.

