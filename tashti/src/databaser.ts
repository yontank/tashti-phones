// const { Sequelize } = require('sequelize');
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: "./TheDatabase.db"
});

import Phone from './models/phone';
import UTP from "./models/UTP";
import Aron from "./models/aron";
import Owner from './models/owner';

const phone = Phone(sequelize)
const utp = UTP(sequelize)
const aron = Aron(sequelize)
const owner = Owner(sequelize)

// aron.belongsToMany(phone, { through: 'UTP' })
// phone.belongsToMany(aron, { through: 'UTP' })

utp.belongsTo(phone)
phone.hasMany(utp)

utp.belongsTo(aron)
aron.hasMany(utp)

phone.belongsTo(owner)
owner.hasMany(phone)

aron.hasMany(aron, {
  foreignKey: 'shirshurFromId'
})
aron.belongsTo(aron, {
  foreignKey: 'shirshurFromId'
})


export { phone, owner, utp, aron }