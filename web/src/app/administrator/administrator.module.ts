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
import { OfficeModalComponent } from './offices/office-modal/office-modal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NonWorkingDaysComponent } from './non-working-days/non-working-days.component';
import { NonWorkingDayFormComponent } from './non-working-days/non-working-day-form/non-working-day-form.component';

@NgModule({
  declarations: [UsersComponent,
     AdministratorComponent,
     OfficesComponent,
     FunctionsComponent,
     AreasComponent,
     AreaFormComponent,
     DashboardComponent,
     OfficeModalComponent,
     NonWorkingDaysComponent,
     NonWorkingDayFormComponent],

  exports: [
    UsersComponent,
    AdministratorComponent,
    OfficesComponent,
    FunctionsComponent,
    AreasComponent,
    AreaFormComponent,
    OfficeModalComponent,
    NonWorkingDaysComponent,
    NonWorkingDayFormComponent
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
