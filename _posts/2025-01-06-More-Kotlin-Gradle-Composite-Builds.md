---
layout: post
title: More Kotlin (Gradle Composite Builds)
category: blog
tags: kotlin gradle 
published: true
summary: gradle composite builds
---

# Simplifying Exercise Projects with Gradle Composite Builds

Gradle composite builds are a good starting place to organize and modularize your build logic 

see official documentation

* [Composite builds](https://docs.gradle.org/current/userguide/composite_builds.html)

* [Sample sharing convention plugins with build logic](https://docs.gradle.org/current/samples/sample_sharing_convention_plugins_with_build_logic.html)

Let's explore a practical example of how to structure coding exercise projects without the need for an explicit top-level build file.

## The Power of Convention Plugins

In our example [repository](https://github.com/griffio/exercises_build_convention), we're using a convention-first approach for managing multiple coding exercise projects.
Instead of maintaining a monolithic top-down build file, each exercise stands independently with its own build configuration, while sharing common build logic through convention plugins, where different exercises may need extra dependencies e.g for Json

## How It Works
Look in our `gradle/build-conventions` directory, where we define our shared build logic. The key convention plugin `griffio.exercise-conventions.gradle.kts` provides:

- JDK toolchain configuration
- Standardized source directory layout
- Common Kotlin/Java compilation settings
- Unified application setup

To support writing Kotlin convention plugins, `kotlin-dsl` uses an embedded Kotlin version for plugin backwards compatibility

## Benefits of This Approach

1. **Modularity**: Each exercise project remains self-contained
2. **Consistency**: Build conventions ensure uniform configuration across exercises
3. **Maintainability**: Changes to build logic happen in one place
4. **Flexibility**: Easy to override conventions at use-site with additional plugins

## Example Structure

```
exercises-project/
 ├── gradle/
           │
           └── build-conventions/
                      └── src/main/kotlin/griffio.exercise-conventions.gradle.kts
 │
 ├── exercise-1/
               └── build.gradle.kts
               └── settings.gradle.kts
 │
 ├── exercise-2/
               └── build.gradle.kts
               └── settings.gradle.kts
```

## Using the Convention Plugin

Each exercise simply needs to apply the convention:

```kotlin
plugins {
    id("griffio.exercise-conventions")
    id("griffio.something-custom")
}
```
