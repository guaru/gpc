import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Office } from 'src/app/core/models/office.model';
import { OfficeHttpService } from '../../../administrator/offices/office-http.service';
import { OfficeFormService } from './office-form.service';

@Component({
  selector: 'gpc-office-form',
  templateUrl: './office-form.component.html',
  providers: [OfficeFormService, OfficeHttpService]
})
export class OfficeFormComponent implements OnInit, AfterViewChecked{

  @Input() data: Office = new Office();
  @Input() modConfig :boolean = false;
  @Output() eventSave =  new EventEmitter<Office|null>();
  @Output() eventCancel = new EventEmitter<boolean>();
  @Output() eventDelete = new EventEmitter<Office|null>();

  constructor(public officeFormService: OfficeFormService, private cdRef: ChangeDetectorRef) { }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.officeFormService._title = (this.data?.id != '' ? 'Crear' : 'Editar') + " Sucursal";
    this.officeFormService.setModel(this.data);
    this.officeFormService.buildFields(this.modConfig);
  }

  onCancel(){
    this.eventCancel.emit(true);
  }

 async onSave(){
    const office:Office|null  = await this.officeFormService.save();
     this.eventSave.emit(office);
 }

}
