import diff from '../src/jsondiff';

it('should throw exception when files not exist', () => {
  expect(() => diff('aaa', 'bbb')).toThrow();
});

it('should load two json files and return difference', () => {
  const differ = diff(`${__dirname}/file1.json`, `${__dirname}/file2.json`);

  const result = differ.diff();


  const expected = [
    { sign: '=', source: { host: 'hexlet.io' } },
    { sign: '-', source: { timeout: 50 } },
    { sign: '-', source: { proxy: '123.234.53.22' } },
    { sign: '+', source: { timeout: 20 } },
    { sign: '+', source: { verbose: true } },
  ];
  //console.log(result);
  console.log(expected);
  differ.toString(result);
  expect(expected).toEqual(result);
});
