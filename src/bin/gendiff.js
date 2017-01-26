#!/usr/bin/env node

// @flow
import program from 'commander';
import differ from '../index';


program
  .version('0.3.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<first_config> <second_config>')
  .action((first, second) => console.log(differ.compare(first, second)))
  .parse(process.argv);
