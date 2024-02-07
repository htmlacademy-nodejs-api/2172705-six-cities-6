import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { Interface } from '../../shared/const/index.js';
import { IUserService } from './user.service.interface.js';
import { UserService } from './user.service.js';
import { UserEntity, UserModel } from './user.model.js';

export const createUserContainer = () => {
  const container = new Container();

  container.bind<IUserService>(Interface.IUserService).to(UserService).inSingletonScope();
  container.bind<types.ModelType<UserEntity>>(Interface.IUserModel).toConstantValue(UserModel);

  return container;
};
