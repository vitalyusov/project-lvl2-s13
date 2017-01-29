import differ from './differ';
import getPrinter from './printers/index';

const compare = (before, after, format = 'tree') => getPrinter(format)(differ(before, after));
export default ({ compare });
