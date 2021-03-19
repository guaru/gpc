import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { UiFormModule } from '../shared/ui-form/ui-form.module';
import { SharedMaterialModule } from '../shared/shared-material.module';
import { OfficeComponent } from './office.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { OperadorComponent } from './operador/operador.component';



@NgModule({
  declarations: [OfficeComponent, ConfigurationComponent, OperadorComponent],
  exports:  [OfficeComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    UiFormModule,
    SharedMaterialModule
  ]
})
export class OfficeModule { }
