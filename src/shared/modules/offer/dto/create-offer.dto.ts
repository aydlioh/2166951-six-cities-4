import {
  Amenity,
  City,
  Coordinates,
  HousingType,
} from '../../../types/offer.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public city: City;
  public previewPath: string;
  public imagePaths: string[];
  public isPremium: boolean;
  public rating: number;
  public type: HousingType;
  public rooms: number;
  public guests: number;
  public price: number;
  public amenities: Amenity[];
  public owner: string;
  public coordinates: Coordinates;
}
