import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'gpc-spinner',
  templateUrl: './spinner.component.html'
})
export class SpinnerComponent{

  constructor(public spinnerService:SpinnerService) { }

}
