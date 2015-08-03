var readline = require('readline'),
    chalk = require('chalk');


function rubberDucky() {
  var explaining = false,
      yellow = chalk.yellow,
      red = chalk.red,
      white = chalk.white,
      counter = 1,
      answers = {};


  var interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  var duckySays = {
    load: function() {
      console.log(yellow.bold('Rubber Ducky (v1.0.0)') + ' | Exit or Ctrl+C to quit');
      this.ducky();
      this.goal();
    },

    help: function() {
      console.log('helping');
    },

    goal: function() {
      interface.question('Can you explain to me what you want your code to do?\n', function(res) {
        answers.goal = res;
        console.log('\nGoal: ' + answers.goal);
        this.explain();
      }.bind(this));
    },

    explain: function() {
      explaining = true;

      console.log('\nCan you exlain step by step how you\'ve tried to solve that problem?');
      interface.setPrompt(counter + ': ');
      interface.prompt();
      counter++;
    },

    ducky: function() {
      console.log('');
      console.log(yellow('           _.._'));
      console.log(yellow('          / ') + white('a a') + yellow('\\') + red('__,'));
      console.log(yellow('          \\  ') + red('-.___/'));
      console.log(yellow('           \\  \\'));
      console.log(yellow('(\\__,-----,_)  \\'));
      console.log(yellow('(    (_         )'));
      console.log(yellow(' \\_   (__       /'));
      console.log(yellow('   \\___________/'));
      console.log('');
      console.log('');
    },

    exit: function() {
      console.log('\n\nquack.\n');
      interface.close();
    }
  };

  interface.setPrompt('');
  interface.prompt();
  duckySays.load();

  answers.explanations = [];

  interface.on('line', function(input) {
    if (explaining) {
      if (input === 'done') {
        explaining = false;
        duckySays.help();
      }
      else {
        answers.explanations.push(input);
        interface.setPrompt(counter + ': ');
        interface.prompt();
        counter++;
      }
    }
    else {
      if (input === 'ducky') {
        duckySays.ducky();
      }
      else if (input === 'exit') {
        duckySays.exit();
      }
    }
  });

  interface.on('SIGINT', function() {
    duckySays.exit();
  });
}

module.exports = rubberDucky;
