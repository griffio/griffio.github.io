---
layout: post
title: More SqlDelight (Regex with PostgreSql)
category: blog
tags: [sqldelight postgresql] 
published: true
summary: sqldelight postgresql regex
---

Supported PostgreSql regex in [SqlDelight](https://sqldelight.github.io/sqldelight/2.0.2/) `2.1.0-SNAPSHOT`

**Regex**

[POSIX regular expressions](https://www.postgresql.org/docs/current/functions-matching.html#FUNCTIONS-POSIX-REGEXP)
 provide a more powerful means for pattern matching than the `LIKE` and `SIMILAR TO` operators.

**Schema**

```sql
CREATE TABLE regexops(
  t TEXT NOT NULL
);
```

**Queries**

`?` is bind argument of type String

```sql

matchRegExOps:
SELECT 
 t ~ ?,
 t ~* ?, 
 t !~ ?,
 t !~* ?
FROM regexops;

matchRegExWhere:
SELECT t
FROM regexops
WHERE t ~ ?;
```

**Application**

```kotlin
sample.regexQueries.matchRegExOps("^a", "B.*ma", "a.c", "t.*m").executeAsList()// Bools
sample.regexQueries.matchRegExWhere("te.*ing").executeAsList()// String
```
**Additional**

`~~` is equivalent to LIKE, and `~~*` corresponds to ILIKE. There are also `!~~` and `!~~*`
operators that represent NOT LIKE and NOT ILIKE

>`GiST` and `GIN` index operator classes that allow you to create an index over a text column for the purpose of very fast similarity searches. These index types support similarity operators, and additionally support trigram-based index searches for LIKE, ILIKE, ~, ~*

```sql
CREATE EXTENSION pg_trgm;

CREATE INDEX trgm_idx ON regexops USING GIST (t gist_trgm_ops);
```
