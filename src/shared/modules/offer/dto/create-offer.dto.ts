import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEnum,
  IsArray,
  ArrayMinSize,
  IsBoolean,
  Min,
  IsInt,
  Max,
  ArrayMaxSize,
} from 'class-validator';
import {
  Amenity,
  City,
  Coordinates,
  HousingType,
} from '../../../types/offer.js';
import { CreateOfferMessage } from '../messages/create-offer.message.js';

export class CreateOfferDto {
  @IsNotEmpty()
  @MinLength(10, { message: CreateOfferMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferMessage.title.maxLength })
  public title: string;

  @IsNotEmpty()
  @MinLength(20, {
    message: CreateOfferMessage.description.minLength,
  })
  @MaxLength(1024, {
    message: CreateOfferMessage.description.maxLength,
  })
  public description: string;

  @IsNotEmpty()
  @IsEnum(City, { message: CreateOfferMessage.city.invalidFormat })
  public city: City;

  @IsNotEmpty({
    message: CreateOfferMessage.previewPath.invalidFormat,
  })
  public previewPath: string;

  @IsArray({ message: CreateOfferMessage.imagePaths.invalidFormat })
  @ArrayMinSize(6, { message: CreateOfferMessage.imagePaths.count })
  @ArrayMaxSize(6, { message: CreateOfferMessage.imagePaths.count })
  @IsNotEmpty({ each: true })
  public imagePaths: string[];

  @IsNotEmpty()
  @IsBoolean({ message: CreateOfferMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsNotEmpty()
  @IsEnum(HousingType, {
    message: CreateOfferMessage.type.invalidFormat,
  })
  public type: HousingType;

  @IsNotEmpty()
  @IsInt({ message: CreateOfferMessage.rooms.invalidFormat })
  @Min(1, { message: CreateOfferMessage.rooms.minValue })
  @Max(8, { message: CreateOfferMessage.rooms.maxValue })
  public rooms: number;

  @IsNotEmpty()
  @IsInt({ message: CreateOfferMessage.guests.invalidFormat })
  @Min(1, { message: CreateOfferMessage.guests.minValue })
  @Max(10, { message: CreateOfferMessage.guests.maxValue })
  public guests: number;

  @IsNotEmpty()
  @IsInt({ message: CreateOfferMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferMessage.price.minValue })
  @Max(100_000, { message: CreateOfferMessage.price.maxValue })
  public price: number;

  @IsArray({ message: CreateOfferMessage.amenities.invalidFormat })
  @IsEnum(Amenity, {
    each: true,
    message: CreateOfferMessage.amenities.invalidValue,
  })
  @ArrayMinSize(1, { message: CreateOfferMessage.amenities.minSize })
  public amenities: Amenity[];

  @IsNotEmpty()
  public userId: string;

  @IsNotEmpty({
    message: CreateOfferMessage.coordinates.invalidFormat,
  })
  public coordinates: Coordinates;
}
