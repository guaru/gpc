import { Turn } from "../models/turn.model";
import { IDetailArea } from "./IDetailArea";

export interface IDetailListTurn{
  turns: Turn[];
  detail: IDetailArea[];
}
