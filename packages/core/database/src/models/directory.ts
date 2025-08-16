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
  BelongsToCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin
} from '@sequelize/core';
import {
  Attribute,
  AutoIncrement,
  NotNull,
  PrimaryKey,
  Table,
  BelongsTo,
  HasMany
} from '@sequelize/core/decorators-legacy';
import { MediaPart } from './media-part';

/**
 * @brief Directory model
 * @description Represents a directory in the file system
 */
@Table({
  tableName: 'directories',
  freezeTableName: true,
  modelName: 'Directory',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true
})
export class Directory extends Model<InferAttributes<Directory>, InferCreationAttributes<Directory>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare path: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare parent_directory_id: CreationOptional<number>;

  @Attribute(DataTypes.DATE)
  declare created_at: CreationOptional<Date>;

  @Attribute(DataTypes.DATE)
  declare updated_at: CreationOptional<Date>;

  @Attribute(DataTypes.DATE)
  declare deleted_at: CreationOptional<Date> | null;

  @HasMany(() => Directory, {
    foreignKey: 'parent_directory_id',
    inverse: {
      as: 'parentDirectory'
    }
  })
  declare childrenDirectories?: NonAttribute<Directory[]>;

  @BelongsTo(() => Directory, {
    foreignKey: 'parent_directory_id',
    inverse: {
      type: 'hasMany',
      as: 'childrenDirectories'
    }
  })
  declare parentDirectory?: NonAttribute<Directory>;

  @HasMany(() => MediaPart, {
    foreignKey: 'directory_id',
    inverse: 'directory'
  })
  declare mediaParts?: NonAttribute<MediaPart[]>;

  /** Mixins: parent directory */
  declare getParentDirectory: BelongsToGetAssociationMixin<Directory>;
  declare setParentDirectory: BelongsToSetAssociationMixin<Directory, number>;
  declare createParentDirectory: BelongsToCreateAssociationMixin<Directory>;

  /** Mixins: children directories */
  declare getChildrenDirectories: HasManyGetAssociationsMixin<Directory>;
  declare addChildDirectory: HasManyAddAssociationMixin<Directory, number>;
  declare addChildrenDirectories: HasManyAddAssociationsMixin<Directory, number>;
  declare setChildrenDirectories: HasManySetAssociationsMixin<Directory, number>;
  declare removeChildDirectory: HasManyRemoveAssociationMixin<Directory, number>;
  declare removeChildrenDirectories: HasManyRemoveAssociationsMixin<Directory, number>;
  declare hasChildDirectory: HasManyHasAssociationMixin<Directory, number>;
  declare hasChildrenDirectories: HasManyHasAssociationsMixin<Directory, number>;
  declare countChildrenDirectories: HasManyCountAssociationsMixin<Directory>;
  declare createChildDirectory: HasManyCreateAssociationMixin<Directory>;

  /** Mixins: media parts */
  declare getMediaParts: HasManyGetAssociationsMixin<MediaPart>;
  declare addMediaPart: HasManyAddAssociationMixin<MediaPart, number>;
  declare addMediaParts: HasManyAddAssociationsMixin<MediaPart, number>;
  declare setMediaParts: HasManySetAssociationsMixin<MediaPart, number>;
  declare removeMediaPart: HasManyRemoveAssociationMixin<MediaPart, number>;
  declare removeMediaParts: HasManyRemoveAssociationsMixin<MediaPart, number>;
  declare hasMediaPart: HasManyHasAssociationMixin<MediaPart, number>;
  declare hasMediaParts: HasManyHasAssociationsMixin<MediaPart, number>;
  declare countMediaParts: HasManyCountAssociationsMixin<MediaPart>;
  declare createMediaPart: HasManyCreateAssociationMixin<MediaPart>;
}
