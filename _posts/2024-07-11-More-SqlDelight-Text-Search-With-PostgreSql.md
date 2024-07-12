---
layout: post
title: More SqlDelight (Text Search with PostgreSql)
category: blog
tags: sqldelight postgresql 
published: true
summary: sqldelight postgresql text search
---

Support for [TSVECTOR](https://www.postgresql.org/docs/current/datatype-textsearch.html) data type in [SqlDelight](https://cashapp.github.io/sqldelight/2.0.2/) `2.1.0-SNAPSHOT`

**Example**

Add Full Text Search to your database.

**Repository**

[https://github.com/griffio/sqldelight-postgres-textsearch/blob/master/README.md](https://github.com/griffio/sqldelight-postgres-textsearch/blob/master/README.md)

**Schema**

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;
```

```sql
CREATE TABLE PgWeb (
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
title TEXT,
body TEXT,
last_mod_date TIMESTAMPTZ
);
```

Add a stored generated column to automatically update from the source data. This example is a concatenation of title and body, using coalesce to ensure that one field will still be indexed when the other is NULL - [textsearch-tables](https://www.postgresql.org/docs/16/textsearch-tables.html#TEXTSEARCH-TABLES-INDEX)

```sql
ALTER TABLE pgweb
ADD COLUMN textsearchable_index_col TSVECTOR
GENERATED ALWAYS AS (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(body, ''))) STORED;
```

Create a GIN index to speed up the search

>The [pgtrgm](https://www.postgresql.org/docs/current/pgtrgm.html) module provides GiST and GIN index operator classes that allow you to create an index over a text column for the purpose of very fast similarity searches

```sql
CREATE INDEX pgweb_idx ON pgweb USING GIN (to_tsvector('english', title || ' ' || body));
CREATE INDEX textsearch_idx ON pgweb USING GIN (textsearchable_index_col);
CREATE INDEX pgweb_body_trgm ON pgweb USING GIST (body gist_trgm_ops(siglen=16));
```

**Queries**

```sql
bodySearchable:
SELECT title
FROM pgweb
WHERE to_tsvector('english', body) @@ to_tsquery('english', ?)
ORDER BY last_mod_date DESC
LIMIT 10;

titleBodySearchable:
SELECT title
FROM pgweb
WHERE to_tsvector(title || ' ' || body) @@ to_tsquery(?)
ORDER BY last_mod_date DESC
LIMIT 10;

textSearchable:
SELECT title
FROM pgweb
WHERE textsearchable_index_col @@ to_tsquery(?)
ORDER BY last_mod_date DESC
LIMIT 10;

regexSearch:
SELECT title
FROM pgweb
WHERE body LIKE '%' || ? || '%'
ORDER BY last_mod_date DESC
LIMIT 10;
```

**Application**

```kotlin
    sample.pgWebQueries.bodySearchable("neutrino & sun")
        .executeAsList().also(::println)

    sample.pgWebQueries.titleBodySearchable("neutrino | sun")
        .executeAsList().also(::println)

    sample.pgWebQueries.textSearchable("neutrino | gravity")
        .executeAsList().also(::println)

    sample.pgWebQueries.regexSearch("atomic")
        .executeAsList().also(::println)
```
