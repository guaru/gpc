import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageRequest } from 'src/app/core/models/page-request.model';
import { PageResponse } from 'src/app/core/models/page-response.model';
import { User } from 'src/app/core/models/user.model';
import { GlobalEnviromentService } from 'src/app/core/services/global-enviroment.service';
import { Util } from 'src/app/core/utils/Util';

/**
 * SERVICE OPERATIONS CALL API FOR USERS
 * @author
 * @since 08-03-2021
 */
@Injectable()
export class UserHttpService {

  constructor(private http:HttpClient,private globalEnv:GlobalEnviromentService) { }

  public page(pageRequest: PageRequest) {
    let options: HttpParams = Util.createRequestOption(pageRequest);
    return this.http.get<PageResponse<User>>(`${this.globalEnv.env.URL_API}users`, { params: options });
  }

}
