import diff from '../src/jsondiff';

it('should throw exception when files not exist', () => {
  expect(() => diff('aaa', 'bbb')).toThrow();
});

it('should load two json files and return difference', () => {
  const differ = diff(`${__dirname}/file1.json`, `${__dirname}/file2.json`);

  const result = differ();

  const expected = [
    { result: '=', source: { host: 'hexlet.io' } },
    { result: '+', source: { timeout: 20 } },
    { result: '-', source: { timeout: 50 } },
    { result: '-', source: { proxy: '123.234.53.22' } },
    { result: '+', source: { verbose: true } },
  ];

  expect(result).toEqual(expected);
});
