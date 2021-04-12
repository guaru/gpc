import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UiFormModule } from 'src/app/shared/ui-form/ui-form.module';
import { TurnadorComponent } from './turnador.component';
import { RouterModule } from '@angular/router';
import { ListTurnComponent } from './turn/list-turn.component';
import { TurnComponent } from './turn/turn.component';
import { TurnFormComponent } from './turn/turn-form/turn-form.component';
import { TurnModalComponent } from './turn/turn-modal/turn-modal.component';
import { TurnFormModule } from './turn/turn-form/turn-form.module';




@NgModule({
  declarations: [TurnadorComponent, ListTurnComponent, TurnComponent, TurnModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedMaterialModule,
    SharedModule,
    UiFormModule,
    TurnFormModule
  ]
})
export class TurnadorModule { }
