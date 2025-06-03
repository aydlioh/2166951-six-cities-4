export const Component = {
  // App
  RestApplication: Symbol.for('RestApplication'),

  // Shared
  Config: Symbol.for('Config'),
  Logger: Symbol.for('Logger'),
  DatabaseClient: Symbol.for('DatabaseClient'),

  // Models
  UserModel: Symbol.for('UserModel'),
  OfferModel: Symbol.for('OfferModel'),
  CommentModel: Symbol.for('CommentModel'),
  FavoriteModel: Symbol.for('FavoriteModel'),

  // Services
  UserService: Symbol.for('UserService'),
  OfferService: Symbol.for('OfferService'),
  CommentService: Symbol.for('CommentService'),
  AuthService: Symbol.for('AuthService'),

  // Controllers
  UserController: Symbol.for('UserController'),
  OfferController: Symbol.for('OfferController'),
  CommentController: Symbol.for('CommentController'),

  // Filters
  ExceptionFilter: Symbol.for('ExceptionFilter'),
  AuthExceptionFilter: Symbol.for('AuthExceptionFilter'),
} as const;
