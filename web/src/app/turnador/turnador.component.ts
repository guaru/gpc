import { Component, OnInit } from '@angular/core';
declare function customFunctionInit(): void;
@Component({
  selector: 'gpc-turnador',
  templateUrl: './turnador.component.html',
})
export class TurnadorComponent implements OnInit {

  constructor() {
    customFunctionInit();
  }

  ngOnInit(): void {
    customFunctionInit();
  }

}
