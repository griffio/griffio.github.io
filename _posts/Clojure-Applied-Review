---
layout: post
title: Clojure Applied Review
category: review
tags: clojure review
published: true
summary: Clojure Applied Review - From Practice to Practitioner 
---

![Clojure Applied Book](https://raw.githubusercontent.com/griffio/griffio.github.io/master/public/clojure_applied.jpg)

### [Clojure-applied] https://pragprog.com/book/vmclojeco/clojure-applied

From authors [Ben Vandgrift](https://twitter.com/bvandgrift) & [Alex Miller](https://twitter.com/puredanger).

#### Contents

1. Foundations
1. Applications
1. Practices
1. Appendices

Since I am moving on from [Living Clojure](https://griffio.github.io/review/2015/05/02/Living-Clojure-Review/); How is “Clojure Applied” different to the [dozen or so Clojure books](http://clojure-doc.org/articles/ecosystem/books.html) available?

**It does not follow any ‘Cookbook’ style**; instead the First and Second parts are sequential in approach. The Third part titled “Practices” describe reference material for production use. Finally, the Appendices contain the philosophy behind Clojure and the precise nature of its design.

**This is for intermediate Clojurist**; familiar with the syntax, has solved puzzles in the REPL, ready to begin the journey into real development practices.

The introduction to this book proposes that a commitment to the Clojure language begins in the middle stage. The learning curve would be steeper if the developer had to master all the implementation details. 

**As part of the Pragmatic Bookshelf** series the writing tone in “Clojure Applied” follows the question - What is the problem space this book is trying to solve?

#### First Part: Foundations

This doesn’t build up a single application, instead the authors take example domains known to developers e.g. Money, Customer, Cart, Orders and even tryout Planetary exploration!

The core concept presented across three chapters is to model domain entities, then, group entities with the immutable collection of our choice; finally apply sequential processing with transformational functions.

This is presented, pulled together as build Customer Order Line domain example, using reducers to produce a final Revenue style report.

#### Second Part: Applications

There are four chapters here to answer the question:
**How to build up an application in Clojure**?

This is forms the largest core model your domain with data, transform it with pure functions, manage state, spread your work across cores, and structure apps with components. 

A Clojure application brings together State and Identity applied with techniques for managing change in the model data.

Transactional units of work and concurrency combined with parallelism using reducers show the advantage of immutable data. 

**There are half a dozen diagrams** throughout to illustrate the effect of asynchronous programming models.

Both Namespaces and Components are structural tools.
Components are not native to the Clojure language; they are containers for state applied in the problem space.

System Configuration to pull it together.

Best practices idiomatic and good ideas to follow

These would be the concepts and strands that a typical framework would provide, how make this applicable to Clojure. 

End construction resulting in a deployable application

Libraries that are likely to be essential for use in this phase:-

[StuartSerria/Component](https://github.com/stuartsierra/component) - lifecycle for stateful components.
[Prismatic/Schema](https://github.com/Prismatic/schema) type metadata validation helps with data conforms to a model.
[Environ](https://github.com/weavejester/environ) - environment  configuration values
#### Third Part: Practices
In three chapters covers testing, data interoperation and deployment.

**Testing** - [clojure.test](https://clojure.github.io/clojure/clojure.test-api.html) with assertions vs expectations, also considers Property based testing[test.check](https://github.com/clojure/test.check)  

**Formatting Data** - Probably my favourite section, Clojure is special with a first class interop story; EDN, JSON and Transit have good coverage of data serialisation formats to exchange the model. 

**Macros are not covered** in this book as a development practice; one area where the book intentionally doesn’t go.

**Packaging, Publishing and Deployment** coverage is wide ranging from PAAS providers to traditional Application Servers.
One example mentioned is [Immutant.org](http://immutant.org/) from Red Hat Inc. This is close to an integrated stack distribution of Clojure libraries.

#### Appendices 1 & 2
The appendices discuss the roots of Clojure influenced from LISP and the elements that make up the Clojure language. The process of “Practicing and Thinking” in Clojure is guided by core principles outlined in the second appendix.

**What is a Practitioner**?
A Practitioner will often choose the most direct idiomatic solution rather than the one that involves mastery of the implementation. Although the book only mentions “Practitioner” in the title, completing the book, we can take it to mean a professional developer who specialises in the application of Clojure within their team’s product or open source software.
