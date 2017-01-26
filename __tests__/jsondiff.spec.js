import fs from 'fs';
import parse from '../src/jsonparse';
import { diff, toString } from '../src/diff';

const beforeFile = fs.readFileSync(`${__dirname}/file1.json`, 'utf-8');
const afterFile = fs.readFileSync(`${__dirname}/file2.json`, 'utf-8');

const beforeObj = parse(beforeFile);
const afterObj = parse(afterFile);
const result = diff(beforeObj, afterObj);

it('should return correct difference of objects', () => {
  const expected = [
    { sign: ' ', source: { host: 'hexlet.io' } },
    { sign: '-', source: { timeout: 50 } },
    { sign: '-', source: { proxy: '123.234.53.22' } },
    { sign: '+', source: { timeout: 20 } },
    { sign: '+', source: { verbose: true } },
  ];

  expect(result).toEqual(expected);
});

it('should return correct string reprentation of diff', () => {
  const expected = `{
   host: hexlet.io
 - timeout: 50
 - proxy: 123.234.53.22
 + timeout: 20
 + verbose: true
}`;


  const str = toString(result);
  expect(str).toEqual(expected);
});
