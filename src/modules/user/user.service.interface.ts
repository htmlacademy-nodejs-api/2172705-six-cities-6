import { DocumentType } from '@typegoose/typegoose';
import { UserDTO } from './user.dto.js';
import { UserEntity } from './user.model.js';

export interface IUserService {
  create(dto: UserDTO, salt: string): Promise<DocumentType<UserEntity>>;
  findById(id: string): Promise<DocumentType<UserEntity> | null>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: UserDTO, salt: string): Promise<DocumentType<UserEntity>>;
}
