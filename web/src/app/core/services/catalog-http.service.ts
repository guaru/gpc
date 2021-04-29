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

  public getMonths(): any[]{
    return  [
      {label:'ENERO',value:0} ,
      {label:'FEBRERO',value:1},
      {label:'MARZO',value:2},
      {label:'ABRIL',value:3},
      {label:'MAYO',value:4},
      {label:'JUNIO',value:5},
      {label:'JULIO',value:6},
      {label:'AGOSTO',value:7},
      {label:'SEPTIEMBRE',value:8},
      {label:'OCTUBRE',value:9},
      {label:'NOVIEMBRE',value:10},
      {label:'DICIEMBRE',value:11}
    ];
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


  public getOffice(officeId:string): Observable<Office> {
    return this.http.get<Office>(`${this.globalEnv.env.URL_API}${ApiUri.COMMUN}/getOffice/${officeId}`).pipe(
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


  public getOfficePromise(officeId:string):Promise<Office|null>{
    return this.getOffice(officeId).toPromise();
  }

  public getOfficesPromise():Promise<Office[]|null>{
      return this.getOffices().toPromise();
  }


}
