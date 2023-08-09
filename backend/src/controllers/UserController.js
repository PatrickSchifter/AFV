
const { Pool, Client } = require('pg');

const config = {
   user: 'afv_aplicacao',
   host: 'localhost',
   database: 'afv',
   password: '1234',
   port: 5432, 
 };

const pool = new Pool(config);

module.exports = {
   pool
}



