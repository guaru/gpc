import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';

import {config, providerFormly} from './config';



@NgModule({
  declarations: [],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyMaterialModule,
    FormlyMatToggleModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(config),
    FormlyMaterialModule,
    FormlyMatToggleModule
  ],
  providers:[
    providerFormly
  ]
})
export class UiFormModule { }
