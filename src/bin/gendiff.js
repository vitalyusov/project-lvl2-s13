#!/usr/bin/env node

// @flow
import program from 'commander';
import differ from '../index';


program
  .version('0.3.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<first_config> <second_config>')
  .action((first, second, options) => console.log(differ.compare(first, second, options.format)))
  .parse(process.argv);
