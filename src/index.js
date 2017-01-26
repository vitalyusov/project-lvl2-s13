import jsonparse from './jsonparse';
import { differ, toStr } from './differ';

const compare = (before, after) => {
  const beforeObj = jsonparse(before);
  const afterObj = jsonparse(after);
  return toStr(differ(beforeObj, afterObj));
};

export default ({ compare });
