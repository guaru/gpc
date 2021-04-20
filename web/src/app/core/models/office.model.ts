import { Area } from "./area.model";
import { Day } from "./day.model";
import { State } from "./state.model";

export class Office {
  constructor(
    public id?:string,
    public name?:string,
    public key?:string,
    public address?:string,
    public state?:State,
    public areas?:Area[],
    public daysOperation?:String[],
    public initTimeAttention?:string,
    public endTimeAttention?:string,
    public notificationNext?:number,
    public enabled?: boolean


  ){

  }
}
