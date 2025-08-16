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
import { StreamType, LanguageCode } from '@moon/types';
import { MediaItem } from './media-item';

/**
 * @brief Media Stream Model
 * @description Represents a media stream in the database.
 */
@Table({
  tableName: 'media_streams',
  freezeTableName: true,
  modelName: 'MediaStream',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class MediaStream extends Model<InferAttributes<MediaStream>, InferCreationAttributes<MediaStream>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare type: StreamType;

  @Attribute(DataTypes.STRING)
  declare codec: string;

  @Attribute(DataTypes.STRING)
  declare language: LanguageCode;

  @Attribute(DataTypes.INTEGER)
  declare channels: number;

  @Attribute(DataTypes.INTEGER)
  declare bitrate: number;

  @Attribute(DataTypes.BOOLEAN)
  declare forced: boolean;

  @Attribute(DataTypes.STRING)
  declare extra_data: string;

  @Attribute(DataTypes.INTEGER)
  declare index: number;

  @Attribute(DataTypes.DATE)
  declare created_at: CreationOptional<Date>;

  @Attribute(DataTypes.DATE)
  declare updated_at: CreationOptional<Date>;

  @Attribute(DataTypes.INTEGER)
  declare media_item_id: number;

  @BelongsTo(() => MediaItem, {
    foreignKey: 'media_item_id',
    inverse: {
      type: 'hasMany',
      as: 'mediaParts'
    }
  })
  declare mediaItem?: NonAttribute<MediaItem>;

  /** Belongs to MediaItem mixins */
  declare getMediaItem: BelongsToGetAssociationMixin<MediaItem>;
  declare setMediaItem: BelongsToSetAssociationMixin<MediaItem, number>;
}
