import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export default registerAs('config', () => ({
  database: {
    type: 'sqlite',
    synchronize: true,
    migrationsRun: true,
  } as DataSourceOptions,
}));
