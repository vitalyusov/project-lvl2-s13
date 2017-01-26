#!/usr/bin/env node

// @flow
import program from 'commander';
import fs from 'fs';
import parse from '../jsonparse';
import { diff, toString } from '../diff';

program
  .version('0.3.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<first_config> <second_config>')
  .action((first, second) => {
    const beforeFile = fs.readFileSync(first, 'utf-8');
    const afterFile = fs.readFileSync(second, 'utf-8');

    const beforeObj = parse(beforeFile);
    const afterObj = parse(afterFile);
    const d = diff(beforeObj, afterObj);
    console.log(toString(d));
  })
  .parse(process.argv);
