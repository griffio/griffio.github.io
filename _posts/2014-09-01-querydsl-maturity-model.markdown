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
# Collections

### CollQueryFactory

com.mysema.query.collections

Query entities that are generated can be used with a CollQueryFactory to replace this Mundane Java code that maps an input collection to an output collection.

### Before 
```java
private List<String> uniqueSalaryNames(Collection<EmployeeSalary> employeeSalaries) {
    Set<String> result = Sets.newHashSet();
        for (EmployeeSalary salary : employeeSalaries) {
            for (SalaryDetail detail : salary.getSalaryDetails()) {
                if (RelevantSalaryUtil.isSalaryRelevant(detail.getSalaryName())) {
                    result.add(detail.getSalaryName());
                }
            }
        }
    return newArrayList(result);
}
```
### After 
```java
List<String> uniqueSalaryNames = CollQueryFactory
    .from(QEmployeeSalary.employeeSalary, employeeSalary)
    .innerJoin(QEmployeeSalary.employeeSalary.salaryDetail, QSalaryDetail.salaryDetail)
    .where(QSalaryDetail.salaryDetail.isSalaryRelevant())
    .distinct()
    .list(QEmployeeSalary.employeeSalary.salaryName);
```
***
Aggregate or 'fold' a collection using Mundane Java. Even the Guava library doesn't advocate higher-order functional programming using Java.       
### Before 
```java
public BigDecimal sum(List<SalaryDetail> salaryDetails) {
   BigDecimal sum = BigDecimal.ZERO;
   for (SalaryDetail salaryDetail : salaryDetails) {
      sum = sum.add(salaryDetail.getSalary());
   }
   return sum;
};
```
### After 
```java
BigDecimal sum = CollQueryFactory
   .from(QSalaryDetail.salaryDetail, salaryDetails)
   .singleResult(QSalaryDetail.salaryDetail.salary.sum());     
```
***
### ResultTransformer

com.mysema.query

A post-processor transformer for aggregation that works with com.mysema.query.group.* classes.

Takes a collection and returns a collection containing a new projection of the aggregate for each group. Here, multiple salaries with the same name will be grouped into a new element containing the sum total of the group.
```java
List<SalaryDetail> aggregatedSalaries = CollQueryFactory.from(QSalaryDetail.salaryDetail, salaryDetails)
    .transform(GroupBy.groupBy(QSalaryDetail.salaryDetail.salaryName)
    .list(QSalaryDetail.create(QSalaryDetail.salaryDetail.salaryName,    
        GroupBy.sum(QSalaryDetail.salaryDetail.salary))));
```
