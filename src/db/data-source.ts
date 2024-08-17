// src/data-source.ts
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

const dataSource = new DataSource({
  name: 'default',
  type: 'sqlite',
  database: process.env.DATABASE_NAME,
  entities: ['dist/src/**/entities/*.entity.js'],
  migrations: ['dist/src/db/migrations/*.js'],
});

export { dataSource };
