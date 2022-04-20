const Resident = require("../../model/sequelize/Resident");
const Local = require("../../model/sequelize/Local");
const ResidentLocal = require("../../model/sequelize/Resident_Local");

exports.getResident = () => {
    return Resident.findAll();
};

exports.getResidentById = (resId) => {
    return Resident.findByPk(resId,
        {
            include: [{
                model: ResidentLocal,
                as: 'resident_local',
                include: [{
                    model: Local,
                    as: 'local'
                }]
            }]
        });
};

exports.createResident = (newResData) => {

    return Resident.create({
        firstName: newResData.firstName,
        lastName: newResData.lastName,
        number: (newResData.number=='') ? null : newResData.number,
        email: (newResData.email=='') ? null : newResData.email
    });
};

exports.updateResident = (resId, resData) => {
    return Resident.update({
        firstName: resData.firstName,
        lastName: resData.lastName,
        number: (resData.number=='') ? null : resData.number,
        email: (resData.email=='') ? null : resData.email
    }, { where: { _id: resId } });
}

exports.deleteResident = (resId) => {
    return Resident.destroy({
        where: { _id: resId }
    });
};