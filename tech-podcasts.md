---
layout: default
title: Tech Podcasts
id: tech-podcasts
---

## Tech Podcasts

{% assign sorted_techpodcasts= (site.data.techpodcasts | sort: 'name') %}
{% for techpodcast in sorted_techpodcasts %}

* <a href="{{ techpodcast.url }}">{{ techpodcast.name }}</a>

{% endfor %}
