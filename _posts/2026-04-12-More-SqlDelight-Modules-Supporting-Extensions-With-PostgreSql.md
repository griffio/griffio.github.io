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


A single query file can use types, functions from more than one module extension compiled together.

e.g VectorChord and bm25 extensions are in different modules

```sql
CREATE EXTENSION IF NOT EXISTS vchord CASCADE;
CREATE EXTENSION IF NOT EXISTS pg_tokenizer CASCADE;  -- for tokenizer
CREATE EXTENSION IF NOT EXISTS vchord_bm25 CASCADE;   -- for bm25 ranking

SET search_path TO 'tokenizer_catalog, bm25_catalog';

SELECT create_tokenizer('bert', 'model = "bert_base_uncased"');
SELECT create_tokenizer('tocken', 'model = "wiki_tocken"');

CREATE TABLE Documents (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    passage TEXT,
    embedding BM25VECTOR
);

CREATE INDEX documents_embedding_bm25 ON Documents USING bm25 (embedding bm25_ops);

CREATE TABLE items (
    id BIGSERIAL PRIMARY KEY,
    embedding VECTOR(3),
    bits BIT(3)
);

CREATE INDEX idx_embedding_hnsw ON items USING hnsw (embedding vector_l2_ops);

CREATE INDEX idx_embedding_ivfflat ON items USING ivfflat (embedding vector_l2_ops) WITH (lists = 100);

CREATE INDEX idx_embedding_vchordrq ON items USING vchordrq (embedding vector_l2_ops)
WITH (options = '
 [build.internal]
 lists = [1000]
');
```

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
 
A module is a way to extend a dialect with extra grammar for new types and syntax.

It can be as simple as a new type resolver implementation to declare functions but also more complicated type resolution of grammar rules.

The module can be used from a local gradle module or released as a jar dependency.

A module could be as simple as adding some missing functions that you need to a new TypeResolver implementation. 

Modules are chained together by delegation, so that, if one module cannot resolve a function it calls the previous module in the chain (without any knowledge of that module).

When implementing grammar in a new module, overriding parent rules must be performed manually due to limitions in the SqlDelight GrammerKit Composer project [Grammar Kit Composer](https://github.com/sqldelight/Grammar-Kit-Composer)

For example, 

Creating a grammar that adds new types, overrides some extension rules index_method and storage_parameters.

Careful structuring is required to maintain the chain of modules that must work without knowledge of the other modules.

[PgVectorModule chain](https://github.com/griffio/sqldelight-pgvector-module-app/blob/5acc9c67e794c081d7d016e2084ab5bbc238f431/pgvector-module/src/main/kotlin/griffio/PgVectorModule.kt#L39)

