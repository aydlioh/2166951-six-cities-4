export const Component = {
  // App
  RestApplication: Symbol.for('RestApplication'),

  // Shared
  Config: Symbol.for('Config'),
  Logger: Symbol.for('Logger'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),

  // Models
  UserModel: Symbol.for('UserModel'),
  OfferModel: Symbol.for('OfferModel'),
  CommentModel: Symbol.for('CommentModel'),
  FavoriteModel: Symbol.for('FavoriteModel'),

  // Services
  UserService: Symbol.for('UserService'),
  OfferService: Symbol.for('OfferService'),
  CommentService: Symbol.for('CommentService'),

  // Controllers
  UserController: Symbol.for('UserController'),
  OfferController: Symbol.for('OfferController'),
} as const;
