import fs from 'fs';
import path from 'path';
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

  // check source to dest keys
  const resForward = Object.keys(beforeObj).reduce((prev, current) => {
    const source = {};
    source[current] = beforeObj[current];
    let sign;
    if (beforeObj[current] === afterObj[current]) {
      sign = ' ';
    }

    if (!afterObj[current] || beforeObj[current] !== afterObj[current]) {
      sign = '-';
    }
    return [...prev, { sign, source }];
  }, []);

  // and check dest to source keys
  const resBackward = Object.keys(afterObj).reduce((prev, current) => {
    const source = {};
    source[current] = afterObj[current];
    let sign;
    if (!beforeObj[current] || beforeObj[current] !== afterObj[current]) {
      sign = '+';
      return [...prev, { sign, source }];
    }
    return prev;
  }, []);

  return [...resForward, ...resBackward];
};
