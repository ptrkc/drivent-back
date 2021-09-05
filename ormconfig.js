const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

try {
  const envPath = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
  const envConfig = dotenv.parse(
    fs.readFileSync(path.join(__dirname, envPath))
  );

  for (const config in envConfig) {
    process.env[config] = envConfig[config];
  }
} catch (err) { }

const extraInfo = process.env.NODE_ENV === 'production' ? {
  ssl: {
    rejectUnauthorized: false,
  },
} : {};

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  migrationsTableName: 'migrations',
  entities: ['dist/entities/*.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
    entitiesDir: 'dist/entities/*.js',
  },
  extra: extraInfo
};
