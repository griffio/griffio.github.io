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

The sanitisation of html using an explicit "whitelist" policy of allowed elements "cuts" out unspecified elements from the stream similar to the requirement that a movie is "cut" down to match a target rating classification (e.g a rating specifies there cannot be strong profanity used). It could be argued that film ratings are not applied consistently because it is more like an exclusion list than a "whitelist".

---

[OWASP Html Sanitizer](https://www.owasp.org/index.php/OWASP_Java_HTML_Sanitizer_Project#tab=Main)

~~~ java
PolicyFactory policy = new HtmlPolicyBuilder()
 .allowElements("p")
 .allowElements(
   new ElementPolicy() {
     public String apply(String elem, List<String> 
       attrs.add("class");
       attrs.add("header-" + elem);
       return "div";
     }
   }, "h1", "h2", "h3", "h4", "h5", "h6"))
 .build();
String safeHTML = policy.sanitize(untrustedHTML);
~~~

---

Escaping non-compliant content makes it structurally compatible with Html and is similar to "pixilating" or "obfuscating" the offending elements to make it appear harmless (e.g A movie that had profanity over-dubs for its TV release was Ghostbusters).

Html Escaping only uses the following five ASCII characters ("&apos;" is not defined in Html 4.01 and is excluded)

|Input  | Output
|-------|----------
| "'"   | "&quot;" |
| "\"   |"&#39;"   |
| "&"   | "&amp;"  |
| "<"   | "&lt;"   |
| ">"   | "&gt;"   |

### Utilities

[Securing the tangled Web](http://queue.acm.org/detail.cfm?id=2663760)

[HtmlEscapers](http://docs.guava-libraries.googlecode.com/git/javadoc/com/google/common/html/HtmlEscapers.html)

[Closure](https://developers.google.com/closure/templates/docs/security)

~~~
com.google.common.html;
~~~

~~~ javascript
HtmlEscapers.htmlEscaper().escape("<script>alert('Boo!');</script>;");
~~~

### CSS & JavaScript

Additional languages that can be subverted in the output stream require distinct sanitising and encoding.

