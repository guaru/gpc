import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'gpc-button-create',
  templateUrl: './button-create.component.html'
})
export class ButtonCreateComponent{

  @Output() eventClick = new EventEmitter<boolean>();

  constructor() { }

  onClick(){
    this.eventClick.emit(true);
  }

}
