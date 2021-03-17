import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiUri } from 'src/app/core/enums/ApiUri';
import { IEnabled } from 'src/app/core/interface/IEnabled';
import { PageRequest } from 'src/app/core/models/page-request.model';
import { PageResponse } from 'src/app/core/models/page-response.model';
import { User } from 'src/app/core/models/user.model';
import { GlobalConstantHttpService } from 'src/app/core/services/global-constant-http.service';
import { GlobalEnviromentService } from 'src/app/core/services/global-enviroment.service';
import { Util } from 'src/app/core/utils/Util';

/**
 * SERVICE OPERATIONS CALL API FOR USERS
 * @author
 * @since 08-03-2021
 */
@Injectable()
export class UserHttpService {

  constructor(private http:HttpClient,
    private globalEnv:GlobalEnviromentService,
    public globalConstantHttpService: GlobalConstantHttpService) { }

  public page(pageRequest: PageRequest) {
    let options: HttpParams = Util.createRequestOption(pageRequest);
    return this.http.get<PageResponse<User>>(`${this.globalEnv.env.URL_API}users`, { params: options });
  }



  public save(user:User):Observable<User>{
    if(Util.isEmpty(user.id||'')){
      return this.http.post<User>(`${this.globalEnv.env.URL_API}${ApiUri.USERS}`, user)
        .pipe(
          catchError(this.globalConstantHttpService.handleError)
        );
    }else{
      return this.http.put<User>(`${this.globalEnv.env.URL_API}${ApiUri.USERS}`, user)
        .pipe(
          catchError(this.globalConstantHttpService.handleError)
        );
    }
  }


  public enabled(enabled: IEnabled): Observable<boolean> {
    return this.http.put<boolean>(`${this.globalEnv.env.URL_API}${ApiUri.USERS}/enabled`, enabled).pipe(
      catchError(this.globalConstantHttpService.handleError),
    );
  }

  public delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.globalEnv.env.URL_API}${ApiUri.USERS}/${id}`).pipe(
      catchError(this.globalConstantHttpService.handleError),
    );
  }

  public getOperators(officeId:string){
    return this.http.get<User[]>(`${this.globalEnv.env.URL_API}${ApiUri.USERS}/operators/${officeId}`)
    .pipe(catchError(this.globalConstantHttpService.handleError));
  }

}
