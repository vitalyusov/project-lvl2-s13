import _ from 'lodash';

const getFullNodes = (node, prevPath = '') => {
  const path = prevPath === '' ? node.key : `${prevPath}.${node.key}`;
  if (node.action !== 'keepdeep') {
    return { path, node };
  }
  return node.deep.map(item => getFullNodes(item, path));
};

const getPrintValue = (type, value) => {
  switch (type) {
    case 'object':
      return 'complex value';
    case 'primitive':
    default:
      return `value: ${value}`;
  }
};
const printPlainDiff = (diff) => {
  const nodes = _.flattenDeep(diff.map(item => getFullNodes(item)));

  const str = nodes.map((item) => {
    const { path, node } = item;
    switch (node.action) {
      case 'add':
        return `Property '${path}' was added with ${getPrintValue(node.type, node.after)}`;
      case 'update':
        return `Property '${path}' was updated. From '${node.before}' to '${node.after}'`;
      case 'remove':
        return `Property '${path}' was removed`;
      case 'keep':
      default:
        return '';

    }
  });
  return str.filter(s => s !== '').join('\n');
};

export default printPlainDiff;
