---
layout: post
title: autovalue - create immutable value types using annotation processor support from a Gradle build
category: java
tags: autovalue gradle
published: true
summary: using autovalue
---

# AutoValue - create immutable value types using annotation processor support 

## [https://github.com/google/auto](https://github.com/google/auto)

#### Intro

This is used to create immutable value types using Javac annotation processor support from within the Gradle JavaCompile task.

[Why?, What? and How?](https://docs.google.com/presentation/d/14u_h-lMn7f1rXE1nDiLX0azS3IkgjGl5uxp5jGJ75RE/edit?pli=1#slide=id.g2a5e9c4a8_00)

#### Setup

Gradle 2.1 introduces a simpler plugin specification. This improves project build scaffolding where it can be shared without the copy/pasta blocks of xml (maven) or groovy script.

The Gradle community plugins listing [https://plugins.gradle.org](https://plugins.gradle.org).

The build.gradle below uses the local java plugin and [ewerk auto-value-plugin](https://github.com/ewerk/gradle-plugins/tree/master/auto-value-plugin).

A plugin is effectivley importing an external build script that can create additional configurations and add dependencies.

~~~groovy
plugins {
    id 'java'
    id 'com.ewerk.gradle.plugins.auto-value' version '1.0.1'
}

repositories {
    jcenter()
}

~~~

The gradle compileJava task will use the plugin to detect @AutoValue classes and generate the java source to a default location src/auto-value/<package/AutoValue_Classname]. This specific location means it won't conflict with other similar plugins.

The AutoValue_ class wont exist before the annotation processor runs. The static create method can return null initially.
More than one static factory creation method can be used and given any name.

---

Cash monetary class

~~~java
@AutoValue
public abstract class Cash {

    public abstract Currency currency();
    public abstract BigDecimal amount();

    public static Cash create(Currency currency, BigDecimal amount) {
        return new AutoValue_Cash(currency, amount.setScale(2, RoundingMode.HALF_UP));
    }

    public static Cash fromString(Currency currency, String amount) {
        return create(currency, new BigDecimal(amount));
    }

}
~~~
---

Extra usage - with Jackson json annotations

~~~java
@AutoValue
public abstract class Cash {

    public abstract Currency currency();
    public abstract BigDecimal amount();

    @JsonCreator
    public static Cash create(@JsonProperty("currency") Currency currency, @JsonProperty("amount") BigDecimal amount) {
        return new AutoValue_Cash(currency, amount.setScale(2, RoundingMode.HALF_UP));
    }

}
~~~

~~~java
    Cash fiver = Cash.create(Currency.getInstance(Locale.UK), new BigDecimal("5.00"));
~~~

---

Best Practice: Add a package private constructor to prevent external subclassing.

~~~java
@AutoValue
public abstract class Cash {
    
    Cash() {}
 
    public abstract Currency currency();
    public abstract BigDecimal amount();

    public static Cash create(Currency currency, BigDecimal amount) {
        return new AutoValue_Cash(currency, amount.setScale(2, RoundingMode.HALF_UP));
    }

}
~~~

Source code [https://github.com/griffio/autovalue-gradle](https://github.com/griffio/autovalue-gradle)
