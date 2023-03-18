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
complete successfully will be used and the rest will be cancelled, ending the nearest coroutine scope.

Useful for [Happy Eyeballs](https://www.rfc-editor.org/rfc/rfc8305) or other fast fallback algorithm is required. 

**Example 1** using select:

The main entry suspend point begins with the implicit Default Dispatcher (backed by a shared pool of threads on JVM).

The wrapping `coroutineScope` will wait for child coroutines, completed, cancelled, or when an exception is raised.

Use `select` to wait for the result of multiple suspending functions simultaneously.

The `awaitOn` is called when a deferred value is resolved this emits the result to the enclosing `select` clause.

Call `coroutineContext.cancelChildren()` once the `select` has produced a result, all coroutines in the scope are cancelled.  

The `main` function will complete after the quickest task completes - in this case `task1`.

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

**Example 2** using channelFlow:

Where `channelFlow` is a cold flow

The `first` operator returns the first element emitted by the flow and then cancels flow's collection

``` kotlin

import kotlinx.coroutines.*
import kotlinx.coroutines.flow.channelFlow
import kotlinx.coroutines.flow.first

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
        channelFlow {
            tasks.forEach { task ->
                launch { send(task()) }
            }
        }.first()

    println(first)

    //"Task 1 completed"
}

```

**Example 3** using Flows:

Concurrently `merge` without limit on the number of simultaneously collected flows.

The `first` operator returns the first element emitted by the flow and then cancels flow's collection

``` kotlin

import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

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

@OptIn(FlowPreview::class)
suspend fun main() = coroutineScope {

    val first =
        merge(::task3.asFlow(), ::task2.asFlow(), ::task1.asFlow()).first()

    println(first)

    //"Task 1 completed"
}

```
