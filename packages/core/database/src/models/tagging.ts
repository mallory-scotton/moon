/** Dependencies */
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute
} from '@sequelize/core';
import { Attribute, AutoIncrement, PrimaryKey, Table, NotNull } from '@sequelize/core/decorators-legacy';

/**
 * @brief Tagging model
 * @description Represents the association between tags and metadata items.
 */
@Table({
  tableName: 'taggings',
  freezeTableName: true,
  modelName: 'Tagging',
  timestamps: false
})
export class Tagging extends Model<InferAttributes<Tagging>, InferCreationAttributes<Tagging>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare tag_id: number;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare metadata_item_id: number;
}
