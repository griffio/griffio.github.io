---
layout: post
title: "More Kotlin (Sql Persistence Comparison)"
category: programming
tags: [kotlin]
published: true
description: kotlin sql persistence comparison of libraries 
---

*Database persistence using Sql from Kotlin*

The libraries that you will see are typically described as `Object Relational Mapper` or as a `Sql Row Mapper`.

Another approach is called `Active Record` where persistence is part of an Objects behaviour.

An `Object Relational Mapper` translation layer is responsible to load and store your Application's Entity model as a representation of the relational schema.
There exists a so-called [impedance mismatch](https://agiledata.org/essays/impedanceMismatch.html) where, for example, Kotlin has Maps, Sets and Ordered/UnOrdered Collections
but no concept of Tables, Columns and Rows. What can be surprising is that all the rows in the database could be pulled across to keep
the semantics of, for example, a Set or ordered collection in the Application.

Persisting to the Rdbms involves traversing a given instance of an Entity model and detecting dirty objects that need inserting,
updating in the correct order. The job of the `Orm` is to manage this entangled state back to coherence on the database side. 

Associations are represented in Object-Oriented models and can be bidirectional, the Rdbms uses the constraint of foreign keys on the relationship owner side.
Working with an `Orm` library is often finding a balance between modelling the Entity's lazy-loading, eager-fetching and caching strategy.
If you have a clear enough vision of the Object graph and its associations that you are modelling, this can make an `Orm` the easier choice, to manage
through declarative Annotations or Dsl - the Sql is generated at runtime from this configuration.

A `Sql Row Mapper` focuses on making Sql persistence with the Rdbms Driver more ergonomic - Entity relationships (Foreign Key associations) are often 
managed manually. Simplicity is often the primary motivation by using the Sql dialect directly. Duplication is favoured over abstraction.
It's much easier to work around problems in legacy schema where you have complete control of the Sql.

---

Choosing one library over another should consider some of the following questions:

* Does the Application create the schema or does the schema exist already?
  * SqlDelight advocates for schema first design and code generation derived from Sql files 
* Consider Hibernate/Jpa if it suits your Entity model and the Application owns the database schema
  * Persistence by reachability reduces boilerplate code and duplication
  * [database first vs Jpa first](https://www.jpa-buddy.com/blog/db-first-vs-jpa-first/)
* Android only support where SqlLite expected
  * SqlDelight or Google's [Room](https://developer.android.com/reference/androidx/room/package-summary)
* Library dependencies are compatible with your application transitive dependencies - Bill of Materials
  * For example Json [Jackson](https://github.com/FasterXML/jackson) 
* Libraries strongly typed Sql via Dsl - what is the fidelity required to your Sql dialect?
  * Look for support of Merge or Upsert statements, requirement for this should be identified early 
  * Does inserting records use `returning` to avoid reloading the new record to fetch the Identifier?
* Are you likely to change database vendors and need Sql to be generated for different dialects?
  * Changing database vendors is less common in practice and results in over abstracting/hiding of Sql when there is no need
* Typically, libraries use `Jdbc` or support async reactive (non-blocking) drivers [R2dbc](https://r2dbc.io/)
  * If you want coroutine support see [jasync-sql](https://github.com/jasync-sql/jasync-sql) for a Kotlin async driver 

**Designed for Kotlin**

The following libraries are Kotlin centric even though they may use Java libraries like Jdbc, logging, Jackson

Other Kotlin libraries not covered here but worth comparing are [Zeko-SQL-Builder](https://github.com/darkredz/Zeko-SQL-Builder) and
[Zeko-Data-Mapper](https://github.com/darkredz/Zeko-Data-Mapper). These are in less active development.

---

**Exposed** [JetBrains/Exposed: Kotlin Sql Framework](https://github.com/JetBrains/Exposed)

Summary

* Exposed is a self-described light weight `Object Relational Mapper` library with Sql Dsl and Crud Dao Api
* Postgres MySQL MariaDB SQLite H2 Oracle SQL Server
* Jdbc only
* No Annotations
* No Code generation
* Kotlin Native not supported yet
* Supports many-to-one, many-to-many references
* Supports Lazy loading and eager loading
* No direct Merge or Upsert support 
* Returns id after insert

---

**Komapper** [komapper/komapper: Kotlin Or, for Jdbc and R2dbc](https://github.com/komapper/komapper)

Summary

* Komapper is an `Object Relational Mapper` library with Sql Dsl for JVM server side 
* Postgres MySQL MariaDB H2 Oracle SQL Server
* Jdbc and R2dbc supported
* Annotations
* Code generation at compile-time
* Kotlin Native not supported 
* Supports many-to-one, many-to-many references
* No direct Merge or Upsert support
* Returns id after insert

---

**Kotysa** [ufoss-org/kotysa: The idiomatic way to write type-safe Sql in Kotlin](https://github.com/ufoss-org/kotysa/)

Summary

* Kotysa is a light `Object Relational Mapper` with type-safe Sql Dsl for Jvm and Android
* Postgres MySQL MariaDB SQLite H2 Oracle SQL Server
* Jdbc and R2dbc supported
* No Annotations
* No Code generation
* No associations
* No direct Merge or Upsert support
* Returns id after insert
---

**Ktorm** [kotlin-orm/ktorm: A lightweight Orm framework for Kotlin with strong-typed Sql Dsl and sequence Api.](https://github.com/kotlin-orm/ktorm)

Summary



---

**SqlDelight** [cashapp/sqldelight: Generates typesafe Kotlin APIs from Sql](https://github.com/cashapp/sqldelight)

Summary

Android and standalone Kotlin persistence initially for SqlLite some alpha support for Postgres, MySql

Kotlin code generation, schema first development from Sql statements

Intentional that database column naming is preserved in Kotlin code 

---

**Designed for Java with Kotlin support**

The following libraries are Java centric with some Kotlin extension functions for use with Generics types.

I have intentionally left out traditional Java frameworks [Spring Data Jpa](https://github.com/spring-projects/spring-data-jpa) 

---

**Jdbi** [jdbi/jdbi: designed to provide convenient tabular data access in Java; including templated Sql, parameterized and strongly typed queries, and Streams integration](https://github.com/jdbi/jdbi)

Summary

Jdbc style `Sql Row Mapper`. It is more difficult to model Entity relationships here, so decide if `many-to-one` etc. are important associations you need.

---

**JOOQ** [jOOQ/jOOQ: The best way to write Sql in Java](https://github.com/jOOQ/jOOQ)

Summary

Type safe Sql access
Code Generation
Kotlin extensions

---

**MyBatis** [mybatis/mybatis-3: MyBatis Sql mapper framework for Java](https://github.com/mybatis/mybatis-3)

Summary

---
