---
layout: post
title: More SqlDelight (Enums with PostgreSql)
category: blog
tags: [sqldelight postgresql] 
published: true
summary: sqldelight postgresql support for enums 
---

These are mapped as String type, there is no compiler support yet for generating as Kotlin Enum classes. Currently type safety outside the database is lost.

It is recommend to use [SqlDelight enum type adapters](https://sqldelight.github.io/sqldelight/2.1.0/jvm_postgresql/types/#enums) instead as these are type safe, there maybe some performance reasons for using native enums or using them as ranges.

PostgreSql doesn't support `CREATE TYPE IF EXISTS` ... or `CREATE OR REPLACE TYPE`. Using `CREATE TYPE` with initialization scripts is not idempotent.

**Example**

[sqldelight-postgres-enums](https://github.com/griffio/sqldelight-postgres-enums)

**Schema**

```sql

CREATE TYPE PRIORITY AS ENUM('low','medium','high');

CREATE TABLE Requests(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    priority PRIORITY NOT NULL,
    request_date DATE NOT NULL
);

```

Other supported DDL

```sql
CREATE TYPE COLORS AS ENUM ('red', 'purple', 'blue');

ALTER TYPE COLORS RENAME VALUE 'purple' TO 'mauve';
ALTER TYPE COLORS ADD VALUE 'orange' AFTER 'red';
```

```sql
DROP TYPE IF EXISTS COLORS; -- only succeeds if there are no table columns using type
```
