import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import selectParser from './parsers/index';

const getValueType = (value) => {
  if (_.isPlainObject(value)) {
    return 'object';
  }
  return 'primitive';
};

const getDiff = (beforeObj, afterObj) => {
  const keyMix = _.union(Object.keys(beforeObj), Object.keys(afterObj));
  const diffs = keyMix.map((key) => {
    const before = beforeObj[key];
    const after = afterObj[key];

    if (before === after) {
      return { action: 'keep', key, before, after };
    }
    if (before && after && getValueType(before) === 'object' && getValueType(after) === 'object') {
      const deep = getDiff(before, after);
      return { action: 'keepdeep', key, before, after, deep };
    }
    if (beforeObj[key] && afterObj[key] && beforeObj[key] !== afterObj[key]) {
      return { action: 'update', key, before, after, type: getValueType(before) };
    }

    if (!after) {
      return { action: 'remove', key, before, after, type: getValueType(before) };
    }

    return { action: 'add', key, before, after, type: getValueType(after) };
  });
  return diffs;
};

export default (beforePath, afterPath) => {
  const beforeExt = path.extname(beforePath);
  const afterExt = path.extname(afterPath);

  const beforeData = fs.readFileSync(beforePath, 'utf-8');
  const afterData = fs.readFileSync(afterPath, 'utf-8');

  const beforeObj = selectParser(beforeExt)(beforeData);
  const afterObj = selectParser(afterExt)(afterData);

  return getDiff(beforeObj, afterObj);
};
