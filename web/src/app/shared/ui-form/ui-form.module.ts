import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';

import {config, providerFormly} from './config';
import { ButtonSubmitComponent } from '../components/button-submit/button-submit.component';
import { ButtonDeleteComponent } from '../components/button-delete/button-delete.component';
import { SlideEnabledComponent } from '../components/slide-enabled/slide-enabled.component';
import { ButtonCreateComponent } from '../components/button-create/button-create.component';
import { ButtonCancelComponent } from '../components/button-cancel/button-cancel.component';
import { SharedMaterialModule } from '../shared-material.module';



@NgModule({
  declarations: [ButtonSubmitComponent,
    ButtonDeleteComponent,
    SlideEnabledComponent,
    ButtonCreateComponent,
    ButtonCancelComponent],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyMaterialModule,
    FormlyMatToggleModule,
    ButtonSubmitComponent,
    ButtonDeleteComponent,
    SlideEnabledComponent,
    ButtonCreateComponent,
    ButtonCancelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(config),
    FormlyMaterialModule,
    FormlyMatToggleModule,
    SharedMaterialModule
  ],
  providers:[
    providerFormly
  ]
})
export class UiFormModule { }
