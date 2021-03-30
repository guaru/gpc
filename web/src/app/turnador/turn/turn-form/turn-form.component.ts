import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Office } from 'src/app/core/models/office.model';
import { Turn } from 'src/app/core/models/turn.model';
import { TurnHtppService } from '../turn-htpp.service';
import { TurnFormService } from './turn-form.service';

@Component({
  selector: 'gpc-turn-form',
  templateUrl: './turn-form.component.html',
  providers: [TurnFormService,TurnHtppService]
})
export class TurnFormComponent implements OnInit,OnDestroy {

  @Input() office!: Office;
  @Input() turn: Turn =  new Turn();
  @Input() modal!: Office;
  @Output() eventSave = new EventEmitter<Turn | null>();
  @Output() eventCancel = new EventEmitter<boolean>();
  @Output() eventDelete = new EventEmitter<Turn | null>();

  constructor(public turnFormService:TurnFormService){
  }

  ngOnInit(): void
  {
    //this.turnFormService.initSocket(); SOCKET INIT
    this.turnFormService.setModel(this.turn);
    this.turnFormService.setOffice(this.office);
    this.turnFormService.buildFileds();
  }

  ngOnDestroy(): void {
  // this.turnFormService.endSocket();
  }

  onCancel(){
    this.eventCancel.emit(true);
  }

  onReset(){
    this.turnFormService.reset();
  }

  async onSave()
  {
    let turn =  await this.turnFormService.save();
    if(turn!=null)
      this.eventSave.emit(turn);
  }

}
