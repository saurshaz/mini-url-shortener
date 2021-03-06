import Habitat from 'habitat';
import path from 'path';

switch (process.env.NODE_ENV) {
  case 'prod':
    Habitat.load(path.resolve(__dirname, '../../config/.env.prod'));
    break;
  case 'test':
    Habitat.load(path.resolve(__dirname, '../../config/.env.test'));
    break;
  case 'development':
    // @review :: sample.env is not supposed to be used anywhere
    Habitat.load(path.resolve(__dirname, '../../config/.env'));
    break;
  case 'stage':
    Habitat.load(path.resolve(__dirname, '../../config/.env.stage'));
    break;
  default:
    // @review :: sample.env is not supposed to be used anywhere
    Habitat.load(path.resolve(__dirname, '../../config/sample.env'));
}
const env = new Habitat();
module.exports = env;
