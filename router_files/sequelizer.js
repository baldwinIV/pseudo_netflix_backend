
const initModels = require('../models/init-models');
const { Op, Sequelize } = require('sequelize');
const sequelize = new Sequelize('web_db', 'root', 'Believe02513!', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
});
const models = initModels(sequelize);

module.exports = {
    models,
    Op,
}