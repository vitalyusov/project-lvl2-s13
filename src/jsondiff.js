import fs from 'fs';

const toString = (diff) => console.log(diff);

const loadFiles = (before, after) => {
  const beforeFile = fs.readFileSync(before, 'utf-8');
  const afterFile = fs.readFileSync(after, 'utf-8');

  const beforeObj = JSON.parse(beforeFile);
  const afterObj = JSON.parse(afterFile);

  const diff = () => {
    // check source to dest keys
    const resForward = Object.keys(beforeObj).reduce((prev, current) => {
      const source = {};
      source[current] = beforeObj[current];
      let sign;
      if (beforeObj[current] === afterObj[current]) {
        sign = '=';
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

  return ({ diff, toString });
};

export default loadFiles;
