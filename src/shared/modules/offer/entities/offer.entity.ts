import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { Amenity, City, HousingType } from '../../../types/offer.js';
import { UserEntity } from '../../user/entities/user.entity.js';
import { Coordinates } from './coordinates.entity.js';

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
})
export class OfferEntity {
  @prop({ type: String, required: true, trim: true })
  public title: string;

  @prop({ type: String, required: true, trim: true })
  public description: string;

  @prop({ type: String, required: true, enum: City })
  public city: City;

  @prop({ type: Date, required: true })
  public postDate: Date;

  @prop({ type: String, required: true })
  public previewPath: string;

  @prop({ type: () => [String], required: true })
  public imagePaths: string[];

  @prop({ type: Boolean, required: true })
  public isPremium: boolean;

  @prop({ type: Boolean })
  public isFavorite?: boolean;

  @prop({ type: Number, required: true, default: 0 })
  public rating: number;

  @prop({ type: String, required: true, enum: HousingType })
  public type: HousingType;

  @prop({ type: Number, required: true })
  public rooms: number;

  @prop({ type: Number, required: true })
  public guests: number;

  @prop({ type: Number, required: true })
  public price: number;

  @prop({ type: [String], required: true, enum: Amenity })
  public amenities: Amenity[];

  @prop({ ref: () => UserEntity, required: true })
  public userId: Ref<UserEntity>;

  @prop({ type: Number, required: true, default: 0 })
  public commentsCount: number;

  @prop({ type: () => Coordinates, required: true, _id: false })
  public coordinates: Coordinates;
}

export const OfferModel = getModelForClass(OfferEntity);
