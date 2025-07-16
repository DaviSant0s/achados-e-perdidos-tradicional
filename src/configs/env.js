require('dotenv').config();

module.exports = {
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    options: {
      host: process.env.MYSQL_HOST,
      dialect: process.env.MYSQL_DIALECT,
      port: process.env.MYSQL_PORT
    },
    
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    API: process.env.API,
}