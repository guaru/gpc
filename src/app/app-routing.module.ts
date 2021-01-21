import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//MODULES
import { PagesRoutingModule } from './pages/pages.routing';

//COMPONENTS
import { Component404 } from './core/404/404.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RecoverComponent } from './core/auth/recover/recover.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { CoreRoutingModule } from './core/core.routing';


const routes: Routes = [
  //path: '/dashboard' PagesRouting
  //path: '/auth' CoreRouting
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: Component404 }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    CoreRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
