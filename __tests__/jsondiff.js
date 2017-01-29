import differ from '../src/index';

const expectedStr = `{
  "items": [
    {
      "key": "host",
      "action": "keep",
      "before": "hexlet.io",
      "after": "hexlet.io"
    },
    {
      "key": "timeout",
      "action": "update",
      "before": 50,
      "after": 20
    },
    {
      "key": "proxy",
      "action": "remove",
      "before": "123.234.53.22"
    },
    {
      "key": "verbose",
      "action": "add",
      "after": true
    }
  ]
}`;

it('should return correct diff of files in json format', () => {
  const beforePath = '__tests__/__fixtures__/yaml1.yml';
  const afterPath = '__tests__/__fixtures__/yaml2.yml';
  const str = differ.compare(beforePath, afterPath, 'json');
  expect(str).toEqual(expectedStr);
});
