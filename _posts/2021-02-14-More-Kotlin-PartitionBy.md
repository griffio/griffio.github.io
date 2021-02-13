---
layout: post
title: "More Kotlin (PartitionBy)"
category: programming
tags: kotlin
published: true
summary: kotlin partitionBy
runcode: true
---

Existing Kotlin Collection utilities that split-up the input have certain limitations

### [group-by](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/group-by.html)
Only returns Map (Dictionary)

### [partition](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/partition.html)
Only returns two partitions

### [windowed](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/windowed.html)
Windowed has fixed size and step

### [chunked](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/chunked.html)
Chunked has upper bound size

How to solve [4clojure problem 30](https://www.4clojure.com/problem/30)?

Compress a sequence of characters simliar to [clojure.core/partition-by](https://clojuredocs.org/clojure.core/partition-by) 

Apply a function to each value in a List, creating a partition each time the `identity` function returns a new value 

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
