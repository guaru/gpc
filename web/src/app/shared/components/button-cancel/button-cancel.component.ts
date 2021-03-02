import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'gpc-button-cancel',
  templateUrl: './button-cancel.component.html'
})
export class ButtonCancelComponent  {

  @Output() clickEvent = new EventEmitter<boolean>();
  constructor() { }


  onClick(){
    this.clickEvent.emit(true);
  }
}
