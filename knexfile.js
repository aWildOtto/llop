// require('dotenv').config();
require('dotenv').config({silent: true})

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
    client: 'postgresql',
    connection: 'postgres://mvjvhsltypwpeu:5d4181b29dd99843172609769cf5e2c673aca460f470b536cb858148b1524f0f@ec2-23-23-222-147.compute-1.amazonaws.com:5432/db8p8fm4m6ek4q?ssl=true',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  }

};
