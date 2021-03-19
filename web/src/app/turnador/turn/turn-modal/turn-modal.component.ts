import { AfterViewChecked, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITurnDataModal } from 'src/app/core/interface/ITurnDataModal';
import { Office } from 'src/app/core/models/office.model';
import { Turn } from 'src/app/core/models/turn.model';

@Component({
  selector: 'gpc-turn-modal',
  templateUrl: './turn-modal.component.html'
})
export class TurnModalComponent implements AfterViewChecked {

  _title: string = '';
  turn: Turn;
  office: Office;
  constructor(
    private dialogRef: MatDialogRef<TurnModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: ITurnDataModal, private cdRef: ChangeDetectorRef) {
    this.turn = data.turn;
    this.office =  data.office;
    this._title = "Turno";
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  onCancel() {
    this.dialogRef.close();
  }

  async onSave($turn: Turn | null) {
    this.dialogRef.close($turn);
  }

}
