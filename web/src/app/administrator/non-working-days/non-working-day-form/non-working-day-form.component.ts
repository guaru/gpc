import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NonWorkingDay } from 'src/app/core/models/non-working-day.model';
import { Util } from 'src/app/core/utils/Util';
import { NonWorkingDayHttpService } from '../non-working-day-http.service';
import { NonWorkingDayFormService } from './non-working-day-form.service';

@Component({
  selector: 'gpc-non-working-day-form',
  templateUrl: './non-working-day-form.component.html',
  providers: [NonWorkingDayFormService, NonWorkingDayHttpService]
})
export class NonWorkingDayFormComponent implements OnInit, AfterViewChecked {

  private dataTemp: NonWorkingDay;

  constructor(public nonWorkingDayFormService:NonWorkingDayFormService,
    private dialogRef: MatDialogRef<NonWorkingDayFormComponent>,
    @Inject(MAT_DIALOG_DATA) data:NonWorkingDay, private cdRef:ChangeDetectorRef) {
      this.dataTemp = data;
      this.nonWorkingDayFormService._title = (data.id!='' ? 'Crear' : 'Editar') + " Día Inhábil";
  }
  
  ngOnInit(): void {
    this.nonWorkingDayFormService._model = this.dataTemp;
    this.nonWorkingDayFormService.buildFields();
  }

  ngAfterViewChecked()
  {
    this.cdRef.detectChanges();
  }

  onCancel(){
    this.dialogRef.close();
  }

 async onSave(){
    const exist = await this.nonWorkingDayFormService.exist();
    if(exist){
      const nonWorkingDay:NonWorkingDay|null  = await this.nonWorkingDayFormService.save();
      this.dialogRef.close(nonWorkingDay);
    }
    
 }

}

