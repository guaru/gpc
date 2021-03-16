import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeFormComponent } from './office-form.component';
import { UiFormModule } from 'src/app/shared/ui-form/ui-form.module';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [OfficeFormComponent],
  exports:[OfficeFormComponent],
  imports: [
    CommonModule,
    UiFormModule,
    SharedMaterialModule,
    SharedModule
  ]
})
export class OfficeFormModule { }
