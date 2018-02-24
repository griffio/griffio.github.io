---
layout: post
title: "More Kotlin (Zip)"
category: programming
tags: kotlin
published: true
summary: more kotlin examples
runcode: true
---

### [Kotlin stdlib Zip](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/zip.html)

[Zipping](https://en.wikipedia.org/wiki/Convolution_(computer_science)) interleaves two sequences until the shortest sequence completes.

Below are the definitions from the Kotlin standard library :-

~~~ scala
  infix fun <R> IntArray.zip(other: Array<out R>): List<Pair<Int, R>>
  inline fun <V> IntArray.zip(other: IntArray, transform: (Int, Int) -> V): List<V>
~~~

The default transformation will use: ``` {a, b -> Pair(a, b)} ``` 

#### pairs of numbers: (1,2) (2,3) (3,4) (5,6)

~~~ scala 
val numbers = listOf(1, 2, 3, 4, 5, 6)
val pairs = numbers.zip(numbers.drop(1))
~~~

---

Examples from : [https://msdn.microsoft.com/library/dd267698](https://msdn.microsoft.com/library/dd267698(v=vs.100).aspx)

#### numbers zip words : 1 one 2 two 3 three

~~~ kotlin

fun main(args: Array<String>) {

    val numbers = intArrayOf(1, 2, 3, 4)

    val words = arrayOf("one", "two", "three")
    //infix operator is supported for zip when a transformation operation is not used
    val oneTwoThree = numbers zip words

    oneTwoThree.forEach {
        println("${it.first} ${it.second}")
    }
}

~~~

#### numbers1.zip.numbers2(n1 > n2) : 5 2 3 4

~~~ kotlin

fun main(args: Array<String>) {

    val numbers1 = intArrayOf(1, 2, 3, 4)

    val numbers2 = intArrayOf(5, 2, 1, 3, 6)

    val largerNumbers = numbers1.zip(numbers2, { n1, n2 -> if (n1 > n2) n1 else n2 })

    largerNumbers.forEach {
        println("$it")
    }
}

~~~

#### quarterlySales.zip(quarterlySales * quarterlyRate).sum : 3276.77

~~~ kotlin

fun main(args: Array<String>) {

    val quarterlySales = doubleArrayOf(4023.52, 7701.65, 2435.20)

    val quarterlyRate = doubleArrayOf(0.25, 0.2, 0.3, 0.2)

    val totalCommission = quarterlySales.zip(quarterlyRate, { qs, qr -> qs * qr }).sum()

    println(totalCommission)
}

~~~

#### [tomasp.net/blog/idioms-in-linq](http://tomasp.net/blog/idioms-in-linq.aspx/)

Average unit price over 3 days : 10.33, 2.67, 13.33, 23.00

~~~ kotlin

fun main(args: Array<String>) {

    val day1 = listOf(10.0, 4.0, 13.0, 20.0)

    val day2 = listOf(12.0, 3.0, 11.0, 25.0)

    val day3 = listOf(9.0, 1.0, 16.0, 24.0)

    val dailyPrices = listOf(day1, day2, day3)

    var unitPrices = generateSequence { 0.0 }.asIterable()

    dailyPrices.forEach {
        unitPrices = unitPrices.zip(it).map { it.first + it.second }
    }

    val sum = unitPrices.map { it / dailyPrices.size }

    sum.forEachIndexed {
        i, avgPrice -> print("avg for unit %d is %.2f%n".format(i.plus(1), avgPrice))
    }
}

~~~

#### Further LINQ References :-

[kotlin-linq-examples](https://github.com/mythz/kotlin-linq-examples)
