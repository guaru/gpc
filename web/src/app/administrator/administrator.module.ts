import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { AdministratorComponent } from './administrator.component';
import { OfficesComponent } from './offices/offices.component';
import { UiFormModule } from '../shared/ui-form/ui-form.module';

@NgModule({
  declarations: [UsersComponent, AdministratorComponent, OfficesComponent],
  exports: [
    UsersComponent,
    AdministratorComponent,
    OfficesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    UiFormModule
  ]
})
export class AdministratorModule { }
