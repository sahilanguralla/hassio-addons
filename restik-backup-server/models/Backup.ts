import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

export class Backup extends Model {
  public id!: number;
  public locationId!: number;
  public status!: 'success' | 'failure';
  public size!: number;
  public createdAt!: Date;
}

Backup.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    locationId: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.ENUM('success', 'failure'), allowNull: false },
    size: { type: DataTypes.INTEGER, allowNull: true },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { sequelize, modelName: 'backup', updatedAt: false }
);

// Define associations
Backup.belongsTo(Location, { foreignKey: 'locationId' });
Location.hasMany(Backup, { foreignKey: 'locationId' });
