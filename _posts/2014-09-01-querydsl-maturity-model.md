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

### Level 3 - [Projections](#projections) and [Delegates](#delegates)

### Level 2 - [Collections](#collections) 

### Level 1 - [Predicates](#predicates)

### Level 0 - No usage (Swamp of POJO)

---

# Predicates

### They're the thing which gets us to the thing.

~~~java
BooleanExpression isBonus = QSalaryDetail.salaryDetail.salaryName.equalsIgnoreCase("Bonus");
BooleanExpression isGreaterThanThreshold = QSalaryDetail.salaryDetail.salary.goe(paydayThreshold);
BooleanExpression predicate = isBonus.and(isGreaterThanThreshold);
~~~

### Types

~~~java
com.mysema.query.types.expr
com.mysema.query.types.path
~~~

---

~~~java
BooleanBuilder isSalaryThresholdRelevant = new BooleanBuilder(
    QSalaryDetail.salaryDetail.salaryName.eq(salary.getSalaryName());

    if (!other.salaryName().equalsIgnoreCase("other")) {
        booleanBuilder.and(QSalaryDetail.salaryDetail.salary.gt(thresholdForPayPeriod));
    }
~~~

---

~~~java
CaseBuilder caseOfSalaryname = new CaseBuilder()
        .when(QSalaryDetail.salaryDetail.isSalaryRelevant()
            .and(QSalaryDetail.salaryDetail.salary.goe(thresholdForPayPeriod)))
        .then(QSalaryDetail.salaryDetail.salaryName)
        .otherwise("other");
~~~

---

# Collections

### CollQueryFactory

com.mysema.query.collections

Query entities that are generated can be used with a CollQueryFactory to replace this Mundane Java code that maps an input collection to an output collection.

### Before 

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

### After 

~~~java
List<String> uniqueSalaryNames = CollQueryFactory
    .from(QEmployeeSalary.employeeSalary, employeeSalary)
    .innerJoin(QEmployeeSalary.employeeSalary.salaryDetail, QSalaryDetail.salaryDetail)
    .where(QSalaryDetail.salaryDetail.isSalaryRelevant())
    .distinct()
    .list(QEmployeeSalary.employeeSalary.salaryName);
~~~

---

Aggregate or 'fold' a collection using Mundane Java. Even the Guava library doesn't advocate higher-order functional programming using Java.       

### Before 

~~~java
public BigDecimal sum(List<SalaryDetail> salaryDetails) {
   BigDecimal sum = BigDecimal.ZERO;
   for (SalaryDetail salaryDetail : salaryDetails) {
      sum = sum.add(salaryDetail.getSalary());
   }
   return sum;
};

~~~

### After 

~~~java
BigDecimal sum = CollQueryFactory
   .from(QSalaryDetail.salaryDetail, salaryDetails)
   .singleResult(QSalaryDetail.salaryDetail.salary.sum());     
~~~

---

### ResultTransformer

com.mysema.query

A post-processor transformer for aggregation that works with com.mysema.query.group.* classes.

Takes a collection and returns a collection containing a new projection of the aggregate for each group. Here, multiple salaries with the same name will be grouped into a new element containing the sum total of the group.

~~~java
List<SalaryDetail> aggregatedSalaries = CollQueryFactory.from(QSalaryDetail.salaryDetail, salaryDetails)
    .transform(GroupBy.groupBy(QSalaryDetail.salaryDetail.salaryName)
    .list(QSalaryDetail.create(QSalaryDetail.salaryDetail.salaryName,    
        GroupBy.sum(QSalaryDetail.salaryDetail.salary))));
~~~

# Projections 

### @QueryProjection

com.mysema.query.annotations

Can be used for the View Model, within the JPA environment it can provide a detached model, or DTO layer. 

---

~~~java
List<PresentableSalary> projection = CollQueryFactory
    .from(QEmployeeSalary.employeeSalary, employeeSalaries)
    .list(new QPresentableSalary(QEmployeeSalary.employeeSalary.employeeRef, QEmployeeSalary.employeeSalary.payDate, QEmployeeSalary.employeeSalary.salaryDetails));

public class PresentableSalary implements Serializable {
 
    private final Long employeeRef;
    private final List<SalaryDetail> salaryDetails;
    private final LocalDate payDate;
  
    @QueryProjection
    public PresentableSalary(Long employeeRef, LocalDate payDate, List<SalaryDetail> salaryDetails) {
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

### MappingProjection<T> - Optionally support construction of several different projections

com.mysema.query.types

~~~java
public class PresentableSalaryProjection extends MappingProjection<PresentableSalary> {
 
    public PresentableSalaryProjection() {
        super(PresentableSalary.class, employee.employeeRef, payroll.payDate, salary.salaryDetails);
    }
 
    @Override
    protected PresentableSalary map(Tuple row) {
        return new PresentableSalary(row.get(employee.employeeRef), row.get(payroll.payDate), row.get(salary.salaryDetails));
    }
 
}
~~~

---
An @QueryProjection can also be placed on the Entity constructor itself and, in this example, is generated as QSalaryDetail.create().

~~~java    
@QueryProjection 
public SalaryDetail(String salaryName, BigDecimal salary) {
   this.salaryName = salaryName;
   this.salary = salary;
}
~~~

---

# Delegates

### @QueryDelegate

com.mysema.query.annotations

Instead of static 'helper' methods to create queries, consider using annotated delegate methods to provide query extensions. Make your own DSL.

e.g. Expression from...where(QSalaryDetail.salaryDetail.isSalaryRelevant())

---

Replace the 'static cow' below with a Query Delegate.

### Before

~~~java

public class RelevantSalaryUtil {

    public static final String NON_RELEVANT_SALARY = "other";

    public static boolean isSalaryRelevant(String salaryName) {
        return !NON_RELEVANT_SALARY.equals(salaryName);
    }
}
~~~

### After

~~~java
@QueryDelegate(SalaryDetail.class)
public static BooleanExpression isSalaryRelevant(QSalaryDetail detail) {
    return detail.salaryName.notEqualsIgnoreCase("other");
}
~~~
