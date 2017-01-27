import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import selectParser from './parsers';

const kvToStr = obj => Object.keys(obj).map(key => `${key}: ${obj[key]}`).join('');

export const toStr = (diff) => {
  const str = diff
    .map(item => ` ${item.sign} ${kvToStr(item.source)}`)
    .join('\n');

  return `{\n${str}\n}`;
};

export const differ = (beforePath, afterPath) => {
  const beforeExt = path.extname(beforePath);
  const afterExt = path.extname(afterPath);
  const beforeData = fs.readFileSync(beforePath, 'utf-8');
  const afterData = fs.readFileSync(afterPath, 'utf-8');

  const beforeObj = selectParser(beforeExt)(beforeData);
  const afterObj = selectParser(afterExt)(afterData);
  const keyMix = _.union(Object.keys(beforeObj), Object.keys(afterObj));
  return keyMix.reduce((accum, key) => {
    const keepDiff = { sign: ' ', source: { [key]: beforeObj[key] } };
    const addDiff = { sign: '+', source: { [key]: afterObj[key] } };
    const removeDiff = { sign: '-', source: { [key]: beforeObj[key] } };

    if (beforeObj[key] === afterObj[key]) {
      return [...accum, keepDiff];
    }
    if (beforeObj[key] && afterObj[key] && beforeObj[key] !== afterObj[key]) {
      return [...accum, addDiff, removeDiff];
    }
    if (!afterObj[key]) {
      return [...accum, removeDiff];
    }
    return [...accum, addDiff];
  }, []);
};
