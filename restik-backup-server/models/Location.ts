import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

export class Location extends Model {
  public id!: number;
  public type!: 'local' | 'remote';
  public path!: string;
  public sshHost?: string;
  public username?: string;
  public password?: string;
  public key?: string;
  public cronSchedule!: string;
  public repositoryName!: string;
}

Location.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    type: { type: DataTypes.ENUM('local', 'remote'), allowNull: false },
    path: { type: DataTypes.STRING, allowNull: false },
    sshHost: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    key: { type: DataTypes.TEXT },
    cronSchedule: { type: DataTypes.STRING, allowNull: false },
    repositoryName: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: 'location' }
);
