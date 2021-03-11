import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { AdministratorComponent } from './administrator.component';
import { OfficesComponent } from './offices/offices.component';
import { UiFormModule } from '../shared/ui-form/ui-form.module';
import { SharedMaterialModule } from '../shared/shared-material.module';
import { FunctionsComponent } from './functions/functions.component';
import { AreasComponent } from './areas/areas.component';
import { AreaFormComponent } from './areas/area-form/area-form.component';
import { OfficeFormComponent } from './offices/office-form/office-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserFormComponent } from './users/user-form/user-form.component';

@NgModule({
  declarations: [UsersComponent,
     AdministratorComponent,
     OfficesComponent,
     FunctionsComponent,
     AreasComponent,
     AreaFormComponent,
     DashboardComponent,
     UserFormComponent,
     OfficeFormComponent],

  exports: [
    UsersComponent,
    AdministratorComponent,
    OfficesComponent,
    FunctionsComponent,
    AreasComponent,
    AreaFormComponent,
    OfficeFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    UiFormModule,
    SharedMaterialModule
  ]
})
export class AdministratorModule { }
