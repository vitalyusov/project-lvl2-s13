import fs from 'fs';
import differ from '../src/index';

const expectedStr = `{
   host: hexlet.io
 - timeout: 50
 - proxy: 123.234.53.22
 + timeout: 20
 + verbose: true
}`;

it('should return correct diff of json files', () => {
  const beforeData = fs.readFileSync(`${__dirname}/__fixtures__/file1.json`, 'utf-8');
  const afterData = fs.readFileSync(`${__dirname}/__fixtures__/file2.json`, 'utf-8');
  const str = differ.compare(beforeData, afterData);
  expect(str).toEqual(expectedStr);
});
