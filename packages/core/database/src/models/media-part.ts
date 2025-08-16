/** Dependencies */
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin
} from '@sequelize/core';
import { Attribute, AutoIncrement, PrimaryKey, Table, NotNull, BelongsTo } from '@sequelize/core/decorators-legacy';
import { Directory } from './directory';
import { MediaItem } from './media-item';

/**
 * @brief Media Part Model
 * @description Represents a part of a media item, including its metadata and file information.
 */
@Table({
  tableName: 'media_parts',
  freezeTableName: true,
  modelName: 'MediaPart',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true
})
export class MediaPart extends Model<InferAttributes<MediaPart>, InferCreationAttributes<MediaPart>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare hash: string;

  @Attribute(DataTypes.STRING)
  declare open_subtitle_hash: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare file: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare size: number;

  @Attribute(DataTypes.INTEGER)
  declare duration: number;

  @Attribute(DataTypes.TEXT)
  declare extra_data: string;

  @Attribute(DataTypes.DATE)
  declare created_at: CreationOptional<Date>;

  @Attribute(DataTypes.DATE)
  declare updated_at: CreationOptional<Date>;

  @Attribute(DataTypes.DATE)
  declare deleted_at: CreationOptional<Date> | null;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare directory_id: CreationOptional<number>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare media_item_id: CreationOptional<number>;

  @BelongsTo(() => MediaItem, {
    foreignKey: 'media_item_id',
    inverse: {
      type: 'hasMany',
      as: 'mediaParts'
    }
  })
  declare mediaItem?: NonAttribute<MediaItem>;

  @BelongsTo(() => Directory, {
    foreignKey: 'directory_id',
    inverse: {
      type: 'hasMany',
      as: 'mediaParts'
    }
  })
  declare directory?: NonAttribute<Directory>;

  /** Mixins: media item */
  declare getMediaItem: BelongsToGetAssociationMixin<MediaItem>;
  declare setMediaItem: BelongsToSetAssociationMixin<MediaItem, number>;

  /** Mixins: directory */
  declare getDirectory: BelongsToGetAssociationMixin<Directory>;
  declare setDirectory: BelongsToSetAssociationMixin<Directory, number>;
}
