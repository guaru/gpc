import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiFormModule } from '../shared/ui-form/ui-form.module';
import { PublicTurnComponent } from './public-turn/public-turn.component';
import { RouterModule } from '@angular/router';
import { TurnFormModule } from '../turnador/turn/turn-form/turn-form.module';



@NgModule({
  declarations: [PublicTurnComponent],
  imports: [
    CommonModule,
    RouterModule,
    TurnFormModule
  ]
})
export class PublicModule { }
