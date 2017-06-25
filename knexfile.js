// require('dotenv').config();
// require('dotenv').config({silent: true})
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT,
      ssl      : process.env.DB_SSL
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  production: {
    // client: 'postgresql',
    client: 'pg',
    connection: 'postgres://mvjvhsltypwpeu:5d4181b29dd99843172609769cf5e2c673aca460f470b536cb858148b1524f0f@ec2-23-23-222-147.compute-1.amazonaws.com:5432/db8p8fm4m6ek4q?ssl=true',
    ssl: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    }
  }

};
