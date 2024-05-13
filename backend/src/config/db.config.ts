import { DataSourceOptions, createConnection } from 'typeorm';
import { User } from '../entities/user.entity';
import "reflect-metadata"
import dotenv from 'dotenv';
import { Post } from '../entities/post.entity';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const dataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Post],
  subscribers: [],
  migrations: [],
} as DataSourceOptions;