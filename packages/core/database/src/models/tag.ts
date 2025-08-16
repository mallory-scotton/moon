/** Dependencies */
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  BelongsToManyAddAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyRemoveAssociationMixin
} from '@sequelize/core';
import { Attribute, AutoIncrement, PrimaryKey, Table, NotNull, BelongsToMany } from '@sequelize/core/decorators-legacy';
import { TagType } from '@moon/types';
import { MetadataItem } from './metadata-item';
import { Tagging } from './tagging';

/**
 * @brief Tag model
 * @description Represents a tag that can be associated with metadata items.
 */
@Table({
  tableName: 'tags',
  freezeTableName: true,
  modelName: 'Tag',
  timestamps: false
})
export class Tag extends Model<InferAttributes<Tag>, InferCreationAttributes<Tag>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare tag_type: TagType;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare tag: string;

  @BelongsToMany(() => MetadataItem, {
    through: Tagging,
    foreignKey: 'tag_id',
    otherKey: 'metadata_item_id',
    inverse: 'tags'
  })
  declare metadataItems?: NonAttribute<MetadataItem[]>;

  /** Belongs to many metadata items */
  declare getMetadataItems: BelongsToManyGetAssociationsMixin<MetadataItem>;
  declare addMetadataItem: BelongsToManyAddAssociationMixin<MetadataItem, number>;
  declare addMetadataItems: BelongsToManyAddAssociationsMixin<MetadataItem, number>;
  declare setMetadataItems: BelongsToManySetAssociationsMixin<MetadataItem, number>;
  declare removeMetadataItem: BelongsToManyRemoveAssociationMixin<MetadataItem, number>;
  declare removeMetadataItems: BelongsToManyRemoveAssociationsMixin<MetadataItem, number>;
  declare hasMetadataItem: BelongsToManyHasAssociationMixin<MetadataItem, number>;
  declare hasMetadataItems: BelongsToManyHasAssociationsMixin<MetadataItem, number>;
  declare countMetadataItems: BelongsToManyCountAssociationsMixin<MetadataItem>;
  declare createMetadataItem: BelongsToManyCreateAssociationMixin<MetadataItem>;
}
