import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITurnDataModal } from 'src/app/core/interface/ITurnDataModal';
import { Office } from 'src/app/core/models/office.model';
import { Turn } from 'src/app/core/models/turn.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { CatalogHttpService } from 'src/app/core/services/catalog-http.service';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { TurnHtppService } from './turn-htpp.service';
import { TurnModalComponent } from './turn-modal/turn-modal.component';
import { Client, IStompSocket } from '@stomp/stompjs';
import * as SocketJs from 'sockjs-client';
import { GlobalEnviromentService } from 'src/app/core/services/global-enviroment.service';
import { ApiUri } from 'src/app/core/enums/ApiUri';
@Injectable()
export class TurnService {

  public turnsInAttention$:  BehaviorSubject<Turn[]> = new BehaviorSubject([] as Turn[]);
  public turnsPending$: BehaviorSubject<Turn[]> = new BehaviorSubject([] as Turn[]);
  private errorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public error$:Observable<boolean> =  this.errorSubject.asObservable();
  public msgError:string = '';
  public turn:Turn;
  private office!:Office | null;
  private client!: Client;


  constructor(private turnHttpService:TurnHtppService,
    private dialog:MatDialog,
    private loadingService:SpinnerService,
    private catalogService:CatalogHttpService,
    private alertService:AlertService,
    private globalEnv: GlobalEnviromentService) {
      this.turn = new Turn();
  }

  private  setOffice(office:Office):void{
    this.office = office;
  }

  public async init(officeId:string){
    this.loadingService.initLoading();
    this.office =  await this.loadOffice(officeId);
    if(this.office==null){
      this.errorSubject.next(true);
      this.msgError  = 'No logramos detectar la sucursal';
    }
    this.loadingService.endLoading();
  }

  public create(){
      this.turn =  new Turn();
      this.openDialog();
  }

  private openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data =  {turn:this.turn, office: this.office } as ITurnDataModal;
    const dialogRef = this.dialog.open(TurnModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data: Turn) => {
        if (data)
           this.sendTurn(data);

      });
  }

  private loadOffice(officeId:string):Promise<Office | null>{
    return new Promise(resolve => {
      try{
          this.catalogService.getOffice(officeId).subscribe(office=> {
              if(office)
                 resolve(office);
              else
                 resolve(null);
          } ,error=>{
                resolve(null);
          });
      }catch(e){
             resolve(null);
      }
    });
  }

  itemTrackBy(index: number, item: Turn) {
    return item.id;
  }


  public initSocket() {
    this.client = new Client();
    this.client.webSocketFactory = () => {
      return new SocketJs(`${this.globalEnv.env.URL_API}${ApiUri.SOCKET_TURNADOR}`) as IStompSocket;
    };
    this.client.onConnect = (frame) => {

      //SUBSCRIBE TURNS PENDING ATTENTION
      this.client.subscribe(`/api/turnador/pending/${this.office?.id}`, e =>{
             let turn : Turn =  JSON.parse(e.body) as Turn;
             this.turnsPending$.value.push(turn);
             this.turnsPending$.value.sort((a: Turn, b: Turn) => a.number! > b.number! ? 1 : -1)
       });

      //SUBSCRIBE TURN IN ATTENTION
      this.client.subscribe(`/api/turnador/in-attention/${this.office?.id}`, e => {
        let turn: Turn = JSON.parse(e.body) as Turn;
        this.turnsPending$.next(this.turnsPending$.value.filter(_ => _.id != turn.id).sort((a:Turn,b:Turn)=> a.number! > b.number! ? 1 : -1));
        this.turnsInAttention$.value.push(turn);
        this.turnsInAttention$.value.sort((a: Turn, b: Turn) => a.number! > b.number! ? 1 : -1)
      });

      //SUBSCRIBE TURN ATTENDED (FINISH PROCESES)
      this.client.subscribe(`/api/turnador/attended/${this.office?.id}`, e => {
        let turn: Turn = JSON.parse(e.body) as Turn;
        this.turnsInAttention$.next(this.turnsInAttention$.value.filter(_ => _.id != turn.id).sort((a: Turn, b: Turn) => a.number! > b.number! ? 1 : -1));
      });



      this.client.subscribe(`/api/turnador/in-attention/${this.office?.id}/1`, e => {
        let turn: Turn[] = JSON.parse(e.body) as Turn[];
        this.turnsInAttention$.next(turn);
      });

      this.client.subscribe(`/api/turnador/in-pending/${this.office?.id}/1`, e => {
        let turn: Turn[] = JSON.parse(e.body) as Turn[];
        this.turnsPending$.next(turn);
      });

      this.client.publish({ destination: `/api/socket/turn/get-inattention/${this.office?.id}/1` });
      this.client.publish({ destination: `/api/socket/turn/get-pending/${this.office?.id}/1`});



    }

    this.client.activate();
  }

  public sendTurn(turn:Turn){
    this.client.publish({destination: `/api/socket/turn/new/${this.office?.id}`,body: JSON.stringify(turn)});
  }

  public toAttention(turn:Turn){
    this.client.publish({ destination: `/api/socket/turn/to-attention/${this.office?.id}`, body: JSON.stringify(turn) });
  }


  public attended(turn: Turn) {
    console.log(turn);
    this.client.publish({ destination: `/api/socket/turn/attended/${this.office?.id}`, body: JSON.stringify(turn) });
  }

  public endSocket() {
    this.client.onDisconnect = (frame) => {
      console.log("FINISH SOCKET");
    }
    this.client.deactivate();
  }




}
