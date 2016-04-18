---
layout: page
title: "Software Development Newsletters"
id: tech-newsletters
---
{% assign tagged_technewsletters = (site.data.technewsletters | group_by: 'tag' | sort: 'name' ) %}

<section>
{% for tag in tagged_technewsletters %}
<span><a href="#{{ tag.name }}">{{ tag.name }}</a></span>
{% endfor %}
</section>

### Category

---

<dl>
{% for tag in tagged_technewsletters %}
<dt>{{ tag.name }}</dt>
{% assign sorted_technewsletters= (tag.items | sort: 'name') %}
{% for newsletter in sorted_technewsletters %}
<dd><a href="{{ newsletter.url }}">{{ newsletter.name }}</a></dd>
{% endfor %}
{% endfor %}
</dl>