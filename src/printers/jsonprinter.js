const getJsonDiff = (diff) => {
  const json = diff.map(({ action, key, before, after, deep }) => {
    if (deep) {
      return { action, key, deep: getJsonDiff(deep) };
    }
    return { key, action, before, after };
  });

  return { items: json };
};

export default diff => JSON.stringify(getJsonDiff(diff), null, 2);
