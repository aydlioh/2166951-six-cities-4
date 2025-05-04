import dayjs from 'dayjs';
import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '../../helpers/common.js';
import { MockServerData } from '../../types/index.js';
import { OfferGenerator } from './offer-generator.interface.js';

const PRICE_RANGE = {
  MAX: 100_000,
  MIN: 100,
};

const ROOM_RANGE = {
  MAX: 8,
  MIN: 1,
};

const GUEST_RANGE = {
  MAX: 10,
  MIN: 1,
};

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockServerData: MockServerData) {}

  private getRandomDate = () =>
    dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

  private getRandomBoolean = () =>
    Boolean(generateRandomValue(0, 1)).toString();

  public generate(): string {
    const title = getRandomItem(this.mockServerData.titles);
    const description = getRandomItem(this.mockServerData.descriptions);
    const postDate = this.getRandomDate();
    const city = getRandomItem(this.mockServerData.cities);
    const previewPath = getRandomItem(this.mockServerData.offerImages);
    const imagePaths = getRandomItems(this.mockServerData.offerImages);
    const isPremium = this.getRandomBoolean();
    const isFavorite = this.getRandomBoolean();
    const rating = generateRandomValue(1, 5, 1);
    const type = getRandomItem(this.mockServerData.offerTypes);
    const rooms = generateRandomValue(ROOM_RANGE.MIN, ROOM_RANGE.MAX);
    const guests = generateRandomValue(GUEST_RANGE.MIN, GUEST_RANGE.MAX);
    const price = generateRandomValue(PRICE_RANGE.MIN, PRICE_RANGE.MAX);
    const amenities = getRandomItems(this.mockServerData.amenities);
    const name = getRandomItem(this.mockServerData.users);
    const email = getRandomItem(this.mockServerData.emails);
    const userType = getRandomItem(this.mockServerData.userType);
    const avatarPath = getRandomItem(this.mockServerData.avatarImages);
    const commentsCount = 0;
    const coordinates = [
      generateRandomValue(0, 50, 5),
      generateRandomValue(0, 50, 5),
    ];

    return [
      title,
      description,
      postDate,
      city,
      previewPath,
      imagePaths.join(';'),
      isPremium,
      isFavorite,
      rating,
      type,
      rooms,
      guests,
      price,
      amenities.join(';'),
      commentsCount,
      coordinates.join(';'),
      name,
      email,
      userType,
      avatarPath,
    ].join('\t');
  }
}
