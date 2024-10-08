import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export default registerAs('config', () => ({
  port: process.env.PORT || 3000,
  database: {
    name: 'default',
    entities: ['dist/**/entities/**.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
  } as DataSourceOptions,
}));
