import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Url } from '../core/enums/Url';

import { OfficesComponent } from './offices/offices.component';
import { UsersComponent } from './users/users.component';

const childRoutes:Routes = [
      { path: '', component: OfficesComponent },
      { path: Url.USUARIOS, component: UsersComponent },
      { path: Url.SUCURSALES, component: OfficesComponent }
];

@NgModule({
   imports: [RouterModule.forChild(childRoutes)],
   exports: [RouterModule]
})
export class ChildRoutesModule { }
