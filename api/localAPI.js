const LocalRepository = require('../repository/sequelize/LocalRepository');

exports.getLocal = (req, res, next) => {
    LocalRepository.getLocal()
        .then(ress => {
            res.status(200).json(ress);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getLocalById = (req, res, next) => {
    const locId = req.params.locId;
    LocalRepository.getLocalById(locId)
        .then(ress => {
            if (!ress) {
                res.status(404).json({
                    message: 'Local with id ' + locId + ' not found'
                })
            } else {
                res.status(200).json(ress);
            }
        });
};

exports.createLocal = (req, res, next) => {
    LocalRepository.createLocal(req.body)
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

exports.updateLocal = (req, res, next) => {
    const locId = req.params.locId;
    LocalRepository.updateLocal(locId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Local updated!', emp: result })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteLocal = (req, res, next) => {
    const locId = req.params.locId;
    LocalRepository.deleteLocal(locId)
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
