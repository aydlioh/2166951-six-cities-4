export const CreateOfferMessage = {
  title: {
    minLength: 'Название должно содержать минимум 10 символов.',
    maxLength: 'Название не может превышать 100 символов.',
  },
  description: {
    minLength: 'Описание должно содержать минимум 20 символов.',
    maxLength: 'Описание не может превышать 1024 символа.',
  },
  city: {
    invalidFormat: 'Недопустимый город.',
  },
  previewPath: {
    invalidFormat: 'Должна быть ссылка.',
  },
  imagePaths: {
    invalidFormat: 'Фотографии жилья должны быть массивом ссылок.',
    count: 'Должно быть ровно 6 фотографий.',
  },
  isPremium: {
    invalidFormat: 'Флаг "Премиум" должен быть булевым значением.',
  },
  type: {
    invalidFormat:
      'Недопустимый тип жилья. Выберите apartment, house, room или hotel.',
  },
  rooms: {
    invalidFormat: 'Количество комнат должно быть целым числом.',
    minValue: 'Минимум 1 комната.',
    maxValue: 'Максимум 8 комнат.',
  },
  guests: {
    invalidFormat: 'Количество гостей должно быть целым числом.',
    minValue: 'Минимум 1 гость.',
    maxValue: 'Максимум 10 гостей.',
  },
  price: {
    invalidFormat: 'Стоимость должна быть целым числом.',
    minValue: 'Минимальная стоимость аренды — 100.',
    maxValue: 'Максимальная стоимость аренды — 100 000.',
  },
  amenities: {
    invalidFormat: 'Удобства должны быть массивом.',
    invalidValue: 'Недопустимое значение удобства.',
    minSize: 'Укажите хотя бы одно удобство.',
  },
  userId: {
    invalidId: 'Недопустимый идентификатор пользователя (MongoID).',
  },
  coordinates: {
    invalidFormat: 'Координаты должны быть валидными.',
  },
} as const;
