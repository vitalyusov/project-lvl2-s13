import differ from './differ';
import toString from './treeprinter';

const compare = (before, after) => toString(differ(before, after));

export default ({ compare });
