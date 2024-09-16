---
layout: post
title: More SqlDelight (Lateral Joins with PostgreSql)
category: blog
tags: [sqldelight postgresql] 
published: true
summary: sqldelight postgresql lateral joins 
---

Initial Support [Lateral Joins](https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-LATERAL) in [SqlDelight](https://cashapp.github.io/sqldelight/2.0.2/) `2.1.0-SNAPSHOT`

**Not supported in SqlDelight**: Lateral joins on table expressions e.g json, arrays, sets, generate_series

Sub SELECT queries appearing after the FROM clause can be preceded by the key word LATERAL. This allows sub queries to reference columns provided by the preceding FROM tables.
(Without LATERAL, each subquery is evaluated independently and so cannot cross-reference any other FROM table column.)

Lateral joins are particularly useful for operations that need to be performed on a per-row basis from the left table, especially when involving limits or aggregations.

**Example**

With lateral joins, the calculations can be defined just once. The lateral join can then reference those calculations in other parts of the query.

[https://github.com/griffio/sqldelight-postgres-lateral-join](https://github.com/griffio/sqldelight-postgres-lateral-join)

[how-to-use-lateral-joins-in-postgresql](https://popsql.com/learn-sql/postgresql/how-to-use-lateral-joins-in-postgresql)

**Schema**

```sql
CREATE TABLE Kickstarter_Data (
    pledged NUMERIC,
    fx_rate NUMERIC,
    backers_count INTEGER,
    launched_at NUMERIC,
    deadline NUMERIC,
    goal INTEGER
);
```

**Queries**

```sql
select:
SELECT
    pledged_usd,
    avg_pledge_usd,
    duration,
    (usd_from_goal / duration) AS usd_needed_daily
FROM Kickstarter_Data,
    LATERAL (SELECT pledged / NULLIF(fx_rate, 0) AS pledged_usd) pu,
    LATERAL (SELECT pledged_usd / NULLIF(backers_count, 0) AS avg_pledge_usd) apu,
    LATERAL (SELECT goal / NULLIF(fx_rate, 0) AS goal_usd) gu,
    LATERAL (SELECT goal_usd - pledged_usd AS usd_from_goal) ufg,
    LATERAL (SELECT (deadline - launched_at) / 86400.00 AS duration) dr;
```

**Application**

```
  sample.kickStarterQueries.select().executeAsList()
```

Each row calculation

```kotlin

public data class Select(
    public val pledged_usd: BigDecimal?,
    public val avg_pledge_usd: BigDecimal?,
    public val duration: BigDecimal?,
    public val usd_needed_daily: BigDecimal?,
)
```

