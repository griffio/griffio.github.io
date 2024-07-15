---
layout: post
title: More SqlDelight (Regex with PostgreSql)
category: blog
tags: [sqldelight postgresql] 
published: false
summary: sqldelight postgresql regex
---

Supported PostgreSql regex in [SqlDelight](https://cashapp.github.io/sqldelight/2.0.2/) `2.1.0-SNAPSHOT`

**Regex**

[Matching, Containing and Path Operators](https://www.postgresql.org/docs/current/functions-matching.html#FUNCTIONS-MATCHING)

```sql

selectJsonObjectOperators:
SELECT data ->> 'a', datab -> 'b', data #> '{aa}',
    datab #>> '{bb}', datab - 'b'
FROM TestJson;

selectJsonArrayIndexOperators:
SELECT data -> 0, data ->> 1, data ->> 2, datab - 1
FROM TestJson;

selectJsonBooleanOperators:
SELECT datab @> datac, datac <@ datab, datab ?? 'b',
    datab ??| datad, datab ??& datad, datab @@ '$.b[*] > 0'
FROM TestJson;

selectJsonConcatOperators:
SELECT datab || datac
FROM TestJson;

selectJsonbPath:
SELECT *
FROM TestJson
WHERE datab @> ?;

selectJsonPathEquals:
SELECT *
FROM TestJson
WHERE data ->> 'a' = ? AND datab ->> 'b' = ?;

selectJsonbContains:
SELECT *
FROM TestJson
WHERE datab ?? ?;
```

`~~` is equivalent to LIKE, and `~~*` corresponds to ILIKE. There are also `!~~` and `!~~*`
operators that represent NOT LIKE and NOT ILIKE
