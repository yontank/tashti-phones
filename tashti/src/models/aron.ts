import { DataTypes, Sequelize } from "sequelize"


export default (sequelize: Sequelize) => {
    const Aron = sequelize.define("Aron", {
        name: DataTypes.STRING(32),
        location: DataTypes.STRING(32),
        // shirshur_from: DataTypes.STRING, // relationship('Aron', cascade='all, delete-orphan')
        utpNum: DataTypes.INTEGER,
        // UTPs: DataTypes.INTEGER // relationship('UTP', back_populates='aron', cascade='all, delete-orphan', lazy='raise_on_sql')
    }, {
        freezeTableName: true,
        tableName: 'arons'
    });
    return Aron
}