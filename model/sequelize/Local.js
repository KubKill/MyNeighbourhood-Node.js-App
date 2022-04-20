const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Local = sequelize.define('Local', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    number: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Pole nie może mieć wartości null"
            }, notEmpty: {
                msg: "Pole jest wymagane"
            },
            isAlphanumeric: {
                msg: "Pole nie powinno zawierać znaków specjalnych"
            },len: {
                args: [1,6],
                msg: "Pole powinno zawierać od 1 do 6 znaków"
            }
        }
    },
    postal_code: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Pole nie może mieć wartości null"
            }, notEmpty: {
                msg: "Pole jest wymagane"
            }, len: {
                args: [5],
                msg: "Pole powinno zawierać 5 cyfr"
            }, isNumeric: {
                msg: "W polu mogą się znaleźć tylko cyfry"
            }
        }
    },
    street: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: "Pole nie może być pustym stringiem"
            }, isAlpha: {
                msg: "Pole powinno zawierać tylko litery"
            }, len: {
                args: [2,30],
                msg: "Pole powinno zawierać od 2 do 30 liter"
            }
        }
    },
    street_number: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: "Pole nie może być pustym stringiem"
            },
            isAlphanumeric: {
                msg: "Pole nie powinno zawierać znaków specjalnych"
            },
            len: {
                args: [1,6],
                msg: "Pole powinno zabierać od 1 do 6 znaków"
            }
        }
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Pole nie może mieć wartości null"
            }, notEmpty: {
                msg: "Pole nie powinno zostać puste"
            }, isAlpha: {
                msg: "Pole powinno zawierać jedynie litery"
            }, len: {
                args: [2, 30],
                msg: "Pole powinno zawierać od 2 do 30 znaków"
            }
        }
    },
    size: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
            isNumeric: {
                msg: "Pole powinno zawierać jedynie cyfry"
            },
            min: {
                args: [8],
                msg: "Minimalna wielkość mieszkania to 8 metrów kwadratowych"
            }, len: {
                args: [1, 6],
                msg: "Polle powinno zawierać od 1 do 6 cyfr"
            }
        }
    },
    floor: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
            isNumeric: {
                msg: "Pole może zawierać jedynie cyfry"
            }, min: {
                args: [-5],
                msg: "Kaman nie mieszkasz w schronie atomowym"
            }, len: {
                args: [1,3],
                msg: "Pole może zawierać od 1 do 3 cyfr"
            }
        }
    },
    has_garage: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        validate: {
            min: {
                args: [1],
                msg: 'Pole nie może zawierać wartości mniejszej niż 1'
            }
        }
    },
    has_basement: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        validate: {
             min: {
                args: [1],
                msg: 'Pole nie może zawierać wartości mniejszej niż 1'
            }
        }
    }
});

module.exports = Local;