---
layout: post
title: Kotlin Pipeline Example
category: kotlin
tags: kotlin
published: true
summary: Using Kotlin std library to pipeline characters
---

An example using [Kotlin](http://kotlinlang.org) to show a "functional" pipeline that transforms the input text   resulting in a Map associating the character to its occurrence.

This simple Kotlin example will be compared to an imperative example and a Java 8 stream implementation.

~~~
 val input = "Mississippi"

 val result = input groupBy{it} mapValues{it.value.size()}

 println("result = ${result}")
~~~

~~~
result = {M=1, i=4, s=4, p=2}
~~~

The two stages in the pipeline are grouping and transforming, separated by the infix syntax, implemented in the Kotin Standard Library. Each operation produces a collection.

+ Each unique character is associated with a list of the same characters
+ The size of each list is returned as the new value in the destination map key

An imperative implementation, or a Fold operator, would typically  create one result Map and not require an intermediate list for grouping.

This shows that the Kotlin groupBy operation will always create a list associated with each key.

~~~
public inline fun <T, K> Array<out T>.groupByTo(map: MutableMap<K, MutableList<T>>, 
                                         toKey: (T) -> K): Map<K, MutableList<T>> {
    for (element in this) {
        val key = toKey(element)
        val list = map.getOrPut(key) { ArrayList<T>() }
        list.add(element)
    }
    return map
}
~~~

This shows that the Kotlin mapValue operation will transform the value associated with each key in a destination map using the provided function.

~~~
public inline fun <K, V, R, C : MutableMap<K, R>> Map<K, V>.mapValuesTo(destination: C,
                                                transform: (Map.Entry<K, V>) -> R): C {
    for (e in this) {
        val newValue = transform(e)
        destination.put(e.key, newValue)
    }
    return destination
}
~~~

___

Kotlin version - imperative

~~~

 var result = linkedMapOf<Char, Int>()

 for(char in input) {
   val count  = result.getOrPut(char, {0})
   result.put(char, count.plus(1))
 }

 println("result = ${result}")

~~~


Java 8 version - default collector is based on Hashmap - changed to LinkedHashMap

~~~java
 public static <T, K, A, D> Collector<T, ?, Map<K, D>> inputGroupingBy(Function<? super T,
                         ? extends K> classifier, Collector<? super T, A, D> downstream) {
    return Collectors.groupingBy(classifier, LinkedHashMap::new, downstream);
  }

  public static void main(String[] args) {

    String input = "Mississippi";

    Map<Character, Long> result = input.chars()
               .mapToObj(c -> (char) c)
               .collect(inputGroupingBy(c -> c, Collectors.counting()));

    System.out.println(result);

  }
~~~

Alternative library support with [Guava Multiset](https://code.google.com/p/guava-libraries/wiki/NewCollectionTypesExplained#Multiset
) - counting letters

~~~java
    HashMultiset<Character> letterFrequency = HashMultiset.create(Lists.charactersOf(input));
    lettersFrequency.count("s");
~~~

