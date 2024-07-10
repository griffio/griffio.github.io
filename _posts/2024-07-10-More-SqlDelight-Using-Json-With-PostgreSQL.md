---
layout: post
title: More SqlDelight using JSON with PostgreSQL
category: blog
tags: sqldelight postgresql 
published: true
summary: sqldelight postgresql json
---

## Latest support for JSON/JSOB data type in SqlDelight `2.1.0-SNAPSHOT`

### Example

**Repository**

https://github.com/griffio/sqldelight-postgres-json/blob/master/README.md

**Schema**

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

**Queries**

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

**Application**

```kotlin

val pizza = sample.recipeQueries.add(
  """
  {
    "recipe_name": "Give a slice of Pizza",
    "ingredients": [
      {
        "pizza": {
          "amounts": [
            {
              "amount": 1,
              "unit": "slice"
            }
          ]
        }
      }
    ],
    "steps": [
      {
        "step": "Cut out an equal slice from the whole pizza."
      }
    ]
  }
""".trimIndent()
).executeAsOne().also(::println)

sample.recipeQueries.getRecipe("""{"recipe_name": "Basic Fruit Salad"}""").executeAsOne().also(::println)

sample.recipeQueries.contains("ingredients").executeAsList().also(::println)

```
