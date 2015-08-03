---
layout: page
title: Software Tech Podcasts
id: tech-podcasts
---

{% assign sorted_techpodcasts= (site.data.techpodcasts | sort: 'name') %}
{% for techpodcast in sorted_techpodcasts %}

* <a href="{{ techpodcast.url }}">{{ techpodcast.name }}</a> <span>"{{ techpodcast.description }}"</span>

{% endfor %}
