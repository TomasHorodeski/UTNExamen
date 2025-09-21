const dotenv = require('dotenv');
dotenv.config();

function required(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`[ENV] Falta la variable ${name}`);
    process.exit(1);
  }
  return v;
}

const env = {
  PORT: Number(process.env.PORT || 3000),
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: required('JWT_SECRET'),
  DB_HOST: required('DB_HOST'),
  DB_PORT: Number(process.env.DB_PORT || 3306),
  DB_USER: required('DB_USER'),
  DB_PASSWORD: required('DB_PASSWORD'),
  DB_NAME: required('DB_NAME'),
  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS || 10),
};

module.exports = { env };
