import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Area } from 'src/app/core/models/area.model';
import { Util } from 'src/app/core/utils/Util';
import { AreaHttpService } from '../area-http.service';
import { AreaFormService } from './area-form.service';

@Component({
  selector: 'gpc-area-form',
  templateUrl: './area-form.component.html',
  providers: [AreaFormService, AreaHttpService]
})
export class AreaFormComponent implements AfterViewChecked {


  constructor(public areaFormService:AreaFormService,
    private dialogRef: MatDialogRef<AreaFormComponent>,
    @Inject(MAT_DIALOG_DATA) data:Area, private cdRef:ChangeDetectorRef) {
    this.areaFormService._model =  data;
    this.areaFormService._title =  (data?.id!='' ? 'Crear' : 'Editar') + " Área";

  }

  ngAfterViewChecked()
  {
    this.cdRef.detectChanges();
  }

  onCancel(){
    this.dialogRef.close();
  }

 async onSave(){
    const area:Area|null  = await this.areaFormService.save();
    this.dialogRef.close(area);
 }

}

