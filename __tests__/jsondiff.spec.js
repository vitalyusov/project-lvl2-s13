import differ from '../src/index';

const expectedStr = `{
   host: hexlet.io
 - timeout: 50
 - proxy: 123.234.53.22
 + timeout: 20
 + verbose: true
}`;

it('should return correct diff of json files', () => {
  const beforePath = '__tests__/__fixtures__/file1.json';
  const afterPath = '__tests__/__fixtures__/file2.json';
  const str = differ.compare(beforePath, afterPath);
  expect(str).toEqual(expectedStr);
});
