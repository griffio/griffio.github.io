---
layout: post
title: autovalue - Gradle
category: java
tags: java autovalue gradle
published: true
summary: using autovalue
---

# AutoValue - using with Gradle 2.1 or higher

## [https://github.com/google/auto](https://github.com/google/auto)

#### Setup

Gradle 2.1 introduces a simpler plugin specification.

This improves project build scaffolding where it can be shared without copy/pasting blocks of xml (maven) or
groovy script.

Choice of plugins - https://plugins.gradle.org

build.gradle definition for [https://github.com/ewerk/gradle-plugins/tree/master/auto-value-plugin](auto-value-plugin)

~~~groovy
plugins {
    id 'java'
    id 'com.ewerk.gradle.plugins.auto-value' version '1.0.0'
}

repositories {
    jcenter()
}

~~~

gradle compileJava task will use the plugin to detect @AutoValue classes and generate the java source to
src/generated/auto-value/<package/AutoValue_Classname]

The AutoValue_ class wont exist before the annotation processor runs. The create method can return null initially.

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
}
~~~

---

Best Practice: Add a package private constructor prevent external subclassing

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




