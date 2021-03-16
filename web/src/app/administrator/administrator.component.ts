import { Component, OnInit } from '@angular/core';
declare function  customFunctionInit():void;

@Component({
  selector: 'gpc-administrator',
  templateUrl: './administrator.component.html'
})
export class AdministratorComponent implements OnInit {

  constructor() {
    customFunctionInit();
   }

  ngOnInit(): void {
    customFunctionInit();
  }

}
