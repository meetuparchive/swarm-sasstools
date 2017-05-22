swarm-sasstools
===============
[![npm version](https://badge.fury.io/js/swarm-sasstools.svg)](https://badge.fury.io/js/swarm-sasstools)
[![Build Status](https://travis-ci.org/meetup/swarm-sasstools.svg?branch=master)](https://travis-ci.org/meetup/swarm-sasstools)

### Documentation
[https://meetup.github.io/swarm-sasstools/](https://meetup.github.io/swarm-sasstools/)

### Grunt tasks

Run build tasks with `grunt [command]`.

Command              | Result
-------------------- | -----------------------------
`[default]`          | Cleans built docs, compiles Sass via webpack, generates sassdoc and seldon docs
`serve`&#9733;       | Starts browsersync on `localhost:3000`; will watch for source changes (may require manual browser refresh for now)
`ghpages`            | __Caution__: automatically commits compiled docs in `docs/build/` to the `gh-pages` branch

&#9733; in the event browsersync throws a permissions error, `chown` `node_modules/`

### Deprecated as of v1.5.14:
* `%display--text2`, `.display--text2`
* `%display--text3`, `.display--text3`
* `%text--heavy`, `.text--heavy`

Deprecated classes are still supported in this release.

### Releases
This package uses semver versioning to tag releases, although the patch version
is determined exclusively by the Travis build number for pushes to `master`.
Major and minor versions are hard-coded into the [Makefile](Makefile#L2).

Manual pushes to `master` and PR merges to master will be built by Travis, and
will kick off the yarn publish routine. The currently-published version of the
package is shown on the repo homepage on GitHub in a badge at the top of the
README.
