---
layout: post
title: More SqlDelight using JSON with PostgreSQL
category: blog
tags: sqldelight postgresql 
published: false
summary: sqldelight postgresql json
---

Support for JSON/JSOB data type in SqlDelight `2.1.0-SNAPSHOT`

Repository

https://github.com/griffio/sqldelight-postgres-json/blob/master/README.md

Schema

```sql
CREATE TABLE Recipes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  recipe JSONB NOT NULL,
  createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMPTZ
);
```

See storage parameters https://www.postgresql.org/docs/16/sql-createindex.html#SQL-CREATEINDEX-STORAGE-PARAMETERS

```sql
CREATE INDEX gin_recipe ON Recipes USING GIN (recipe);
```

Queries

See operators https://www.postgresql.org/docs/current/functions-json.html

```sql
get:
SELECT *
FROM Recipes
WHERE id = ?;

getRecipe:
SELECT *
FROM Recipes
WHERE recipe @> ?;

add:
INSERT INTO Recipes(recipe) VALUES (?) RETURNING *;

update:
UPDATE Recipes
SET recipe = jsonb_insert(recipe, :path, :newValue)
WHERE id = :id RETURNING recipe;

pretty:
SELECT jsonb_pretty(recipe)
FROM Recipes
WHERE id = ?;

prettyV:
SELECT to_jsonb(?);

remove:
UPDATE Recipes SET recipe = recipe #- ? WHERE id = ?;

contains:
SELECT *
FROM Recipes WHERE recipe ?? ?; -- ? operator is escaped with extra ? in jdbc
```
