import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OfficesComponent } from './offices/offices.component';
import { UsersComponent } from './users/users.component';

const childRoutes:Routes = [
      { path: '', component: OfficesComponent },
      { path: 'usuarios', component: UsersComponent },
      { path: 'sucursales', component: OfficesComponent }
];

@NgModule({
   imports: [RouterModule.forChild(childRoutes)],
   exports: [RouterModule]
})
export class ChildRoutesModule { }
