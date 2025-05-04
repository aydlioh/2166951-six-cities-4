import { User, UserType } from '../../../types/user.js';

export class CreateUserDto implements User {
  public email: string;
  public name: string;
  public avatarPath: string;
  public password: string;
  public type: UserType;
}
