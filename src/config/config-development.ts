import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export default registerAs('config', () => ({
  database: {
    type: 'sqlite',
    database: process.env.DATABASE_NAME,
    synchronize: true,
    migrationsRun: false,
  } as DataSourceOptions,
}));
