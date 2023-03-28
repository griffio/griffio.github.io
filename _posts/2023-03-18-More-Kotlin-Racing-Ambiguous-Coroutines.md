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

Useful for [Happy Eyeballs](https://www.rfc-editor.org/rfc/rfc8305) or another fast fallback algorithm is required. 

---

The main entry point `suspend` begins with an implicit [Default Dispatcher](https://kotlinlang.org/docs/coroutine-context-and-dispatchers.html#dispatchers-and-threads) (backed by a shared pool of threads on JVM).

Wrapping with `coroutineScope` will wait for child coroutines until completed or cancelled (when an exception is raised all children in the scope are cancelled).

**Example 1** using select:

Use `select` to wait for the result of multiple suspending functions simultaneously. If any fail, then `select` produces the exception.

The `awaitOn` is called when a deferred value is resolved then emits the result to the enclosing `select` clause.

Call `coroutineContext.cancelChildren()` once the `select` has produced a result, all coroutines in the scope are cancelled.  

The `main` function will complete after the quickest task completes - in this case `task1`.

``` kotlin

import kotlinx.coroutines.*
import kotlinx.coroutines.selects.select
import kotlin.system.measureTimeMillis

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

    val ms = measureTimeMillis {

        val first =
            select {
                tasks.forEach { task ->
                    async { task() }.onAwait { it }
                }
            }

        coroutineContext.cancelChildren()

        println(first) // "Task 1 completed"
    }

    println("in $ms milliseconds)")
}

```

**Example 2** using Channels:

Where `channelFlow` is a cold flow.

The `first` operator returns the first value or exception emitted by the flow and then cancels flow's collection.

``` kotlin

import kotlinx.coroutines.*
import kotlinx.coroutines.flow.channelFlow
import kotlinx.coroutines.flow.first
import kotlin.system.measureTimeMillis

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

    val ms = measureTimeMillis {

        val first =
            channelFlow {
                tasks.forEach { task ->
                    launch { send(task()) }
                }
            }.first()

        println(first)

        //"Task 1 completed"
    }

    println("in $ms milliseconds)")
}

```

**Example 3** using Flows:

Similar to `channelFlow`, concurrently `merge` without limit on the number of simultaneously collected flows.

The `first` operator returns the first element emitted by the flow and then cancels flow's collection

``` kotlin

import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlin.system.measureTimeMillis

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
   
    val tasks = listOf(::task3, ::task2, ::task1)

    val ms = measureTimeMillis {

        val first = tasks.map { it.asFlow() }.merge().first()

        println(first)

        //"Task 1 completed"
    }

    println("in $ms milliseconds)")
}

```

**Example 4** Exceptions:

Wrapping with `supervisorScope` adds a [SupervisorJob](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-supervisor-job.html) to the Coroutine Context,
allowing any Exception thrown by an `async` job to be handled by the User.

The first job that fails, `select` produces the corresponding exception as the result.

Unless cancelled, the remaining jobs will continue to run and prevent the coroutine scope from completing.

``` kotlin

import kotlinx.coroutines.*
import kotlinx.coroutines.selects.select
import kotlin.system.measureTimeMillis

suspend fun task1(): String {
    delay(1000)
    error("Task 1 failed")
}

suspend fun task2(): String {
    delay(12000)
    return "Task 2 completed"
}

suspend fun task3(): String {
    delay(13000)
    return "Task 3 completed"
}

suspend fun main() = supervisorScope {

    val tasks = listOf(::task3, ::task2, ::task1)

    val ms = measureTimeMillis {
        try {
            val first =
                select {
                    tasks.forEach { task ->
                        async() { task() }.onAwait { it }
                    }
                }
            println(first)
        } catch (e: Exception) {
            println(e.message)
            // "Task 1 failed"
        } finally {
            coroutineContext.cancelChildren()
        }
    }

    println("in $ms milliseconds)")
}

```

**Example 5** Happy Eyeballs:

Hostnames on the Internet often resolve to multiple IP addresses, each of
which may have different performance and connectivity characteristics.  Address families (IPv4
or IPv6) may be blocked, broken, or sub-optimal on a network, clients that attempt multiple connections in parallel have a chance of
establishing a connection more quickly reducing the overall client delay.

Pseudocode for the Happy Eyeballs algorithm of racing connections returning the quickest resolved ip address for e.g. fastly.com.
A real example would attempt to connect with a socket and close any sockets that are not used. 

The ordering of ip addresses is expected to be interleaved by family type.

Each suspend function is decorated with a staggered 250ms connection delay using [onEach](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/on-each.html) by order of input.
The first ip in the list is started without delay, subsequent ips are delayed (e.g. 250ms, 500ms ...) before starting.

*What is missing* from this naive example - tasks should wait up until delay *or* run immediately if the previous task fails. 

Once again, the flows `merge` concurrently starting after their respective delay, the first ip to "resolve" is returned
and the rest of the tasks are cancelled.

``` kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlin.time.Duration
import kotlin.time.Duration.Companion.milliseconds
import kotlin.system.measureTimeMillis

suspend fun ip4a(): String {
    delay(1200)
    return "151.101.1.57"
}

suspend fun ip6a(): String {
    delay(1100)
    return "2a04:4e42:400::313"
}

suspend fun ip4b(): String {
    delay(100)
    return "151.101.193.57"
}

suspend fun ip6b(): String {
    delay(100)
    return "2a04:4e42:600::313"
}

suspend fun main(): Unit = coroutineScope {
    val ms = measureTimeMillis {
        val fastly = listOf(::ip6a, ::ip4a, ::ip6b, ::ip4b)
        val result = happyEyeballs(fastly, 250.milliseconds)
        println(result)
        // 2a04:4e42:600::313
    }
    println("in $ms milliseconds)")
}

@OptIn(FlowPreview::class)
suspend fun <T> happyEyeballs(tasks: List<suspend () -> T>, delayBy: Duration): T = coroutineScope {
    val flows = tasks.mapIndexed { ix, it ->
        it.asFlow().onEach {
            delay(delayBy * ix)
        }
    }
    flows.merge().first()
}
```
