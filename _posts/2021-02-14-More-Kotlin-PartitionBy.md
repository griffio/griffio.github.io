---
layout: post
title: "More Kotlin (PartitionBy)"
category: programming
tags: kotlin
published: true
summary: kotlin partitionBy
runcode: true
---

Existing Kotlin Collection utilities that transform the input into output collections as groups or sub-groups have certain limitations

### [group-by](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/group-by.html)
Only returns Map<Key, List> (Dictionary)

### [partition](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/partition.html)
Only returns two partitions as Pair<List, List>

### [windowed](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/windowed.html)
Windowed has fixed size and step of List<T>

### [chunked](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/chunked.html)
Chunked has upper bound size of List<T>

How to solve problems where We want variable partitions?:

[4clojure problem 30](https://www.4clojure.com/problem/30) - remove consecutive duplicates 

[4clojure problem 31](https://www.4clojure.com/problem/31) - variable length partitions 

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
        // kotlin.collections/partition can be used recursively returns pair of ArrayList
        //val (taken, rest) = source.partition { source.first() == partition(it) }
        //partitionBy(rest, partition, result + sequenceOf(taken))
    }
    
   val leroy1 = partitionBy("Leeeeeerrroyyy".asIterable(), identity())
   
   // for problem/30 also use https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/distinct.html 
   
   println(leroy1.map { it.first() }.toList().joinToString("")) 
   
   val leroy2 = partitionBy("Leeeeeerrroyyy".asIterable(), identity())
   
   //Add Run Length to leroy2
   println(leroy2.map { it.first() to it.size }.toList().joinToString(":"))    
   
}
```
