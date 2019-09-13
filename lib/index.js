'use strict';

const readline = require('readline');
const textMap = require('./textMap');

module.exports = class RubberDucky {
  constructor({ interactive = false } = {}) {
    this._interactive = interactive;
    this._showHelp = false;
    this._currentStep = 1;
    this._lastInput = '';
    this._createInterface();
    this._print();
  }

  _createInterface() {
    this._interface = readline
      .createInterface({
        input: process.stdin,
        output: process.stdout
      })
      .on('line', input => this._onInput(input))
      .on('SIGINT', () => this._exit());
  }

  _printText(text) {
    console.log(Array.isArray(text) ? text.join('\n') : text);
  }

  _printDuck() {
    this._printText(textMap.system);
    this._printText(textMap.ducky);
  }

  _printFirstStep() {
    this._printDuck();

    if (this._interactive) {
      this._printText(textMap.expected);

      if (this._lastInput.length) {
        this._printText(this._lastInput);
      }
    }
  }

  _printSecondStep() {
    this._printFirstStep();
    this._printText(textMap.actual);
  }

  _printHelp() {
    this._printDuck();
    this._printText(textMap.help);
  }

  _exit() {
    this._printText(textMap.exit);
    this._interface.close();
  }

  _setCurrentStep(input) {
    const shouldReturnToFirstStep =
      input === 'restart' ||
      input === 'interactive' ||
      input === 'noninteractive' ||
      (this._interactive && this._currentStep === 2);
    this._currentStep = shouldReturnToFirstStep ? 1 : 2;
  }

  _clear() {
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
  }

  _print() {
    this._clear();

    if (this._showHelp) {
      this._printHelp();
    } else if (this._interactive && this._currentStep === 2) {
      this._printSecondStep();
    } else {
      this._printFirstStep();
    }
  }

  _onInput(input) {
    if (this._showHelp) {
      this._showHelp = false;
    } else if (input === 'help') {
      this._showHelp = true;
    } else if (input === 'interactive') {
      this._interactive = true;
    } else if (input === 'noninteractive') {
      this._interactive = false;
    } else if (input === 'exit') {
      this._exit();
    } else if (this._interactive) {
      this._lastInput = this._currentStep === 1 ? input : '';
    }

    this._setCurrentStep(input);
    this._print();
  }
};
