---
layout: post
title: More SqlDelight (Json Aggregates with PostgreSql)
category: blog
tags: [sqldelight postgresql] 
published: true
summary: sqldelight postgresql support for json aggregates 
---

Support for Json Aggregates in [SqlDelight](https://github.com/sqldelight/sqldelight/pull/5957) `2.2.0-SNAPSHOT`

Using functions `json_agg` , `jsonb_agg` , `json_object_agg` , `jsonb_object_agg` with `FILTER` is useful for working with schema-less column data

```sql
SELECT json_agg(data) FILTER (WHERE (data->>'in_stock')::BOOLEAN) FROM SomeTable;

SELECT jsonb_agg(data->'color') FILTER (WHERE data ?? 'color') AS colors
FROM SomeTable;

SELECT jsonb_object_agg(key, value ORDER BY key DESC) FILTER (WHERE key IS NOT NULL)
FROM SomeTable;

SELECT jsonb_object_agg_strict(key, value) FROM SomeTable;
```

**Example**

[sqldelight-postgres-json-aggregates](https://github.com/griffio/sqldelight-postgres-json-aggregates)

**Schema**

```sql
CREATE TABLE Topics (
  topic_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  type TEXT NOT NULL,
  ups INTEGER NOT NULL DEFAULT 0 CHECK (ups >= 0),
  downs INTEGER NOT NULL DEFAULT 0 CHECK (downs >= 0),
  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  spam BOOLEAN NOT NULL DEFAULT FALSE,
  date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  score INTEGER GENERATED ALWAYS AS (ups - downs) STORED
);

CREATE TABLE Topic_Data (
  topic_id BIGINT NOT NULL REFERENCES Topics(topic_id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  value JSONB NOT NULL,
  PRIMARY KEY (topic_id, key)
);
```

```sql
SELECT
  t.topic_id,
  t.type,
  t.ups,
  t.downs,
  t.deleted,
  t.spam,
  t.date,
  t.score,
  COALESCE(
    jsonb_object_agg_strict(d.key, d.value) FILTER (WHERE d.key IS NOT NULL), '{}'::JSONB
  ) AS data
FROM Topics t
LEFT JOIN Topic_Data d USING (topic_id)
WHERE t.type = :type
GROUP BY
  t.topic_id, t.type, t.ups, t.downs, t.deleted, t.spam, t.date, t.score
ORDER BY t.date DESC
LIMIT :limit OFFSET :offset;
```
