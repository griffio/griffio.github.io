---
layout: post
title: "More Kotlin (Sql Persistence Comparison)"
category: programming
tags: [kotlin]
published: true
description: kotlin sql persistence comparison of libraries 
---

*Database persistence using Sql from Kotlin*

The libraries listed below, you will see, are typically described as a light weight `Object Relational Mapper` or as a `Sql Row Mapper`.

* Exposed
* Komapper
* Kotysa
* Ktorm
* SqlDelight
* Jdbi
* JOOQ
* MyBatis

Another approach is called [Active Record](https://en.wikipedia.org/wiki/Active_record_pattern) where persistence operations are included in the Objects behaviour.

An `Object Relational Mapper` translation layer is responsible to load and store your Application's Entity model as a representation of the relational schema.
There exists a so-called [impedance mismatch](https://agiledata.org/essays/impedanceMismatch.html) where, for example, Kotlin has Maps, Sets and Ordered/UnOrdered Collections
but no concept of Tables, Columns and Rows. What can be surprising is that all the rows in the database could be pulled across to keep
the semantics of, for example, a Set or ordered collection in the Application. How does a Relational Database handle Object Orientated Polymorphism?

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
* Require only Android support where SqlLite is expected
  * See SqlDelight or Google's [Room](https://developer.android.com/reference/androidx/room/package-summary)
* Are the library dependencies compatible with your applications third-party transitive dependencies - Bill of Materials
  * For example, to support Json fields, [Jackson](https://github.com/FasterXML/jackson) is often used 
* Libraries that are strongly typed Sql via Dsl - what is the fidelity required to support your Sql dialect?
  * Jooq's Dsl has high fidelity Sql support compared to the other Kotlin Dsl libraries
  * Look for support of Merge or Upsert statements, requirement for this should be identified early 
  * Does inserting records use `returning` to avoid reloading new records to fetch the Identifier?
* Has support for safely creating dynamic Sql
  * SqlInjection prevention
  * Additional criteria e.g Where, Order By 
* Are you requiring mapping Json data types supported natively by the Database? 
* Are you likely to change database vendors and need Sql to be generated for different dialects?
  * Changing database vendors is less common in practice and results in over abstracting/hiding of Sql when there is no need
* Typically, libraries use `Jdbc` or support async reactive (non-blocking) drivers [R2dbc](https://r2dbc.io/)
  * If you want coroutine support see [jasync-sql](https://github.com/jasync-sql/jasync-sql) for a Kotlin async driver 
* Can the library use incremental database migrations support for schema changes?
  * [liquibase](https://www.liquibase.org/) or [flywaydb](https://flywaydb.org/)
  * Using R2dbc may require special support
  
---

**Designed for Kotlin**

The following libraries are Kotlin centric even though they may use Java libraries like Jdbc, logging, Jackson

Other Kotlin libraries not covered here but worth comparing are [Zeko-Sql-Builder](https://github.com/darkredz/Zeko-SQL-Builder) and
[Zeko-Data-Mapper](https://github.com/darkredz/Zeko-Data-Mapper). These are in less active development.

A recent Kotlin jdbc wrapper to use is [lite-for-jdbc](https://github.com/target/lite-for-jdbc) for common database interactions. 

Another is [kotlin-jdsl](https://github.com/line/kotlin-jdsl). Kotlin JDSL provides a domain-specific language (DSL) based on KClass and KProperty instead of code generation to provide type safe dynamic queries.

[terpal-sql](https://github.com/deusaquilus/terpal-sql/) is a Kotlin library that allows you to write SQL queries in Kotlin using interpolated strings in an SQL-injection-safe way.

[kotliquery](https://github.com/seratch/kotliquery) Jdbc made usefull with Kotlin 

The Golang project [sqlc](https://github.com/kyleconroy/sqlc) includes code generation from the schema for Kotlin jdbc clients. 

---

**Exposed** [Kotlin Sql Framework](https://github.com/JetBrains/Exposed)

Summary

* Exposed is a self-described light weight `Object Relational Mapper` library with Sql Dsl and Crud Dao Api
* Postgres MySql MariaDB Sqlite H2 Oracle Sql Server
* Jdbc only
* No Annotations
* No Code generation
* Kotlin Native not supported yet
* Supports many-to-one, many-to-many references
* Supports Lazy loading and eager loading
* No direct Merge or Upsert support 
* Returns id after insert
* No internal support for schema migrations

---

**Komapper** [Kotlin Orm for Jdbc and R2dbc](https://github.com/komapper/komapper)

Summary

* Komapper is an `Object Relational Mapper` library with Sql Dsl for JVM server side 
* Postgres MySql MariaDB H2 Oracle Sql Server
* Jdbc and R2dbc supported
* Annotations
* Code generation at compile-time
* Kotlin Native not supported 
* Supports many-to-one, many-to-many references
* Upsert support with Insert onDuplicateKeyUpdate
* Returns id after insert
* No internal support for schema migrations

---

**Kotysa** [The idiomatic way to write type-safe Sql in Kotlin](https://github.com/ufoss-org/kotysa/)

Summary

* Kotysa is a light `Object Relational Mapper` with type-safe Sql Dsl for Jvm and Android
* Postgres MySql MariaDB Sqlite H2 Oracle Sql Server
* Jdbc and R2dbc supported
* No Annotations
* No Code generation
* No associations
* No direct Merge or Upsert support
* Returns id after insert
* No internal support for schema migrations

---

**Ktorm** [A lightweight Orm framework for Kotlin with strong-typed Sql Dsl and sequence Api.](https://github.com/kotlin-orm/ktorm)

Summary
* Ktorm is a lightweight Orm Framework for Kotlin directly based on pure Jdbc
* Postgres MySql Sqlite Oracle Sql Server
* Jdbc and R2dbc supported [ktorm-r2dbc](https://github.com/kotlin-orm/ktorm-r2dbc)
* No third-party dependencies
* No annotations
* Code generation possible [ktorm-ksp](https://github.com/kotlin-orm/ktorm-ksp)
* Some associations with foreign key - possible to extend 
* Upsert supported in Dialects
* Returns id after insert
* No internal support for schema migrations

---

**SqlDelight** [Generates typesafe Kotlin APIs from Sql](https://github.com/cashapp/sqldelight) 

Summary
* SqlDelight generates typesafe Kotlin APIs from your Sql statements
* Limited support for vendor Sql - check that all your Dml and Ddl are supported
* Sqlite has best support (Postgres MySql HSql in development)
* Jdbc, native drivers supported, async R2dbc in development
* Schema first development from Sql statements
* Compile time checking of Sql
* No annotations
* Kotlin code generation
* Database column naming is replicated in Kotlin code
* No Entity associations
* No type safe use of dynamic Sql (e.g change orderBy, criteria)
* Upsert supported in Dialects
* Returns id after insert
* Support for schema migrations, Flyway etc - some Ddl not supported yet
* SqlDelight project may not receive any further releases

---

**Designed for Java with Kotlin support**

The following libraries are Java centric with some Kotlin extension functions for use with Generics types.

I have intentionally left out traditional Java frameworks [Spring Data Jpa](https://github.com/spring-projects/spring-data-jpa) 

---

**Jdbi** [Designed to provide convenient tabular data access in Java; including templated Sql, parameterized and strongly typed queries, and Streams integration](https://github.com/jdbi/jdbi)

Summary

* Jdbi is built on top of Jdbc. If your database has a Jdbc driver, you can use Jdbi with it.
* Postgres MySql Sqlite Oracle Sql Server
* Jdbc supported
* Annotations supported
* No Entity associations
* Upsert supported in Sql
* Returns id after insert
* Kotlin extensions
* Support for schema migrations

---

**JOOQ** [The best way to write Sql in Java](https://github.com/jOOQ/jOOQ)

Summary

* jOOQ generates Java code from your database and lets you build type safe Sql queries through its fluent Api
* Derby, DuckDb, Firebird, HSqlDb, Ignite, MariaDb, MySql PostgreSql, SqLite, Trino, YugabyteDb plus many more commercial Dbs 
* Code Generation
* Jdbc supported
* Annotations supported
* Entity associations created adhoc
* Upsert supported by Sql dialect
* Returns id after insert
* Kotlin extensions
* Support for schema migrations

---

**MyBatis** [Sql mapper framework for Java](https://github.com/mybatis/mybatis-3)

Summary

* MyBatis eliminates most JDBC code and manual setting of parameters and retrieval of results
* Postgres MySql Sqlite Oracle Sql Server
* Code Generation [possible](https://mybatis.org/generator/)
* Uses Xml
* Dynamic SQL
* Jdbc supported
* Annotations supported
* Entity associations
* Upsert supported by Sql dialect
* Kotlin mapper extensions
* Support for schema migrations
