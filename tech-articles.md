---
layout: page
title: Software Development Articles
id: tech-articles
---

<section class="techblogs-flex-layout">
<div class="flex-container">
{% assign sorted_techarticles = (site.data.techarticles | sort: 'title') %}
{% for techarticle in sorted_techarticles %}
<blockquote>
{{ techarticle.blurb }} ...
<footer>
<cite>
<div class="DataSpec">
<a class="DataSpec-blog" href="{{ techarticle.url }}">{{ techarticle.title }}</a>
</div>
</cite>
</footer>
</blockquote>
{% endfor %}
</div>
</section>
