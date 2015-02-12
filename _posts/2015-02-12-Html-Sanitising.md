---
layout: post
title: Html Sanitising vs Html Escaping
category: tech
tags: xss
published: true
summary: Html Sanitising vs Html Escaping
---

## Html Sanitising vs Html Escaping

Sanitising of html is a policy applied to markup content similar to when a movie is "cut" to match a certain allowed rating.
e.g Profanity is restricted to PG and above.

Escaping content makes it structurally compatible with Html and is similar to "pixilating" or "obfuscating" the offending elements to make it appear harmless.
e.g A movie that over-dubs a swear word for TV release. e.g Ghostbusters

[Securing the tangled Web](http://queue.acm.org/detail.cfm?id=2663760)

---

[Html Sanitizer](https://www.owasp.org/index.php/OWASP_Java_HTML_Sanitizer_Project#tab=Main)
~~~ java
PolicyFactory policy = new HtmlPolicyBuilder()
   .allowElements("p")
   .allowElements(
       new ElementPolicy() {
         public String apply(String elementName, List<String> attrs) {
           attrs.add("class");
           attrs.add("header-" + elementName);
           return "div";
         }
       }, "h1", "h2", "h3", "h4", "h5", "h6"))
   .build();
String safeHTML = policy.sanitize(untrustedHTML);
~~~

---

Html Escaping only uses the following five ASCII characters ("&apos;" is not defined in Html 4.01 and is excluded)

|Input  | Output
|-------|----------
| "'"   | "&quot;" |
| "\"   |"&#39;"   |
| "&"   | "&amp;"  |
| "<"   | "&lt;"   |
| ">"   | "&gt;"   |

http://docs.guava-libraries.googlecode.com/git/javadoc/com/google/common/html/HtmlEscapers.html
com.google.common.html;

~~~ javascript
HtmlEscapers.htmlEscaper().escape("<script>alert('Boo!');</script>;");
~~~
