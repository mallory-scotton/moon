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
  HasManyGetAssociationsMixin
} from '@sequelize/core';
import { Attribute, AutoIncrement, PrimaryKey, Table, NotNull, HasMany } from '@sequelize/core/decorators-legacy';
import { SectionType, LanguageCode } from '@moon/types';
import { SectionLocation } from './section-location';
import { MediaItem } from './media-item';

/**
 * @brief LibrarySection model
 * @description This model represents a section in the library.
 */
@Table({
  tableName: 'library_sections',
  freezeTableName: true,
  modelName: 'LibrarySection',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class LibrarySection extends Model<InferAttributes<LibrarySection>, InferCreationAttributes<LibrarySection>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare section_type: SectionType;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare language: LanguageCode;

  @Attribute(DataTypes.BOOLEAN)
  declare public: boolean;

  @Attribute(DataTypes.UUID)
  declare uuid: string;

  @Attribute(DataTypes.DATE)
  declare created_at: CreationOptional<Date>;

  @Attribute(DataTypes.DATE)
  declare updated_at: CreationOptional<Date>;

  @HasMany(() => SectionLocation, {
    foreignKey: 'library_section_id',
    inverse: 'librarySection'
  })
  declare sectionLocations?: NonAttribute<SectionLocation[]>;

  @HasMany(() => MediaItem, {
    foreignKey: 'library_section_id',
    inverse: 'librarySection'
  })
  declare mediaItems?: NonAttribute<MediaItem[]>;

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

  /** Has many section locations */
  declare getSectionLocations: HasManyGetAssociationsMixin<SectionLocation>;
  declare addSectionLocation: HasManyAddAssociationMixin<SectionLocation, number>;
  declare addSectionLocations: HasManyAddAssociationsMixin<SectionLocation, number>;
  declare setSectionLocations: HasManySetAssociationsMixin<SectionLocation, number>;
  declare removeSectionLocation: HasManyRemoveAssociationMixin<SectionLocation, number>;
  declare removeSectionLocations: HasManyRemoveAssociationsMixin<SectionLocation, number>;
  declare hasSectionLocation: HasManyHasAssociationMixin<SectionLocation, number>;
  declare hasSectionLocations: HasManyHasAssociationsMixin<SectionLocation, number>;
  declare countSectionLocations: HasManyCountAssociationsMixin<SectionLocation>;
  declare createSectionLocation: HasManyCreateAssociationMixin<SectionLocation>;
}
