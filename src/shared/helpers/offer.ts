import {
  Amenity,
  City,
  Coordinates,
  HousingType,
  Offer,
  User,
  UserType,
} from '../types/index.js';

const isCity = (value: unknown): value is City =>
  typeof value === 'string' && Object.values(City).includes(value as City);

const isHousingType = (value: unknown): value is HousingType =>
  typeof value === 'string' &&
  Object.values(HousingType).includes(value as HousingType);

const isUserType = (value: unknown): value is UserType =>
  typeof value === 'string' &&
  Object.values(UserType).includes(value as UserType);

export const parseOffer = (offerData: string): Offer => {
  const [
    title,
    description,
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
    commentsCount,
    rawCoordinates,
    name,
    email,
    userType,
    avatarPath,
  ] = offerData.replace('\n', '').split('\t');

  const coordinates: Coordinates = {
    latitude: Number(rawCoordinates.split(';')[0]),
    longitude: Number(rawCoordinates.split(';')[1]),
  };

  const owner: User = {
    name,
    email,
    avatarPath,
    type: isUserType(userType) ? userType : UserType.Base,
  };

  return {
    title,
    description,
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
    owner,
    commentsCount: Number(commentsCount),
    coordinates,
  };
};
