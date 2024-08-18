import { registerAs } from '@nestjs/config';
import prodConfig from './config';
import devConfig from './config-development';
import * as _ from 'lodash';
import testConfig from './config-test';

const environment = process.env.NODE_ENV || 'development';
let envConfig;

console.log(environment);

switch (environment) {
  case 'development':
    envConfig = () => mergeEnvironmentConfigs(prodConfig(), devConfig());
    break;
  case 'test':
    envConfig = () => mergeEnvironmentConfigs(prodConfig(), testConfig());
    break;
  case 'production':
    envConfig = () => {
      return {
        ...prodConfig(),
      };
    };
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
