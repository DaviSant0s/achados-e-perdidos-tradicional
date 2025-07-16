const { Sequelize } = require('sequelize');
const { database, options, password, username  } = require('../configs/env');

const sequelize = new Sequelize(database, username, password, {
  host: options.host,
  dialect: options.dialect,
  port: options.port
} );

try {

  sequelize.authenticate();
  console.log('Database conected!');

} catch (error) {
  console.log('failed to connect: ', error);
}

module.exports = sequelize;