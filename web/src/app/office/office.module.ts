import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { UiFormModule } from '../shared/ui-form/ui-form.module';
import { SharedMaterialModule } from '../shared/shared-material.module';
import { OfficeComponent } from './office.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { OfficeFormModule } from '../common/office-form/office-form.module';



@NgModule({
  declarations: [OfficeComponent, ConfigurationComponent],
  exports:  [OfficeComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    UiFormModule,
    SharedMaterialModule,
    OfficeFormModule
  ]
})
export class OfficeModule { }
