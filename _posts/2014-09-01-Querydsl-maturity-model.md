---
layout: post
title: Querydsl - Usage Maturity Model
category: java
tags: java querydsl
published: true
summary: using querydsl
---

## [www.querydsl.com](http://www.querydsl.com)

## Level 4 - [Delegates](#delegates)

## Level 3 - [Projections](#projections)

## Level 2 - [Collections](#collections) 

## Level 1 - [Predicates](#predicates)

## Level 0 - No usage (Swamp of POJO)

---

## Predicates

### Predicates aren't the thing. They're the thing that gets us to the thing.

Describes logical composable expressions about an entity that are separate from operators acting on the entity itself.

Predicates can be represented as Specifications, e.g. "isBonusAboveThreshold", that describes an explicit constraint.

#### Before

~~~java
boolean isBonusSalary = salaryDetail.getSalaryName().equalsIgnoreCase("Bonus");
boolean isGreaterThanThreshold = salaryDetail.getSalary().compareTo(payThreshold) >= 0;
boolean isBonusSalary && isGreaterThanThreshold;
~~~

#### After

~~~java
BooleanExpression isBonusSalary = QSalaryDetail.salaryDetail.salaryName.equalsIgnoreCase("Bonus");
BooleanExpression isGreaterThanThreshold = QSalaryDetail.salaryDetail.salary.goe(payThreshold);
BooleanExpression isBonusAboveThreshold = isBonusSalary.and(isGreaterThanThreshold);
~~~

#### Types

~~~java
com.mysema.query.types.expr
com.mysema.query.types.path
~~~

---

BooleanBuilder is a mutable predicate instance.

~~~java
BooleanBuilder isRelevantSalaryName = new BooleanBuilder();
for (String salaryName : relevantSalaryNames) {
    isRelevantSalaryName.or(QSalaryDetail.salaryDetail.salaryName.eq(salaryName));      
}
isRelevantSalaryName.and(QSalaryDetail.salaryDetail.salary.gt(thresholdForPayPeriod));
~~~

---

CaseBuilder is the expression produced by a matching predicate or a default expression. 

~~~java

StringExpression caseSalaryName = new CaseBuilder()
        .when(QSalaryDetail.salaryDetail.isSalaryRelevant()
            .and(QSalaryDetail.salaryDetail.salary.goe(thresholdForPayPeriod)))
        .then(QSalaryDetail.salaryDetail.salaryName)
        .otherwise("other");
~~~

---

## Collections

### CollQueryFactory

com.mysema.query.collections

Simply aggregate or 'fold' a collection. Even the [Guava](https://code.google.com/p/guava-libraries/wiki/FunctionalExplained) library doesn't advocate higher-order functional programming to simplify this imperative Java.   

#### Before 

~~~java
public BigDecimal sum(List<SalaryDetail> salaryDetails) {
   BigDecimal sum = BigDecimal.ZERO;
   for (SalaryDetail salaryDetail : salaryDetails) {
      sum = sum.add(salaryDetail.getSalary());
   }
   return sum;
};
~~~

#### After 

~~~java
BigDecimal sum = CollQueryFactory
   .from(QSalaryDetail.salaryDetail, salaryDetails)
   .singleResult(QSalaryDetail.salaryDetail.salary.sum());     
~~~

---

Replace this nested filter that maps an input collection of salaries to an output collection of their unique names.

#### Before 

~~~java
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
~~~

#### After 

~~~java
List<String> uniqueSalaryNames = CollQueryFactory
    .from(QEmployeeSalary.employeeSalary, employeeSalaries)
    .innerJoin(QEmployeeSalary.employeeSalary.salaryDetails, QSalaryDetail.salaryDetail)
    .where(QSalaryDetail.salaryDetail.isSalaryRelevant())
    .distinct()
    .list(QSalaryDetail.salaryDetail.salaryName);
~~~

---

### ResultTransformer

com.mysema.query

A post-processor transformer for aggregation that works with com.mysema.query.group classes.

This example takes a collection of salaries and returns an aggregate collection where salaries with the same name will be grouped into a new projection containing the total salary of that group.

~~~java
List<SalaryDetail> aggregatedSalaries = 
    CollQueryFactory.from(QSalaryDetail.salaryDetail, salaryDetails)
    .orderBy(salaryDetail.salaryName.asc())
    .transform(GroupBy.groupBy(QSalaryDetail.salaryDetail.salaryName)
        .list(QSalaryDetail.create(QSalaryDetail.salaryDetail.salaryName,  
            GroupBy.sum(QSalaryDetail.salaryDetail.salary))));
~~~

---

## Projections 

### @QueryProjection

com.mysema.query.annotations

This can be used to select the columns for the View Model, within the JPA environment it can provide a detached model, or DTO layer. 

---

~~~java
List<PresentableSalary> projection = CollQueryFactory
    .from(QEmployeeSalary.employeeSalary, employeeSalaries)
    .list(new QPresentableSalary(QEmployeeSalary.employeeSalary.employeeRef,
        QEmployeeSalary.employeeSalary.payDate, QEmployeeSalary.employeeSalary.salaryDetails));
~~~

~~~java
public class PresentableSalary implements Serializable {
 
    private final Long employeeRef;
    private final List<SalaryDetail> salaryDetails;
    private final LocalDate payDate;
  
    @QueryProjection
    public PresentableSalary(Long employeeRef, 
        LocalDate payDate,
        List<SalaryDetail> salaryDetails) {
           this.employeeRef = employeeRef;
           this.payDate = payDate;
    	   this.salaryDetails = salaryDetails;
    }
 
    public List<SalaryDetail> salaryDetails() {
        return salaryDetails;
    }
 
    public LocalDate getPayDate() {
 	return payDate;
    }
    
    public Long employeeRef() {
      	return this.employeeRef;	
    }

}
~~~

### MappingProjection<T> 

Optionally use a template to support the construction of different projections from a resultset.

com.mysema.query.types

~~~java
public class PresentableSalaryProjection extends MappingProjection<PresentableSalary> {
 
    public PresentableSalaryProjection() {
        super(PresentableSalary.class,
              employee.employeeRef,
              payroll.payDate,
              salary.salaryDetails);
    }
 
    @Override
    protected PresentableSalary map(Tuple row) {
        return new PresentableSalary(
            row.get(employee.employeeRef), 
            row.get(payroll.payDate), 
            row.get(salary.salaryDetails));
    }
 
}
~~~

---
The @QueryProjection can also be placed on the Entity constructor itself and, in this example, is generated as the method QSalaryDetail.create().

~~~java    
@QueryProjection 
public SalaryDetail(String salaryName, BigDecimal salary) {
   this.salaryName = salaryName;
   this.salary = salary;
}
~~~

---

## Delegates

### @QueryDelegate

com.mysema.query.annotations

Making your own DSL. Add the business concepts into the query model, these could be temporal, flags, comparisons.

Instead of static'helper' methods to create business logic constraints, consider using annotated delegate methods to provide query extensions.

The delegate method is exposed directly in the query and expresses the intent of the constraint explicitly. 

~~~java
from...where(QSalaryDetail.salaryDetail.isSalaryRelevant())
~~~
---

Replace the 'static utility' below with a Query Delegate.

#### Before

~~~java
public class RelevantSalaryUtil {

    public static final String NON_RELEVANT_SALARY = "other";

    public static boolean isSalaryRelevant(String salaryName) {
        return !NON_RELEVANT_SALARY.equals(salaryName);
    }
}
~~~

#### After

~~~java
@QueryDelegate(SalaryDetail.class)
public static BooleanExpression isSalaryRelevant(QSalaryDetail detail) {
    return detail.salaryName.notEqualsIgnoreCase("other");
}
~~~
