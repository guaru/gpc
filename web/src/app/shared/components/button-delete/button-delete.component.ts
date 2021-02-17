import { Component, Input } from '@angular/core';
import { GlobalFormConstantsService } from 'src/app/core/services/global-form-constants.service';

@Component({
  selector: 'gpc-button-delete',
  templateUrl: './button-delete.component.html'
})
export class ButtonDeleteComponent {

  @Input() disabled :boolean = false;

  constructor(public globalFormConstants:GlobalFormConstantsService) { }

}
