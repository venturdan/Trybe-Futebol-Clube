import { DataTypes, Model, InferAttributes,
  InferCreationAttributes, CreationOptional } from 'sequelize';
import db from '.';
import TeamModel from './SequelizeTeam';

class MatchModel extends Model<
InferAttributes<MatchModel>,
InferCreationAttributes<MatchModel>
> {
  declare id: CreationOptional<number>;
  declare homeTeamId: CreationOptional<number>;
  declare homeTeamGoals: CreationOptional<number>;
  declare awayTeamId: CreationOptional<number>;
  declare awayTeamGoals: CreationOptional<number>;
  declare inProgress: CreationOptional<boolean>;
}

MatchModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    homeTeamId: { type: DataTypes.INTEGER, allowNull: false },
    homeTeamGoals: { type: DataTypes.INTEGER, allowNull: false },
    awayTeamId: { type: DataTypes.INTEGER, allowNull: false },
    awayTeamGoals: { type: DataTypes.INTEGER, allowNull: false },
    inProgress: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    sequelize: db,
    tableName: 'matches',
    timestamps: false,
    underscored: true,
  },
);

MatchModel.belongsTo(TeamModel, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

MatchModel.belongsTo(TeamModel, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

export default MatchModel;
