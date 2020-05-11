const { Pool } = require('pg');

const connection = new Pool({
  host: process.env.DB_HOST2,
  user: process.env.DB_USER2,
  password: process.env.DB_PASSWORD2,
  database: process.env.DB_NAME2,
  port: process.env.DB_PORT2
});

module.exports = connection;
