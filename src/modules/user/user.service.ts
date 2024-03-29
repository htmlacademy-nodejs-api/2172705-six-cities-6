import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import type { ILogger } from '../../shared/lib/index.js';
import { EComponentInterface } from '../../shared/const/index.js';
import type { IUserService } from './user.service.interface.js';
import { UserDTO } from './user.dto.js';
import { UserEntity } from './user.model.js';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(EComponentInterface.ILogger) private readonly _logger: ILogger,
    @inject(EComponentInterface.IUserModel) private readonly _userModel: types.ModelType<UserEntity>
  ) {}

  public async create(dto: UserDTO, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const response = await this._userModel.create(user);
    this._logger.info(`New user ${user.email} was created`);

    return response;
  }

  public async findById(id: string): Promise<DocumentType<UserEntity> | null> {
    return this._userModel.findById(id);
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this._userModel.findOne({email});
  }

  public async findOrCreate(dto: UserDTO, salt: string): Promise<DocumentType<UserEntity>> {
    const response = await this.findByEmail(dto.email);

    if (response) {
      return response;
    }

    return this.create(dto, salt);
  }
}
