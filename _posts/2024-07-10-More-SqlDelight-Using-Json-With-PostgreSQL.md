---
layout: post
title: More SqlDelight using JSON with PostgreSQL
category: blog
tags: sqldelight postgresql 
published: false
summary: sqldelight postgresql json
---

Repository

https://github.com/griffio/sqldelight-postgres-json/blob/master/README.md

Setup schema

```sql
CREATE TABLE Recipes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  recipe JSONB NOT NULL,
  createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMPTZ
);
```

```sql
CREATE INDEX gin_recipe ON Recipes USING GIN (recipe);
```

Queries

```
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
