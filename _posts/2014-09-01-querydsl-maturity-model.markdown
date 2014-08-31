---
layout: post
title: querydsl - Usage Maturity Model
category: java
tags: java querydsl
published: true
summary: using querydsl
---

# www.querydsl.com
## query dsl (pron /ˈdiːsəl/)

## Usage Maturity Model

### Level 3 - [Projections](https://github.com/griffio/griffio.github.io/wiki/Projections) and [Delegates](https://github.com/griffio/griffio.github.io/wiki/Delegates)
### Level 2 - [Collections](https://github.com/griffio/griffio.github.io/wiki/Collections) 
### Level 1 - [Predicates](https://github.com/griffio/griffio.github.io/wiki/Predicates)
### Level 0 - No usage (Swamp of POJO)

***

# Predicates
### They're the thing which gets us to the thing.
```java
BooleanExpression isBonus = QSalaryDetail.salaryDetail.salaryName.equalsIgnoreCase("Bonus");
BooleanExpression isGreaterThanThreshold = QSalaryDetail.salaryDetail.salary.goe(paydayThreshold);
BooleanExpression predicate = isBonus.and(isGreaterThanThreshold);
```
### Types
```java
com.mysema.query.types.expr
com.mysema.query.types.path
```
***
```java
BooleanBuilder isSalaryThresholdRelevant = new BooleanBuilder(
    QSalaryDetail.salaryDetail.salaryName.eq(salary.getSalaryName());

    if (!other.salaryName().equalsIgnoreCase("other")) {
        booleanBuilder.and(QSalaryDetail.salaryDetail.salary.gt(thresholdForPayPeriod));
    }
```
***
```java
CaseBuilder caseOfSalaryname = new CaseBuilder()
        .when(QSalaryDetail.salaryDetail.isSalaryRelevant()
            .and(QSalaryDetail.salaryDetail.salary.goe(thresholdForPayPeriod)))
        .then(QSalaryDetail.salaryDetail.salaryName)
        .otherwise("other");
```
***

