import tree from './treeprinter';
import plain from './plainprinter';

const printers = { tree, plain };
export default (format) => {
  const printer = printers[format];
  if (!printer) {
    throw new Error(`Format '${format}' not supported`);
  }
  return printer;
};
