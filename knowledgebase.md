Culture

Companies with intentional culture: AtomicObject, Thoughtbot, Stack Exchange, Atlasssian, Microsoft.

Environment Drives Culture, Culture Drives Brand. How do you compete for hires against Facebook? Offers a methodology and Brand to output instead providing pingpong-table, free-meals culture. Brand is a form of group-think and can be toxic if inhaled internally. Output only. Corporate marketing often creates the brand first and implements it top-down.


Challenges in Tech adoption. Nearly everything is Software. Cannot assume that everyone has the same background or grew up with computers.

Remote First

Non-Remote.

 Part of Problem. Adding to congestion
 Not value for money. 15-20k over 5 years
 Commuting is an expensive habit.
 Single Point of failure. 
 Best time of productivity is lost commuting.
 Disregards people who are not here yet and anyone that may work on the project in the future.

 Is determined by personal situation and the way I work
 Remote teams will become increasingly skillful.
 Intentional - choose the most effective location to be.
 Skillset to acquire in the next few years is distributed working practices
 Commuting doesn’t give value for money vs productivity
 Tools with growth and mindshare that work local and remote such as Slack, Trello
 Existing tools Git, DVCS are peer to peer
 Todays software is built around the idea that you are not co-located - Mobile messaging, VOIP. 
 Cloud/web business is 24/7
 Software Development is not 9-5, "Second Shift" is possible
 Marching ants, disaster recovery - WeWork private offices located in hubs
 Contingency Planning. Disaster recovery. Fire Drill


Open Source

Open Source vs Corporate - In the corporate enterprise working environment there is rarely anything to show to the outside world for a days work.

OpenSource allows the simplest solution to propagate. Commercial software has to meet the requirements of tenders and checklists of features.

Anyone should be able to contribute to Open Source projects - however the project maintainers may prefer test cases over patches due to the knowledge required to keep the code base systematic -e.g memory performance constraints that only committers have deep knowledge of e.g. Guava, RXJava.

Twitter were able to use the JVM, Open JDK as they could customise the whole stack add in performance enhancments and profiling tool support.

Agile

When the communication between software developers and the stake holders (people with commercial interest in building software) are communicating skilfully. 

Java

Why Java? - Stability - Brian Goetz. Current design goal. Use existing Java idioms, Backward compatible mostly. Language Evolution levels off.
Why Java? Since 2000-2001 mainly because of mix open source choices and commercial like Intellij. There is no “one-stop” shop”.
2000-2001 Jboss open source poking at the big vendors. Easy to run.
Antidote to big vendors stack traditionally competed with Microsoft. Alternative to Microsoft binary-centric world.There is a lot to improve in Java. Vast effort has gone into it from an active community. Suitable for long term development projects(5-10 years).

JVM has evolved. Stability. Even with lambdas and method functions its still stuck with a syntax. Mainly it got stuck at Java 6 for a while due to Sun Microsystem auto-de-fa.

Java - Language stuck in a corner, no incentive to learn it. Compared to Swift, Exlir  ironically, new adopters of Java Language are through Android, an illegal API Platform according to Oracle.

Guava - Provides idioms aimed at Java 5-7 users. Overlaps with Java 8 type and versioning incompatibilities. Public api dependency on types. Heavy on Android(Dex). Not so good for Open Source Projects. Large APIs, Breaking changes to libraries that use it. Java problem making the top-level Collections interface instances mutable.


Java 8 exposes (via Unsafe) a fetch-and-add (XADD) instruction that classes such as AtomicInteger can take advantage of to implement their atomicity guarantees. This has a significant advantage over the Java 7 implementation, which instead relies on compare-and-swap (CAS). Improves Guava cache etc.

Java and Domain models - For classic OOP Java is clumsy. Tiny Types (Autovalue), composition over inheritance (Traits, Mixins for multiple inheritance ). Does Scala work better? 

Java URL class equals DNS IP address - URI.

Java - Simple - means smaller but more classes (Firstname, DateOfBirth, SSN, Zipcode, Password, HtmlSafe)
Java was being positioned as application platform from Corel’s WordPerfect, similar to offerings in todays App Stores up to the level of a regular operating system. A systems programming language, a UI Widget class library.

A virtual machine control language for driving consumer electronics. A blue collar language that was meant to feel familiar.
1. It has an object-oriented flavour
2. Standard Numeric compatibility with IEEE 754 
3. Java also has a systems programming flavour
4. Distributed flavour. Class Loaders
The most popular language this turned out to be is JavaScript, based on Scheme.

Original Reason for Java Exception Model.
Exception handling The exception model that we picked up pretty much straight out of Modula 3 has been, I think, a real success. Initially, I was somewhat anxious about it,because the whole notion of having a rigorous proof that an exception will get tossed can be something ofa burden. But in the end, that is a good burden to have. When you aren’t testing for exceptions, the codeis going to break at some time in any real environment where surprising things always happen. Ariane 5 provides a vivid lesson on how important exception handling is.Although exception handling makes Java feel some-what clumsy because it forces you to think about something you’d rather ignore, your applications are ultimately much more solid and reliable.

Java makes good use of a single machine and reduces the need to scale horizontally.

Java is Virtual Machine Control Language -  a ‘C’ like language with a layer of 1990’s era Object Classes, also a reaction against C++. (e.g no pointers, only Single Inheritance from an implementation class)

Java offers stability and is mostly backward compatible. Thus Java is boring. Small changes e.g ForEach don’t impact type system. String can’t foreach over each Character of String. Boiler plate code that can be made concise. Don’t increase conceptual surface area, improve existing idioms.

Spring Framework has a proven track record for use in multi-year spanning projects. Upgrade path. 5yrs+. Java 6,7,8 compatibility. Single Abstract Methods.
e.g Springboot > Dropwizard which was cool in 2012. Spring has all the utilities when you actually need a Kitchen sink. Dependencies are collected together as bill of materials to get the correct stack of dependencies. The tide of dependencies rise at the same time in a monolithic framework.

Functional Programming 

Data In, Data Out
Pure function - Same input returns same output e.g 2+2=4
Side effects - In OOP an Object setter must imply a change to the objects environment

Object Oriented Programming

Polymorphism - Compiler doesn’t know, Lazy Binding in typed language. V-table dispatching.

Programming Languages

REST


Security, Secure Coding


Text Protocols JSON/XML - There are standard parser/processors in environments(browsers) support many representations of user defined data. 
Json and XML have 1 version. Deserialisers for custom binary protocol have to be distributed to clients. Protobuf, Transit - static languages, dynamic languages. Gzip.
Security -Evaluating Parser vs Embedded Scripting Lang - Parser doesn’t execute code; MVEL, Groovy etc can be used for code exploits.
Java Micro Services - JVM optimised for longer running monolithic code - Hot Reloading, URLClassLoader services, Memory Leaks, JMX, (Karaf) OSGI, http://fabric8.io/, Kubernetes etc.
Micro Services - really a patchwork of applications, Federated Services, separate databases, - different languages - e.g GoLang.  Business apps have different lifespans based on how often the requirements changes. Obsolescence. Will a service need replacing in 5yrs?

AOP - Java language is not expressive enough without some elements of code generation, reflection or AOP to workaround inheritance as a way of adding cross cutting behaviour. When all you have are classes; more is more.
EJB1/2 example of pre-AOP component model that ultimately failed. With AOP (AspectJ) any Java application could now have “e.g Transactional” components without a vendor industry standard.
Rest - Representational State Transfer - architecture style works with networked hypermedia applications. Course-grain hypermedia data transfer. Not Limited to Http.
The application state is controlled and stored by the user agent and can be composed of representations from multiple servers. The model application is therefore an engine that moves from one state to the next by examining and choosing from among the alternative state transitions in the current set of representations.
Imagine a resource /book with only backing state on the server, instead /book/42/page/1/para/5 represents the state driven by the client. State Machine.
Roy Fielding - REST architecture style of the Internet, instead of RPC style Web Services. Hypermedia, stateless. HATEOAS - Hypermedia as the Engine of Application State. Hyper Media Constraints.
e.g a Response data contains a self-linking URL. Richardson Maturity Model. “application/hal+json”; https://pushpay.io/docs/operations#post__v1_anticipatedpayments, https://reverb.com/page/api

A Web Page is a tree-like structure, yet the W3C DOM is represented like Java API. e.g instead of querying, selectors, chaining.

Integration Tests are Applications - so not JUnit.

QueryDsl - Java Models could be under/over specified. Query models are separate to support predicates, extension methods, Predicates and DSL. (Add Temporal mean to the model after,before,completed ).

The Spring Project is an example of maintaining a forward and backward compatible framework (e.g for Java 6,7,8).

Asynchronous Api: Failure should be a first-class concept. 

Peer Programming, not Pair Programming.

Git SHA as version number for dependencies.

Semantic Versioning 2.0.0 Given a version number MAJOR.MINOR.PATCH, increment the:

MAJOR version when you make incompatible API changes,
MINOR version when you add functionality in a backwards-compatible manner, and
PATCH version when you make backwards-compatible bug fixes.
Breaking Version, (^)Feature Version, (~)Patch Version (Bug fixes automatically).
Version numbers are system protocols, only names matter to be human readable.

Libraries: License, Dependencies e.g Logging. Java version forward compatible.
 Percentage of feature usage? e.g SAML2 Post can be implemented using standard Java library.

Remote Distributed Lessons : Remote working is a distributed protocol. One person is remote. Everyone works as if remote - no local privileges, Catch everyone up to local conversations, A communication channel for business changes. Log of updates accessible across timezones. Every party should access video chat and be in-sync.
Capturing information locally for future distribution. For team members that haven’t even started yet.
Herding Unicorns

Prove ability can work remote and stay sane. Tiny Habits/Second Shift catch up on related interests. Get out of old habits. Learn again.

What is my threshold for productivity? Totally remote, Commute some of the week? Commute nearer?

Good Open Source Project? [ReactiveX/RxJava](http://reactivex.io) Marble diagrams. Pull Requests. Committers welcome, some code however is sensitive to memory constraints - requires more knowledge
. Test cases welcomed instead.
Open Source Projects problems when focused around unmovable personalities (Trolls). Support exclusionary/hateful opinions.
No HR in Open Source

Open Source contribution: Dagger repo, I can see how many developers it helped out. TestNg - was first contribution.

Tomcat 8 - Servlet 3.1, WebSockets, Comet, Connectors NIO (Non-blocking multiplexing).

Chain of trust - Downloading Putty is not safe.

Openssl goto fail -> code review fail? Code comprehension fail, the wrong eyes looking at code too familiar and excepting, code style, linting, TDD

Code Reviews - knowledge sharing across the code base and across the team. We can find and highlight examples of good code. Even if we are not actively working on same code base.

Java API should explicitly use Locale and CharSets.


If you know Python, Ruby, Javascript - it is difficult to apply what you know to Java. Its feels too technically obtuse. E.g Twitter (FailWhale) wanted to run the JVM as it saturates a machine capabilities and choose Scala as developers from different backgrounds already understood higher-order abstractions.

Bootstrap. It was conceived, organised, orchestrated and rehearsed by its members simply because they thought it was a good idea.

Dynamic vs Static languages - cite examples: e.g TypeScript - optional, turning a dial to the amount of types that ripple through codebase (IntelliSense), Php Hack - security, speedup. Python Type Hints, Type Inference can help. Haskell programs can be reasoned through types. Haskell programs can be reasoned through types.

The most challenging problem in tech industry is not technical but ensuring diversity in that technical culture. Overcoming bias. Not everyone has a long history in tech or has a computer science background. This could include business people who are not used to or are intimidated by trying to create Software. Making teams of developers.
It makes the team better as it improves recruitment. Focus on sourcing not on filtering. Hiring for potential. Bitly are a Python shop but are using GO to solve problems that Python can’t. 
Therefore hiring is more diverse. There is business need for it. Attracting new developers with ideas rather than relying on incumbent developers that keep it the same.  Fill the blind spots.

Docker Containers - binary format for executing and linking applications, package management, dependencies, versioning. Developer friendly.

HighCharts - Cheap. Pension modellers, Chart Zooming, IE 6,7,8 compatible.

Annotation Processors - There comes a point at which it better to use a JVM language with higher order expressions. Code generation for maintaining boiler plate code that is a liability on older Java versions.

Java encourages code generation as the only means of increasing expressiveness can only be achieved by adding more classes. This done using inner-classes, AOP, code gen.


In the Business where does agility begin and end? Is there a radius of people that are apply it?


Immutability - Java Memory Model (Final). Published Thread Safe. Object Graph must provide copies of data(clone) or wrap collections. To design smaller classes when adding features. Construction.

Open Plan - Desk farms.

Koltin is a better Java 8 - infix operators, Higher Order Functions, Builder literals, generics, packages not file system relative, Operator overloading conventions. UnChecked Exceptions.

Process : Business team members working on creating a product that happens to be implemented in Software with developers.

ORM - when application controls data - effectively moving Stored Procedures in Java.
Stored Procs - database program - can change scheme and expose data.
 
Rest API - discoverable APIs, should a version need to be specified? Semantic versioning, backward/forward compatible. https://api.foxycart.com/docs

Java Fork/Join Framework - Doug Lea - introduce CPU instructions, e.g CAS, into JVM and expose through a library. Can be used by various JVM languages to implement Actors, etc.

HTTP 401 Unauthorized, 403 Forbidden, 200 OK, 201 Created, 202 Accepted

Rest Pagination - Links for next and previous pages, counts

Open Source projects must support a code of conduct that defines a policy to avoid petty decisions and exclusionary behaviour. e.g. NPM Inc

Teams can evolve faster than the parent organisation.
Micro services - are they just CGI processes? Does it make sense on the JVM?

Java 8 - Math.addExact


Open Source 

Liberal in input and conservative in output.

2012, bootstrap, missing semi-colon vs JSMin - which one should change?
+adopting a coding style that does as much as possible to help keep them out of harm's way
+documenting things the project does that might not conform to their expectations
+making explicit recommendations on tools and processes
https://github.com/twbs/bootstrap/blob/master/js/dropdown.js - no semi-colons
+ Similar issues in that the code will work but be less inclusive to some users.Not Open Source. Output of relaxed Javascript style means that strict tools will fail.
JSMin should accepted ASI but log error.
Bootstrap should tighten up some of the relaxed Javascript by simply adding explicit if() instead of relying on newlines.

2013, (libuv) used in node.js , a Joyent-sponsored project. One of the core contributors rejected a pull request that eliminated the use of a gendered pronoun in libuv.
Just treat it a a writing bug - Newton's Third Law of Motion: To every action there is always an equal and opposite reaction. Then bug will never get fixed.

NPM - code of conduct https://www.npmjs.com/policies/conduct
ThoughtBot - https://thoughtbot.com/open-source-code-of-conduct

All Businesses are understanding they exist in a marketplace where developing software is increasingly dominate. First contact will be through mobile app. Agility is determined by how directly engaged the business is in creating software.

Hypervisor allows multiple guest operating systems to run on a single system at the same time by virtualisation of the hardware.

JVM ecosystem can offer alternative tools e.g Clojure Leinigen, other testing frameworks ScaleCheck etc. Not stuck with Maven, Gradle, Junit.

Be an ambassador for the customer inside your company, enabled to solve the problem on their behalf.

Github is not a resume - its just source control that you can share with anyone. If you have created/configured/documented something for your own reference you may as well share it with everyone that comes across it.

Hiring culture should be sourcing and inviting candidates for potential rather than filtering for exclusion.
The ‘donut light’ for hiring should always be on. Company Tech blog - The shop window for developers to see environment/culture/brand. 

Guava Library dependency published in an open source framework is problematic in that it is so widely installed at clients how to ensure that versions don’t clash.
Client may have latest version and some methods deprecated in version depended in Open Source Library. Your application can only use one version. Open Source Library may not get updated frequently.

Git vs Subversion: Distributed Authority vs Host Based Single Authority. 
Git - content addressable key/value store (.git/objects) - SHA1 checksums. Files, Directories.

Continuous Integration - XP practice to run automated test suites periodically. Make smaller integrations frequently, Dedicated server process, clean environment, Automates the build, build discipline, collects metrics. Parallelism. Artefacts are created for deployment and distribution as early as possible. Leads to Continuous Deployment.
Downsides - Darkside of CI Servers, e.g.Bamboo, are like Death Stars. Used to intimidate, ravenous consumption of time/resource with a tendency to blow up.

Release Management
Rollbacks must be instant and easy because sometimes things are going to break and getting back to a working state quickly must be painless and fast.
Patch releases must be able to make it from SCM to production (through a continuous delivery pipeline) in minutes.
Load balancers must be able to handle automatic switching between releases.
Database schema changes should be decoupled from app releases otherwise releases and rollbacks can be blocked.
App-tier servers should be stateless with state living in external data stores otherwise state will be frequently lost and/or inconsistent.

Remote API - Timeouts - options? :Retry :Fail :Ask

Eventual Consistency - When “facts” are distributed: ”The storage system guarantees that if no new updates are made to the object, eventually all accesses will return the last updated value.”. It is possible that stale information can be read until such time it will eventually be consistent with latest version of data. E.g Asking a circle of friends someones birthday, eventually the group will agree on the same answer.

Secure web apps - Authentication, Authorisation, CSRF, XSS, Sessions, CORS, CSP, Headers, Passwords, Injection, Encryption

NoSql - Does it exist in Postgres already? “document store”, ”blob storage”, “key/value storage”, “nested table”, “graph database”, “distributed table”, “log database”, “distributed filesystem”

Libraries vs Frameworks - Selecting Libraries is more artisanal, can be a patchwork full of holes (e.g Security). Frameworks can have better oversight (e.g. out of the box security). Monolithic but have oversight. e.g Spring Security is built on Spring.
Framework can version as a complete bill of materials (tide rises everything at the same time)


TDD - Test Driven Design/Development - spend more time thinking about code to be written - more design time spent upfront is better than fixing incorrect code that made it into production produced at ab initially faster rate. If defects in code are caught mainly during development, instead of getting in production environment, then some kind of TDD is being used.
Mocking - If mocking is good more mocking must be better?
http://blog.testdouble.com/posts/2014-01-25-the-failures-of-intro-to-tdd.html

Service - application accesses external or component that is not local. (e.g database, messaging, socket)

Inversion of Control - Don’t call framework code, framework calls into components

Git : branching
       GitFlow( Master  (current release), Develop) “—no-fastforwarding” merge commits.
       Single Master, then feature/hotfix branches
       git help workflows
https://github.com/thoughtbot/guides/blob/master/protocol/git/README.md

