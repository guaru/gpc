import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { ApiUri } from "src/app/core/enums/ApiUri";
import { IEnabled } from "src/app/core/interface/IEnabled";
import { Office } from "src/app/core/models/office.model";
import { PageRequest } from "src/app/core/models/page-request.model";
import { PageResponse } from "src/app/core/models/page-response.model";
import { GlobalConstantHttpService } from "src/app/core/services/global-constant-http.service";
import { GlobalEnviromentService } from "src/app/core/services/global-enviroment.service";
import { Util } from "src/app/core/utils/Util";

@Injectable()
export class OfficeHttpService {
    constructor(private http: HttpClient,
        private globalEnv: GlobalEnviromentService,
        private globalConstantHttpService:GlobalConstantHttpService)
        { }

    public pages(pageRequest: PageRequest) {
        let options: HttpParams = Util.createRequestOption(pageRequest);
        return this.http.get<PageResponse<Office>>(`${this.globalEnv.env.URL_API}${ApiUri.OFFICES}`, { params: options })
          .pipe(catchError(this.globalConstantHttpService.handleError));
    }


    public save(office:Office):Observable<Office>{
        if(!Util.isEmpty(office.id||'')){
            return this.http.post<Office>(`${this.globalEnv.env.URL_API}${ApiUri.OFFICES}`, office).pipe(
            catchError(this.globalConstantHttpService.handleError),
            );
        }else{
            return this.http.put<Office>(`${this.globalEnv.env.URL_API}${ApiUri.OFFICES}`, office).pipe(
            catchError(this.globalConstantHttpService.handleError),
            );
        }

    }


    public delete(id:string): Observable<boolean> {
        return this.http.delete<boolean>(`${this.globalEnv.env.URL_API}${ApiUri.OFFICES}/${id}`).pipe(
            catchError(this.globalConstantHttpService.handleError),
        );
    }

    public enabled(enabled:IEnabled):Observable<boolean>{
        return this.http.put<boolean>(`${this.globalEnv.env.URL_API}${ApiUri.OFFICES}/enabled`,enabled).pipe(
            catchError(this.globalConstantHttpService.handleError),
        );
    }

}
