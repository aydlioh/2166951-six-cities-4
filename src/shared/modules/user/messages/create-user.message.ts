export const CreateUserMessage = {
  email: {
    invalidFormat:
      'Поле email должно содержать корректный адрес электронной почты.',
  },
  avatarPath: {
    invalidFormat: 'Ссылка на аватар должна быть строкой.',
    invalidExtension:
      'Аватар должен быть изображением в формате .jpg или .png.',
  },
  name: {
    invalidFormat: 'Имя обязательно и должно быть строкой.',
    lengthField: 'Имя должно содержать от 1 до 15 символов.',
  },
  type: {
    invalidType:
      'Недопустимый тип пользователя. Допустимые значения: base, pro.',
  },
  password: {
    invalidFormat: 'Пароль обязателен и должен быть строкой.',
    lengthField: 'Пароль должен содержать от 6 до 12 символов.',
  },
} as const;
