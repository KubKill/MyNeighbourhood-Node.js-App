const ResidentRepository = require('../repository/sequelize/ResidentRepository');
// przyps, tu podałem inną ścieżkę, zdanie bierze ścieżkę db first ja wziąłem codefirst

exports.getResident = (req, res, next) => {
    ResidentRepository.getResident()
        .then(ress => {
            res.status(200).json(ress);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getResidenById = (req, res, next) => {
    const resId = req.params.resId;
    ResidentRepository.getResidentById(resId)
        .then(ress => {
            if (!ress) {
                res.status(404).json({
                    message: 'Resident with id ' + resId + ' not found'
                })
            } else {
                res.status(200).json(ress);
            }
        });
};

exports.createResident = (req, res, next) => {
    ResidentRepository.createResident(req.body)
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

exports.updateResident = (req, res, next) => {
    const resId = req.params.resId;
    ResidentRepository.updateResident(resId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Employee updated!', emp: result })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteResident = (req, res, next) => {
    const resId = req.params.resId;
    ResidentRepository.deleteResident(resId)
        .then(result => {
            // tu może być problem pod spodem z tym polem emp
            res.status(200).json({ message: 'Removed resident', emp: result })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
