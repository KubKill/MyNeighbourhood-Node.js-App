const authUtil = require('../../util/authUtils');

const sequelize = require('./sequelize');
const Resident = require('../../model/sequelize/Resident');
const Local = require('../../model/sequelize/Local');
const ResidentLocal = require('../../model/sequelize/Resident_Local');
const User = require('../../model/sequelize/User')
const passHashed = authUtil.hashPassword('12345');

module.exports = () => {
    User;
    Resident.hasMany(ResidentLocal, { as: 'resident_local', foreignKey: { name: 'res_id', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    ResidentLocal.belongsTo(Resident, { as: 'resident', foreignKey: { name: 'res_id', allowNull: false } });
    Local.hasMany(ResidentLocal, { as: 'resident_local', foreignKey: { name: 'loc_id', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    ResidentLocal.belongsTo(Local, { as: 'local', foreignKey: { name: 'loc_id', allowNull: false } });

    let allRes, allLoc, allUsr;
    return sequelize
        .sync({ force: true })
        .then(() => {
            return User.findAll();
        })
        .then(usrs => {
            if (!usrs || usrs.length == 0) {
                return User.bulkCreate([
                    { email: 'abc@wp.pl', password: passHashed }
                ])
                    .then(() => {
                        return User.findAll();
                    });
            } else {
                return usrs;
            }
        })
        .then(usrs => {
            allUsr = usrs;
            return Resident.findAll();
        })
        .then(res => {
            if (!res || res.length == 0) {
                return Resident.bulkCreate([
                    { firstName: 'Przemyslaw', lastName: 'Klijanski', number: '123456789', email: 'kubakiljanski2008@wp.pl' }
                ])
                    .then(() => {
                        return Resident.findAll();
                    });
            } else {
                return res;
            }
        })
        .then(res => {
            allRes = res;
            return Local.findAll();
        })
        .then(loc => {
            if (!loc || loc.length == 0) {
                return Local.bulkCreate([
                    { number: '30', postal_code: '03704', street: 'Panieńska', street_number: '5', city: 'Warszawa', size: 80, floor: 2, has_garage: false, has_basement: false }
                ])
                    .then(() => {
                        return Local.findAll();
                    });
            } else {
                return loc;
            }
        })
        .then(loc => {
            allLoc = loc;
            return ResidentLocal.findAll();
        })
        .then(resloc => {
            if (!resloc || resloc.length == 0) {
                return ResidentLocal.bulkCreate([
                    { res_id: allRes[0]._id, loc_id: allLoc[0]._id, from: '1997-09-24', until: '2010-09-24' }
                ]);
            } else {
                return resloc;
            }
        });
};