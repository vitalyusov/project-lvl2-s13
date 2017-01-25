import fs from 'fs';


const loadFiles = (before, after) => {
  const beforeFile = fs.readFileSync(before, 'utf-8');
  const afterFile = fs.readFileSync(after, 'utf-8');

  const beforeObj = JSON.parse(beforeFile);
  const afterObj = JSON.parse(afterFile);

  const compare = () => {
    const res = [];

    Object.keys(beforeObj).reduce((prev, current) => {
      const diffItem = { source: { current: beforeObj[current] } };
      if (beforeObj[current] === afterObj[current]) {
        const sign = '=';
      }

      if ()
      return [...res, diffItem];
    }, res);

  }

  return compare;
};

export default loadFiles;
