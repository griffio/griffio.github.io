---
layout: page
title: "Software Development Videos"
id: tech-videos
---
{% assign tagged_techvideos= (site.data.techvideos | group_by: 'tag' | sort: 'name' ) %}

{% for tag in tagged_techvideos %}
### "{{ tag.name }}"
{% assign sorted_techvideos= (tag.items | sort: 'name') %}
{% for techvideo in sorted_techvideos %}
* <a href="{{ techvideo.url }}">{{ techvideo.name }}</a>
{% endfor %}

{% endfor %}
