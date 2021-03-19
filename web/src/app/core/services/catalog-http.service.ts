import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiUri } from '../enums/ApiUri';
import { Label } from '../enums/Label';
import { Area } from '../models/area.model';
import { Authoritie } from '../models/authorite.model';
import { Day } from '../models/day.model';
import { Office } from '../models/office.model';
import { State } from '../models/state.model';
import { GlobalConstantHttpService } from './global-constant-http.service';
import { GlobalEnviromentService } from './global-enviroment.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogHttpService {

  constructor(private http:HttpClient
    ,private globalEnv:GlobalEnviromentService
    ,private globalConstHttp:GlobalConstantHttpService) { }

  public getAutorithies(): Observable<any[]>{
    return  this.http.get<Authoritie[]>(`${this.globalEnv.env.URL_API}${ApiUri.AUTHORITIES}/all`).pipe(
      map(_ => {
              return _.map(x=>{ return {label:x.description,value:x.id} })
            }),
      catchError(this.globalConstHttp.handleError)
    );
  }


  public getOffices(): Observable<any[]>{
    return this.http.get<Office[]>(`${this.globalEnv.env.URL_API}${ApiUri.OFFICES}/all`).pipe(
     map(_ => {
        return _.map(x => { return { label: x.key +' - '+ x.name, value: x.id } })
     }),
      catchError(this.globalConstHttp.handleError)
    );
  }

  public getStates(): Observable<any[]>{
    return this.http.get<State[]>(`${this.globalEnv.env.URL_API}${ApiUri.COMMUN}/getStates`).pipe(
     map(_ => {
        return _.map(x => { return { label: x.numberState +' - '+ x.name, value: x.id } })
     }),
      catchError(this.globalConstHttp.handleError)
    );
  }

  public getAreas(): Observable<any[]>{
    return this.http.get<Area[]>(`${this.globalEnv.env.URL_API}${ApiUri.AREAS}/all`).pipe(
     map(_ => {
        return _.map(x => { return { label: x.key +' - '+ x.name, value: x.id } })
     }),
      catchError(this.globalConstHttp.handleError)
    );
  }


  public getOffice(officeId:string): Observable<any[]> {
    return this.http.get<Area[]>(`${this.globalEnv.env.URL_API}${ApiUri.COMMUN}/getOffice/${officeId}`).pipe(
      map(_ => {
        return _.map(x => { return { label: x.key + ' - ' + x.name, value: x.id } })
      }),
      catchError(this.globalConstHttp.handleError)
    );
  }

  public getDays(): Observable<any[]>{
    return this.http.get<Day[]>(`${this.globalEnv.env.URL_API}${ApiUri.COMMUN}/getDays`).pipe(
      map(_ => {
        return _.map(x => { return { label:  x.name, value: x.id } })
      }),
      catchError(this.globalConstHttp.handleError)
    );
  }

}
