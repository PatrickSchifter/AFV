
const sql = require('mssql');

const config = {
   user: 'afv40_aplicacao',
   password: 'JBA3NuKL8YBdeN7',
   server: '10.0.2.15',
   database: 'AFV40',
   options: {
      encrypt: true,
      trustServerCertificate: true,
   },
};

const pool = new sql.ConnectionPool(config);

module.exports = {
   pool
}



