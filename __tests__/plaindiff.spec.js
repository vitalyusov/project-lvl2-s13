import differ from '../src/index';

const expectedStr = `Property 'timeout' was updated. From '50' to '20'
Property 'proxy' was removed
Property 'common.setting4' was removed
Property 'common.setting5' was removed
Property 'common.setting2' was added with value: 200
Property 'common.setting6' was added with complex value
Property 'group1.baz' was updated. From 'bars' to 'bas'
Property 'group3' was removed
Property 'group2' was added with complex value
Property 'verbose' was added with value: true`;


it('should return correct diff of deep files in plain format', () => {
  const beforePath = '__tests__/__fixtures__/yaml1big2.yml';
  const afterPath = '__tests__/__fixtures__/yaml2big2.yml';
  const str = differ.compare(beforePath, afterPath, 'plain');
  expect(str).toEqual(expectedStr);
});
