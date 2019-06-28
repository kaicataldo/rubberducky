[![NPM](https://img.shields.io/npm/v/rubberducky.svg)](https://www.npmjs.com/package/rubberducky)

# rubberducky

A command line utility for rubber duck debugging

```
           _.._
          / a a\__,
          \  -.___/
           \  \
(\__,-----,_)  \
(    (_         )
 \_   (__       /
   \___________/
```

`rubberducky` is a command line tool that allows you to have a rubber duck quickly available to you any time you you're feeling stuck solving a problem.

### Usage

```
$ npm install -g rubberducky
$ rubberducky
```

### Commands

`rubberducky` has a few commands that it will respond to:

* `exit` - exit the program
* `restart` - start over with a clean slate
* `interactive` - start interactive mode (this can also be enabled on the command line with the `--interactive` flag)
* `noninteractive` - end interactive mode
* `info` - show information about `rubberducky`, including possible commands and links to more information

### Interactive mode

`rubberducky` includes an interactive mode for times when you'd rather not speak out loud to your computer. In interactive mode, the duck will ask you the following questions:
 * Do you mind explaining the problem you're trying to solve?
 * And can you explain how you're trying to solve that problem?

### More information

* [rubberduckdebugging.com](https://www.rubberduckdebugging.com)
* [Wikipedia's Article on Rubber Duck Debugging](https://en.wikipedia.org/wiki/Rubber_duck_debugging)
* [This post from Coding Horror](https://blog.codinghorror.com/rubber-duck-problem-solving)
