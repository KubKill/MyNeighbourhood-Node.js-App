const Sequelize = require('sequelize');

const Resident = require("../../model/sequelize/Resident");
const Local = require("../../model/sequelize/Local");
const ResidentLocal = require("../../model/sequelize/Resident_Local");

exports.getResidentLocal = () => {
    return ResidentLocal.findAll({
        include: [
            {
                model: Resident,
                as: 'resident'
            },
            {
                model: Local,
                as: 'local'
            }]
    });
};

exports.getResidentLocalById = (reslocId) => {
    return ResidentLocal.findByPk(reslocId, {
        include: [
            {
                model: Resident,
                as: 'resident'
            },
            {
                model: Local,
                as: 'local'
            }]
    });
};

exports.createResidentLocal = (data) => {
    console.log(JSON.stringify(data));

    return ResidentLocal.create({
        res_id: data.res_id,
        loc_id: data.loc_id,
        from: data.from,
        until: (data.until=='') ? null : data.until
    });
};

exports.updateResidentLocal = (resLocId, data) => {
    return ResidentLocal.update({
        res_id: data.res_id,
        loc_id: data.loc_id,
        from: data.from,
        until: (data.until=='') ? null : data.until
    }, { where: { _id: resLocId } });
};

exports.deleteResidentLocal = (resLocId) => {
    return ResidentLocal.destroy({
        where: { _id: resLocId }
    });
};

exports.deleteManyResidentLocal = (resLocIds) => {
    return ResidentLocal.find({ _id: { [Sequelize.Op.in]: resLocIds } })
};