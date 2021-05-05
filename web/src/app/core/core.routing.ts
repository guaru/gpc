import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RecoverComponent } from './auth/recover/recover.component';
import { Component403 } from './403/403.component';
import { ConfirmationComponent } from './auth/confirmation/confirmation.component';
import { RestorePasswordComponent } from './auth/restore-password/restore-password.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirmation/:USERNAME/:UUID', component: ConfirmationComponent },
  { path: 'recover/:USERNAME/:UUID', component: RestorePasswordComponent },
  { path: 'recover', component: RecoverComponent },
  { path: '403', component: Component403 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
