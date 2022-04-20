const ResidentLocalRepository = require('../repository/sequelize/ResidentLocalRepository');
const ResidentRepository = require('../repository/sequelize/ResidentRepository');
const LocalRepository = require('../repository/sequelize/LocalRepository');
const Resident = require('../model/sequelize/Resident');

exports.showResidentLocalList = (req, res, next) => {
    ResidentLocalRepository.getResidentLocal()
        .then(result => {
            res.render('pages/resident_local/list', { resLoc: result, navLocation: "resident_local", title: 'Somsiedzi w mieszkaniach', img: '/images/s_w_m.jfif' });
        });
}

exports.showAddResidentLocalList = (req, res, next) => {
    let allLoc, allRes;
    ResidentRepository.getResident()
        .then(residents => {
            allRes = residents;
            return LocalRepository.getLocal();
        })
        .then(locals => {
            allLoc = locals;
            res.render('pages/resident_local/form-invalid', { validationErrors: [], resLoc: {}, formMode: 'createNew', allRes: allRes, allLoc: allLoc, navLocation: "resident_local", btnLabel: "Dodaj zamieszkanie", formAction: '/resident_local/add', title: 'Somsiedzi w mieszkaniach', title2: 'Dodaj zamieszkanie', img: '/images/s_w_m.jfif' });

        });
};

exports.showResidentLocalDetails = (req, res, next) => {
    const resLocId = req.params.resLocId;
    let allLoc, allRes;
    ResidentRepository.getResident()
        .then(residents => {
            allRes = residents;
            return LocalRepository.getLocal();
        })
        .then(locals => {
            allLoc = locals;
            return ResidentLocalRepository.getResidentLocalById(resLocId);
        })
        .then(result => {
            res.render('pages/resident_local/form-invalid', { validationErrors: [], resLoc: result, allRes: allRes, allLoc: allLoc, formMode: 'showDetails', navLocation: "resident_local", formAction: '/resident_local/update', title: 'Somsiedzi w mieszkaniach', title2: 'Szczegóły zamieszkania', img: '/images/s_w_m.jfif' });
        });
};

// exports.showResidentLocalDetails = (req, res, next) => {
//     res.render('pages/resident_local/select', { navLocation: "resident_local", title: 'Somsiedzi w mieszkaniach', img: '/images/s_w_m.jfif' });
// }

exports.showResidentLocalUpdate = (req, res, next) => {
    const resLocId = req.params.resLocId;
    let allLoc, allRes;
    ResidentRepository.getResident()
        .then(residents => {
            allRes = residents;
            return LocalRepository.getLocal();
        })
        .then(locals => {
            allLoc = locals;
            return ResidentLocalRepository.getResidentLocalById(resLocId);
        })
        .then(result => {
            res.render('pages/resident_local/form-invalid', { validationErrors: [], resLoc: result, allRes: allRes, allLoc: allLoc, formMode: 'edit', btnLabel: 'Edytuj zamieszkanie', formAction: '/resident_local/update', navLocation: "resident_local", title: 'Somsiedzi w mieszkaniach', title2: 'Edytuj zamieszkanie', img: '/images/s_w_m.jfif' });
        })
}

exports.showResidentLocalDelete = (req, res, next) => {
    res.render('pages/resident_local/delete-question', { navLocation: "resident_local", title: 'Somsiedzi w mieszkaniach', img: '/images/s_w_m.jfif' });
}

exports.addResidentLocal = (req, res, next) => {
    const resLocData = { ...req.body };
    let allLoc, allRes;
    let errors;
    ResidentLocalRepository.createResidentLocal(resLocData)
        .then(result => {
            res.redirect('/resident_local');
        })
        .catch(err => {
            errors = err.errors;
            ResidentRepository.getResident()
                .then( result => {
                    allRes = result;
                    return LocalRepository.getLocal()
                })
                .then(result => {
                    allLoc = result;
                    res.render('pages/resident_local/form-invalid', { validationErrors: errors, resLoc: resLocData, formMode: 'createNew', allRes: allRes, allLoc: allLoc, navLocation: "resident_local", btnLabel: "Dodaj zamieszkanie", formAction: '/resident_local/add', title: 'Somsiedzi w mieszkaniach', title2: 'Dodaj zamieszkanie', img: '/images/s_w_m.jfif' });
                })
        })
};

exports.updateResidentLocal = (req, res, next) => {
    const resLocId = req.body._id;
    const resLocData = { ...req.body };
    let allRes, allLoc;
    let errors;
    let resLocOld;
    ResidentLocalRepository.updateResidentLocal(resLocId, resLocData)
        .then(result => {
            res.redirect('/resident_local');
        })
        .catch(err => {
            errors = err.errors;
            ResidentRepository.getResident()
                .then(result => {
                    allRes = result;
                    return LocalRepository.getLocal()
                })
                .then(result => {
                    allLoc = result;
                    return ResidentLocalRepository.getResidentLocalById(resLocId)
                })
                .then( result =>{
                    resLocOld = result
                    res.render('pages/resident_local/form-invalid', {
                        validationErrors: err.errors,
                        resLoc: resLocOld,
                        allRes: allRes,
                        allLoc: allLoc,
                        formMode: 'edit',
                        btnLabel: 'Edytuj zamieszkanie',
                        formAction: '/resident_local/update',
                        navLocation: "resident_local",
                        title: 'Somsiedzi w mieszkaniach',
                        title2: 'Edytuj zamieszkanie',
                        img: '/images/s_w_m.jfif'
                    });
                });
        });
}

exports.deleteResidentLocal = (req, res, next) => {
    const resLocId = req.params.resLocId;
    ResidentLocalRepository.deleteResidentLocal(resLocId)
        .then(result => {
            res.redirect('/resident_local');
        });
};