import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export default registerAs('config', () => ({
  port: process.env.PORT || 3000,
  database: {
    name: 'default',
    type: 'postgres',
    database: process.env.DATABASE_URL || 'car_pricing_dev.sqlite',
    entities: ['dist/src/**/**.entity.js'],
    migrations: ['dist/src/db/migrations/*.js'],
    migrationsRun: true,
    ssl: {
      rejectUnauthorized: false,
    },
  } as DataSourceOptions,
}));
