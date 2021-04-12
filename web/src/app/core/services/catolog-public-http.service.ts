import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiUri } from '../enums/ApiUri';
import { Office } from '../models/office.model';
import { GlobalConstantHttpService } from './global-constant-http.service';
import { GlobalEnviromentService } from './global-enviroment.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogPublicHttpService {

  constructor(private http: HttpClient
    , private globalEnv: GlobalEnviromentService
    , private globalConstHttp: GlobalConstantHttpService) { }

  public getOffice(officeId: string): Observable<Office> {
    return this.http.get<Office>(`${this.globalEnv.env.URL_API}${ApiUri.COMMUN_PUBLIC}/getOffice/${officeId}`).pipe(
      catchError(this.globalConstHttp.handleError)
    );
  }



}
