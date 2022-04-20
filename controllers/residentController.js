const ResidentRepository = require('../repository/sequelize/ResidentRepository');
const LocalRepository = require("../repository/sequelize/LocalRepository");

exports.showResidentList = (req, res, next) => {
    ResidentRepository.getResident()
        .then(ress => {
            res.render('pages/resident/list', { ress: ress, navLocation: "residents", title: 'Moi Somsiedzi', img: '/images/somsiedzi-kibel.jpg' });
        });
}

// exports.showAddResidentList = (req, res, next) => {
//     res.render('pages/resident/form-invalid', { navLocation: "residents", title: 'Moi Somsiedzi', img: '/images/somsiedzi-kibel.jpg' });
// }

exports.showAddResidentForm = (req, res, next) => {
    res.render('pages/resident/form-invalid', { validationErrors: [], ress: {}, formMode: 'createNew', btnLabel: 'Dodaj somsiada', formAction: '/residents/add', navLocation: "residents", title: 'Moi Somsiedzi', title2: "Dodaj Somsiada", img: '/images/somsiedzi-kibel.jpg' });
};

// exports.showResidentDetails = (req, res, next) => {
//     res.render('pages/resident/select', { navLocation: "residents", title: 'Moi Somsiedzi', img: '/images/somsiedzi-kibel.jpg' });
// }

exports.showResidentDetails = (req, res, next) => {
    const resId = req.params.resId;
    ResidentRepository.getResidentById(resId)
        .then(ress => {
            res.render('pages/resident/form-invalid', { validationErrors: [], ress: ress, formMode: 'showDetails', formAction: '/residents/update', navLocation: "residents", title: 'Moi Somsiedzi', title2: 'Dane Somsiada', img: '/images/somsiedzi-kibel.jpg' });
        });
};

// exports.showResidentUpdate = (req, res, next) => {
//     res.render('pages/resident/form-edit', { navLocation: "residents", title: 'Moi Somsiedzi', img: '/images/somsiedzi-kibel.jpg' });
// }

exports.showResidentUpdate = (req, res, next) => {
    const ressId = req.params.resId;
    ResidentRepository.getResidentById(ressId)
        .then(ress => {
            res.render('pages/resident/form-invalid', { validationErrors: [], ress: ress, formMode: 'edit', btnLabel: 'Edytuj Somsiada', formAction: '/residents/update', navLocation: "residents", title: 'Moi Somsiedzi', title2: 'Zmień Somsiada', img: '/images/somsiedzi-kibel.jpg' });
        });
}

// exports.showResidentDelete = (req, res, next) => {
//     res.render('pages/resident/delete-question', { navLocation: "residents", title: 'Moi Somsiedzi', img: '/images/somsiedzi-kibel.jpg' });
// }

// exports.showResidentDelete = (req, res, next) => {
//     res.render('pages/resident/delete-question', { navLocation: "residents", title: 'Moi Somsiedzi', img: '/images/somsiedzi-kibel.jpg' });
// }

exports.addResident = (req, res, next) => {
    const resData = { ...req.body };
    ResidentRepository.createResident(resData)
        .then(result => {
            res.redirect('/residents');
        })
        .catch(err => {
            err.errors.forEach(e => {
                if(e.path.includes('email') && e.type == 'unique violation') {
                    e.message = "Podany adres email jest już używany";
                }
            })
            res.render('pages/resident/form-invalid', { validationErrors: err.errors, ress: resData, formMode: 'createNew', btnLabel: 'Dodaj somsiada', formAction: '/residents/add', navLocation: "residents", title: 'Moi Somsiedzi', title2: "Dodaj Somsiada", img: '/images/somsiedzi-kibel.jpg' });
        });
};

exports.updateResident = (req, res, next) => {
    const ressId = req.body._id;
    const resData = { ...req.body };
    ResidentRepository.updateResident(ressId, resData)
        .then(result => {
            res.redirect('/residents');
        })
        .catch(err => {
            ResidentRepository.getResidentById(ressId)
                .then(result => {
                    res.render('pages/resident/form-invalid', { validationErrors: err.errors, ress: result, formMode: 'edit', btnLabel: 'Edytuj Somsiada', formAction: '/residents/update', navLocation: "residents", title: 'Moi Somsiedzi', title2: 'Zmień Somsiada', img: '/images/somsiedzi-kibel.jpg'});
                })
        });
};

exports.deleteResident = (req, res, next) => {
    const resId = req.params.resId;
    ResidentRepository.deleteResident(resId)
        .then(result => {
            res.redirect('/residents');
        });
};