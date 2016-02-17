---
layout: page
title: Software Development Podcasts
id: tech-podcasts
---

### By Category

---

{% assign tagged_techpodcasts= (site.data.techpodcasts | group_by: 'tag' | sort: 'name') %}

{% for tag in tagged_techpodcasts %}
### "{{ tag.name }}"
{% assign sorted_techpodcasts= (tag.items | sort: 'name') %}
{% for techpodcast in sorted_techpodcasts %}
<a href="{{ techpodcast.url }}">{{ techpodcast.name }}</a> <span>"{{ techpodcast.description }}"</span>
{% endfor %}
---
{% endfor %}