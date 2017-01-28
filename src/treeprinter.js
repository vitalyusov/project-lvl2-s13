import _ from 'lodash';

const SPACESIZE = 4;
const indent = (str, spaces) => _.padStart(str, spaces);

const makeBrakets = (str, level) => {
  const closeBracket = indent('}', (level * SPACESIZE) + 1);
  return `{\n${str}\n${closeBracket}`;
};

const printObject = (obj, level) => {
  const body = Object.keys(obj).map(key => `${indent(' ', level * SPACESIZE)}${key}: ${obj[key]}`).join('\n');
  return makeBrakets(body, level - 1);
};

const printTreeDiff = (diff, level = 1) => {
  const str = diff
    .map((item) => {
      const sign = indent(item.sign, (level * SPACESIZE) - 1);
      const key = item.key;

      if (_.isArray(item.data)) {
        const deepBody = printTreeDiff(item.data, level + 1);
        return `${sign} ${key}: ${deepBody}`;
      }
      if (_.isPlainObject(item.data)) {
        return `${sign} ${key}: ${printObject(item.data, level + 1)}`;
      }

      return `${sign} ${key}: ${item.data}`;
    }).join('\n');

  return makeBrakets(str, level - 1);
};

export default printTreeDiff;
