swarm-sasstools
===============

### Documentation
[https://meetup.github.io/swarm-sasstools/](https://meetup.github.io/swarm-sasstools/)

### Grunt tasks

Command             | Result
------------------- | -----------------------------
`grunt`             | Cleans built docs, compiles Sass via webpack, generates sassdoc and seldon docs
`grunt serve`       | Starts browsersync on `localhost:3000`; will watch for source changes (may require manual browser refresh for now)
`grunt ghpages`     | __Caution__: commits compiled docs for your branch to `gh-pages`