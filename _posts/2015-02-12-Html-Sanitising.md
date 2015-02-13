---
layout: post
title: Html Sanitising vs Html Escaping
category: tech
tags: xss
published: true
summary: Html Sanitising vs Html Escaping
---

## Html Sanitising vs Html Escaping

Content, html and text, that originated from external sources must be integrated into the primary content stream so that it cannot subvert the output programmatically.

A user inputs some data and now expects it to be reflected in the page structure. [Creative Usernames](https://labs.spotify.com/2013/06/18/creative-usernames).

Sanitisation of html must be an explicit "whitelist" policy applied to the markup similar to the requirement when a movie is "cut" to match the restrictions of the rating. E.g A rating specifies there can be no strong profanity.
It could be argued that film ratings are not applied consistently because it is more like an exclusion "blacklist".



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

Escaping content makes it structurally compatible with Html and is similar to "pixilating" or "obfuscating" the offending elements to make it appear harmless.
e.g A movie that over-dubs a swear word for TV release. e.g Ghostbusters

[Securing the tangled Web](http://queue.acm.org/detail.cfm?id=2663760)

Html Escaping only uses the following five ASCII characters ("&apos;" is not defined in Html 4.01 and is excluded)

|Input  | Output
|-------|----------
| "'"   | "&quot;" |
| "\"   |"&#39;"   |
| "&"   | "&amp;"  |
| "<"   | "&lt;"   |
| ">"   | "&gt;"   |

### Utilities

http://docs.guava-libraries.googlecode.com/git/javadoc/com/google/common/html/HtmlEscapers.html

~~~
com.google.common.html;
~~~

~~~ javascript
HtmlEscapers.htmlEscaper().escape("<script>alert('Boo!');</script>;");
~~~
