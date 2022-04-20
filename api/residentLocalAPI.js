const ResidentLocalRepository = require('../repository/sequelize/ResidentLocalRepository');

exports.getResidentLocal = (req, res, next) => {
    ResidentLocalRepository.getResidentLocal()
        .then(ress => {
            res.status(200).json(ress);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getResidentLocalById = (req, res, next) => {
    const resLocId = req.params.resLocId;
    ResidentLocalRepository.getResidentLocalById(resLocId)
        .then(ress => {
            if (!ress) {
                res.status(404).json({
                    message: 'Resident with id ' + resLocId + ' not found'
                })
            } else {
                res.status(200).json(ress);
            }
        });
};

exports.createResidentLocal = (req, res, next) => {
    ResidentLocalRepository.createResidentLocal(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateResidentLocal = (req, res, next) => {
    const resLocId = req.params.resLocId;
    ResidentLocalRepository.updateResidentLocal(resLocId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Resident in local updated!', emp: result })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteResidentLocal = (req, res, next) => {
    const resLocId = req.params.resLocId;
    ResidentLocalRepository.deleteResidentLocal(resLocId)
        .then(result => {
            // tu może być problem pod spodem z tym polem emp
            res.status(200).json({ message: 'Removed resident in local', emp: result })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
