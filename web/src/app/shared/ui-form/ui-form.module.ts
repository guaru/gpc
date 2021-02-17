import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';


import {config, providerFormly} from './config';



@NgModule({
  declarations: [],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyMaterialModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(config),
    FormlyMaterialModule,
  ],
  providers:[
    providerFormly
  ]
})
export class UiFormModule { }
