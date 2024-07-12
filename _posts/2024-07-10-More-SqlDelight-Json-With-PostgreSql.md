---
layout: post
title: More SqlDelight (JSON with PostgreSql)
category: blog
tags: sqldelight postgresql 
published: true
summary: sqldelight postgresql json
---

Support for [JSON/JSOB](https://www.postgresql.org/docs/current/datatype-json.html) data type in [SqlDelight](https://cashapp.github.io/sqldelight/2.0.2/) `2.1.0-SNAPSHOT`

**Example**

Store and retrieve JSON/JSONB objects in your database.

**Repository**

[https://github.com/griffio/sqldelight-postgres-json/blob/master/README.md](https://github.com/griffio/sqldelight-postgres-json/blob/master/README.md)

**Schema**

```sql
CREATE TABLE Recipes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  recipe JSONB NOT NULL,
  createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMPTZ
);
```

>GIN (Generalized Inverted Index) indexes are specifically designed for searching within JSONB data. SqlDelight allows you to create GIN indexes on your JSONB columns, dramatically improving query performance.
>
>See storage parameters [https://www.postgresql.org/docs/current/sql-createindex.html#SQL-CREATEINDEX-STORAGE-PARAMETERS
](https://www.postgresql.org/docs/current/sql-createindex.html#SQL-CREATEINDEX-STORAGE-PARAMETERS)

```sql
CREATE INDEX gin_recipe ON Recipes USING GIN (recipe);
```

**Queries**

See operators [https://www.postgresql.org/docs/current/functions-json.html](https://www.postgresql.org/docs/current/functions-json.html)

JSONB

```
jsonb @> jsonb → boolean

jsonb <@ jsonb → boolean

jsonb ? text → boolean

jsonb ?| text[] → boolean

jsonb ?& text[] → boolean

jsonb || jsonb → jsonb

jsonb - text → jsonb

jsonb - text[] → jsonb

jsonb - integer → jsonb

jsonb #- text[] → jsonb

jsonb @? jsonpath → boolean

jsonb @@ jsonpath → boolean
```

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
  """.trimIndent())
  .executeAsOne().also(::println)

  sample.recipeQueries.getRecipe("""{"recipe_name": "Basic Fruit Salad"}""")
  .executeAsOne().also(::println)

  sample.recipeQueries.contains("ingredients")
  .executeAsList().also(::println)

```
