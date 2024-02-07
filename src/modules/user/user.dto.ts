import { EUserType } from '../../shared/const/user-type.enum.js';

export class UserDTO {
  public firstname: string;
  public email: string;
  public password: string;
  public type: EUserType;
  public avatar: string;
}
