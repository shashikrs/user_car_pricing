import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export default registerAs('config', () => ({
  port: process.env.PORT || 3000,
  database: {
    name: 'default',
    type: 'postgres',
    url: process.env.DATABASE_URL,
    database: process.env.DATABASE || 'car_pricing_dev.sqlite',
    entities: ['dist/src/**/entities/**.entity.js'],
    migrations: ['dist/src/db/migrations/*.js'],
    migrationsRun: true,
    ssl: {
      rejectUnauthorized: false,
    },
  } as DataSourceOptions,
}));
