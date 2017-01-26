import { differ, toStr } from './differ';

const compare = (before, after) => {
  return toStr(differ(before, after));
};

export default ({ compare });
