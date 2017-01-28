import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import selectParser from './parsers/index';

const getDiff = (beforeObj, afterObj) => {
  const keyMix = _.union(Object.keys(beforeObj), Object.keys(afterObj));
  const diffs = keyMix.map((key) => {
    const keepDiff = { sign: ' ', key, data: beforeObj[key] };
    const addDiff = { sign: '+', key, data: afterObj[key] };
    const removeDiff = { sign: '-', key, data: beforeObj[key] };

    if (beforeObj[key] === afterObj[key]) {
      return keepDiff;
    }
    if (beforeObj[key] && afterObj[key] && _.isPlainObject(beforeObj[key])
      && _.isPlainObject(afterObj[key])) {
      const deep = getDiff(beforeObj[key], afterObj[key]);
      return { sign: ' ', key, data: deep };
    }
    if (beforeObj[key] && afterObj[key] && beforeObj[key] !== afterObj[key]) {
      return [addDiff, removeDiff];
    }
    if (!afterObj[key]) {
      return removeDiff;
    }

    return addDiff;
  });

  return _.flatten(diffs);
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
