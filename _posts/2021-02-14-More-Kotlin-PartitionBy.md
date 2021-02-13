---
layout: post
title: "More Kotlin (PartitionBy)"
category: programming
tags: kotlin
published: true
summary: kotlin partitionBy
runcode: true
---

Existing Collection utilities that split-up the input have certain limitations

### [Kotlin group-by](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/group-by.html)
Only returns Map (Dictionary)

### [Kotlin partition](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/partition.html)
Only returns two partitions

### [Kotlin windowed](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/windowed.html)
Fix Windows size and steps

### [Kotlin chunked](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/chunked.html)
Chunked has upper bound size

How to solve (https://www.4clojure.com/problem/30) ?

Apply a function to each value in a List, creating a partition each time the function returns a new value

Compress a sequence of characters simliar to https://clojuredocs.org/clojure.core/partition-by 

```  kotlin
fun main(args: Array<String>) {
   
fun <T> identity(): (T) -> T = { it }

tailrec fun <T, R> partitionBy(
    source: Iterable<T>,
    partition: (T) -> R,
    result: Sequence<List<T>> = sequenceOf()
): Sequence<List<T>> =
    if (source.none())
        result
    else {
        val taken = source.takeWhile { partition(it) == partition(source.first()) }
        partitionBy(source.drop(taken.count()), partition, result + sequenceOf(taken))
    }
    
   val leroy1 = partitionBy("Leeeeeerrroyyy".asIterable(), identity())
   
   println(leroy1.map { it.first() }.toList().joinToString(""))    
   
   val leroy2 = partitionBy("Leeeeeerrroyyy".asIterable(), identity())
   
   println(leroy2.map { it.first() to it.size }.toList().joinToString(":"))    
   
}
```
