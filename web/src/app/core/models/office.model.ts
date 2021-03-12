import { Area } from "./area.model";
import { State } from "./state.model";

export class Office {
  constructor(
    public id?:string,
    public name?:string,
    public key?:string,
    public address?:string,
    public state?:State,
    public areas?:Area[],
    public enabled?: boolean

  ){

  }
}
