/** Dependencies */
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin
} from '@sequelize/core';
import {
  Attribute,
  AutoIncrement,
  Default,
  NotNull,
  PrimaryKey,
  Table,
  Unique
} from '@sequelize/core/decorators-legacy';
import { LanguageCode } from '@moon/types';
import { User } from './user';

/**
 * @brief UserPreference model
 * @description This model represents the user preferences.
 */
@Table({
  tableName: 'user_preferences',
  freezeTableName: true,
  modelName: 'UserPreference',
  timestamps: false
})
export class UserPreferences extends Model<InferAttributes<UserPreferences>, InferCreationAttributes<UserPreferences>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.ENUM(...Object.values(LanguageCode)))
  @NotNull
  @Default(LanguageCode.ENGLISH)
  declare language: CreationOptional<LanguageCode>;

  @Attribute(DataTypes.ENUM(...Object.values(LanguageCode)))
  @NotNull
  @Default(LanguageCode.ENGLISH)
  declare default_audio_language: CreationOptional<LanguageCode>;

  @Attribute(DataTypes.ENUM(...Object.values(LanguageCode)))
  @NotNull
  @Default(LanguageCode.ENGLISH)
  declare default_subtitle_language: CreationOptional<LanguageCode>;

  @Attribute(DataTypes.ENUM(...Object.values(LanguageCode)))
  @NotNull
  @Default(LanguageCode.ENGLISH)
  declare default_video_language: CreationOptional<LanguageCode>;

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  @Default(true)
  declare auto_select_audio: CreationOptional<boolean>;

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  @Default(true)
  declare auto_select_subtitle: CreationOptional<boolean>;

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  @Default(true)
  declare auto_select_video: CreationOptional<boolean>;

  @Attribute(DataTypes.INTEGER)
  @Unique
  @NotNull
  declare user_id: CreationOptional<number>;

  /** Defined by {@link User.userPreference} */
  declare user?: NonAttribute<User>;

  /** Association: UserPreference.belongsTo(User, { foreignKey: 'user_id' }) */
  declare getUser: BelongsToGetAssociationMixin<User>;
  declare setUser: BelongsToSetAssociationMixin<User, number>;
  declare createUser: BelongsToCreateAssociationMixin<User>;

  /** Override toJSON method */
  toJSON(): any {
    const values: any = { ...this.get() };
    delete values.user_id;
    delete values.id;
    return values;
  }
}
