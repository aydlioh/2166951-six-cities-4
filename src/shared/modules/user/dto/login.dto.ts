import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { LoginMessage } from '../messages/login.message.js';

export class LoginUserDto {
  @IsNotEmpty({ message: LoginMessage.email.invalidFormat })
  @IsEmail({}, { message: LoginMessage.email.invalidFormat })
  public email: string;

  @IsNotEmpty({ message: LoginMessage.password.invalidFormat })
  @IsString({ message: LoginMessage.password.invalidFormat })
  public password: string;
}
