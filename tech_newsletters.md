---
layout: page
title: "Tech Newsletters"
id: tech-newsletters
---
{% assign tagged_technewsletters = (site.data.technewsletters | group_by: 'tag' | sort: 'name' ) %}

{% for tag in tagged_technewsletters %}
### "{{ tag.name }}"
{% assign sorted_technewsletters= (tag.items | sort: 'name') %}
{% for newsletter in sorted_technewsletters %}
* <a href="{{ newsletter.url }}">{{ newsletter.name }}</a>
{% endfor %}

{% endfor %}
