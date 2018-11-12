const mysql = require('mysql');
  const connection = mysql.createPool({
    host: 'localhost',
    user: 'netuser',
    password: 'netpass',
    database: 'group1'
  });
  module.exports = connection;