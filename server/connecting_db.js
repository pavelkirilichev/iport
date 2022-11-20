const dbConfig = require("./config_db");
const mysql = require("mysql2");

let connectPool = mysql
  .createPool({
    connectionLimit: 5,
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
  })
  .promise();

module.exports = connectPool;
