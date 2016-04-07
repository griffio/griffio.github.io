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
<div class="podcast">
<span class="podcast-title"><a href="{{ techpodcast.url }}">{{ techpodcast.name }}</a></span>
<span class="podcast-description">"{{ techpodcast.description }}"</span>
</div>
{% endfor %}
---
{% endfor %}