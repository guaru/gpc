import { HttpParams } from "@angular/common/http";
import { PageRequest } from "../models/page-request.model";

export class Util
{

  public static isEmpty(value:string):boolean{
    return value == null || value == undefined || value ==='' || value.trim().length <=0;
  }

  public static  toBase64(content: string): string{
    return btoa(content);
  }

  public static base64Decode(content:string): string
  {
    return atob(content);
  }

  public static createRequestOption(req?: PageRequest): HttpParams {
    let params = new HttpParams();
    if (req) {
      params = params.append('page', String(req.offset));
      params = params.append('size', String(req.limit));

      if (req.sortField !== '' && req.sortField !== undefined) {
        params = params.append('sort', req.sortField + ',' + (req.sortOrder === 1 ? 'asc' : 'desc'));
      }
      if(req.filters){
       for (let filtro  of req.filters!) {
        if (filtro.value !== '' && filtro.value !== null && filtro.value!=undefined) {
          params = params.append(filtro.name, filtro.value);
        }
       }
     }
    }
    return params;
  }


  public static arrayToOption(array:any[]){
    return array.map(_=> { return { label:_.name, value:_.id} });
  }

}
