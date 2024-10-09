import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['**/*.entity{.js,.ts}'],
  migrations: [__dirname + '/migrations/*{.js,.ts}']
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;












// import * as dotenv from 'dotenv';
// import { join } from 'path';

// Load environment variables
// dotenv.config({
//   path: `.env.${process.env.NODE_ENV || 'development'}`,
// });

// export const dataSourceOptions: DataSourceOptions = {
//   type: process.env.DB_TYPE as any,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   entities: ['**/*.entity.ts'],
//   migrations: [__dirname + '/migrations/*.ts']
//   // entities: [join(__dirname, '..','**', '*.entity.{ts,js}')],
//   // migrations: [join(__dirname, 'db', 'migrations', '*.{ts,js}')],
// }

// const dataSource = new DataSource(dataSourceOptions);
// export default dataSource;