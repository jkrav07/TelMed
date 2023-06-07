require('dotenv').config();
const pgpModule = require('pg-promise');

const pgp = pgpModule();

const connection = {
  host: process.env.HOST,
  user: process.env.USERNAME,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
};
console.log('connectionObj', connection);
const db = pgp(connection);
db.connect('SELECT * FROM reviews LIMIT 1')
  .then(() => console.log('CONNECTED TO THE DATABASE SUCCESSFULLY...', connection.host))
  .catch((err) => console.log('FAILED TO CONNECT TO THE DATABASE', err));

module.exports = db;