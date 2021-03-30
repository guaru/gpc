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
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { FormlyAutocomplete } from '../components/autocomplete/formly-autocomplete.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
//import { MatInputModule, MatNativeDateModule } from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';



@NgModule({
  declarations: [ButtonSubmitComponent,
    ButtonDeleteComponent,
    SlideEnabledComponent,
    ButtonCreateComponent,
    ButtonCancelComponent,
    FormlyAutocomplete],
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
    AutoCompleteModule,
    MatAutocompleteModule,
    MatInputModule,
    MatNativeDateModule,
    FormlyModule.forRoot(config),
    FormlyPrimeNGModule,
    FormlyMaterialModule,
    FormlyMatToggleModule,
    SharedMaterialModule
  ],
  providers:[
    providerFormly
  ]
})
export class UiFormModule { }
