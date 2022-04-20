const UserRepository = require('../repository/sequelize/UserRepository');
const AuthUtil = require('../util/authUtils');

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    UserRepository.findByEmail(email)
        .then( user => {
            if (!user) {
                res.render('index', {
                    navLocation: 'main',
                    mode: '',
                    submitPath: '/login',
                    title2: 'Login',
                    title: 'Moja Spółdzielnia',
                    img: 'images/somsiedzi.jpg',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            } else if(AuthUtil.comparePasswords(password, user.password) === true) {
                req.session.loggedUser = user;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: 'main',
                    mode: '',
                    submitPath: '/login',
                    title2: 'Login',
                    title: 'Moja Spółdzielnia',
                    img: 'images/somsiedzi.jpg',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
}

exports.loginEdit = (req, res, next) => {
    const user = req.session.loggedUser;
    const usrData = { ...req.body };
    if (!user) {
        res.redirect('/');
    } else {
        UserRepository.createUser(usrData)
        .then( result => {
            res.redirect('/');
        })
            .catch( err => {
                res.render('index', {
                    navLocation: 'main',
                    mode: 'edit',
                    submitPath: '/login-edit',
                    title2: 'Edycja konta',
                    title: 'Moja Spółdzielnia',
                    img: 'images/somsiedzi.jpg',
                    loginError: err.errors
                })
            })
    }
}

exports.viewEditLogin = (req, res, next) => {
    const user = req.session.loggedUser;
    if (!user) {
        res.redirect('/');
    } else {
        res.render('index', {
            navLocation: 'main',
            mode: 'edit',
            submitPath: '/login-edit',
            title2: 'Edycja konta',
            title: 'Moja Spółdzielnia',
            img: 'images/somsiedzi.jpg',
        })
    }
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}