/** Dependencies */
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  HasManyGetAssociationsMixin,
  BelongsToGetAssociationMixin,
  BelongsToCreateAssociationMixin,
  BelongsToSetAssociationMixin,
  HasManyAddAssociationMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationsMixin,
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
  BelongsTo,
  Default,
  HasMany,
  NotNull,
  PrimaryKey,
  Table
} from '@sequelize/core/decorators-legacy';
import { LibrarySection } from './library-section';
import { MediaItem } from './media-item';

/**
 * @brief SectionLocation model
 * @description This model represents a location within a section in the library.
 */
@Table({
  tableName: 'section_locations',
  freezeTableName: true,
  modelName: 'SectionLocation',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class SectionLocation extends Model<InferAttributes<SectionLocation>, InferCreationAttributes<SectionLocation>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare root_path: string;

  @Attribute(DataTypes.BOOLEAN)
  @Default(true)
  @NotNull
  declare available: CreationOptional<boolean>;

  @Attribute(DataTypes.DATE)
  declare created_at: CreationOptional<Date>;

  @Attribute(DataTypes.DATE)
  declare updated_at: CreationOptional<Date>;

  @Attribute(DataTypes.INTEGER)
  declare library_section_id: CreationOptional<number>;

  @HasMany(() => MediaItem, {
    foreignKey: 'section_location_id',
    inverse: 'sectionLocation'
  })
  declare mediaItems: NonAttribute<MediaItem[]>;

  @BelongsTo(() => LibrarySection, {
    foreignKey: 'library_section_id',
    inverse: {
      type: 'hasMany',
      as: 'sectionLocations'
    }
  })
  declare librarySection?: NonAttribute<LibrarySection>;

  /** Belongs to library section */
  declare getLibrarySection: BelongsToGetAssociationMixin<LibrarySection>;
  declare setLibrarySection: BelongsToSetAssociationMixin<LibrarySection, number>;
  declare createLibrarySection: BelongsToCreateAssociationMixin<LibrarySection>;

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
}
