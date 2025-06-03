export const CreateCommentMessage = {
  text: {
    invalidFormat: 'Текст должен быть строкой.',
    minLength: 'Текст должен содержать не менее 5 символов.',
    maxLength: 'Текст должен содержать не более 1024 символов.',
  },
  rating: {
    invalidFormat: 'Рейтинг должен быть целым числом.',
    minLength: 'Рейтинг должен быть не менее 1.',
    maxLength: 'Рейтинг должен быть не более 5.',
  },
  offerId: {
    invalidFormat: 'Идентификатор предложения должен быть валидным Mongo ID.',
  },
  userId: {
    invalidFormat: 'Идентификатор пользователя должен быть валидным Mongo ID.',
  },
} as const;
