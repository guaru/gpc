import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Url } from 'src/app/core/enums/Url';
import { Office } from 'src/app/core/models/office.model';
import { CatalogPublicHttpService } from 'src/app/core/services/catolog-public-http.service';
import { Util } from 'src/app/core/utils/Util';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { Client, IStompSocket } from '@stomp/stompjs';
import * as SocketJs from 'sockjs-client';
import { GlobalEnviromentService } from 'src/app/core/services/global-enviroment.service';
import { ApiUri } from 'src/app/core/enums/ApiUri';
import { Turn } from 'src/app/core/models/turn.model';
import { TurnHtppService } from 'src/app/turnador/turn/turn-htpp.service';


@Injectable()
export class PublicTurnService {

  private loadSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public load$: Observable<boolean> = this.loadSubject.asObservable();
  private notExistTurnLocalSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public noExistTurnLocal$: Observable<boolean> = this.notExistTurnLocalSubject.asObservable();
  public msgError: string = '';
  private _office!:Office | null;
  private client!: Client;
  private _turn: Turn | null  = null;

  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private catalogoService:CatalogPublicHttpService,
    private loadingService: SpinnerService,
    private globalEnv:GlobalEnviromentService,
    private turnHttpService:TurnHtppService
    ) { }


  async init()
  {
    this.loadingService.initLoading();
    //EXIST TURN LOCAL
     if(await this.existTurnLocal()){
       this.notExistTurnLocalSubject.next(false);
       this.loadingService.endLoading();
       return;
     }


    // LOAD OFFICE
    const officeId = await  Util.getParam(this.activeRoute,'officeId');
    if(!officeId)
      this.redirectNotFound();
    this._office = await this.loadOffice(officeId as string);
    if (this._office != null && this._office.enabled) {
        //IMPLEMENT PENDING OFFICE OFLINE
        console.log(this._office);
    } else {
      this.redirectNotFound();
    }

    //INIT SOCKET
    const connect:boolean = await this.initSocket();
    if(!connect)
      this.redirectNotFound();

    this.loadingService.endLoading();
    this.loadSubject.next(true);
  }


  private loadOffice(officeId: string): Promise<Office | null> {
    return new Promise(resolve => {
      try {
        this.catalogoService.getOffice(officeId).subscribe(office => {
          if (office)
            resolve(office);
          else
            resolve(null);
        }, error => {
          resolve(null);
        });
      } catch (e) {
        resolve(null);
      }
    });
  }

  public async initSocket() : Promise<boolean> {
    return new Promise(resolve => {
      this.client = new Client();
      this.client.webSocketFactory = () => {
        return new SocketJs(`${this.globalEnv.env.URL_API}${ApiUri.SOCKET_TURNADOR}`) as IStompSocket;
      };
      this.client.onConnect = (frame) => {
        console.log("SOCKET CONNECT");
        resolve(true);
      };
      this.client.activate();
    });
  }

  public publishNewTurn(turn:Turn|null){
      if(turn!=null && !Util.isEmpty(turn.id||'')){
        this.saveLocalTurn(turn);
        this.client.publish({ destination: `/api/socket/turn/new/${this.office?.id}`, body: JSON.stringify(turn) });
      }else{
          this.redirectNotFound();
      }
  }

  private redirectNotFound():void{
    this.router.navigate([Url._404]);
  }

  private saveLocalTurn(turn:Turn){
    this._turn =  turn;
    this.notExistTurnLocalSubject.next(false);
    localStorage.setItem('TURN_ID', turn.id||'');

  }

  public get turn():Turn{
    return this._turn || new Turn();
  }

  private async existTurnLocal() : Promise<boolean> {
    return new Promise(async resolve => {
      let result: boolean = false;
      try
      {
        const id: string = localStorage.getItem("TURN_ID") || '';
        if (!Util.isEmpty(id || '')) {
          this._turn = await this.turnHttpService.get(id).toPromise();
          if(!this._turn.attended)
              result =  true;
        }
      }catch(e){
          result =  false;
      }finally{
        resolve(result);
      }
    });
  }



 public get office(): Office{
   return this._office || new Office();
 }



}
