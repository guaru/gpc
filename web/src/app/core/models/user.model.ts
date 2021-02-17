import { Person } from "./person.model";

export class User extends Person
{
    constructor(
      public id?:number,
      public username?:string,
      public password?:string,
      public authorities?: string[]
    ){
       super();
    }


}
