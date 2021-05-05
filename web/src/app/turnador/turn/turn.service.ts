import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
import { ScannerComponent } from '../scanner/scanner.component';
import { Util } from 'src/app/core/utils/Util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/auth/auth.service';
import { IDetailListTurn } from 'src/app/core/interface/IDetailListTurn';
import { IDetailArea } from 'src/app/core/interface/IDetailArea';
@Injectable()
export class TurnService {

  public turnsInAttention$:  BehaviorSubject<Turn[]> = new BehaviorSubject([] as Turn[]);
  public detailInAttention$: BehaviorSubject<IDetailArea[]> = new BehaviorSubject([] as IDetailArea[]);
  public detailPending$: BehaviorSubject<IDetailArea[]> = new BehaviorSubject([] as IDetailArea[]);
  public turnsPending$: BehaviorSubject<Turn[]> = new BehaviorSubject([] as Turn[]);
  private totalInAttentionSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private totalPendingSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private errorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public totalInAttention$: Observable<number> = this.totalInAttentionSubject.asObservable();
  public totalPending$: Observable<number> = this.totalPendingSubject.asObservable();
  public error$:Observable<boolean> =  this.errorSubject.asObservable();
  public msgError:string = '';
  public turn:Turn;
  private office!:Office | null;
  private client!: Client;


  constructor(private turnHttpService:TurnHtppService,
    private dialog:MatDialog,
    private loadingService:SpinnerService,
    private catalogService:CatalogHttpService,
    private globalEnv: GlobalEnviromentService,
    private snackBar:MatSnackBar,
    private authService:AuthService) {
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

  public create():void{
      this.turn =  new Turn();
      this.openDialog();
  }

  private openDialog():void {
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

  public scannerModal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {top:'10px'} as DialogPosition;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(ScannerComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data: Turn |null) => {
          if(data!=null)
            this.automaticConstrolTurnScanner(data);
      });
  }

  private automaticConstrolTurnScanner(turn:Turn):void
  {
      // SI ESTÁ EN ATENCIÓN PASA A ATENDIDO
      if(!turn.attended && turn.inAttention){
          this.attended(turn);
        this.alert(`Turno ${turn.key} - ${turn.number} atendido`);
      } else if(!turn.attended && !turn.inAttention) // SI ESTÁ EN ESPERA PASA A EN ATENCIÓN
      {
        this.toAttention(turn);
        this.alert(`Turno ${turn.key} - ${turn.number} en atención`);
      }else{
        this.alert(`Turno ${turn.key} - ${turn.number} ya fue atendido`);
      }
  }

  private loadOffice(officeId:string):Promise<Office | null>{
    return new Promise(async resolve => {
      let result : Office | null = null;
      try{
          const office =  await this.catalogService.getOffice(officeId).toPromise();
          if(office !=null && !Util.isEmpty(office.id||''))
              result =  office;
      }catch(e){
      }
      finally{
        resolve(result);
      }
    });
  }


  itemTrackBy(index: number, item: Turn) {
    return item.id;
  }

  itemDetailTrackBy(index: number, item: IDetailArea) {
    return item.area;
  }

  public initSocket() {
    this.client = new Client();
    this.client.webSocketFactory = () => {
      return new SocketJs(`${this.globalEnv.env.URL_API}${ApiUri.SOCKET_TURNADOR}`) as IStompSocket;
    };
    this.client.onConnect = (frame) => {

      //SUBSCRIBE TURNS PENDING ATTENTION
      this.client.subscribe(`/topic/pending.${this.office?.id}`, e =>{
        let turn : Turn =  JSON.parse(e.body) as Turn;
        this.turnsPending$.value.push(turn);
        this.turnsPending$.value.sort((a: Turn, b: Turn) => a.number! > b.number! ? 1 : -1);
        this.newPending(turn);
       });

      //SUBSCRIBE TURN IN ATTENTION
      this.client.subscribe(`/topic/in-attention.${this.office?.id}`, e => {
        let turn: Turn = JSON.parse(e.body) as Turn;
        this.turnsPending$.next(this.turnsPending$.value.filter(_ => _.id != turn.id).sort((a:Turn,b:Turn)=> a.number! > b.number! ? 1 : -1));
        this.turnsInAttention$.value.push(turn);
        this.turnsInAttention$.value.sort((a: Turn, b: Turn) => a.number! > b.number! ? 1 : -1)
        this.newInAttention(turn);
        this.removePending(turn);
      });

      //SUBSCRIBE TURN ATTENDED (FINISH PROCESES)
      this.client.subscribe(`/topic/attended.${this.office?.id}`, e => {
        let turn: Turn = JSON.parse(e.body) as Turn;
        this.turnsInAttention$.next(this.turnsInAttention$.value.filter(_ => _.id != turn.id).sort((a: Turn, b: Turn) => a.number! > b.number! ? 1 : -1));
        this.removeInAttention(turn);
      });



      this.client.subscribe(`/topic/in-attention.${this.office?.id}.${this.authService.user?.email }`, e => {
        let detail: IDetailListTurn = JSON.parse(e.body) as IDetailListTurn;
        console.log(detail);
        this.turnsInAttention$.next(detail.turns);
        this.detailInAttention$.next(detail.detail);
        this.updateTotalInAttention();
      });

      this.client.subscribe(`/topic/in-pending.${this.office?.id}.${this.authService.user?.email }`, e => {
        let detail: IDetailListTurn = JSON.parse(e.body) as IDetailListTurn;
        this.turnsPending$.next(detail.turns);
        this.detailPending$.next(detail.detail);
        this.updateTotalPending();
      });

      this.client.publish({ destination: `/api/socket/turn/get-inattention/${this.office?.id}/${this.authService.user?.email }` });
      this.client.publish({ destination: `/api/socket/turn/get-pending/${this.office?.id}/${this.authService.user?.email }`});



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
    this.client.publish({ destination: `/api/socket/turn/attended/${this.office?.id}`, body: JSON.stringify(turn) });
  }

  public endSocket() {
    this.client.onDisconnect = (frame) => {
      console.log("FINISH SOCKET");
    }
    this.client.deactivate();
  }

  public alert(msg:string){
    this.snackBar.open(msg, 'Ok', {
      duration: 3600
    });
  }


  private newPending(turn:Turn){
      const index = this.detailPending$.value.findIndex(_=>_.area === turn.area?.name);
      if(index > -1){ // EXIST DETAIL
          this.detailPending$.value[index].total += 1;
      }else{
          this.detailPending$.value.push({area:turn.area?.name,total:1} as IDetailArea);
      }
    this.updateTotalPending();
  }

  private removePending(turn: Turn) {
    const index = this.detailPending$.value.findIndex(_ => _.area === turn.area?.name);
    if (index > -1) { // EXIST DETAIL
      this.detailPending$.value[index].total -= 1;
    } else {
      this.detailPending$.value.push({ area: turn.area?.name, total: 0 } as IDetailArea);
    }
    this.updateTotalPending();
  }


  private newInAttention(turn: Turn) {
    const index = this.detailInAttention$.value.findIndex(_ => _.area === turn.area?.name);
    if (index > -1) { // EXIST DETAIL
      this.detailInAttention$.value[index].total += 1;
    } else {
      this.detailInAttention$.value.push({ area: turn.area?.name, total: 1 } as IDetailArea);
    }
    this.updateTotalInAttention();
  }

  private removeInAttention(turn: Turn) {
    const index = this.detailInAttention$.value.findIndex(_ => _.area === turn.area?.name);
    if (index > -1) { // EXIST DETAIL
      this.detailInAttention$.value[index].total -= this.detailInAttention$.value[index].total > 0 ? 1 : 0;
    } else {
      this.detailInAttention$.value.push({ area: turn.area?.name, total: 1 } as IDetailArea);
    }
    this.updateTotalInAttention();
  }

  private updateTotalInAttention():void{
    this.totalInAttentionSubject.next(this.turnsInAttention$.value.length);
  }

  private updateTotalPending():void{
    this.totalPendingSubject.next(this.turnsPending$.value.length);
  }




}
