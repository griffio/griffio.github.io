---
layout: post
title: More SqlDelight (Modules Supporting Extensions With PostgreSql)
category: blog
tags: [sqldelight postgresql extensions] 
published: true
summary: sqldelight postgresql module support for extensions 
---

**Support Postgresql extensions with SqlDelight Modules**

Extending the SqlDelight PostgreSql dialect, currently supports varied but limited core features, is possible
using the module mechanism to implement popular PostgreSql extensions.
 
You maybe using SqlDelight already and need it to support some extra functions and types from an extension.
 
This allows consumers to maintain and develop their own custom functions and types without dumping everything in one dialect codebase when that is not released frequently.

Consumers are encouraged to clone the repo modules below for easier maintenance. 
 
These are currently experimental:

[PgCrypto](https://github.com/griffio/sqldelight-pgcrypto-module-app)

[PgSearch (ParadeDb)](https://github.com/griffio/sqldelight-pgsearch-module-app)
 
[PgTextSearch](https://github.com/griffio/sqldelight-pgtextsearch-module-app)
 
[PgRoonga](https://github.com/griffio/sqldelight-pgroonga-module-app)

[PgVector](https://github.com/griffio/sqldelight-pgvector-module-app)
 
[TimeScaleDb](https://github.com/griffio/sqldelight-timescaledb-module)
 
[VectorChord](https://github.com/griffio/sqldelight-vectorchord-module-app) 

[VectorChord BM25](https://github.com/griffio/sqldelight-bm25-module-app)

Note: limited PostGis support already exists in the core PostgreSql Dialect, this could be moved to a module in the future to make maintenance easier.

**How do modules work?**

The SqlDelight gradle plugin block can take zero or more module definitions.

``` kotlin
sqldelight {
    databases {
        create("Sample") {
            deriveSchemaFromMigrations.set(true)
            migrationOutputDirectory = file("$buildDir/generated/migrations")
            migrationOutputFileFormat = ".sql"
            packageName.set("griffio.queries")
            dialect(libs.sqldelight.postgresql.dialect)
            module("io.github.griffio:sqldelight-bm25:0.0.2")
            module("io.github.griffio:sqldelight-vectorchord:0.0.2")
        }
    }
}
```
 
A module is a way to extend a dialect with extra grammar for types and resolvers for functions etc.

The module is a released as jar file that is developed in a similar way to a dialect.

A module could be as simple as adding some missing functions that you need to a new TypeResolver implementation. 

Modules are chained together by delegation, so that, if one module cannot resolve a function it calls the previous module in the chain (without any knowledge of that module).

When implementing grammar in a new module, overriding parent rules must be performed manually due to limitions in the SqlDelight GrammerKit Composer project [Grammar Kit Composer](https://github.com/sqldelight/Grammar-Kit-Composer)

For example, 

Creating a grammar that adds new types, overrides some extension rules index_method and storage_parameters.

Careful structuring is required to maintain the chain of modules that must work without knowledge of the other modules.

[PgVectorModule chain](https://github.com/griffio/sqldelight-pgvector-module-app/blob/5acc9c67e794c081d7d016e2084ab5bbc238f431/pgvector-module/src/main/kotlin/griffio/PgVectorModule.kt#L39)

