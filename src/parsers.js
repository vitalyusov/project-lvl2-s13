import jsonparse from './jsonparse';
import yamlparse from './yamlparse';
import iniparse from './iniparse';

export default (ext) => {
  switch (ext) {
    case '.json':
      return jsonparse;
    case '.yml':
      return yamlparse;
    case '.ini':
      return iniparse;
    default:
      throw "No parser found for provided extension";
  }
};
