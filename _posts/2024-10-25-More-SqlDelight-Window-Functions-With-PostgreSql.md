---
layout: post
title: More SqlDelight (Window Functions with PostgreSql)
category: blog
tags: [sqldelight postgresql] 
published: true
summary: sqldelight postgresql window functions 
---

Initial Support for  [Window Function Calls](https://www.postgresql.org/docs/current/sql-expressions.html#SYNTAX-WINDOW-FUNCTIONS) in [SqlDelight](https://sqldelight.github.io/sqldelight/2.0.2/) `2.1.0-SNAPSHOT`

**Not currently supported in SqlDelight grammar is WINDOW clause**
```sql
SELECT wf1() OVER w
FROM table_name 
WINDOW w AS (PARTITION BY c1 ORDER BY c2);
```

**Example**

A window function performs a calculation across a set of table rows.
This is comparable to the type of calculation that can be done with an aggregate function.
However, window functions do not cause rows to become grouped into a single output row like
non-window aggregate calls would. Instead, the window function is able to access more than just the
current row of the query result and how it relates in aggregate to the other rows (e.g. rank, row number)

**Schema**
```sql
CREATE TABLE scores (
  name TEXT NOT NULL,
  points INTEGER NOT NULL
);
```

**Queries**

```sql
select:
SELECT
  name,
  RANK() OVER (ORDER BY points DESC) rank,
  DENSE_RANK() OVER (ORDER BY points DESC) dense_rank,
  ROW_NUMBER() OVER (ORDER BY points DESC) row_num,
  LAG(points) OVER (ORDER BY points DESC) lag,
  LEAD(points) OVER (ORDER BY points DESC) lead,
  NTILE(6) OVER (ORDER BY points DESC) ntile,
  CUME_DIST() OVER (ORDER BY points DESC) cume_dist,
  PERCENT_RANK() OVER (ORDER BY points DESC) percent_rank
FROM scores;

SELECT
  name,
  avg(points) OVER (
    PARTITION BY name
    ORDER BY points
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS moving_avg
FROM scores;

SELECT
  name,
  sum(points) OVER (
    PARTITION BY name
    ORDER BY points
    RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    EXCLUDE CURRENT ROW 
  ) AS running_total
FROM scores;

```


