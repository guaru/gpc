import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiUri } from 'src/app/core/enums/ApiUri';
import { IEnabled } from 'src/app/core/interface/IEnabled';
import { Area } from 'src/app/core/models/area.model';
import { PageRequest } from 'src/app/core/models/page-request.model';
import { PageResponse } from 'src/app/core/models/page-response.model';
import { GlobalConstantHttpService } from 'src/app/core/services/global-constant-http.service';
import { GlobalEnviromentService } from 'src/app/core/services/global-enviroment.service';
import { Util } from 'src/app/core/utils/Util';

@Injectable()
export class AreaHttpService {

  constructor(private http: HttpClient,
    private globalEnv: GlobalEnviromentService,
    private globalConstantHttpService:GlobalConstantHttpService) { }

  public pages(pageRequest: PageRequest) {
    let options: HttpParams = Util.createRequestOption(pageRequest);
    return this.http.get<PageResponse<Area>>(`${this.globalEnv.env.URL_API}${ApiUri.AREAS}`, { params: options });
  }


  public save(area:Area):Observable<Area>{
    return this.http.post<Area>(`${this.globalEnv.env.URL_API}${ApiUri.AREAS}`,area).pipe(
      catchError(this.globalConstantHttpService.handleError),
    );
  }


  public delete(id:string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.globalEnv.env.URL_API}${ApiUri.AREAS}/${id}`).pipe(
      catchError(this.globalConstantHttpService.handleError),
    );
  }

  public enabled(enabled:IEnabled):Observable<boolean>
  {
    return this.http.put<boolean>(`${this.globalEnv.env.URL_API}${ApiUri.AREAS}/enabled`,enabled).pipe(
      catchError(this.globalConstantHttpService.handleError),
    );
  }

}
