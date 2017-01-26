import { differ, toStr } from './differ';

const compare = (before, after) => toStr(differ(before, after));

export default ({ compare });
