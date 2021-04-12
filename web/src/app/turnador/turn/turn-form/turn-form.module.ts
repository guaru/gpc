import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnFormComponent } from './turn-form.component';
import { UiFormModule } from 'src/app/shared/ui-form/ui-form.module';



@NgModule({
  declarations: [TurnFormComponent],
  imports: [
    CommonModule,
    UiFormModule
  ],
  exports:[
    TurnFormComponent

  ]
})
export class TurnFormModule { }
