const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Resident = sequelize.define('Resident', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole nie powinno zostać puste"
            },
            notNull: {
                msg: "Pole nie powinno zostać puste"
            }, is:{
                args: /[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż]/,
                msg: "Pole powinno zawierać jedynie polskie litery"
            }, len: {
                args: [2,30],
                msg: "Pole powinno zwawierać od 2 do 30 znaków"
            }
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole nie powinno zostać puste"
            }, notNull: {
                msg: "Pole nie powinno zostać puste"
            }, is:{
                args: /[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż]/,
                msg: "Pole powinno zawierać jedynie polskie litery"
            }, len: {
                args: [2,40],
                msg: "Pole powinno zwawierać od 2 do 40 znaków"
            }
        }
    },
    number: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: "Pole nie powinno zostać puste"
            },
             isNumeric: {
                msg: "Pole powinno zawierać jedynie cyfry"
            }, len:{
                args: [3,15],
                msg: "Pole powinno zawierać od 3 do 15 cyfr"
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Pole nie powinno zostać puste"
            },
            isEmail: {
                msg: "Pole powinno zawierać poprawny email"
            }
        }
    }
});

module.exports = Resident;