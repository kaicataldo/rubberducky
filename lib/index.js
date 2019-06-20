'use strict';

const readline = require('readline');
const chalk = require('chalk');
const packageJSON = require('../package.json');

const yellow = chalk.yellow;
const red = chalk.red;
const textMap = {
  system: [
    '',
    yellow.bold(`rubber ducky (v${packageJSON.version})`),
    ' ' +
      yellow.bold('|') +
      ' type ' +
      yellow('exit ') +
      'to exit or ' +
      yellow('restart ') +
      'to start over.',
    ' ' +
      yellow.bold('|') +
      ' to enter and exit interactive mode, type ' +
      yellow('interactive') +
      ' and ' +
      yellow('noninteractive') +
      ', respectively.',
    ' ' +
      yellow.bold('|') +
      ' for more info on rubber duck debugging, type ' +
      yellow('info')
  ],
  ducky: [
    '',
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
  expected: yellow('\ncan you explain to me what you want your code to do?\n'),
  actual: yellow(
    '\nand can you go over what your code is actually doing, line by line?'
  ),
  info: [
    '',
    yellow.bold('info'),
    yellow('rubber duck debugging ') +
      'asserts that ' +
      yellow(
        'solutions to problems oftentimes present themselves when one is forced to verbalize the problem and the steps taken to attempt to solve said problem'
      ) +
      '. the duck is merely a friendly face for you to talk to, to have to explain to.',
    "in the end, this is not so different from talking out loud to yourself, and in fact, you'd actually be talking to a real person then. so you can try that instead, if you want – just don't be surprised if your co-workers become alarmed or concerned.",
    'speaking to a duck eliminates this unnecessary stress on your peers and will help you articulate more clearly and ' +
      yellow('without assumed knowledge on the part of the listener ') +
      "(the aforementioned duck). you're of course free to live your life as you choose, but trust me, " +
      yellow('you probably wanna talk to the duck') +
      '.',
    '',
    yellow.bold('more info'),
    '[rubberduckdebugging.com]' +
      yellow('(http://www.rubberduckdebugging.com/)'),
    "[Wikipedia's Article on Rubber Duck Debugging]" +
      yellow('(https://en.wikipedia.org/wiki/Rubber_duck_debugging)'),
    '[This post from Coding Horror]' +
      yellow('(http://blog.codinghorror.com/rubber-duck-problem-solving/)'),
    ''
  ],
  exit: yellow('\nquack.')
};

module.exports = class RubberDucky {
  constructor({ interactive }) {
    this.interactive = interactive;
    this.interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.currentStep = 1;
    this.init();
  }

  init() {
    this.interface.setPrompt('');
    this.interface.prompt();
    this.bindInteractions();
    this.firstStep();
  }

  bindInteractions() {
    this.interface
      .on('line', input => {
        this.onInput(input);
      })
      .on('SIGINT', () => this.exit());
  }

  firstStep() {
    this.print(textMap.system);
    this.print(textMap.ducky);
    this.interface.question(this.interactive ? textMap.expected : '', input => {
      this.onInput(input);
      this.currentStep =
        input === 'info' || input === 'restart' || input === 'interactive'
          ? 1
          : 2;

      if (this.interactive && this.currentStep === 2) {
        this.print(textMap.actual);
      }
    });
  }

  clear() {
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
  }

  onInput(input) {
    if (input === 'info') {
      this.interface.question(textMap.info.join('\n'), () => {
        if (this.currentStep === 1) {
          this.firstStep();
        } else if (this.currentStep === 2) {
          this.print(textMap.ducky);
          this.print(textMap.actual);
        }
      });
    } else if (input === 'restart') {
      this.clear();
      this.firstStep();
    } else if (input === 'interactive') {
      this.clear();
      this.interactive = true;
      this.firstStep();
    } else if (input === 'noninteractive') {
      this.clear();
      this.interactive = false;
      this.firstStep();
    } else if (input === 'exit') {
      this.exit();
    }
  }

  exit() {
    this.print(textMap.exit);
    this.interface.close();
  }

  print(...lines) {
    lines.forEach(text => {
      Array.isArray(text) ? console.log(text.join('\n')) : console.log(text);
    });
  }
};
