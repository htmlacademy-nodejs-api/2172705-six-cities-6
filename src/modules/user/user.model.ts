import {
  prop,
  defaultClasses,
  getModelForClass,
  modelOptions,
} from '@typegoose/typegoose';
import type { IUser } from '../../shared/interfaces/user.interface.js';
import {
  EMAIL_REGEXP,
  EUserType,
} from '../../shared/const/index.js';
import { createSHA256 } from '../../shared/lib/index.js';
import { EFirstname } from './const/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity implements IUser {
  @prop({
    required: true,
    trim: true,
    alias: '_password'
  })
  private password?: string;

  private _password?: string;

  @prop({
    required: true,
    trim: true,
    minlength: [EFirstname.Min, 'Min length for firstname is 1'],
    maxlength: [EFirstname.Max, 'Max length for firstname is 15'],
  })
  public firstname: string;

  @prop({
    required: true,
    unique: true,
    trim: true,
    match: [EMAIL_REGEXP, 'Email is incorrect'],
  })
  public email: string;

  @prop({
    required: true,
    type: String,
    enum: EUserType,
  })
  public type: EUserType;

  @prop({
    required: false,
    default: 'default-avatar.jpg',
  })
  public avatar: string;

  constructor(userData: IUser) {
    this.firstname = userData.firstname;
    this.email = userData.email;
    this.type = userData.type;
    this.avatar = userData.avatar;
  }

  public setPassword(password: string, salt: string): void {
    this._password = createSHA256(password, salt);
  }

  public getPassword(): string | undefined {
    return this._password;
  }
}

export const UserModel = getModelForClass(UserEntity);
