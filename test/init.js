
import '../src/common/lib/environment';
// logger depends on environment variables to be set, make sure to include environment before logger
import log from '../src/common/lib/logger';

log.info('Bootstrapping tests setup ');
