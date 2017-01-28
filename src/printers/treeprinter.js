import _ from 'lodash';

const spacesize = 4;
const indent = spaces => str => _.padStart(str, spaces);

const makeBrakets = (str, level) => {
  const idt = indent((level * spacesize) + 1);
  const closeBracket = idt('}');
  return `{\n${str}\n${closeBracket}`;
};

const printPlainObject = (obj, level) => {
  const idnt = indent(level * spacesize);
  const body = Object.keys(obj).map(key => `${idnt(' ')}${key}: ${obj[key]}`).join('\n');
  return makeBrakets(body, level - 1);
};

const printValue = (type, value, level) => {
  switch (type) {
    case 'object':
      return printPlainObject(value, level);
    case 'primitive':
    default:
      return value;
  }
};

const printTreeDiff = (diff, level = 1) => {
  const str = diff
    .map((item) => {
      const idt = indent((level * spacesize) - 1);
      switch (item.action) {
        case 'keepdeep':
          return `${idt(' ')} ${item.key}: ${printTreeDiff(item.deep, level + 1)}`;
        case 'add':
          return `${idt('+')} ${item.key}: ${printValue(item.type, item.after, level + 1)}`;
        case 'remove':
          return `${idt('-')} ${item.key}: ${printValue(item.type, item.before, level + 1)}`;
        case 'update':
          return [`${idt('+')} ${item.key}: ${printValue(item.type, item.after, level + 1)}`,
            `${idt('-')} ${item.key}: ${printValue(item.type, item.before, level + 1)}`,
          ];
        case 'keep':
        default:
          return `${idt(' ')} ${item.key}: ${item.before}`;

      }
    });

  return makeBrakets(_.flatten(str).join('\n'), level - 1);
};

export default printTreeDiff;
