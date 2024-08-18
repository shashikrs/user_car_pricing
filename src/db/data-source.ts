// src/data-source.ts
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

const dataSource = new DataSource({
  name: 'default',
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['dist/**/entities/**.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  migrationsRun: true,
  ssl: {
    rejectUnauthorized: false,
  },
});

export { dataSource };
