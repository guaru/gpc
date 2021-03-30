import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalFormConstantsService } from 'src/app/core/services/global-form-constants.service';


@Component({
  selector: 'gpc-button-submit',
  templateUrl: './button-submit.component.html'
})
export class ButtonSubmitComponent {

  @Input() disabled:boolean =  true;
  @Input() label: String = 'Guardar';
  @Output() eventClick = new EventEmitter<boolean>();

  constructor(public globalFormConstants:GlobalFormConstantsService){}

  onClick() {
    this.eventClick.emit(true);
  }

}
