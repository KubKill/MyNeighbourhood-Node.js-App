const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const ResidentLocal = sequelize.define('Resident_Local', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    from: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole nie może zostać puste"
            }, isDate: {
                msg: "Poprawny format daty to RRRR-MM-DD"
            }, isTooEarly(value) {
                let dateLimit = new Date();
                dateLimit.setFullYear(dateLimit.getFullYear()-110)
                if (value < dateLimit){
                    throw new Error('Zbyt wczesna data');
                }
            }, notFromFuture(value) {
                let dateNow = new Date();
                if (value > dateNow){
                    throw new Error('Data nie może być późniejsza niż obecna');
                }
            }
            //nie może być późniejsza niż obecna
            //nie może wcześniejsza niż 110 lat
        }
    },
    until: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: "Nie można zapisać pustego Stringa"
            }, isDate: {
                msg: "Prawidłowy format to RRRR-MM-DD"
            }, notFromFuture(value) {
                let dateNow = new Date();
                if (value > dateNow) {
                    throw new Error('Data nie może być późniejsza niż obecna');
                }
            }, notEarlierThanFrom(value) {
                if (this.from > value && value != null) {
                    throw new Error("Data do nie może być wcześniejsza niż od")
                }
            }
        }
    },
    res_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole nie może zostać puste"
            },
            isNumeric: {
                msg: "Pole może zawierać wyłącznie cyfry"
            }
        }
    },
    loc_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole nie może zostać puste"
            },
            isNumeric: {
                msg: "Pole może zawierać wyłącznie cyfry"
            }
        }
    }
})

module.exports = ResidentLocal;