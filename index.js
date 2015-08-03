var chalk = require('chalk'),
    yellow = chalk.yellow,
    red = chalk.red,
    white = chalk.white;

function rubberDucky() {
  printDuck();
}

function printDuck() {
  console.log(yellow('           _.._'));
  console.log(yellow('          / ') + white('a a') + yellow('\\') + red('__,'));
  console.log(yellow('          \\  ') + red('-.___/'));
  console.log(yellow('           \\  \\'));
  console.log(yellow('(\\__,-----,_)  \\'));
  console.log(yellow('(    (_         )'));
  console.log(yellow(' \\_   (__       /'));
  console.log(yellow('   \\___________/'));
  console.log('');
}

module.exports = rubberDucky;
