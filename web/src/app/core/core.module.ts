import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { Component404 } from './404/404.component';
import { RecoverComponent } from './auth/recover/recover.component';
import { UiFormModule } from '../shared/ui-form/ui-form.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../shared/interceptors/token.interceptor';
import { AuthInterceptor } from '../shared/interceptors/auth.interceptor';
import { ConfirmationComponent } from './auth/confirmation/confirmation.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RecoverComponent,
    ConfirmationComponent,
    Component404

  ],
  exports: [
    HttpClientModule
  ],
  imports: [
    CommonModule,
    UiFormModule,
    HttpClientModule
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
})
export class CoreModule { }
