import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ITurnDataModal } from 'src/app/core/interface/ITurnDataModal';
import { Office } from 'src/app/core/models/office.model';
import { Turn } from 'src/app/core/models/turn.model';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { TurnHtppService } from './turn-htpp.service';
import { TurnModalComponent } from './turn-modal/turn-modal.component';

@Injectable()
export class TurnService {

  public turnsInAttention$:  BehaviorSubject<Turn[]> = new BehaviorSubject([] as Turn[]);
  public turnsPending$: BehaviorSubject<Turn[]> = new BehaviorSubject([] as Turn[]);
  public turn:Turn;
  public office!:Office;

  constructor(private turnHttpService:TurnHtppService,
    private dialog:MatDialog,
    private loadingService:SpinnerService) {
      this.turn = new Turn();
  }

  public setOffice(office:Office):void{
    this.office = office;
  }

  public init(){

  }

  public create(){

  }

  private openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data =  {turn:this.turn, office: this.office } as ITurnDataModal;
    const dialogRef = this.dialog.open(TurnModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data: Turn) => {
        if (data) {
            this.turnsPending$.value.push(data);
        }

      }
    );
  }

  loadInAttention(){
    this.loadingService.initLoading();
    this.turnHttpService.getInAttention(this.office.id||'').subscribe(
      (result : Turn[]) => {
          this.turnsInAttention$.next(result);
      },error => {

      }
    );

  }


  loadPending() {
    this.turnHttpService.getPending(this.office.id || '').subscribe(
      (result: Turn[]) => {
        this.turnsPending$.next(result);
      }, error => {

      }
    );

  }


  itemTrackBy(index: number, item: Turn) {
    return item.id;
  }


}
