const User = require('../../model/sequelize/User');
const AuthUtil = require('../../util/authUtils');

exports.findByEmail = (email => {
    return User.findOne({
        where: {email: email}
    });
})

exports.createUser = (newUsrData) => {
    return User.create({
        email: newUsrData.email,
        password: AuthUtil.hashPassword(newUsrData.password)
    });
};

exports.getUser = () => {
    return User.findAll;
}