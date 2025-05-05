import {
  Amenity,
  City,
  Coordinates,
  HousingType,
} from '../../../types/offer.js';
import { User } from '../../../types/user.js';

export class OfferResponseDto {
  public id: string;
  public title: string;
  public description: string;
  public postDate: Date;
  public city: City;
  public previewPath: string;
  public imagePaths: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: HousingType;
  public rooms: number;
  public guests: number;
  public price: number;
  public amenities: Amenity[];
  public owner: User;
  public commentsCount: number;
  public coordinates: Coordinates;
}
