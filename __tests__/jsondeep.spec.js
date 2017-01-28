import differ from '../src/index';


const expectedStr = `{
    common: {
        setting1: Value 1
      - setting2: 200
        setting3: true
      - setting6: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;

it('should return correct diff of deep json files', () => {
  const beforePath = '__tests__/__fixtures__/file1big.json';
  const afterPath = '__tests__/__fixtures__/file2big.json';
  const str = differ.compare(beforePath, afterPath);
  expect(str).toEqual(expectedStr);
});

it('should return correct diff of deep yaml files', () => {
  const beforePath = '__tests__/__fixtures__/yaml1big.yml';
  const afterPath = '__tests__/__fixtures__/yaml2big.yml';
  const str = differ.compare(beforePath, afterPath);
  expect(str).toEqual(expectedStr);
});


it('should return correct diff of deep ini files', () => {
  const beforePath = '__tests__/__fixtures__/conf1big.ini';
  const afterPath = '__tests__/__fixtures__/conf2big.ini';
  const str = differ.compare(beforePath, afterPath);
  expect(str).toEqual(expectedStr);
});
