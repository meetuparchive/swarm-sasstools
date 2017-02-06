swarm-sasstools
===============

### Documentation
[https://meetup.github.io/swarm-sasstools/](https://meetup.github.io/swarm-sasstools/)

### Grunt tasks

Run build tasks with `grunt [command]`.

Command              | Result
-------------------- | -----------------------------
`[default]`          | Cleans built docs, compiles Sass via webpack, generates sassdoc and seldon docs
`serve`&#9733;       | Starts browsersync on `localhost:3000`; will watch for source changes (may require manual browser refresh for now)
`ghpages`            | __Caution__: commits compiled docs for your branch to `gh-pages`

&#9733; in the event browsersync throws a permissions error, `chown` `node_modules/`
