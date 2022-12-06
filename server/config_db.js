const config = process.env.NODE_ENV === 'development' ? {
  host: "vip87.hosting.reg.ru",
  user: "u1688586_test",
  password: "Pk8848205123",
  database: "u1688586_test",
  port: "3306",
} : {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
}

module.exports = config;
