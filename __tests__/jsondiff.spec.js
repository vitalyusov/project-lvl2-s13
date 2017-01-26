import fs from 'fs';
import parseJson from '../src/jsonparse';
import parseYaml from '../src/yamlparse';
import { diff, toString } from '../src/diff';

const beforeFile = fs.readFileSync(`${__dirname}/file1.json`, 'utf-8');
const afterFile = fs.readFileSync(`${__dirname}/file2.json`, 'utf-8');

const expected = [
  { sign: ' ', source: { host: 'hexlet.io' } },
  { sign: '-', source: { timeout: 50 } },
  { sign: '-', source: { proxy: '123.234.53.22' } },
  { sign: '+', source: { timeout: 20 } },
  { sign: '+', source: { verbose: true } },
];

const expectedStr = `{
   host: hexlet.io
 - timeout: 50
 - proxy: 123.234.53.22
 + timeout: 20
 + verbose: true
}`;

it('should return correct difference of objects', () => {
  const beforeObj = parseJson(beforeFile);
  const afterObj = parseJson(afterFile);
  const result = diff(beforeObj, afterObj);
  expect(result).toEqual(expected);
});

it('should return correct string reprentation of diff', () => {
  const str = toString(expected);
  expect(str).toEqual(expectedStr);
});

it('should correcly diff YAML files', () => {
  const beforeYml = fs.readFileSync(`${__dirname}/yaml1.yml`, 'utf-8');
  const afterYml = fs.readFileSync(`${__dirname}/yaml2.yml`, 'utf-8');
  const beforeObj = parseYaml(beforeYml);
  const afterObj = parseYaml(afterYml);
  const result = diff(beforeObj, afterObj);
  expect(result).toEqual(expected);
});
