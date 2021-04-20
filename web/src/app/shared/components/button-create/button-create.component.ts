import { Input } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'gpc-button-create',
  templateUrl: './button-create.component.html'
})
export class ButtonCreateComponent{
  @Input('label') label : string = "Crear";
  @Input('icon') icon: string = "fa fa-plus";
  @Output() eventClick = new EventEmitter<boolean>();

  constructor() { }

  onClick(){
    this.eventClick.emit(true);
  }

}
