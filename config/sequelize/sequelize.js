const Sequelize = require('sequelize');

const sequelize = new Sequelize('tin-somsiad-sequelize', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;