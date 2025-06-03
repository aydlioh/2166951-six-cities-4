import { IsNotEmpty, IsEmail, IsString, Length, IsEnum, IsOptional, Matches } from 'class-validator';
import { User, UserType } from '../../../types/user.js';
import { CreateUserMessage } from '../messages/create-user.message.js';

export class CreateUserDto implements User {
  @IsNotEmpty({ message: CreateUserMessage.email.invalidFormat })
  @IsEmail({}, { message: CreateUserMessage.email.invalidFormat })
  public email: string;

  @IsNotEmpty({ message: CreateUserMessage.name.invalidFormat })
  @IsString({ message: CreateUserMessage.name.invalidFormat })
  @Length(1, 15, { message: CreateUserMessage.name.lengthField })
  public name: string;

  @IsOptional()
  @IsString({ message: CreateUserMessage.avatarPath.invalidFormat })
  @Matches(/\.(jpg|png)$/i, {
    message: CreateUserMessage.avatarPath.invalidExtension,
  })
  public avatarPath: string;

  @IsNotEmpty({ message: CreateUserMessage.password.invalidFormat })
  @IsString({ message: CreateUserMessage.password.invalidFormat })
  @Length(6, 12, { message: CreateUserMessage.password.lengthField })
  public password: string;

  @IsNotEmpty({ message: CreateUserMessage.type.invalidType })
  @IsEnum(UserType, { message: CreateUserMessage.type.invalidType })
  public type: UserType;
}
