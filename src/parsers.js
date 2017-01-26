import jsonparse from './jsonparse';
import yamlparse from './yamlparse';

export default (ext) => {
  switch (ext) {
    case '.json':
      return jsonparse;
    case '.yml':
      return yamlparse;
    default:
      return undefined;
  }
};
