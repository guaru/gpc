import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiUri } from '../enums/ApiUri';
import { Authoritie } from '../models/authorite.model';
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
    return  this.http.get(`${this.globalEnv.env.URL_API}${ApiUri.AUTHORITIES}/all`).pipe(
      catchError(this.globalConstHttp.handleError)
    );
  }
}
