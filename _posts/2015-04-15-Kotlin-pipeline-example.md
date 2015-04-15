---
layout: post
title: Kotlin Pipeline Example with std library
category: kotlin
tags: kotlin
published: true
summary: Using Kotlin std library to pipeline characters
---

A example in [Kotlin](http://kotlinlang.org) to show a "functional" pipeline that transforms the input text   resulting in a Map associating the character to its occurrence.

~~~

 val input = "Mississippi"

 val result = input.groupBy{it}.mapValues{it.getValue().size()}

 println("result = ${result}")
 
~~~

~~~
result = {M=1, i=4, s=4, p=2}
~~~

The two stages in the pipeline are grouping and transforming, and are implemented in Kotin by the Standard Library, generating two collections. An imperative implementation would typically use just one result map.

~~~

public inline fun <T, K> Array<out T>.groupByTo(map: MutableMap<K, MutableList<T>>, toKey: (T) -> K): Map<K, MutableList<T>> {
    for (element in this) {
        val key = toKey(element)
        val list = map.getOrPut(key) { ArrayList<T>() }
        list.add(element)
    }
    return map
}

~~~

~~~

public inline fun <K, V, R, C : MutableMap<K, R>> Map<K, V>.mapValuesTo(destination: C, transform: (Map.Entry<K, V>) -> R): C {
    for (e in this) {
        val newValue = transform(e)
        destination.put(e.key, newValue)
    }
    return destination
}
~~~
