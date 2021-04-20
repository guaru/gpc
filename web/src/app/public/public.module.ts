import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiFormModule } from '../shared/ui-form/ui-form.module';
import { PublicTurnComponent } from './public-turn/public-turn.component';
import { RouterModule } from '@angular/router';
import { TurnFormModule } from '../turnador/turn/turn-form/turn-form.module';
import { SharedModule } from '../shared/shared.module';
import { SharedMaterialModule } from '../shared/shared-material.module';
import { PublicComponent } from './public.component';
import {QRCodeModule} from 'angularx-qrcode';



@NgModule({
  declarations: [PublicComponent, PublicTurnComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedMaterialModule,
    SharedModule,
    TurnFormModule,
    QRCodeModule

  ]
})
export class PublicModule { }
