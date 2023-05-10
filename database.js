const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
    'hicronabsences',
    'root',
    'root',
    {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres'
    }
);

module.exports = sequelize;
