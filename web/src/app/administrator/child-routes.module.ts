import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Url } from '../core/enums/Url';
import { AreasComponent } from './areas/areas.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FunctionsComponent } from './functions/functions.component';
import { NonWorkingDaysComponent } from './non-working-days/non-working-days.component';

import { OfficesComponent } from './offices/offices.component';
import { AccountComponent } from './users/account/account.component';
import { UsersComponent } from './users/users.component';

const childRoutes:Routes = [
  { path: '', component: DashboardComponent, data: { name: "Dashboard"}},
  { path: Url.USUARIOS, component: UsersComponent, data: { name: "Usuarios", icon: "mdi mdi-account-key"}},
  { path: Url.CUENTA, component: AccountComponent, data: { name: "Cuenta", icon: "ti-settings"}},
  { path: Url.SUCURSALES, component: OfficesComponent, data: { name: "Sucursales", icon: "mdi mdi-bank" }},
  { path: Url.FUNCIONES, component: FunctionsComponent, data: { name: "Funciones" }},
  { path: Url.AREAS, component: AreasComponent, data: { name: "Áreas", icon:"mdi mdi-view-module"} },
  { path: Url.NON_WORKING_DAYS, component: NonWorkingDaysComponent, data: { name: "Días Inhábiles", icon:"mdi mdi-view-module"} },
];

@NgModule({
   imports: [RouterModule.forChild(childRoutes)],
   exports: [RouterModule]
})
export class ChildRoutesModule { }
