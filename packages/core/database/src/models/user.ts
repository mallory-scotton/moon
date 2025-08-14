/** Dependencies */
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  HasOneCreateAssociationMixin
} from '@sequelize/core';
import { Attribute, AutoIncrement, NotNull, PrimaryKey, Table, HasOne } from '@sequelize/core/decorators-legacy';
import { UserPreferences } from './user-preferences';

/**
 * @brief User model
 * @description This model represents the users.
 */
@Table({
  tableName: 'users',
  freezeTableName: true,
  modelName: 'User',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User, { omit: 'protected' }>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.TEXT)
  declare hashed_password: string | null;

  @Attribute(DataTypes.TEXT)
  declare salt: string | null;

  @Attribute(DataTypes.DATE)
  declare created_at: CreationOptional<Date>;

  @Attribute(DataTypes.DATE)
  declare updated_at: CreationOptional<Date>;

  @Attribute(DataTypes.VIRTUAL)
  get protected(): boolean {
    return !!this.hashed_password;
  }

  @HasOne(() => UserPreferences, { foreignKey: 'user_id', inverse: 'user' })
  declare preferences: NonAttribute<UserPreferences>;

  /** Association: User.hasOne(UserPreferences, { foreignKey: 'user_id' }) */
  declare getPreferences: HasOneGetAssociationMixin<UserPreferences>;
  declare setPreferences: HasOneSetAssociationMixin<UserPreferences, number>;
  declare createPreferences: HasOneCreateAssociationMixin<UserPreferences>;

  /** Override toJSON method */
  toJSON(): any {
    const values: any = { ...this.get() };
    delete values.hashed_password;
    delete values.salt;
    return values;
  }
}
