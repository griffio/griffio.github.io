---
layout: post
title: More SqlDelight (Enums with PostgreSql)
category: blog
tags: [sqldelight postgresql] 
published: true
summary: sqldelight postgresql support for enums 
---

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
