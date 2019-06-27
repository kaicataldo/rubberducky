#!/usr/bin/env node

'use strict';

const RubberDucky = require('../lib');

const args = process.argv.slice(2);
const interactive = args[0] === '--interactive';

new RubberDucky({ interactive });
