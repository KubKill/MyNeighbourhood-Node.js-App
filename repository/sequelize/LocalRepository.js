const Resident = require("../../model/sequelize/Resident");
const Local = require("../../model/sequelize/Local");
const ResidentLocal = require("../../model/sequelize/Resident_Local");

exports.getLocal = () => {
    return Local.findAll();
};

exports.getLocalById = (locId) => {
    return Local.findByPk(locId,
        {
            include: [{
                model: ResidentLocal,
                as: 'resident_local',
                include: [{
                    model: Resident,
                    as: 'resident'
                }]
            }]
        });
};

exports.createLocal = (newLocData) => {
    return Local.create({
        number: newLocData.number,
        postal_code: newLocData.postal_code,
        street: (newLocData.street=='') ? null : newLocData.street ,
        street_number: (newLocData.street_number=='') ? null : newLocData.street_number,
        city: newLocData.city,
        size: (newLocData.size=='') ? null : newLocData.size,
        floor: (newLocData.floor=='') ? null : newLocData.floor,
        has_garage: (newLocData.has_garage=='') ? null : newLocData.has_garage,
        has_basement: (newLocData.has_basement=='') ? null : newLocData.has_basement
    });
};

exports.updateLocal = (locId, locData) => {
    return Local.update({
        number: locData.number,
        postal_code: locData.postal_code,
        street: (newLocData.street=='') ? null : newLocData.street ,
        street_number: (newLocData.street_number=='') ? null : newLocData.street_number,
        city: locData.city,
        size: locData.size,
        floor: (newLocData.floor=='') ? null : newLocData.floor,
        has_garage: (locData.has_garage=='') ? null : locData.has_garage,
        has_basement: (locData.has_basement=='') ? null : locData.has_basement,
    }, { where: { _id: locId } });
};

exports.deleteLocal = (locId) => {
    return Local.destroy({
        where: { _id: locId }
    });
};