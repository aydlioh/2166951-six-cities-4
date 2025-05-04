export enum UserType {
  Base = 'base',
  Pro = 'pro',
}

export type User = {
  name: string;
  email: string;
  avatarPath: string;
  type: UserType;
};
