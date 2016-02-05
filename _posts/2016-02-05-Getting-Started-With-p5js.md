---
layout: post
title: "Make: Getting Started with p5.js Review"
category: review
tags: p5js review
published: true
summary: Getting Started with p5.js Review
---

[Make: Getting Started with p5.js](http://www.makershed.com/products/make-getting-started-with-p5-js)

![Make: Getting Started with p5.js](/public/p5js.jpg)

**The subtitle is** "Making Interactive Graphics in Javascript and Processing"

Published October 2015 (ISBN:978-1-4571-8677-6)

Authors are Lauren McCarthy, Casey Reas & Ben Fry

Contains illustrations by Taeyoon Choi on the inside pages

The physical book is half-sheet sized (5.5" by 8.5") with around 220 pages of content across 13 chapters

---

[p5.js](http://p5js.org/) is a JavaScript [open source](https://github.com/processing/p5.js) interpretation of [Processing](https://processing.org/), native on desktop GNU/Linux, OS X, and Windows, brought over to the browser for html5 canvas

This has the same idea as Processing of sketching with code, instead without the need of stopping for a compilation step

This is different from using a vector graphics application as it is about learning to program through computer graphics using JavaScript on a html canvas

Learning programming through experiments and tools are needed to solve visual design problems, rather trying to learn a programmatic syntax first

The approach taken in the book has short examples in each chapter including useful integration with fetching external data and towards the end, language concepts like variables, map, functions, arrays and objects are introduced

All the concise examples are like a [unit test](https://en.wikipedia.org/wiki/JUnit) where the programmer overrides the pre-defined template methods, p5 is already bootstrapped

~~~javascript
function setup() {
  createCanvas(640, 480);
}

function draw() {
  ellipse(50, 50, 80, 80);
}
~~~

---

A quick way of starting an environment is to use something like [codepen](http://codepen.io/) then add the p5 library

~~~
https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.4.22/p5.min.js
~~~

Introductions to p5

[hello.p5js](http://hello.p5js.org/)

There is a great selection of p5js video tutorials by Daniel Shiffman

[p5.js tutorial - Part 1](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA)

[p5.js tutorial - Part 2](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6bI1SlcCRfLH79HZrFAtBvX)
