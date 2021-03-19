import { User } from "../models/user.model";

export interface IUserFormData
{

  user: User,
  officeId:string,
  operator: boolean,
  title: string
}
