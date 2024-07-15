---
layout: post
title: More SqlDelight (Regex with PostgreSql)
category: blog
tags: [sqldelight postgresql] 
published: true
summary: sqldelight postgresql regex
---

Supported PostgreSql regex in [SqlDelight](https://cashapp.github.io/sqldelight/2.0.2/) `2.1.0-SNAPSHOT`

**Regex**

[Matching](https://www.postgresql.org/docs/current/functions-matching.html#FUNCTIONS-MATCHING)

**Schema**

```sql
CREATE TABLE regexops(
  t TEXT NOT NULL
);
```

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

**Additional**

`~~` is equivalent to LIKE, and `~~*` corresponds to ILIKE. There are also `!~~` and `!~~*`
operators that represent NOT LIKE and NOT ILIKE
