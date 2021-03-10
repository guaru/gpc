import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiUri } from '../enums/ApiUri';
import { Label } from '../enums/Label';
import { Authoritie } from '../models/authorite.model';
import { Office } from '../models/office.model';
import { GlobalConstantHttpService } from './global-constant-http.service';
import { GlobalEnviromentService } from './global-enviroment.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogHttpService {

  constructor(private http:HttpClient
    ,private globalEnv:GlobalEnviromentService
    ,private globalConstHttp:GlobalConstantHttpService) { }

  public getAutorithies(): Observable<any>{
    return  this.http.get<Authoritie[]>(`${this.globalEnv.env.URL_API}${ApiUri.AUTHORITIES}/all`).pipe(
      map(_ => {
              return _.map(x=>{ return {label:x.name,value:x} })
            }),
      catchError(this.globalConstHttp.handleError)
    );
  }


  public getOffices(): Observable<any>{
    return this.http.get<Office[]>(`${this.globalEnv.env.URL_API}${ApiUri.OFFICES}/all`).pipe(
      map(_ => {
        return _.map(x => { return { label: x.key +' - '+ x.name, value: x } })
      }),
      catchError(this.globalConstHttp.handleError)
    );
  }

}
