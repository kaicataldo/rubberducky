var readline = require('readline'),
    chalk = require('chalk');


function rubberDucky() {
  var explaining = false,
      helping = false,
      yellow = chalk.yellow,
      red = chalk.red,
      white = chalk.white,
      bold = chalk.bold,
      counter = 1,
      answers = {};


  var interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  var duckySays = {
    load: function() {
      console.log('');
      console.log(yellow.bold('Rubber Ducky (v1.0.0)') + ' | Type ' + bold('help') + ' for help or ' + bold('exit') + ' to quit');
      this.ducky();
      this.goal();
    },

    help: function() {
      helping = true;
      console.log('');
      console.log(yellow.bold('Rubber Ducky Help'));
      console.log(yellow.bold('-----------------'));
      console.log('');
      console.log('recap              ' + 'Recap your goal and steps');
      console.log('change goal        ' + 'Change your goal');
      console.log('change step [num]  ' + 'Change a specific step [num] (Ex: edit step 1)');
      console.log('change steps       ' + 'Start your steps over');
      console.log('done               ' + 'Finish steps');
      console.log('exit               ' + 'Quit (Yay, you solved it!)');
      console.log('');
    },

    goal: function() {
      interface.question('\nCan you explain to me what you want your code to do?\n', function(input) {
        if (input === 'help') {
          duckySays.help();
        }
        else if (input === 'exit') {
          duckySays.exit();
        }
        else if (input === 'recap') {
          duckySays.recap();
        }
        else if (input === 'done') {
          duckySays.recap();
        }
        else {
          answers.goal = input;
          console.log(bold('\nGoal: ' + answers.goal));
          this.explain();
        }
      }.bind(this));
    },

    explain: function() {
      explaining = true;
      console.log('\nCan you exlain how you\'ve tried to solve that problem, step by step?\nType ' + bold('done')
      + ' when you\'re finished, or ' + bold('help') + ' if you need it.\n');
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
    },

    recap: function() {
      var goal = answers.goal || 'Not shared yet';

      this.ducky();
      if (!answers.goal && !answers.explanations) {
        console.log('Nothing shared yet!');
      }
      else {
        console.log(bold('\nGoal: ' + goal));

        if (answers.explanations.length > 0) {
          for (var i = 0; i < answers.explanations.length; i++) {
            var num = i + 1;

            console.log(bold(num + ": " + answers.explanations[i]));
          }
        }
        else {
          console.log(bold('Steps: Not shared yet'));
        }
      }
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
    if (input === 'help') {
      duckySays.help();
    }
    else if (input === 'exit') {
      duckySays.exit();
    }
    else if (input === 'recap') {
      duckySays.recap();
    }
    else if (helping) {

    }
    else if (explaining) {
      if (input === 'done') {
        interface.setPrompt('');
        explaining = false;
        duckySays.recap();
      }
      else {
        answers.explanations.push(input);
        interface.setPrompt(counter + ': ');
        interface.prompt();
        counter++;
      }
    }
    else {
      console.log('');
      console.log('I\'m not sure what you mean! Type ' +
      bold('help') + ' to see your options, or ' + bold('exit')
      + ' if you\'re done.');
      console.log('');
    }
  });

  interface.on('SIGINT', function() {
    duckySays.exit();
  });
}

module.exports = rubberDucky;
