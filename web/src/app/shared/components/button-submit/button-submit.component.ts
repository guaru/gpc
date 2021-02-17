import { Component, Input } from '@angular/core';
import { GlobalFormConstantsService } from 'src/app/core/services/global-form-constants.service';


@Component({
  selector: 'gpc-button-submit',
  templateUrl: './button-submit.component.html'
})
export class ButtonSubmitComponent {
  @Input() disabled:boolean =  true;
  constructor(public globalFormConstants:GlobalFormConstantsService){}
}
