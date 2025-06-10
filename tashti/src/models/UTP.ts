import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
    const UTP = sequelize.define("UTP", {
        utp: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    }, {
        freezeTableName: true,
        tableName: 'utps',
        indexes: [{
            unique: true,
            fields: ['AronId', 'utp']
        }]  // UniqueConstraint(aron_id, utp)
    });
    return UTP
}