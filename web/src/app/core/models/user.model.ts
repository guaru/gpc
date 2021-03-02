import { Office } from "./office.model";
import { Person } from "./person.model";
import {Function} from "./function.model";

export class User extends Person
{
    constructor(
      public id?:string,
      public username?:string,
      public password?:string,
      public authorities?: string[],
      public office?:Office,
      public functions?:Function[]
    ){
       super();
    }


}
