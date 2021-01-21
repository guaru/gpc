import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { Component404 } from './404/404.component';
import { RecoverComponent } from './auth/recover/recover.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RecoverComponent,
    Component404
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
