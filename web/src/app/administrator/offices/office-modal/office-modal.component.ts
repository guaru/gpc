import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Office } from 'src/app/core/models/office.model';
import { OfficeHttpService } from '../office-http.service';

@Component({
  selector: 'gpc-office-modal',
  templateUrl: './office-modal.component.html',
  providers: [OfficeHttpService]
})
export class OfficeModalComponent implements AfterViewChecked {

  _title :string = '';
   data:Office;
  constructor(
    private dialogRef: MatDialogRef<OfficeModalComponent>,
    @Inject(MAT_DIALOG_DATA) data:Office, private cdRef:ChangeDetectorRef) {
      this.data =  data;
      this._title =  (data?.id==='' ? 'Crear' : 'Editar') + " Sucursal";
  }

  ngAfterViewChecked()
  {
    this.cdRef.detectChanges();
  }

  onCancel(){
    this.dialogRef.close();
  }

  async onSave($office:Office|null ){
    this.dialogRef.close($office);
  }

}
