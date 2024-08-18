import { registerAs } from '@nestjs/config';
import config from './config';
import devConfig from './config-development';
import prodConfig from './config-production';
import * as _ from 'lodash';
import testConfig from './config-test';

const environment = process.env.NODE_ENV || 'development';
let envConfig;

switch (environment) {
  case 'development':
    envConfig = () => mergeEnvironmentConfigs(config(), devConfig());
    break;
  case 'test':
    envConfig = () => mergeEnvironmentConfigs(config(), testConfig());
    break;
  case 'production':
    envConfig = () => mergeEnvironmentConfigs(config(), prodConfig());
    break;
  default: {
    console.log(environment);
    throw Error('No environment found');
  }
}

export default registerAs('config', () => envConfig());

function mergeEnvironmentConfigs(
  mainConfig: Record<string, any>,
  specificEnvConfig: Record<string, any>,
): Record<string, any> {
  try {
    return _.mergeWith(
      {},
      mainConfig,
      specificEnvConfig,
      (objValue, srcValue) => {
        // used for merging array values and avoid overwriting
        if (_.isArray(objValue)) {
          return objValue.concat(srcValue);
        }
      },
    );
  } catch (error) {
    console.log(error);
    return mainConfig;
  }
}
