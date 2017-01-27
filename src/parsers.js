import jsonparse from './jsonparse';
import yamlparse from './yamlparse';
import iniparse from './iniparse';

export default ext => ({ '.json': jsonparse, '.yml': yamlparse, '.ini': iniparse })[ext];
