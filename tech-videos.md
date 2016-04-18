---
layout: page
title: "Software Development Videos"
id: tech-videos
---
{% assign tagged_techvideos= (site.data.techvideos | group_by: 'tag' | sort: 'name' ) %}

<section>
{% for tag in tagged_techvideos %}
<span><a href="#{{ tag.name }}">{{ tag.name }}</a></span>
{% endfor %}
</section>

### Category

---

<dl>
{% for tag in tagged_techvideos %}
<dt id="{{ tag.name }}">{{ tag.name }}</dt>
{% assign sorted_techvideos= (tag.items | sort: 'name') %}
{% for techvideo in sorted_techvideos %}
<dd><a href="{{ techvideo.url }}">{{ techvideo.name }}</a></dd>
{% endfor %}
{% endfor %}
</dl>
