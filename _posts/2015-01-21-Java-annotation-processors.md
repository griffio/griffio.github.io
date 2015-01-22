---
layout: post
title: Java Annotation Processors
category: java
tags: java
published: true
summary: Java Annotation Processors
---

# Java Annotation Processors


### Plugging into the Java Compiler

Presentation slides [Pdf](https://oracleus.activeevents.com/2014/connect/fileDownload/session/14BBC4CA8DD69CBF9BA12D7B6601C106/CON4265_McManus-Plugging-into-the-Java-Compiler.pdf)

---

Java Compiler commandline options for annotation processing

```bash
 javac <options> <source files>
  -verbose                   Output messages about what the compiler is doing
  -proc:{none,only}          Control whether annotation processing and/or compilation is done.
  -processor <class1>[,<class2>,<class3>...] Names of the annotation processors to run; bypasses default discovery process
  -processorpath <path>      Specify where to find annotation processors
  -d <directory>             Specify where to place generated class files
  -s <directory>             Specify where to place generated source files
```

 * -proc
   * -proc:none is used for Annotation Processor development. Disables Processing
   * -proc:only is used when generating source only. Class files are not generated externally
