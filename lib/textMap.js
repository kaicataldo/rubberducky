'use strict';

const chalk = require('chalk');
const packageJSON = require('../package.json');

const yellow = chalk.yellow;
const red = chalk.red;

module.exports = {
  system: [
    yellow.bold(`rubberducky (v${packageJSON.version})`),
    ` ${yellow.bold('|')} Type ${yellow('exit')} to exit or ${yellow(
      'help'
    )} for more info.`
  ],
  ducky: [
    yellow.bold('           _.._'),
    yellow.bold('          / ') +
      chalk.bold('a a') +
      yellow.bold('\\') +
      red.bold('__,'),
    yellow.bold('          \\  ') + red.bold('-.___/'),
    yellow.bold('           \\  \\'),
    yellow.bold('(\\__,-----,_)  \\'),
    yellow.bold('(    (_         )'),
    yellow.bold(' \\_   (__       /'),
    yellow.bold('   \\___________/'),
    ''
  ],
  expected: yellow(
    "Do you mind explaining the problem you're trying to solve?"
  ),
  actual: [
    '',
    yellow("And can you explain how you're trying to solve that problem?")
  ],
  help: [
    `${yellow(
      'rubberducky'
    )} is a command line tool that allows you to have a rubber duck quickly available to you any time you you're feeling stuck solving a problem.`,
    '',
    yellow.bold('Commands'),
    '',
    `${yellow('rubberducky')} has a few commands that it will respond to:`,
    ` * ${yellow('exit')} - exit the program`,
    ` * ${yellow('restart')} - start over with a clean slate`,
    ` * ${yellow(
      'interactive'
    )} - start interactive mode (that this can also be enabled on the command line with the \`--interactive\` flag)`,
    ` * ${yellow('noninteractive')} - end interactive mode`,
    ` * ${yellow('help')} - show information about ${yellow(
      'rubberducky'
    )}, including possible commands and links to more information`,
    '',
    yellow.bold('Interactive mode'),
    '',
    `${yellow(
      'rubberducky'
    )} includes an interactive mode for times when you'd rather not speak out loud to your computer. In interactive mode, the duck will ask you the following questions:`,
    " * Do you mind explaining the problem you're trying to solve?",
    " * And can you explain how you're trying to solve that problem?",
    '',
    yellow.bold('More information'),
    `[rubberduckdebugging.com]${yellow(
      '(http://www.rubberduckdebugging.com/)'
    )}`,
    `[Wikipedia's Article on Rubber Duck Debugging]${yellow(
      '(https://en.wikipedia.org/wiki/Rubber_duck_debugging)'
    )}`,
    `[This post from Coding Horror]${yellow(
      '(http://blog.codinghorror.com/rubber-duck-problem-solving/)'
    )}`,
    '',
    `${yellow.bold('<=')} Press the Return key to go back`
  ],
  exit: yellow('quack')
};
