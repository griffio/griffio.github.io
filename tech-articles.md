---
layout: page
title: Tech Articles
id: tech-articles
---

<section class="techblogs-flex-layout">
<div class="flex-container">
{% assign sorted_techarticles = (site.data.techarticles | sort: 'title') %}
{% for techarticle in sorted_techarticles %}
<div class="DataSpec"><a class="DataSpec-blog" href="{{ techarticle.url }}">{{ techarticle.title }}</a>
<blockquote>{{ techarticle.blurb }}</blockquote>
</div>
{% endfor %}
</div>
</section>
