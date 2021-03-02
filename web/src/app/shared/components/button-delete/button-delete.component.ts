import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalFormConstantsService } from 'src/app/core/services/global-form-constants.service';

@Component({
  selector: 'gpc-button-delete',
  templateUrl: './button-delete.component.html'
})
export class ButtonDeleteComponent {

  @Input() disabled :boolean = false;
  @Output() eventClick = new EventEmitter<boolean>();

  constructor(public globalFormConstants:GlobalFormConstantsService) { }


  onClick(){
    this.eventClick.emit(true);
  }
}
