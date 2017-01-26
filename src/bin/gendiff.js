#!/usr/bin/env node

// @flow
import fs from 'fs';
import program from 'commander';
import differ from '../index';


program
  .version('0.3.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<first_config> <second_config>')
  .action((first, second) => {
    const beforeFile = fs.readFileSync(first, 'utf-8');
    const afterFile = fs.readFileSync(second, 'utf-8');
    console.log(differ.compare(beforeFile, afterFile));
  })
  .parse(process.argv);
