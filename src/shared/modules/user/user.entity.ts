import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
import { User, UserType } from '../../types/user.js';
import { createSHA256 } from '../../helpers/hash.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({
    type: String,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    required: true,
    unique: true,
  })
  public email: string;

  @prop({ type: String, required: false, default: '' })
  public name: string;

  @prop({ type: String, required: true, default: '' })
  public avatarPath: string;

  @prop({ type: String, required: true, default: '' })
  public password?: string;

  @prop({ type: String, enum: UserType, required: true })
  public type: UserType;

  constructor({ email, name, avatarPath, type }: User) {
    super();

    this.email = email;
    this.name = name;
    this.avatarPath = avatarPath;
    this.type = type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
