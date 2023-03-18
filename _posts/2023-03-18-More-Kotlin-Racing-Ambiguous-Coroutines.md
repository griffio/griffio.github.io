---
layout: post
title: "More Kotlin (Racing Ambiguous Coroutines)"
category: programming
tags: kotlin
published: true
summary: kotlin coroutines racing ambiguous suspended functions
runcode: true
---

Shows **basic examples** where two or more suspended functions can be executed in parallel, the first result to 
complete successfully will be used and the rest will be cancelled, ending the coroutine scopr.

This is, for example, useful when [Happy Eyeballs](https://www.rfc-editor.org/rfc/rfc8305) or other fast fallback algorithm is useful. 

Example 1 using select:

The main entry suspend point begins with the implicit Default Dispatcher (backed by a shared pool of threads on JVM).

The wrapping `coroutineScope` will wait for child coroutines, completed, cancelled, or when an exception is raised.

`select` waits for the result of multiple suspending functions simultaneously.
`awaitOn` when a deferred value is resolved this emits the result to the enclosing `select` clause
`coroutineContext.cancelChildren()` once the `select` has produced a result, all coroutines in the scope are cancelled  

The `main` function will complete after the quickest task completes - in this case `task1`

``` kotlin

import kotlinx.coroutines.*
import kotlinx.coroutines.selects.select

suspend fun task1(): String {
    delay(1000)
    return "Task 1 completed"
}

suspend fun task2(): String {
    delay(12000)
    return "Task 2 completed"
}

suspend fun task3(): String {
    delay(13000)
    return "Task 3 completed"
}

suspend fun main() = coroutineScope {

    val tasks = listOf(::task3, ::task2, ::task1)

    val first =
        select {
            tasks.forEach { task ->
                async() { task() }.onAwait { it }
            }
        }

    coroutineContext.cancelChildren()

    println(first)

    //"Task 1 completed"
}

```
