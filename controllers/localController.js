const LocalRepository = require('../repository/sequelize/LocalRepository');

exports.showLocalList = (req, res, next) => {
    LocalRepository.getLocal()
        .then(loc => {
            res.render('pages/local/list', { loc: loc, navLocation: "locals", title: 'Mieszkania', img: '/images/mieszkania_2.jpg' });
        })
}

exports.showAddLocalList = (req, res, next) => {
    res.render('pages/local/form-invalid', { validationErrors: [], loc: {}, formMode: 'createNew', btnLabel: "Dodaj mieszkanie", formAction: '/locals/add', navLocation: "locals", title: 'Mieszkania', title2: 'Dodaj mieszkanie', img: '/images/mieszkania_2.jpg' });
}

exports.showLocalDetails = (req, res, next) => {
    const locId = req.params.locId;
    LocalRepository.getLocalById(locId)
        .then(locc => {
            res.render('pages/local/form-invalid', { validationErrors: [], loc: locc, formMode: 'showDetails', formAction: '/locals/update', navLocation: "locals", title: 'Mieszkania', title2: 'Szczególy mieszkania', img: '/images/mieszkania_2.jpg' });
        });
};

exports.showLocalUpdate = (req, res, next) => {
    const locId = req.params.locId;
    LocalRepository.getLocalById(locId)
        .then(result => {
            res.render('pages/local/form-invalid', { validationErrors: [], loc: result, formMode: 'edit', btnLabel: 'Edytuj Mieszkanie', formAction: '/locals/update', navLocation: "locals", title: 'Moje mieszkania', title2: 'Edytuj mieszkanie', img: '/images/somsiedzi-kibel.jpg' });
        });
}

exports.showLocalDelete = (req, res, next) => {
    res.render('pages/local/delete-question', { navLocation: "locals", title: 'Mieszkania', img: '/images/mieszkania_2.jpg' });
}



exports.addLocal = (req, res, next) => {
    const locData = { ...req.body };
    LocalRepository.createLocal(locData)
        .then(result => {
            res.redirect('/locals');
        })
        .catch(err => {
            res.render('pages/local/form-invalid', { validationErrors: err.errors, loc: locData, formMode: 'createNew', btnLabel: "Dodaj mieszkanie", formAction: '/locals/add', navLocation: "locals", title: 'Mieszkania', title2: 'Dodaj mieszkanie', img: '/images/mieszkania_2.jpg' });
        });
};

exports.updateLocal = (req, res, next) => {
    const ressId = req.body._id;
    const resData = { ...req.body };
    LocalRepository.updateLocal(ressId, resData)
        .then(result => {
            res.redirect('/locals');
        })
        .catch(err => {
            LocalRepository.getLocalById(ressId)
                .then(result => {
                    res.render('pages/local/form-invalid', { validationErrors: err.errors, loc: result, formMode: 'edit', btnLabel: 'Edytuj Mieszkanie', formAction: '/locals/update', navLocation: "locals", title: 'Moje mieszkania', title2: 'Edytuj mieszkanie', img: '/images/somsiedzi-kibel.jpg'
                    });
                })
        });
};

exports.deleteLocal = (req, res, next) => {
    const locId = req.params.locId;
    LocalRepository.deleteLocal(locId)
        .then(result => {
            res.redirect('/locals');
        });
};