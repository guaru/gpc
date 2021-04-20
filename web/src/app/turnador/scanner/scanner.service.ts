import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Turn } from 'src/app/core/models/turn.model';
import { Util } from 'src/app/core/utils/Util';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { TurnHtppService } from '../turn/turn-htpp.service';

@Injectable()
export class ScannerService {

  private enabledSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public enabled$: Observable<boolean> = this.enabledSubject.asObservable();

  constructor(private turnHttpService:TurnHtppService,
    private loadingService:SpinnerService) { }


  async turnActionScanner(turnId:string): Promise<Turn|null>{
    return new Promise(async resolve => {
      let result : Turn | null = null;
      try
      {
        this.loadingService.initLoading();
        this.enabledSubject.next(false);
        if (!Util.isEmpty(turnId)) {
          let turn: Turn = await this.turnHttpService.get(turnId).toPromise();
          if(turn!=null && !Util.isEmpty(turn.id||''))
             result =  turn;
        }

      }catch(e){
        console.log("FAILD LOAD TURN");
      }
      finally{
         this.loadingService.endLoading();
        resolve(result);
      }

    });
  }

}
