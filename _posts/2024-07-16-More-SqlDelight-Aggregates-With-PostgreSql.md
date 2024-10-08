---
layout: post
title: More SqlDelight (Aggregates with PostgreSql)
category: blog
tags: [sqldelight postgresql] 
published: true
summary: sqldelight postgresql aggregates
---

Support [Aggregate Expressions](https://www.postgresql.org/docs/current/sql-expressions.html#SYNTAX-AGGREGATES) in [SqlDelight](https://sqldelight.github.io/sqldelight/2.0.2/) `2.1.0-SNAPSHOT`

Using an aggregate function reduces multiple inputs to a single output value, such as the sum or average of the inputs.
An aggregate expression represents the use of an aggregate function across the rows selected by a query.

**Example**

Return rows containing aggregate `tags` column produced by functions `array_agg` and `string_agg`

[https://github.com/griffio/sqldelight-postgres-aggregate-expressions](https://github.com/griffio/sqldelight-postgres-aggregate-expressions)

**Schema**

```sql
CREATE TABLE Authors (
  id INTEGER PRIMARY KEY,
  fullname TEXT,
  bio TEXT,
  image TEXT
);

CREATE TABLE Articles (
  id INTEGER PRIMARY KEY,
  slug TEXT,
  title TEXT,
  description TEXT,
  body TEXT,
  author_id INTEGER REFERENCES Authors(id),
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);

CREATE TABLE Tags (
  id INTEGER PRIMARY KEY,
  article_id INTEGER REFERENCES Articles(id),
  tag TEXT
);
```

**Queries**

```sql
getArticlesWithAuthor:
SELECT Articles.id, Articles.slug, Articles.title, Articles.description,
    COALESCE (string_agg (DISTINCT Tags.tag, ',' ORDER BY Tags.tag DESC)
    FILTER (WHERE Tags.tag IS NOT NULL)) AS articleTags
FROM Articles
    LEFT JOIN Tags ON Articles.id = Tags.article_id
    JOIN Authors ON Articles.author_id = Authors.id
GROUP BY Articles.id, Authors.id;

getArticles:
SELECT
    Articles.id,
    Articles.slug,
    Articles.title,
    Articles.description,
    array_agg(DISTINCT Tags.tag) AS tags
FROM
    Articles
    LEFT JOIN Tags ON Articles.id = Tags.article_id
GROUP BY
    Articles.id;
```

**Application**

```
    sample.articlesQueries.getArticlesWithAuthor().executeAsList()
    sample.articlesQueries.getArticles().executeAsList()
```

The tags are aggregated by a delimiter into the `articleTags` property 

```kotlin

public data class GetArticlesWithAuthor(
  public val id: Int,
  public val slug: String?,
  public val title: String?,
  public val description: String?,
  public val articleTags: String,
)
```

The tags are aggregated by an array into the `tags` property

```kotlin
public data class GetArticles(
  public val id: Int,
  public val slug: String?,
  public val title: String?,
  public val description: String?,
  public val tags: Array<String?>,
)
```
