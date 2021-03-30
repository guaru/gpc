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
        //if (data) {
           // this.turnsPending$.value.push(data);
           this.sendTurn(data);
       // }

      }
    );
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
      console.log(frame);
       this.client.subscribe(`/api/turnador/${this.office?.id}`, e =>{
             let turn : Turn =  JSON.parse(e.body) as Turn;
             console.log(turn);
             this.turnsPending$.value.push(turn);
       });
    }

    this.client.activate();
  }

  public sendTurn(turn:Turn){
    console.log("SEND TURN");
    this.client.publish({destination: `/api/socket/turn/${this.office?.id}`,body: JSON.stringify(turn)});
  }

  public endSocket() {
    this.client.onDisconnect = (frame) => {
      console.log("FINISH SOCKET");
    }
    this.client.deactivate();
  }




}
