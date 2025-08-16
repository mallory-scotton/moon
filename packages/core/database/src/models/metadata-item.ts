/** Dependencies */
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyRemoveAssociationMixin
} from '@sequelize/core';
import {
  Attribute,
  AutoIncrement,
  PrimaryKey,
  Table,
  BelongsToMany,
  HasMany,
  NotNull,
  Default
} from '@sequelize/core/decorators-legacy';
import { MetadataType } from '@moon/types';
import { Tag } from './tag';
import { Tagging } from './tagging';
import { MediaItem } from './media-item';

/**
 * @brief Metadata item model
 * @description Represents a metadata item that can be tagged.
 */
@Table({
  tableName: 'metadata_items',
  freezeTableName: true,
  modelName: 'MetadataItem',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true
})
export class MetadataItem extends Model<InferAttributes<MetadataItem>, InferCreationAttributes<MetadataItem>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare metadata_type: MetadataType;

  @Attribute(DataTypes.UUID)
  @NotNull
  @Default(DataTypes.UUIDV4())
  declare guid: CreationOptional<string>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  @Default(0)
  declare media_item_count: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  declare title: string;

  @Attribute(DataTypes.STRING)
  declare title_sort: string;

  @Attribute(DataTypes.STRING)
  declare original_title: string;

  @Attribute(DataTypes.STRING)
  declare studio: string;

  @Attribute(DataTypes.INTEGER)
  declare rating: number;

  @Attribute(DataTypes.INTEGER)
  declare rating_count: number;

  @Attribute(DataTypes.STRING)
  declare tagline: string;

  @Attribute(DataTypes.STRING)
  declare summary: string;

  @Attribute(DataTypes.STRING)
  declare trivia: string;

  @Attribute(DataTypes.STRING)
  declare quotes: string;

  @Attribute(DataTypes.STRING)
  declare content_rating: string;

  @Attribute(DataTypes.INTEGER)
  declare content_rating_age: number;

  @Attribute(DataTypes.INTEGER)
  declare duration: number;

  @Attribute(DataTypes.STRING)
  declare user_thumb_url: string;

  @Attribute(DataTypes.STRING)
  declare user_art_url: string;

  @Attribute(DataTypes.STRING)
  declare user_banner_url: string;

  @Attribute(DataTypes.STRING)
  declare user_music_url: string;

  @Attribute(DataTypes.STRING)
  declare user_fields: string;

  @Attribute(DataTypes.DATE)
  declare originally_available_at: Date;

  @Attribute(DataTypes.DATE)
  declare available_at: Date;

  @Attribute(DataTypes.DATE)
  declare expires_at: Date;

  @Attribute(DataTypes.DATE)
  declare refreshed_at: Date;

  @Attribute(DataTypes.INTEGER)
  declare year: number;

  @Attribute(DataTypes.TEXT)
  declare extra_data: string;

  @Attribute(DataTypes.INTEGER)
  declare audience_rating: number;

  @Attribute(DataTypes.DATE)
  declare created_at: CreationOptional<Date>;

  @Attribute(DataTypes.DATE)
  declare updated_at: CreationOptional<Date>;

  @Attribute(DataTypes.DATE)
  declare deleted_at?: CreationOptional<Date>;

  @HasMany(() => MediaItem, {
    foreignKey: 'metadata_item_id',
    inverse: 'metadataItem'
  })
  declare mediaItems?: NonAttribute<MediaItem[]>;

  @BelongsToMany(() => Tag, {
    through: Tagging,
    foreignKey: 'metadata_item_id',
    otherKey: 'tag_id',
    inverse: 'metadataItems'
  })
  declare tags?: NonAttribute<Tag[]>;

  /** Has many media items */
  declare getMediaItems: HasManyGetAssociationsMixin<MediaItem>;
  declare addMediaItem: HasManyAddAssociationMixin<MediaItem, number>;
  declare addMediaItems: HasManyAddAssociationsMixin<MediaItem, number>;
  declare setMediaItems: HasManySetAssociationsMixin<MediaItem, number>;
  declare removeMediaItem: HasManyRemoveAssociationMixin<MediaItem, number>;
  declare removeMediaItems: HasManyRemoveAssociationsMixin<MediaItem, number>;
  declare hasMediaItem: HasManyHasAssociationMixin<MediaItem, number>;
  declare hasMediaItems: HasManyHasAssociationsMixin<MediaItem, number>;
  declare countMediaItems: HasManyCountAssociationsMixin<MediaItem>;
  declare createMediaItem: HasManyCreateAssociationMixin<MediaItem>;

  /** Belongs to many tags */
  declare getTags: BelongsToManyGetAssociationsMixin<Tag>;
  declare addTag: BelongsToManyAddAssociationMixin<Tag, number>;
  declare addTags: BelongsToManyAddAssociationsMixin<Tag, number>;
  declare setTags: BelongsToManySetAssociationsMixin<Tag, number>;
  declare removeTag: BelongsToManyRemoveAssociationMixin<Tag, number>;
  declare removeTags: BelongsToManyRemoveAssociationsMixin<Tag, number>;
  declare hasTag: BelongsToManyHasAssociationMixin<Tag, number>;
  declare hasTags: BelongsToManyHasAssociationsMixin<Tag, number>;
  declare countTags: BelongsToManyCountAssociationsMixin<Tag>;
  declare createTag: BelongsToManyCreateAssociationMixin<Tag>;
}
