import { Office } from "./office.model";
import { Person } from "./person.model";
import {Function} from "./function.model";
import { Authoritie } from "./authorite.model";

export class User extends Person
{
    constructor(
      public id?:string,
      public userName?:string,
      public password?:string|null,
      public phone?:string,
      public authorities?: Authoritie[],
      public roles?:string[],
      public office?:Office,
      public functions?:Function[],
      public confirmed?: boolean
    ){
       super();
    }




}
