import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiUri } from 'src/app/core/enums/ApiUri';
import { Turn } from 'src/app/core/models/turn.model';
import { GlobalConstantHttpService } from 'src/app/core/services/global-constant-http.service';
import { GlobalEnviromentService } from 'src/app/core/services/global-enviroment.service';
import { Util } from 'src/app/core/utils/Util';

@Injectable()
export class TurnHtppService {

  turnsInAttention: Turn[] = [];
  turn!:Turn;

  constructor(private http: HttpClient, private globalEnv: GlobalEnviromentService, private globalConstantHttpService:GlobalConstantHttpService) {

  }

  public save(turn: Turn): Observable<Turn> {
    if (Util.isEmpty(turn.id || '')) {
      return this.http.post<Turn>(`${this.globalEnv.env.URL_API}${ApiUri.TURN}`, turn).pipe(
        catchError(this.globalConstantHttpService.handleError),
      );
    } else {
      return this.http.put<Turn>(`${this.globalEnv.env.URL_API}${ApiUri.TURN}`, turn).pipe(
        catchError(this.globalConstantHttpService.handleError),
      );
    }
  }

  public getInAttention(officeId:string){
    return this.http.get<Turn[]>(`${this.globalEnv.env.URL_API}${ApiUri.TURN}/in-attention/${officeId}`)
    .pipe(catchError(this.globalConstantHttpService.handleError));
  }

  public getPending(officeId: string) {
    return this.http.get<Turn[]>(`${this.globalEnv.env.URL_API}${ApiUri.TURN}/pending/${officeId}`)
      .pipe(catchError(this.globalConstantHttpService.handleError));
  }

}
