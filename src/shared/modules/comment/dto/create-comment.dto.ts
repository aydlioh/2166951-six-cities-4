import {
  IsInt,
  IsMongoId,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { CreateCommentMessage } from '../messages/create-comment.message.js';

export class CreateCommentDto {
  @IsString({ message: CreateCommentMessage.text.invalidFormat })
  @MinLength(5, { message: CreateCommentMessage.text.minLength })
  @MaxLength(1024, { message: CreateCommentMessage.text.maxLength })
  public text: string;

  @IsInt({ message: CreateCommentMessage.rating.invalidFormat })
  @Min(1, { message: CreateCommentMessage.rating.minLength })
  @Max(5, { message: CreateCommentMessage.rating.maxLength })
  public rating: number;

  @IsMongoId({ message: CreateCommentMessage.offerId.invalidFormat })
  public offerId: string;

  public userId: string;
}
