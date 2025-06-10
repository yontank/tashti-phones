import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
    const Phone = sequelize.define("Phone", {
        lineNumber:  DataTypes.STRING(4),
        lineType: DataTypes.ENUM('dumb', 'smart', 'flex', 'taorus'),
        isOccupied: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        zakif: DataTypes.INTEGER,
        block: DataTypes.INTEGER,
        zug: DataTypes.INTEGER

    },{
        freezeTableName: true,
        tableName: 'phones'
    });
    return Phone
}

// class Phone extends Model{
//     declare lineNumber: number;
//     declare lineType: string;
//     declare utps: string;

//     declare ownerId: number;
//     // owner: DataTypes.String, // relationship('Owner', back_populates='phone_lines')

//     declare lastUpdated: Date;
//     declare isOccupied: boolean;

//     declare zakif: number;
//     declare block: number;
//     declare zug: number;
// }
// Phone.init({
//     lineNumber: DataTypes.STRING(4),
//     lineType: DataTypes.ENUM('dumb', 'smart', 'flex', 'taorus'), // Column(Enum(PhoneTypeEnum))
//     utps: DataTypes.String, // relationship('UTP', back_populates='phone', cascade='all, delete-orphan')

//     ownerId: {
//         type: DataTypes.INTEGER,
//         references: 'owner',
//         referencesKey: 'id'
//     }, // ForeignKey('owners.id')
//     // owner: DataTypes.String, // relationship('Owner', back_populates='phone_lines')

//     lastUpdated: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW
//     }, // Column(DateTime(timezone=True), default=datetime.now(), onupdate=datetime.now())
//     isOccupied: DataTypes.BOOLEAN,

//     zakif: DataTypes.INTEGER,
//     block: DataTypes.INTEGER,
//     zug: DataTypes.INTEGER
// });