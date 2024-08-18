import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export default registerAs('config', () => ({
  database: {
    type: 'sqlite',
    database: process.env.DATABASE_NAME,
    entities: ['src/**/entities/**.entity.ts'],
    migrations: ['src/db/migrations/*.ts'],
    synchronize: true,
    migrationsRun: true,
  } as DataSourceOptions,
}));
