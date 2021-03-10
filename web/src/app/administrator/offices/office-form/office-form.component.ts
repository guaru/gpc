import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Office } from 'src/app/core/models/office.model';
import { OfficeHttpService } from '../office-http.service';
import { OfficeFormService } from './office-form.service';

@Component({
  selector: 'gpc-office-form',
  templateUrl: './office-form.component.html',
  providers: [OfficeFormService, OfficeHttpService]
})
export class OfficeFormComponent implements AfterViewChecked {


  constructor(public officeFormService:OfficeFormService,
    private dialogRef: MatDialogRef<OfficeFormComponent>,
    @Inject(MAT_DIALOG_DATA) data:Office, private cdRef:ChangeDetectorRef) {
    this.officeFormService._title =  (data?.id!='' ? 'Crear' : 'Editar') + " Sucursal";
    this.officeFormService._model =  data;
  }

  ngAfterViewChecked()
  {
    this.cdRef.detectChanges();
  }

  onCancel(){
    this.dialogRef.close();
  }

 async onSave(){
    const office:Office|null  = await this.officeFormService.save();
    this.dialogRef.close(office);
 }

}