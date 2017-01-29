import tree from './treeprinter';
import plain from './plainprinter';
import json from './jsonprinter';

const printers = { tree, plain, json };
export default (format) => {
  const printer = printers[format];
  if (!printer) {
    throw new Error(`Format '${format}' not supported`);
  }
  return printer;
};
