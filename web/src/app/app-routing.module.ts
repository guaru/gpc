import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//MODULES
import { CoreRoutingModule } from './core/core.routing';
import { AdministratorRoutingModule } from './administrator/administrator.routing';

//COMPONENTS
import { Component404 } from './core/404/404.component';
import { OfficeRoutingModule } from './office/office.routing';
import { TurnadorRoutingModule } from './turnador/turnador.routing';
import { PublicRoutingModule } from './public/public.routing';


const routes: Routes = [
  { path: '', redirectTo: 'administrador', pathMatch: 'full' },
  { path: '**', component: Component404 }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CoreRoutingModule,
    AdministratorRoutingModule,
    OfficeRoutingModule,
    TurnadorRoutingModule,
    PublicRoutingModule

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
