import { State } from "./state.model";

export class Office {
  constructor(
    public id?:string,
    public name?:string,
    public key?:string,
    public address?:string,
    public state?:State,
    public enable?: boolean

  ){

  }
}
