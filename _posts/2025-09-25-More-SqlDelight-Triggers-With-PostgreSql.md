---
layout: post
title: More SqlDelight (Triggers with PostgreSql)
category: blog
tags: [sqldelight postgresql] 
published: true
summary: sqldelight postgresql support for triggers and trigger functions 
---

Initial support for  [CREATE TRIGGER](https://www.postgresql.org/docs/current/sql-createtrigger.html)) in [SqlDelight](https://github.com/sqldelight/sqldelight/pull/5932) `2.2.0-SNAPSHOT`

Limited support for [Pg/PlSql](https://www.postgresql.org/docs/current/plpgsql-trigger.html) to implement basic trigger functions e.g `IF ELSEIF ELSE` conditionals and trigger variables `TG_OP`.

**Example**

[https://github.com/griffio/sqldelight-postgres-trigger-function](https://github.com/griffio/sqldelight-postgres-trigger-function)

**Schema**

```sql

CREATE TABLE accounts(
  id INTEGER GENERATED ALWAYS AS IDENTITY,
  balance REAL
);

CREATE TABLE accounts_audit (
   account_id INTEGER,
   balance REAL,
   changed_on TIMESTAMP NOT NULL
);

CREATE OR REPLACE FUNCTION account_audit_update()
RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
BEGIN
    IF new.balance <> old.balance THEN
       INSERT INTO accounts_audit(account_id, balance, changed_on)
       VALUES (old.id, old.balance, NOW());
    END IF;
    RETURN new;
END;
$$;

CREATE OR REPLACE TRIGGER account_audit_update
BEFORE UPDATE OF balance
ON accounts
FOR EACH ROW
EXECUTE FUNCTION account_audit_update();

CREATE TABLE organizations (
  id INTEGER GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE OR REPLACE FUNCTION organizations_set_updated_at()
RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
BEGIN
  new.updated_at := NOW();
  RETURN new;
END;
$$;

CREATE TRIGGER organizations_set_updated_at
BEFORE UPDATE
ON organizations
FOR EACH ROW
EXECUTE FUNCTION organizations_set_updated_at();

CREATE TABLE user_profile (
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  password_strength TEXT
);

CREATE OR REPLACE FUNCTION user_profile_password_strength()
RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
BEGIN

  IF TG_OP = 'UPDATE' AND new.password IS NOT DISTINCT FROM old.password THEN
    RETURN new;
  END IF;

  IF length(new.password) < 7 THEN
    new.password_strength := 'weak';
  ELSIF length(new.password) < 12 THEN
    new.password_strength := 'medium';
  ELSE
    new.password_strength := 'strong';
  END IF;

  RETURN new;
END;
$$;

CREATE TRIGGER user_profile_password_strength
BEFORE INSERT OR UPDATE OF password
ON user_profile
FOR EACH ROW
EXECUTE FUNCTION user_profile_password_strength();

CREATE TABLE emp (
    empname           TEXT NOT NULL,
    salary            INTEGER
);

CREATE TABLE emp_audit(
    operation         CHAR(1)   NOT NULL,
    stamp             TIMESTAMP NOT NULL,
    userid            TEXT      NOT NULL,
    empname           TEXT      NOT NULL,
    salary            INTEGER
);

CREATE OR REPLACE FUNCTION process_emp_audit()
RETURNS TRIGGER LANGUAGE PLPGSQL AS $$
BEGIN
    --
    -- Create a row in emp_audit to reflect the operation performed on emp,
    -- making use of the special variable TG_OP to work out the operation.
    --
    IF (TG_OP = 'DELETE') THEN
           INSERT INTO emp_audit SELECT 'D', NOW(), CURRENT_USER, old.empname, old.salary;
       ELSIF (TG_OP = 'UPDATE') THEN
           INSERT INTO emp_audit SELECT 'U', NOW(), CURRENT_USER, new.empname, new.salary;
       ELSIF (TG_OP = 'INSERT') THEN
           INSERT INTO emp_audit SELECT 'I', NOW(), CURRENT_USER, new.empname, new.salary;
       END IF;
    RETURN NULL; -- result is ignored since this is an AFTER trigger
END;
$$;

CREATE TRIGGER process_emp_audit
AFTER INSERT OR UPDATE OR DELETE
ON emp
FOR EACH ROW EXECUTE FUNCTION process_emp_audit();

```
