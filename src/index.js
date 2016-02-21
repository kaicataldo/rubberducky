import readline from 'readline';
import chalk from 'chalk';
import packageJSON from '../package.json';

const yellow = chalk.yellow;
const red = chalk.red;
const textMap = {
  system: [
    '',
    yellow.bold(`rubber ducky (v${packageJSON.version}) | `) + 'type ' + yellow('exit ') + 'to exit or ' + yellow('restart ') + 'to start over',
    '  for more info on rubber duck debugging, type ' + yellow('info')
  ],
  ducky: [
    '',
    yellow('           _.._'),
    yellow('          / ') + 'a a' + yellow('\\') + red('__,'),
    yellow('          \\  ') + red('-.___/'),
    yellow('           \\  \\'),
    yellow('(\\__,-----,_)  \\'),
    yellow('(    (_         )'),
    yellow(' \\_   (__       /'),
    yellow('   \\___________/'),
    ''
  ],
  expected: '\ncan you explain to me what you want your code to do?\n',
  actual: '\nand can you go over what your code is actually doing, line by line?',
  info: [
    '',
    yellow.bold('info'),
    yellow.bold('-----------------'),
    'rubber duck debugging asserts that solutions to problems oftentimes present themselves when one is forced to verbalize the problem and the steps taken to attempt to solve said problem. the duck is merely a friendly face for you to talk to, to have to explain to.',
    '',
    'in the end, this is not so different from talking out loud to yourself, and in fact, you\'d actually be talking to a real person then...so you can try that instead, if you want – just don\'t be surprised if your co-workers become alarmed or concerned.',
    '',
    'speaking to a duck eliminates this unnecessary stress on your peers and will help you articulate more clearly and without assumed knowledge on the part of the listener (the aforementioned duck). you\'re of course free to live your life as you wish, but trust me, you wanna talk to the duck.',
    '',
    yellow.bold('more info'),
    yellow.bold('-----------------'),
    '[rubberduckdebugging.com]' + yellow('(http://www.rubberduckdebugging.com/)'),
    '[Wikipedia\'s Article on Rubber Duck Debugging]' + yellow('(https://en.wikipedia.org/wiki/Rubber_duck_debugging)'),
    '[This post from Coding Horror]' + yellow('(http://blog.codinghorror.com/rubber-duck-problem-solving/)'),
    ''
  ],
  exit: yellow.bold('\nquack.')
};

class RubberDucky {
  constructor() {
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
    this.start();
  }

  bindInteractions() {
    this.interface.on('line', (input) => {
      this.onInput(input);
    })
    .on('SIGINT', () => this.exit());
  }

  start() {
    this.print(textMap.system);
    this.print(textMap.ducky);
    this.firstStep();
  }

  firstStep() {
    this.interface.question(textMap.expected, (input) => {
      this.onInput(input);
      this.currentStep = input === 'info' ? 1 : 2;

      if (this.currentStep === 2) {
        this.print(textMap.actual);
      }
    });
  }

  onInput(input) {
    if (input === 'info') {
      const question = textMap.info.join('\n');

      this.interface.question(question, () => {
        if (this.currentStep === 1) {
          this.firstStep();
        } else if (this.currentStep === 2) {
          this.print(textMap.actual);
        }
      });
    } else if (input === 'restart') {
      this.currentStep = 1;
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
    lines.forEach((text) => {
      Array.isArray(text)
        ? console.log(text.join('\n'))
        : console.log(text);
    });
  }
}

export default new RubberDucky();
