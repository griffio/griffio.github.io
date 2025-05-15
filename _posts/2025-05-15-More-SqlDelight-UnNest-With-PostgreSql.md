---
layout: post
title: More SqlDelight (UnNest with PostgreSql)
category: blog
tags: [sqldelight postgresql] 
published: true
summary: sqldelight postgresql unnest table function 
---

Initial Support for  [UnNest](https://www.postgresql.org/docs/17/queries-table-expressions.html#QUERIES-TABLEFUNCTIONS) in [SqlDelight](https://github.com/sqldelight/sqldelight/pull/5673) `2.1.0-SNAPSHOT`

**Example**

[https://github.com/griffio/sqldelight-postgres-unnest](https://github.com/griffio/sqldelight-postgres-unnest)

**Schema**

```sql
CREATE TABLE Business(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    zipcodes TEXT[] NOT NULL,
    headcounts INTEGER[] NOT NULL
);

CREATE TABLE Users (
   name TEXT NOT NULL,
   age INTEGER NOT NULL
);
```

**Queries**

```sql

select:
SELECT name, location.headcount, location.zipcode
FROM Business, UNNEST(zipcodes, headcounts) AS location(zipcode, headcount);

counts:
SELECT name, UNNEST(headcounts) AS headcount
FROM Business
ORDER BY headcount DESC;

array:
SELECT unnest(ARRAY[1,2]);

insertUsers:
INSERT INTO Users (name, age)
SELECT * FROM UNNEST(?::TEXT[], ?::INTEGER[]);

updateUsers:
UPDATE Users
SET age=updates.updated_age
FROM UNNEST(?::TEXT[], ?::INTEGER[]) AS updates(name, updated_age)
WHERE Users.name = updates.name;

deleteUsers:
DELETE FROM Users
WHERE (name, age) IN (
  SELECT *
  FROM UNNEST(?::TEXT[], ?::INTEGER[]) AS u(name, age)
);

selectLocations:
SELECT DISTINCT b.*
FROM Business b
JOIN LATERAL UNNEST(b.zipcodes) AS loc(zipcode) ON loc.zipcode ILIKE '%' || :query || '%';
--Same as above can also be written without explict join
--SELECT DISTINCT b.*
--FROM Business b, UNNEST(b.zipcodes) AS loc(zipcode) WHERE loc.zipcode ILIKE '%' || :query || '%';

```
