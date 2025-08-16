/** Dependencies */
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
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
  HasManyCreateAssociationMixin,
  NonAttribute
} from '@sequelize/core';
import {
  Attribute,
  AutoIncrement,
  PrimaryKey,
  Table,
  NotNull,
  BelongsTo,
  HasMany
} from '@sequelize/core/decorators-legacy';
import { LibrarySection } from './library-section';
import { SectionLocation } from './section-location';
import { MetadataItem } from './metadata-item';
import { MediaPart } from './media-part';
import { MediaStream } from './media-stream';

/**
 * @brief
 * @description
 */
@Table({
  tableName: 'media_items',
  freezeTableName: true,
  modelName: 'MediaItem',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true
})
export class MediaItem extends Model<InferAttributes<MediaItem>, InferCreationAttributes<MediaItem>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.INTEGER)
  declare width: number;

  @Attribute(DataTypes.INTEGER)
  declare height: number;

  @Attribute(DataTypes.INTEGER)
  declare size: number;

  @Attribute(DataTypes.INTEGER)
  declare duration: number;

  @Attribute(DataTypes.INTEGER)
  declare bitrate: number;

  @Attribute(DataTypes.STRING)
  declare container: string;

  @Attribute(DataTypes.STRING)
  declare video_codec: string;

  @Attribute(DataTypes.STRING)
  declare audio_codec: string;

  @Attribute(DataTypes.INTEGER)
  declare display_aspect_ratio: number;

  @Attribute(DataTypes.INTEGER)
  declare sample_aspect_ratio: number;

  @Attribute(DataTypes.INTEGER)
  declare frames_per_second: number;

  @Attribute(DataTypes.INTEGER)
  declare audio_channels: number;

  @Attribute(DataTypes.BOOLEAN)
  declare interlaced: boolean;

  @Attribute(DataTypes.STRING)
  declare hints: string;

  @Attribute(DataTypes.INTEGER)
  declare display_offset: number;

  @Attribute(DataTypes.STRING)
  declare settings: string;

  @Attribute(DataTypes.INTEGER)
  declare begins_at: number;

  @Attribute(DataTypes.INTEGER)
  declare ends_at: number;

  @Attribute(DataTypes.STRING)
  declare color_trc: string;

  @Attribute(DataTypes.DATE)
  declare created_at: CreationOptional<Date>;

  @Attribute(DataTypes.DATE)
  declare updated_at: CreationOptional<Date>;

  @Attribute(DataTypes.DATE)
  declare deleted_at: CreationOptional<Date> | null;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare library_section_id: CreationOptional<number>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare section_location_id: CreationOptional<number>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare metadata_item_id: CreationOptional<number>;

  @BelongsTo(() => LibrarySection, {
    foreignKey: 'library_section_id',
    inverse: {
      type: 'hasMany',
      as: 'mediaItems'
    }
  })
  declare librarySection?: NonAttribute<LibrarySection>;

  @BelongsTo(() => SectionLocation, {
    foreignKey: 'section_location_id',
    inverse: {
      type: 'hasMany',
      as: 'mediaItems'
    }
  })
  declare sectionLocation?: NonAttribute<SectionLocation>;

  @BelongsTo(() => MetadataItem, {
    foreignKey: 'metadata_item_id',
    inverse: {
      type: 'hasMany',
      as: 'mediaItems'
    }
  })
  declare metadataItem?: NonAttribute<MetadataItem>;

  @HasMany(() => MediaPart, {
    foreignKey: 'media_item_id',
    inverse: 'mediaItem'
  })
  declare mediaParts?: NonAttribute<MediaPart[]>;

  @HasMany(() => MediaStream, {
    foreignKey: 'media_item_id',
    inverse: 'mediaItem'
  })
  declare mediaStreams?: NonAttribute<MediaStream[]>;

  /** Belongs to library section */
  declare getLibrarySection: BelongsToGetAssociationMixin<LibrarySection>;
  declare setLibrarySection: BelongsToSetAssociationMixin<LibrarySection, number>;
  declare createLibrarySection: BelongsToCreateAssociationMixin<LibrarySection>;

  /** Belongs to section location */
  declare getSectionLocation: BelongsToGetAssociationMixin<SectionLocation>;
  declare setSectionLocation: BelongsToSetAssociationMixin<SectionLocation, number>;
  declare createSectionLocation: BelongsToCreateAssociationMixin<SectionLocation>;

  /** Belongs to metadata item */
  declare getMetadataItem: BelongsToGetAssociationMixin<MetadataItem>;
  declare setMetadataItem: BelongsToSetAssociationMixin<MetadataItem, number>;
  declare createMetadataItem: BelongsToCreateAssociationMixin<MetadataItem>;

  /** Has many media streams */
  declare getMediaStreams: HasManyGetAssociationsMixin<MediaStream>;
  declare addMediaStream: HasManyAddAssociationMixin<MediaStream, number>;
  declare addMediaStreams: HasManyAddAssociationsMixin<MediaStream, number>;
  declare setMediaStreams: HasManySetAssociationsMixin<MediaStream, number>;
  declare removeMediaStream: HasManyRemoveAssociationMixin<MediaStream, number>;
  declare removeMediaStreams: HasManyRemoveAssociationsMixin<MediaStream, number>;
  declare hasMediaStream: HasManyHasAssociationMixin<MediaStream, number>;
  declare hasMediaStreams: HasManyHasAssociationsMixin<MediaStream, number>;
  declare countMediaStreams: HasManyCountAssociationsMixin<MediaStream>;
  declare createMediaStream: HasManyCreateAssociationMixin<MediaStream>;

  /** Has many media parts */
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
