import yaml from 'js-yaml';

export default (content) => {
  try {
    return yaml.safeLoad(content);
  } catch (e) {
    return '';
  }
};
