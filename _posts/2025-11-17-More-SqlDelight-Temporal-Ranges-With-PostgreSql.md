---
layout: post
title: More SqlDelight (Temporal Ranges with PostgreSql)
category: blog
tags: [sqldelight postgresql] 
published: true
summary: sqldelight postgresql support for temporal ranges 
---

Support for Temporal Ranges in [SqlDelight](https://github.com/sqldelight/sqldelight/pull/5297) `2.2.0`

see [https://www.postgresql.org/docs/current/rangetypes.html#RANGETYPES-CONSTRAINT](https://www.postgresql.org/docs/current/rangetypes.html#RANGETYPES-CONSTRAINT)

**Example**

[sqldelight-postgres-temporal-ranges](https://github.com/griffio/sqldelight-postgres-temporal-ranges)

**Schema**

You can use the btree_gist extension to define exclusion constraints on plain scalar data types, which can then be combined with range exclusions for maximum flexibility.

Allow only appointments on the hour or at half past the hour. Appointments are allowed in 30, 60, 90 and 120 minute durations. Overlapping appointments are not allowed by the exclusion constraint.

```sql
CREATE EXTENSION btree_gist;

CREATE TABLE Appointments(
  slot TSTZRANGE NOT NULL CHECK( date_part('minute', LOWER(slot)) IN (0, 30) AND date_part('minute', UPPER(slot)) IN (0, 30)),
  duration INT NOT NULL GENERATED ALWAYS AS ( EXTRACT (epoch FROM UPPER(slot) - LOWER(slot)) / 60 ) STORED CHECK(duration IN (30, 60, 90, 120)),
  EXCLUDE USING GIST(slot WITH &&)
);

```

Return the empty time slots (as a multirange) by subtracting existing appointments from the user’s declared availability (as a multirange).

```sql
selectAvailableAppointments:
SELECT tstzmultirange(:user_availability::TSTZMULTIRANGE) - range_agg(slot) AS available_appointments
FROM Appointments
WHERE slot && tstzrange(:appointments_range::TSTZRANGE);

```
