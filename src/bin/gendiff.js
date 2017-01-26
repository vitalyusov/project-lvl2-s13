#!/usr/bin/env node

// @flow
import program from 'commander';
import parse from '../jsonparse';
import diff from '../diff';

program
  .version('0.3.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<first_config> <second_config>')
  .action((first, second) => console.log(first))
  .parse(process.argv);
