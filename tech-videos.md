---
layout: page
title: "Software Development Videos"
id: tech-videos
---

{% assign sorted_techvideos= (site.data.techvideos | sort: 'name') %}
{% for techvideo in sorted_techvideos %}

* <a href="{{ techvideo.url }}">{{ techvideo.name }}</a>

{% endfor %}
