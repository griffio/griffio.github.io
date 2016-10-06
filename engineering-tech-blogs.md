---
layout: page
title: Corporate Engineering Blogs
---

### [Data](https://github.com/griffio/griffio.github.io/blob/master/_data/techblogs.csv) with Github repos and career/jobs link 

<section id="top-five-languages">

<p><span>Top 5 languages in companies listed:</span></p>

</section>

<section class="techblogs-flex-layout">
<div class="flex-container">
{% assign sorted_techblogs = (site.data.techblogs | sort: 'desc') %}
{% for techblog in sorted_techblogs %}
{% assign ghlangs = (techblog.languages | split: ' ') %}
<div class="DataSpec"><a class="DataSpec-blog" href="{{ techblog.url }}">{{ techblog.desc }}</a>
<a class="DataSpec-repo" href="https://github.com/{{ techblog.github }}"><span class="octicon-mark-github small-octicon"></span>/{{ techblog.github }}</a>
<a class="DataSpec-jobs" href="{{ techblog.jobs }}">Jobs</a> 
</div>
<div class="DataSpec"><span class="DataSpec-languages">
{% for ghlang in ghlangs %}
<span>{{ ghlang }}</span>
{% endfor %}
</span>
</div>
{% endfor %}
</div>
</section>

<script type="text/javascript" src="/javascripts/languageFrequency.js"></script>
