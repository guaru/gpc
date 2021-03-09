import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Url } from '../core/enums/Url';
import { AreaFormComponent } from './areas/area-form/area-form.component';
import { AreasComponent } from './areas/areas.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FunctionsComponent } from './functions/functions.component';

import { OfficesComponent } from './offices/offices.component';
import { UsersComponent } from './users/users.component';

const childRoutes:Routes = [
      { path: '', component: DashboardComponent , data:{name:"Dashboard"}},
      { path: Url.USUARIOS, component: UsersComponent , data:{name:"Usuarios"}},
      { path: Url.SUCURSALES, component: OfficesComponent, data: { name: "Sucursales" }},
      { path: Url.FUNCIONES, component: FunctionsComponent, data: { name: "Funciones" }},
      { path: Url.AREAS, component: AreasComponent , data:{name:"Áreas"} },

];

@NgModule({
   imports: [RouterModule.forChild(childRoutes)],
   exports: [RouterModule]
})
export class ChildRoutesModule { }
