import { Amenity, City, HousingType, Offer } from '../../shared/types/offer.js';

const isCity = (value: unknown): value is City =>
  typeof value === 'string' && value in City;

const isHousingType = (value: unknown): value is HousingType =>
  typeof value === 'string' && value in HousingType;

export class OfferParser {
  public static parseRow(row: string[]): Offer {
    OfferParser.validateRow(row);

    const [
      title,
      description,
      postDate,
      city,
      previewPath,
      imagePaths,
      isPremium,
      isFavorite,
      rating,
      type,
      rooms,
      guests,
      price,
      amenities,
      author,
      commentsCount,
      rawCoordinates,
    ] = row;

    const coordinates = {
      latitude: Number(rawCoordinates.split(';')[0]),
      longitude: Number(rawCoordinates.split(';')[1]),
    };

    return {
      title,
      description,
      postDate: new Date(postDate),
      city: isCity(city) ? city : City.Paris,
      previewPath,
      imagePaths: imagePaths.split(';'),
      isPremium: isPremium === 'true',
      isFavorite: isFavorite === 'true',
      rating: Number(rating),
      type: isHousingType(type) ? type : HousingType.Apartment,
      rooms: Number(rooms),
      guests: Number(guests),
      price: Number(price),
      amenities: amenities.split(';') as Amenity[],
      author,
      commentsCount: Number(commentsCount),
      coordinates,
    };
  }

  public static parse(rows: string[][]): Offer[] {
    return rows.map(this.parseRow);
  }

  private static validateRow(row: string[]): void {
    if (row.length !== 17) {
      throw new Error(`Invalid row length: ${row.length}`);
    }
  }
}
