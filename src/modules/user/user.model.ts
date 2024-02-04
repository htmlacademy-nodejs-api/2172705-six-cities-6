import {
  prop,
  defaultClasses,
  getModelForClass,
  modelOptions,
} from '@typegoose/typegoose';
import { TUser } from '@/shared/types/index.js';
import {
  EMAIL_REGEXP,
  UserType,
  Password,
  Firstname
} from '@/shared/const/index.js';
import { createSHA256 } from '@/shared/lib/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity implements TUser {
  @prop({
    required: true,
    trim: true,
    minlength: [Password.Min, 'Min length for password is 6'],
    maxlength: [Password.Max, 'Max length for password is 12'],
  })
  private _password?: string;

  @prop({
    required: true,
    trim: true,
    minlength: [Firstname.Min, 'Min length for firstname is 1'],
    maxlength: [Firstname.Max, 'Max length for firstname is 15'],
  })
  public firstname: string;

  @prop({
    required: true,
    trim: true,
    unique: true,
    match: [EMAIL_REGEXP, 'Email is incorrect'],
  })
  public email: string;

  @prop({
    required: true,
    type: () => String,
    enum: UserType,
  })
  public type: UserType;

  @prop({
    required: false,
    default: 'default-avatar.jpg',
  })
  // TODO: сделать обязательным типа "string", тк по умолчанию будет строка с дефолтной пикчей
  public avatar?: string;

  constructor(userData: TUser) {
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
