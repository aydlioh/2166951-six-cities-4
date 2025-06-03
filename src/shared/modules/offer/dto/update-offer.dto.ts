import {
  IsOptional,
  MinLength,
  MaxLength,
  IsEnum,
  IsString,
  IsArray,
  IsBoolean,
  IsInt,
  Max,
  Min,
  ArrayMinSize,
  IsMongoId,
  IsNotEmpty,
  ArrayMaxSize,
} from 'class-validator';
import {
  Amenity,
  City,
  Coordinates,
  HousingType,
} from '../../../types/offer.js';
import { User } from '../../../types/user.js';
import { UpdateOfferMessage } from '../messages/update-offer.message.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: UpdateOfferMessage.title.minLength })
  @MaxLength(100, { message: UpdateOfferMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(20, { message: UpdateOfferMessage.description.minLength })
  @MaxLength(1024, { message: UpdateOfferMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsEnum(City, { message: UpdateOfferMessage.city.invalidFormat })
  public city?: City;

  @IsOptional()
  @IsString({ message: UpdateOfferMessage.previewPath.invalidFormat })
  public previewPath?: string;

  @IsOptional()
  @IsArray({ message: UpdateOfferMessage.imagePaths.invalidFormat })
  @ArrayMinSize(6, { message: UpdateOfferMessage.imagePaths.count })
  @ArrayMaxSize(6, { message: UpdateOfferMessage.imagePaths.count })
  public imagePaths?: string[];

  @IsOptional()
  @IsBoolean({ message: UpdateOfferMessage.isPremium.invalidFormat })
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(HousingType, { message: UpdateOfferMessage.type.invalidFormat })
  public type?: HousingType;

  @IsOptional()
  @IsInt({ message: UpdateOfferMessage.rooms.invalidFormat })
  @Min(1, { message: UpdateOfferMessage.rooms.minValue })
  @Max(8, { message: UpdateOfferMessage.rooms.maxValue })
  public rooms?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferMessage.guests.invalidFormat })
  @Min(1, { message: UpdateOfferMessage.guests.minValue })
  @Max(10, { message: UpdateOfferMessage.guests.maxValue })
  public guests?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferMessage.price.invalidFormat })
  @Min(100, { message: UpdateOfferMessage.price.minValue })
  @Max(100_000, { message: UpdateOfferMessage.price.maxValue })
  public price?: number;

  @IsOptional()
  @IsArray({ message: UpdateOfferMessage.amenities.invalidFormat })
  @IsEnum(Amenity, {
    each: true,
    message: UpdateOfferMessage.amenities.invalidValue,
  })
  @ArrayMinSize(1, { message: UpdateOfferMessage.amenities.minSize })
  public amenities?: Amenity[];

  @IsOptional()
  @IsMongoId({ message: UpdateOfferMessage.userId.invalidId })
  public userId?: User;

  @IsOptional()
  @IsNotEmpty({
    message: UpdateOfferMessage.coordinates.invalidFormat,
  })
  public coordinates?: Coordinates;
}
