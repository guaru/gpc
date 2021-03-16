import { AfterViewInit, Component, OnInit } from '@angular/core';
declare function customFunctionInit(): void;
@Component({
  selector: 'gpc-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit,AfterViewInit {

  constructor() {
    customFunctionInit();
  }
  ngAfterViewInit(): void {
    customFunctionInit();
  }


  ngOnInit(): void {

  }

}
