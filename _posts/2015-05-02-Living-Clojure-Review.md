---
layout: post
title: Living Clojure Review
category: review
tags: clojure review
published: true
summary: Living Clojure Review
---

[Living Clojure on Safari Books Online](https://www.safaribooksonline.com/library/view/living-clojure/9781491909270/)

![Living Clojure Book](https://raw.githubusercontent.com/griffio/griffio.github.io/master/public/living_clojure.png)

**The subtitle** is “An Introduction and Training Plan for Developers”. This book was published late April 2015, and at 220 pages, I preferred to wait and review the physical book for this type of introductory text.

The book is aimed at programmers with a background in existing languages who want to step into the Clojure environment.

**A slim book** but dense with information to bootstrap the process of learning Clojure in a curated way by the author [Carin Meier](https://twitter.com/gigasquid). The code examples don’t take up too much space due to the compactness of Clojure itself.

The Clojure environment exists on the Java Virtual Machine and more recently as a Javascript language overlay with [Clojure script](https://github.com/clojure/clojurescript).

This allows Clojure programmers to extend the idea that the front-end extends to the server too using the same language. Often cited as an example of increased productivity by Io.js/Node.js developers.

The book has two logical parts.
 
**The first part** is an introduction to Clojure through the REPL(Read/Eval/Print/Loop) and [Leiningen](http://leiningen.org) the project boot-strapping tool. It does include coverage on language concepts such as Concurrency, with core.async, and Macros. Any modern language exists in a community of libraries and frameworks; these are described in chapters 5 and 9.

The book introduces [transit](https://github.com/cognitect/transit-clj) as the Clojure data format for serialisation between the client and server.

Clojure script is covered in chapter 7: Creating Web Applications with Clojure. The powerful Om reactive framework is mentioned.

**In part two** are the daily code exercises over 7 weeks that require the developer to fill in the blanks to complete the problems listed at https://www.4clojure.com/. 

It is possible to compress this time span by completing more each day. But the aim is to ‘think Clojure’ at least once a day over half a dozen weeks.

**The final** chapters shows where Clojure is heading in version 1.7 and examines the [Transducers](http://clojure.org/transducers) concept - the separation of data and transformation pipelines.

Overall the book aims to bring an existing developer up to date in the world of Clojure, where the current state of the art exists; Once there, another new book to be published, [Clojure Applied: From Practice to Practitioner](https://pragprog.com/book/vmclojeco/clojure-applied), takes the next steps with extended lessons on the best practices.
