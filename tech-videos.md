---
layout: page
title: "Software Development Videos"
id: tech-videos
---
{% assign tagged_techvideos= (site.data.techvideos | group_by: 'tag' | sort: 'name' ) %}

<dl>
{% for tag in tagged_techvideos %}
<dt>{{ tag.name }}</dt>
{% assign sorted_techvideos= (tag.items | sort: 'name') %}
{% for techvideo in sorted_techvideos %}
<dd><a href="{{ techvideo.url }}">{{ techvideo.name }}</a></dd>
{% endfor %}
{% endfor %}
</dl>
