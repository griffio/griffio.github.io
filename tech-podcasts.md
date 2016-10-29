---
layout: page
title: Software Development Podcasts
id: tech-podcasts
---

{% assign tagged_techpodcasts= (site.data.techpodcasts | group_by: 'tag' | sort: 'name') %}

<section>
{% for tag in tagged_techpodcasts %}
<span><a href="#{{ tag.name }}">{{ tag.name }}</a></span>
{% endfor %}
</section>

(data) (https://github.com/griffio/griffio.github.io/blob/master/_data/techpodcasts.csv)

### Category

---

{% for tag in tagged_techpodcasts %}
### {{ tag.name }}
{% assign sorted_techpodcasts= (tag.items | sort: 'name') %}
{% for techpodcast in sorted_techpodcasts %}
<section itemscope class="podcast">
<span itemprop="title" class="podcast-title"><a href="{{ techpodcast.url }}">{{ techpodcast.name }}</a></span>
<span itemprop="description" class="podcast-description">{{ techpodcast.description }}</span>
</section>
{% endfor %}
---
{% endfor %}
