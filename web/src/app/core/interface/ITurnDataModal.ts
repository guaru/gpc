import { Office } from "../models/office.model";
import { Turn } from "../models/turn.model";

export interface ITurnDataModal
{
   turn: Turn,
   office: Office
}
