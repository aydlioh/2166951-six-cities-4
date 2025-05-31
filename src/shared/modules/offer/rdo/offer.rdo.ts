import { Expose } from 'class-transformer';
import {
  City,
  HousingType,
  Amenity,
  Coordinates,
  User,
} from '../../../types/index.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public postDate: Date;

  @Expose()
  public city: City;

  @Expose()
  public previewPath: string;

  @Expose()
  public imagePaths: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: HousingType;

  @Expose()
  public rooms: number;

  @Expose()
  public guests: number;

  @Expose()
  public price: number;

  @Expose()
  public amenities: Amenity[];

  @Expose()
  public owner: User;

  @Expose()
  public commentsCount: number;

  @Expose()
  public coordinates: Coordinates;
}
