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
  -XprintRounds              Print information about rounds of annotation processing
  -XprintProcessorInfo       Print information about which annotations a processor is asked to process
```

The interface for an annotation processor is provided from javax.annotation.processing.Processor.
The java compiler will discover annotation processor implementations on the classpath using the java.util.ServiceLoader mechanism if provided - See [Auto Service](https://github.com/google/auto/tree/master/service).

* -processor can be used to explictly to provide the implementation class instead. No other annotation processors will be executed.

* -proc:[none,only]
  * -proc:none is used for Annotation Processor development. Disables Processing
  * -proc:only is used for processers that are validating source or generating source only. Class files are not generated externally

The annotation processing is performed in one or more rounds until all input files are consumed that contain matching annotations, since newly generated files may contain annotations.

e.g

 * Round 1:
   * input files: {...}
   * annotations: [...]
   * last round: false
 * Processor ... matches [...] and returns false.
 * Round 2:
   * input files: {...}
   * annotations: [...]
   * last round: false
 * Processor ... matches [] and returns false.
 * Round 3:
   * input files: {}
   * annotations: []
   * last round: true
 
---

Annotation Processing wraps the Java Compiler and an compilation errors may cause the javac process to exit with a non-zero value failing any dependent build.

When multiple annotation processors are invoked any duplicate source/class files that may have be aggregated will cause the Java Filer process to fail. e.g When two anotation processors output code for the same annotation.

