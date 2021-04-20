import { Area } from "./area.model";
import { Office } from "./office.model";

export class Turn
{
  constructor(
          public id?:string,
          public key?:string,
          public number?: number,
          public inAttention?: boolean,
          public attended?: boolean,
          public name?:string,
          public lastName?:string,
          public office?:Office,
          public officeId?:string,
          public areaId?: string,
          public area?: Area,
          public userCreate?:string,
          public create?:Date,
          public smsCreateSend?: boolean,
          public sendSmsNext?: boolean,


        ){

        }



}
