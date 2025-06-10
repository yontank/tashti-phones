import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  const Owner = sequelize.define("Owner", {
    name: DataTypes.STRING(32),
    location: DataTypes.STRING(32),
  },{
    freezeTableName: true,
    tableName: 'owners'
  });
  return Owner
}