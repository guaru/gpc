import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiUri } from 'src/app/core/enums/ApiUri';
import { IEnabled } from 'src/app/core/interface/IEnabled';
import { NonWorkingDay } from 'src/app/core/models/non-working-day.model';
import { PageRequest } from 'src/app/core/models/page-request.model';
import { PageResponse } from 'src/app/core/models/page-response.model';
import { GlobalConstantHttpService } from 'src/app/core/services/global-constant-http.service';
import { GlobalEnviromentService } from 'src/app/core/services/global-enviroment.service';
import { Util } from 'src/app/core/utils/Util';

@Injectable()
export class NonWorkingDayHttpService {

  constructor(private http: HttpClient,
    private globalEnv: GlobalEnviromentService,
    private globalConstantHttpService:GlobalConstantHttpService) { }

  public pages(pageRequest: PageRequest) {
    let options: HttpParams = Util.createRequestOption(pageRequest);
    return this.http.get<PageResponse<NonWorkingDay>>(`${this.globalEnv.env.URL_API}${ApiUri.NON_WORKING_DAY}`, { params: options });
  }


  public save(nonWorkingDay:NonWorkingDay):Observable<NonWorkingDay>{
    if(Util.isEmpty(nonWorkingDay.id||'')){
      return this.http.post<NonWorkingDay>(`${this.globalEnv.env.URL_API}${ApiUri.NON_WORKING_DAY}`, nonWorkingDay).pipe(
        catchError(this.globalConstantHttpService.handleError),
      );
    }else{
      return this.http.put<NonWorkingDay>(`${this.globalEnv.env.URL_API}${ApiUri.NON_WORKING_DAY}`, nonWorkingDay).pipe(
        catchError(this.globalConstantHttpService.handleError),
      );
    }

  }


  public delete(id:string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.globalEnv.env.URL_API}${ApiUri.NON_WORKING_DAY}/${id}`).pipe(
      catchError(this.globalConstantHttpService.handleError),
    );
  }

  public enabled(enabled:IEnabled):Observable<boolean>
  {
    return this.http.put<boolean>(`${this.globalEnv.env.URL_API}${ApiUri.NON_WORKING_DAY}/enabled`,enabled).pipe(
      catchError(this.globalConstantHttpService.handleError),
    );
  }

  public exist(month?: number, day?: number, id?: string):Observable<boolean>
  {
    if(!id){
      id = '0';
    }
    return this.http.get<any>(`${this.globalEnv.env.URL_API}${ApiUri.NON_WORKING_DAY}/exist/${month}/${day}/${id}`,).pipe(
      catchError(this.globalConstantHttpService.handleError),
    );
  }

}
