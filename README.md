# Practice Hub
This repo is a centralized location for me to store puzzle/practice JavaScript. I'm finding that recently I need to version control my practice more often. Because of this it is difficult to keep up with gists.

- Practice files will typically be vanilla.
- Blog posts relevant to specific puzzles/practice will be stored in the directory for that puzzle.

## Drills
- [Conway's Game of Life](https://github.com/misterussell/practice-hub/blob/master/src/drills/gameOfLife/life.js)

## Dependencies
- Framework: [create-react-app](https://github.com/facebookincubator/create-react-app)
- Testing: Mocha/Chai.
  - [How to hack CRA to use mocha/chai rather than Jest](https://www.codementor.io/daveschinkel13/running-mocha-enzyme-with-creat-react-app-84flnngkk).
  - To handle the [depreciation](https://github.com/mochajs/mocha/wiki/compilers-deprecation) of `--compilers` you will can swap out `--compilers js:babel-core/register ` with `"--require babel-core/register`
  - [TDD Guide](https://github.com/mawrkus/js-unit-testing-guide#unit-tests)
- Babel Plugins: [Object Rest Spread](https://babeljs.io/docs/plugins/transform-object-rest-spread/)
