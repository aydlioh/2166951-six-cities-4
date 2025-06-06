import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from '../entities/user.entity.js';
import { CreateUserDto } from '../dto/create-user.dto.js';
import { DocumentExists } from '../../../types/document-exists.interface.js';

export interface UserService extends DocumentExists {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findById(userId: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(
    dto: CreateUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity>>;
  updateAvatar(userId: string, avatarPath: string): Promise<void>;
}
