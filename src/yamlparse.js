import yaml from 'js-yaml';

export default (content) => {
  try {
    const obj = yaml.safeLoad(content);
    console.log(obj);
    return obj;
  } catch (e) {
    return '';
  }
};
